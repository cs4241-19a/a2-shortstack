const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

console.log("Starting server on default port")

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const calculateAggr = function(data){
  let aggregate = {
    "Park":{"sum":0,"count":0},
    "Reverse":{"sum":0,"count":0},
    "1st Gear":{"sum":0,"count":0},
    "2nd Gear":{"sum":0,"count":0},
    "3rd Gear":{"sum":0,"count":0},
    "4th Gear":{"sum":0,"count":0},
    "5th Gear":{"sum":0,"count":0},
    "6th Gear":{"sum":0,"count":0},
  }

  data.readings.forEach(re => {
    aggregate[re.gear].sum = Number(aggregate[re.gear].sum) + Number(re.speed)
    aggregate[re.gear].count = Number(aggregate[re.gear].count) + 1 
  });

  let aggr_data = []

  let gears = ["Park", "Reverse", "1st Gear", "2nd Gear", "3rd Gear", "4th Gear", "5th Gear", "6th Gear"]
  gears.forEach(g => {
    aggr_data.push({"gear":g, "avgspeed":(Number(aggregate[g].sum)/Number(aggregate[g].count))})
  })
  return aggr_data

}

const updateRecord = function(reading){
  return new Promise(resolve =>{
    fs.readFile('public/data/carreadings.json', 'utf8', function updateFile(err, readings){
      if (err){
        console.log(err);
      } else {
        let readingsObj = JSON.parse(readings);
        readingsObj.readings.push(reading);
        aggr = calculateAggr(readingsObj)
        readingsObj.aggregate = aggr
        let json = JSON.stringify(readingsObj);
        fs.writeFile('public/data/carreadings.json', json, 'utf8', function writeCallback(err){
          if (err){
            console.log(err);
          }
        });
        resolve(readingsObj);
      }
    });
  })
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else{
    console.log("Loading to client: " + filename)
    sendFile( response, filename )
  }

}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let reading = JSON.parse( dataString )

    updateRecord(reading).then(function(resolve){
      console.log(resolve)

      response.writeHeader( 200, { 'Content-Type': 'text/plain' })
      response.end("Ok");
    });
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
      console.log(err)
       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}



server.listen( process.env.PORT || port )
