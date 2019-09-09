const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      TAFFY = require('taffy'),
      dir  = 'public/',
      port = 3000    


var classes = TAFFY([
    { "Department" : "CS1101",
      "Professor" : "bob",
      "Name" : "programming design concepts"
    },
    { "Department" : "ME1800",
      "Professor" : "Jill",
      "Name" : "prototyping"
    },
    { "Department"  : "CS2303",
      "Professor" : "Andres",
      "Name" : "systems"
    },
    { "Department" : "PSY1401",
      "Professor" : "Brian",
      "Name" : "cognitive psych"
    },
    { "Department" : "RBE1001",
      "Professor" : "Megan",
      "Name" : "intro to robotics"
    },
    { "Department" : "ECE2049",
      "Professor" : "Sam",
      "Name" : "embedded design"
    },
    { "Department" : "CS4801",
      "Professor" : "Emily",
      "Name" : "crypto"
    }
]);


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
  }
  else if(request.url === '/scripts.js'){
    sendFile(response, "public/js/scripts.js")
  }
  else if(request.url === '/style.css'){
    sendFile(response, "public/css/style.css")
  }
  else if(request.url === '/ac8c900b-49be-4128-8edb-e64905679f74%2FWPI_logo.png?v=1567371575005'){
    sendFile(response, "ac8c900b-49be-4128-8edb-e64905679f74%2FWPI_logo.png?v=1567371575005")
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''
  let flag = 0;
  request.on( 'data', function( data ) {
      dataString += data 
  })
  request.on( 'end', function() {
    let inputData = JSON.parse( dataString )
    let action = inputData.action
    if(action.includes('a')){
      let dept = inputData.dept
      let prof = inputData.prof
      let name = inputData.name
      let myEnt = {}
      myEnt["Department"] = dept;
      myEnt["Professor"] = prof
      myEnt["Name"] = name
      console.log(myEnt)
      classes.insert(myEnt);
    }
    else if(action.includes('m')){
      let cat = inputData.category;
      let catTwo = inputData.secCategory;
      let inputVal = inputData.input;
      let catObj = {};
      let innerObj = {};
      innerObj["like"] = catTwo
      catObj[cat] = innerObj;
      let updateObj = {}
      updateObj[cat] = inputVal;
      console.log(updateObj)
      classes(catObj).update(updateObj);
    }
    else{
      let cat = inputData.category;
      let catTwo = inputData.secCategory;
      let inputVal = inputData.input;
      let catObj = {};
      let innerObj = {}
      innerObj["like"] = catTwo
      catObj[cat] = innerObj;
      let updateObj = {}
      updateObj[cat] = null;
      console.log(updateObj)
      classes(catObj).remove();
    }
    if(!flag){
      let json, finalJson = [];
      let sendjson;
      response.writeHead( 200, "OK", {'Content-Type': 'application/json', 'charset':'UTF-8'});
      classes().each(function (r){json = {dept:r.Department ,prof:r.Professor ,name:r.Name}; finalJson.push(json);})
      sendjson={objs:finalJson}
      response.end(JSON.stringify(sendjson));
    }
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       //status code: https://httpstatuses.com
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
