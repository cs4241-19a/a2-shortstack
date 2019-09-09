const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'title': 'Title', 'author': "Author", 'year': "Year", 'time':'Time' }
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  console.log(request.url)
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  
  }
  else if(request.url === '/appData'){
    response.writeHeader( 200, { 'Content-Type': 'text/plain' })
    response.write(JSON.stringify(appdata))
    response.end()
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

  const getCurrentDayAndTime = function(){
    let currentdate = new Date(); 
    let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime
  }

  request.on( 'end', function() {
    const data = JSON.parse(dataString)
    let date = new Date(Date.now())
    console.log(getCurrentDayAndTime())
    let time = getCurrentDayAndTime()
    appdata.push({ 'title': data['title'], 'author': data['author'], 'comment': data['comment'], 'time': time })
    console.log(data['title'])
    console.log("App Data: " + JSON.stringify(appdata))
    console.log("Data: " + dataString)
      
    

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {
     if( err === null ) {
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