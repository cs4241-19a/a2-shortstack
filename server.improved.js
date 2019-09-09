const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

const appdata = [
  {'name': "First Customer", 'phone': 5088315000, 'fish': "salmon", 'style': "sashimi",
  'amount': 5, price:74, 'orderID':0}
  
];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
});

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' );
    
  }
  else if ( request.url === '/tickets' ){
    sendData( response, appdata );
  }
  else{
    sendFile( response, filename );
  }
}

const handlePost = function( request, response ) {
  let dataString = "";

  request.on( 'data', function( data ) {
      dataString += data 
  });
  
  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) );
    
    switch( request.url ){
        
      case '/submit':
        const order = JSON.parse(dataString);
        const price = calcPrice(order.fish, parseInt(order.amount));
        const incomingOrder = {
          name: order.name,
          phone: parseInt(order.phone),
          fish: order.fish,
          style: order.style,
          amount: parseInt(order.amount),
          price: price,
          orderID: findNewID()
        };
        appdata.push(incomingOrder);
        response.writeHead( 200, "OK!!", {'Content-Type': 'text/plain' });
        response.end();
        break;
        
      case '/update':
        const norder = JSON.parse(dataString);
        const nprice = calcPrice(norder.fish, parseInt(norder.amount));
        const nincomingOrder = {
          name: norder.name,
          phone: parseInt(norder.phone),
          fish: norder.fish,
          style: norder.style,
          amount: parseInt(norder.amount),
          price: nprice,
          orderID: norder.orderID
        };
        
        appdata.splice(norder.orderID, 1, nincomingOrder);
        response.writeHead( 200, "OK!!", {'Content-Type': 'text/plain' });
        response.end();
        
        break;
      default:
        response.end('404 , intelligence not found');
    }
    // ... do something with the data here!!!
  });
}

const sendData = function( response, tickets ) {
  const type = mime.getType( tickets );
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: tickets }));
  response.end();
};

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
       response.end( '404 Error: File Not Founded' )

     }
   })
}

const calcPrice = function(fishType, amtFish){
  var price = 0;
  
  switch(fishType){
    case "salmon":
      price += (3*amtFish);
      break;
    case "tuna":
      price += (5*amtFish);
      break;
  }
  
  return price;
}

const findNewID=function(){
  return (appdata.length);
}

server.listen( process.env.PORT || port );
