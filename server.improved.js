const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    dir = 'public/',
    port = 3000;

/** FIREBASE ADMIN SDK **/
var admin = require("firebase-admin");

var serviceAccount = require("./.data/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://webware-a2.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/");


ref.on("value", function (snapshot) {
    // console.log(snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});


const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    } else if (request.method === 'DELETE') {
        handleDelete(request, response)
    } else if (request.method === 'PUT') {
        handlePut(request, response)
    }
});

const handleGet = function (request, response) {
    console.log("GET");
    const filename = dir + request.url.slice(1);
    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else if (request.url === '/getData') {
        ref.on("value", function (snapshot) {
            response.end(JSON.stringify(snapshot.val()))
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    } else if (request.url === '/firebaseKey') {
        sendFile(response, '.data/firebaseKey.json')
    } else {
        sendFile(response, filename)
    }
};

const handlePost = function (request, response) {
    console.log("POST");

    let dataString = '';

    request.on('data', function (data) {
        dataString += data
    });

    request.on('end', function () {
        let jsonObj = JSON.parse(dataString);

        let numWords = jsonObj["entry-post"].split(" ").length;
        jsonObj["entry-words"] = numWords;
        jsonObj["entry-map"] = wordFreq(jsonObj["entry-post"]);

        // Printing final object!
        console.log(jsonObj);

        // Then post to firebase!
        var postsRef = ref.child(jsonObj['uid-val']);
        postsRef.push().set(jsonObj);

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        response.end("OK")
    })
};

const handleDelete = function (request, response) {
    console.log("DELETE: ", request.url);
    ref.child(request.url).set({});
    response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    response.end("OK");
};

const handlePut = function (request, response) {
    console.log("PUT");

    let dataString = '';

    request.on('data', function (data) {
        dataString += data
    });

    request.on('end', function () {
        let jsonObj = JSON.parse(dataString);

        let key = jsonObj['uid-val'] + '/' + jsonObj['entry-key'];

        let numWords = jsonObj["entry-post"].split(" ").length;
        jsonObj["entry-words"] = numWords;
        jsonObj["entry-map"] = wordFreq(jsonObj["entry-post"]);
        delete jsonObj['entry-key'];

        // Then post to firebase!
        ref.child(key).update(jsonObj);

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        response.end("OK")
    });
};

const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHeader(200, {'Content-Type': type})
            response.end(content)

        } else {

            // file not found, error code 404
            response.writeHeader(404);
            response.end('404 Error: File Not Found')

        }
    })
};

server.listen(process.env.PORT || port);

/**
 * Returns the frequency of words in a string
 * @param string
 */
function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    console.log(words);
    var freqMap = {};
    let invalid = [".", "#", "$", "/", "[", "]"];
    words.forEach(function (w) {

        // To lower case and remove punctuation
        w = w.toLowerCase();
        w = w.replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"");

        if (!containsAny(w, invalid) && w !== '') {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
        }
    });

    return freqMap;
}

/**
 * Check if a string contains any substring
 * @param str
 * @param substrings
 */
function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i];
        if (str.indexOf(substring) != -1) {
            return true;
        }
    }
    return false;
}

