// Setup ===============================================================================================================
const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    dir = 'public/',
    port = 3000;
const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
});
const sendFile = function (response, filename) {
    const type = mime.getType(filename);

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHead(200, {'Content-Type': type});
            response.end(content)

        } else {

            // file not found, error code 404
            response.writeHead(404);
            response.end('404 Error: File Not Found')

        }
    })
};
server.listen(process.env.PORT || port);
// =====================================================================================================================

// The main dataset ====================================================================================================
const tabularBack = [
  {'name': 'SpongeBob', 'gender': 'Male', 'age': 10, 'hobby': 'Jellyfish Hunt', 'matchScore': 0},
  {'name': 'Patrick', 'gender': 'Male', 'age': 12, 'hobby': 'Jellyfish Hunt', 'matchScore': 0},
  {'name': 'Mrs.Puff', 'gender': 'Female', 'age': 30, 'hobby': 'Music', 'matchScore': 0},
  {'name': 'Sandy Cheeks', 'gender': 'Female', 'age': 15, 'hobby': 'Sport', 'matchScore': 0}
];
// =====================================================================================================================

// Helper Functions ====================================================================================================
const sendData = function (response, dataset) {
    const type = mime.getType(dataset);
    response.writeHead(200, {'Content-Type': type});
    response.write(JSON.stringify(dataset));
    response.end()
};
const calculateScore = function (newRow, oldRow) {
    let score = 0;
    if (newRow['gender'] !== oldRow['gender']) score += 50;
    else score -= 50;
    score -= Math.abs(newRow['age'] - oldRow['age']) * 3;
    if (newRow['hobby'] === oldRow['hobby']) score += 20;
    else score -= 20;
    return score;
};
const addRow = function (str) {
    let json = JSON.parse(str);
    tabularBack.push(json);

    for (let i = 0; i < tabularBack.length-1; i++) {
        let row = tabularBack[i];
        row['matchScore'] = calculateScore(json, row);
    }
};
const deleteRow = function (str) {
    for (let i = 0; i < tabularBack.length; i++) {
        if ((i+1).toString() === str[4]) tabularBack.splice(i,1);
    }
};
const modifyRow = function (str) {
    let json = JSON.parse(str);
    for (let i = 0; i < tabularBack.length; i++) {
        if ((i+1).toString() === json['modifyIndex']) {
            let row = tabularBack[i];
            row['name'] = json['name'];
            row['gender'] = json['gender'];
            row['age'] = json['age'];
            row['hobby'] = json['hobby'];
            row['matchScore'] = calculateScore(tabularBack[tabularBack.length-1], row);
        }
    }
};
// =====================================================================================================================

// Get & Post ==========================================================================================================
const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1);
    if (request.url === '/') sendFile(response, 'public/index.html');
    else if (request.url === '/refresh') sendData(response, tabularBack);
    else sendFile(response, filename);
};
const handlePost = function (request, response) {
    let dataString = '';
    request.on('data', function (data) {
        dataString += data
    });
    request.on('end', function () {
        if (request.url === '/add') addRow(dataString);
        else if (request.url === '/delete') deleteRow(dataString);
        else if (request.url === '/modify') modifyRow(dataString);
        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        response.end()
    })
};
// =====================================================================================================================