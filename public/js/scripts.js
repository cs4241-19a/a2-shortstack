// const submit = function( e ) {
//   // prevent default form action from being carried out
//   e.preventDefault()

//   const input = document.querySelector( '#yourname' ),
//         json = { yourname: input.value },
//         body = JSON.stringify( json )

//   fetch( '/submit', {
//     method:'POST',
//     body 
//   })
//   .then( function( response ) {
//     // do something with the reponse 
//     console.log( response )
//   })

//   return false
// }

// window.onload = function() {
//   const button = document.querySelector( 'button' )
//   button.onclick = submit
// }

const generate = function(e) {
  // prevent default form action from being carried out
  e.preventDefault()

  function getOption(){
    let element = document.getElementById("drawType");
    return element.options[element.selectedIndex].text
  }
  
  const input = {
    vertices: document.getElementById("veritces").value,
    drawType: getOption(),
    name: document.getElementById("name").value
  };
  const body = JSON.stringify( input )
  
  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse 
    console.log( response )
  })

  return false
}

window.onload = function() {
  const button = document.getElementById("generate")
  button.onclick = generate
}