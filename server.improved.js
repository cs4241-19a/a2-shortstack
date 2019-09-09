const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let d = new Date();
let date = d.toString().slice(4, 15);

let appdata = [
   {'name': 'Winny Bunny', 'title': 'S your tsuff', 'message': 'hi yall', 'date': date},
   {'name': 'jjj', 'title': 'jejhfbj', 'message': 'kefnek', 'date': date},
   {'name': 'kkk', 'title': 'jejf', 'message': 'kefn2k4', 'date': date}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/reqdata') {
        sendData(response, appdata)
    } else if (request.url === '/single-post.html') {
      sendFile( response, 'public/single-post.html' )
}
  else{
    sendFile( response, filename )
  }
}

const handlePost = function (request, response) {
    let dataString = ''

    request.on('data', function (data) {
        dataString += data
    })

    request.on('end', function () {

            const data = JSON.parse(dataString)

            switch (request.url) {

                case '/publish':
                    
                    const newData = {
                        'name': data.name,
                        'title': data.title,
                        'message': data.message,
                        'date': data.date
                    }

                    appdata.push(newData)

                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
                    response.end()
                    break
                

                case '/delete':
                    appdata.splice(data.rowData, 1)
                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
                    response.end()
                    break

                case '/edit':
                    let index = data.index
                    appdata[index].name = data.name
                    appdata[index].title = data.title
                    appdata[index].message = data.message
                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
                    response.end()
                    break

                default:
                    response.end('404 Error: File Not Found')
            }


        }
    )
}

const sendData = function (response, reqdata) {
    response.end(JSON.stringify(reqdata));
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