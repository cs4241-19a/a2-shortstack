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

const rollData = []

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
  }if(request.url === '/getResults'){
    sendResults( response)
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
    let rollList = []
    
    if(request.url == '/submit'){
      let data =  JSON.parse( dataString ) 
    
      let result = +0
      let mod = ""
      
      for(let i = 0; i < data.numDice; i++){
        let roll = rollDice(data.typeDice)
        result += evalMod(roll, data.flatDice, data.addsub)
        rollList.push(roll)
      }
      if(data.addsub == "state1"){mod = "+"}
      else if(data.addsub == "state2"){mod = "-"}
      else{mod = ""}
      rollData.push({'DiceType': data.typeDice, 
                     'NumOfDice': data.numDice, 
                     'AddSub': mod, 
                     'Modifier': data.flatDice,
                     'Result' : result
                    })
      const json = {
        'diceType': data.typeDice,
        'diceNum': data.numDice,
        'addsub': mod,
        'diceMod': data.flatDice,
        'result': result,
        'rolls': rollList
      }
      const responseData = JSON.stringify(json)
    
      response.writeHead(200, responseData,  {'Content-Type': 'text/plain' })
      response.write(responseData)
      response.addTrailers({'Content-Type': 'application/json'})
      response.end()
    }
    
    if(request.url == '/clear'){
      rollData.length = 0;
      response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
      response.write(JSON.stringify({message: "Clear Successful"}))
      response.addTrailers({'Content-Type': 'application/json'})
      response.end;
    }
  })
}

const rollDice = function( diceType ){
  switch(diceType){
    case "d1":
      return +Math.floor(Math.random() * Math.floor(2))
      break
    case "d4":
      return +Math.floor(Math.random() * Math.floor(4)) + 1
      break
    case "d6":
      return +Math.floor(Math.random() * Math.floor(6)) + 1
      break
    case "d8":
      return +Math.floor(Math.random() * Math.floor(8)) + 1
      break
    case "d10":
      return +Math.floor(Math.random() * Math.floor(10)) + 1
      break
    case "d12":
      return +Math.floor(Math.random() * Math.floor(12)) + 1
      break
    case "d20":
      return +Math.floor(Math.random() * Math.floor(20)) + 1
      break
    case "d100":
      return +Math.floor(Math.random() * Math.floor(100)) + 1
      break
    }
}


  
const evalMod = function( num, flatMod, state){
  if(state == "state1"){
    return +num + +flatMod
  } else if(state == "state2") {
    return +num - +flatMod
  } else {
    return 0
  }
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

const sendResults = function( response) {

       //let json = {}
       //Object.assign(json, rollData)
       const res = JSON.stringify(rollData)
       
       response.writeHeader( 200, { 'Content-Type': 'plain/text' })
       response.write(res)
       response.addTrailers({'Content-Type': 'application/json'})
       response.end()

}

server.listen( process.env.PORT || port )
