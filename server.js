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
app.use(express.static(dir));
app.use(bodyParser.json());

//
db.defaults({ users: [] }).write();
let users
const occupyUsers = function() {
    users = [];
    let i = 0;
    while (true) {
        let user = db.get(`users[${i}]`).value();
        if (user) users.push(user)
        else break
        i++;
    }
};
occupyUsers();
  
//Password Authentication
const strategy = function(username, password, done) {
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
passport.use(new LocalStrategy(strategy))

passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser((username, done) => {
    let user = users.find(usr => usr.username === username)
    if (user !== undefined) {
        done(null, user)
    } else {
        done(null, false, { message: 'User Not Found' })
    }
})

app.post( '/login',
    passport.authenticate('local'),
    function(request, response) {
        const currentUser = users.find(usr => usr.username === request.user.username)
        response.json({ status: true })
    }
)

app.get( '/update', function(request, response) {
  let body = request.body
  
  db.get('students')
}
         
    passport.authenticate('local'),
    function(request, response) {
        const currentUser = users.find(usr => usr.username === request.user.username)
        response.json({ status: true })
    }
)


/*
app.post('/update', function(request, response) {
    let body = request.body

    db.get('allUsers')
        .find({ username: you.username })
        .assign({
            name: body.name,
            age: body.age,
            gender: body.gender,
            hobby: body.hobby
        }).write()
    copyAllUsers()
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end();
*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

