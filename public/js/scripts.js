window.onload = setGreeting;
function setGreeting(){
    let greeting = document.getElementById('headerGreeting');
    let name = localStorage.getItem('nick')
    if (name !== null){
        greeting.innerText = `Hello ${name}`;
    }
}