window.onload = function() {
    fetch( '/receive')
        .then( function( response ) {
            // do something with the reponse
           return response.json();
        }).then(function (response){
        var n = localStorage.getItem('myName')
        console.log(n)
        console.log(response)
        document.getElementById('name').style.backgroundColor = response.users[n].color;
        console.log( "get response: ", response )
    })
    };