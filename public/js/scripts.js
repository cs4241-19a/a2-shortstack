var wrong = 0;
var open = false;
var currentrow = "";
var currentname = "";
var token = "";

//to generate a new customer every so often
function generateCustomer(){
  let rand = random(1, 4);
  let imgProperties = "";
  let orderProperties = "";
  if(rand === 1){
    imgProperties = "<img style='height:8vh; width:2.5vw;' src='../assets/chocolate.png'/>";
    orderProperties = "<li>CHOCOLATE</li>";
  }
  else if(rand === 2){
    imgProperties = "<img style='height:8vh; width:2.5vw;' src='../assets/cookie-dough.png'/>";
    orderProperties = "<li>COOKIE DOUGH</li>";
  }
  else if(rand === 3){
    imgProperties = "<img style='height:8vh; width:2.5vw;' src='../assets/vanilla.png'/>";
    orderProperties = "<li>VANILLA</li>";
  }
  else if(rand === 4){
    imgProperties = "<img style='height:8vh; width:2.5vw;' src='../assets/strawberry.png'/>";
    orderProperties = "<li>STRAWBERRY</li>";
  }
  let json = {img: imgProperties, order: orderProperties},
  body = JSON.stringify(json);
  fetch('/neworder', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
  .then (response => response.json())
  .then (response => {
    if(response.images.length > 15 || wrong >= 5){
      open = true;
      document.querySelector('#YOULOSE').showModal();
    }
    document.querySelector('#line').innerHTML = response.images.join("");
    document.querySelector('#orders').innerHTML = response.orders.join("");
  })
}

//generate a random number
function random(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//update my money
function updateBank(num) {
  if (num != 0){
    let json = { amount: num},
    body = JSON.stringify( json )
    fetch( '/updateBank', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then( promiseresponse => promiseresponse.json())
    .then(response => {
      document.querySelector('#bills').innerHTML = response.result;
      var amount = Number(document.querySelector('#bills').innerHTML);
      if (wrong >= 5) {
        open = true;
        document.querySelector('#YOULOSE').showModal();
      }
    })
    return false;
  }
  else{
    let json = { amount: num},
    body = JSON.stringify( json )
    fetch( '/reset', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then( promiseresponse => promiseresponse.json())
    .then(response => {
      document.querySelector('#bills').innerHTML = response.result;
    })
    return false;
  }
}

//function to reset info when quitting
function quit(){
  open = false;
  window.location = '/';
  updateBank(0);
  wrong = 0;
}

function chooseLevel(){
  const easy = document.querySelector('#easy');
  const moderate = document.querySelector('#moderate');
  const hard = document.querySelector('#hard');
  let speed = 0;
  if(easy.checked){
    speed = 1000;
  }
  else if(moderate.checked){
    speed = 600;
  }
  else if(hard.checked){
    speed = 200;
  }
  else{
    document.querySelector('#choose').showModal();
    setTimeout(function(){document.querySelector('#choose').close();}, 900);
    return;
  }
  let json = { speed: speed},
  body = JSON.stringify( json )
  fetch( '/spendSpeed', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
  window.location = '/game';
}

function go(){
  fetch( '/getSpeed', {
    method:'GET'
  })
  .then(promise => promise.json())
  .then(promise => {
    setInterval(generateCustomer, promise.speed);
  })
}
//function to update the score board in the server
function recordScore(){
  quit();
  let name = "";
  let score = document.querySelector('#bills').innerHTML;
  if(document.querySelector('#name').value){
    name = document.querySelector('#name').value;
  }
  else{
    name = "No Name";
  }
  let element = "<tr style='cursor:pointer' onclick='rowselect(event)'><td>"+name+"</td><td>"+score+"</td></tr>";
  let json = { entry: element},
  body = JSON.stringify( json )
  fetch( '/submit', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
}

//function to update the scoreboard on the front end
function loadScoreBoard(){
  fetch( '/loadscores', {
    method:'GET'
  })
  .then(response => response.json())
  .then( response => {
    document.querySelector('#table').innerHTML = response.result.join("");
  })
}

function rowselect(event){
  document.querySelector('#editform').showModal()
  currentrow = event.currentTarget.innerHTML;
  currentname = event.path[1].firstChild.innerHTML;
}

function modifyentry(){
  fetch( '/token', {
    method:'GET'
  })
  .then (response => response.json())
  .then (response => {
    if(response.token){
      token = response.token
    } else{
      alert('You haven\'t logged in yet!')
      return;
    }
    let text = document.querySelector('#modifiedvalue').value;
    let body = JSON.stringify({entry: currentrow, diffname: text, name: currentname})
    fetch('/modifyentry', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': token},
      body
    })
  })
}
function goBack(){
  fetch( '/erasetoken', {
    method:'GET'
  })
  window.location='/';
}
function deleteRow(){
  fetch( '/token', {
    method:'GET'
  })
  .then (response => response.json())
  .then (response => {
    if(response.token){
      token = response.token
    } else{
      alert('You haven\'t logged in yet!')
      return;
    }
    let body = JSON.stringify({entry: currentrow})
    fetch('/deleteentry', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': token},
      body
    })
    .then(
      alert('reload the page!')
    )
  })
}

function login(){
  if(document.querySelector('#username').value !== "" && document.querySelector('#password').value !== ""){
    let name = document.querySelector('#username').value
    let pass = document.querySelector('#password').value
    let json = { username: name, password: pass},
    body = JSON.stringify( json )
    fetch( '/login', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then (response => response.json())
    .then (response => {
      if (response.message){
        if(response.message === 'no user'){
          alert('No user with this username!');
        } else{
          alert('Wrong password!');
        }
      }
    })
  }
}


function makeMove(event){
  if(open === false){
    const move = event.which;
    let json = {move: move},
    body = JSON.stringify(json)
    fetch('/remove', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
    .then( response => response.json())
    .then(response => {
      const kind = response.kind;
      const list = document.querySelector('#completed');
      document.querySelector('#line').innerHTML = response.images.join("");
      document.querySelector('#orders').innerHTML = response.orders.join("");
      if(kind === "VN"){
        let newfinished = document.createElement("LI");
        let textnode = document.createTextNode("VANILLA: +$3");
        newfinished.appendChild(textnode);
        updateBank(3);
        list.appendChild(newfinished);
      }
      else if(kind === "CH"){
        let newfinished = document.createElement("LI");
        let textnode = document.createTextNode("CHOCOLATE: +$6");
        newfinished.appendChild(textnode);
        updateBank(6);
        list.appendChild(newfinished);
      }
      else if(kind === "ST"){
        let newfinished = document.createElement("LI");
        let textnode = document.createTextNode("STRAWBERRY: +$5");
        newfinished.appendChild(textnode);
        updateBank(5);
        list.appendChild(newfinished);
      }
      else if(kind === "CD"){
        let newfinished = document.createElement("LI");
        let textnode = document.createTextNode("COOKIE DOUGH: +$6");
        newfinished.appendChild(textnode);
        updateBank(6);
        list.appendChild(newfinished);
      }
      else{
        let newfinished = document.createElement("LI");
        let textnode = document.createTextNode("WRONG KIND!: -$10");
        wrong += 1;
        newfinished.appendChild(textnode);
        updateBank(-10);
        list.appendChild(newfinished);
      }
    })
  }
  else{}
}
