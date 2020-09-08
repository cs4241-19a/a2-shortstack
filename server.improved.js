const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

// Store all bill entries here
// Must be tabular?
const appdata = []

// Server object
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

// Routes to serve files
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

// Handle POST request + response
const handlePost = function( request, response ) {
  let dataString = ''

  // Pull data from request
  request.on( 'data', function( data ) {
      dataString += data 
  })

  // Handle data, write response
  request.on( 'end', function() {
    console.log( JSON.parse(dataString) )

    // Derive a prioirty field 
    addPriority(JSON.parse(dataString))

    // Add new entry to appdata
    appdata.push(JSON.parse(dataString))
    console.log(appdata.length)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

// Calculate bill priorty on a scale of 0-3 based on amount, date, and if it has been paid
function addPriority (data) {
  // Bill doesn't have priority if it has already been paid
  if (data.billPay) { data.priority = '0'}
  else {
    // Calculate days since bill was issued
    var today, date;
    today = new Date();
    date = new Date(data.billDate);
    var res = Math.abs(today - date) / 1000;
    var daysSinceBill = Math.floor(res / 86400);

    // If bill was issued over 3 weeks ago, set to level 2
    if (daysSinceBill > 21) { data.priority = '2' } 
    else { data.priority = '1' }

    // If bill is over $300 up the priority by one level
    if (data.billAmt > 300) { 
      if (data.priority == 1) { data.priority = 2 }
      else if (data.priority == 2) { data.priority = 3}
    }
  }
  console.log("After addPrioirty(): ")
  printObject(data)
}

// Serve files
const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     } else{
       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )
     }
   })
}

function printObject(data) {
  console.log("Name: " + data.billName + ", Amt: " + data.billAmt + ", Date: " + data.billDate + ", Paid: " + data.billPay + ", Priority: " + data.priority)
}

server.listen( process.env.PORT || port )


