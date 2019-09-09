

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appData = [
  {'firstNumber': "55", 'operator': "3", 'secondNumber': "40"}, 
  {'firstNumber': "2", 'operator': "4", 'secondNumber': "0"}
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
  }else if(request.url === '/cal'){ //should change this 
    response.writeHeader( 200, 'OK', {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appData))
    
  }else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    data = JSON.parse(dataString)
    appData.push(data)

    //response.end(result);
    //response.end(JSON.parse(dataString));

    if(request.url === '/delete'){
      appData.splice(data.row, 1)
    }

    if(request.url == '/edit'){
      let pos = data.index;
      
      appData[index].firstNumber = data.firstNumber;
      appData[index].operator = data.operator;
      appData[index].SecondNumber = data.secondNumber;
    }
    response.writeHeader( 200, 'OK', {'Content-Type': 'text/plain' })
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
server.listen( process.env.PORT || port )
