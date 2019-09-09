const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    var body;

    const inputName = document.querySelector( '#userName'),
        inputFName = document.querySelector( '#FName'),
        selectColor = document.querySelector('#color'),
        boardName = document.querySelector('#board'),
        json = { name: inputName.value, fullname: inputFName.value, Color: selectColor.value, Board: boardName.value }

    const signName = document.querySelector('#userN'),
        signBoard = document.querySelector('#boardName'),
        jsonSign = { name: signName.value, Board: signBoard.value }

    window.localStorage

    if(inputName.value === '' && signName.value !== '') {
        body = JSON.stringify( jsonSign )
        localStorage.setItem('myName', signName.value)
        localStorage.setItem('myBoard', signBoard.value)
    } else if(inputName.value !== '' && signName.value === '') {
        body = JSON.stringify( json )
        localStorage.setItem('myName', inputName.value)
        localStorage.setItem('myBoard', boardName.value)
    } else {
        console.log('error')
    }

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( function( response ) {
            // do something with the reponse
            console.log( "post response: ", response )
        })

    window.location = "/task.html"
    return true
}

const res = function( e ) {
    e.preventDefault();
    window.location = "/results.html"
    return true
}

window.onload = function() {
    const button = document.getElementById('continueBtn')
    button.onclick = submit

    const button1 = document.getElementById('resBtn')
    button1.onclick = res
    }