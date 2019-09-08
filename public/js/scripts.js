const generate = function(e) {
  // prevent default form action from being carried out
  e.preventDefault()

  function getOption(){
    let element = document.getElementById("drawType");
    return element.options[element.selectedIndex].text
  }
  
  const input = {
    vertices: document.getElementById("vertices").value,
    drawType: getOption(),
    name: document.getElementById("name").value
  };
  const body = JSON.stringify( input )
  
  fetch( '/generate', {
    method:'POST',
    body 
  })
  .then( function( response) {
    // do something with the reponse 
    fetch( '/getDrawings', {
      method: 'GET'
    })
    .then( function( response) {
      return response.json()
    })
    .then( function(list){
      console.log(list)
    })
  })
  
 
  
  return false
}

window.onload = function() {
  const genBtn = document.getElementById("generate")
  genBtn.onclick = generate
}