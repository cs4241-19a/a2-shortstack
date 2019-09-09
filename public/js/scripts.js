//define some sample data
/* var tabledata = [
  {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
  {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
  {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
  {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
  {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
]; */

//create Tabulator on DOM element with id "example-table"
var table = new Tabulator("#all-table", {
 	height:200, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
 	//assign data to table
 	layout:"fitColumns", //fit columns to width of table (optional)
 	columns:[ //Define Table Columns
	 	{title:"Computer", field:"computer", width:150},
	 	{title:"Game", field:"game", align:"left"},
     {title:"FPS", field:"fps"},
     {title:"CPU Temp", field:"cputemp"},
     {title:"GPU Temp", field:"gputemp"},
 	],
});

//create Tabulator on DOM element with id "example-table"
var topTable = new Tabulator("#toptime-table", {
  height:150, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
  //assign data to table
  layout:"fitColumns", //fit columns to width of table (optional)
  columns:[ //Define Table Columns
    {title:"Game", field:"name", width:500},
    {title:"FPS Stats", field:"performances", width:150},
    {title:"Average FPS", field:"average", align:"left"},
    {title:"CPU Temp Stats", field:"cpuPerformances", align:"left"},
    {title:"CPU Temp Average", field:"cpuAverage", align:"left"},
    {title:"GPU Temp Stats", field:"gpuPerformances", align:"left"},
    {title:"GPU Temp Average", field:"gpuAverage", align:"left"},
  ],
});

var currentData = []
var topData = []


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.querySelector( '#computer' ),
          game = document.querySelector( '#game' ),
          frames = document.querySelector ( '#fps' ),
          CPUTemp = document.querySelector ( '#cpu-temp' ),
          GPUTemp = document.querySelector ( '#gpu-temp' ),
          json = { 
            'computer': name.value,
            'game': game.value,
            'fps': frames.value,
            'cputemp': CPUTemp.value,
            'gputemp': GPUTemp.value,
          },
          body = JSON.stringify( json )
    
    name.value = ""
    game.value = ""
    frames.value = ""
    CPUTemp.value = ""
    GPUTemp.value = ""
    
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
      request()
    })

    return false
  }

  const request = function() {
    console.log()
  fetch('/table-contents')
    .then( response => response.json() )
    .then( data => {
      // console.log( data )
      table.setData( data )
      currentData = data;
      calculateBestGames()
      calculateHealth()
    }).catch( err => {
      console.log(err)
    })
}

function calculateBestGames() {
  var dict = []
  var count = 0

  // Add all the games to the dictionary
  for(let i = 0; i < currentData.length; i++) {
    if( !containsName( dict, currentData[i].game ) ) {
      console.log( currentData[i].game )
      var item = {
        name: "",
        performances: [],
        average: 0,
        cpuPerformances: [],
        cpuAverage: 0,
        gpuPerformances: [],
        gpuAverage: 0,
      }
      item.name = currentData[i].game;
      dict[count] = item;
      count++;
    }
  }

  // Add the performaces and get the average
  for(let i = 0; i < dict.length; i++) {
    for(let j = 0; j < currentData.length; j++) {
      if(dict[i].name === currentData[j].game) {
        // add all performances to table
        dict[i].performances.push(currentData[j].fps)
        dict[i].cpuPerformances.push(currentData[j].cputemp)
        dict[i].gpuPerformances.push(currentData[j].gputemp)

        // calculate aberages and add to table
        dict[i].average = getAverage(dict[i].performances)
        dict[i].cpuAverage = getAverage(dict[i].cpuPerformances)
        dict[i].gpuAverage = getAverage(dict[i].gpuPerformances)

      }
    }
  }
  console.log(dict)
  topTable.setData( dict )
  topData = dict;
}

function calculateHealth() {
  var framesHealth = document.getElementById("frames-health")
  var CPUHealth = document.getElementById("gpu-health")
  var GPUHealth = document.getElementById("cpu-health")

  let fh = 0
  let cpuh = 0
  let gpuh = 0
  let count = 0

  for(let i = 0; i < topData.length; i++) {
    fh += parseInt(topData[i].average)
    cpuh += parseInt(topData[i].cpuAverage)
    gpuh += parseInt(topData[i].gpuAverage)
    count += 1
  }

  fh = fh/count
  cpuh = cpuh/count
  gpuh = gpuh/count

  framesHealth.value = fh/300
  CPUHealth.value = 1-(cpuh/100)
  GPUHealth.value = 1-(gpuh/100)
}

function getAverage(items) {
  let total = 0
  let count = 0

  for(let i = 0; i < items.length; i++) {
    total += parseInt(items[i])
    count ++
  }
  return total/count
}

function containsName(items, name) {
  for(let i = 0; i < items.length; i++) {
    if(items[i].name === name) {
      return true
    }
  }
  return false
}

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }

  request()