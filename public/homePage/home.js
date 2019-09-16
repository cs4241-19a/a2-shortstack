






const occupyTable = function() {
  
}



const addStudent = function( e ) {
    e.preventDefault()
    console.log("Add Student")
  
    const firstName = document.querySelector('#first').value
    const lastName = document.querySelector('#last').value

    var start = document.querySelector("tbody")
    var row = document.createElement("tr")

    var del = document.createTextNode("1")
    var first = document.createTextNode(firstName)
    var last = document.createTextNode(lastName)
    var grade = document.createTextNode("100")
    var button = document.createElement("button")
    button.setAttribute('type', "button")
    button.setAttribute('class', "close")
    button.setAttribute('aria-label', "close")
    button.innerHTML = '&times;'
    
    var cell_firstName = document.createElement("td")
    cell_firstName.innerHTML = firstName
    cell_firstName.setAttribute("scope", "row")
    var cell_lastName = document.createElement("td")
    cell_lastName.innerHTML = lastName
    var cell_grade = document.createElement("td")
    cell_grade.innerHTML = "100"
    var cell_button = document.createElement("td")
    var cell_button = cell_btn.appendChild(button)

    
    
    row.appendChild(cell_firstName)
    row.appendChild(cell_lastName)
    row.appendChild(cell_grade)
    row.appendChild(cell_button)
    start.appendChild(row) 
    
      /*
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>90</td>
          <td>
            <button type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </td>
          
        </tr>
      */

    
    
};


window.onload = function() {
  console.log("home.html: javascript loaded")
  
  occupyTable();
  
  
  const addButton = document.querySelector("#addStudent");
  addButton.onclick = addStudent

}