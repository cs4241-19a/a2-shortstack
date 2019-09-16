
const loginAction = function( e ) {
    e.preventDefault()
  
    const username = document.querySelector('#first')
    const password = document.querySelector('#last')
    
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
  console.log("home.html: javascript loading")
  
  const addButton = querySelector()

}