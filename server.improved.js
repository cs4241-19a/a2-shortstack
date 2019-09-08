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

var Entry = function(time, title, notes, priority) {
  return {
  'unixtime' : time,
  'title' : title,
  'notes' : notes,
  'priority' : priority
  }
}

const getDDB = function (user, callback){
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
  
  ddb.scan(params, function(err, data) {
    let entryArray = []
    if (err) {
      console.log("Error", err);
      return []
    } else {
      data.Items.forEach(function(e, index, array) {
        entryArray.push(new Entry(e.unixtime.N, e.title.S, e.notes.S, e.priority.N))
      });
      entryString = JSON.stringify( entryArray )
      callback(entryString)
    }
  });
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if( request.method === 'DELETE' ){
    handleDelete( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if( request.url === '/get'){
    entryArray = getDDB('admin', function(entryString){
      response.writeHeader( 200, { 'Content-Type': 'application/json' })
      response.end( entryString )
    });
  } else if ( request.url === '/new' ) {
    sendFile( response, 'public/new.html' )
  } else if ( request.url.substring(0,5) === '/edit' ) {
    sendFile( response, 'public/edit.html' )
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
        'unixtime' : {N: dataJSON.time},
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

const handleDelete = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })
  request.on( 'end', function() {
    let dataJSON = JSON.parse( dataString )
    console.log( 'on delete' )
    console.log( dataJSON )

    let params = {
      TableName:'todont-list',
      Key:{
          unixtime: {N: dataJSON.time }
        },
      };
    console.log( params )
  ddb.deleteItem(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

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
