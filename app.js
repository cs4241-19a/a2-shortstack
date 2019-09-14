var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

// database information
var db = low('db.json')

db.defaults({ posts: [], user: {} })
  .value()

db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome'})
  .value()

db.set('user.name', 'typicode')
  .value()


// password information
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.sendFile('index.html', { root : 'public'}));

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//app.listen(port , () => console.log('App listening on port ' + port));
