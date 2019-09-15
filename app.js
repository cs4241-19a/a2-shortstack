const express = require('express')
const app = express()
const port = 3000

const passport = require('passport');
const authService = require('./info/authentication');
authService.configurePassport(passport)

var db = require('./db');

//app.set('view engine', 'ejs');

// intialize passport
app.use(passport.initialize());
// use express.session() before passport.session()
app.use(passport.session());


// routes
app.use('/', db);

app.get('/', (req, res) => 
        res.json({ error: err })
       )


app.listen(port, () => console.log(`Example app listening on port ${port}!`))