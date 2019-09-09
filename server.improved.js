
var MN=3;

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'matchNumber':1,'red1': 8192, 'blue1': 7146, 'redScore': 25, 'blueScore':25},
  { 'matchNumber':2,'red1': 6439, 'blue1': 359, 'redScore': 23, 'blueScore':32 } 
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
  } else if (request.url === '/public/css/style.css'){
    sendFile( response, 'public/css/style.css' )
  } else if ( request.url === '/m' ){
    sendData( response, appdata )
   } else {
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
    
  switch ( request.url ) {
      case '/submit':
      const MR = JSON.parse(dataString); //match result
      const newMR ={
        'matchNumber':MN,
        'red1': MR.red1, 
        'blue1': MR.blue1, 
        'redScore': MR.redScore, 
        'blueScore':MR.blueScore
      }
      MN++;
      appdata.push(newMR);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end();

      break;
      
     case '/delete':
       const MRdelete = JSON.parse(dataString); //match result
       appdata.splice(MRdelete.orderNumber, 1);
 //      MN--;
 //     appdata.push(newMR);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end();

      break;
      
  
  }
  })
}

const sendData = function( response, MHs ) {
  const type = mime.getType( MHs );
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: MHs }));
  response.end();
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
