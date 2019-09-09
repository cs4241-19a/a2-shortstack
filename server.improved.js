const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

const appdata = [
    {
        'firstName': 'Janette',
        'lastName': 'Fong',
        'pronouns': 'She/Her/Hers',
        'values': 'ambition',
        'house': 'Slytherin'
    },
    {'firstName': 'Winny', 'lastName': 'Cheng', 'pronouns': 'She/Her/Hers', 'values': 'wisdom', 'house': 'Ravenclaw'},
    {'firstName': 'Jose', 'lastName': 'Li Quiel', 'pronouns': 'He/Him/His', 'values': 'loyalty', 'house': 'Hufflepuff'},
    {'firstName': 'Harry', 'lastName': 'Potter', 'pronouns': 'He/Him/His', 'values': 'bravery', 'house': 'Gryffindor'},
]


const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
})


const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1)

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else if (request.url === '/studentData') {
        sendData(response, appdata)
    } else {
        sendFile(response, filename)
    }
}

const handlePost = function (request, response) {
    let dataString = ''

    request.on('data', function (data) {
        dataString += data
    })

    request.on('end', function () {

            const data = JSON.parse(dataString)


            switch (request.url) {

                case '/submit':
                    //server logic
                    let sortedHouse;
                    switch (data.values) {
                        case 'bravery':
                            sortedHouse = 'Gryffindor'
                            break
                        case 'loyalty':
                            sortedHouse = 'Hufflepuff'
                            break
                        case 'wisdom':
                            sortedHouse = 'Ravenclaw'
                            break
                        case 'ambition':
                            sortedHouse = 'Slytherin'
                            break
                        default:
                            sortedHouse = 'Muggle'
                    }

                    const newStudent = {
                        'firstName': data.firstName,
                        'lastName': data.lastName,
                        'pronouns': data.pronouns,
                        'values': data.values,
                        'house': sortedHouse
                    }

                    appdata.push(newStudent)

                    console.log(appdata)

                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
                    response.end()
                    break

                case '/delete':
                    appdata.splice(data.rowData, 1)
                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
                    response.end()
                    break

                case '/update':
                    let index = data.index
                    appdata[index].firstName = data.firstName
                    appdata[index].lastName = data.lastName
                    appdata[index].pronouns = data.pronouns
                    appdata[index].house = data.house
                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
                    response.end()
                    break

                default:
                    response.end('404 Error: File Not Found')
            }


        }
    )
}

const sendData = function (response, studentData) {
    response.end(JSON.stringify(studentData));
}


const sendFile = function (response, filename) {
    const type = mime.getType(filename)
    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
      if (err === null) {
        response.writeHeader(200, {'Content-Type': type})
        response.end(content)
      }
      else {
        response.writeHeader(404)
        response.end('404 Error: File Not Found')
      }
    })
}


server.listen(process.env.PORT || port)
