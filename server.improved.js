var admin = require('firebase-admin');
var serviceAccount = require("./serviceKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cs4241-a2.firebaseio.com'
});

var db = admin.database();
var keyRef = db.ref('/');

const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    dir = 'public/',
    port = 8000;

const appdata = [ //can add/edit/ delete any object in here
    {'token': 'CS4241', 'currentGrade': 'toyota', 'desired': 1999, 'finalWorth': 23, 'finalExam': undefined},
    {'token': 'IMGD3000', 'currentGrade': 'honda', 'desired': 2004, 'finalWorth': 30, 'finalExam': undefined},
    {'token': 'CS3043', 'currentGrade': 'ford', 'desired': 1987, 'finalWorth': 14, 'finalExam': undefined}
]


const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') { //could add more functions like delete here, but could also have just POST and have the urls to determine what to do
        handlePost(request, response)
    }
});

//use handleGet to display data structure (server) in UI (server to UI)
const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1)
    if (request.url === '/') {
        sendFile(response, 'public/index.html') //do sendFile for javascript file
    } else if (request.url === '/getdata') {
        sendData(response, appdata)
    } else if (request.url === '/receive') {
        keyRef.on('value', function (snapshot) {
            console.log(snapshot.val());
            response.end(JSON.stringify(snapshot.val()))
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    } else {
        sendFile(response, filename)
    }
};
//communicate from HTML to server
//change url to look at specific file (same as a1 with switch statement) (if request.url = delete, delete the data)
const handlePost = function (request, response) {
    let dataString = '';
    request.on('data', function (data) {
        dataString += data
    });
    request.on('end', function () {
        const data = JSON.parse(dataString);
        if (Object.keys(data).length === 4) {
            switch (request.url) {
                case '/submit':
                    let desiredPercentage = parseInt(data.desired) * 0.01;
                    let finalWorthPercentage = parseInt(data.finalWorth) * 0.01;
                    let currentGradePercentage = parseInt(data.currentGrade) * 0.01;
                    let finalExam = 100 * ((desiredPercentage - (1 - finalWorthPercentage) * currentGradePercentage) / finalWorthPercentage);
                    const grades = {
                        'token': JSON.stringify(data.token),
                        'currentGrade': currentGradePercentage,
                        'desired': desiredPercentage,
                        'finalWorth': finalWorthPercentage,
                        'finalExam': finalExam
                    };
                    console.log(finalExam);
                    appdata.push(grades);
                    var finalExamKey = "finalExam";
                    data[finalExamKey] = finalExam;
                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                    response.end();
                    break;
                default:
                    response.end('404 Error: File Not Found')
            }
            console.log(data.finalExam);
            writeData(data.token, data.token, data.currentGrade, data.desired, data.finalWorth, data.finalExam);
        }
        else if (Object.keys(data).length === 2) {
            console.log("data input:", data.updateInput);
            updateGrade(data.token, data.updateInput)
            //removeGrade(data.token, data.currentGrade);

        }
        //updateGrade(data.token, data.updateInput);
    })
};

const sendData = function (response, gradeDataset) {
    const type = mime.getType(gradeDataset);
    response.writeHeader(200, {'Content-Type': type});
    response.write(JSON.stringify({data: gradeDataset}));
    response.end();
};

const sendFile = function (response, filename) {
    const type = mime.getType(filename);

    fs.readFile(filename, function (err, content) {
        if (err === null) {
            response.writeHeader(200, {'Content-Type': type});
            response.end(content)
        } else {
            response.writeHeader(404);
            response.end('404 Error: File Not Found')
        }
    })
};

function writeData(ref, token, currentGrade, desired, finalWorth, finalExam) {
    var tokenRef = keyRef.child(ref);
    tokenRef.set({
        token: token,
        currentGrade: currentGrade,
        desired: desired,
        finalWorth: finalWorth,
        finalExam: finalExam
    });
}

function updateGrade(ref, curGrade) {
    let tokenRef = keyRef.child(ref);
    tokenRef.update({
        currentGrade: curGrade
})
}



server.listen(process.env.PORT || port);


