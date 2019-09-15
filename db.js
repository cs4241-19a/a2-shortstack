const path = require('path');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')

const passport = require('passport');
const authService = require('./info/authentication');
authService.configurePassport(passport)

const router = require('express').Router();

const db = low(adapter)

router.get('/', function(req, res) {
  res.render('index')
})
// display all books
router.get('/books', function(req, res) {
  var books = db.get('books').value()
  var authors = db.get('authors').value()

  res.render('books', { books: books, authors: authors })
})


module.exports = router;