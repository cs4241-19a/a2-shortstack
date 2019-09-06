const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'fName': 'Bob', 'lName': 'Smith', 'day': 23, 'month':'August', 'sign':"AHH"},
  { 'fName': 'Suzy', 'lName': 'Ng', 'day': 30 , 'month':'September', 'sign':"AHH"},
  { 'fName': 'Jim', 'lName': 'Hopper', 'day': 14, 'month': 'July', 'sign':"AHH"} 
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
  else if( request.url == '/printAll'){
    printAll(request, response)
  }
  else{
    sendFile( response, filename )
  }
}


const printAll = function(request, response){
    console.log("IN END")
    response.writeHead(200, "OK", {'Content-Type': 'text/plain' })
  const body = JSON.stringify(appdata) 
  console.log(body)
  response.write("TESTING TEXT")
  response.data = body
  console.log(response)
  response.end()
  
  
}




const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const reqURL = request.url.slice(1)
    switch(reqURL){
      case "submit":
        console.log("submit")
        const convertedData = JSON.parse(dataString)
        console.log(convertedData)
        appdata.push(convertedData)
        console.log(appdata)
        break
      case "modify":
        console.log("modify")
        break
      default:
        console.log(reqURL)
    }
    
    
    // ... do something with the data here!!!
    response.write(JSON.stringify(appdata))
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    console.log(response)
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
