
// order form fields
var yourname = document.getElementById('name')
var phone = document.getElementById('phone')
var potato = document.getElementById('potato')
var seasoning = document.getElementById('seasoning')
var size = document.getElementById('size')

// keeps track of latest order number
var orderNum = 0;

// add order to server queue table
const submit = function( e ) {

    // prevent default form action from being carried out
    e.preventDefault()
    const yourname = document.querySelector( '#name' ),
          phone = document.querySelector( '#phone' ),
          potato = document.querySelector( '#potato' ),
          seasoning = document.querySelector( '#seasoning' ),
          size = document.querySelector( '#size' )

    // calculate cost of order
    var cost = calculateCost(potato.value, seasoning.value, size.value);

    // increment order number for a new order
    orderNum++;

    console.log("Order #" + orderNum + " Cost = $" + cost);

    const json = { yourname: yourname.value, phone: phone.value, potato: potato.value, seasoning: seasoning.value, size: size.value, cost: cost, orderNum: orderNum},
          body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body
    })

    .then( function( response ) {
      // do something with the reponse
      console.log( response )
    })

    resetForm();

    return false
}

// submit button
window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
}

// resets form fields
function resetForm() {
  yourname.value = 'John Doe';
  phone.value = "123-456-7890";
  potato.value = "yellow";
  seasoning.value = "none";
  size.value = "small";
  console.log("Form fields reset");
}

// calculates order Cost
function calculateCost(potato, seasoning, size) {
  var cost = 0;

  // potato keys
  switch(potato) {
    case "yellow":
      cost += 3;
      break;
    case "red":
      cost += 4;
      break;
    case "idaho":
      cost += 5;
      break;
    case "sweet":
      cost += 6;
      break;
    default:
      console.log("Potato Error");
  }

  // seasoning keys
  switch(seasoning) {
    case "none":
      cost += 0;
      break;
    case "salt":
      cost += 1;
      break;
    case "pepper":
      cost += 1;
      break;
    case "snp":
      cost += 2;
      break;
    case "cajun":
      cost += 3;
      break;
    case "guys":
      cost += 3;
      break;
    case "original":
      cost += 3;
      break;
    default:
      console.log("Seasoning Error");
  }

  // size keys
  switch(size) {
    case "small":
      cost = cost*1;
      break;
    case "medium":
      cost = cost*1.5;
      break;
    case "large":
      cost = cost*2;
      break;
    default:
      console.log("Size Error");
  }

  return cost;
}

console.log("a2-jhyuen")
console.log("Welcome to Fantastic Fries!")
