const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

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
    dataStorage = []
  }else{
    sendFile( response, filename )
  }
}

let dataStorage = []

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    let data = JSON.parse(dataString)
    let activity = ''
    let description = ''
    
    if(data.stress === "Low"){
      if (data.time === "5 Minutes"){
        activity = 'Text a friend'
        data['activity'] = activity
      }if (data.time === "10 Minutes"){
        activity = 'Drink tea'
        data['activity'] = activity
      }else if (data.time === "30 Minutes"){
        activity = 'Do a face mask'
        data['activity'] = activity
      }else if (data.time === "1 Hour"){
        activity = 'Hang out with friends'
        data['activity'] = activity
      }
    }
    
    if(data.stress === "Moderate"){
      if (data.time === "5 Minutes"){
        activity = 'Make a to-do list'
        data['activity'] = activity
      }if (data.time === "10 Minutes"){
        activity = 'Listen to music'
        data['activity'] = activity
      }else if (data.time === "30 Minutes"){
        activity = 'Do a coloring page'
        data['activity'] = activity
      }else if (data.time === "1 Hour"){
        activity = 'Watch a movie'
        data['activity'] = activity
      }
    }
    
    if(data.stress === "High"){
      if (data.time === "5 Minutes"){
        activity = 'Controlled Breathing'
        data['activity'] = activity
      }if (data.time === "10 Minutes"){
        activity = 'Write a journal entry'
        data['activity'] = activity
      }else if (data.time === "30 Minutes"){
        activity = 'Meditate'
        data['activity'] = activity
      }else if (data.time === "1 Hour"){
        activity = 'Take a nap'
        data['activity'] = activity
      }
    }
    
    dataStorage.push(data)    

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(dataStorage))
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
