const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const song_list = [
  {name:'root',
   items:[
     {
       'songName':'bye bye bye',
       'artist': 'nsync',
       'newLength': '3.5',
       'picture': 'https://www.rollingstone.com/wp-content/uploads/2019/04/nsync-lead.jpg?resize=900,600&w=440',
       'video':'https://www.youtube.com/watch?v=Eo-KmOd3i7s',
       'id':'0',
     },
     {
      'songName':'Another one bites the Dust',
      'artist': 'Queen',
      'newLength': '4',
      'picture': 'https://www.rollingstone.com/wp-content/uploads/2019/04/nsync-lead.jpg?resize=900,600&w=440',
      'video':'https://www.youtube.com/watch?v=Eo-KmOd3i7s',
      'id':'1',
    },
   ]
   
   },
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } 
})

const handleGet = function( request, response ) {
  switch( request.url ) {
    case '/':
      sendFile( response, 'public/index.html' )
      break
    case '/index.html':
      sendFile( response, 'public/index.html' )
      break
    case '/style.css':
      sendFile( response, 'public/css/style.css')
      break
    case '/scripts.js':
      sendFile( response, 'public/js/scripts.js')
      break
    default:
      response.end( '404 Error: File Not Found' )
  } 
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })
    
  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    //This is where you add the code
        
    switch(request.url) { 
      case '/displayTable': 
        const data = song_list[0]
        addTo_Table(response, data)
        break

      case '/addSong': 
        const taskData = JSON.parse(dataString)
        const song = taskData.task
        const taskId = addId(song)
        song_list[0].items.push(song)
        break

      case '/deleteSong': 
        const delete_Data = JSON.parse(dataString)
        const ID = delete_Data.id 
        const deleteThis = deleteSong(ID)
        break 
      default: 
        response.end( '404 Error: File Not Found' )
    }
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
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

// Delete the song from the master list
function deleteSong(id){ 
  song_list[0].items = song_list[0].items.filter(function(x){ 
     return x.id != id 
  })
}

const addTo_Table = function(response, json) { 
  const type = mime.getType(json) 
  console.log(JSON.stringify(json))
  response.writeHeader(200, {'Content-Type': type })
  response.end(JSON.stringify(json))
}

// Each song will have an ID associated with it to keep track of
let ID = 2
function addId(song){ 
  song.id = ID
  ID = ID + 1
}

//This is where it ends

server.listen( process.env.PORT || port )