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
        
const url = function() {
  unsplash.search.photos("shopping", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
}

const randPhoto = function() {
  unsplash.search.photos("dogs", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
}

