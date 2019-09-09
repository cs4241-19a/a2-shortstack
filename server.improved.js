const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

const appdata = [
  { 'username': 'Jarod Thompson', 'topping1': 'Pepperoni', 'topping2': 'Bacon', 'price': 17 },
  { 'username': 'Tom Gibbia', 'topping1': 'Sausage', 'topping2': 'Green Pepper', 'price': 15 },
  { 'username': 'Patty Alzaibak', 'topping1': 'Pepperoni', 'topping2': 'Garlic', 'price': 14 }
];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }
  else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
});

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) ;

  console.log(request.url);
  if ( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if ( request.url === '/orders' ) {
    sendOrderData( response, appdata);
  }
  else {
    sendFile( response, filename )
  }
};

const handlePost = function( request, response ) {
  let dataString = '';
  request.on( 'data', function( data ) {
      dataString += data 
  });

  request.on( 'end', function() {
    switch (request.url) {
      case '/submit':
        const newOrder = JSON.parse(dataString);
        const orderPrice = calcPrice(newOrder.topping1, newOrder.topping2);

        const order = {
          'username': newOrder.username,
          'topping1': newOrder.topping1,
          'topping2': newOrder.topping2,
          'price': orderPrice
        };

        appdata.push(order);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.end();
        break;
      case '/update':
        const oldOrder = JSON.parse(dataString);
        const newPrice = calcPrice(oldOrder.topping1, oldOrder.topping2);

        const updatedOrder = {
          'username': oldOrder.username,
          'topping1': oldOrder.topping1,
          'topping2': oldOrder.topping2,
          'price': newPrice
        };

        appdata.splice(oldOrder.index, 1, updatedOrder);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.end();
        break;
      case '/delete':
        const deleteThisOrder = JSON.parse(dataString);
        appdata.splice(deleteThisOrder.orderNum, 1);

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        response.end();
        break;
      default:
        response.end('Error: File not found');
        break;
    }
  })
};

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) ;

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 );
       response.end( '404 Error: File Not Found' )

     }
   })
};

const sendOrderData = function( response, orders ) {
  const type = mime.getType(orders);
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: orders }));
  response.end();
};

const calcPrice = function(topping1, topping2) {
  let price = 8;
  if (topping1 !== "")
    price += 2;
  if (topping2 !== "")
    price += 4;
  return price;
};

server.listen( process.env.PORT || port );
