const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


const appdata = [
  { 'playerName': 'Ellen Page', 'country': 'ENG', 'goals': 6, 'shots': 16, 'goalPercentage': 0.5 },
  { 'playerName': 'Megan Rapinoe', 'country': 'USA', 'goals': 6, 'shots': 12, 'goalPercentage': .3 },
  { 'playerName': 'Alex Morgan', 'country': 'USA', 'goals': 6, 'shots': 18, 'goalPercentage': .2} 
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
  }if(request.url === '/getResults'){
    sendResults( response)
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
    let addedData =  JSON.parse( dataString )
    if(request.url == '/submit'){
      //here call calculate goal percentage and return it!!!!
      let newGoalPercentage = calculateGoalPercentage(addedData.goals, addedData.shots).toString().slice(0, 4)

      appdata.push({'playerName': addedData.playerName,'country': addedData.country, 'goals': addedData.goals,'shots': addedData.shots,
                     'goalPercentage' : newGoalPercentage
                    })
    }
    //send back newly added info in response for debugging purposes and to display message to user
    const newData = {
      'playerName': addedData.playerName,
      'country': addedData.country,
      'goals': addedData.goals,
      'shots': addedData.shots,
    }
    const responseData = JSON.stringify(newData)    
    response.writeHead(200, responseData,  {'Content-Type': 'text/plain' })
    //write to response to send data back
    response.write(responseData)
    response.end()
  })
}

//didn't change from starter code
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

//method to send all the data to the results page
const sendResults = function( response) {
       const responseData = JSON.stringify(appdata)
       response.writeHeader( 200, { 'Content-Type': 'plain/text' })
       response.write(responseData)
       response.end()
}

//method to calculate the extra column by calculating the goal percentage from shots
const calculateGoalPercentage = function(goals, shots){
  return goals/shots
}

server.listen( process.env.PORT || port )