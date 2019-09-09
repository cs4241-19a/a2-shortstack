const http = require( 'http' ),
      fs   = require( 'fs' ),
     
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
    handlePost( request, response ) 
  }
})

let data = {
  "data": [
    [
      "1",
      "Tiger Nixon",
      "Ball St",
      "Pancakes",
      "Syrup",
      "Make it quick",
      "Hello Tiger Nixon, your order of pancakes will be ready in exactly 30 seconds."
    ],
    [
      "2",
      "Garrett Winters",
      "100 Insitute Rd",
      "Waffles",
      "Butter",
      "Speed",
      "Hello Garrett Winters, your order of Waffles will be ready in exactly 30 seconds."
    ]
    ]
};

let idCounter = 3;

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url.includes('fullOrders.json')){
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(data));
    response.end();
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    
    // add row into the table 
    if(request.url.includes("submit")){
        let clientData = Object.values(JSON.parse(dataString));
      
        // server side processing
        let message = "Hello "+  clientData[0] + ", your order of " + clientData[2] + " will be ready in exactly 30 seconds."
        clientData[5] = message
        clientData.unshift(idCounter.toString())
        idCounter += 1;

        data['data'].push(clientData);
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
    }
    else if(request.url.includes("delete")){
       let clientData = Object.values(JSON.parse(dataString));

        let newData = [];
        for(var i = 0; i < data['data'].length; i++) {
          var serverName = data['data'][i][0]; 
          if (!(clientData[0] === serverName)){
             newData.push(data['data'][i])       
          }
        }
        data['data'] = newData;
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
    }
    else if(request.url.includes("modify")){
            let clientData = Object.values(JSON.parse(dataString));

        let newData = [];
        for(var i = 0; i < data['data'].length; i++) {
          var serverName = data['data'][i][0]; 
          if (!(clientData[0] === serverName)){
             newData.push(data['data'][i])       
          }
          else{
            try {
            let newEntry = data['data'][i]
            switch(clientData[1]) {
              case "nam":
                newEntry[1] = clientData[2]
                newData.push(newEntry)
              break;
              case "add":
                newEntry[2] = clientData[2]
                newData.push(newEntry)
              break;
              case "ord":
                newEntry[3] = clientData[2]
                newData.push(newEntry)
              break;
              case "con":
                newEntry[4] = clientData[2]
                newData.push(newEntry)
              break;
              case "inf":
                newEntry[5] = clientData[2]
                newData.push(newEntry)
              break;
              case "mes":
                newEntry[6] = clientData[2]
                newData.push(newEntry)
              break;
              }
            }
            catch (e){
              newData.push(data['data'][i]) 
            }
          }
        }
        data['data'] = newData;
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
    }
    else {
         response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()
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

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )

server.listen( process.env.PORT || port )
