let   low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter)

db.defaults({users:[]}).write()
console.log(db.get('users').size().value())
if(db.get('users').size().value() < 1)
  {
    
  }
var records = [
    { id: 1, username: 'jack', password: 'secret'  }
  , { id: 2, username: 'jill', password: 'birthday' }
];

console.log(records.length)
exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
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