const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#exampleInputEmail1' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the response 
      console.log( response )
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#submit' )
    button.onclick = submit
  }