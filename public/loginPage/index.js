  const loginAction = function( e ) {
    e.preventDefault()
    console.log("Button pushed")
    
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    
    let json = { username: username.value, password: password.value };
    let body = JSON.stringify(json);
    console.log(body)
    fetch('/login', {
            method: 'POST',
            body : body,
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => res.json())
          .then(res => {
              console.log(res)
              location.href = './homePage/home.html'
          })
          .catch(err => {
              console.log(err)
          })
      return false;
  };

  window.onload = function() {
    console.log("index.html: javascript loading")
    
    const loginButton = document.querySelector('#login');
    loginButton.onclick = loginAction;
  }