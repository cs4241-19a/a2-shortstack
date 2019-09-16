






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

    var cell_firstName = document.createElement("td").appendChild(first)
    var cell_lastName = document.createElement("td").appendChild(last)
    var cell_grade = document.createElement("td").appendChild(grade)
    var cell_grade = document.createElement("td").appendChild(grade)

    
  
      
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
      
      divNode.setAttribute('id')
      divNode.appendChild(timeNode)
      divNode.appendChild(breakNode1)
      divNode.appendChild(textNode)

      dayCol.appendChild(divNode)
      dayCol.appendChild(breakNode)
    
    
};


window.onload = function() {
  console.log("home.html: javascript loaded")
  
  occupyTable();
  
  
  const addButton = document.querySelector("#addStudent");
  addButton.onclick = addStudent

}