const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [ 
  {id: 0, username: "tRits",  password: "password" ,  ssn : "123456789", admin: false, dateAdded: '1991-8-21'},
  {id: 1, username: "n0Passw0rdMan123",  password: "password123" ,  ssn : "987654321", admin: false, dateAdded: '2000-2-24'}
];

let wasLastAnAdmin = false;

let resultsPage = null;
fs.readFile('public/results.html', function(err, content){
  resultsPage = content;
})

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

function buildPage(){
  let toReturn = resultsPage;
  if (wasLastAnAdmin === true){
    appdata.forEach(function(item){
      toReturn += `<tr id = '${item.id}'>
      <th>${item.username}</th>
      <th>${item.password}</th>
      <th class = "hidden">HIDDEN</th>
      <th>${item.admin}</th>
      <th>${item.dateAdded}</th>
      <th><button id = '${item.id}-button' onclick="deleteItem(${item.id})">Delete</button></th>
      </tr>`
    });
  } else {
    appdata.forEach(function(item, idx){
      toReturn += `<tr id = '${item.id}'>
      <th>${item.username}</th>
      <th class = "hidden">HIDDEN</th>
      <th class = "hidden">HIDDEN</th>
      <th>${item.admin}</th>
      <th>${item.dateAdded}</th>
      <th><button id = '${item.id}-button' onclick="deleteItem(${item.id})">Delete</button></th>
      </tr>`
    });
  }

  toReturn += "</table></body>";
  toReturn += ` <script>
  function deleteItem(item){
    let item = document.getElementById(item);
    item.remove();
  }
  </script>`
  toReturn += "</html>"
  return toReturn;
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' );
  }else if (request.url === '/users'){
    response.writeHeader( 200, { 'Content-Type': 'text/html' })
    response.end( buildPage() )
  }else if (request.url === '/style.css') {
    sendFile( response, 'public/css/style.css');
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let data = JSON.parse(dataString);
    wasLastAnAdmin = data.admin;
    let dateAdded = new Date();
    dateAdded =  `${dateAdded.getFullYear()}-${dateAdded.getMonth()}-${dateAdded.getDate()}-${dateAdded.getHours()}-${dateAdded.getMinutes()}`;
    data.dateAdded = dateAdded;
    data.id = appdata[appdata.length - 1].id + 1;
    console.log(data.id);
    appdata.push(data);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end();
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

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
