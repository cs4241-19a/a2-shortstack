const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'bookName': 'In Cold Blood', 'authorName': 'Truman Capote', 'comments': 'This is one of my favorite books! Its a mystery but also a real story', 'rating': '4', 'status': 'good' },
  { 'bookName': 'Romeo and Juliet', 'authorName': 'William Shakespeare', 'comments': 'Wasnt a huge fan, this really dragged on', 'rating': '2', 'status': 'bad' },
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



const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const data = JSON.parse( dataString )
    
    switch ( request.url ) {
      case '/addBook':
        bookAddition(data)
        break;
      case '/delBook':
        bookDeletion(data)
        break;
      case 'editBook':
        bookEdition(data)
        break;
      default:
        response.end('404 Error: File not found');
        break;
    }
  })
};

/*
const book = JSON.parse( dataString );

        const newBook = {
          'bookName': book.bookName,
          'authorName': book.authorName,
          'comments': book.comments,
          'rating': book.rating,
          'status': book.status,
        };

        appdata.push(newBook);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.end();
*/

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
