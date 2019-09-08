let dataArray = []

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response)    
  }
  else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
  else if(request.method === 'DELETE'){
    handleDelete(request, response)
}
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
    
  }else if (request.url === '/getrequest'){ //added this get request
    handleGetRequest(request, response) 
  } 
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
    let dataString = ""
  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let dataVar = JSON.parse( dataString );
    dataArray.push(dataVar);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write(JSON.stringify(dataArray) )
    response.end();
  })
}

//made this so that it does not take in an empty string
const handleGetRequest = function( request, response ) { 
  request.on( 'data', function( data ) {
  })

  request.on( 'end', function() {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write(JSON.stringify(dataArray) )
    response.end();
  })
}

const handleDelete = function( request, response ) {
    let dataVar ={}
    
  request.on( 'data', function( data ) {
    dataVar = JSON.parse( data);
    
  })
  
  request.on( 'end', function() {
    /*loop through array to try to match with data given the same product name. 
    Once matched, the index will be saved and depending on the desired amount of product to remove,
    it will delete the entire row or adjust the quantity of products.  */
    
    let matched = false;
    let matchedIndex = 0;
    
    for (let i =0; i < dataArray.length; i++){
      let info = dataArray[i];
      
      if(info.productName === dataVar.productName){ //dont match with quantity dataVar.num is the input subtract input from info.num
        matchedIndex = i;
        matched = true;
        
        if (info.numProducts > dataVar.numProducts){ 
          info.numProducts = info.numProducts - dataVar.numProducts;
        }
        
        //if input is greater than output that would be zero or less so it will delete the entire row
        else{ 
          dataArray.splice(matchedIndex,1) 
        }
      }  
    }
    
    if (matched){
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write(JSON.stringify(dataVar) )
    response.end()
    }
    else{
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.write(JSON.stringify(dataArray) )
    response.end();}
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
