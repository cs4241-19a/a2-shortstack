//express imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

//passport imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//lowdb imports
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);

app.use(express.static('public'));
//app.use(bodyParser.json());

//DATABASE
db.defaults({ users: [] }).write();
let users = []
let i = 0;
while(true) {
  let user = db.get('users[${i}]').value;
  if(user !== null){
    users.push(user)
    i++
  }
  else
    break
}
  


//Password Authentication
passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser((username, done) => {
    const user = users.find(u => u.username === username)
    if (user !== undefined) {
        done(null, user)
    } else {
        done(null, false, { message: 'user not found; session not restored' })
    }
})
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.post('/test', function(req, res) {
    console.log('authenticate with cookie?', req.user)
    res.json({ status: 'success' })
})

app.post(
    '/login',
    passport.authenticate('local'),
    function(req, res) {
        let currentUser = users.find(usr => usr.username === req.user.username)
        res.json({ status: true })
    }
)












// intialize passport
app.use(passport.initialize());
// use express.session() before passport.session()
app.use(passport.session());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

