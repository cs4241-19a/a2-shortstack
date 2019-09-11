const bodyParser = require('body-parser'),
      express = require('express'),
      app = express(),
      path = require('path'),
      favicon = require('serve-favicon'),
      port = process.env.PORT || 3000;

let money = 0;
speed = 0;
let imageOrders = [];
let orders = [];
let entries = ["<tr><td>Name</td><td>Score</td></tr>"];
app.use(favicon(path.join(__dirname,'public','assets','favicon.ico')));
app.use(bodyParser.json());
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
  let move = req.body.move;
  let kind = "";
  if(imageOrders[0].includes('vanilla')){
    if(move === 49){
      kind = "VN";
      imageOrders.splice(0, 1);
      orders.splice(0, 1);
    }
    else{
      kind = "WK";
    }
  }
  else if(imageOrders[0].includes('chocolate')){
    if(move === 50){
      kind = "CH";
      imageOrders.splice(0, 1);
      orders.splice(0, 1);
    }
    else{
      kind = "WK";
    }
  }
  else if(imageOrders[0].includes('strawberry')){
    if(move === 51){
      kind = "ST";
      imageOrders.splice(0, 1);
      orders.splice(0, 1);
    }
    else{
      kind = "WK";
    }
  }
  else if(imageOrders[0].includes('cookie')){
    if(move === 52){
      kind = "CD";
      imageOrders.splice(0, 1);
      orders.splice(0, 1);
    }
    else{
      kind = "WK";
    }
  }
  res.send({images: imageOrders, orders: orders, kind: kind});
})
app.post('/submit', function(req, res) {
  entries.push(req.body.entry);
})
app.post('/spendSpeed', function(req, res) {
  speed = req.body.speed;
})
app.get('/getSpeed', function(req, res) {
  res.send({speed: speed});
})
app.get('/loadscores', function(req, res) {
  res.send({result: entries});
})

app.listen(port)
