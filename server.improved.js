const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'bookName': 'In Cold Blood', 'authorName': 'Truman Capote', 'comments': 'This is one of my favorite books! Its a mystery but also a real story', 'rating': '4', 'status': 'good' },
  { 'bookName': 'Romeo and Juliet', 'authorName': 'William Shakespeare', 'comments': 'Was not a huge fan, this really dragged on', 'rating': '2', 'status': 'bad' },
  { 'bookName': 'The Secret Chapter', 'authorName': 'Genevieve Cogman', 'comments': 'Comes out Nov. 12, 2019', 'rating': '3', 'status': 'good' }
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
  } else if ( request.url === '/books' ) {
    response.writeHeader( 200, { 'Content-Type': 'application/json' })
    response.end( JSON.stringify(appdata) )
  } else {
    sendFile( response, filename )
  }
};

//add a book to app data
const bookAddition = function (data) {
  const new_book = data
  appdata.push(new_book)
}

//delete a book given its name
const bookDeletion = function (data) {
  const name = data
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].bookName === name) {
      appdata.splice(i, 1)
    }
  }
}

// Update rating of a book -> this then will update the status
const bookEdition = function (data) {
  const name = data.bookName
  const newRating = data.rating
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].bookName === name) {
      appdata[i].rating = newRating
      if (appdata[i].rating === "1" || appdata[i].rating === "2" ) {
        appdata[i].status = 'bad'
      } else {
        appdata[i].status = 'good'
      }
    }
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    switch ( request.url ) {
      case '/addBook':
        const addData = JSON.parse( dataString )
        bookAddition(addData)
        break;
      case '/delBook':
        const delData = dataString
        bookDeletion(delData)
        break;
      case '/editBook':
        const editData = JSON.parse( dataString )
        bookEdition(editData)
        break;
      default:
        response.end('404 Error: File not found');
        break;
    }
  })
};

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
