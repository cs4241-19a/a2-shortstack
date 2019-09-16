






const occupyTable = function() {
  
}



const addStudent = function( e ) {
    e.preventDefault()
    console.log("Add Student")
  
    const firstName = document.querySelector('#first')
    const lastName = document.querySelector('#last')

    var start = document.querySelector("thead")
    var row = document.createElement("tr")

    var first = document.createTextNode(firstName)
    var last = document.createTextNode(lastName)
    var grade = document.createTextNode("100")
    var button = document.createElement("button")
    button.setAttribute('type', "button")
    button.setAttribute('class', "close")
    button.setAttribute('aria-label', "close")
    var button_content = document.createElement("span")
    button_content.setAttribute('aria-hidden', "true")
    var button_text = document.createTextNode('&times;')
    button_content.appendChild(button_text)
    button.appendChild(button_content)
    
    var cell_fn = document.createElement("td")
    var cell_ln = document.createElement("td")
    var cell_grd = document.createElement("td")
    var cell_btn = document.createElement("td")
  
  
    var cell_firstName = cell_fn.appendChild(first)
    var cell_lastName = cell_ln.appendChild(last)
    var cell_grade = cell_grd.appendChild(grade)
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