const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000,
      { parse } = require('querystring');

let appdata = {};
let username;
const timeStart = Date.now();

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response );
  }else if( request.method === 'POST' ){
    handlePost( request, response );
  }else if( request.method === 'PUT' ) {
      handlePut(request, response);
  }
});

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 );

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' );
  }else{
    sendFile( response, filename );
  }
};

const handlePost = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data;
  });

  request.on( 'end', function() {

    // ... do something with the data here!!!
    let jsonData = JSON.parse(dataString);
    let timeElapsed = Date.now() - timeStart;
    if(!Object.keys(appdata).includes(jsonData.playerName) && jsonData.playerName !== undefined){
      appdata[jsonData.playerName] = { 'config': 3, 'time': timeElapsed};
    }

    username = jsonData.playerName;

    response.setHeader('Content-Type', 'application/json' );
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.write(JSON.stringify(appdata[jsonData.playerName]));
    response.end();
  })
};

const handlePut = function( request, response ){
    let dataString = '';
    let timeElapsed = Date.now() - timeStart;

    request.on( 'data', function( data ) {
        dataString += data;
    });

    request.on( 'end', function() {
        let jsonData = JSON.parse(dataString);
        if(!Object.keys(appdata).includes(username) && jsonData.config !== undefined){
            appdata[username].config = jsonData.config;
        }
        else {
            appdata['namelessPlayer'] = { 'config': jsonData.config, 'time': timeElapsed};
        }

        response.setHeader('Content-Type', 'application/json' );
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.write(JSON.stringify(jsonData));
        response.end();

    });
};


const sendFile = function( response, filename ) {
   const type = mime.getType( filename );

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content );

     }else{

       // file not found, error code 404
       response.writeHeader( 404 );
       response.end( '404 Error: File Not Found' );

     }
   })
};


server.listen( process.env.PORT || port );
