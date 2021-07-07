const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

var appdata = []

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
  }else if(request.url === '/data'){
    response.writeHeader(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(appdata))
  }else{
    sendFile(response,filename)
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    console.log("this is the data string: " + dataString );

    var nonStringData = JSON.parse(dataString)
    nonStringData.timeLeft = stringTimeRemainingUntil(nonStringData.dueDate);
    console.log(nonStringData);

    appdata.push(nonStringData);
    console.log("This is the current server data: " + JSON.stringify(appdata))
    response.writeHeader( 200, {'Content-Type': 'application/json' })
    response.end(JSON.stringify(appdata))
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


function stringTimeRemainingUntil(date){
  var currentDate = new Date();
  var dueDate = getDate(date);
  return convertMS(Math.abs(dueDate-currentDate))

  function getDate(date_string) {
    var date_components = date_string.split("-");
    var year = date_components[0];
    var month = date_components[1];
    var day = date_components[2];
    return new Date(year, month - 1, day);
  }

  function convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return day +" days, " + hour + " hours, " + minute + " minutes.";
  }
}



