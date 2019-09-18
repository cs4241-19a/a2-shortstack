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
     // db = low(adapter),
      database = require('./public/db'),
      serveStatic = require('serve-static'),
      path = require('path'),
      session = require('express-session')

      //db.defaults({users:[], data:[]}).write()
      


      app.use(Express.static('public'))
      app.use(bodyParser.urlencoded())
      app.use(bodyParser.json())
      app.use(serveStatic(path.join(__dirname, 'public')))
      app.use( session({ secret:'cats cats cats', resave:false, saveUninitialized:false }) )

      

const appdata = [
  { 'name': 'Justin', 'year': 2020, 'inches': 71 },
  { 'name': 'Bob', 'year': 2021, 'inches': 60 },
  { 'name': 'Andy', 'year': 2022, 'inches': 80} 
]

const newData = []


//passport
passport.use( new Strategy(
  function(username, password, cb) {
    database.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      console.log("password is ")
      console.log(user.password)
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));

passport.use( 'local-signup',new Strategy(
  function(username, password, cb) {
    database.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (user) { return cb(null, false, {message:"username in use"}); }
      let newSignUp = database.users.newUser(username,password)
     
      return cb(null, newSignUp);
    });
}));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  database.users.findById(id, function (err, user) {
    console.log("deserializing: ", id)
    if (err) { return cb(err); }
    cb(null, user);
  });
});


      app.use(passport.initialize());
      app.use(passport.session());



app.get("/", function(request, response){
  //sendFile(response, 'public/index.html')
  response.send('public/index.html')
});



app.post("/submit", function(request, response){
  console.log(request.user.id)
  console.log(request.user.username)
  console.log(request.user.data)
  database.users.updateData(request.user, { name: request.body.yourname, year: request.body.classyear, inches: request.body.height} )
  console.log("final data is ", request.user.data)
  
})


app.post("/delete", function(request,response){
  
  
  database.users.deleteData(request.user, )
  /*
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
    }*/
}) 

app.get("/data", function(request, response){
  
  
  response.send(request.user.data)
  
 
  
})

app.post("/login",passport.authenticate('local', { failureRedirect: '/' }), function(request,response){
  console.log("login")
  response.redirect('/info.html')
  
  
  
})

app.post("/signup",passport.authenticate('local-signup', { failureRedirect: '/' }), function(request,response){
  console.log("signup")
  response.redirect('/info.html')
  
  
  
})

app.get("/red", function(request,response){
  console.log("red")
  response.redirect('/info.html')
})


app.listen(process.env.PORT || port)
