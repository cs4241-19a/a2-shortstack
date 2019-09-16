//express imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

//passport imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//lowdb imports
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);

const dir = "public/";
app.use(express.static(dir + "loginPage"));
app.use(bodyParser.json());

//
db.defaults({ users: [] }).write();
let users = []
let i = 0;
for(i = 0; i < 4; i++) {
  let user = db.get('users[${i}]').value;
  if(user !== null){
    users.push(user)
    i++
  }
  else
    break
}
console.log("Users" + users)
  
//Password Authentication
const myLocalStrategy = function(username, password, done) {
    const user = users.find(usr => usr.username === username);
    if (user === undefined) 
      return done(null, false, { message: 'User Not Found' });
    else if (user.password === password) 
      return done(null, { username, password });
    else 
      return done(null, false, { message: 'Password Incorrect' });
};

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(myLocalStrategy))

passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser((username, done) => {
    let user = users.find(u => u.username === username)
    if (user !== undefined) {
        done(null, user)
    } else {
        done(null, false, { message: 'User Not Found' })
    }
})

app.post( '/login',
    passport.authenticate('local'),
    function(request, response) {
  console.log(request)
    console.log(response)

        let currentUser = users.find(usr => usr.username === request.user.username)
        response.json({ status: true })
    }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

