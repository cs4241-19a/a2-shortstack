const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { "vertices": 3, "drawType": "Triangle", "name": "Triangle", "points": [5]},
  { "vertices": 5, "drawType": "Line", "name": "Mountain", "points": [7, 8]},
  { "vertices": 3, "drawType": "Triangle", "name": "Triangle", "points": [1, 1, 1]},
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  
  switch( request.url ) {
    case '/script.js':
      sendFile( response, 'DrawMode.js' )
      break
    case '/MV.js':
      sendFile( response, 'MV.js' )
      break
    case '/initShaders.js':
      sendFile( response, 'initShaders.js' )
      break
    case '/webgl-utils.js':
      sendFile( response, 'webgl-utils.js' )
      break
  
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if( request.url === '/getDrawings'){
    const type = mime.getType( appdata ) 
    response.writeHeader(200, { 'Content-Type': type })
    response.end(JSON.stringify(appdata));
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
    switch(request.url){
      case '/generate':
        let data = JSON.parse(dataString)
        //generate random number for points
        let points = [2, 5, 7, 8]
        
        let drawing = {
          "vertices": data.vertices, 
          "drawType": data.drawType, 
          "name": data.name, 
          "points": points
        }
        
        appdata.push(drawing)
        
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
        
      case '/delete':
        let index = JSON.parse(dataString)
        appdata.splice(index, 1)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
        
      case '/update':
        let newData = JSON.parse(dataString)
        let idx = newData.idx
        
        appdata[idx].vertices = newData.vertices
        appdata[idx].drawType = newData.drawType
        appdata[idx].name = newData.name
        
        break
    }
    
    // ... do something with the data here!!!

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

server.listen( process.env.PORT || port )
