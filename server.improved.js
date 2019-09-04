const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({region: 'us-east-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

function Entry(time, title, notes, priority) {
  this.unixtime = time;
  this.title = title;
  this.notes = notes;
  this.priority = priority;
}

const getDDB = function (user){
  let params = {
    ExpressionAttributeNames: {
      '#owner_table': 'owner',
  },
  ExpressionAttributeValues: {
      ':owner_name': {S: user},
  },
    FilterExpression: '#owner_table = :owner_name',
    TableName: 'todont-list'
  };
  
  let entryArray = []
  ddb.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      return []
    } else {
      //console.log("Success", data.Items);
      data.Items.forEach(function(e, index, array) {
        entryArray.push(new Entry(e.unixtime, e.title, e.notes, e.priority))
        // console.log(e.title.S + " (" + e.notes.S + ")");
      });
      console.log(entryArray)
      return entryArray
    }
  });
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
    entryArray = getDDB('admin')
    sendFile( response, 'public/index.html' )
  } else if ( request.url === '/new' ) {
      sendFile( response, 'public/new.html' )
  } else if( request.url === '/about' ) {
        sendFile( response, 'public/about.html' )
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
    let dataJSON = JSON.parse( dataString )
    console.log( dataJSON )
    // Call DynamoDB to add the item to the table
    let params = {
      TableName: 'todont-list',
      Item: {
        'unixtime' : {N: String(Date.now())},
        'title' : {S: dataJSON.title},
        'notes' : {S: dataJSON.notes},
        'priority' : {N: String(dataJSON.priority)},
        'owner' : {S: 'admin'}
      }
    };
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
    // ... do something with the data here!!!

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

server.listen( process.env.PORT || port )
