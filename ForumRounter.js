const express = require('express');
const forumRouter = express.Router();
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./cs4241-a2-shortstack-firebase-adminsdk-aa3z5-27e0f7d0b8.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://cs4241-a2-shortstack.firebaseio.com"
});

const db = firebaseAdmin.firestore();

// function getForum(forumId) {
//     let forumData = {};
//     let forumRef = db.collection('forums').doc(forumId);
//     let forumDoc = forumRef.get()
//         .then(doc => {
//             if (!doc.exists) {
//                 console.log('No such document!');
//             } else {
//                 console.log('Document data:', doc.numChildren());
//
//                 // forumData.title = doc.data().title;
//                 // forumData.views = doc.data().views;
//                 // forumData = {...forumData, ...getForumMessages(forumId)};
//             }
//         })
//         .catch(err => {
//             console.log('Error getting document', err);
//         });
// }
// getForum("NJz79Jck1irrZe8AEMd8");
//
// function getForumMessages(forumId) {
//     let messagesData = {messages: []};
//     let messagesRef = db.collection('messages');
//     let query = messagesRef.where('forum', '==', forumId).get()
//         .then(snapshot => {
//             if (snapshot.empty) {
//                 console.log('No matching documents.');
//                 return;
//             }
//
//             snapshot.forEach(doc => {
//                 console.log(doc.id, '=>', doc.data());
//                 messagesData.messages[doc.id] = {
//                     date: doc.data().date,
//                     message: doc.data().message,
//                 }
//             });
//         })
//         .catch(err => {
//             console.log('Error getting documents', err);
//         });
//
//
// }

// function getForum(forumId) {
//     let forumData = {};
//     let forumDoc = db.collection('forums').doc(forumId);
//     let messageQuery = forumDoc.collection('messages').orderBy('date');
//     forumDoc.get()
//         .then(snapshot => {
//             console.log(snapshot.id, '=>', snapshot.data());
//             forumData.title = snapshot.data().title;
//             forumData.stats.views = snapshot.data().views;
//         })
//         .catch(err => {
//             console.log('Error getting documents', err);
//         });
//     messageQuery.get()
//         .then(snapshot => {
//             forumData.stats.replies = snapshot.size;
//             snapshot.forEach(doc => {
//                 console.log(doc.id, '=>', doc.data());
//             });
//         })
//         .catch(err => {
//             console.log('Error getting documents', err);
//         });


async function getForum(forumId) {
    let forumDoc = db.collection('forums').doc(forumId);
    let messageQuery = forumDoc.collection('messages').orderBy('date');
    let forumPromise = forumDoc.get()
        .then(snapshot => {
            // console.log(snapshot.id, '=>', snapshot.data());
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
    let forumsQuery = db.collection('forums').orderBy('date');
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

    console.log("waiting for data to finish loading");
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
    // TODO: specify a user nane and full name field
    let forumData = await getForums();
    console.log(forumData);
    res.render('index', {title: "The Forums", forumData: forumData})
});

// forum messages view
forumRouter.get('/forum/:forumId', async function(req, res, next) {
    let context = await getForum(req.params.forumId);
    console.log(context);
    if (context.forumTitle === undefined && context.messages.length === 0) {
        res.status(404).send('Page Not found')
    } else {
        db.collection("forums").doc(req.params.forumId).update({views: firebaseAdmin.firestore.FieldValue.increment(1)})
            .then(function() {
                console.log("Document successfully updated!");
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
                    console.log("Document written with ID: ", docRef.id);
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
                    console.log("Document written with ID: ", docRef.id);
                    return docRef;
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

            console.log((await userDoc));
            const newMessageData = {
                message: data.message,
                date: addTimestamp,
                poster: await userDoc,
            };
            let messageDoc = db.collection("forums").doc(forumId).collection('messages').add(newMessageData)
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    return docRef;
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            db.collection("forums").doc(forumId).update({replies: firebaseAdmin.firestore.FieldValue.increment(1)})
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            await messageDoc;
            break;
        case "DELETE":
            console.log("Deleting " + messageId);
            db.collection("forums").doc(forumId).update({replies: firebaseAdmin.firestore.FieldValue.increment(-1)})
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            await db.collection(`forums/${forumId}/messages`).doc(messageId).delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            break;
        case "EDIT":
            console.log("Editing " + messageId);
            await db.collection(`forums/${forumId}/messages`).doc(messageId).update({
                message: data.message,
            })
                .then(function() {
                    console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            break;

    }
    if (data.action === "ADDTHREAD") {

    } else if (data.action === "ADD") {

    } else if (data.action === "DELETE") {

    } else if (data.action === "EDIT") {

    }
    res.json({"worked?": "finally"});
});


// forumRouter.route('/create').post(function (req, res) {
//     // const user = new User(req.body);
//     // user.save()
//     //     .then(user => {
//     //         res.json('User added successfully');
//     //     })
//     //     .catch(err => {
//     //         res.status(400).send("unable to save to database");
//     //     });
//     console.log(req.body);
// });

module.exports = forumRouter;