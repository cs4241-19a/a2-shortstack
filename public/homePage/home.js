






const occupyTable = function() {
  
}



const addStudent = function( e ) {
    e.preventDefault()
    console.log("Add Student")
  
    const firstName = document.querySelector('#first')
    const lastName = document.querySelector('#last')

    var start = document.querySelector(".boardsection[data-board='"+  +"'] .tasklist")
    
      var first = document.createTextNode(firstName)
      var last = document.createTextNode(lastName)
      var divNode = document.createElement("div")
      var breakNode = document.createElement("br")
      var breakNode1 = document.createElement("br")
      divNode.setAttribute('id', index)
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