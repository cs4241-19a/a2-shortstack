var wrong = 0;
var open = false;

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
    if(response.images.length > 10){
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
    if (amount < 0 || wrong >= 2) {
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
  let element = "<tr><td>"+name+"</td><td>"+score+"</td></tr>";
  let json = { entry: element},
  body = JSON.stringify( json )
  fetch( '/submit', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
  .then(response => response.json())
  .then( response => {
    loadScoreBoard(response);
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
