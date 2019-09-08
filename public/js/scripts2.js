// this function is used to create a table with the user's inputted data
function tableFunction(text1,text2,text3,text4,text5){
      const table = document.getElementById("table");
      let rowCount = table.rows.length;
      let row = table.insertRow(rowCount);
      let row2 = table.insertRow(rowCount +1);
      const product = row.insertCell(0);
      const num= row.insertCell(1);
      const priceProducts = row.insertCell(2);
      const total = row.insertCell(3);
      product.innerHTML = text1;
      num.innerHTML = text2;
      priceProducts.innerHTML = "$" + text3;
      total.innerHTML = "$" + text4;
      
      /*cells will be inserted and the final cell will display the overall 
        total of all the products in the list */
      let t = table.rows[rowCount +1].cells.length;
      if ( t === 0){
        row2.insertCell(0);
        row2.insertCell(1);
        row2.insertCell(2);
        row2.insertCell(3);
        table.rows[rowCount+1].cells[0].style = "background-color:rgba(0,0,0,0); border: 0"; //used to create transparent cells
        table.rows[rowCount+1].cells[1].style = "background-color:rgba(0,0,0,0); border: 0";
        table.rows[rowCount+1].cells[2].style = "background-color:rgba(0,0,0,0); border: 0";
        table.rows[rowCount+1].cells[3].innerHTML = text5;
      }
  
      /*this is used so that the first entry does not delete the first main 
      headers of the table and that each cell that displays the previous final overall cost cell
      is deleted and updated with a new one wit a different value*/ 
      if(rowCount > 2){
        table.deleteRow(rowCount-1)
      }
      else {
        table.rows[rowCount+1].cells[3].innerHTML = text5
      }
    }   

//gives the user the ability to go back to the original page


    window.onload = function() {
      let finalTotal = 0;
      
      fetch( '/getrequest', { //interacts with server
      method:'GET' 
    })
    .then( function( response ) {
      
      return response.text()
    })
      .then(function(response){
      
        const responseArray = JSON.parse(response)
        
        for(let responselog of responseArray ){
          const totalPrice = (responselog.numProducts * responselog.price).toFixed(2)
          
          finalTotal = (finalTotal + Number(totalPrice));
        
        tableFunction(responselog.productName,
                      responselog.numProducts,
                      responselog.price,
                     totalPrice,
                     "$" +finalTotal.toFixed(2));
          }
        })
  }