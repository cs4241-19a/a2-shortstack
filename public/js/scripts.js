var wrong = 0;

//to generate a new customer every so often
function generateCustomer(){
  let rand = random(1, 4);
  let date = new Date().getTime();
  let imgProperties = "";
  let orderProperties = "";
  if(rand === 1){
    imgProperties = "<img ondrop='duringDrop(event)' ondragover='allowDragging(event)' style='height:70px; width:50px;' src='../assets/chocolate.png' class='"+date+"'/>";
    orderProperties = "<li class='"+date+"'>CHOCOLATE</li>";
  }
  else if(rand === 2){
    imgProperties = "<img ondrop='duringDrop(event)' ondragover='allowDragging(event)' style='height:70px; width:50px;' src='../assets/cookie-dough.png' class='"+date+"'/>";
    orderProperties = "<li class='"+date+"'>COOKIE DOUGH</li>";
  }
  else if(rand === 3){
    imgProperties = "<img ondrop='duringDrop(event)' ondragover='allowDragging(event)' style='height:70px; width:50px;' src='../assets/vanilla.png' class='"+date+"'/>";
    orderProperties = "<li class='"+date+"'>VANILLA</li>";
  }
  else if(rand === 4){
    imgProperties = "<img ondrop='duringDrop(event)' ondragover='allowDragging(event)' style='height:70px; width:50px;' src='../assets/strawberry.png' class='"+date+"'/>";
    orderProperties = "<li class='"+date+"'>STRAWBERRY</li>";
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
    if (amount <= 0 || wrong === 2) {
      $('#YOULOSE').modal('show');
      //document.location.href = '/';
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
  updateBank(0);
  wrong = 0;
}

//function to update the score board in the server
function recordScore(){
  quit();
  let score = document.querySelector('#bills').innerHTML;
  let name = "";
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


//DRAGGING STUFF!!!!!!!


//function to allow dragging
function allowDragging(event){
  event.preventDefault();
}

//function that specifies what happens during drag
function duringDrag(event){
  event.dataTransfer.setData("text", event.target.id);
}

//function that handles the drop
function duringDrop(event){
  event.preventDefault();
  let id = "",
  data = event.dataTransfer.getData("text"),
  imgIndex = data.indexOf('/assets'),
  imgsrc = data.substring(imgIndex),
  clone = document.createElement("img");
  clone.setAttribute("src", imgsrc);
  let newfinished = document.createElement("LI");
  if (event.target.src.includes(imgsrc)){
    id = event.target.className;
    let json = { id: id},
    body = JSON.stringify( json )
    fetch( '/remove', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
  .then( promiseresponse => promiseresponse.json())
  .then(response => {
    document.querySelector('#line').innerHTML = response.images.join("");
    document.querySelector('#orders').innerHTML = response.orders.join("");
  })
    if(imgsrc.includes('chocolate')){
      updateBank(6);
      let textnode = document.createTextNode("CHOCOLATE: +$6");
      newfinished.appendChild(textnode);
      document.querySelector('#completed').appendChild(newfinished);
    }
    else if(imgsrc.includes('cookie-dough')){
      updateBank(6);
      let textnode = document.createTextNode("COOKIE DOUGH: +$6");
      newfinished.appendChild(textnode);
      document.querySelector('#completed').appendChild(newfinished);
    }
    else if(imgsrc.includes('vanilla')){
      updateBank(3);
      let textnode = document.createTextNode("VANILLA: +$3");
      newfinished.appendChild(textnode);
      document.querySelector('#completed').appendChild(newfinished);
    }
    else if(imgsrc.includes('strawberry')){
      updateBank(5);
      let textnode = document.createTextNode("STRAWBERRY: +$5");
      newfinished.appendChild(textnode);
      document.querySelector('#completed').appendChild(newfinished);
    }
  }
  else{
    wrong += 1;
    updateBank(-10);
    let textnode = document.createTextNode("WRONG KIND!: -$10");
    newfinished.appendChild(textnode);
    document.querySelector('#completed').appendChild(newfinished);
  }
}
