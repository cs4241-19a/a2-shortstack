const bodyParser = require('body-parser'),
      express = require('express'),
      app = express(),
      path = require('path'),
      port = process.env.PORT || 3000;

var money = 0;
var imageOrders = [];
var orders = [];
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
app.post('/reset', function(req, res) {
  money = Number(req.body.amount);
  imageOrders = [];
  orders = [];
  res.send({result: money});
})
app.post('/neworder', function(req, res) {
  imageOrders.push(req.body.img);
  orders.push(req.body.order);
  res.send({images: imageOrders, orders: orders});
})
app.post('/remove', function(req, res) {
  var id = req.body.id;
  imageOrders.forEach(function(element) {
    if(element.includes(id)){
      var index = imageOrders.indexOf(element);
      imageOrders.splice(index, 1);
    }
  });
  orders.forEach(function(element) {
    if(element.includes(id)){
      var index = orders.indexOf(element);
      orders.splice(index, 1);
    }
  });
  res.send({images: imageOrders, orders: orders});
})

app.listen(port)
