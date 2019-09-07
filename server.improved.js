const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'fName': 'Bob', 'lName': 'Smith', 'day': 23, 'month':'August', 'sign':"AHH"},
  { 'fName': 'Suzy', 'lName': 'Ng', 'day': 30 , 'month':'September', 'sign':"AHH"},
  { 'fName': 'Jim', 'lName': 'Hopper', 'day': 14, 'month': 'July', 'sign':"AHH"} 
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
  }
  else if (request.url == '/getData'){
    console.log("IN RETREVIAL")
    sendData(response, appdata)
  }
  else if( request.url == '/printAll'){
    printAll(request, response)
  }
  else{
    sendFile( response, filename )
  }
}

const sendData = function(res, horoscope){
  const mimeType = mime.getType(horoscope)
  res.writeHeader(200, {'Content-Type': mimeType})
  res.write(JSON.stringify({data: horoscope}))
  res.end()
}







const printAll = function(req, res){
  console.log("IN printALL")  
  let data = JSON.stringify(appdata)
  res.writeHead(200, "OK", {'Content-Type': 'plain/text' })
  res.write(data)
  res.end()
  
}





const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const reqURL = request.url.slice(1)
    switch(reqURL){
       /*Submission  Case*/
      case "submit":
        console.log("submit")
        const convertedData = JSON.parse(dataString)
        if(noDuplicates(convertedData)){
            appdata.push(convertedData)
          let json = JSON.stringify(appdata)
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.write(json)
          response.end()
        }
        else{
          let json = JSON.stringify(appdata)
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.write("Duplicate Information, Not Added!")
          response.end()
        }        
        break
        /*Modify  Case*/
      case "modify":
        console.log("modify")
        break
      default:
        console.log(reqURL)
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

//Checks if given input os already in database
function noDuplicates(dataToAdd){
  for(let i = 0; i< Object.keys(appdata).length; i++){
    console.log("TEST")
    if((dataToAdd.fName === appdata[i].fName) && (dataToAdd.lName === appdata[i].lName)){
      if((dataToAdd.day === appdata[i].day) && (dataToAdd.month === appdata[i].month)){
        return false;
      }
    }
  }
  return true;
}

//Calculates star sign for given information
function starSign(personalInfo){
  switch(personalInfo.month){
    case "January":
      if(personalInfo.day < 21){
        return "Capricorn"
      }
      else{
        return "Aquarius"
      }
      break;
    case "February":
      if(personalInfo.day < 19){
        return "Aquarius"
      }
      else{
        return "Pisces"
      }
      break;
    case "March":
      if(personalInfo.day < 21){
        return "Pisces"
      }
      else{
        return "Aries"
      }
      break;
    case "April":
      if(personalInfo.day < 21){
        return "Aries"
      }
      else{
        return "Tarus"
      }
      break;
    case "May":
      if(personalInfo.day < 22){
        return "Tarus"
      }
      else{
        return "Gemini"
      }
      break;
    case "June":
      if(personalInfo.day < 22){
        return "Gemini"
      }
      else{
        return "Virgo"
      }
      break;
    case "July":
      break;
    case "August":
      if(personalInfo.day < 24){
        return "Leo"
      }
      else{
        return "Virgo"
      }
      break;
    case "September":
      break;
    case "November":
      break;
    case "December":
      break;
    default:
      return "Error"
  }
}
