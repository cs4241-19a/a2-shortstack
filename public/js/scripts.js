// Add some Javascript code here, to run on the front end.
const resetForm = () => {
      document.getElementById('yourname').value = "";
      document.getElementById('phone').value = "";
      document.getElementById('salmon').checked = true;
      document.getElementById('sashimi').checked = true;
      document.getElementById('number-order').value = "";
    
  };

  window.onload = function() {
    const button = document.querySelector( '.submit' );
    button.onclick = submitForm;
    const button2= document.querySelector('.findorder');
    button2.onclick = findOrder;
    const button3= document.querySelector('.modifyBtn');
    button3.onclick = modifyOrder;
    
    const ordertext = document.getElementById("nav-order");
    ordertext.onclick = viewOrder;
    const findtext = document.getElementById("nav-find");
    findtext.onclick = viewFind;
  }

  const modifyOrder = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();
    
    const moddedOrder = {
      name: document.getElementById('yourname').value,
      phone: document.getElementById('phone').value,
      fish: document.querySelector('input[name="fish"]:checked').value,
      style: document.querySelector('input[name="style"]:checked').value,
      amount: document.getElementById('number-order').value,
      orderID: document.getElementById('orderID').value
    };
    
    const body = JSON.stringify( moddedOrder );
 
    fetch( '/update', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse
      alert("Your order number " + moddedOrder.orderID + " has been modified!");
      viewOrder();
      resetForm();
    })

    return false;
  }
  
  const submitForm = async function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();
    
    const response = await fetch('/tickets', {
        method: 'GET',
      });
      
      const data = await response.json();
      const tickets = data.data;
    
    const incomingOrder = {
      name: document.getElementById('yourname').value,
      phone: document.getElementById('phone').value,
      fish: document.querySelector('input[name="fish"]:checked').value,
      style: document.querySelector('input[name="style"]:checked').value,
      amount: document.getElementById('number-order').value
    };
    
    const body = JSON.stringify( incomingOrder );
 
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse
      alert("Your order has been submitted!\n Your Order ID is " + tickets.length + "!");
      resetForm();
    })

    return false;
  }
  
  const findOrder = async function(){

    try {
      const response = await fetch('/tickets', {
        method: 'GET',
      });
      
      const data = await response.json();
      const tickets = data.data;
      
      const orderNumber = document.getElementById('order-number').value;

      var i = 0;
      var found=0;
      for(i=0; i<tickets.length;i++){
        if(tickets[i].orderID == orderNumber){
          const order = tickets[i];
          found = 1;
          document.getElementById("showOrder").style.display = "block";
          document.getElementById("tOrderID").innerHTML=orderNumber;
          document.getElementById("tFish").innerHTML=order.fish;
          document.getElementById("tStyle").innerHTML=order.style;
          document.getElementById("tQuantity").innerHTML=order.amount;
          document.getElementById("tTotal").innerHTML=order.price;
          
          document.getElementById("nodeGoto")
          document.getElementById("modifyBtnLol").addEventListener("click", function() {
    openMod(order);
}, false);
          
          document.getElementById("deleteBtn").addEventListener("click", function() {
    deleteOrder(order);
}, false);
        }
      }
      
      if(found == 0){
        alert("Your order cannot be found!");
      }
      
    } catch(error){
      console.log(error);
      }
  }
  
    const deleteOrder = function (order) {

      const body = JSON.stringify(order);
      fetch('/delete', {
        method: 'POST',
        body
      });
      viewOrder();
    };
  
  
  const viewOrder = function(){

    document.getElementById("findOrderForm").style.display = "none";
    document.getElementById("orderForm").style.display = "flex";
    document.getElementById("showOrder").style.display = "none";
    document.getElementById("modifyBtn").style.display = "none";
    document.getElementById("modifyView").style.display = "none";
    document.getElementById("submitBtn").style.display = "flex";
  }
  
  const viewFind = function(){
document.getElementById("showOrder").style.display = "none";
    document.getElementById("modifyView").style.display = "none";
    document.getElementById("orderForm").style.display = "none";
    document.getElementById("findOrderForm").style.display = "flex";
  }
  
  const openMod = function(ticket){
    document.getElementById("findOrderForm").style.display = "none";
    document.getElementById("orderForm").style.display = "flex";
    document.getElementById("showOrder").style.display = "none";
    document.getElementById("modifyView").style.display = "flex";
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("modifyBtn").style.display = "flex";
    
          document.getElementById("yourname").value = ticket.name;
    document.getElementById("phone").value = ticket.phone;
          if( ticket.fish === 'tuna'){
            document.getElementById('tuna').checked = true;
          }
          if(ticket.style === 'sashimi'){
            document.getElementById('sashimi').checked = true;
          }
          document.getElementById("number-order").value = ticket.amount;
          document.getElementById("orderID").value = ticket.orderID;

  }