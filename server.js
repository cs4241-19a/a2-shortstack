const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const qs = require('querystring');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/bookings.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the bookings database.');
});

function bookingsAtDateTime(date, time, response) {
  const sql = "SELECT * FROM reservations WHERE date='" + date + "' AND time='" + time + "';";
  
  console.log("Running DB Query: " + sql);

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    let pendingOut = [];
    rows.forEach((row) => {
      let result = {username: row.username, seat: row.seat, date: row.date, time: row.time};
      pendingOut.push(result);
    });
    response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
    response.end(JSON.stringify(pendingOut, null, 3));
  });
}

const addBooking = function(username, seat, date, time) {
  let sql = "INSERT INTO reservations (username, seat, date, time) VALUES ('" + username + "', '" + seat + "', '" + date + "', '" + time + "');";
  
  console.log("Running DB Query: " + sql);

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
  });
}

const handleGet = function( request, response ) {
  const parsedUrl = url.parse(request.url);

  const filename = dir + parsedUrl.pathname;

  if( url.parse(request.url).pathname === '/' ) {
    sendFile( response, dir + '/view.html' )
  }else if( url.parse(request.url).pathname === '/api/avail' ) {
    sendFile( response, dir + '/view.html' )
    const date = qs.parse(parsedUrl.query).date;
    const time = qs.parse(parsedUrl.query).time;
    if (date !== undefined && time !== undefined) {
      bookingsAtDateTime(date, time, response);
    }
    else {
      sendFile(response, '/api404.html')
    }
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data;
  })

  request.on( 'end', function() {

    data = JSON.parse(dataString);

    addBooking(data.username, data.seat, data.date, data.time);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end();
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

console.log("Spinning up on port " + port + "...")
server.listen( process.env.PORT || port )
