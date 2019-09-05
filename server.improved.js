const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const  appdata = [
  { "firstname": "Sheev", "lastname":  "Palpatine", "major": "Emperor", "number": 2 },
  { "firstname": "Obi-Wan", "lastname":  "Kenobi", "major": "Jedi (alumn)", "number": 1 },
  { "firstname": "Luke", "lastname":  "Skywalker", "major": "Jedi", "number": 3 }
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )
  }else if( request.method === "POST" ){
    handlePost( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === "/" ) {
    console.log("dsakfjhasldiufdsakfhj")
    sendFile( response, "public/index.html" )
  } else if (request.url === "/getdata") {
    sendData(response, request)
  }else{
    sendFile( response, filename )
  }
}

const sendData = function(response, request) {
  request.on("end", function() {
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.write(JSON.stringify(appdata))
    response.end()
  })
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data
      console.log("dataString: ", dataString);
  })

  request.on( "end", function() {
    const data = JSON.parse(dataString)

    if(request.url === "/add") {
      let foundName = false
      for(let i = 0; i < appdata.length; i++){
        if(appdata[i].name === data.name) foundName = true;
      }
      if(foundName === false) {
        appdata.push(data)
      }
    }
    console.log( data )
    if(request.url)
    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end()
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename )

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
