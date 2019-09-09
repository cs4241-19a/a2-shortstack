"use strict"
const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 5002
 
let appdata = [
  { uid: 0, loc: 0, cursors: 0, hobbyists: 0, csMajors: 0, softEngs: 0, server: 0, quantumComputers: 0, totalLoc: 0 }
]

const costs = {
  cursors: 150,
  hobbyists: 1000,
  csMajors: 12000,
  softEngs: 150000,
  serverFarm: 500000,
  quantumComputers: 3000000
}

let rates = {
  cursors: 1,
  hobbyists: 10,
  csMajors: 30,
  softEng: 50,
  server: 70,
  quantum: 110
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
  }
  else if (request.url === "/getUID") {
    let newUID = generateRandomUID(3000000)
    // Write new data to array
    appdata.push({uid: newUID, loc: 0, cursors: 0, hobbyists: 0, csMajors: 0, softEngs: 0, server: 0, quantumComputers: 0, totalLoc: 0 })

    response.writeHeader(200, { 'Content-Type': 'text/plain' })
    response.write(String(newUID));
    response.end() 
  }
  else if (request.url.startsWith("/getData")) {
    // Get the UID from URL
    let uid = request.url.split("/")[2];
    console.log("UID: " + uid);
    // Check if a number. If so, check for ID in array
    if (isNaN(uid)) {
      console.log("INVALID FIELD")
      response.writeHeader(404)
      response.end('404 Error: File Not Found')
    } else {
      response.writeHeader(200, { 'Content-type': 'text/plain' })
      let foundUID = false;
      // Look through the given data for a UID and send the JSON as a response
      for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].uid == uid) {
          response.end(JSON.stringify(appdata[i]))
          foundUID = true;
        }
      }
      if (!foundUID) {
        // If cannot find UID, add to array and pretend nothing happened 
        let newUID = {uid: uid, loc: 0, cursors: 0, hobbyists: 0, csMajors: 0, softEngs: 0, server: 0, quantumComputers: 0, totalLoc: 0} 
        appdata.push(newUID)
        console.log("New UID Created!")
        response.end(JSON.stringify(newUID))
      }
    }
  }
  else if (request.url === "/getAllData") {
    response.writeHead(200, {'Content-type':'text/plain'})
    response.write(JSON.stringify(appdata))
    response.end()
  }
  else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    let actionData = JSON.parse(dataString)

    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    // Action: getData = get the data from the server given UID and send it back to client
    switch (actionData.action) {
      // Get a unique UID and send it back.
      case "modifyData":
        console.log(actionData)
        if (addDeltaToAppData(actionData)) {
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
 * Generates a random unique UID and returns it. It also create
 */
const generateRandomUID = function (n) {
  console.log("Generating new UID")
  let tempUID = Math.floor(Math.random() * n)
  let foundUID = true;
  let match = false;

  while (!foundUID) {
    // Look through the given data for a UID. If found, then generate a new number.
    tempUID = Math.floor(Math.random() * n)
    for (let i = 0; i < appdata.length; i++) {
      if (appdata[i].uid == tempUID) {
        match = true;
      }
    }

    if (!match) {
      foundUID = true;
    }
  }
  console.log("Found new ID! UID: " + String(tempUID))
  return tempUID;
}

/***
 * Calculates the cost of a given purchase given a delta object
 */
const calculateCost = function (delta) {
  return (costs.cursors * delta.cursors) 
  + (costs.hobbyists * delta.hobbyists) + 
  (costs.csMajors * delta.csMajors) + 
  (costs.softEngs * delta.softEng) + 
  (costs.serverFarm * delta.server) + 
  (costs.quantumComputers * delta.quantum);
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
      let totalCost = calculateCost(delta);
      console.log("Purchase UID: " + delta.uid );
      // If the cost is too great, return false
      if ((delta.currentLOC - totalCost) < 0) {
        appdata[i].totalLoc += (delta.currentLOC - appdata[i].loc)
        appdata[i].loc = delta.currentLOC;
        return false;
        // Else, store all of the delta values in the existing database
      } else {
        appdata[i].totalLoc += (delta.currentLOC - appdata[i].loc)
        appdata[i].loc = delta.currentLOC - totalCost;
        appdata[i].cursors += delta.cursors;
        appdata[i].hobbyists += delta.hobbyists;
        appdata[i].csMajors += delta.csMajors;
        appdata[i].softEngs += delta.softEng;
        appdata[i].server += delta.server;
        appdata[i].quantumComputers += delta.quantum;
        return true;
      }
    }
  }
  return false;
}

server.listen(process.env.PORT || port)
