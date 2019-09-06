const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const inputName = document.querySelector( '#userName'),
        inputEmail = document.querySelector( '#email'),
        selectColor = document.querySelector('#color'),
        boardName = document.querySelector('#board'),
        json = { name: inputName.value, email: inputEmail.value, Color: selectColor.value, Board: boardName.value },
        body = JSON.stringify( json )

    window.localStorage
    localStorage.setItem('myName', inputName.value)

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( function( response ) {
            // do something with the reponse
            console.log( "post response: ", response )
        })

    window.location = "/task.html"
    return false
}

window.onload = function() {
        const button = document.querySelector( 'button' )
        button.onclick = submit
    }