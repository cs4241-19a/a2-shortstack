const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000,
      Express = require('express'),
      express = Express(),
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize')

var dbSeq;

express.use(bodyParser.urlencoded());
express.use(bodyParser.json());
express.use(Express.static('public'));

const appdata = [
  { 'rank': 'Boatswain', name: "Edgar", 'year': 1987, rankID: 4},
  { 'rank': 'Sailor', name: "John John", 'year': 1999, rankID: 9},
  { 'rank': 'Cabin Boy', name: "Big Eyes", 'year': 2004, rankID: 10}
]


var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'sqlite',
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: './database.sqlite'
});

sequelize.authenticate()
  .then(function(err) {
    dbSeq = sequelize.define('data', {
      rank: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      rankID: {
        type: Sequelize.INTEGER
      }
      
    });
    
    initialSetup()
  })
  .catch(function (err) {
    console.log('Unable to connect database: ', err);
  });

function initialSetup(){
  dbSeq.sync({force: true})
    .then(function(){
      for(var i=0; i<appdata.length; i++){ 
        addData(appdata[i])
      }
    });  
}

express.get("/", function (request, response) {
   sendFile( response, '/index.html' )
});

express.get("/data", function (request, response) {
  var dbSend = []
  dbSeq.findAll().then(function(data) {
    data.forEach(function(member) {
      dbSend.push([member.rank, member.name, member.year, member.age, member.rankID])
    })
    
    dbSend.sort(function(a,b) {
      console.log(a[4] - b[4])
      return a[4] - b[4]
    })
    
    console.log(dbSend)
    response.send(dbSend)
  })
});

express.get("/reset", function(request,response){
  dbSeq.destroy({where: {}});
  initialSetup()
  response.redirect("/");
})

express.get("/clear", function(request,response){
  dbSeq.destroy({where: {}});
  response.redirect("/");
})

express.post("/data", function (request, response) {
  console.log(request.body)
  
  addData(request.body)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
});

express.post("/delete", function (request, response) {
  deleteEntry(request.body) 
})

express.post("/modify", function (request, response) {
  deleteEntry(request.body)
  addData(request.body)
})


const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

const deleteEntry = function(newData){
  console.log( newData.name + " is being destroyed" )
  
  var id = getID(newData);
  
  dbSeq.destroy({where: {id: id}})
  
    console.log('Successfully destroyed ' +id+ ' ' + newData.rank + ' ' +newData.name + ' ' + newData.year +' from database');
}

const addData = function(newData){
  console.log(newData)
  console.log( newData.rank + ' '+ newData.name + " has been received " + newData.rankID )
  
  var id = getID(newData);
  var age = (2019 - parseInt(newData.year))
  var ageString = age + " Year(s) Old"
  dbSeq.create({ id:id, rank: newData.rank, name: newData.name, year: newData.year, age: ageString, rankID: parseInt(newData.rankID)}); 
  console.log('Successfully added ' +id+ ' ' + newData.rank + ' ' +newData.name + ' ' + newData.year +' '+ageString+' ' +newData.rankID+' to database');
}

 function getID(newData){
  var id = 0;
  for(var i=0;i<newData.name.length;i++) {
        id += (newData.name.charCodeAt(i) + i) + (newData.name.charCodeAt(i) * i);
    }
  id = parseInt(id, 16);
   return id
 }

var listener = express.listen(process.env.PORT, function () {
  console.log('Listening to port ' + listener.address().port);
});

