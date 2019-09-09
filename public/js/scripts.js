// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

// flags to keep track of filled inputs
var amountFlag = false;
    categoryFlag = false;
    monthFlag = false;
    buttonStatus = false;
    taxFlag = true;

// variable to keep track of inputted tax
var tax = document.getElementById("tax")
var amount = document.getElementById('amount')
var category = document.getElementById('category')
var month = document.getElementById('month')

const submit = function( e ) {

    // lock button if not all fields are inserted
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
      //console.log( response )
      // get table data from server and parse it
      getTableData()
    })

    return false
}

// get table data from server
const getTableData = function() {
    let data
    fetch('/tabledata')
    .then(response => response.json())
    .then(data => {
        console.log("Data from server: ")
        console.log(data)
        // add new field to data (total) & load to table
        modifyData(data)
        
    })
    .catch(err => {
        console.log(err)
    })
}

// init table data upon refresh
getTableData()


// submit button saves data
window.onload = function() {
const button = document.getElementById( 'button' )
button.onclick = submit
}

// loops through server data, applies proper sales tax to amount
// and adds new field for total
function modifyData(data) {
    var tableData = []

    for (var i = 0; i < data.length; i++) {
        // multiply amount by sales tax, turn back into string
        var amt = (data[i].amount)
        var amtInt = parseInt(amt)
        var cat = (data[i].category)
        var mon = (data[i].month)
        var tot = amtInt + (amtInt * (tax.value/100))
        
        obj = { amount: amt, category: cat, month: mon, total: tot}
        
        tableData.push(obj)
    }

    // load data into table
    table.setData(tableData)
}

// make table
var table = new Tabulator("#expense-table", {
	layout:"fitColumns",      //fit columns to width of table
	responsiveLayout:"hide",  //hide columns that dont fit on the table
	tooltips:true,            //show tool tips on cells
	addRowPos:"top",          //when adding a new row, add it to the top of the table
	history:true,             //allow undo and redo actions on the table
	pagination:"local",       //paginate the data
	paginationSize:50,         //allow 7 rows per page of data
	movableColumns:true,      //allow column order to be changed
	resizableRows:true,       //allow row order to be changed
	initialSort:[             //set the initial sort order of the data
		{column:"name", dir:"asc"},
	],
    columns:[                  //define the table columns
		{title:"Month", field:"month", headerFilter: "input"},
        {title:"Category", field:"category", align:"left", headerFilter: "input"},
        {title:"Raw Amount", field:"amount", formatter:"money", bottomCalc:"sum", bottomCalcFormatter: "money", headerFilter: "input", 
        bottomCalcFormatterParams:  {
          decimal: ".",
          thousand: ",",
          symbol: "$"
        }, formatterParams: {
            decimal: ".",
            thousand: ",",
            symbol: "$"
        }},
        {title:"Total Amount", field:"total", formatter:"money", bottomCalc:"sum", bottomCalcFormatter: "money", headerFilter: "input", 
        bottomCalcFormatterParams:  {
          decimal: ".",
          thousand: ",",
          symbol: "$"
        }, formatterParams: {
            decimal: ".",
            thousand: ",",
            symbol: "$"
        }}
	],
});

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

// change amount notification on input
amount.oninput = function() { changeAmountNotification() }

function changeAmountNotification() {
    if (amount.value != '$') {
        // check to make sure value is int
        if (isNaN(amount.value)) {
            console.log("Entered value is not a number")
        } else {
            document.getElementById("amountBox").classList.add("is-success")
            amountFlag = true
            enableButton()            
        }
        
    }
    if (amount.value == '') {
        document.getElementById("amountBox").classList.remove("is-success")
        amountFlag = false
        disableButton()
    }
}

// change tax notification on input
tax.oninput = function() { changeTaxNotification() }

function changeTaxNotification() {
    if (tax.value != '') {
        // check to make sure value is int
        if (isNaN(tax.value)) {
            console.log("Entered value is not a number")
        } else {
            document.getElementById("taxBox").classList.add("is-success")
            taxFlag = true
            enableButton()            
        }
        
    }
    if (tax.value == '') {
        document.getElementById("taxBox").classList.remove("is-success")
        taxFlag = false
        disableButton()
    }
}

// change month notification on input
month.oninput = function() { changeMonthNotification() }

function changeMonthNotification() {
    if (month.value != '$') {
        document.getElementById("monthBox").classList.add("is-success")
        monthFlag = true
        enableButton()
    }
}
// change category notification on input
category.oninput = function() { changeCategoryNotification() }

function changeCategoryNotification() {
    if (category.value != '$') {
        document.getElementById("categoryBox").classList.add("is-success")
        categoryFlag = true
        enableButton()
    }
}

// enable submit button when all fields are filled
function enableButton() { 
    if (amountFlag == true && monthFlag == true && categoryFlag == true && taxFlag == true) {
        console.log("button enabled")
        document.getElementById('button').removeAttribute("disabled");
        buttonStatus = true
    }
}

// disable submit button if any fields are left empty
function disableButton() {
    if (amountFlag == false || monthFlag == false || categoryFlag == false || taxFlag == false) {
        console.log("button disabled")
        document.getElementById('button').setAttribute("disabled", "")
        buttonStatus = false
    }
}
