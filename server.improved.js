const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'title': 'Brave New World', 'author': 'Aldous Huxley', 'genre': 'Fiction', 'numPages':250,'pagesRead':100, 'percentRead':40 },
  { 'title': 'Catcher in the Rye', 'author': 'J.D. Salinger', 'genre': 'Fiction', 'numPages':250,'pagesRead':100, 'percentRead':40 },
]

const server = http.createServer( function( request,response ) {
  if ( request.method === 'GET' ) {
    handleGet( request, response )    
  }
  else if ( request.method === 'POST' ) {
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if ( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if ( request.url == '/getdata' ){
    getdata( response )
  }
  else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  if ( request.url === '/newEntry') {
    newEntry( request, response )
  }
  else if ( request.url === '/editEntry' ) {
    editEntry( request, response )
  }
  else if ( request.url === '/deleteEntry' ) {
    deleteEntry( request, response )
  }
  else {
    response.writeHeader( 404 )
    response.end( '404 Error: File Not Found' )
  }
}

const deleteEntry = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data 
  })

  request.on( 'end', function() {
    var entry = JSON.parse(dataString)
    for ( var i = 0; i < appdata.length; i++) {
      if (appdata[i].title === entry.title) {
        appdata.splice( i, 1)
      }
    }

    response.writeHead( 200, "OK", {'Content-Type': 'application/json'} )
    var json = JSON.stringify( appdata )
    response.end( json )
  })
}

const editEntry = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data 
  })

  request.on( 'end', function() {
    console.log( "data string " + JSON.parse(dataString) )
    const entry = JSON.parse(dataString).entryKey,
          newEntry = JSON.parse(dataString).newEntry,
          percent = calculatePercentRead( newEntry )
          newEntry.percentRead = percent

    for ( var i = 0; i < appdata.length; i++) {
      if (appdata[i].title === entry) {
        appdata.splice( i, 1, newEntry )
      }
    }

    response.writeHead( 200, "OK", {'Content-Type': 'application/json'} )
    var json = JSON.stringify( appdata )
    response.end( json )
  })
}

const newEntry = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ))
    
    const dataJson = JSON.parse( dataString ),
          percent = calculatePercentRead( dataJson )
    dataJson.percentRead = percent
    appdata.push( dataJson )

    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    var json = JSON.stringify( appdata )
    response.end(json);
  })
}

const calculatePercentRead = function( dataJson ) {
  return (dataJson.pagesRead / dataJson.numPages ) * 100
}

const getdata = function( response ) {
  response.writeHead( 200, "OK", {"Content-Type":"application/json"})

  var json = JSON.stringify( appdata )
  response.end(json)
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {
       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )
     }
     else {
       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )
     }
   })
}

server.listen( process.env.PORT || port )
