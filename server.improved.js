const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

let appdata = [
  { uid: 0, loc: 0, cursors: 0, hobbyists: 0, csMajors: 0, softEngs: 0, server: 0, quantumComputers: 0, totalLoc: 0 }
]

const costs = {
  cursors: 15,
  hobbyists: 100,
  csMajors: 1200,
  softEngs: 13000,
  serverFarm: 30000,
  quantumComputers: 100000
}


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
    actionData = JSON.parse(dataString)

    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    // Action: getData = get the data from the server given UID and send it back to client
    switch (actionData.action) {
      // Get a unique UID and send it back.
      case "getUID":
        let newUID = generateRandomUID(3000000);
        response.end(String(newUID));
        break;
      case "getData":
        // Look through the given data for a UID and send the JSON as a response
        for (let i = 0; i < appdata.length; i++) {
          if (appdata[i].uid == actionData.uid) {
            response.end(JSON.stringify(actionData))
          }
        }
        break;
      case "modifyData":
        if (addDeltaToAppData(actionData.uid, actionData.delta)){
          response.end("Transaction Completed")
        } else {
          response.end("Not enough money")
        }
    }
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

/***
 * Generates a random unique UID and returns it.
 */
const generateRandomUID = function (n) {
  console.log("Generating new UID")
  let tempUID = Math.floor(Math.random() * n)
  let foundUID = false

  while (!foundUID) {
    // Look through the given data for a UID. If found, then generate a new number.
    for (let i = 0; i < appdata.length; i++) {
      if (appdata[i].uid == tempUID) {
        foundUID = true;
      }
    }

    if (foundUID) {
      tempUID = Math.floor(Math.random() * n)
      foundUID = false // Reset flag
    }
  }
  console.log("Found new ID! UID: " + String(tempUID))
  return tempUID;
}

/***
 * Calculates the cost of a given purchase given a delta object
 */
const calculateCost = function (delta) {
  return (cost.cursors * delta.cursors) 
  + (cost.hobbyists * delta.hobbyists) 
  + (cost.csMajors * delta.csMajors)
  + (cost.softEngs * delta.softEngs)
  + (cost.server * delta.server)
  + (cost.quantumComputers * delta.quantumComputers);
}

/**
 * Given a delta object, either add the necessary purchased elements
 * to the cached object and return true, or if the user does not
 * have enough loc, then return false
 */
const addDeltaToAppData = function (delta) {
  // Look through the given data for a UID.
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].uid == delta.uid) {
      totalCost = calculateCost(delta);
      // If the cost is too great, return false
      if (delta.loc - totalCost < 0) {
        return false;
        // Else, store all of the delta values in the existing database
      } else {
        appdata[i].loc = delta.loc - totalCost;
        appdata[i].cursors += delta.cursors;
        appdata[i].hobbyists += delta.hobbyists;
        appdata[i].csMajors += delta.csMajors;
        appdata[i].softEngs += delta.softEngs;
        appdata[i].server += delta.server;
        appdata[i].quantumComputers += delta.quantumComputers;
        return true;
      }
    }
  }
  return false;
}

server.listen(process.env.PORT || port)
