const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'name': 'John Doe', 'age': 21, 'occupation': 'Student', 'strength': 50, 'dexterity': 45, 'intelligence': 38, 'luck': 25, 'odd': 15, 'total': 173},
  { 'name': 'Jane Doe', 'age': 21, 'occupation': 'Student', 'strength': 55, 'dexterity': 40, 'intelligence': 38, 'luck': 30, 'odd': 15, 'total': 178 }
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
  else if ( request.url === '/view-characters' ){
    const type = mime.getType( appdata ) 
    response.writeHeader( 200, { 'Content-Type': type } ) 
    response.write( JSON.stringify( appdata ) )
    console.log( JSON.stringify( appdata ) )
    response.end()
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  debugger
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    if ( request.url === '/submit') {
      let inputData = JSON.parse( dataString )
      let totalStats = calculateStats(parseInt(inputData.strength), parseInt(inputData.dexterity), parseInt(inputData.intelligence), parseInt(inputData.luck), parseInt(inputData.odd))
      const newChar = {'name': inputData.name, 
                       'age': inputData.age, 
                       'occupation': inputData.occupation, 
                       'strength': inputData.strength, 
                       'dexterity': inputData.dexterity, 
                       'intelligence': inputData.intelligence, 
                       'luck': inputData.luck, 
                       'odd': inputData.odd, 
                       'total': totalStats 
                      }
      console.log( newChar )
      
      appdata.push( newChar )
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end()
      
    }
    else if ( request.url === '/delete') {
      let inputData = JSON.parse( dataString )
      let index = inputData.charNum
      
      //console.log( "Attempting to delete: " + inputData )
      
      if ( index > -1 ) {
        appdata.splice( index, 1 )
      }
      
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end()
      
    }
    else if ( request.url === '/edit') {
      debugger
      let inputData = JSON.parse( dataString )
      console.log(inputData)
      let index = inputData.charNum
      console.log(index)
      let totalStats = calculateStats(parseInt(inputData.charEdit.strength), parseInt(inputData.charEdit.dexterity), parseInt(inputData.charEdit.intelligence), parseInt(inputData.charEdit.luck), parseInt(inputData.charEdit.odd))
      const edited = {'name': inputData.charEdit.name, 
                       'age': inputData.charEdit.age, 
                       'occupation': inputData.charEdit.occupation, 
                       'strength': inputData.charEdit.strength, 
                       'dexterity': inputData.charEdit.dexterity, 
                       'intelligence': inputData.charEdit.intelligence, 
                       'luck': inputData.charEdit.luck, 
                       'odd': inputData.charEdit.odd, 
                       'total': totalStats 
                      }
      console.log(edited)
      if ( index > -1 ) {
        appdata.splice(index, 1, edited)
        console.log(appdata)
      }
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end()
      
    }
    else
      // nothing happens
      response.end()
    
  })
}

const calculateStats = function (str, dex, int, luk, odd) {
  
  return str + dex + int + luk + odd

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
