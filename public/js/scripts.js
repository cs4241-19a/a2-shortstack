//to generate a new customer every so often
function generateCustomer(){
  var rand = random(1, 4);
  var newEl = document.createElement('div');
  var divString = "";
  //var customer = document.createElement("IMG");
  var order = document.createElement("P");
  if (rand === 1) {
    divString="<div style='display: inline;'><img ondrop='duringDrop(event)' ondragover='allowDragging(event)' style='height:70px; width:50px;' src='../assets/chocolate.png'/></div>";
    newEl.innerHTML = divString;
    order.innerHTML = "CHOCOLATE";
  }
  else if (rand === 2){
    divString="<div style='display: inline;'><img ondrop='duringDrop(event)' ondragover='allowDragging(event)' style='height:70px; width:50px;' src='../assets/cookie-dough.png'/></div>";
    newEl.innerHTML = divString;
    order.innerHTML = "COOKIE DOUGH";
  }
  else if (rand === 3) {
    divString="<div style='display: inline;'><img ondrop='duringDrop(event)' ondragover='allowDragging(event)' style='height:70px; width:50px;' src='../assets/vanilla.png'/></div>";
    newEl.innerHTML = divString;
    order.innerHTML = "VANILLA";
  }
  else if (rand === 4) {
    divString="<div style='display: inline;'><img ondrop='duringDrop(event)' ondragover='allowDragging(event)' style='height:70px; width:50px;' src='../assets/strawberry.png'/></div>";
    newEl.innerHTML = divString;
    order.innerHTML = "STRAWBERRY";
  }
  document.querySelector("#line").appendChild(newEl.firstChild);
  document.querySelector('#orders').appendChild(order);
}

//generate a random number
function random(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//update my money
function updateBank(num) {
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
})
return false;
}

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
  var data = event.dataTransfer.getData("text");
  var imgIndex = data.indexOf('/assets');
  var imgsrc = data.substring(imgIndex);
  var clone = document.createElement("img");
  clone.setAttribute("src", imgsrc);
  if (event.target.src.includes(imgsrc)){
    event.target.parentNode.removeChild(event.target);
    if(imgsrc.includes('chocolate')){
      updateBank(6);
    }
    else if(imgsrc.includes('cookie-dough')){
      updateBank(6);
    }
    else if(imgsrc.includes('vanilla')){
      updateBank(3);
    }
    else if(imgsrc.includes('strawberry')){
      updateBank(5);
    }
    else{
      updateBank(4);
    }
  }
  else{
    updateBank(-10);
  }
}

function buttonPress(id){
  var audio = document.getElementById(id);
  audio.play();
}
