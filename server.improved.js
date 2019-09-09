        data.splice(split, -const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const data = [
  { 'index': 'MondayCS4241 A2 Due11:59', 'day': 'Monday', 'task': 'CS4241 A2 Due', time: '11:59'},
  { 'index': 'TuesdayMA2621 Homework Due2:00', 'day': 'Tuesday', 'task': 'MA2621 Homework Due', time: '2:00'},
  { 'index': 'TuesdayCH1010 Daily Problem11:00', 'day': 'Tuesday', 'task': 'CH1010 Daily Problem', time: '11:00'}
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
  } else if( request.url === '/info') {
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
    var info = JSON.parse( dataString )
    switch(request.url) {
      case '/submit':
        var newEvent = {
          'index': info.day+info.task+info.time,
          'day': info.day,
          'task' : info.task,
          'time': info.time
        }
        data.push(newEvent);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
      case '/delete':
        var delEvent = {
          'index': info.day+info.task+info.time,
          'day': info.day,
          'task' : info.task,
          'time': info.time
        }
        var index = info.day+info.task+info.time;
        //var split = data.indexOf(delEvent)
        var split = data.findIn(x => x.data.splice(split - 1, 1)
        index === index)
        data.splice(split, -1)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
      default:
        console.log("error");
        break
        
    }
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

  process.env.PORT || port )
