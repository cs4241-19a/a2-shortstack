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

app.use(express.static('public'));
app.use(bodyParser.json());

//DATABASE
db.defaults({ users: [] }).write();






app.use(passport.initialize());
app.use(passport.session());







// intialize passport
app.use(passport.initialize());
// use express.session() before passport.session()
app.use(passport.session());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

