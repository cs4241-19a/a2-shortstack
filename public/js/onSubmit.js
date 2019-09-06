const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const title = document.querySelector( '#inputTitle' ),
          notes = document.querySelector( '#inputNotes' ),
          priority = document.querySelector( '#gridRadios1' ).checked ? 1 : 0 +
                      document.querySelector( '#gridRadios2' ).checked ? 2 : 0 +
                      document.querySelector( '#gridRadios3' ).checked ? 3 : 0,
          json = { title: title.value, 
                   notes: notes.value,
                   priority: priority },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the response 
      console.log( response )
    })

    window.location = '/'

    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#submit' )
    button.onclick = submit
  }