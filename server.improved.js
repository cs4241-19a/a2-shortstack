const express = require('express'),
      dir  = '/public/',
      server = express(),
      port = 3000

let jobs = [
  { 'name': 'One', 'job': 'Foo', 'day': 'Tuesday', 'done': false, 'late': false },
]

server.get('/', function(req, res) {
  res.sendFile(__dirname + dir + 'index.html')
})

server.post('/', function(req, res) {
  let dataString = ''
  request.on('data', function(data) {
    dataString += data
  })

  request.on( 'end', function() {
    dataObj = JSON.parse(dataString)
    jobs.concat(dataObj)

    table = null
    jobs.forEach(function(job) {

      if(job["name"] === "reset") {
        for(i=1, row; row=table.rows[i]; i++) {
          row.cells[1].innerHTML = ""
        }
      }

      if(job["day"] === "Tuesday") {
        table = document.getElementById("tuesTable")
      }
      else table = document.getElementById("thurTable")

      for(i = 1, row; row = table.rows[i]; i++) {
        if(row.cells[0].innerHTML === job["job"]) {
            row.cells[1].innerHTML = job["name"]
        }
      }
    })

    response.writeHead( 200, 'OK', {'Content-Type': 'text/plain' })
    response.end()
  })
})

server.use(express.static('public'))
server.set('port', process.env.PORT || port)
server.listen(port, function() {
  console.log("Job Tracker running on port 3000")
})
