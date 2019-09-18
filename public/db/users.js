let   low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter)

db.defaults({users:[]}).write()
//db.get('users').remove().write()
console.log(db.get('users').value())
if(db.get('users').size().value() < 1)
  {
    db.get('users').push({id: 1, username: 'jack', password: 'secret', data:[]}).write()
  }

console.log(db.get('users').size().value())


exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (db.get('users').value()[idx]) {
      cb(null, db.get('users').value()[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}


exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = db.get('users').map('username').value().length; i < len; i++) {
      var record = db.get('users').value()[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
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
 // console.log("user id is ", user.id)
  
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
  
 // console.log("update is ", update)
  
  update.push(json)
  
  
  //console.log("update is now ", update)
  
  db.get('users').find({id: user.id}).assign({data:update}).write()
}


exports.deleteData = function(user, info)
{
   let newData = []
   let appdata = db.get('users').find({id: user.id}).get('data').value()
   
   appdata.forEach(function(item){
    
    newData.push({name: item.name, year: item.year, inches: item.inches, cm: (item.inches * 2.54)})
  })
  
  while(newData.length !== appdata.length)
    {
      newData.shift()
    }
  
  console.log("Post newData is ")
  console.log(newData)
  console.log(appdata)
  
  db.get('users').find({id: user.id}).assign({data:newData}).write()
}