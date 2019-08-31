const http = require( 'http' ),
      fs   = require( 'fs' ),
      bodyParser = require('body-parser'),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      express = require('express'),
      app = express(),
      port = process.env.PORT || 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14}
]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/css", express.static(__dirname + '/public/css'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})
app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})
app.post('/submit', function(req, res) {
  console.log(req);
})

app.listen(port)
