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

const itemsStore = {}

const server = http.createServer( function( request,response ) {
  writeCorsHeaders(request, response);
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ){
    handlePost( request, response )
  }else if (request.method === 'OPTIONS') {
    handleOptions(request, response);
  }
})

const writeCorsHeaders = function(request, response) {
  response.setHeader('Access-Control-Allow-Headers', request.headers.origin);
  response.setHeader('Access-Control-Request-Method', request.headers.origin);
  response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
  response.setHeader('Access-Control-Allow-Headers', 'authorization, content-type')
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
}

const handleOptions = function(request, response) {
  response.writeHead(200);
  response.end();
}

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

  request.on( 'data', function( data ) {
      dataString += data
  })

  request.on( 'end', function() {
    const req = JSON.parse( dataString );
    switch(req.type) {
      case 'getData':
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify({ itemsStore }))
        break;
      case 'addItem':
        itemsStore[req.data.id] = req.data;
        response.writeHead(200);
        response.end();
        break;
      default:
        console.error(`Don't know what to do with`, req);
        response.writeHead(400);
        response.end();
        break;
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
