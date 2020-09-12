// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    // const assignmentNameInput = document.querySelector( '#assignmentname' ),
    //       json = { assignmentname: assignmentNameInput.value },
    //       body = JSON.stringify( json )
    
    // const dueDateInput = document.querySelector( '#duedate' ),
    //       json2 = { duedate: dueDateInput.value },
    //       body2 = JSON.stringify( json2 )

    // const esttime = document.querySelector( '#esttime' ),
    //       json3 = { esttime: esttime.value },
    //       body3 = JSON.stringify( json3 )
          
    // var testjson = {assignmentname: assignmentNameInput.value, dueDate:dueDateInput.value, esttime:esttime.value}
    // var testbody = JSON.stringify(testjson);


    const assignmentNameInput = document.querySelector( '#assignmentname' ),
      dueDateInput = document.querySelector( '#duedate' ),
      esttime = document.querySelector( '#esttime' ),
      json={assignmentname: assignmentNameInput.value, dueDate:dueDateInput.value, esttime:esttime.value},
      body=JSON.stringify(json);


    //const payload = body.concat(body2,body3);

    //console.log("this is the body: " + payload);

    var table = document.getElementById("todotable");
    var rowNode = document.createElement("tr");

    rowNode.appendChild(newCell(assignmentNameInput.value.toString()));
    rowNode.appendChild(newCell(dueDateInput.value.toString()));
    rowNode.appendChild(newCell(stringTimeRemainingUntil(dueDateInput.value.toString())));
    rowNode.appendChild(newCell(esttime.value.toString() + " Hours"));

    table.appendChild(rowNode);
    
    //Clears input from fields
    assignmentNameInput.value = ''; 
    dueDateInput.value = '';
    esttime.value ='';

    fetch( '/submit', {
      method:'POST',
      body //testing sending multiple values
    })
    .then( function( response ) {
      var responseValue = response.json()

      console.log("This is the responce" + responseValue);

    })

    return false
  }

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    var table = document.getElementById('todotable');
  }


function newCell(text){
      var textNode = document.createTextNode(text);
      var cellNode = document.createElement("td");
      cellNode.appendChild(textNode);
      return cellNode;
}

function stringTimeRemainingUntil(date){
    var currentDate = new Date();
    var dueDate = getDate(date);
    return convertMS(Math.abs(dueDate-currentDate))
}

function convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return "Days: " + day + " Hours: " + hour + " Minutes: " + minute;
}

function getDate(date_string) {
    var date_components = date_string.split("-");
    var year = date_components[0];
    var month = date_components[1];
    var day = date_components[2];
    return new Date(year, month - 1, day);
  }