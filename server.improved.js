const http = require('http'),
  fs = require('fs'),
  mime = require('mime'),
  dir = 'public/',
  port = 3000


// "Tabular" data storage
const appdata = []

// Server object
const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

// Routes to serve files
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  // Load index.html
  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  }

  // Send all bill objects on '/results' request
  else if (request.url === '/results') {
    response.setHeader("Content-Type", "application/json")
    response.end(JSON.stringify(appdata))
  } else {
    sendFile(response, filename)
  }
}

// Handle POST request + response
const handlePost = function (request, response) {
  let dataString = ''

  // Pull data from request
  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    dataString = JSON.parse(dataString)

    if (request.url === '/delete') {
      manageAppData('/delete', dataString)
    } else if (request.url === '/edit') {
      manageAppData('/edit', dataString)
    } else {
      manageAppData('/other', dataString)
    }

    // Write response
    response.writeHead(200, "OK", {
      'Content-Type': 'text/plain'
    })
    response.end()
  })
}


function manageAppData(url, data) {

  // If POST was for data entry
  if (url == '/other') {
    // Derive a prioirty field 
    addPriority(data)
  }
  // Else POST was for edit / delete
  else {
    // Iterate over request, appdata to search for matching entries 
    for (result in data) {
      for (obj in appdata) {
        // Object is a match if first four fields match 
        if (appdata[obj].billName == data[result].billName && appdata[obj].billAmt == data[result].billAmt && appdata[obj].date == data[result].date && appdata[obj].billPay == data[result].billPay) {
          console.log("MATCH FOUND")
          if (url == '/delete') {
            appdata.splice(obj, 1)
          } else if (url == '/edit') {
            console.log("edit this mf")
          }
        }
      }
    }

  }
}


  // Calculate bill priorty on a scale of 0-3 based on amount, date, and if it has been paid
  function addPriority(data) {
    // Bill doesn't have priority if it has already been paid
    if (data.billPay) {
      data.priority = '0'
    } else {
      // Calculate days since bill was issued
      var today, date;
      today = new Date();
      date = new Date(data.billDate);
      var res = Math.abs(today - date) / 1000;
      var daysSinceBill = Math.floor(res / 86400);

      // If bill was issued over 3 weeks ago, set to level 2
      if (daysSinceBill > 21) {
        data.priority = '2'
      } else {
        data.priority = '1'
      }

      // If bill is over $300 up the priority by one level
      if (data.billAmt > 300) {
        if (data.priority == 1) {
          data.priority = 2
        } else if (data.priority == 2) {
          data.priority = 3
        }
      }
    }
    // Add new entry to appdata
    data = (JSON.stringify(data))
    appdata.push(JSON.parse(data))

    //printObject(data)
  }

  // Serve files
  const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

      // if the error = null, then we've loaded the file successfully
      if (err === null) {

        // status code: https://httpstatuses.com
        response.writeHeader(200, {
          'Content-Type': type
        })
        response.end(content)

      } else {
        // file not found, error code 404
        response.writeHeader(404)
        response.end('404 Error: File Not Found')
      }
    })
  }

  function printObject(data) {
    console.log("Name: " + data.billName + ", Amt: " + data.billAmt + ", Date: " + data.billDate + ", Paid: " + data.billPay + ", Priority: " + data.priority)
  }

  server.listen(process.env.PORT || port)