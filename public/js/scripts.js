
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    
    const   body = JSON.stringify( {
            firstNumber: document.querySelector("#firstNumber").value,
            operation: document.querySelector("#operator").value,
            secondNumber: document.querySelector("#secondNumber").value
          } )
          
    fetch( '/submit', {
      method:'POST',
      body, 
    })
    .then( function(response){ 
        fetch('/cal', {
            method: 'GET'
        }).then(function(response){
            response.json().then((data) => {
                loadTable(data)
            })
        })
    })
  
    return false
    
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }



const loadTable = function(data){
    //load the table with the current results 
    let dataTable = document.querySelector('#calculations');
  /*dataTable.innerHTML =
    '<tr>'+
       ' <th>Edit</th>' + ' <th> First Number</th>'+ ' <th> Operation</th>' +
      '<th>Second Number</th>' + '<th> Result </th>' + '<th>Delete</th>' +
    '</tr>\n'
*/
    let x; //first number 
    let y; //second number 
    let operator; //type of operation
    let result;
  
   console.log(data);
    for(let i = 0; i < data.length; i++){
        x = data[i].firstNumber;
        y = data[i].secondNumber;
        operator = data[i].operator;  
      console.log(x);

        //see what type of action we want to perform
        switch(operator){ //option in dropdown 
            case "1": //add 
            result = x+y;
            operator = '+';
            break;
            case "2": //subtract 
            result = x-y;
            operator = '-';
            break;
            case "3":  //mutliply 
            result = x*y;
            operator = 'X';
            break;
            case "4":  //divide 
            if(y == 0){ //cannot divide by zero 
              result = "undefined";
            }else {
              result = x/y;
            }
            operator = '/';
            break;
            default: 
            result = "cases are not working ";
            break; 
          }
          console.log(operator)
          console.log(result)
          //display row 
          dataTable.innerHTML =  '<tr>' + '<button class = "edit" onclick = "editExpression()">Edit</button>'+
          x + operator + y + result + '<button class = "delete" onclick = "delExpression()" > Delete </button>'
    }
}

const delExpression = function(index){
    const row = {row: index};
    const body = JSON.stringify(row);

    fetch('/delete', {
        method: 'POST',
        body
    })

    fetch('/cal', {
        method: 'GET'
    }).then(function(response){
        response.json().then((data) => {
            loadTable(data)
        })
    })

}

const editExpression = function(rowIndex){
  
    const newRow = {
        firstNumber: document.getElementById("firstNumber").value,
        operator: document.getElementById("operator").value,
        secondNumber: document.getElementById("secondNumber").value
    }
    newRow.index = rowIndex;
    const body = JSON.stringify(newRow);
    fetch('/edit', {
        method: 'POST',
        body
    }).then(function(response){
        response.json().then((data) => {
            loadTable(data)
        })
    })
    return false
}