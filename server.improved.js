const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'player': 'Ellen Page', 'country': 'ENG', 'goals': 6, 'shots': 16, 'percentage': 0.5 },
  { 'player': 'Megan Rapinoe', 'country': 'USA', 'goals': 6, 'shots': 12, 'percentage': .3 },
  { 'player': 'Alex Morgan', 'country': 'USA', 'goals': 6, 'shots': 18, 'percentage': .2} 
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

    // ... do something with the data here!!!
    const newPlayerInput = JSON.parse( dataString );

    let goalPercentage = calculateGoalPercentage(newPlayerInput.shots, newPlayerInput.goals);
    let newData = {
      'goalPercent': goalPercentage
    };

    let newDatas = JSON.stringify(newData);

    console.log(goalPercentage);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write(newDatas)//////////////////////////////////////help
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

//ADDING MY CODE NOW
const calculateGoalPercentage = function(numberOfShots, numberOfGoals){
  return (numberOfGoals/numberOfShots);
}

server.listen( process.env.PORT || port )
