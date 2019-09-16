  const loginAction = function( e ) {
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    const state  = document.querySelector('#state')
    
    let body = { username: username.value, password: password.value };
    console.log(body);
    fetch('/login', {
            method: 'POST',
            body : JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
          })
          .then( response => {
                response.json()
          })
          .then( response => {
              console.log(response)
              location.href = './homePage/home.html'
          })
          .catch(err => {
              console.log(err)
              state.innerHTML = "Incorrect Username or Password";
          })
        e.preventDefault()    

      return false;
  };

  window.onload = function() {
    console.log("index.html: javascript loading")
    
    const loginButton = document.querySelector('#login');
    loginButton.onclick = loginAction;
  }