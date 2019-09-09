const http = require( 'http' ),
      fs   = require( 'fs' ),
      bcrypt = require('bcrypt'),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'username': 'user', 'password': 'pass', 'admin': "false" },
  { 'username': 'test', 'password': 'test', 'admin': "false" },
  { 'username': 'abc', 'password': '123', 'admin': "false" },
  { 'username': 'admin', 'password': '', 'admin': "true"}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  
  console.log(request.url)

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === '/style.css') {
      sendFile( response, 'public/css/style.css' )
  }
  else{
    sendFile( response, filename )
  }
}

function login(username, password) {
  for(var i = 0; i < Object.keys(appdata).length; i++) {
    let j = i;
    console.log(username + " vs. " + appdata[j].username)
    if(username == appdata[j].username) {
      if(password == appdata[j].password) {
        return true;
      }
      else {
        console.log("wrong password!")
      }
    }
  }
  return false;
}

var newUserStatus = ""

function newUser(username, password) {
  for(var i = 0; i < Object.keys(appdata).length; i++) {
    let j = i;
    console.log(username + " vs. " + appdata[j].username)
    if(username == appdata[j].username) {
      console.log("cannot make new user! username already taken.")
      newUserStatus = "cannot make new user! username already taken."
      return -1;
    }
  }
  console.log("new user created!")
  newUserStatus = "new user created!"
  appdata.push({username: username, password: password, admin: "false"})
}

function deleteUser(username, password) {
  for(var i = 0; i < Object.keys(appdata).length; i++) {
    let j = i;
    console.log("deleting user: " + username)
    if(username == appdata[j].username) {
      console.log("deleting user")
      delete appdata[j].username
      delete appdata[j].password
      delete appdata[j].admin
    }
    else {
      console.log("could not find user!")
    }
  }
}

function updateUser(username) {
  for(var i = 0; i < Object.keys(appdata).length; i++) {
    let j = i;
    console.log("updating user: " + username)
    if(username == appdata[j].username) {
      console.log("updating user")
      if(appdata[j].admin == "false") {
        appdata[j].admin = "true"
      }
      else {
        appdata[j].admin = "false"
      }
    }
    else {
      console.log("could not find user!")
    }
  }
}

const handlePost = function( request, response ) {
  console.log("received post!")
  
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    
    var data=JSON.parse(dataString)
    
    console.log( data )

    // ... do something with the data here!!!
    
    var resp = ""
    var isAdmin = "false"
    
    if(data.action == "login") {
      console.log("trying to log in.")
      if(login(data.username, data.password)) {
        resp = "logged in successfully!"
        if(data.username == "admin") {
          isAdmin = "true"
        }
        console.log("logged in successfully!")
      }
      else {
        resp = "unable to log in!"
        console.log("unable to log in!")
      }
    }
    else if(data.action == "add") {
      console.log("add command")
      newUser(data.username, data.password)
    }
    else if(data.action == "delete") {
      console.log("delete command")
      deleteUser(data.username, data.password)
    }
    else if(data.action == "update") {
      console.log("update command")
      updateUser(data.username)
    }
    
    // var fake_json = { "loginStatus": login(username, password), "users": appdata }
    
    if(isAdmin === "true") {
      var json_resp = {"loginstatus": resp, "adminstatus": isAdmin, users: appdata}
    }
    else {
      var json_resp = {"loginstatus": resp, "adminstatus": isAdmin}
    }
    
    if(data.action == "add") {
      var json_resp = {"status": newUserStatus}
    }
    
    // make response json format, but sauce it over as plaintext. if we do that, then we convert it
    // from plaintext to json on the other boi then should be gg just make sure to fufill the other requirements
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain'})
    // response.end(JSON.stringify(fake_json))
    response.end(JSON.stringify(json_resp))
    
    console.log(json_resp)
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
