const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      firebase = require('firebase'),
      dir  = 'public/',
      port = 3000


var firebaseConfig = {
  apiKey: "AIzaSyAuOGEGSNJLe2fxv0iHQwigSY8nIj2pb30",
    authDomain: "a2-nbloniarz.firebaseapp.com",
    databaseURL: "https://a2-nbloniarz.firebaseio.com",
    projectId: "a2-nbloniarz",
    storageBucket: "",
    messagingSenderId: "337634055490",
    appId: "1:337634055490:web:821a136e7f93eff009e4db"
};

firebase.initializeApp(firebaseConfig);


const appdata = [
  { 'fName': 'Bob', 'lName': 'Smith', 'month':'August', 'day': 23, 'sign':"AHH"},
  { 'fName': 'Suzy', 'lName': 'Ng', 'month':'September','day': 30 , 'sign':"AHH"},
  { 'fName': 'Jim', 'lName': 'Hopper', 'month': 'July','day': 14, 'sign':"AHH"} 
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
    //console.log(returnFirebaseAsArray())
    //console.log(returnArray)
    //returnFirebaseAsArray()
    //console.log(returnArray)
    sendFile( response, 'public/index.html' )
  }
  else if (request.url == '/getData'){
    sendData(response)
  }
  else{
    sendFile( response, filename )
  }
}

const sendData = function(res){
  res.writeHeader(200, "OK", {'Content-Type': 'plain/text'})
  res.write(JSON.stringify(returnFirebaseAsArray()))
  //res.write(JSON.stringify(appdata))
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
      /*Submit Case*/
      case "submit":
        console.log("submit")
        const convertedData = JSON.parse(dataString)
        convertedData.sign = starSign(convertedData)
        if(noDuplicatesFirebase(convertedData)){
          addItemToFirebase(convertedData)
          let json = JSON.stringify(returnFirebaseAsArray())
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.write(json)
          response.end()
        }
        else{
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.write("Duplicate Information, Not Added!")
          response.end()
        }
        /*if(noDuplicates(convertedData)){
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
        } */       
        break
        /*Modify  Case MAXIMUM EFFICENCY*/
      case "modify":
        console.log("modify")
        const Data = JSON.parse(dataString)
        modifyItemInFirebase(Data.originalArr, Data.newInput)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.write(JSON.stringify(returnFirebaseAsArray()))
        response.end()
        /*modData(Data)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.write(JSON.stringify(appdata))
        response.end()*/
        break
      case "delete":
        console.log("delete")
        const removalData = JSON.parse(dataString)
        /*removalData.sign = starSign(removalData)
        removeGiven(removalData)*/
        deleteInFirebase(removalData)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.write(JSON.stringify(returnFirebaseAsArray()))
        response.end()
        break
      case "remote":
        for(let i = 0; i< appdata.length; i++){
          
        }
        break;
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
        return "Cancer"
      }
      break;
    case "July":
      if(personalInfo.day < 23){
        return "Cancer"
      }
      else{
        return "Leo"
      }
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
      if(personalInfo.day < 23){
        return "Virgo"
      }
      else{
        return "Libra"
      }
      break;
    case "October":
      if(personalInfo.day < 24){
        return "Libra"
      }
      else{
        return "Scorpio"
      }
      break;
    case "November":
      if(personalInfo.day < 24){
        return "Scorpio"
      }
      else{
        return "Sagatarius"
      }
      break;
    case "December":
      if(personalInfo.day < 22){
        return "Sagittarius"
      }
      else{
        return "Capricorn"
      }
      break;
    default:
      return "Error"
  }
}

function removeGiven(original){
  for(let i = 0; i< Object.keys(appdata).length; i++){
    if((original.fName === appdata[i].fName) && (original.lName === appdata[i].lName)){
      if((original.day === appdata[i].day) && (original.month === appdata[i].month)){
        appdata.splice(i, 1);
        i--;
      }
    }
  }
}

function modData(toChange){
  let original = toChange.originalArr
  let replace = toChange.newInput
  for(let i = 0; i < appdata.length; i++){
    if((original[0] === appdata[i].fName) && (original[1] === appdata[i].lName) && (original[2] === appdata[i].month) && (original[3] === appdata[i].day)){
      console.log(appdata[i])
      appdata[i].fName = replace[0];
      appdata[i].lName = replace[1];
      appdata[i].month = replace[2];
      appdata[i].day = replace[3];
      appdata[i].sign = starSign(appdata[i])
      console.log(appdata[i])
    }
  }
}

//******** FIREBASE FUNCTIONS *******//
//returns firebase database as an array of json objects
function returnFirebaseAsArray(){
  /*let returnArray = []
  firebase.database().ref().once("value", function(data){
    data.forEach(function(childSnapshot){
        var childData = childSnapshot.val()
        returnArray.push(childData)
    })
  })
    .then(function(result){
    return returnArray;
  })
  .finally(function (){
    return returnArray
  })*/
  let returnArray = []
  firebase.database().ref().once("value", function(data){
    return data
  }).then(function(nodes){
      nodes.forEach(function(child){
        returnArray.push(child.val())
        console.log(returnArray)
      })
  })
  
  
}


//Takes given JSON object and adds it to the remote database
function addItemToFirebase(itemToAdd){
  const dbRef = firebase.database.ref()
  var templateItem = dbRef.push()
  templateItem.set({
    fName: itemToAdd.fName,
    lName: itemToAdd.lName,
    month: itemToAdd.month,
    day: itemToAdd.day,
    sign: itemToAdd.sign
  })
}

//Takes given original object and then sets equal to new object
function modifyItemInFirebase(itemToModify, newInfo){
  newInfo.sign = starSign(newInfo)
  let id = getFirebaseKey(itemToModify)
  firebase.database().ref('/' + id).set({
    fName: newInfo.fName,
    lName: newInfo.lName,
    month: newInfo.month,
    day: newInfo.day,
    sign: newInfo.sign
  })
}

//Delets object from firebase
function deleteInFirebase(itemToDelete){
  let id = getFirebaseKey(itemToDelete)
  firebase.database().ref('/' + id).remove()
}

//Gets Key for JSON object
function getFirebaseKey(item){
  let key = ""
  firebase.database().ref().once("value")
  .then(function( response) {
    response.forEach(function(childSnapshot){
      var childKey = childSnapshot.key()
      var childData = childSnapshot.val()
      if(!noDuplicatesFirebase(childData)){
        key = childKey()
      }
    })
    return key
  })
}

//Checks if given JSON object is a duplicate of an exisiting object
function noDuplicatesFirebase(itemToCheck){
  let dataArray = returnFirebaseAsArray()
  console.log(dataArray)
  for(let i = 0; i< dataArray.length; i++){
    if((itemToCheck.fName === dataArray[i].fName) && (itemToCheck.lName === dataArray[i].lName)){
      if((itemToCheck.day === dataArray[i].day) && (itemToCheck.month === dataArray[i].month)){
        return false;
      }
    }
  }
  return true;
}
