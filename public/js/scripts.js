// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

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
  const button = document.querySelector( 'button' )
  button.onclick = submit
}
