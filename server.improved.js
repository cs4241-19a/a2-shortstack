const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let next_id = 1
const appdata = [
  { 'id': 0, 'name': 'ISS', 'orbit_type': 'LEO', 'has_launched': true, 'mission_start': 911520000000, 'mission_completed': false, 'mission_end': 0, 'elapsed': 0 }
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const refreshCalculated = function (data) {
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].mission_completed === false) {
      appdata[i].elapsed = Date.now() - appdata[i].mission_start
    } else {
      appdata[i].elapsed = appdata[i].mission_end - appdata[i].mission_start
    }
    
    if (appdata[i].mission_start > new Date()) {
      appdata[i].has_launched = false
    } else {
      appdata[i].has_launched = true
    }
  }
}

const addSpacecraft = function (data) {
  const new_spacecraft = data
  new_spacecraft.id = next_id
  next_id += 1
  appdata.push(new_spacecraft)
  refreshCalculated()
  console.log(appdata)
}

const removeSpacecraft = function (data) {
  const id = data.id
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].id === id) {
      appdata.splice(i, 1)
    }
  }
}

const endMission = function (data) {
  const id = data.id
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].id === id) {
      appdata[i].mission_completed = true
      appdata[i].mission_end = Date.now()
    }
  }
  
  refreshCalculated()
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if ( request.url === '/spacecraft_data' ) {
    response.writeHeader( 200, { 'Content-Type': 'application/json' })
    refreshElapsed()
    response.end( JSON.stringify(appdata) )
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const data = JSON.parse( dataString )

    switch ( request.url ) {
      case '/add_spacecraft':
        addSpacecraft(data)
        break
      case '/remove_spacecraft':
        removeSpacecraft(data)
        break
      case '/end_mission':
        endMission(data)
        break
      default:
        break
    }

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
