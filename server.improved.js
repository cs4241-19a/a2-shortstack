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
  else if (request.url == '/getData'){
    console.log("IN RETREVIAL")
    sendData(response, appdata)
  }
  else if( request.url == '/printAll'){
    printAll(request, response)
  }
  else{
    sendFile( response, filename )
  }
}

const sendData = function(res, horoscope){
  const mimeType = mime.getType(horoscope)
  res.writeHeader(200, {'Content-Type': mimeType})
  res.write(JSON.stringify({data: horoscope}))
  res.end()
}







const printAll = function(req, res){
    req.on('end', function(){
      let data = JSON.stringify(appdata)
      res.write(data)
      res.writeHead(200, "OK", {'Content-Type': 'plain/text' })
      res.end()
  })
  
  
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
        if(noDuplicates(convertedData)){
            appdata.push(convertedData)
          let json = JSON.stringify(appdata)
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.write(json)
          response.end()
        }
        else{
          let json = JSON.stringify(appdata)
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.write("Duplicate Information, Not Added!")
          response.end()
        }
        // ... do something with the data here!!!
        
        break
      case "modify":
        console.log("modify")
        break
      default:
        console.log(reqURL)
    }
    
    
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

//Checks for duplicate info
function noDuplicates(dataToAdd){
  for(let i = 0; i< Object.keys(appdata).length; i++){
    console.log("TEST")
    if((dataToAdd.fName === appdata[i].fName) && (dataToAdd[1] === appdata[i][1])){
      if((dataToAdd[3] === appdata[i][3]) && (dataToAdd[4] === appdata[i][4])){
        return false;
      }
    }
  }
  return true;
}
