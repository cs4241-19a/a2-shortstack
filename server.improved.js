const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const basic_field_options = {"carbohydrates": "false", "fruits": "false", "vegetables": "false", "protein": "false", "oil":"false"};

const server = http.createServer( function( request,response ) {
  console.log("Server Received Request")
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  console.log(filename)
  // switch between api endpoints 
  switch(request.url) {
    case "/":
      index(request, response);
      break;
    default:
      sendFile( response, filename );
  }
}

const handlePost = function( request, response ) {
  const filename = request.url.slice( 1 )
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })
  
  request.on( 'end', function() {
    console.log(filename)

    // switch between api endpoints 
    switch(request.url) {
      case "/addUser":
        addUser(dataString, response);
        break;
      case "/signInUser":
        signInUser(dataString, response);
        break;
      case "/deleteUser":
        deleteUser(dataString, response);
        break;
      case "/getUser":
        editUser(dataString, response);
        break;
      case "/editUser":
        editUser(dataString, response);
        break;
      case "/getDatabase":
        getDatabase(dataString, response);
        break;
      case "/updateUser":
        updateUserData(dataString, response);
        break;
      default:
        console.log("Unknown Request");
    }    
  })
}

///////////////////////////////////////////////////////////////////
// move follwing functions into different files or one api file

const index = function (request, response){
  sendFile( response, "public/index.html" )
}

const addUser = function (data, response){
  var username = data;
  console.log(username);
  
  let json_data;
  fs.readFile( './public/database.json', function( err, content ) {
    var string_return = "New User Created";  
    json_data = JSON.parse(content);
    for (var key in json_data){
      if (key === username) {
        string_return = "New User cannot be created, User Exists Already";
      }
    }
    if (string_return !== "New User cannot be created, User Exists Already"){
      json_data[String(username)] = basic_field_options;
      fs.writeFile("./public/database.json", JSON.stringify(json_data), (err) => {if (err) throw err;});
      console.log(json_data);
    }
    response.writeHeader( 200, { 'Content-Type': 'application/json' });
    response.end(string_return);
  });
  setDerivedField();
}

const signInUser = function (data, response){
  var username = data;
  console.log(username);
  
  let json_data;
  fs.readFile( './public/database.json', function( err, content ) {
    var string_return = "User Not Found";  
    json_data = JSON.parse(content);
    for (var key in json_data){
      if (key === username) {
        string_return = "User Found";
      }
    }
    response.writeHeader( 200, { 'Content-Type': 'application/json' });
    response.end(string_return);
  });
  setDerivedField();
}

const deleteUser = function (data, response){
  var username = data;
  console.log(username);
  
  let json_data;
  fs.readFile( './public/database.json', function( err, content ) {
    var string_return = "User could not be found";  
    json_data = JSON.parse(content);
    for (let key in json_data){
      if (key === username) {
        string_return = "User is Deleted";
        delete json_data[key];
      }
    }
    if (string_return === "User is Deleted"){
      fs.writeFile("./public/database.json", JSON.stringify(json_data), (err) => {if (err) throw err;});
      console.log(json_data);
    }
    response.writeHeader( 200, { 'Content-Type': 'application/json' });
    response.end(string_return);
  });
}

const editUser = function (data, response){
  var username = data;
  console.log(username);
  
  let json_data;
  fs.readFile( './public/database.json', function( err, content ) {
    var string_return = "User Cannot be Found";  
    json_data = JSON.parse(content);
    for (let key in json_data){
      if (key === username) {
        var user_data = {};
        user_data[key] = json_data[key];
        string_return = JSON.stringify(user_data);
      }
    }
    setDerivedField(json_data);
    fs.writeFile("./public/database.json", JSON.stringify(json_data), (err) => {if (err) throw err;});
    
    response.writeHeader( 200, { 'Content-Type': 'application/json' });
    response.end(string_return);
  });
}

const getDatabase = function (data, response){
  let json_data; 
  fs.readFile( './public/database.json', function( err, content ) {
    response.writeHeader( 200, { 'Content-Type': 'application/json' });
    response.end(content);
  });
}

const updateUserData = function(dataString, response){
  let json_data;
  let username;
  fs.readFile( './public/database.json', function( err, content ) {
    json_data = JSON.parse(content);
    console.log(dataString);

    var data = JSON.parse(dataString);

    for (let name in data){
      username = name;
    }

    json_data[username] = data[username];
    
    for (let key in json_data){
      let total_sum = 0;
      for (let innerkey in json_data[key]){
        if (json_data[key][innerkey] === "true") {
          total_sum += 1;
        }
      }
      json_data[key]["score"] = total_sum;
    }
    setDerivedField(json_data);
    fs.writeFile("./public/database.json", JSON.stringify(json_data), (err) => {if (err) throw err;});

    response.writeHeader( 200, { 'Content-Type': 'application/text' });
    response.end("User Data Updated");
  });
}

const setDerivedField = function(content){
  let json_data = content;
  for (let key in json_data){
    let total_sum = 0;
    for (let innerkey in json_data[key]){
      if (json_data[key][innerkey] === "true") {
        total_sum += 1;
      }
    }
    json_data[key]["score"] = total_sum;
  };
  return json_data
}

/*
const setDerivedField = function(){
  let json_data;
  fs.readFile( './public/database.json', function( err, content ) {
    json_data = JSON.parse(content);
    for (let key in json_data){
      let total_sum = 0;
      for (let innerkey in json_data[key]){
        if (json_data[key][innerkey] === "true") {
          total_sum += 1;
        }
      }
      json_data[key]["score"] = total_sum;
    }
    fs.writeFile("./public/database.json", JSON.stringify(json_data), (err) => {if (err) throw err;});
  });
}
*/

/////////////////////////////////////////////////////////////////


const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end(content)

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
