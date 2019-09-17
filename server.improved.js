const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000,
      Express = require('express'),
      app = Express(),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      Strategy = require('passport-local').Strategy,
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter),
      database = require('./db')

      db.defaults({users:[], data:[]}).write()
      


      app.use(Express.static('public'))
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded())
      app.use(passport.initialize());
      app.use(passport.session());

const appdata = [
  { 'name': 'Justin', 'year': 2020, 'inches': 71 },
  { 'name': 'Bob', 'year': 2021, 'inches': 60 },
  { 'name': 'Andy', 'year': 2022, 'inches': 84} 
]

const newData = []


//passport
passport.use('local', new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));







app.get("/", function(request, response){
  sendFile(response, 'public/index.html')
});



app.post("/submit", function(request, response){
  console.log(request.body)
  console.log("name is " + request.body.yourname)
  let json = { name: request.body.yourname, year: request.body.classyear, inches: request.body.height }
  let index = -1
  let val = request.body.yourname
  let filteredObj = appdata.find(function(item,i){
    if(item.name === val){
      index = i
      return i
    }
  })
  console.log(request.body.yourname + "is in position " + index  )
  if(index > -1)
    {
      appdata.splice(index, 1)
    }
  
  appdata.push(json)
  console.log(appdata)
  
})


app.post("/delete", function(request,response){
  let json = { name: request.body.delName, year: 200, inches: 0}
  let index = -1
  let val = request.body.delName
  let filteredObj = appdata.find(function(item,i){
    if(item.name === val){
      index = i
      return i
    }
  })
  console.log(request.body.delName + " is in position " + index  )
  if(index > -1)
    {
      appdata.splice(index, 1)
    }
})

app.get("/data", function(request, response){
  console.log("Pre newData is " )
  console.log(newData)
  
 
  
  
  appdata.forEach(function(item){
    
    newData.push({name: item.name, year: item.year, inches: item.inches, cm: (item.inches * 2.54)})
  })
  
  while(newData.length !== appdata.length)
    {
      newData.shift()
    }
  
  console.log("Post newData is ")
  console.log(newData)
  console.log(appdata)
  
  response.send(newData)
})

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


app.post("/signup", passport.authenticate('local', {}),function(request,response){
  
  
  
  
  /*let json = { name: request.body.delName, year: 200, inches: 0}
  let index = -1
  let val = request.body.delName
  let filteredObj = appdata.find(function(item,i){
    if(item.name === val){
      index = i
      return i
    }
  })
  console.log(request.body.delName + " is in position " + index  )
  if(index > -1)
    {
      appdata.splice(index, 1)
    }
    */
})



app.listen(process.env.PORT || port)
