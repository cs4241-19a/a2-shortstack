const http = require('http'),
  fs = require('fs'),
  mime = require('mime'),
  dir = 'public/',
  port = 3000


// "Tabular" data storage
var appdata = []

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
  if (url === '/other') {
    // Derive a prioirty field 
    data = addPriority(data) // already parsed
    //data = addPriority(JSON.parse(data))
    //data = (JSON.stringify(data))
    console.log("IN /OTHER: " + JSON.stringify(data))
    //appdata.push(JSON.parse(data))
    appdata.push(data)
  }
  // Else POST was for edit / delete
  // else {
  //   // Iterate over request, appdata to search for matching entries 
  //   for (result in data) {
  //     console.log("result " + result + " = " + data[result])
  //     for (obj in appdata) {
  //       // Object is a match if first four fields match 
  //       if (appdata[obj].billName == data[result].billName && appdata[obj].billAmt == data[result].billAmt && appdata[obj].date == data[result].date && appdata[obj].billPay == data[result].billPay) {
  //         if (url == '/delete') {
  //           console.log("IN /DELETE: " + data)
  //           appdata.splice(obj, 1)
  //         } else if (url == '/edit') {
  //           data = addPriority(data)
  //           //console.log("data pre-stringigy = " + data)
  //           //data = (JSON.stringify(data))
  //           //console.log("IN / (post-stringigy): " + data)
  //           console.log("is data an []? : " + typeof(data))
  //           appdata = data // change to parse, not staight = 
  //         }
  //       }
  //     }
  //   }

  // }
  else if (url == '/delete') {
    // Iterate over request, appdata to search for matching entries 
    for (result in data) {
      for (obj in appdata) {
        // Object is a match if first four fields match 
        if (appdata[obj].billName == data[result].billName && appdata[obj].billAmt == data[result].billAmt && appdata[obj].date == data[result].date && appdata[obj].billPay == data[result].billPay) {
          console.log("IN /DELETE: " + data)
          appdata.splice(obj, 1)
        }
      }
    }
  } else if (url == '/edit') {
    // var dataArr = []
    let finalData = addPriority(data)

    // console.log("data before prioirty stuff : " + data)
    // for (result in data) {
    //   let finalData = addPriority(data)
    //   console.log("x[0] = " + x[0])
    //   console.log("x[0].billName = " + x[0].billName)
    //   dataArr.push(x)
    // }
    // console.log("data after pri stuff : " + finalData)
    // console.log("appdata before replacement : " + appdata)
    // console.log("data array: " + finalData)
    // console.log("dataArr[0]: " + finalData[0])
    // console.log("dataArr[0].billName: " + finalData[0].billName)
    appdata = finalData
    // console.log("appData after: " + appdata)

  }

}



// Calculate bill priorty on a scale of 0-3 based on amount, date, and if it has been paid
function addPriority(data) {
  console.log("IN ADDP")
  console.log(data)
  console.log("length daat = " + data.length)

  if (data.length == undefined) {
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
  } else {

    for (let i = 0; i < data.length; i++) {

      // Bill doesn't have priority if it has already been paid
      if (data[i].billPay) {
        data[i].priority = '0'
      } else {
        // Calculate days since bill was issued
        var today, date;
        today = new Date();
        date = new Date(data[i].billDate);
        var res = Math.abs(today - date) / 1000;
        var daysSinceBill = Math.floor(res / 86400);

        // If bill was issued over 3 weeks ago, set to level 2
        if (daysSinceBill > 21) {
          data[i].priority = '2'
        } else {
          data[i].priority = '1'
        }

        // If bill is over $300 up the priority by one level
        if (data[i].billAmt > 300) {
          if (data[i].priority == 1) {
            data[i].priority = 2
          } else if (data.priority == 2) {
            data[i].priority = 3
          }
        }
      }
    }
  }
  return data
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

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

server.listen(process.env.PORT || port)