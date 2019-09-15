console.log("/index.js being read");

const login = document.getElementById('login')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const hint = document.getElementById('hint')

const makeBody = function() {
    const json = { username: username.value, password: password.value };
    return JSON.stringify(json);
};
login.onclick = function(e) {
    fetch('/login', {
            method: 'POST',
            body: makeBody(),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            location.href = './tables/overview.html'
        })
        .catch(err => {
            console.log(err)
            hint.innerHTML = 'Invalid Input'
        })
    e.preventDefault();
    return false;
};