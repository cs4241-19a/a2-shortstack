const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appData = [
  {'date': '04/03/98', 'time': '13:30', 'voltage': 2, 'current': 1 , 'power': 2,'id':1},
  {'date': '12/17/01','time': '13:35', 'voltage': 2.3, 'current': 2, 'power': 9.2,'id':2 },
  {'date': '6/19/12','time': '13:40', 'voltage': 2.5, 'current': 3, 'power': 22.5,'id':3 } 
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }
  else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})


const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data //Sometimes data must be sent in multiple parts, this listens for all parts
  })

  request.on( 'end', function() {
    if (request.url === "/addData") {
      const json = JSON.parse( dataString )  //Outputs an object
      const volt = Number(json.voltage),
            curr = Number(json.current),
            [year, month, day] = json.date.split("/"),
            [hours, minutes, seconds] = json.time.split(":")
      
      let error = ""
      if (volt <=0){ error += "Invalid Voltage value. " }
      if (curr <=0){ error += "Invalid Current value. " }

      if (error !== "" ){
        error += "Data will not be recorded"
        response.writeHead(400, 'OK', {'Content-Type': 'text/plain' })  //Write a reponse back to client
        response.write(error)
        response.end()
      }
      else{
        const power = json.voltage * json.current * json.current
        json.power = power
        let id =0 
        for (let entry of appData){
          console.log
          if (entry.id > id){
            id =entry.id +1
          }
        }
        json["id"]= id
        appData.push(json)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' }) //Write a reponse back to client
        response.write("Data has been recorded")
        response.end()
      }
    }
    
    else if (request.url === "/delData"){
      const json = JSON.parse( dataString )  //Outputs an object

      if (json == false){
        response.writeHead( 401, "OK", {'Content-Type': 'text/plain' }) //Write a reponse back to client
        response.write("Error: No ID given")
        response.end()
      }
      else{
        console.log(json)
        let index = 0
        for (let json of appData){
          console.log(json.id)
          if (json.id == Number(dataString)){
            appData.splice(index, 1)
            console.log("something deleted")
          }
        index++
        }
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' }) //Write a reponse back to client
          response.write("Record(s) with the given Id have been removed")
          response.end()
      }
    }
    
    else if (request.url === "/getData"){
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' }) //Write a reponse back to client
      response.write(JSON.stringify(appData))
      response.end()
    }
    
    else if (request.url === "/modData"){
      const json = JSON.parse( dataString )  //Outputs an object
      const volt = Number(json.voltage),
            curr = Number(json.current),
            date = json.date,
            time = json.time
      
      let error = ""
      if (volt <=0){error += "Invalid Voltage value. "}
      
      if (curr <=0){ error += "Invalid Current value. "}

      if (error !== "" ){
        error += "Data will not be modified"
        response.writeHead(400, 'OK', {'Content-Type': 'text/plain' })  //Write a reponse back to client
        response.write(error)
        response.end()
      }
      else{
        const power = json.voltage * json.current * json.current
        json["power"] = power
        let index = 0
        for (let entry of appData){
          console.log(entry.id)
          console.log(json.id)
          if (entry.id == json.id){
            appData[index].date = date
            appData[index].time = time
            appData[index].voltage = volt
            appData[index].current = curr
            appData[index].power = power
            index ++
          }
        }
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' }) //Write a reponse back to client
        response.write("Data has been recorded")
        response.end()
      }
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
       response.end( content ) // This will be sent back, it is helpful to pass an array
     }
     else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
