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
  {'name': 'SpongeBob', 'gender': 'Male', 'age': 10, 'hobby': 'music', 'matchScore': 0},
  {'name': 'Patrick', 'gender': 'Male', 'age': 12, 'hobby': 'music', 'matchScore': 0},
  {'name': 'Mr.Krabs', 'gender': 'Male', 'age': 30, 'hobby': 'sport', 'matchScore': 0},
  {'name': 'Mrs.Puff', 'gender': 'Female', 'age': 30, 'hobby': 'sport', 'matchScore': 0},
  {'name': 'Sandy Cheeks', 'gender': 'Female', 'age': 15, 'hobby': 'sport', 'matchScore': 0}
];
// =====================================================================================================================

// Helper Functions ====================================================================================================
const sendData = function (response, dataset) {
    const type = mime.getType(dataset);
    response.writeHead(200, {'Content-Type': type});
    response.write(JSON.stringify(dataset));
    response.end()
};
const addRow = function (str) {
    let json = JSON.parse(str);
    tabularBack.push(json);

    for (let i = 0; i < tabularBack.length-1; i++) {
        let row = tabularBack[i];
        let score = 0;
        if (json['gender'] !== row['gender']) score += 50;
        else score -= 50;
        score -= Math.abs(json['age'] - row['age']) * 3;
        if (json['hobby'] === row['hobby']) score += 20;
        else score -= 20;
        row['matchScore'] = score;
    }
};
const deleteRow = function (str) {
    let json = JSON.parse(str);
    console.log('delete called: ' + json['model']);
    for (let i = 0; i < tabularBack.length; i++) {
        let row = tabularBack[i];
        // if (row['model'] === json['model']
        //     && row['year'] === json['year']
        //     && row['mpg'] === json['mpg']) {
        //   tabularBack.splice(i,1);
        //   console.log(tabularBack);
        // }
    }
};
const modifyRow = function (str) {
    let json = JSON.parse(str);
    console.log('modify called: ' + json);
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