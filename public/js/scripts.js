const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    const input = document.querySelector( '#productName' ),
          input2 = document.querySelector('#numProducts'),
          input3 = document.querySelector('#price');
          
          json = { productName: input.value,
                  numProducts: input2.value,
                  price:input3.value
                 };
          body = JSON.stringify( json );
    
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      
      return response.text()
    })
    .then(function(response){
         
        const responselog = JSON.parse(response)
      window.open("index2.html", "_self" );
          })
  
    //clears the input boxes when the user clicks the button
    document.getElementById('productName').value = '';
    document.getElementById('numProducts').value = '';
    document.getElementById('price').value = '';
  
    return false
  }

const deleteFn = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#productName2' ),
          input2 = document.querySelector('#numProducts2'),
          
          json = { productName: input.value,
                  numProducts: input2.value
                 };
  
          body = JSON.stringify( json ); //used to match with items in the total Array
    
    fetch( '/delete', {
      method:'DELETE', //calls for the server's delete function
      body 
    })
    .then( function( response ) {
      
      return response.text()
    })
    .then(function(response){
        
        window.open("index2.html", "_self" ); //this is used to go to the second web page
          })
  
  //clears the input boxes when the user clicks the button
    document.getElementById('productName2').value = '';
    document.getElementById('numProducts2').value = '';
  
    return false
  }

  window.onload = function() {
    const button = document.querySelector( "#addProductBtn" );
    const removeBtn = document.querySelector( "#removeBtn");
    button.onclick = submit;
    removeBtn.onclick = deleteFn;
  }

