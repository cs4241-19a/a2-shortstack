
const occupyStudents = function( e ) {
  fetch('/occupyStudents', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(function(response) {
    console.log(response)
    return response.json();
  }).then(function(data) {
    let students = data;
    let i 
    for(i = 0; i < students.length; i++) {
      let student = students[i]
      let assignments = student.assignments
      var grade = gradeCalc(assignments)
      fillStudentInfo(student.first, student.last, grade)
    }
    console.log(students)
  })
}

const gradeCalc = function( assignments ) {
  var sum = 0
  let i 
  if(assignments) {
    for(i = 0; i < assignments.length; i++){
      sum += parseInt(Object.values(assignments[i]))
    }
    return (sum/assignments.length).toFixed(2)
  }
  else
    return 0
}


const addStudent = function( e ) {
  e.preventDefault()
  console.log("Add Student")
  
    const firstName = document.querySelector('#first').value
    const lastName = document.querySelector('#last').value
    const grade = 0
    
    const info = {first: firstName, last: lastName, grade: grade}
    const body = JSON.stringify(info)
    
    fetch('/addStudent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }).then(function( response ) {
      console.log(response)
      fillStudentInfo(firstName, lastName, grade);
    })
       
  return false;
}

const removeStudent = function( first, last ) {
  console.log("Remove Student")
  const info = {first: first, last: last }
  const body = JSON.stringify(info)
  fetch('/deleteStudent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  }).then(function(response) {
    console.log(response)
  })
}

const getStudentInfo = function( ) {
  console.log("Retrieve Student Information")
  
}


const fillStudentInfo = function( firstName, lastName, grade ) {  
  var start = document.querySelector("tbody")
  var row = document.createElement("tr")

  var cell_firstName = document.createElement("td")
  cell_firstName.innerHTML = firstName
  cell_firstName.setAttribute("scope", "row")
  var cell_lastName = document.createElement("td")
  cell_lastName.innerHTML = lastName
  var cell_grade = document.createElement("td")
  cell_grade.innerHTML = grade
  var cell_info = document.createElement("td")
  var cell_del = document.createElement("td")

  var info = document.createElement("button")
  info.setAttribute('type', 'button')
  info.setAttribute('class', 'btn btn-light .info')
  info.innerHTML = "Information"
  cell_info.appendChild(info)
  
  var button = document.createElement("button")
  button.setAttribute('type', 'delete')
  button.setAttribute('class', 'btn btn-danger remove')
  button.innerHTML = "Delete"
  cell_del.appendChild(button)
  
  row.appendChild(cell_firstName)
  row.appendChild(cell_lastName)
  row.appendChild(cell_grade)
  row.appendChild(cell_info)
  row.appendChild(cell_del)

  start.appendChild(row) 

}
  
window.onload = function() {
  console.log("home.html: javascript loaded")
  occupyStudents()
  
  const addButton = document.querySelector("#addStudent");
  addButton.onclick = addStudent

}
/*

    */
