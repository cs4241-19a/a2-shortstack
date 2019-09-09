const http = require( 'http' ),
      fs   = require( 'fs' ),
      request = require('request'),
      cheerio = require('cheerio'),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'yourname': 'Rafael', 'dish': "cookie", 'ingredient': "chocolate" },
  { 'yourname': 'Nasim', 'dish': "roll", 'ingredient': "strawberry" },
  { 'yourname': 'Shine', 'dish': "duck", 'ingredient': "orange"} 
]

const recipe = function(data){
  const new_recipe = data;
  const str = ""
  request(str.concat('https://www.allrecipes.com/search/results/?wt=',new_recipe.dish,'&ingIncl=',new_recipe.ingredient,'&sort=re'), (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    
    const link = $('.fixed-recipe-card__h3 a').first().attr('href');
    return recipeview(link);
    }
  })
}

const recipeview = function(link){
  const new_recipe = link;
  const str = ""
  request(link, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    
    const ingredients = $('.checkList__item').each((i, el) => {
      const title = $(el).attr('title')
    }
  );
    const instructions = $('.recipe-directions__list--item').each((i, el) => {
      const title = $(el).text()
      });
    
    return {
      ingredients: ingredients,
      instructions: instructions
      }
    }
  })
}

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
    const data = JSON.parse( dataString )
    addLog(data);
    const answer = recipe(data)
    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.end(answer)
    console.log(answer);
    
  })
}

const addLog = function(data){
  appdata.push(data)
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
