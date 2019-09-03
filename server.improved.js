const bodyParser = require('body-parser'),
      express = require('express'),
      app = express(),
      path = require('path'),
      port = process.env.PORT || 3000;

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14}
]
var money = 0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/', function(req, res) {
  res.redirect('/home');
})
app.get('/home', function(req, res) {
  var thepath = path.normalize(__dirname + '/public/html/home.html');
  res.sendFile(thepath);
})
app.get('/instructions', function(req, res) {
  var thepath = path.normalize(__dirname + '/public/html/instructions.html');
  res.sendFile(thepath);
})
app.get('/game', function(req, res) {
  var thepath = path.normalize(__dirname + '/public/html/game.html');
  res.sendFile(thepath);
})
app.post('/updateBank', function(req, res) {
  money += Number(req.body.amount);
  res.send({result: money});
})

app.listen(port)
