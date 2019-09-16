const occupyAssignments = function( e ) {
  e.preventDefault()
  fetch('/occupyAssignments', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(function(response) {
    console.log(response)
    return response.json();
  }).then(function(data) {
    let assignments = data;
    let i 
    for(i = 0; i < assignments.length; i++) {
      let assignment = assignments[i]
      //let assignments = student.assignments
      fillAssignment(assignment, assignment.value())
    }
    console.log(assignments)
  })
}

const addAssignment = function( e ) {
  e.preventDefault()
  console.log("Add Assignment")
  
  const assignment = document.querySelector('#assignment').value
  const grade = document.querySelector('#grade').value    

  const info = {assignment: assignment, grade: grade}
  const body = JSON.stringify(info)

  fetch('/addAssignment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  }).then(function( response ) {
    console.log(response)
    fillAssignment(assignment, grade);
  })
       
  return false;
}

const fillAssignment = function( assignment, grade ) {  
  var start = document.querySelector("tbody")
  var row = document.createElement("tr")

  var cell_assignment = document.createElement("td")
  cell_assignment.innerHTML = assignment
  cell_assignment.setAttribute("scope", "row")
  var cell_grade = document.createElement("td")
  cell_grade.innerHTML = grade
  var cell_del = document.createElement("td")

  var button = document.createElement("button")
  button.setAttribute('type', 'delete')
  button.setAttribute('class', 'btn btn-danger remove')
  button.innerHTML = "Delete"
  cell_del.appendChild(button)
  
  row.appendChild(cell_assignment)
  row.appendChild(cell_grade)
  row.appendChild(cell_del)

  start.appendChild(row) 

}

window.onload = function() {
  console.log("home.html: javascript loaded")
  //occupyStudents()
  
  const addButton = document.querySelector("#addAssignment");
  addButton.onclick = addAssignment

}