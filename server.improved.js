const http = require('http'),
    fs = require('fs'),
    url = require('url'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

let peopleData = JSON.parse(fs.readFileSync('public/json/people.json'));

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    } else if (request.method === 'DELETE') {
        handleDelete(request, response)
    } else {
        response.writeHeader(404);
        response.end('404 Error: Resource Not Found');
    }
})

const handleGet = function (request, response) {
    console.log('GET: ', request.url)

    const filename = dir + request.url

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else if (request.url === '/people') {
        response.writeHeader(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(peopleData))
    } else {
        sendFile(response, filename)
    }
}

const handlePost = function (request, response) {
    console.log('POST: ', request.url)
    let dataString = ''

    request.on('data', function (data) {
        dataString += data
    })

    request.on('end', function () {
        data = JSON.parse(dataString)
        console.log(data)
        switch (request.url) {
            case '/person':
                response.writeHeader(200, { 'Content-Type': 'text/plain' });
                data.age = _calculateAge(data.birthday);
                console.log(data)
                peopleData.push(data);
                response.end('200 Success: The person is recorded');
                break;
            default:
                response.writeHeader(404);
                response.end('404 Error: Resource Not Found');
                break;
        }
    })
}

const handleDelete = function (request, response) {
    console.log('DELETE: ', request.url)
    const parsed_url = url.parse(request.url, true)
    if (parsed_url.pathname === '/person') {
        let idx = parsed_url.query.idx
        peopleData.splice(idx, 1)
        response.writeHeader(200, { 'Content-Type': 'Text/plain' });
        response.end('200 Success: The person is deleted');
    } else {
        response.writeHeader(404);
        response.end('404 Error: Resource Not Found');
    }
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

const _calculateAge = function (birthday_str) { // birthday is a date
    var birthday = new Date(birthday_str)
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

server.listen(process.env.PORT || port)

console.log('Served at localhost:3000')
console.log('Ctrl-c to quit')
