var admin = require('firebase-admin');
var serviceAccount=require("./serviceKey.json")

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
      databaseURL:'https://cs4241-a2.firebaseio.com'
});
var db = admin.database();
var usersRef = db.ref('/');

const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 8000;

const appdata = [ //can add/edit/ delete any object in here
  { 'currentGrade': 'toyota', 'desired': 1999, 'finalWorth': 23 },
  { 'currentGrade': 'honda', 'desired': 2004, 'finalWorth': 30 },
  { 'currentGrade': 'ford', 'desired': 1987, 'finalWorth': 14 }
]


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ){ //could add more functions like delete here, but could also have just POST and have the urls to determine what to do
    handlePost( request, response )
  }
});

//use handleGet to display data structure (server) in UI (server to UI)
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' ) //do sendFile for javascript file
  }else if(request.url === '/getdata'){
    sendData(response, appdata)
  }else if(request.url==='/receive'){
    usersRef.on('value', function(snapshot) {
      console.log(snapshot.val());
      response.end(JSON.stringify(snapshot.val()))
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  }

  else{
    sendFile( response, filename )
  }
};
//communicate from HTML to server
//change url to look at specific file (same as a1 with switch statement) (if request.url = delete, delete the data)
const handlePost = function( request, response ) {
  let dataString = '';
  request.on( 'data', function( data ) {
      dataString += data
  });
  request.on( 'end', function() {
    const data = JSON.parse(dataString);
    writeUserData(data.currentGrade, data.currentGrade, data.desired,data.finalWorth);
      //For validation
/*    if( request.url === '/add') {
      let foundName=false //figuring out if something already exists
      for (let i=0; i<appdata.length; i++){
       if(appdata[i],name === data.name) foundName = true
      }
      if(foundName == false){
       appdata.push(data)
      }
  }*/

    switch( request.url ) {
      case '/submit':
      //server logic
        const grades = {
          'currentGrade': data.currentGrade,
          'desired': data.desired,
          'finalWorth': data.finalWorth,
        };
        let desiredPercentage=parseInt(data.desired)*0.01;
        let finalWorthPercentage=parseInt(data.finalWorth)*0.01;
        let currentGradePercentage=parseInt(data.currentGrade)*0.01;
        let finalExam=(desiredPercentage-(1-finalWorthPercentage)*currentGradePercentage)/finalWorthPercentage;
        appdata.push( grades);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.end();
        break;
      case '/delete':
        appdata.delete( data );
        break;
      case '/update':
        appdata.update( data );
        break;
      default:
        response.end( '404 Error: File Not Found' )
  }
  })
};

const sendData = function(response, gradeDataset){
  const type = mime.getType( gradeDataset ) ;
  response.writeHeader( 200, { 'Content-Type': type });
  response.write(JSON.stringify({data: gradeDataset}));
  response.end();
};

const sendFile = function( response, filename ) {
   const type = mime.getType( filename );

   fs.readFile( filename, function( err, content ) {
     if( err === null ) {
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content )
     }else{
       response.writeHeader( 404 );
       response.end( '404 Error: File Not Found' )
     }
   })
};

function writeUserData(ref, currentGrade, desired,finalWorth) {
  var usernameRef = usersRef.child(ref);
  usernameRef.set({
    currentGrade: currentGrade,
    desired: desired,
    finalWorth:finalWorth,
  });
}

server.listen( process.env.PORT || port );