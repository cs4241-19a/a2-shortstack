const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

/*const appdata = [
  { 'username': 'Patrick', 'mode': 'Hot/Cold', 'guesses': 4, 'min' : 1, 'max' : 1000, 'score' : 100},
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]*/

let secret = Math.floor(Math.random() * 8999) + 1000;

let guessCount = 0;

const database = [[]]

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

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    const resultObj = JSON.parse( dataString )
    guessCount++;
    let score = Math.floor(100 * (guessCount / Math.log2(8999)))
    let result
    if (resultObj.mode === 'hc') result = hc(resultObj.guess);
    else result = pfb(resultObj.guess);
    if (result === 'Success' || result === 'Fermi Fermi Fermi Fermi ') result = 'You guessed the number!'
    let gameArr = [resultObj.mode, guessCount, resultObj.guess, result, score]
    database.push(gameArr)
    response.writeHead( 200, result, {'Content-Type': 'text/plain' })
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

function newSecret () {
  secret = Math.floor(Math.random() * 9999);
}

function pfb (guess) {
  let result = '';
  let guessDigits = guess.toString().split('');
  let secretDigits = secret.toString().split('');
  for (let i = 0; i < guessDigits.length; i++) {
    if (guessDigits[i] === secretDigits[i]) result.concat('Fermi ');
    else {
      for (let j = 1; j < secretDigits.length; j++) {
        if (guessDigits[i] === guessDigits[j]) {
            result.concat('Pico ');
        }
      }
    }
  }
  if (result === '') {
    result = 'Bagel';
  }
  return result;
}

function hc (guess) {
  let resultOptions = ['Burning', 'Hot', 'Room Temperature', 'Cold', 'Ice Age'];
  let closestLower;
  let closestUpper;
  if (guess === secret) return "Success";
  for (let i  = 0; i < database.length; i++) {
    if (database[i][0] === 'hc') {
      if (database[i][2] < secret) {
        closestLower = database[i][2]
      } 
      else {
        closestUpper = database[i][2]
      }
    }
  }
  let close;
  if (guess < secret) close = Math.abs((guess - secret)/(secret - closestLower));
  else close = Math.abs((guess - secret)/(secret - closestUpper));
  if (close < 0.1) return resultOptions[0];
  else if (close < 0.25) return resultOptions[1];
  else if (close < 0.5) return resultOptions[2];
  else if (close < 0.75) return resultOptions[3];
  else if (close < 1.0) return resultOptions[4];
}

function lookupLastScore () {
  return database[guessCount][score]
}