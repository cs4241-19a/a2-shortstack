window.onload = function() {
    fetch( '/receive')
        .then( function( response ) {
            // do something with the reponse
           return response.json();
        }).then(function (response){
        var n = localStorage.getItem('myName')
        console.log(n)
        console.log(response)
        document.getElementById('name').innerText = JSON.stringify(response.users[n].username);
        console.log( "get response: ", response )
    })
    };