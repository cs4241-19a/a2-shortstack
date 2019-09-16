






const occupyTable = function() {
    //const body = { first: first.value, last: last.value, grade: grade.value };
    //console.log(body);
    fetch('/update', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
          .then( response => {
                console.log(response)
                return response.json()
          })
          .then( response => {
              console.log(response)
              location.href = './homePage/home.html'
          })
          .catch(err => {
              console.log(err)
              state.innerHTML = "Incorrect Username or Password";
          })
      return false;
  
  
}



const addStudent = function( e ) {
  e.preventDefault()
  console.log("Add Student")

  const firstName = document.querySelector('#first').value
  const lastName = document.querySelector('#last').value

  var start = document.querySelector("tbody")
  var row = document.createElement("tr")

  var cell_firstName = document.createElement("td")
  cell_firstName.innerHTML = firstName
  cell_firstName.setAttribute("scope", "row")
  var cell_lastName = document.createElement("td")
  cell_lastName.innerHTML = lastName
  var cell_grade = document.createElement("td")
  cell_grade.innerHTML = "100"

  row.appendChild(cell_firstName)
  row.appendChild(cell_lastName)
  row.appendChild(cell_grade)
  start.appendChild(row) 
    
};


window.onload = function() {
  console.log("home.html: javascript loaded")
  
  occupyTable();
  
  
  const addButton = document.querySelector("#addStudent");
  addButton.onclick = addStudent

}