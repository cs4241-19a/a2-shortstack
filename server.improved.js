const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

var playerData = [
  {'name': 'Javier', 'moves': 0, 'medal': 'platinum'}
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
    // If page is entered or refreshed, generate a new board
    generateBoard()
    console.log(board)
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
    var obj = JSON.parse( dataString )

    // Turn player response into an 4 digit array
    var playerGuess = extractAnswer(obj)
    console.log(playerGuess)
    
    // Check if data is valid
    for (var i = 0; i < 4; i++) {
      if (playerGuess[i] == -1) {
        // Data is invalid, throw 400 error
      }
    }
    
    // If valid, check against solution
    rightColor(playerGuess)

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

var board = [-1, -1, -1, -1]

// Create a random array of 4 numbers, each from 0 to 5
const generateBoard = function() {
  for (var i = 0; i < 4; i++) {
    board[i] = Math.floor(6 * Math.random())
  }
  return board
}

// Extract the user's answer
const extractAnswer = function(json) {
  var answer = [colorToNumber(json.firstball),
                colorToNumber(json.secondball),
                colorToNumber(json.thirdball),
                colorToNumber(json.fourthball)]
  return answer
}

// Translates each answer from a string to a number
const colorToNumber = function(color) {
  if (color == "red") { return 0 }
  else if(color == "blue") { return 1 }
  else if(color == "yellow") { return 2 }
  else if(color == "green") { return 3 }
  else if(color == "purple") { return 4 }
  else if(color == "orange") { return 5 }
  else { return -1 }
}

// Returns the number of ball of the right color, regardless of position
const rightColor = function(pGuess) {
  var solTally = [0, 0, 0, 0, 0, 0]
  for (var s = 0; s < 6; s++) {
    for (var b = 0; b < 4; b++) {
      if (board[b] == s) { solTally[s]++ }
    }
  }
  
  var guessTally = [0, 0, 0, 0, 0, 0]
  for (var s = 0; s < 6; s++) {
    for (var b = 0; b < 4; b++) {
      if (pGuess[b] == s) { guessTally[s]++ }
    }
  }
  
  var correct = 0
  for (var s = 0; s < 6; s++) {
    correct = correct + Math.min(solTally[s], guessTally[s])
  }
  
  console.log("derp")
  console.log(solTally)
  console.log(guessTally)
  console.log(correct)
  return correct
}

const rightPosition = function(pGuess) {
  
}

server.listen( process.env.PORT || port )
