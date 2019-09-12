/*
Server implementation for project 2.
  The server provided by Professor Roberts.
  Edited by Tom Graham
  Date: 9/10/2019
*/


const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    dir = 'public/',
    port = 3000

    
let dataStore = [
    { 'ProgramLangue': 'C', 'use' : 'os', 'year': '1970 '}
]

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
        } 
    else if (request.method === 'POST') {
        handlePost(request, response)
        }
    else if (request.method === 'PUT') {
        handlePut(request, response)
        }
    else if (request.method === 'DELETE') {
        handleDelete(request, response)
        }
    })

const handleGet = function (request, response) {
    const filename = dir + request.url

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    }
    else {
        sendFile(response, filename)
    }
}

// const handlePut = function (request, response) {
    //TODO
// }

const handlePost = function (request, response) {
    let dataString = ''

    request.on('data', function (data) {
        dataString += data 
    })

    request.on('end', function () {
        console.log(JSON.parse(dataString))
        doStore(dataString)
        response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
        response.end()
    })
}


 function doStore(data){
    dataStore += { 'ProgramLangue': data.programlangue, 'use' : data.use, 'Header': data.header}
}

const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {
            // status code: https://httpstatuses.com
            response.writeHeader(200, { 'Content-Type': type })
            response.end(content)
        } else {
            // file not found, error code 404
            response.writeHeader(404)
            response.end('404 Error: File Not Found')

        }
    })
}

server.listen(process.env.PORT || port)