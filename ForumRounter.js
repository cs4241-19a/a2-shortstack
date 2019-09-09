const express = require('express');
const forumRouter = express.Router();
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./cs4241-a2-shortstack-firebase-adminsdk-aa3z5-27e0f7d0b8.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://cs4241-a2-shortstack.firebaseio.com"
});

const db = firebaseAdmin.firestore();

async function getForum(forumId) {
    let forumDoc = db.collection('forums').doc(forumId);
    let messageQuery = forumDoc.collection('messages').orderBy('date');
    let forumPromise = forumDoc.get()
        .then(snapshot => {
            return {
                forumTitle: snapshot.data().title,
                forumId: snapshot.id,
            };
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    let messagesPromises = messageQuery.get()
        .then(snapshot => {
            return snapshot.docs.map(async function(doc) {
                return doc.data().poster.get()
                    .then(userSnapshot => {
                        return userSnapshot.data();
                    })
                    .then(userData => {
                        return {
                            messageId: doc.id,
                            message: doc.data().message,
                            date: (new Date(doc.data().date.seconds * 1000)).toUTCString(),
                            name: `${userData.firstName} ${userData.middleName} ${userData.lastName}`,
                            username: userData.username,
                        }
                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    return {
        ... await forumPromise,
        messages: await Promise.all(await messagesPromises),
    };
}

async function getForums() {
    let forumsQuery = db.collection('forums').orderBy('views', 'desc');
    let forumsPromises = forumsQuery.get()
        .then(snapshot => {
            return snapshot.docs.map(async function(doc) {
                return {
                    forumId: doc.id,
                    title: doc.data().title,
                    stats: {
                        views: doc.data().views,
                        replies: doc.data().replies,
                    },
                    messageData: getMessageData(doc),
                }
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    // console.log("waiting for data to finish loading");
    let data = await Promise.all(await forumsPromises)
        .then(forums => {
            return forums.map(async function(forum) {
                return {
                    forumId: forum.forumId,
                    title: forum.title,
                    shortDesc: (await forum.messageData.firstMessagePromise).shortDesc,
                    stats: forum.stats,
                    created: await (await forum.messageData.firstMessagePromise).created,
                    lastPost: await (await forum.messageData.lastMessagePromise).lastPost,

                };
            });
        });
    return await Promise.all(data);
}

// returns two promises
function getMessageData(forumDoc) {
    let firstMessageQuery = forumDoc.ref.collection('messages').orderBy('date').limit(1);
    let lastMessageQuery = forumDoc.ref.collection('messages').orderBy('date', "desc").limit(1);
    let firstMessagePromise = firstMessageQuery.get()
        .then(snapshot => {return snapshot.docs[0].data()})
        .then(data => {
            return {
                shortDesc: data.message,
                created: getUserData(data.poster, data.date),
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    let lastMessagePromise = lastMessageQuery.get()
        .then(snapshot => {return snapshot.docs[0].data()})
        .then(data => {
            return {
                lastPost: getUserData(data.poster, data.date),
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    return {firstMessagePromise, lastMessagePromise}
}

// returns promise
function getUserData(userRef, timestamp) {
    return userRef.get()
        .then(userSnapshot => {
            return userSnapshot.data();
        })
        .then(userData => {
            return {
                date: (new Date(timestamp.seconds * 1000)).toUTCString(),
                name: `${userData.firstName} ${userData.middleName} ${userData.lastName}`,
                username: userData.username,
            }
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}


// forum list view
forumRouter.get('/', async function(req, res, next) {
    let forumData = await getForums();
    res.render('index', {title: "The Forums", forumData: forumData})
});

// forum messages view
forumRouter.get('/forum/:forumId', async function(req, res, next) {
    let context = await getForum(req.params.forumId);
    if (context.forumTitle === undefined && context.messages.length === 0) {
        res.status(404).send('Page Not found')
    } else {
        db.collection("forums").doc(req.params.forumId).update({views: firebaseAdmin.firestore.FieldValue.increment(1)})
            .then(function() {
                // console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        res.render('forum', context)
    }
});


forumRouter.post('/submit/create', async function(req, res, next) {
    console.log(req.body);
    const data = req.body;
    let forumId = data.forumId;
    let messageId = data.messageId;
    let addTimestamp = firebaseAdmin.firestore.Timestamp.now();
    switch (data.action) {
        case "ADDTHREAD":
            const newForumData = {
                title: data.title,
                views: 0,
                date: addTimestamp,
            };
            let forumDoc = db.collection("forums").add(newForumData)
                .then(function(docRef) {
                    // console.log("Document written with ID: ", docRef.id);
                    return docRef;
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            forumId = (await forumDoc).id;
            // adding message and user handled in ADD case
        case "ADD":
            const newUserData = {
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                username: (data.firstName.substring(0, 1) + data.middleName.substring(0, 1) + data.lastName).toLowerCase(),
            };

            let userDoc = db.collection("users").add(newUserData)
                .then(function(docRef) {
                    // console.log("Document written with ID: ", docRef.id);
                    return docRef;
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

            const newMessageData = {
                message: data.message,
                date: addTimestamp,
                poster: await userDoc,
            };
            let messageDoc = db.collection("forums").doc(forumId).collection('messages').add(newMessageData)
                .then(function(docRef) {
                    // console.log("Document written with ID: ", docRef.id);
                    return docRef;
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            if (data.action === "ADD") {
                db.collection("forums").doc(forumId).update({replies: firebaseAdmin.firestore.FieldValue.increment(1)})
                    .then(function() {
                        // console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                        console.error("Error updating document: ", error);
                    });
            }
            await messageDoc;
            break;
        case "DELETE":
            // console.log("Deleting " + messageId);
            db.collection("forums").doc(forumId).update({replies: firebaseAdmin.firestore.FieldValue.increment(-1)})
                .then(function() {
                    // console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            await db.collection(`forums/${forumId}/messages`).doc(messageId).delete()
                .then(function() {
                    // console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            break;
        case "EDIT":
            // console.log("Editing " + messageId);
            await db.collection(`forums/${forumId}/messages`).doc(messageId).update({
                message: data.message,
            })
                .then(function() {
                    // console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            break;

    }
    let respData = {};  // send a blank response to have the page reloaded
    if (data.action === "ADDTHREAD") {
        let respData = {"forumId": forumId};
    }
    res.json(respData);
});


module.exports = forumRouter;