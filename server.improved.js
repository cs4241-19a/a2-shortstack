const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14}
]

let itemsStore = {}

const server = http.createServer( function( request,response ) {
  writeCorsHeaders(request, response);
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ){
    handlePost( request, response )
  }else if (request.method === 'OPTIONS') {
    handleOptions(request, response);
  }
})

const writeCorsHeaders = function(request, response) {
  response.setHeader('Access-Control-Allow-Headers', request.headers.origin);
  response.setHeader('Access-Control-Request-Method', request.headers.origin);
  response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
  response.setHeader('Access-Control-Allow-Headers', 'authorization, content-type')
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
}

const handleOptions = function(request, response) {
  response.writeHead(200);
  response.end();
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

/*
Source for parseDate and datediff: https://stackoverflow.com/a/543152
 */
function parseDate(str) {
  var mdy = str.split('/');
  return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second-first)/(1000*60*60*24));
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data
  })

  request.on( 'end', function() {
    const req = JSON.parse( dataString );
    switch(req.type) {
      case 'getData':
        console.log('Getting data');
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify({ itemsStore }))
        break;
      case 'addItem':
        console.log(`Adding ${req.data.id}`)
        itemsStore[req.data.id] = req.data;
        response.writeHead(200);
        response.end();
        break;
      case 'modifyItem':
        console.log(`Modifying ${req.data.id}`)
        const newItem = Object.assign({}, itemsStore[req.data.id], req.data);
        let priorityPoints = 0;
        /*
        priority points = Difficulty (None=1, hard = 2, easy = 4) * Importance (mission critical = 6, hard = 4, ''=1) - (daysUntilRecommendedDeadline + daysUntilHardDeadline)
         */
        const now = new Date();

        let daysUntilRecommendedDeadline = 0;
        if (newItem.recommendedDeadline.length > 0) {
          daysUntilRecommendedDeadline = Math.floor(( Date.parse(newItem.recommendedDeadline) - Date.now() ) / 86400000);
        }

        let daysUntilHardDeadline = 0;
        if (newItem.hardDeadline.length > 0) {
          daysUntilHardDeadline = Math.floor(( Date.parse(newItem.hardDeadline) - Date.now() ) / 86400000);
        }

        let difficultyPoints = 1;
        if (newItem.difficulty === 'Easy') {
          difficultyPoints = 4;
        } else if (newItem.difficulty === 'Medium') {
          difficultyPoints = 3;
        } else if (newItem.difficulty === 'Hard') {
          difficultyPoints = 2;
        }

        let importancePoints = 1;
        if (newItem.importance === 'Low') {
          importancePoints = 2;
        } else if (newItem.importance === 'Medium') {
          importancePoints = 4;
        } else if (newItem.importance === 'High') {
          importancePoints = 8;
        } else if (newItem.importance === 'Mission Critical') {
          importancePoints = 12;
        }

        priorityPoints = difficultyPoints * importancePoints - (daysUntilRecommendedDeadline + daysUntilHardDeadline);
        newItem.priorityPoints = priorityPoints
        itemsStore[req.data.id] = newItem;
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify({ id: newItem.id, priorityPoints }));
        break;
      case 'deleteItem':
        console.log(`Deleting ${req.data.id}`)
        delete itemsStore[req.data.id];
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify({ itemsStore }))
        break;
      default:
        console.error(`Don't know what to do with`, req);
        response.writeHead(400);
        response.end();
        break;
    }
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

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log("ahh you bitch");
  const jsonContent = JSON.stringify({
    itemsStore
  });

  fs.writeFile("./data.json", jsonContent, 'utf8', function (err) {
    if (err) {
      console.error("An error occured while writing JSON Object to File.", err);
      process.exit(1);
    } else {
      console.log("JSON file has been saved.");
      process.exit(0);
    }
  });
}

// Before we start listening, let's load any data written to disk.
if (fs.existsSync('./data.json')) {
  const contents = fs.readFileSync('./data.json', 'utf8');
  const dataStore = JSON.parse(contents);
  console.log('Recovered memory from data.json:', dataStore)
  itemsStore = dataStore.itemsStore || {};
}

server.listen( process.env.PORT || port )
