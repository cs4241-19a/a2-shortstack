const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

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
  }if(request.url==='/getResults'){
   sendResults(response); 
  }
  if(request.url==='/getStuff'){
   sendResults2(response); 
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  if(request.url==='/delete'){
    let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    var data = JSON.parse(dataString);
    for(var i=0;i<appdata.length;i++){
      if(appdata[i].fname===data.fname &&appdata[i].lname===data.lname){
        appdata.splice(i,1);
        i=appdata.length+1;
        break;
      }
    }
    const responseData = JSON.stringify("");
    

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.write(responseData);
    response.addTrailers({'Content-Type': 'application/json'});
    response.end();
  })
             
  }else{
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    var data = JSON.parse(dataString)
    appdata.push(data);
    
    var fname = data.fname;
    var lname = data.lname;
    var birthday = data.birthday;
    var color = data.color;
    var mood = data.mood;
    
    var yourname = fname+" "+lname;
    var yourage = getAge(birthday);
    var yourmood = getMood(mood);
    var colors = getRGB(color);
    var yourcolorR = colors[0];
    var yourcolorB = colors[2];
    var yourcolorG = colors[1];
    
    var avgnamelength = getAvgLength();
    var avgname = getAvgName();
    var avgage = getAvgAge();
    var avgcolor = getAvgColor();
    var avgmood = getAvgMood();
    
    //do stuff
    
    const responseJSON = {
      'fname': fname,
      'lname': lname,
      'birthday': birthday,
      'color': color,
      'mood': mood,
      'yourname': yourname,
      'yourage': yourage,
      'yourcolorR': yourcolorR,
      'yourcolorB': yourcolorB,
      'yourcolorG': yourcolorG,
      'yourmood': yourmood,
      'avgnamelength': avgnamelength,
      'avgname': avgname,
      'avgage': avgage,
      'avgcolor': avgcolor,
      'avgmood': avgmood
    }
    
    const responseData = JSON.stringify(responseJSON);
    

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.write(responseData);
    response.addTrailers({'Content-Type': 'application/json'});
    response.end();
  })
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

const getAge = function(birthday){
  var today = new Date();
  var birthdate = new Date(birthday);
  var age = today.getFullYear() - birthdate.getFullYear();
  if (today.getMonth() < birthdate.getMonth() || (today.getMonth() == birthdate.getMonth() && today.getDate() < birthdate.getDay())) {
    age--;
  }
  return age;
}

const getMood = function(mood){
  switch(mood){
    case "1":
      return "You are not having a good time :'^(";
    case "2":
      return "You are having a less than ideal time :(";
    case "3":
      return "You are having an ok time";
    case "4":
      return "You are having a pretty good time";
    case "5":
      return "You are having a fantastic time!";
  }
}

const getRGB = function(color){
  var r = "0x"+color.substring(1,3);
  var g = "0x"+color.substring(3,5);
  var b = "0x"+color.substring(5,7);
  var r1 = parseInt(r) / 255.0 * 100;
  var g1 = parseInt(g) / 255.0 * 100;
  var b1 = parseInt(b) / 255.0 * 100;
  return [r1.toFixed(2),g1.toFixed(2),b1.toFixed(2)];
}

const getRGB2 = function(color){
  var r = "0x"+color.substring(1,3);
  var g = "0x"+color.substring(3,5);
  var b = "0x"+color.substring(5,7);
  var r1 = parseInt(r);
  var g1 = parseInt(g);
  var b1 = parseInt(b);
  return [r1,g1,b1];
}


const getAvgName = function(){
  var avgfname = getAvgFnameLength();
  var avglname = getAvgLnameLength();
  var fname = [];
  var lname = [];
  for(var i=0;i<avgfname;i++){
    fname[i]=0;
  }
  for(var i=0;i<avglname;i++){
    lname[i]=0;
  }
  for(var i=0;i<appdata.length;i++){
    var names = [appdata[i].fname.toUpperCase(), appdata[i].lname.toUpperCase()];
    for(var j=0;j<avgfname;j++){
      if(j > names[0].length-1){
        fname[j]+="A".charCodeAt(0);
      }else{
        fname[j]+=names[0].charCodeAt(j);
      }      
    }
    for(var j=0;j<avglname;j++){
      if(j > names[1].length-1){
        lname[j]+="A".charCodeAt(0);
      }else{
        lname[j]+=names[1].charCodeAt(j);
      }      
    }
  }
  var name="";
  for(var i=0;i<avgfname;i++){
    fname[i]=fname[i]/appdata.length;
    name+=String.fromCharCode(fname[i]);
  }
  name+=" ";
  for(var i=0;i<avglname;i++){
    lname[i]=lname[i]/appdata.length;
    name+=String.fromCharCode(lname[i]);
  }
  return name;
}

const getAvgFnameLength = function(){
  var chars = 0;
  for(var i=0;i<appdata.length;i++){
    chars+=appdata[i].fname.length;
  }
  var avgchars = chars/appdata.length;
  return avgchars;
}

const getAvgLnameLength = function(){
  var chars = 0;
  for(var i=0;i<appdata.length;i++){
    chars+=appdata[i].lname.length;
  }
  var avgchars = chars/appdata.length;
  return avgchars;
}

const getAvgLength = function(){
  var chars = 0;
  for(var i=0;i<appdata.length;i++){
    chars+=appdata[i].fname.length + appdata[i].lname.length;
  }
  var avgchars = chars/appdata.length;
  return avgchars;
}

const getAvgAge = function(){
  var age=0;
  for(var i=0;i<appdata.length;i++){
    age+=getAge(appdata[i].birthday);
  }
  age = age/appdata.length;
  return age;
}

const getAvgColor = function(){
  var r = 0;
  var g = 0;
  var b = 0;
  for(var i=0;i<appdata.length;i++){
    var colors = getRGB2(appdata[i].color);
    r += colors[0];
    g += colors[1];
    b += colors[2];
  }
  var r1 = r / appdata.length;
  var g1 = g / appdata.length;
  var b1 = b / appdata.length;
  r1 = parseFloat(r1.toFixed(0));
  g1 = parseFloat(g1.toFixed(0));
  b1 = parseFloat(b1.toFixed(0));
  var final = r1.toString(16)+g1.toString(16)+b1.toString(16);
  switch(final.length){
    case 3:
      final = "#000"+final;
      break;
    case 4:
      final = "#00"+final;
      break;
    case 5:
      final = "#0"+final;
      break;
    default:
      final = "#" + final;
      break;
  }
  return final;
}

const getAvgMood = function(){
  var mood=0;
  for(var i=0;i<appdata.length;i++){
    mood+=parseInt(appdata[i].mood);
  }
  mood = mood/appdata.length;  
  return mood;
}

const sendResults = function(response){
  const results = JSON.stringify(appdata);
  response.writeHeader(200, {'Content-Type': 'plain/text'});
  response.write(results);
  response.addTrailers({'Content-Type': 'application/json'});
  response.end();
}
const sendResults2 = function(response){
  var avgnamelength = getAvgLength();
    var avgname = getAvgName();
    var avgage = getAvgAge();
    var avgcolor = getAvgColor();
    var avgmood = getAvgMood();
    
    //do stuff
    
    const responseJSON = {
      'avgnamelength': avgnamelength,
      'avgname': avgname,
      'avgage': avgage,
      'avgcolor': avgcolor,
      'avgmood': avgmood
    }
    
    const responseData = JSON.stringify(responseJSON);
    

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
    response.write(responseData);
    response.addTrailers({'Content-Type': 'application/json'});
    response.end();
}

server.listen( process.env.PORT || port )
