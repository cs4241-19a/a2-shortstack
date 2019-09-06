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
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data
  })
if( request.url === '/submit'){
    request.on( 'end', function() {
      let parsedData = JSON.parse( dataString )
      console.log("Note: " + parsedData.Note)
      console.log("Due: " + parsedData.Date)
      appdata.push({ 'Note': parsedData.Note, 'Date': createDate(parsedData.Date), 'Days': daysRemaining(parsedData.Date)})
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(appdata))
  })
} else if( request.url === '/refresh'){
    request.on( 'end', function() {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(appdata))
    })
} else if( request.url === '/delete'){
    request.on( 'end', function() {
    console.log(dataString)
    let parsedData = JSON.parse( dataString )
    let item = parsedData.Item
    console.log("trying to delete " + item)
    appdata.splice(item-1, 1)
    })
}
  
}
function createDate(date){
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let dateArray = date.split('-')
        return new Date(dateArray[0], dateArray[1]-1, dateArray[2]).toLocaleDateString("en-US", options)
}
function daysRemaining(date){
        let dateArray = date.split('-')
        const diffTime = new Date(dateArray[0], dateArray[1]-1, dateArray[2]).getTime() - new Date().getTime()
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))+1
        console.log("Days: " + diffDays)
        return diffDays
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
