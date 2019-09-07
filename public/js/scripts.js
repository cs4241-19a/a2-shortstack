// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")
//var Tabulator = require('tabulator-tables');

// array to hold all inputs
var tableData = []

// flags to keep track of filled inputs
var amountFlag = false;
    categoryFlag = false;
    monthFlag = false;
    buttonStatus = false;

const submit = function( e ) {

    if (buttonStatus == false) {
        return;
    }
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
      // append to array of input - CHANGE THIS TO SERVER SIDE
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

/* hide $ on amount
var amount = document.getElementById("amount")
amount.addEventListener("click", function hide() {
    amount.value = "";
}) */

// download csv
var dnCSV = document.getElementById("dnCSV")
dnCSV.addEventListener("click", function download() {
    table.download("csv", "expense_report.csv");
})

// download json
var dnJSON = document.getElementById("dnJSON")
dnJSON.addEventListener("click", function download() {
    table.download("json", "expense_report.json");
})

// download pdf
var dnPDF = document.getElementById("dnPDF")
dnPDF.addEventListener("click", function download() {
    table.download("pdf", "expense_report.pdf", {
        orientation:"portrait", //set page orientation to portrait
        autoTable:function(doc){
            //doc - the jsPDF document object
    
            //add some text to the top left corner of the PDF
            doc.text("SOME TEXT", 1, 1);
    
            //return the autoTable config options object
            return {
                styles: {
                    fillColor: [0, 255, 255]
                },
            };
        },
    });
})  

// download xslx
var dnXSLX = document.getElementById("dnXLSX")
dnXSLX.addEventListener("click", function download() {
    table.download("xlsx", "expense_report.xlsx", {sheetName:"MyExpenses"});
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
        {title:"Amount", field:"amount", editor:"input", formatter:"money", bottomCalc:"sum"},
		{title:"Category", field:"category", align:"left", editor:"select", editorParams:{values:["Merchandise", "Restaurants", "Gasoline", "Travel/Ent", "Supermarkets"]}},
		{title:"Month", field:"month", editor:"select", editorParams:{values:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]}}
	],
});

// change amount notification on input
var amount = document.getElementById('amount')
amount.oninput = function() { changeAmountNotification() }

function changeAmountNotification() {
    if (amount.value != '$') {
        document.getElementById("amountBox").classList.add("is-success")
        amountFlag = true
        enableButton()
    }
    if (amount.value == '') {
        document.getElementById("amountBox").classList.remove("is-success")
        amountFlag = false
        disableButton()
    }
}

// change month notification on input
var month = document.getElementById('month')
month.oninput = function() { changeMonthNotification() }

function changeMonthNotification() {
    if (month.value != '$') {
        document.getElementById("monthBox").classList.add("is-success")
        monthFlag = true
        enableButton()
    }
}
// change month notification on input
var category = document.getElementById('category')
category.oninput = function() { changeCategoryNotification() }

function changeCategoryNotification() {
    if (category.value != '$') {
        document.getElementById("categoryBox").classList.add("is-success")
        categoryFlag = true
        enableButton()
    }
}

function enableButton() { 
    if (amountFlag == true && monthFlag == true && categoryFlag == true) {
        console.log("button enabled")
        document.getElementById('button').removeAttribute("disabled");
        buttonStatus = true
    }
}

function disableButton() {
    if (amountFlag == false || monthFlag == false || categoryFlag == false) {
        console.log("button disabled")
        document.getElementById('button').setAttribute("disabled", "")
        buttonStatus = false
    }
}
