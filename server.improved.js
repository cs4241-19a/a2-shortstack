const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [ //can add/edit/ delete any object in here 
  { 'model': 'toyota', 'year': 1999, 'mpg': 23, 'tripDistance': 300, gasPrice: 2.39, 'totalGallons': 13.04, 'totalCost': 31.16 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30, 'tripDistance': 230, gasPrice: 3.40, 'totalGallons': 13.04, 'totalCost': 31.16  },
  { 'model': 'ford', 'year': 1987, 'mpg': 14, 'tripDistance': 113, gasPrice: 4.50, 'totalGallons': 13.04, 'totalCost': 31.16 } 
]

//const appdata =[
//  {"name":"charlie"}
//]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){ //could add more functions like delete here, but could also have just POST and have the urls to determine what to do  
    handlePost( request, response ) 
  }
})

//use handleGet to display data structure (server) in UI (server to UI)
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' ) //do sendFile for javascript file
  }else if(request.url === '/cars'){
    send
  }
  else{
    sendFile( response, filename )
  }
}
//communicate from HTML to server
//change url to look at specific file (same as a1 with switch statement) (if request.url = delete, delete the data)
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) ) //instead of this, store object in variable
    
    const data = JSON.parse(dataString)
    
      //For validation
/*    if( request.url === '/add') {
      let foundName=false //figuring out if something already exists
      for (let i=0; i<appdata.length; i++){
       if(appdata[i],name === data.name) foundName = true
      }
      if(foundName == false){
       appdata.push(data)
      }
  }*/
    
    // ... do something with the data here!!! have switch statement here
    switch( request.url ) {
      case '/submit':
      //server logic 
        let totalGallons = (data.tripDistance / data.mpg)
        let totalCost = (totalGallons*(data.gasPrice))
        
        const carData = {
          'model': data.model,
          'year': data.year,
          'mpg': data.mpg,
          'tripDistance': data.tripDistance,
          'gasPrice': data.gasPrice,
          'totalGallons': totalGallons,
          'totalCost': totalCost
        }
        break
      case '/add':
        appdata.push( data )
        break
      case '/delete':
        appdata.delete( data )
        break
      case '/update':
        appdata.update( data )
        break
      default:
        response.end( '404 Error: File Not Found' )
  }
    
    //appdata.push( JSON.parse( dataString)) //creates new row of data in JSON file
    //have a return statement to return all data to UI
    console.log(appdata)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    //error message with 404 -> that name is already found 
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

//create function here that does "server logic"
//takes two fields, then divides them, makes JSONBody. 
//set new field = JSONbody which adds the data to data structure


server.listen( process.env.PORT || port )
