var name = document.getElementById('name')
var phone = document.getElementById('phone')
var potato = document.getElementById('potato')
var seasoning = document.getElementById('seasoning')
var size = document.getElementById('size')

// add order to server queue table
const submit = function( e ) {

     // prevent default form action from being carried out
    e.preventDefault()
    const name = document.querySelector( '#name' ),
          phone = document.querySelector( '#phone' ),
          potato = document.querySelector( '#potato' ),
          seasoning = document.querySelector( '#seasoning' ),
          size = document.querySelector( '#size' ),
          json = { name: name.value, phone: phone.value, potato: potato.value, seasoning: seasoning.value, size: size.value},
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

// submit button
window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
}

console.log("Welcome to assignment 2!")
