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
            return snapshot.data().title;
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
        forumTitle: await forumPromise,
        messages: await Promise.all(await messagesPromises),
    };
}

async function getForums() {
    let forumsQuery = db.collection('forums').orderBy('date');
    let forumsPromises = forumsQuery.get()
        .then(snapshot => {
            return snapshot.docs.map(async function(doc) {
                return {
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
forumRouter.get('/', function(req, res, next) {
    // TODO: specify a user nane and full name field
    let forumData = [
        {
            title: "Title1",
            shortDesc: "Short desc",
            created: {
                name: "Jimmy Kajon",
                date: "01 Apr 2017, 13:46"
            },
            lastPost: {
                name: "Jimmy Kajon",
                date: "01 Apr 2017, 13:46"
            },
            stats: {
                replies: 1,
                views: 100
            }
        },
        {
            title: "Title2",
            shortDesc: "Short desc2",
            created: {
                name: "Jimmy Kajon2",
                date: "02 Apr 2017, 13:46"
            },
            lastPost: {
                name: "Jimmy Kajon2",
                date: "02 Apr 2017, 13:46"
            },
            stats: {
                replies: 2,
                views: 200
            }
        },
        {
            title: "Title3",
            shortDesc: "Short desc3",
            created: {
                name: "Jimmy Kajon3",
                date: "03 Apr 2017, 13:46"
            },
            lastPost: {
                name: "Jimmy Kajon3",
                date: "03 Apr 2017, 13:46"
            },
            stats: {
                replies: 3,
                views: 300
            }
        },
        {
            title: "TitleN",
            shortDesc: "Short descN",
            created: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            lastPost: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            stats: {
                replies: 90,
                views: 9000
            }
        },
        {
            title: "TitleN",
            shortDesc: "Short descN",
            created: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            lastPost: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            stats: {
                replies: 90,
                views: 9000
            }
        },
        {
            title: "TitleN",
            shortDesc: "Short descN",
            created: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            lastPost: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            stats: {
                replies: 90,
                views: 9000
            }
        },
        {
            title: "TitleN",
            shortDesc: "Short descN",
            created: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            lastPost: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            stats: {
                replies: 90,
                views: 9000
            }
        },
        {
            title: "TitleN",
            shortDesc: "Short descN",
            created: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            lastPost: {
                name: "Jimmy KajonN",
                date: "09 Apr 2017, 13:46"
            },
            stats: {
                replies: 90,
                views: 9000
            }
        },
    ];
    forumData = [];
    res.render('index', {title: "The Forums", forumData: forumData})
});
forumRouter.get('/2', async function(req, res, next) {
    // TODO: specify a user nane and full name field
    let forumData = await getForums();
    console.log(forumData);
    res.render('index', {title: "The Forums", forumData: forumData})
});

// forum messages view
forumRouter.get('/forum/1', function(req, res, next) {
    // TODO: specify a user nane and full name field
    let messages = [
        {
            name: "Jimmy Kajon1",
            date: "today1",
            body: "1111111111111111111fdasfdiusafydgnsaioufnuynasdunfynviuds afu ydasufusdyfuasdfiusdaiufiud suif sdaou f dsoyfui iuds fio sduif yuas yfiads yif af aiudy foi udf adyf y syfyi yaoudy fuyhdy ouyfv hy fv uydfa vuoy rafyuov dyuf vyu a f  uy vua huv o aoud hffiu hyaurgf u fa fu udfiuydasiuyfio a  ufu d."
        },
        {
            name: "Jimmy Kajon2",
            date: "today2",
            body: "2222222222222222222fdasfdiusafydgnsaioufnuynasdunfynviuds afu ydasufusdyfuasdfiusdaiufiud suif sdaou f dsoyfui iuds fio sduif yuas yfiads yif af aiudy foi udf adyf y syfyi yaoudy fuyhdy ouyfv hy fv uydfa vuoy rafyuov dyuf vyu a f  uy vua huv o aoud hffiu hyaurgf u fa fu udfiuydasiuyfio a  ufu d."
        },
        {
            name: "Jimmy Kajon3",
            date: "today3",
            body: "3333333333333333333fdasfdiusafydgnsaioufnuynasdunfynviuds afu ydasufusdyfuasdfiusdaiufiud suif sdaou f dsoyfui iuds fio sduif yuas yfiads yif af aiudy foi udf adyf y syfyi yaoudy fuyhdy ouyfv hy fv uydfa vuoy rafyuov dyuf vyu a f  uy vua huv o aoud hffiu hyaurgf u fa fu udfiuydasiuyfio a  ufu d."
        },
        {
            name: "Jimmy Kajon4",
            date: "today4",
            body: "4444444444444444444fdasfdiusafydgnsaioufnuynasdunfynviuds afu ydasufusdyfuasdfiusdaiufiud suif sdaou f dsoyfui iuds fio sduif yuas yfiads yif af aiudy foi udf adyf y syfyi yaoudy fuyhdy ouyfv hy fv uydfa vuoy rafyuov dyuf vyu a f  uy vua huv o aoud hffiu hyaurgf u fa fu udfiuydasiuyfio a  ufu d."
        },
        {
            name: "Jimmy Kajon5",
            date: "today5",
            body: "5555555555555555555fdasfdiusafydgnsaioufnuynasdunfynviuds afu ydasufusdyfuasdfiusdaiufiud suif sdaou f dsoyfui iuds fio sduif yuas yfiads yif af aiudy foi udf adyf y syfyi yaoudy fuyhdy ouyfv hy fv uydfa vuoy rafyuov dyuf vyu a f  uy vua huv o aoud hffiu hyaurgf u fa fu udfiuydasiuyfio a  ufu d."
        },
        {
            name: "Jimmy Kajon6",
            date: "today6",
            body: "6666666666666666666fdasfdiusafydgnsaioufnuynasdunfynviuds afu ydasufusdyfuasdfiusdaiufiud suif sdaou f dsoyfui iuds fio sduif yuas yfiads yif af aiudy foi udf adyf y syfyi yaoudy fuyhdy ouyfv hy fv uydfa vuoy rafyuov dyuf vyu a f  uy vua huv o aoud hffiu hyaurgf u fa fu udfiuydasiuyfio a  ufu d."
        },
    ];
    res.render('forum', {forumTitle: "Title1", messages: messages})
});

// forum messages view
forumRouter.get('/forum/2', async function(req, res, next) {
    // TODO: specify a user nane and full name field
    let context = await getForum('NJz79Jck1irrZe8AEMd8');
    console.log(context);
    res.render('forum', context)
});


forumRouter.post('/submit/create', function(req, res, next) {
    console.log(req.body);
    const data = req.body;
    let forumId = data.forumId;
    switch (data.action) {
        case "ADDTHREAD":
            const newForumData = {
                title: data.title,
                views: 0,
            };
            let forumDoc = db.collection('forums').doc().set(newForumData);
            forumId = forumDoc.id;
            // adding message and user handled in ADD case
        case "ADD":
            const newUserData = {
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                username: (data.firstName.substring(0, 1) + data.middleName.substring(0, 1) + data.lastName).toLowerCase(),
            };
            let userDoc = db.collection('users').doc().set(newUserData);
            const newMessageData = {
                message: data.message,
                date: (new Date()).toGMTString(),
                poster: "users/" + userDoc.id,
            };
            let messageDoc = db.collection('forums').doc(forumId).collection('messages').doc().set(newUserData);


    }
    if (data.action === "ADDTHREAD") {

    } else if (data.action === "ADD") {
        let setDoc = db.collection('forums').doc().set(data);
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