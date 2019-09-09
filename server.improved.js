const http = require( 'http' ),
      fs   = require( 'fs' ),
      Sequalize = require('sequelize'),
      db_util = require('./db_util')
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})


// -----------------------------
// ---- Mainline Database
// -----------------------------

// Simple file based db using an ORM
const sequelize = new Sequalize({
  dialect: 'sqlite',
  storage: 'database.lite',
  pool: {
    max: 5,
    min: 0,
    aquire: 3000,
    idle: 1000
  }
});


// Table model for the database
db_util.Reservation.init({
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stall: {
    type: Sequalize.INTEGER,
    allowNull: false,
  },
  start: {
    type: Sequalize.DATE,
    allowNull: false,
  },
  end: {
    type: Sequalize.DATE,
    allowNull: false,
  },
  fulfilled: {
    type: Sequalize.BOOLEAN,
    allowNull: false,
  },
  name: {
    type: Sequalize.STRING,
  }
},{sequelize: sequelize, modelName: 'reservation'});

sequelize.authenticate()
  .then( () => {
    console.log("We in here...creating tables if necessary.");
    db_util.Reservation.sync();
  }).catch(err => {
    console.log("F");
  });

//db_util.makeRes(1, 5, "Occupied!");

// ----------------------------
// ---- Server Logistics
// ----------------------------

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if( request.url === '/status'){
    sendStatus( response )
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
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    const reserve_request = JSON.parse(dataString);
    const length_map = {
      express: 2,
      standard: 5,
      facebook: 10,
    }
    db_util.makeRes(reserve_request.stall, length_map[reserve_request.length], reserve_request.name)
      .catch(function(e){
        console.log(e);
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

const sendStatus = function(response) {
  let content = {
    0: {active: false},
    1: {active: false},
    2: {active: false},
    3: {active: false},
  }
  db_util.fetchActiveRevs()
    .then(function(result){
      for(let i=0; i<result.length; i+=1){
        content[result[i].stall] = {
          active: true,
          name: result[i].name,
          end: result[i].end,
        }
      }

      response.writeHead(200, "OK", {"Content-Type": "application/json"});
      response.end(JSON.stringify(content))
  });
}

server.listen( process.env.PORT || port )
