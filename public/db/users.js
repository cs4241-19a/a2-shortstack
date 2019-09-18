let   low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter)

db.defaults({users:[]}).write()
console.log(db.get('users').value())
if(db.get('users').size().value() < 1)
  {
    db.get('users').push({id: 1, username: 'jack', password: 'secret'}).write()
  }
var records = [
    { id: 1, username: 'jack', password: 'secret'  }
  , { id: 2, username: 'jill', password: 'birthday' }
];

console.log(db.get('users').size().value())
exports.findById = function(id, cb) {
  process.nextTick(function() {
    let ids = db.get('users').map('id').value()
    var idx = id - 1;
    if (ids[idx]) {
      cb(null, ids[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    let size = db.get('users').map('username').value().length
    for (var i = 0, len = size; i < len; i++) {
      let names = db.get('users').map('username').value(),
          password = db.get('users').map('password').value()
          //taken = names.includes(username)
      let record = names[i],
          pass = password[i]
      console.log(record)
      console.log(username)
      if (record === username) {
        return cb(null, record,pass);
      }
    }
    return cb(null, null);
  });
}

exports.findOldUsername = function(username, password, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, null);
      }
    }
    let json = {id: records.length + 1, username: username, passowrd: password}
    records.push(json)
    return cb(null, null);
  });
}

exports.newUser = function(username, password)
{
  let newUser = {id: db.get('users').size().value() + 1, username: username, password: password, data:[] }
  db.get('users').push(newUser).write()
  return newUser
}