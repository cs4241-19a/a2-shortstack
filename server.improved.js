const http = require( 'http' ),
    fs   = require( 'fs' ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require( 'mime' ),
    dir  = 'public/',
    port = 3000

const appdata = [ //can add/edit/ delete any object in here
  { 'firstName': 'Janette', 'lastName': 'Fong', 'pronouns': 'She/Her/Hers', 'house': 'Slytherin' },
  { 'firstName': 'Winny', 'lastName': 'Cheng', 'pronouns': 'She/Her/Hers', 'house': 'Ravenclaw' },
  { 'firstName': 'Jose', 'lastName': 'Li Quiel', 'pronouns': 'He/Him/His', 'house': 'Hufflepuff' },
  { 'firstName': 'Harry', 'lastName': 'Potter', 'pronouns': 'He/Him/His', 'house': 'Gryffindor' },
]


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ){ //could add more functions like delete here, but could also have just POST and have the urls to determine what to do
    handlePost( request, response )
  }
})

//use handleGet to display data structure (server) in UI (server to UI)
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' ) //do sendFile for javascript file
  }
  else if(request.url === '/studentData'){
    sendData(response, appdata)
  }
  else{
    sendFile( response, filename )
  }
}
//communicate from HTML to server
//change url to look at specific file (same as a1 with switch statement) (if request.url = add, add the data)
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data
  })

  request.on( 'end', function() {

    const data = JSON.parse(dataString)


    switch( request.url ) {

      case '/submit':
        //server logic

        const newStudent = {
          'firstName': data.firstName,
          'lastName': data.lastName,
          'pronouns': data.pronouns,
          'house': data.house
        }

        appdata.push(newStudent)

        console.log(appdata)

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break

      case '/delete':
        appdata.splice(data.rowData, 1)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break

      case '/update':
        appdata.update( data )
        break

      default:
        response.end( '404 Error: File Not Found' )
    }


  })
}

const sendData = function(response, studentData){
  response.end(JSON.stringify(studentData));
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
