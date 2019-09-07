console.log("Welcome to assignment 2!")

const genTable = function(data){
    console.log("About to create table")
    console.log(data)
    var table = new Tabulator("#readings-table", {
        height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:data, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Speed", field:"speed", width:150},
            {title:"Rotations per Minute", field:"rpm", formatter:"progress"},
            {title:"Gear", field:"gear"},
            {title:"Timestamp", field:"datetime", sorter:"date", align:"center"},
        ],
        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            alert("Row " + row.getData().id + " Clicked!!!!");
        },
   });    
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
        let reader = response.body.getReader()
        reader.read().then(function processReadings({done, data}){
            if(done){
                console.log(data)
                try{
                    let obj = JSON.parse(data)
                    genTable(obj.readings)
                }catch(err){
                    console.log(err)
                    genTable(data.readings)
                }
            }
        })
    })

    return false
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
}

