submitMode()

const firebaseConfig = {
  apiKey: "AIzaSyA81fGagH_ga2lk3xZ2si5pLVBTM6TVoZs",
  authDomain: "a2-dowdtd16-webware19.firebaseapp.com",
  databaseURL: "https://a2-dowdtd16-webware19.firebaseio.com",
  projectId: "a2-dowdtd16-webware19",
  storageBucket: "a2-dowdtd16-webware19.appspot.com",
  messagingSenderId: "660442145406",
  appId: "1:660442145406:web:615ffbba0b64dce77eee2f"
}

firebase.initializeApp(firebaseConfig)

var rowsDB = firebase.database()

var countDB=0


fetch('appData.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    var rowJson = (JSON.stringify(response))
    console.log(rowJson)
    var parseRow = (JSON.parse(rowJson))
    console.log(parseRow.length)
    console.log(parseRow.boat)
    addToTable(parseRow)
  });


function writeToDB(data){
  console.log(data)
  var parseRow = (JSON.parse(data))
  console.log(parseRow)
  console.log(parseRow.boat)
  rowsDB.ref().push({
    boat: parseRow.boat, 
    meters: parseRow.meters,
    time: parseRow.time,
    split :getSplit(parseRow.time, parseRow.meters)
  })
}


function getSplit(time, meters){
  return time/(meters/500)
}

function distancePerStroke(meters, spm, time){
  return meters/((time/60)*spm)
}

function resultsMode(){
  document.getElementById("submit").style.display = "none"
  document.getElementById("results").style.display = "block"
  getDB()
}

function getDB(){
  rowsDB.ref().once('value', function(snapshot) {
  snapshot.forEach(function(rowData) {
    console.log(rowData.val())
    console.log(rowData.key)
    addDBToTable(rowData.val())
  })
})
}

function submitMode(){
  document.getElementById("submit").style.display = "block"
  document.getElementById("results").style.display = "none"
  deleteDBRows()
}

function addToTable(rowingData){
  var rows= document.getElementById("rows")
  for(var i=0; i<rowingData.length; i++){
    var newRow = rows.insertRow()
    var boatName = newRow.insertCell(0) 
    var distance = newRow.insertCell(1) 
    var time = newRow.insertCell(2)
    var split = newRow.insertCell(3)
    boatName.innerHTML = rowingData[i].boat 
    distance.innerHTML = rowingData[i].meters
    time.innerHTML = rowingData[i].time
    split.innerHTML= getSplit(rowingData[i].time, rowingData[i].meters)  
  }
}

function addDBToTable(rowingDB){
  var rows= document.getElementById("rows")
  var newRow = rows.insertRow()
  var boatName = newRow.insertCell(0) 
  var distance = newRow.insertCell(1) 
  var time = newRow.insertCell(2)
  var split = newRow.insertCell(3)
  console.log(rowingDB)
  boatName.innerHTML = rowingDB.boat 
  distance.innerHTML = rowingDB.meters
  time.innerHTML = rowingDB.time
  split.innerHTML= getSplit(rowingDB.time, rowingDB.meters) 
  countDB++
}

function deleteDBRows(){
  var tableDB = document.getElementById("rows");
  while(countDB>0){
    var rowCount = tableDB.rows.length;
    console.log(rowCount)
    console.log(countDB)
    tableDB.deleteRow(rowCount-countDB)
    countDB--
   
  }
}