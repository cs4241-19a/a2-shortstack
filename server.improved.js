const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'name': 'Yeezy 350 Boost', 'category': 'Fashion', 'rating': 5, 'usd': 200, 'eur': 182, 'link': "https://stockx.com/adidas-yeezy-boost-350-v2-cream-white?currencyCode=USD&size=8.5&gclid=CjwKCAjwzdLrBRBiEiwAEHrAYr6Goiw3RGnCl12vXPPsgVqOjI-F36X_4AfNaeBDvt6D-mjEkhmVBBoCRBEQAvD_BwE"},
  { 'name': 'Macbook Pro', 'category': 'Tech', 'rating': 3, 'usd': 1299, 'eur': 1178.31, 'link': "https://www.apple.com/shop/buy-mac/macbook-pro/13-inch-space-gray-1.4ghz-quad-core-processor-with-turbo-boost-up-to-3.9ghz-128gb?afid=p238%7Csbepnohbm-dc_mtid_1870765e38482_pcrid_246386726307_pgrid_14874568330_&cid=aos-us-kwgo-pla-mac--slid-----product-MUHN2LL/A" },
  { 'name': 'Wilson Basketball', 'category': 'Sports', 'rating': 2, 'usd': 20, 'eur': 18.14, 'link': "https://www.wilson.com/en-us/basketball/balls/evolution/evolution-game-basketball?gclid=CjwKCAjwzdLrBRBiEiwAEHrAYsO1rcrobWjAgngQhHvN_RTM9DJZj_zVaqj5c4KJ7Vw5_S4yYuE4QxoCYssQAvD_BwE&source=googleshopping&ef_id=CjwKCAjwzdLrBRBiEiwAEHrAYsO1rcrobWjAgngQhHvN_RTM9DJZj_zVaqj5c4KJ7Vw5_S4yYuE4QxoCYssQAvD_BwE:G:s&s_kwcid=AL!8492!3!179840140943!!!g!430754648574!&CMPID=Google-wilson-basketball_g_shopping_usa---c-179840140943-" }
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
  } else if ( request.url === '/items' ){
    sendData( response, appdata );
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
    console.log( JSON.parse( dataString ) )
    const item = JSON.parse( dataString );
    
    const newItemObj = {
      'name': item.name, 
      'category': item.category, 
      'rating': parseInt(item.rating), 
      'usd': parseFloat(item.usd), 
      'eur': calcEuroPrice(parseFloat(item.usd)),
      'link': item.link, 
    };

    appdata.push(newItemObj);

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

const sendData = function( response, items ) {
  const type = mime.getType( items );
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: items }));
  response.end();
};

function calcEuroPrice(usd) {
  return usd * 0.91;
}

server.listen( process.env.PORT || port )
