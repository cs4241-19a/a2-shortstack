const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      express = require('express'),
      app = express(),
      port = 3000

const appdata = [
  { 'name': 'michael', 'score': 2048, 'rank': 1 },
  { 'name': 'george', 'score': 2004, 'rank': 2 },
  { 'name': 'tom', 'score': 1987, 'rank': 3} 
]

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     if( err === null ) {
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )
     }
   })
}

app.get('/read', function (req, res) {
  res.send("recieved GET req: "+req);
})

app.post('/submit', function (req, res) {
  res.send('Got a POST request: '+req);
})

app.listen( process.env.PORT || port )
