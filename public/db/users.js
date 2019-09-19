let   low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter)

db.defaults({users:[]}).write()
//db.get('users').remove().write()
console.log(db.get('users').value())
if(db.get('users').size().value() < 1)
  {
    db.get('users').push({id: 1, username: 'admin', password: 'admin', data:[]}).write()
  }

console.log(db.get('users').size().value())


exports.findById = function(id, done) {
  process.nextTick(function() {
    var idx = id - 1;
    if (db.get('users').value()[idx]) {
      done(null, db.get('users').value()[idx]);
    } else {
      done(new Error('User ' + id + ' does not exist'));
    }
  });
}


exports.findByUsername = function(username, done) {
  process.nextTick(function() {
    for (var i = 0, len = db.get('users').map('username').value().length; i < len; i++) {
      var record = db.get('users').value()[i];
      if (record.username === username) {
        return done(null, record);
      }
    }
    return done(null, null);
  });
}



exports.newUser = function(username, password)
{
  let newUser = {id: db.get('users').size().value() + 1, username: username, password: password, data:[] }
  db.get('users').push(newUser).write()
  return newUser
}

exports.updateData = function(user, info)
{

  
  let update = db.get('users').find({id: user.id}).get('data').value()
  
  let json = { name: info.name, year: info.year, inches: info.inches }
  let index = -1
  let val = info.name
  let filteredObj = update.find(function(item,i){
    if(item.name === val){
      index = i
      return i
    }
  })
  console.log(info.name + "is in position " + index  )
  if(index > -1)
    {
      update.splice(index, 1)
    }
  

  
  update.push(json)
  

  
  db.get('users').find({id: user.id}).assign({data:update}).write()
}


exports.deleteData = function(user, del)
{
 
  let appdata = db.get('users').find({id: user.id}).get('data').value()
  let index = -1
    console.log("val is ", del)
  console.log("appdata is ",appdata)
  let filteredObj = appdata.find(function(item,i){
    if(item.name === del){
      index = i
      return i
    }
  })
  console.log(del + " is in position " + index  )
  if(index > -1)
    {
      appdata.splice(index, 1)
    }
  
  db.get('users').find({id: user.id}).assign({data:appdata}).write()
}