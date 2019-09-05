const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

const appdata = [
  { 'name': 'Carla Duarte', 'dream': 'I want to be famous', 'amountOfPork': 3, 'garlic': 1, 'price': 14},
  { 'name': 'Izzy Azevedo', 'dream': 'To own an art studio', 'amountOfPork': 5, 'garlic': 1, 'price': 18}
];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  } else if ( request.method === 'POST' ){
    handlePost( request, response ) 
  }
});

const handleGet = function( request, response ) {

  const filename = dir + request.url.slice( 1 );

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if ( request.url === '/orders' ){
    sendData( response, appdata );
  } else {
    sendFile( response, filename );
  }
};

const handlePost = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data 
  });

  request.on( 'end', function() {
    switch ( request.url ) {
      case '/submit':
        const order = JSON.parse( dataString );

        const price = calculatePrice(parseInt(order.amountOfPork), parseInt(order.garlic));

        const newOrder = {
          'name': order.name,
          'dream': order.dream,
          'amountOfPork': parseInt(order.amountOfPork),
          'garlic': parseInt(order.garlic),
          'price': price,
        };

        appdata.push(newOrder);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.end();

        break;

      case '/update':
        const orderToUpdate = JSON.parse(dataString);

        const newPrice = calculatePrice(parseInt(orderToUpdate.amountOfPork), parseInt(orderToUpdate.garlic));

        const updatedOrder = {
          'name': orderToUpdate.name,
          'dream': orderToUpdate.dream,
          'amountOfPork': parseInt(orderToUpdate.amountOfPork),
          'garlic': parseInt(orderToUpdate.garlic),
          'price': newPrice,
        };

        appdata.splice(orderToUpdate.index, 1, updatedOrder);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
        response.end();

        break;

      case '/delete':
        const orderToDelete = JSON.parse(dataString);
        appdata.splice(orderToDelete.orderNumber, 1);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
        response.end();

        break;

      default:
        response.end('404 Error: File not found');
        break;
    }
  })
};

const calculatePrice = function (amountOfPork, ifGarlic) {
  const baseRamenPrice = 7;
  const price = (baseRamenPrice + (2*amountOfPork) + ifGarlic);
  return price;
};

const sendData = function( response, orders ) {
  const type = mime.getType( orders );
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: orders }));
  response.end();
};

const sendFile = function( response, filename ) {
   const type = mime.getType( filename );

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content )

     } else {
       // file not found, error code 404
       response.writeHeader( 404 );
       response.end( '404 Error: File Not Found' );
     }
   })
};

server.listen( process.env.PORT || port );
