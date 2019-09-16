const occupyStudents = function( e ) {
  fetch('/occupyStudents', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(function(response) {
    console.log(response)
    return response.json();
  }).then(function(data) {
    let students = data;
    
    
  })
}


const addStudent = function( e ) {
  e.preventDefault()
  console.log("Add Student")
  
    const firstName = document.querySelector('#first').value
    const lastName = document.querySelector('#last').value
    const grade = 100
    
    const info = {first: firstName, last: lastName, grade: grade}
    const body = JSON.stringify(info)
    
    fetch('/addStudent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }).then(function( response ) {
      
    })
        
    
    fillStudentInfo(firstName, lastName, grade);
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

  row.appendChild(cell_firstName)
  row.appendChild(cell_lastName)
  row.appendChild(cell_grade)
  start.appendChild(row) 

}
  
  



window.onload = function() {
  console.log("home.html: javascript loaded")
  
  const addButton = document.querySelector("#addStudent");
  addButton.onclick = addStudent

}