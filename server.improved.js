const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

var strData = [] // array to hold strUnit objects

// Returns new strUnit object
function strUnit (str, occ){
  
  var strObj = {
    strVal : str, // unique word
    freq : 1, // # of occurrences
    firstOcc : occ // first occurrence of word
  }
  return strObj;
}

// Returns obj with total words
// @return object with length of strData
function getTotalWords(){
  return {
    total: strData.length
  }
}

// use regex to remove punctuation from a given string
// @return str without punctuation or symbols
function removePunctuation(str){
  return str.replace(/[.,!?;:()]/g,'')
}


// collect data on unique strings, # of occurrences, and first occurrence
//@param inputText - text from client to searth through
function count(inputText){
  inputText = inputText.trim(); // trim spaces from beginning and end of inputText
  inputText = inputText.toLowerCase();
  let strArr = inputText.split(" "); // split string into array of strings based on spaces

  // go through each string in the input text to find the unique strings 
  for(let i = 0; i < strArr.length; i++){
    let currStr = strArr[i];
    currStr = removePunctuation(currStr)
    let foundStr = false;
    let j = 0;

    // loop through found strings until reaching end of array or finding the same string value
    while(!foundStr && j < strData.length){
      if(currStr === strData[j].strVal){
        strData[j].freq++;
        foundStr = true;
      }
      j++;
    }

    // If string is not in array, add new strUnit object to array
    if(!foundStr){
      strData.push(strUnit(currStr, (i+1)));
    }
  }
  
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

// Send strData and total number of words back to client when there is a GET request
const getResponse = function( request, response){
  const body = JSON.stringify(strData);
  const total = JSON.stringify(getTotalWords());
  response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
  response.write(body);
  response.write(total);
  response.end();
}


const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === '/getData'){
    getResponse(request, response);
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

  request.on( 'end', function() {
    strData = []; // reset array of data
    count(JSON.parse( dataString ).inputText);
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
