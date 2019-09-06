const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();

    const input = document.querySelector( '#yourname' );
    const json = {
        user: input.value,
        password: "password"
    };
    const data = JSON.stringify( json );
    console.log("sending: ", data);

    const url = '/submit/create';
    let request = new Request(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(request);

    fetch(request)
        .then((resp) => resp.json())
        .then(function( data ) {
            // do something with the response
            console.log( data );
        })
        .catch(function (error) {
            console.log( error );
        });

    return false
};

window.onload = function() {
    const button = document.querySelector( 'button' );
    button.onclick = submit;
};