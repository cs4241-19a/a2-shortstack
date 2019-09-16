

const loginAction = function( e ) {
    e.preventDefault()
    console.log("Button pushed")
  
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    const state  = document.querySelector('#state')  
    
    const body = { username: username.value, password: password.value };
    console.log(body);
    fetch('/login', {
            method: 'POST',
            body : JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
          })
          .then( response => {
                console.log(response)
                return response.json()
          })
          .then( response => {
              console.log(response)
              location.href = './homePage/home.html'
          })
          .catch(err => {
              console.log(err)
              state.innerHTML = "Incorrect Username or Password";
          })
      return false;
};

  window.onload = function() {
    console.log("index.html: javascript loading")
    
    const loginButton = document.querySelector('#login');
    loginButton.onclick = loginAction;
  }