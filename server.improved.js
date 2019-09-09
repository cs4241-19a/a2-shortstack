const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

const sqlite3 = require('sqlite3').verbose();
 
// Open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

const alphaFunc = function (grade) {
    // Get the letter for a student's grade
    let letter;
    if (grade >= 90) {
      letter = "A";
    } else if (grade >= 80) {
      letter = "B";
    } else if (grade >= 70) {
      letter = "C";
    } else if (grade >= 60) {
      letter = "D";
    } else if (grade > -1 && grade !== '') {
      letter = "F";
    } else {
      letter = "N/A";
    }
  return letter;
}

db.serialize(function(){
    db.run('CREATE TABLE Grades (name TEXT PRIMARY KEY, number TEXT NOT NULL, letter TEXT NOT NULL);');
    console.log('New table Grades created!');
    
    // Insert default grades
    db.serialize(function() {
      db.run('INSERT INTO Grades (name, number, letter) VALUES ("John Doe","87","B")');
      db.run('INSERT INTO Grades (name, number, letter) VALUES ("Allen Example","75","C")');
    });

    console.log('Database "Grades" ready to go!');
    db.each('SELECT * from Grades', function(err, row) {
      if ( row ) {
        console.log('Initial Student:', row);
      }
    });
});

const dbAddFunc = function(name, number, letter) {
  db.run('INSERT INTO Grades (name, number, letter) VALUES ("' + name + '","' + number + '","' + letter + '")');
}

const dbLookup = function(name) {
  let sql = 'SELECT * FROM Grades WHERE name = ?';
  db.get(sql, name, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(row + "party");
    return JSON.stringify(row);
  });
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response );
  } else if (request.method === 'DELETE') {
    handleDelete( request, response );
  } else if( request.method === 'POST' ){
    handlePost( request, response ); 
  } else { //no requests should get here
    console.log("This type of request has not been handled yet");
  }
})

const handleGet = function( request, response ) {  
  const filename = dir + request.url.slice( 1 ); 
  console.log(request.url);
  if ( request.url === '/' ) {
    sendFile( response, 'public/index.html' );
  } else {
    sendFile( response, filename );
  }
}

const handleDelete = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data; 
  })

  request.on( 'end', function() {
    let data = JSON.parse( dataString );
  db.run('DELETE FROM Grades WHERE name=?', data.removeName, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end('{"removed": "done"}', 'utf-8');
  });
  })
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data; 
  })

  request.on( 'end', function() {
    let resp;
    let data = JSON.parse( dataString );
    console.log( data );

    // view request
    // Returns the full table from the db
    if (request.url === '/view') {
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      db.all('SELECT * from Grades ORDER BY name ASC', function(err, rows) {
        resp = '{"studentArray": '+ JSON.stringify(rows) + '}';
        
        console.log(resp);
        response.end(resp, 'utf-8');
      });
    } else {
      // submit request
      // Adds a new student to the db, or updates their grades
      // First delete the student if they're already in the database
      let letter = alphaFunc(data.yourgrade);
        db.run('DELETE FROM Grades WHERE name=?', data.yourname, function(err) {
        if (err) {
          return console.error(err.message);
        }
      });
      // Add in the student with the data provided
      dbAddFunc(data.yourname, data.yourgrade, letter);
      
      resp = '{"letterGrade":"'+ letter + '",';
      resp += '"studentName":"' + data.yourname + '", ';
      resp += '"numericGrade":"' + data.yourgrade + '"}';
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end(resp, 'utf-8');
    }
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     } else {

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )

