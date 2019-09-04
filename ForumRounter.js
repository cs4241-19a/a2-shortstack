const express = require('express');
const forumRouter = express.Router();

// const User = require('./User');

// forum view
forumRouter.get('/', function(req, res, next) {
    // res.sendFile(path.join(__dirname + '/add-message.hbs'));
    res.render('index', {title: "The Forums"})
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