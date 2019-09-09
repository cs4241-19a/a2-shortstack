const http = require( 'http' ),
    fs   = require( 'fs' ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require( 'mime' ),
    distance = require('google-distance-matrix'),
    geocoder = require ('google-geocoder');
    anime = require('animejs'),
    dir  = 'public/',
    port = 3000;
let fa = require("fontawesome");

geocoder({
  key: 'AIzaSyDAr4Jqf6GS5n21AbJRP5hdn7EY572gneY'
});
distance.key('AIzaSyDAr4Jqf6GS5n21AbJRP5hdn7EY572gneY');
//google maps
//api key  AIzaSyDAr4Jqf6GS5n21AbJRP5hdn7EY572gneY



const appdata = [
  {
    "yourname": "kit",
    "placeFrom": "boston",
    "placeTo": "new york city",
    "mode": "public transportation",
    "return": "yes"
  },
  {
    "yourname": "petra",
    "placeFrom": "san francisco",
    "placeTo": "seattle",
    "mode": "driving",
    "return": "no"
  }];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ){
    handlePost( request, response )
  }
});

//when site requests data
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 );

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if (request.url === '/getData') {
    console.log('user is requesting data');
    response.end(JSON.stringify(appdata)) //strigifying database to send to the requester
  } else {
      sendFile( response, filename )
    }
};

//when site sends data
const handlePost = function( request, response ) {
  let dataString = "";
  request.on( 'data', function( data ) {
    dataString += data
  });

  //when db needs to be modified
  //find row in db that has name, to, and from same as the row you're receiving
  //if it does then appData[i].push(JSONdata[i]['distance']) and appData[i].push(JSONdata[i]['duration']
  //else keep looking
  if (request.url === '/modifyData'){
    request.on( 'end', function() {
      // console.log("modifying");
      // console.log( JSON.parse( dataString ) );
      let jsonData = JSON.parse(dataString);
      for(let i = 0; i < jsonData.length; i++){
        for(let j=0; j < appdata.length;j++){
          let cond1 = jsonData[i]['yourname'].toUpperCase() === appdata[j]['yourname'].toUpperCase();
          let cond2 = jsonData[i]['placeFrom'].toUpperCase() === appdata[j]['placeFrom'].toUpperCase();
          let cond3 = jsonData[i]['placeTo'].toUpperCase() === appdata[j]['placeTo'].toUpperCase();
          let cond4 = jsonData[i]['mode'].toUpperCase() === appdata[j]['mode'].toUpperCase();
          // console.log('conds 1,2,3,4 ' + cond1 + ' ' + cond2 + ' ' + cond3 + ' ' + cond4);
          // console.log("comparing ")
          // console.log(jsonData[i]['yourname'].toUpperCase() + " " +  jsonData[i]['placeFrom'].toUpperCase() + " " + jsonData[i]['placeTo'].toUpperCase() + " " + jsonData[i]['mode'].toUpperCase());
          // console.log(appdata[j]['yourname'].toUpperCase() + " " +  appdata[j]['placeFrom'].toUpperCase() + " " + appdata[j]['placeTo'].toUpperCase() + " " + appdata[j]['mode'].toUpperCase());
          if( cond1 && cond2 && cond3 && cond4){
            appdata[j]['distance'] = jsonData[i]['distance'];
            appdata[j]['duration'] = jsonData[i]['duration'];
            // console.log("the json is " + jsonData[i]['yourname'] + ' ' + jsonData[i]['placeFrom'] + " " +  jsonData[i]['mode'] + " " + jsonData[i]['distance'])
          }
        }
      }
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end()
    })

    //when row in db modified by user
  } else if(request.url === '/userModify') {
    request.on( 'end', function() {
      var parsedData = ((dataString.replace("&nbsp", " " )).replace(";","")).split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      console.log(parsedData);
      // console.log(dataString[0] + " " + dataString[2])

      var row = parsedData[0];
      var col = parsedData[1];
      var newdata = parsedData[2]
      console.log("Changing " + appdata[row][col] + " to " + newdata);
      appdata[row][col] = newdata;
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end()
    });

    //when row in db needs to be deleted
  } else if (request.url === '/deleteData') {
    request.on( 'end', function() {
      console.log("deleting " + appdata[dataString]);
      appdata.splice(parseInt(dataString));
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end()
    });

  } else {
    request.on( 'end', function() {
      console.log("pushing");
      console.log( JSON.parse( dataString ) );
      appdata.push(JSON.parse(dataString));
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end()
    })
  }
}

const sendFile = function( response, filename ) {
  const type = mime.getType( filename )

  fs.readFile( filename, function( err, content ) {
    // if the error = null, then we've loaded the file successfully
    if( err === null ) {
      // status code: https://httpstatuses.com
      response.writeHeader( 200, { 'Content-Type': type });
      response.end( content );
    }else{
      // file not found, error code 404
      response.writeHeader( 404 );
      response.end( '404 Error: File Not Found' );
    }
  })
}






server.listen( process.env.PORT || port )
