const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//var User = require('./models/user')

const low = require('lowdb')
//const FileAsync = require('lowdb/adapters/FileAsync')
//const adapter = new FileAsync('db.json')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)




app.use(express.static('public'))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());



db.defaults({ users: [] })
  .write()

// Data is automatically saved to localStorage
db.get('users')
  .push({ username: 'pllopez' , password: '1234'})
  .write()



app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

/*
//database
low(adapter)
  .then(db => {
    // Routes
    // GET /posts/:id
    app.get('/posts/:id', (req, res) => {
      const post = db.get('posts')
        .find({ id: req.params.id })
        .value()

      res.send(post)
    })

    // POST /posts
    app.post('/posts', (req, res) => {
      db.get('posts')
        .push(req.body)
        .last()
        .assign({ id: Date.now().toString() })
        .write()
        .then(post => res.send(post))
    })

    // Set db default values
    return db.defaults({ posts: [] }).write()
  })
*/

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




app.listen(port, () => console.log(`Example app listening on port ${port}!`))