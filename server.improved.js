const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    if (request.url === '/submit'){
      handlePost( request, response ) 
    }
    else if (request.url === "/edit"){
      handleEdit(request, response)
    }
    else if(request.url === '/deleteAll'){
      handleDeleteAll(request, response);
    }
    else{
      handleDelete(request, response);
    }
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === '/getAll.json'){
    getData(response);
  }
  else{
    sendFile( response, filename )
  }
}
const handleDeleteAll = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    fs.readFile( "public/data.json", function( err, content ) {


     // if the error = null, then we've loaded the file successfully
     if( err === null ) {       
       const fs = require('fs') 
       fs.writeFile('public/data.json', "[]", (err) => { 
         if (err) throw err; 
       }) 
       
      
       
       response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
       response.end()

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })

    
  })
}
const handleDelete = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    fs.readFile( "public/data.json", function( err, content ) {


     // if the error = null, then we've loaded the file successfully
     if( err === null ) {
       let index = JSON.parse(dataString).delete;
       console.log(dataString);
       let data = JSON.parse(content);
       data.splice(index, 1);
       

       
       
       const fs = require('fs') 
       fs.writeFile('public/data.json', JSON.stringify(data), (err) => { 
         if (err) throw err; 
       }) 
       
      
       
       response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
       response.end()

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })

    
  })
}

const handleEdit = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    fs.readFile( "public/data.json", function( err, content ) {


     // if the error = null, then we've loaded the file successfully
     if( err === null ) {
       let age = calculateAge(new Date(JSON.parse(dataString).date));
       let newData = JSON.parse(dataString);
       newData.age = age;
       let newerData = {name: newData.name, date: newData.date, food: newData.food, age : newData.age};
       let data = JSON.parse(content);
       console.log(JSON.stringify(data));
       data[newData.index] = newerData;
       console.log(JSON.stringify(data));
       

       
       
       const fs = require('fs') 
       fs.writeFile('public/data.json', JSON.stringify(data), (err) => { 
         if (err) throw err; 
       }) 
       
      
       
       response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
       response.end()

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })

    
  })
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    fs.readFile( "public/data.json", function( err, content ) {


     // if the error = null, then we've loaded the file successfully
     if( err === null ) {
       let age = calculateAge(new Date(JSON.parse(dataString).date));
       let newData = JSON.parse(dataString);
       newData.age = age;
       let data = JSON.parse(content);
       console.log(JSON.stringify(data));
       data.push(newData);
       console.log(JSON.stringify(data));
       

       
       
       const fs = require('fs') 
       fs.writeFile('public/data.json', JSON.stringify(data), (err) => { 
         if (err) throw err; 
       }) 
       
      
       
       response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
       response.end()

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })

    
  })
}
 function calculateAge(birthday) {
   var ageDifMs = Date.now() - birthday.getTime();
   var ageDate = new Date(ageDifMs); 
   return ageDate.getUTCFullYear() - 1970;
 }

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

const getData = function ( response ) {
   const type = mime.getType( "public/data.json" ) 

   fs.readFile( "public/data.json", function( err, content ) {
     let i = 0;


     // if the error = null, then we've loaded the file successfully
     if( err === null ) {
       let res = "<table id='table'><tr><th>name</th><th>birthday</th><th>favorite food</th><th>age</th><th>delete entry</th><th>edit</th></tr>";
       const data = JSON.parse(content);
      data.forEach(function(d) {
        res += "<tr><td class= 'name'>" + d.name + "</td><td class = 'date'>" + d.date + "</td><td class = 'food'>" + d.food + "</td><td class = 'age'>" + d.age + "</td> <td> <button  onclick='del(" + i + ")''>delete</button></td> <td> <button  onclick='edit(" + i + ")''>edit</button></td></tr>";
        i++;
      });
       res += "</table>";

       // status code: https://httpstatuses.com
       response.writeHead(200, {"Content-Type": "text/html"});
       response.end( res )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
