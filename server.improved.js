const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

// Table
const appdata = [
  {'id': 0, 'task': 'Homework', 'name': 'Brandon', 'priority': 'High'},
  {'id': 0, 'task': 'Eat', 'name': 'Brandon', 'priority': 'Medium'},
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  } else if ( request.method === 'POST' ) {
    handlePost( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if (request.url === '/todo') {
    response.writeHeader( 200, "OK", {'Content-Type': 'aplication/json'})
    response.end(JSON.stringify(appdata))
    sendFile( response, filename )
  } else {
    sendFile (response, filename)
  }
}

// Add task to appdata
const addTask = function (data) {
  const newTask = data
  appdata.push(newTask)
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {

     switch ( request.url ) {
	      case '/addTask':
	        const addData = JSON.parse( dataString )
	        addTask(addData)
	        break;
        default:
          response.end('404: File not found')
  }
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


server.listen( process.env.PORT || port )