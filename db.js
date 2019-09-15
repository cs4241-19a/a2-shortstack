const path = require('path');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const low = require('lowdb')

const passport = require('passport');
const authService = require('./services/authService');
authService.configurePassport(passport)

const router = require('express').Router();

const db = low('db.json')

router.get('/', function(req, res) {
  res.render('home')
})

// display all books
router.get('/books', function(req, res) {
  var books = db.get('books').value()
  var authors = db.get('authors').value()

  res.render('books', { books: books, authors: authors })
})


module.exports = router;