const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

var admin = require('firebase-admin');

var serviceAccount = require("./serviceKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://a2-webware.firebaseio.com'
});

var db = admin.database();
var ref = db.ref("/");
var usersRef = ref.child("users");

require('firebase/app');
require("firebase/firestore");

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
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
    sendFile(response, 'public/index.html')
  }else if(request.url === '/receive') {
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      response.end(JSON.stringify(snapshot.val()))
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
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
    console.log( JSON.parse( dataString ) )
    json = JSON.parse( dataString )

    // ... do something with the data here!!!
    if(Object.keys(json).length === 4) {
      var username = JSON.stringify(json.name).replace(/^"(.*)"$/, '$1');
      var email = username + "@tasktracker.com"
      var emailKey = "email"

      json[emailKey] = email

      writeUserData(json.name, json.Board, json.name, json.fullname, json.email, json.Color, json.Board)
    }

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

function writeUserData(ref, refBoard, username, fullname, email, color, boardName) {
  var usernameRef = usersRef.child(ref);
  var boardRef = usernameRef.child(refBoard);
  boardRef.set({
    username: username,
    fullname: fullname,
    email: email,
    color: color,
    boardName: boardName
  });
}

server.listen( process.env.PORT || port )
