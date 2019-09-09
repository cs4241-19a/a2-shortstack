const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'title': 'Avengers: Endgame', 'year': 2019, 'direct': 'Russo' },
  { 'title': 'Pay It Forward', 'year': 2004, 'direct': 'Lender'},
  { 'title': 'The Princess Bride', 'year': 1987, 'direct': 'Reiner'},
   { 'title': 'A Beautiful Mind', 'year': 2001, 'direct': 'Howard'},
   { 'title': 'Black Panther', 'year': 2018, 'direct': 'Coogler'} 
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
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''
  let flag = 0;

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let inputData = ( JSON.parse( dataString ) )
    let action = inputData.action
  

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    //movies().each(function (r){json = {title:r = titlesArr, year:r = yearArr, direct:r = directArr}})
    //send={objs:finaljson} JSON.stringify(jsonSend)
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

server.listen( process.env.PORT || port )
