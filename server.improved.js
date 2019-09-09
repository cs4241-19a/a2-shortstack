const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { "vertices": 8, 
    "numPoly": 12,
    "name": "Cube",
    "points": [[-0.5, -0.5, -0.5, 1], 
               [0.5, -0.5, -0.5, 1], 
               [0.5, 0.5, -0.5, 1], 
               [-0.5, 0.5, -0.5, 1], 
               [-0.5, -0.5, 0.5, 1], 
               [0.5, -0.5, 0.5, 1],
               [0.5, 0.5, 0.5, 1],
               [-0.5, 0.5, 0.5, 1]],
   "triangles":[3, 2, 1, 3, 1, 0, 6, 7, 4, 6, 4, 5, 5, 1, 2, 5, 2, 6, 0, 4,
                7, 0, 7, 3, 6, 2, 3, 6, 3, 7, 4, 0, 1, 4, 1, 5]},
  
  { "vertices": 5, 
    "numPoly": 10, 
    "name": "Mountain", 
    "points": [7, 8]},
  { "vertices": 3, 
    "numPoly": 5, 
    "name": "Triangle", 
    "points": [1, 1, 1]},
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
          "numPoly": data.numPoly, 
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
        appdata[idx].numPoly = newData.numPoly
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
