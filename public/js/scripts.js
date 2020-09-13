// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()




    const assignmentNameInput = document.querySelector( '#assignmentname' ),
      dueDateInput = document.querySelector( '#duedate' ),
      esttime = document.querySelector( '#esttime' ),
      json={assignmentname: assignmentNameInput.value, dueDate:dueDateInput.value, esttime:esttime.value},
      body=JSON.stringify(json);

      if(assignmentNameInput.value==='' || dueDateInput.value==='' || esttime.value===''){
        assignmentNameInput.style.backgroundColor="#F59487";
        dueDateInput.style.backgroundColor="#F59487";
        esttime.style.backgroundColor="#F59487";
        var invalidLable = document.querySelector('#invalidInput');
        invalidLable.innerHTML = "Input invalid, try again"
        return false;
      }

      assignmentNameInput.style.backgroundColor="#white";
      dueDateInput.style.backgroundColor="#white";
      esttime.style.backgroundColor="#white";


    
    //Clears input from fields
    assignmentNameInput.value = ''; 
    dueDateInput.value = '';
    esttime.value ='';

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      var responseValue = response.text()
      return responseValue;
      

    }).then( function(responseValue){
      console.log("This is the response" + responseValue);
      var table = document.getElementById("todotable");
      buildTableOfEntries(table,responseValue);
      
    })

    return false
  }

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    

    fetch("/data")
    .then(function(response){
      var responseValue = response.text()
      return responseValue;
    }).then(function(responseValue) {
      var table = document.getElementById('todotable');
      buildTableOfEntries(table,responseValue);
    })

  }

function buildTableOfEntries(table, entries){
  table.innerHTML="";

  var headerRow = document.createElement("tr");
  headerRow.appendChild(newCell("Assignment","th"));
  headerRow.appendChild(newCell("Due Date","th"));
  headerRow.appendChild(newCell("Time Remaining","th"));
  headerRow.appendChild(newCell("Estimated Hours of Work","th"));
  table.appendChild(headerRow);

  JSON.parse(entries).forEach(element => {
    var rowNode = document.createElement("tr");
    rowNode.appendChild(newCell(element.assignmentname.toString(),"td"));
    rowNode.appendChild(newCell(element.dueDate.toString(),"td"));
    rowNode.appendChild(newCell(element.timeLeft.toString(),"td"))
    rowNode.appendChild(newCell(element.esttime.toString() + " Hours","td"));
    table.appendChild(rowNode);
  });
}

function newCell(text, type){
      var textNode = document.createTextNode(text);
      var cellNode = document.createElement(type);
      cellNode.appendChild(textNode);
      return cellNode;
}

