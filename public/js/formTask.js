const back = function( e ) {
    window.location = "/"
    return false
}

window.onload = function() {
    fetch( '/receive')
        .then( function( response ) {
            // do something with the reponse
           return response.json();
        }).then(function (response){
        var n = localStorage.getItem('myName')
        var b = localStorage.getItem('myBoard')
        console.log(n)
        console.log(response)
        document.getElementById('nav').style.backgroundColor = response.users[n][b].color;
        document.getElementById('bName').innerText = JSON.stringify(response.users[n][b].boardName).replace(/^"(.*)"$/, '$1');
        document.getElementById('usrTxt').innerText = JSON.stringify(response.users[n][b].username).replace(/^"(.*)"$/, '$1');
        console.log( "get response: ", response )
    })

    const button = document.querySelector( 'button' )
    button.onclick = back
};