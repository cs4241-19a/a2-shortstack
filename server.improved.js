const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

const appdata = [
  '{"studentName": "John Doe", "numericGrade": 87, "letterGrade": "B" }',
  '{"studentName": "A. N. Example", "numericGrade": 71, "letterGrade": "C" }'
//  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
//  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    console.log("here");
    handleGet( request, response );
  } else if (request.method === 'DELETE') {
    handleDelete( request, response );
  } else if( request.method === 'POST' ){
    handlePost( request, response ); 
  } else {
    
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
    let resp;
    let data = JSON.parse( dataString );
    let found = false;
    for (let i = 0; i < appdata.length; i++) {
      let parsedResult = JSON.parse(appdata[i]);
      console.log(parsedResult.studentName);
      if (parsedResult.studentName === data.removeName) {
          found = true;
          appdata.splice(i, 1);
          i = appdata.length;
      }
    }
    resp = '{"removed":"'+ found + '"}';
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end(resp, 'utf-8');
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

    //submit request
    // adds user to the system with a letter grade
    console.log( data.yourname );
    console.log( data.yourgrade );
    if (request.url === '/view') {
      resp = '{"studentArray": ['+ appdata + ']}';
      console.log(resp);
    } else {
      let letter = alphaFunc(data.yourgrade);
      let found = false;
      for (let i = 0; i < appdata.length; i++) {
        let parsedResult = JSON.parse(appdata[i]);
        console.log("found: " + parsedResult.studentName);
        if (parsedResult.studentName === data.yourname) {
            found = true;
            appdata[i] = '{"letterGrade":"'+ letter + '",';
            appdata[i] += '"studentName":"' + data.yourname + '", ';
            appdata[i] += '"numericGrade":"' + data.yourgrade + '"}';
            //parsedResult.letterGrade = letter;
            //parsedResult.numericGrade = data.yourgrade;
            i = appdata.length;
        }
      }
      // if appdata doesn't have this student yet, add it in
      resp = '{"letterGrade":"'+ letter + '",';
      resp += '"studentName":"' + data.yourname + '", ';
      if (found) { // if appdata already has this student, update their grade
        resp += '"modified":true,';
        resp += '"numericGrade":"' + data.yourgrade + '"}';
      } else {
        let storedResp = resp;
        resp += '"modified":false,';
        resp += '"numericGrade":"' + data.yourgrade + '"}';
        storedResp += '"numericGrade":"' + data.yourgrade + '"}';
        appdata.push(storedResp); //store the data in the array if new
      }
    }
    //console.log(resp);
    console.log(appdata);
    // Send the appropriate response
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.end(resp, 'utf-8');
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

     } else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

const alphaFunc = function (grade) {
  //grade = valueOf(grade);
    // get the letter for a student's grade
    let letter;
    if (grade >= 90) {
      letter = 'A';
    } else if (grade >= 80) {
      letter = 'B';
    } else if (grade >= 70) {
      letter = 'C';
    } else if (grade >= 60) {
      letter = 'D';
    } else if (grade > -1 && grade !== '') {
      letter = 'F';
    } else {
      letter = 'N/A';
    }
  return letter;
}

server.listen( process.env.PORT || port )
