// Some Javascript code here, to run on the front end.

let isHidden = true;

const submit = function( e ) { // submit request for a new or updated student's grades
  // prevent default form action from being carried out
  e.preventDefault()

  const nameInput = document.querySelector( '#yourname' ),
        gradeInput = document.querySelector( '#yourgrade' ),
        json = { yourname: nameInput.value,  yourgrade: gradeInput.value},
        body = JSON.stringify( json );

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // Inform the user of what the letter grade of the student is, and
    // refresh the table view with the new student in it
    console.log( response );
    response.json().then((data) => {
      console.log(data);
      document.getElementById("tablePrint").innerHTML = '<table></table>';
      if (!isHidden) {
        view(e);
      }
      alert("The grade of this student is : "
              + data.numericGrade + " (" + data.letterGrade + ")");
    });
  });
  return false;
}

const view = function(e) {
  e.preventDefault();
  let studentArray;

  const json = { view: "viewAll" },
        body = JSON.stringify( json );

  fetch( '/view', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // Fetch all students in the database to add to a table
    console.log( response );
    response.json().then((data) => {
      console.log(data);
      studentArray = data.studentArray;
      let numStudents = studentArray.length;
    let myTable = '<table class ="pageText"><tr><td>Name:</td>';
    myTable += "<td>Grade:</td>";
    myTable += "<td>Letter Grade:</td></tr>";
    for (let i = 0; i < numStudents; i++) { // Make the table with one row per student
      myTable += "<tr><td>" + studentArray[i].name + "</td>";
      myTable += "<td>" + studentArray[i].number + "</td>";
      myTable += "<td>" + studentArray[i].letter + "</td></tr>";
    }
    myTable += "</table>";
    document.getElementById("tablePrint").innerHTML = myTable;
    isHidden = false;
    });
  });
  return false;
}

const deleteFunc = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault();

  const removeInput = document.querySelector( '#removename' ),
        json = { removeName: removeInput.value},
        body = JSON.stringify( json );

  fetch( '/remove', {
    method:'DELETE',
    body 
  })
  .then( function( response ) {
    // Simply redisplay the table on the response after the deletion occurs
    // if it is not hidden
    console.log( response );
    response.json().then((data) => {
      console.log(data);
      document.getElementById("tablePrint").innerHTML = '<table></table>';
      if (!isHidden) {
        view(e);
      }
    });
  });
  return false;
}

const hide = function( e ) {
  e.preventDefault();
  document.getElementById("tablePrint").innerHTML = '<table></table>';
  isHidden = true;
}

window.onload = function() { // Link each button to its respective function
  const inButton = document.querySelector( '#inputButton' );
  const viButton = document.querySelector( '#viewButton' );
  const deButton = document.querySelector( '#removeButton' );
  const hiButton = document.querySelector( '#hideButton' );
  hiButton.onclick = hide;
  viButton.onclick = view;
  inButton.onclick = submit;
  deButton.onclick = deleteFunc;
}
