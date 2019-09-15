const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

app.use(express.static('public'))

//password
passport.use(new LocalStrategy( 
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

//database
db.defaults({ posts: [] })
  .write()

const result = db.get('posts')
  .push({ title: process.argv[2] })
  .write()

console.log(result)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))