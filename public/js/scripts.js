//to generate a new customer every so often
function generateCustomer(){
  var rand = random(1, 4);
  var date = new Date().getTime();
  var imgProperties = "";
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
  const json = {img: imgProperties, order: orderProperties};
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
    const json = { amount: num},
    body = JSON.stringify( json )
    fetch( '/updateBank', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body
    })
  .then( promiseresponse => promiseresponse.json())
  .then(response => {
    document.querySelector('#bills').innerHTML = response.result;
    /*var amount = Number(document.querySelector('#bills').innerHTML);
    if (amount < 0) {
      alert('you lose!');
      document.location.href = '/';
    }*/
  })
  return false;
  }
  else{
    const json = { amount: num},
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
  var id = "";
  var data = event.dataTransfer.getData("text");
  var imgIndex = data.indexOf('/assets');
  var imgsrc = data.substring(imgIndex);
  var clone = document.createElement("img");
  clone.setAttribute("src", imgsrc);
  var newfinished = document.createElement("LI");
  if (event.target.src.includes(imgsrc)){
    id = event.target.className;
    const json = { id: id},
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
      var textnode = document.createTextNode("CHOCOLATE: +$6");
      newfinished.appendChild(textnode);
      document.querySelector('#completed').appendChild(newfinished);
    }
    else if(imgsrc.includes('cookie-dough')){
      updateBank(6);
      var textnode = document.createTextNode("COOKIE DOUGH: +$6");
      newfinished.appendChild(textnode);
      document.querySelector('#completed').appendChild(newfinished);
    }
    else if(imgsrc.includes('vanilla')){
      updateBank(3);
      var textnode = document.createTextNode("VANILLA: +$3");
      newfinished.appendChild(textnode);
      document.querySelector('#completed').appendChild(newfinished);
    }
    else if(imgsrc.includes('strawberry')){
      updateBank(5);
      var textnode = document.createTextNode("STRAWBERRY: +$5");
      newfinished.appendChild(textnode);
      document.querySelector('#completed').appendChild(newfinished);
    }
    else{
      updateBank(4);
    }
  }
  else{
    updateBank(-10);
    var textnode = document.createTextNode("WRONG KIND!: -$10");
    newfinished.appendChild(textnode);
    document.querySelector('#completed').appendChild(newfinished);
  }
}
