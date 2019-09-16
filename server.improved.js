const express    = require('express'),
      app        = express(),
      session = require('express-session'),
       bodyparser = require( 'body-parser' ),
      // dreams     = [],
      favicon = require('serve-favicon'),
      path = require('path'),
      passport = require('passport'),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      Local = require('passport-local').Strategy;

const db = low(new FileSync('db.json'));
const info = low(new FileSync('./public/json/userData.json'));

const myLocalStrategy = function (username, password, done) {
    db = db.value()
    const user = db.find(__user => __user.username === username)
    if (user === undefined) {
        console.log('user not found')
        return done(null, false, { message: 'user not found' })
    } else if (user.password === password) {
        console.log('correct')
        return done(null, { username, password })
    } else {
        console.log('incorrect password')
        return done(null, false, { message: 'incorrect password' })
    }
}

passport.use(new Local(myLocalStrategy))
passport.initialize()

passport.serializeUser((user, done) => done(null, user.username))

passport.deserializeUser((username, done) => {
    const user = db.find(u => u.username === username)
    console.log('deserializing:', user)

    if (user !== undefined) {
        done(null, user)
    } else {
        done(null, false, { message: 'user not found; session not restored' })
    }
})

app.use(session({ secret: 'cats cats cats', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.post('/test', function (req, res) {
    console.log('authenticate with cookie?', req.user)
    res.json({ status: 'success' })
})


app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/database.html',
        failureRedirect: '/'
    }),
    function (req, res) {
        console.log("Login successful")
        console.log(req.user)
        res.json({ status: true })
    }
)













const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'matchNumber':1,'red1': 8192, 'blue1': 7146, 'redScore': 25, 'blueScore':25,'result':0},
  { 'matchNumber':2,'red1': 6439, 'blue1': 359, 'redScore': 23, 'blueScore':32,'result':2 } 
]

const appdata2 = [
  // {'team':8192,'WLP':"0-0-0",'WP':1},
  // {'team':7146,'WLP':"0-0-0",'WP':1},
  // {'team':6439,'WLP':"0-0-0",'WP':0},
  // {'team':359,'WLP':"0-0-0",'WP':2}
]

// const server = http.createServer( function( request,response ) {
//   addTeam(8192);
//   addTeam(7146);
//   addTeam(6439);
//   addTeam(359);
//   rank();
//   if( request.method === 'GET' ) {
//     handleGet( request, response )    
//   }else if( request.method === 'POST' ){
//     handlePost( request, response ) 
//   }
// })

app.get('/', function(request, response) {
  // let thepath = path.normalize(__dirname + 'public/index.html');
  // response.sendFile(thepath);
  // response.sendFile( __dirname + 'public/index.html' )
  
  
  sendFile( response, 'public/index.html'  )
})

   
app.get('/public/css/style.css', function(request, response) {
    sendFile( response, 'public/css/style.css' )
})


app.get('/m', function(request, response) {
    sendData( response, appdata )
})

app.get('/appdata2', function(request, response) {
    sendData( response, appdata2 )
})



app.post( '/register', function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data 
  })
  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    const REG = JSON.parse(dataString); //match result
  db.get( 'users' ).push({ username:REG.username, password:REG.password }).write()
  
}
  )})


app.post( '/submit', function( request, response ) {
  // our request object now has a 'json' field in it from our
  // previous middleware
    let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
  const MR = JSON.parse(dataString); //match result
      let r = 0;
      if(MR.redScore > MR.blueScore){
        r = 1;
      } else if(MR.redScore < MR.blueScore){
        r = 2;
      }
      const newMR ={
        'matchNumber':MR.matchN,
        'red1': MR.red1, 
        'blue1': MR.blue1, 
        'redScore': MR.redScore, 
        'blueScore':MR.blueScore,
        'result':r
      }
      appdata.push(newMR);
      addTeam(MR.red1);
      addTeam(MR.blue1);
      rank();
      
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end();
})
})



app.post( '/delete', function( request, response ) {
  // our request object now has a 'json' field in it from our
  // previous middleware
    let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    
      const MRdelete = JSON.parse(dataString); //match result
       appdata.splice(MRdelete.matchNumber, 1);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end();
      rank();
})
})

app.post( '/update', function( request, response ) {
  // our request object now has a 'json' field in it from our
  // previous middleware
    let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    const MRupdate = JSON.parse(dataString);
        let r2 = 0;
        if(MRupdate.redScore > MRupdate.blueScore){
          r2 = 1;
        } else if(MRupdate.redScore < MRupdate.blueScore){
          r2 = 2;
        }
        const updatedMR = {
        'matchNumber':MRupdate.matchNumber,
        'red1': MRupdate.red1, 
        'blue1': MRupdate.blue1, 
        'redScore': MRupdate.redScore, 
        'blueScore':MRupdate.blueScore,
         'result': r2
        };
        
        appdata.splice(MRupdate.index, 1, updatedMR);
        rank();
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain'});
        response.end();

})
})


const sendData = function( response, MHs ) {
  const type = mime.getType( MHs );
  response.writeHeader(200, { 'Content-Type': type });
  response.write(JSON.stringify({ data: MHs }));
  response.end();
}

const rank = function(){
  for(let j=0; j<appdata2.length;j++){
    appdata2[j].W = 0; 
    appdata2[j].L = 0; 
    appdata2[j].P = 0; 
    appdata2[j].WP = 0; 
  }
  
  for(let i=0; i<appdata.length;i++){
    if(appdata[i].result===1){
      for(let j=0; j<appdata2.length;j++){
        if(appdata2[j].team == appdata[i].red1){
          appdata2[j].W++;
          appdata2[j].WP+=2;
        }
        if(appdata2[j].team == appdata[i].blue1){
        appdata2[j].L++;
        }
      }
    } else if (appdata[i].result===2){
      for(let j=0; j<appdata2.length;j++){
        if(appdata2[j].team == appdata[i].blue1){
          appdata2[j].WP+=2;
          appdata2[j].W++; 
        }
        if(appdata2[j].team == appdata[i].red1){
        appdata2[j].L++;
        }
      }
    } else{
      for(let j=0; j<appdata2.length;j++){
        if(appdata2[j].team == appdata[i].red1){
          appdata2[j].WP++;
          appdata2[j].P++;
        }
        if(appdata2[j].team == appdata[i].blue1){
          appdata2[j].WP++;
          appdata2[j].P++;
        }
      }
    
    }
     
  }
  appdata2.sort(function(b,a){
  return a.WP-b.WP});
}



const addTeam = function(t){
  let exist = 0;
  for(let i=0; i<appdata2.length;i++){
    if(appdata2[i].team == t){
      exist = 1;
    }
  }
  if(exist === 0){
    const newteam ={
      'team':t,
       'W':0,
      'L':0,
      'P':0,
      'WP':0
    }
    appdata2.push(newteam);
  }
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

app.listen( process.env.PORT || port )
