console.log("javascript file: 'index.js' being read");

const username = document.querySelector('#username')
const password = document.querySelector('#password')

const loginAction = function(e) {
  e.preventDefault()
  const json = { username: username.value, password: password.value };
  const body = JSON.stringify(json);
  fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
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


const loginButton = document.getElementById('login');
loginButton.onclick = loginAction;