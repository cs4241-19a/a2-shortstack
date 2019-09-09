//Database Information
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trip-budget-c8470.firebaseio.com"
});

var db = admin.database();
var users = db.ref('/');

// IMPORTANT: you must run `npm install` in the directory for this assignment
// to install the mime library used in the following line of codek
const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [ //can add/edit/delete any object in here 
  { 'model': 'Toyota', 'year': 2002, 'mpg': 23, 'tripDistance': 300, 'gasPrice': 2.39, 'totalGallons': 13.04, 'totalCost': 31.16 },
  { 'model': 'Honda', 'year': 2004, 'mpg': 30, 'tripDistance': 230, 'gasPrice': 3.40, 'totalGallons': 7.66, 'totalCost': 26.04  },
  { 'model': 'Ford', 'year': 2000, 'mpg': 14, 'tripDistance': 113, 'gasPrice': 4.50, 'totalGallons': 8.07, 'totalCost': 36.31 } 
]


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){ //could add more functions like delete here, but could also have just POST and have the urls to determine what to do  
    handlePost( request, response ) 
  }
})

//use handleGet to display data structure (server) in UI (server to UI)
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' ) //do sendFile for javascript file
  }else if(request.url === '/carData'){
    sendData(response, appdata)
  }else if(request.url==='/getData'){
    users.on('value', function(findVal) {
      response.end(JSON.stringify(findVal.val()))
    }, function (err) {
      console.log('The read failed: ' + err.code);
    });
  }
  else{
    sendFile( response, filename )
  }
}
//communicate from HTML to server
//change url to look at specific file (same as a1 with switch statement) (if request.url = add, add the data)
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    const data = JSON.parse(dataString)
    

    switch( request.url ) {      

      case '/submit':
      //server logic 
        let totalGallons = (parseInt(data.tripDistance) / parseInt(data.mpg))

        let totalCost = (totalGallons*(parseInt(data.gasPrice)))
        
        const carData = {
          'model': data.model,
          'year': data.year,
          'mpg': data.mpg,
          'tripDistance': data.tripDistance,
          'gasPrice': data.gasPrice,
          'totalGallons': totalGallons.toFixed(2),
          'totalCost': totalCost.toFixed(2)
        }
        
        if( request.url === '/submit') {
          let foundName=false //figuring out if something already exists
          for (let i=0; i<appdata.length; i++){
            if((appdata[i].model === carData.model)&&(appdata[i].year === carData.year)
               &&(appdata[i].mpg === carData.mpg)&&(appdata[i].tripDistance === carData.tripDistance)
               &&(appdata[i].totalGallons === carData.totalGallons)) {
              foundName = true
            }
          }
          if(foundName == false){
            appdata.push(carData) //creates new row of data in JSON file
          }
        }

        console.log(appdata) 
        
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break

      case '/delete':
        appdata.splice(data.rowData, 1)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break

      case '/update':
        let index = data.index
        appdata[index].model = data.model
        appdata[index].year = data.year
        appdata[index].mpg = data.mpg
        appdata[index].tripDistance = data.tripDistance
        appdata[index].gasPrice = data.gasPrice
        appdata[index].totalGallons = data.totalGallons
        appdata[index].totalCost = data.totalCost
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break

      default:
        response.end( '404 Error: File Not Found' )
  }
    
  
  })
}

const sendData = function(response, carsdata){

  response.end(JSON.stringify(carsdata));
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
