const express = require('express'),
    bodyParser = require('body-parser'),
    hbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 3000;

// const config = require('./db');
const forumRouter = require('./ForumRounter');

// template engine setup (handlebars)
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(express.static(__dirname));
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
app.use(express.static('public'));

app.use('/', forumRouter);


// file error logger
const logRequests = function(req, res, next) {
    const getLogger = function(res) {
        if (res.statusCode >= 500) { return console.error; }
        else if (res.statusCode >= 400) { return console.warn; }
        return console.log;
    };
    res.on('finish', function() {
        getLogger(res)(
            `${req.method} ${req.originalUrl}`.padEnd(29, " ") +
            ` ${res.statusCode} ${res.statusMessage}`.padEnd(19, " ") +
            ` ${res.get('Content-Length') || 0}b sent`
        )
    });
    res.on('close', function() {
        getLogger(res)(
            `${req.method} ${req.originalUrl}`.padEnd(29, " ") + " request close by client"
        )
    });
    res.on('error', function(err) {
        getLogger(res)(
            `${req.method} ${req.originalUrl}`.padEnd(29, " ") + ` Server Error: ${err}`
        )
    });
    next()
};
app.use(logRequests);

// app.post('/submit/add', function(req, res) {
//     console.log("post!!!");
//     console.log(req.body);
//     let user_name=req.body.user;
//     let password=req.body.password;
//     console.log("User name = "+user_name+", password is "+password);
//     res.end("yes");
// });

app.listen(port, () => console.log(`Listening on port ${port}`));