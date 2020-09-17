const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [ 
  {id: 0, username: "Test",  password: "password" ,  ssn : "123456789", admin: false, dateAdded: '1991-8-21', nick: 'T'},
  {id: 1, username: "n0Passw0rdMan123",  password: "password123" ,  ssn : "987654321", admin: false, dateAdded: '2000-2-24', nick: 'PM'}
];

let wasLastAnAdmin = false;

let resultsPage = null;
fs.readFile('public/results.html', function(err, content){
  resultsPage = content;
});

let headerFile;
fs.readFile('public/header.html', function(err, content){
    headerFile = content;
});


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
    sendFile( response, 'public/index.html' );
  }else if (request.url === '/users'){
    sendFile( response, 'public/results.html' );
  }else if (request.url === '/style.css') {
    sendFile( response, 'public/css/style.css');
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  if( request.url === '/delete' ) {
    let toDelete = '';

    request.on('data', function( data ) {
      toDelete += data;
      toDelete = JSON.parse(toDelete).id;
    });

    request.on('end', function(){
      appdata = appdata.filter(function(val){
        return val.id !== toDelete;
      })
    });
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end();
  } else if (request.url === '/userList'){
    let redactedData = [];
    if (wasLastAnAdmin){
      appdata.forEach(function(element){
        redactedData.push({id: element.id, 
          username: element.username,  
          password: element.password ,  
          ssn : -1, 
          admin: element.admin, 
          dateAdded: element.dateAdded, 
          nick: element.nick})
      });
    } else {
      appdata.forEach(function(element){
        redactedData.push({id: element.id, 
          username: element.username,  
          password: -1 ,  
          ssn : -1, 
          admin: element.admin, 
          dateAdded: element.dateAdded, 
          nick: element.nick})
      });
    }
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end(JSON.stringify(redactedData));
  } else {
    let dataString = '';
    let nick = '';
    request.on( 'data', function( data ) {
        dataString += data;
        data = JSON.parse(dataString);
        wasLastAnAdmin = data.admin;
        let dateAdded = new Date();
        dateAdded =  `${dateAdded.getFullYear()}-${dateAdded.getMonth()}-${dateAdded.getDate()} ${dateAdded.getHours()}:${dateAdded.getMinutes()}`;
        data.dateAdded = dateAdded;
        let upperCase = '';
        for (let i = 0; i < data.username.length; i++){
          if (data.username.charAt(i) === data.username.charAt(i).toUpperCase()){
            upperCase += data.username.charAt(i);
          }
        }
        if (upperCase.length > 0){
          data.nick = upperCase;
        } else{
          if (data.username.length === 0){
            data.nick = 'Blank';
          } else {
            data.nick = data.username.charAt(0);
          }
        }
        response.end(data.nick);
        if (appdata.length === 0){
          data.id = 0
        } else {
          data.id = parseInt(appdata[appdata.length - 1].id) + 1;
        }
        appdata.push(data);
    })
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    
  }

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
