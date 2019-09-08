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
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
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
      model: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      mpg: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
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
    data.forEach(function(car) {
      dbSend.push([car.model, car.year, car.mpg, car.age])
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
  console.log( newData.model + " is being destroyed" )
  
    var id = 0;
    for(var i=0;i<newData.model.length;i++) {
        id += (newData.model.charCodeAt(i) * i) + (newData.model.charCodeAt(i) + i);
    }
  id = parseInt(id, 16);
  
  dbSeq.destroy({where: {id: id}})
  
    console.log('Successfully destroyed ' +id+ ' ' + newData.model + ' ' +newData.year + ' ' + newData.mpg +' from database');
}

const addData = function(newData){
  
  console.log( newData.model + " has been received" )
  
    var id = 0;
    for(var i=0;i<newData.model.length;i++) {
        id += (newData.model.charCodeAt(i) * i) + (newData.model.charCodeAt(i) + i);
    }
  id = parseInt(id, 16);
  var age = (2019 - parseInt(newData.year))
  var ageString = age + " Year(s) Old"
  dbSeq.create({ id:id, model: newData.model, year: newData.year, mpg: newData.mpg, age: ageString}); 
  console.log('Successfully added ' +id+ ' ' + newData.model + ' ' +newData.year + ' ' + newData.mpg +' '+ageString+ ' to database');
}


var listener = express.listen(process.env.PORT, function () {
  console.log('Listening to port ' + listener.address().port);
});
