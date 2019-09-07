// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")
//var Tabulator = require('tabulator-tables');

// array to hold all inputs
var tableData = []

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const amt = document.querySelector( '#amount' ),
          cat = document.querySelector( '#category' ),
          mon = document.querySelector( '#month' ),
          json = { amount: amt.value, category: cat.value, month: mon.value },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
      // append to array of input
      tableData.push(json)
      console.log(tableData.length)
      table.setData(tableData);
    })

    return false
}
// submit button saves data
window.onload = function() {
const button = document.getElementById( 'button' )
button.onclick = submit
}

// hide $ on amount
var amount = document.getElementById("amount")
amount.addEventListener("click", function hide() {
amount.value = "";
})

// make table
var table = new Tabulator("#expense-table", {
    data:tableData,           //load row data from array
	layout:"fitColumns",      //fit columns to width of table
	responsiveLayout:"hide",  //hide columns that dont fit on the table
	tooltips:true,            //show tool tips on cells
	addRowPos:"top",          //when adding a new row, add it to the top of the table
	history:true,             //allow undo and redo actions on the table
	pagination:"local",       //paginate the data
	paginationSize:7,         //allow 7 rows per page of data
	movableColumns:true,      //allow column order to be changed
	resizableRows:true,       //allow row order to be changed
	initialSort:[             //set the initial sort order of the data
		{column:"name", dir:"asc"},
	],
    columns:[                  //define the table columns
        {title:"Amount", field:"amount", editor:"input"},
		{title:"Category", field:"category", align:"left", editor:true, editorParams:{values:["Merchandise", "Restaurants", "Gasoline", "Travel/Ent", "Supermarkets"]}},
		{title:"Month", field:"month", width:95, editor:"select", editorParams:{values:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]}}
	],
});
