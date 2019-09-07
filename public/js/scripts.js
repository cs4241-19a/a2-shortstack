console.log("Welcome to assignment 2!")

const genTable = function(data){
    console.log(data)
    var table = new Tabulator("#readings-table", {
        margin:40,
        data:data, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Speed", field:"speed", width:120},
            {title:"Rotations per Minute", field:"rpm", width:250},
            {title:"Gear", field:"gear", width:120},
            {title:"Timestamp", field:"datetime", sorter:"date", align:"center", width:290},
        ],
        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            alert("Row " + row.getData().id + " Clicked!!!!");
        },
   });    
}

const agrTable = function(data){
    var agrTable = new Tabulator("#aggregate-table",{
        height: 200,
        margin: 50,
        data:data,
        layout:"fitColumns",
        columns:[
            {title:"Gear", field:"gear"},
            {title:"Average Speed", field:"avgspeed"},
        ]
    })
}

const getReadings = function(){

    fetch('data/carreadings.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        genTable(data.readings)
        agrTable(data.aggregate)
    })
    .catch(err => {
        console.log(err)
    })
}

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const speed = document.querySelector( '#speed' ),
        rpm = document.querySelector('#rpm'),
        gear = document.querySelector('#gear'),
        json = { 
            speed: speed.value,
            rpm: rpm.value,
            gear: gear.value,
            datetime: (new Date()).toJSON()
        },
        body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body 
    })
    .then( function( response ) {
        console.log(response)
        getReadings()
    })

    return false
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    getReadings()
}

