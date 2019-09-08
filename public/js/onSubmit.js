const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let getTime = function(){
    let utctime = String(Date.now());
    try {
      utctime = document.querySelector( '#inputTime' ).value;
    } catch {}
    return utctime;
  }

    const title = document.querySelector( '#inputTitle' ),
          notes = document.querySelector( '#inputNotes' ),
          priority = document.querySelector( '#gridRadios1' ).checked ? 1 : 0 +
                      document.querySelector( '#gridRadios2' ).checked ? 2 : 0 +
                      document.querySelector( '#gridRadios3' ).checked ? 3 : 0,
          json = { title: title.value, 
                   notes: notes.value,
                   priority: priority,
                   time: (function(){
                    let utctime = String(Date.now());
                    try {
                      utctime = document.querySelector( '#inputTime' ).value;
                    } catch {}
                    return utctime;
                  })()
                  },
          body = JSON.stringify( json )

    if(title.value === '' || notes.value === ''){
      console.log('missing input')
      document.querySelector( '#validationBox' ).removeAttribute('hidden');
      return false;
    }

    console.log(body)
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