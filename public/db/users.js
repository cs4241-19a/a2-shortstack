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
  db.get('users').find({id})
}