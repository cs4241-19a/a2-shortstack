var data = '{ "students" : [' +
    '{ "firstName":"Rory" , "lastName":"Sullivan" , "Grade":"Senior" , "Accidents":"0" , "DOG":"2021" },' +
    '{ "firstName":"Patrick" , "lastName":"Star" , "Grade":"Junior" , "Accidents":"2" , "DOG":"2022" },' +
    '{ "firstName":"Spongebob" , "lastName":"Squarepants" , "Grade":"Junior" , "Accidents":"102" , "DOG":"2022" },' +
    '{ "firstName":"Sandy" , "lastName":"Cheeks" , "Grade":"Senior" , "Accidents":"0" , "DOG":"2021" },' +
    '{ "firstName":"Plankton" , "lastName":"Lawrence" , "Grade":"Freshman" , "Accidents":"4" , "DOG":"2024" },' +
    '{ "firstName":"Eugene" , "lastName":"Krabs" , "Grade":"Sophmore" , "Accidents":"3" , "DOG":"2023" },' +
    '{ "firstName":"Pearl" , "lastName":"Krabs" , "Grade":"Freshman" , "Accidents":"1" , "DOG":"2024" },' +
    '{ "firstName":"Squidward" , "lastName":"Tentacles" , "Grade":"Senior" , "Accidents":"1" , "DOG":"2021" }]}';

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
  }
  else if( request.url === '/professorData') {
    var jsonData = JSON.parse(data);

    response.writeHead(200, {'Content-type': 'text/plain'})
    response.end(JSON.stringify(jsonData));
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {

  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ))

    var obj = JSON.parse(data);

    var fn;
    var ln;
    var json = JSON.parse( dataString );
    var res = json.yourname.split(" ");
    if(res.length <= 0) {
      fn = "No first name given"
      ln = "No last name given"
    }
    else if(res.length == 1){
      fn = res[0];
      ln = "No Last Name Given";
    }
    else {
      fn = res[0];
      ln = res[1];
    }

    var yog = new Date().getFullYear();

    var newStr = {"firstName":fn , "lastName":ln , "Grade":"Freshman" , "Accidents":Math.round(Math.random() * Math.floor(20)) , "DOG":yog};


    obj['students'].push(newStr);
    data = JSON.stringify(obj);
    // ... do something with the data here!!!
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(dataString);
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
