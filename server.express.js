const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
const path = require('path');
const port = 3000;

// app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(bodyParser.json());         // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));
app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

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

// const logRequestStart = (req, res, next) => {
//     console.info(`${req.method} ${req.originalUrl}`);
//
//     res.on('finish', () => {
//         console.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
//     });
//
//     next();
// };

app.use(logRequests);

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/submit/msg', function(req, res) {
    let user_name=req.body.user;
    let password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});

app.listen(port, () => console.log(`Listening on port ${port}`));