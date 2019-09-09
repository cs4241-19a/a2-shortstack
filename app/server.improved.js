const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {name: 'Danny da Ruff', lang: 'php', completedTS: '09-07-19'},
  {name: 'Josh', lang: 'html', completedTS: '09-07-19'},
  {name: 'Carly', lang: 'js', completedTS: '09-07-19'},
  {name: 'Tom', lang: 'racket', completedTS: '09-07-19'},
  {name: 'Bill', lang: 'sql', completedTS: '09-07-19'},
  {name: 'Jim', lang: 'java', completedTS: '09-07-19'},
  {name: 'Greg', lang: 'c', completedTS: '09-07-19'},
  {name: 'Frederick', lang: 'scala', completedTS: '09-07-19'},
  {name: 'Arnold C.', lang: 'python', completedTS: '09-07-19'}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const isAll = request.url.slice( 1 ); 
  const filename = dir + request.url.slice( 1 ) 

  if(isAll == 'allData'){
    response.writeHeader( 200, { 'Content-Type': 'text' })
    response.end( JSON.stringify(appdata) );
  }else{
    console.log(filename)
    if( request.url === '/' ) {
      sendFile( response, 'public/index.html' )
    }else{
      sendFile( response, filename )
    }
  }
}

const handlePost = function( request, response ) {
  let dataString = ''
  let type = request.url.slice( 1 );

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    //console.log( JSON.parse( dataString ) )
    let dataStringParsed = JSON.parse(dataString);
    console.log('incoming', dataStringParsed);
    let retJSON = '';
    if(type == 'getLangMembers'){
      let people = []
      for(let i=0; i<appdata.length; i++){
        console.log('ade', appdata[i].lang);
        if(appdata[i].lang == dataStringParsed.language){
          people.push(appdata[i].name);
        }
      }
      //change to people
      retJSON = JSON.stringify({vals: people});
    }

    //Add or modify data
    let newData = {name: dataStringParsed.name, lang: dataStringParsed.language, completedTS: getTimeNow()};
    let sent = false;
    
    for(let i=0; i<appdata.length; i++){
      if(appdata[i].name == dataStringParsed.name){
        appdata.splice(i, 1, newData);
        sent = true;
        break;
      }
    }
    if(!sent){
      appdata.push(newData);
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    //response.json(retJSON);
    response.end(retJSON);
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

function getTimeNow(){
  var d = new Date();
  return ''+ d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear();
}

server.listen( process.env.PORT || port )
