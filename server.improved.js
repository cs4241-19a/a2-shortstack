const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let playlists=[]

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
  }else if( request.url === '/results.html') {
    sendFile( response, 'public/results.html')
  }else if( request.url === '/fResults') {
    sendResult(response);
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  console.log(request)
  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let data = JSON.parse(dataString);
    console.log(data)
    playlists.push(data);
    console.log('data: ', playlists)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
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

let sendResult = function( response ) {
  let plist = JSON.stringify(playlists)
  
  response.writeHeader( 200, {'Content-Type': 'plain/text'})
  response.write(plist)
  response.end();
}


server.listen( process.env.PORT || port )
