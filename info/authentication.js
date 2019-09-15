var low = require('lowdb');
var path = require('path');
var LocalStrategy   = require('passport-local').Strategy;
var passport = require('passport');

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')

var db = low(adapter);

exports.signup = function signup(options, res) {
  // get all values for the username that are in the database
  var usernames = db.get('users').map('username').value()
  // check if username is already taken
  var usernameIsTaken = usernames.includes(options.username)

  // if username is already taken, show error
  if (usernameIsTaken) {
    return res.render(options.signUpTemplate, {errors: ['This username is already taken']})

  // else create user
  } else {
    // save new user to database
    db.get('users')
      .push({
        username: options.username,
        password: options.password
      })
      .write()

    // redirect
    res.redirect(options.successRedirectUrl)
  }
}

// configure passport
exports.configurePassport = function(passport) {
  // Passport serializes and deserializes user instances to and from the session.

  // only the user ID is serialized and added to the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // for every request, the id is used to find the user, which will be restored
  // to req.user.
  passport.deserializeUser(function(id, done) {
    // find user in database
    var user = db.get('users').find({id: id}).value()

    if(!user) {
      done({ message: 'Invalid credentials.' }, null);
    } else {
      // the object is what will be available for 'request.user'
      done(null, {id: user.id, username: user.username})
    }
  });

  // configures how to autheticate a user when they log in.

  // LocalStrategy uses username / password in the database for authentication.
  passport.use(new LocalStrategy(
    function(username, password, done) {
      // look for user in database
      var user = db.get('users').find({ username: username }).value()

      // if user not found, return error
      if(!user) {
        return done(null, false, { message: 'Invalid username & password.' });
      }

      // if passowrd don't match, return error
      if(!(password === user.password)) {
        return done(null, false, { message: 'Invalid username & password.' });
      }

      //else, if username and password match, return the user
      return done(null, user)
    }
  ));
}