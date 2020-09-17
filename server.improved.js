const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let secret = Math.floor(Math.random() * 8999) + 1000;
let secretString = secret.toString();

let guessCount = 0;

let gameCount = 1;

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
    let score = Math.floor(100 * (Math.log2(8999) / (guessCount + 5)))
    if (score > 100) {
      score = 100;
    }
    let result
    if (resultObj.mode === 'hc') result = hc(resultObj.guess);
    else result = pfb(resultObj.guess);
    
    let gameArr = [gameCount, resultObj.mode, resultObj.guess, result, score]
    database.push(gameArr)
    if (result === 'Success' || result === 'Fermi Fermi Fermi Fermi ') {
      result = 'You guessed the number! A new number has been selected!'
    }
    let retVal = JSON.stringify({"game" : gameCount, "mode" : resultObj.mode, "guess" : resultObj.guess, "result" : result, "score" : score})
    response.write(retVal)
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
  secret = Math.floor(Math.random() * 8999) + 1000;
  gameCount++;
}

function pfb (guess) {
  let result = '';
  let guessDigits = guess.split('')
  console.log(guess.split(""))
  let secretDigits = secretString.split('')
  console.log(secretString.split(''))
  for (let i = 0; i < guessDigits.length; i++) {
    console.log("guess digits")
    console.log(guessDigits[i])
    if (secretDigits.includes(guessDigits[i]) && secretDigits[i] === guessDigits[i]) result += "Fermi ";
    else if (secretDigits.includes(guessDigits[i])) result += "Pico ";
    console.log(result)
  }
  if (result === '') {
    result += 'Bagel';
  }
  return result;
}

function hc (guess) {
  let resultOptions = ['Higher', 'Lower']
  let guessNumber = parseInt(guess)
  console.log(guessNumber)
  if (guessNumber === secret) return "Success";
  else if (guessNumber > secret) {
    return resultOptions[1];
  }
  else if (guessNumber < secret) {
    return resultOptions[0];
  }
}

function lookupLastScore () {
  return database[guessCount][4]
}