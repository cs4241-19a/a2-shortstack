function loadRegister() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;

            if (user != null) {
                let name = document.getElementById("fn_field").value + " " + document.getElementById("ln_field").value;

                user.updateProfile({
                    displayName: name
                }).then(function() {
                    // Update successful.
                    console.log("success")
                    window.location = 'dashboard.html'; //After successful login, user will be redirected to home.html
                }).catch(function(error) {
                    console.log(error)
                    // An error happened.
                });

            }
        }
    });

    function register() {
        var email = document.getElementById("email_field").value;
        var password = document.getElementById("password_field").value;

        console.log(email, password);

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

}