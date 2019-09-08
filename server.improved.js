const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'firstName': 'Janette', 'lastName': 'Fong', 'pronouns': 'She/Her/Hers', 'house': 'Slytherin' },
  { 'firstName': 'Winny', 'lastName': 'Cheng', 'pronouns': 'She/Her/Hers', 'house': 'Ravenclaw' },
  { 'firstName': 'Jose', 'lastName': 'Li Quiel', 'pronouns': 'He/Him/His', 'house': 'Hufflepuff' },
  { 'firstName': 'Harry', 'lastName': 'Potter', 'pronouns': 'He/Him/His', 'house': 'Gryffindor' }
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }
  else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if( request.url === '/studentData') {
    sendData(appdata)
  }
  else{
    sendFile( response, filename )
  }
}

const sendData = function( response, students ) {
  const type = mime.getType( students );
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: students }));
  response.end();
};

const handlePost = function( request, response ) {
  switch ( request.url ) {
    case '/submit':
      const studentInfo = JSON.parse(dataString)
      const newStudent = {
        'firstName': studentInfo.firstName,
        'lastName': studentInfo.lastName,
        'pronouns': studentInfo.pronouns,
        'house': studentInfo.house
      }
      appdata.push(newStudent)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end()
      break
    case '/delete':
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    default:
      response.end('404 Error: File not found')
      break
  }
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

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
