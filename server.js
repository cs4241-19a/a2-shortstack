/*
 * Server for A2 by Michael Bosik
 */

const fs   = require( 'fs' ),
      mime = require( 'mime' ),
      express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000

const appdata = [
  { 'name': 'michael', 'score': '2048', 'rank': '1' },
  { 'name': 'ciaraldi', 'score': '2004', 'rank': '2' },
  { 'name': 'ted', 'score': '8', 'rank': '3' } 
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//File Handlers
app.get("/", function (request, response) {
  sendFile( response, 'index.html' );
});

app.get("/styles/main.css", function (request, response) {
  sendFile( response, 'styles/main.css' );
});

app.get("/scripts/game.js", function (request, response) {
  sendFile( response, 'scripts/game.js' );
});

//GET scores handler
app.get('/getScores', function (req, res) {
  let response = '';
  for (let i = 0; i < appdata.length; i++){
    response += appdata[i].score+','+appdata[i].name+','+appdata[i].rank+';';
  }
  res.end(response);
});

//POST score handler
app.post('/submit', function (req, res) {
  appdata[appdata.length] = req.body;
  appdata[appdata.length-1].rank = appdata.length;
  res.end('POST to scoreboard');
});

//POST delete score handler
app.post('/delete', function (req, res){
  let rank = req.body.place.substring(4);
  for(let i = rank-1; i < appdata.length; i++){
    appdata[i] = appdata[i+1];
  }
  appdata.pop();
  res.end('DELETE from scoreboard');
});

app.listen( process.env.PORT || port );
