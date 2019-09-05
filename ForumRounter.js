const express = require('express');
const forumRouter = express.Router();

// const User = require('./User');

// forum view
forumRouter.get('/', function(req, res, next) {
    // res.sendFile(path.join(__dirname + '/add-message.hbs'));
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
    res.render('index', {title: "The Forums", forumData: forumData})
});


forumRouter.post('/submit/create', function(req, res, next) {
    console.log(req.body);
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