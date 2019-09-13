var express = require( 'express' )
var app = express()

app.use( function( req, res, next ) {
  console.log( 'url:', req.url )
  next()
})

app.get( '/', function (req, res) {
  res.send( 'Hello World!' )
})

app.listen(3000)




const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'matchNumber':1,'red1': 8192, 'blue1': 7146, 'redScore': 25, 'blueScore':25,'result':0},
  { 'matchNumber':2,'red1': 6439, 'blue1': 359, 'redScore': 23, 'blueScore':32,'result':2 } 
]

const appdata2 = [
  // {'team':8192,'WLP':"0-0-0",'WP':1},
  // {'team':7146,'WLP':"0-0-0",'WP':1},
  // {'team':6439,'WLP':"0-0-0",'WP':0},
  // {'team':359,'WLP':"0-0-0",'WP':2}
]

// const server = http.createServer( function( request,response ) {
//   addTeam(8192);
//   addTeam(7146);
//   addTeam(6439);
//   addTeam(359);
//   rank();
//   if( request.method === 'GET' ) {
//     handleGet( request, response )    
//   }else if( request.method === 'POST' ){
//     handlePost( request, response ) 
//   }
// })

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/public/css/style.css'){
    sendFile( response, 'public/css/style.css' )
  } else if ( request.url === '/m' ){
    sendData( response, appdata )
   } else if ( request.url === '/appdata2' ){
    sendData( response, appdata2 )
   } else {
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
    
  switch ( request.url ) {
      case '/submit':
      const MR = JSON.parse(dataString); //match result
      let r = 0;
      if(MR.redScore > MR.blueScore){
        r = 1;
      } else if(MR.redScore < MR.blueScore){
        r = 2;
      }
      const newMR ={
        'matchNumber':MR.matchN,
        'red1': MR.red1, 
        'blue1': MR.blue1, 
        'redScore': MR.redScore, 
        'blueScore':MR.blueScore,
        'result':r
      }
      appdata.push(newMR);
      addTeam(MR.red1);
      addTeam(MR.blue1);
      rank();
      
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end();

      break;
      
     case '/delete':
       const MRdelete = JSON.parse(dataString); //match result
       appdata.splice(MRdelete.matchNumber, 1);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end();
      rank();
      break;
      
      
      case '/update':
        const MRupdate = JSON.parse(dataString);
        let r2 = 0;
        if(MRupdate.redScore > MRupdate.blueScore){
          r2 = 1;
        } else if(MRupdate.redScore < MRupdate.blueScore){
          r2 = 2;
        }
        const updatedMR = {
        'matchNumber':MRupdate.matchNumber,
        'red1': MRupdate.red1, 
        'blue1': MRupdate.blue1, 
        'redScore': MRupdate.redScore, 
        'blueScore':MRupdate.blueScore,
         'result': r2
        };
        
        appdata.splice(MRupdate.index, 1, updatedMR);
        rank();
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
        response.end();

        break;
      
  
  }
  })
}

const sendData = function( response, MHs ) {
  const type = mime.getType( MHs );
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: MHs }));
  response.end();
}

const rank = function(){
  for(let j=0; j<appdata2.length;j++){
    appdata2[j].W = 0; 
    appdata2[j].L = 0; 
    appdata2[j].P = 0; 
    appdata2[j].WP = 0; 
  }
  
  for(let i=0; i<appdata.length;i++){
    if(appdata[i].result===1){
      for(let j=0; j<appdata2.length;j++){
        if(appdata2[j].team == appdata[i].red1){
          appdata2[j].W++;
          appdata2[j].WP+=2;
        }
        if(appdata2[j].team == appdata[i].blue1){
        appdata2[j].L++;
        }
      }
    } else if (appdata[i].result===2){
      for(let j=0; j<appdata2.length;j++){
        if(appdata2[j].team == appdata[i].blue1){
          appdata2[j].WP+=2;
          appdata2[j].W++; 
        }
        if(appdata2[j].team == appdata[i].red1){
        appdata2[j].L++;
        }
      }
    } else{
      for(let j=0; j<appdata2.length;j++){
        if(appdata2[j].team == appdata[i].red1){
          appdata2[j].WP++;
          appdata2[j].P++;
        }
        if(appdata2[j].team == appdata[i].blue1){
          appdata2[j].WP++;
          appdata2[j].P++;
        }
      }
    
    }
     
  }
  appdata2.sort(function(b,a){
  return a.WP-b.WP});
}



const addTeam = function(t){
  let exist = 0;
  for(let i=0; i<appdata2.length;i++){
    if(appdata2[i].team == t){
      exist = 1;
    }
  }
  if(exist === 0){
    const newteam ={
      'team':t,
       'W':0,
      'L':0,
      'P':0,
      'WP':0
    }
    appdata2.push(newteam);
  }
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
