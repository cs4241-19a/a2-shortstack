const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const data = [
  { 'day': 'Monday', 'task': 'CS4241 A2 Due', time: '11:59:00'},
  { 'day': 'Tuesday', 'task': 'MA2621 Homework Due', time: '2:00:00'}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if( request.url === '/information') {
    sendData( response, data )
  } else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })
  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    var info = JSON.parse( dataString )
    var newEvent = {
      'day': info.day,
      'task' : info.task,
      'time': info.time
    }
    
    // ... do something with the data here!!!
    //response.write(JSON.parse( dataString ))
    data.push(newEvent);
    
    //response.write(data.toString())
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const sendData = function( response, value ) {
  const type = mime.getType( value )
  
  response.writeHeader( 200, { 'Content-Type': type })
  response.end( JSON.stringify( { data : value } ))
  
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

server.listen( process.env.PORT || port )
