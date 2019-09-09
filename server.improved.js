const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

// let scopeData = [];
let scopeData2 = [];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' || request.method === 'PUT' ){
    handlePost( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if(request.url === '/retrieve'){handleRetrieve(request,response)
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  if(request.url === '/submit'){ handleSubmit(request,response)}
    else if(request.url === '/del'){handleDelete(request,response)}
    else{return false}//some kind of error necessary here

}

const handleDelete = function(request,response){
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data
  })

  request.on( 'end', function() {
    console.log("deleting "+dataString);
    let obj=JSON.parse( dataString );
    let dName=obj['yourname'];
    console.log(dName)

    // let newData2={ 'name': dName }
    // console.log(newData2);
    for(let i=0;i<scopeData2.length;i++){
      if(dName == scopeData2[i].name){
        console.log(dName+", "+scopeData2[i].name+", "+i)
        scopeData2.splice(i,1);
        break;
      }

  }

    console.log('scopeData2:');
    console.log(scopeData2);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end("object "+dName+"successfully deleted")
  })
}

const handleSubmit= function(request,response){
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data
  })

  request.on( 'end', function() {
    console.log(dataString);
    let obj=JSON.parse( dataString );
    let name=obj['yourname'];
    let date=obj['BDay'];
    let mon = parseInt(date.substring(5,7));
    let day = parseInt(date.substring(8,10));
    let yr = parseInt(date.substring(0,5));
    console.log(mon+" , "+day);

    // ... do something with the data here!!!
    let hscp=horoscope(mon,day);
    let zdc=zodiac(yr);

    let newData2={ 'name': name, 'bday': date, 'zodiac': zdc, 'horoscope': hscp }
    console.log(newData2);
    scopeData2.push(newData2);
    console.log('scopeData2:');
    console.log(scopeData2);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(newData2))
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

const horoscope = function(mon,day){
  console.log(mon,day);
  let hscp='';

  if(mon===1){
    if(day>0 && day<=19){hscp='Capricorn';}else if(day>19 && day<=31){hscp='Aquarius';}else{hscp='signless';}
  }else if(mon===2){
    if(day>0 && day<=18){hscp='Aquarius';}else if(day>18 && day<=29){hscp='Pisces';}else{hscp='signless';}
  }else if(mon===3){
    if(day>0 && day<=20){hscp='Pisces';}else if(day>20 && day<=31){hscp='Aries';}else{hscp='signless';}
  }else if(mon===4){
    if(day>0 && day<=19){hscp='Aries';}else if(day>19 && day<=30){hscp='Taurus';}else{hscp='signless';}
  }else if(mon===5){
    if(day>0 && day<=20){hscp='Taurus';}else if(day>20 && day<=31){hscp='Gemini';}else{hscp='signless';}
  }else if(mon===6){
    if(day>0 && day<=21){hscp='Gemini';}else if(day>21 && day<=30){hscp='Cancer';}else{hscp='signless';}
  }else if(mon===7){
    if(day>0 && day<=22){hscp='Cancer';}else if(day>22 && day<=31){hscp='Leo';}else{hscp='signless';}
  }else if(mon===8){
    if(day>0 && day<=22){hscp='Leo';}else if(day>22 && day<=31){hscp='Virgo';}else{hscp='signless';}
  }else if(mon===9){
    if(day>0 && day<=22){hscp='Virgo';}else if(day>22 && day<=30){hscp='Libra';}else{hscp='signless';}
  }else if(mon===10){
    if(day>0 && day<=23){hscp='Libra';}else if(day>23 && day<=31){hscp='Scorpio';}else{hscp='signless';}
  }else if(mon===11){
    if(day>0 && day<=21){hscp='Scorpio';}else if(day>21 && day<=30){hscp='Sagittarius';}else{hscp='signless';}
  }else if(mon===12)
    if(day>0 && day<=21){hscp='Sagittarius';}else if(day>21 && day<=30){hscp='Capricorn';}else{hscp='signless';}

  return hscp;
}

const zodiac = function(yr){
  let zmod=yr%12;
  console.log(yr,zmod);
  let zod='';
  switch(zmod){
    case 0: zod="Monkey"; break;
    case 1: zod="Rooster"; break;
    case 2: zod="Dog"; break;
    case 3: zod="Pig"; break;
    case 4: zod="Rat"; break;
    case 5: zod="Ox"; break;
    case 6: zod="Tiger"; break;
    case 7: zod="Rabbit"; break;
    case 8: zod="Dragon"; break;
    case 9: zod="Snake"; break;
    case 10: zod="Horse"; break;
    case 11: zod="Sheep"; break;
  }
  return zod;
}

const handleRetrieve = function( request, response){
  // console.log('run')
  // request.on( 'end', function() {
  //   console.log('returning following datalog:')
  //   console.log(scopeData2)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(scopeData2))
  // })
}

server.listen( process.env.PORT || port )
