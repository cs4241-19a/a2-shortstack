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
      database = require('./public/db'),
      serveStatic = require('serve-static'),
      path = require('path'),
      session = require('express-session')

      
      


      app.use(Express.static('public'))
      app.use(bodyParser.urlencoded())
      app.use(bodyParser.json())
      app.use(serveStatic(path.join(__dirname, 'public')))
      app.use( session({ secret:'cats cats cats', resave:false, saveUninitialized:false }) )
      app.use(passport.initialize());
      app.use(passport.session());




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

passport.use( 'signup',new Strategy(
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


     



app.get("/", function(request, response){

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
  
  console.log ("delName is ", request.body.delName)
  database.users.deleteData(request.user, request.body.delName )

}) 

app.get("/data", function(request, response){
  
  
  response.send(request.user.data)
  
 
  
})

app.post("/login",passport.authenticate('local', { failureRedirect: '/' }), function(request,response){
  console.log("login")
  response.redirect('/info.html')
  
  
  
})

app.post("/signup",passport.authenticate('signup', { failureRedirect: '/' }), function(request,response){
  console.log("signup")
  response.redirect('/info.html')
  
  
  
})

app.get("/red", function(request,response){
  console.log("red")
  response.redirect('/info.html')
})


app.listen(process.env.PORT || port)
