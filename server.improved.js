const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

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
  }else if(request.url === '/result'){
    sendForm( response, appdata )       
  }else{
    sendFile( response, filename )
  }
}

const sendForm = function(response, form){
  const type = mime.getType( form );
  response.writeHeader( 200, { 'Content-Type': type })
  response.write(JSON.stringify({data: form}))
  response.end();
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    switch(request.url){
      case '/submit':
        const order = JSON.parse(dataString),
              price = calculatePrice(parseInt(order.amountNum), order.amountCont),
              orderObj = {
                'flavour': order.flavour,
                'amountNum': order.amountNum,
                'amountCont': order.amountCont,
                'name': order.name,
                'email': order.email,
                'price': price
                };
        appdata.push(orderObj)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
        
      case '/delete':
        const deleteForm = JSON.parse(dataString)
        appdata.splice(deleteForm.orderNum, 1)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
        break
        
//       case '/update':
//         const editForm = JSON.parse(dataString);

//         const newPrice = calculatePrice(parseInt(editForm.amountNum), editForm.amountCont);

//         const newOrder = {
//                 'flavour': editForm.flavour,
//                 'amountNum': editForm.amountNum,
//                 'amountCont': editForm.amountCont,
//                 'name': editForm.name,
//                 'email': editForm.email,
//                 'price': newPrice
//         };

//         appdata.splice(editForm.index, 1, newOrder);

//         response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
//         response.end();
//         break
    }})
}

const calculatePrice = function(amt, container){
   let price = 0;
  switch(container){
    case 'bag':
      price = 5;
      break
    case 'can':
      price = 10;
      break
    case 'jar':
      price = 15;
      break
    case 'tin':
      price = 20;
      break
    case 'box':
      price = 25;
      break
    default:
      price = 0;
      break
    }
      price *= amt;
  return price;
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
