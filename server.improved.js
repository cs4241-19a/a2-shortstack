const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

//TABLE
const tableOfCar = [
  {'id': 0, 'model': 'toyota', 'year': 1999, 'mpg': 23, 'value': 1000 },
  {'id': 1, 'model': 'honda', 'year': 2004, 'mpg': 30, 'value': 2000  },
  {'id': 2, 'model': 'ford', 'year': 1987, 'mpg': 14, 'value': 0 } 
]

//CREATE SERVER
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

//TABLE HANDLERS
const addCar = function (string) {
  let data = JSON.parse(string);
  console.log('add called: ' + data['model']);
  tableOfCar.push(data);
  let row = tableOfCar[tableOfCar.length-1];
  let value = row['value'];
  let year = row['year'];
  let mpg = row['mpg'];
  value = mpg*1000 - (2019-value)*10
  tableOfCar[tableOfCar.length-1]['value'] = 
    (typeof value !== "number" ) ? 
    0 : value;
}

const deleteCar = function (string) {
  let data = JSON.parse(string);
  console.log('del called: ' + data['model']);
}

const modifyCar = function (string) {
  let data = JSON.parse(string);
  console.log('mod called: ' + data['model']);
}

//HANDLERS
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if (request.url === '/get') {
    sendTable(response, tableOfCar);
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
    console.log( JSON.parse( dataString ) )
    if (request.url === '/add') {
      addCar(dataString);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    }
    else if (request.url === '/delete') {
      deleteCar(dataString);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    }
    else if (request.url === '/modify') {
      modifyCar(dataString);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    }
    else{
      response.writeHead( 404, "ERROR: PAGE NOT FOUND", {'Content-Type': 'text/plain' })
    }
    response.end()
  })
}

//DATA
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

const sendTable = function (response, table) {
  const type = mime.getType(table);
  response.writeHead(200, {'Content-Type': type});
  response.write(JSON.stringify(table));
  response.end()
}

//SERVER START
server.listen( process.env.PORT || port )
