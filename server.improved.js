const express    = require('express'),
      session = require('express-session'),
      app        = express(),
      bodyparser = require( 'body-parser' ),
      // dreams     = [],
      favicon = require('serve-favicon'),
      passport = require('passport'),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      Local = require('passport-local').Strategy;

const db = low(new FileSync('db.json'));
app.use(express.static('public'));
const info = low(new FileSync('userData.json'));

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

app.get('/', function(request, response) {
  // let thepath = path.normalize(__dirname + 'public/index.html');
  // response.sendFile(thepath);
  // response.sendFile( __dirname + 'public/index.html' )
  
response.sendFile( response, 'public/database.html' )
 // response.sendFile(__dirname + '/public/database.html');
});


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




  

app.listen( process.env.PORT || 3000 )
