const express = require('express');
const forumRouter = express.Router();

// const User = require('./User');

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