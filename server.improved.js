const bodyParser = require('body-parser'),
      express = require('express'),
      app = express(),
      path = require('path'),
      port = process.env.PORT || 3000;

let money = 0;
let imageOrders = [];
let orders = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/', function(req, res) {
  res.redirect('/home');
})
app.get('/home', function(req, res) {
  let thepath = path.normalize(__dirname + '/public/html/home.html');
  res.sendFile(thepath);
})
app.get('/instructions', function(req, res) {
  let thepath = path.normalize(__dirname + '/public/html/instructions.html');
  res.sendFile(thepath);
})
app.get('/game', function(req, res) {
  let thepath = path.normalize(__dirname + '/public/html/game.html');
  res.sendFile(thepath);
})
app.get('/scoreboard', function(req, res) {
  let thepath = path.normalize(__dirname + '/public/html/scoreboard.html');
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
  let id = req.body.id;
  imageOrders.forEach(function(element) {
    if(element.includes(id)){
      let index = imageOrders.indexOf(element);
      imageOrders.splice(index, 1);
    }
  });
  orders.forEach(function(element) {
    if(element.includes(id)){
      let index = orders.indexOf(element);
      orders.splice(index, 1);
    }
  });
  res.send({images: imageOrders, orders: orders});
})

app.listen(port)
