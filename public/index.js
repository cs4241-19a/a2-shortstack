

const loginAction = function( e ) {
    e.preventDefault()
  
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const state  = document.querySelector('#state')  
    
    const body = { username: username, password: password };
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
    console.log("index.html: javascript loaded")

    const loginButton = document.querySelector('#login');
    loginButton.onclick = loginAction;
}