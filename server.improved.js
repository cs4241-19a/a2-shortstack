const bodyParser = require('body-parser'),
      express = require('express'),
      app = express(),
      path = require('path'),
      passport = require('passport'),
      favicon = require('serve-favicon'),
      serveStatic = require('serve-static'),
      jwt = require('jsonwebtoken'),
      passportJWT = require('passport-jwt'),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('.data/db.json'),
      db = low(adapter),
      port = process.env.PORT || 3000;
db.defaults({accounts: [{username: "admin", password: "admin"}],
entries: [], secretkey: "kenslittlesupersecretsecret"})
.write()
let ExtractJwt = passportJWT.ExtractJwt,
  JwtStrategy = passportJWT.Strategy,
  Users = db.get('accounts').value(),
  Entries = db.get('entries').value(),
  jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = db.get('secretkey').value();

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
  let user = Users.find(function(element) {
    return (element.username === jwt_payload.username && element.password === jwt_payload.password)
  })
  if(user){
    next(null, user)
  } else {
    next(null, false)
  }
})
passport.use(strategy)


let money = 0,
  speed = 0,
  thetoken = "",
  imageOrders = [],
  orders = [];
app.use(favicon(path.join(__dirname,'public','assets','favicon.ico')))
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(serveStatic('public', { 'index': false}))

app.get('/', function(req, res) {
  res.redirect('/home')
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
    }else{
      kind = "WK";
    }
  }else if(imageOrders[0].includes('chocolate')){
    if(move === 50){
      kind = "CH";
      imageOrders.splice(0, 1);
      orders.splice(0, 1);
    }else{
      kind = "WK";
    }
  }else if(imageOrders[0].includes('strawberry')){
    if(move === 51){
      kind = "ST";
      imageOrders.splice(0, 1);
      orders.splice(0, 1);
    }else{
      kind = "WK";
    }
  }else if(imageOrders[0].includes('cookie')){
    if(move === 52){
      kind = "CD";
      imageOrders.splice(0, 1);
      orders.splice(0, 1);
    }else{
      kind = "WK";
    }
  }
  res.send({images: imageOrders, orders: orders, kind: kind});
})
app.post('/submit', function(req, res) {
  db.get('entries')
  .push(req.body.entry)
  .write()
})
app.post('/spendSpeed', function(req, res) {
  speed = req.body.speed;
})
app.get('/getSpeed', function(req, res) {
  res.send({speed: speed});
})
app.get('/loadscores', function(req, res) {
  res.send({result: db.get('entries')});
})
app.post('/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let user = Users.find(function(element) {
    return (element.username === username)
  });
  if(!user){
    res.status(401).json({message:'no user'})
  }
  if(user.password === password){
    let payload = {username: username, password: password},
        token = jwt.sign(payload, jwtOptions.secretOrKey)
    thetoken = 'Bearer '+token
    res.end();
  } else{
    res.status(401).json({message: 'password is incorrect'})
  }
})
app.get('/token', function(req, res) {
  res.send({token: thetoken})
})
app.get('/erasetoken', function(req, res) {
  thetoken = "";
})
app.post('/modifyentry', passport.authenticate('jwt', { session: false }), function(req, res) {
  let index = 0;
  let name = req.body.name;
  let newname = req.body.diffname;
  let entry = Entries.find(function(element) {
    return (element.includes(req.body.entry))
  })
  index = Entries.indexOf(entry)
  let newentry = entry.replace(name, newname)
  db.__wrapped__.entries[index] = newentry
  db.write()
  res.redirect('/scoreboard')
})
app.post('/deleteentry', passport.authenticate('jwt', { session: false }), function(req, res) {
  let index = 0;
  let entry = Entries.find(function(element) {
    return (element.includes(req.body.entry))
  })
  index = Entries.indexOf(entry)
  db.__wrapped__.entries.splice(index, 1)
  db.write()
  res.redirect('/scoreboard')
})
app.listen(port)
