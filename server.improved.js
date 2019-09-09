const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

//TABLE
// const imageOfCar = [
//   'Toyota': "data:image/jpeg;base64,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QWHfrZSFmvZ28d26xXl8s7h6K98qksBnfYaAZnWAG4AX0Qempp2sF3Oa36xDftXm3aSqb/aNXJFlI+UyOZbVpIfmuLbwXA7ua0NbGc1zc34nXyuVbidbcg7mv6s1tDBA21Ox8DohvzMmMd5HHi8uMrieTGjcFjUtF11Q2odYMNPHK+/0Q3J2fzg+Md/LVW9l8cgifGaiMvERJjc02cwnN2HWBzNBe4gW0JPnl4hi4miZS0rHMp2X3kuc67i7KTvIBcdOF0GnrKl0skkjt8j3PPi4k/erQYV0WHbK1EtssZtzOgXV4X0bONjK7yb+KCNW05K2dBs/NL7Ebj3209VM+F7DQR2tGCebtV0tLg7W7gAghzDOjqZ1s5DR3alddhfR5AyxcC89/wCCkWKiAV9sICDn6HAGMADWgeAstpDh4C2AC+oLLKcBXA1VIgIiICIiAqXMBVSIMaSjaeCwajBWO4Lbog5Kq2Va7gtNV7Eg8FIy+WQRHU7CngFrKjYh44KbjGOSoNO3kggObY+QcFhS7LyD3SvQjqFh4BWnYVGfdCDzu/Z6Qe6VYdgUn0SvRTsEiPuhWzgEX0Qg86nBZPolfP7Gf9Er0T/d6L6IT+7sX0Qg86/2JIfdKDZ2U7mH0XoxuAxD3QrzMJjHuj0QecmbGTv06txWbSdFU7zq3IO933L0M2haOCuClCCGMO6H4xbrZHnuboPVdvg+xcEAAZGNOJ1K7NsIVYYEGrgwsDgs2OlAWSiCgRhVWX1EBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBFh1FPIXEtksCBYW3EEE+tj6qy2lnFvnr66jI3dfhYf13KNSS/cbJFpzRVWn+IGjbH5tpu62h3aC+tvLhc7hVkREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//2Q=="
// ]
const tableOfCar = [
  {'id': 0, 'model': 'Toyota', 'year': 1999, 'mpg': 23, 'value': 1000 },
  {'id': 1, 'model': 'Honda', 'year': 2004, 'mpg': 30, 'value': 2000  },
  {'id': 2, 'model': 'Nissan', 'year': 2013, 'mpg': 9, 'value': 10000 } 
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
  tableOfCar.push(data);
  let row = tableOfCar[tableOfCar.length-1];
  let year = row['year'];
  let mpg = row['mpg'];
  let weight = (year*1 === 0 || mpg*1 === 0) ? 0 : 1;
  tableOfCar[tableOfCar.length-1]['value'] = (mpg*1000 - (2019-year)*10) * weight;
  console.log('add: ' + data['model']);
}

const deleteCar = function (string) {
  let data = JSON.parse(string);
  let id = data['id'];
  let model = data['model'];
  for (let i = 0; i < tableOfCar.length; i++) {
    let row = tableOfCar[i];
    if(row['id'] === id && row['model'] === model){
      console.log('delete here ');
      tableOfCar.splice(i,1);
    }
  }
  console.log('del: ' + data['model']);
}

const modifyCar = function (string) {
  deleteCar(string);
  addCar(string);
  let data = JSON.parse(string);
  console.log('mod: ' + data['model']);
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
