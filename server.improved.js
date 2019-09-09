const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

let triangleData = [];
let curID = 0;

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  switch (request.url) {
    case "/":
      sendFile(response, 'public/index.html')
      break;
    case "/getData":
      getData(request, response)
      break;
    default:
      sendFile(response, filename)
    }
}

const handlePost = function (request, response) {
  const filename = dir + request.url.slice(1)

  switch (request.url) {
    case "/submit":
      submit(request, response)
      break;
}
}

// const getData = function(request, response) {
//   request.on('end', function(){
//      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
//     const body = JSON.stringify(namesArray); 
//     response.write(body);
//     response.end();
//   })
// }

const submit = function (request, response) {
  let dataString = ''
  triangleData = [];
  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {

    let input = JSON.parse(dataString);  //turns info into a JSON object

    console.log("inut is :", input);
    console.log("existing triangle array:", triangleData)

    for (let i = 0; i < input.length; i++) {

      if (input[i].a !== 0 && input[i].b !== 0) {
        let cVal = getCValue(input[i].a, input[i].b)
        let tempID = getID();
        let curTriangle = { "a": input[i].a, "b": input[i].b, "c": cVal, "id": tempID };
        triangleData.push(curTriangle)
      }
    }

    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.write(JSON.stringify(triangleData))
    response.end()
  })
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

const getCValue = function (a, b) {
  let a_sqr = a * a;
  let b_sqr = b * b;
  let sum = a_sqr + b_sqr;
  let c = Math.pow(sum, .5)
  return Math.round(c * 100) / 100; //rounds to the hundreths place
}

const getID = function () {
  curID += 1;
  return curID;
}

server.listen(process.env.PORT || port)
