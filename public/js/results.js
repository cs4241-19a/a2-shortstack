window.onload = function(e){
    e.preventDefault()
      
    
    fetch('/getResults', {
        method: 'GET'
      }).then(function(response){
        response.json().then((responseData) => {
          console.log(responseData);
          makeTable(responseData);
        })
      })
    
      fetch('/getStuff', {
        method: 'GET'
      }).then(function(response){
        response.json().then((responseData) => {
          console.log(responseData);
          datafill(responseData);
        })
      })
      
      const button2 = document.querySelector('#tryagain');
      button2.onclick = tryagain;
    
      return false;
  }
  
  const tryagain = function(){
      location.href="index.html";
    }
  
  function datafill(responseData){
      document.getElementById("avgnamelength").innerHTML = "The average name is " + responseData.avgnamelength + " characters long!";
      document.getElementById("avgname").innerHTML = "The average name is: "+ responseData.avgname;
      document.getElementById("avgage").innerHTML = "The average quiz taker's age is: "+responseData.avgage;
      document.getElementById("avgcolor").innerHTML = "The average favorite color is: "+responseData.avgcolor +"!<span style='background:"+responseData.avgcolor+";width:50px;height:16px;border:3px solid #000;display:inline-block;'></span>";
      document.getElementById("avgmood").innerHTML = "The average person taking this suvery is having a " + responseData.avgmood+" out of 5 kind of time";
    }
  
  function makeTable(responseData){
    var html = "<tbody><tr><td>First Name</td><td>Last Name</td><td>Birthday</td><td>Favorite Color</td><td>How they are feeling</td></tr>";
    for(var i =0;i<responseData.length;i++){
      html+="<tr>";
      html+="<td>"+responseData[i].fname+"</td>";
      html+="<td>"+responseData[i].lname+"</td>";
      html+="<td>"+responseData[i].birthday+"</td>";
      html+="<td>"+responseData[i].color+"</td>";
      html+="<td>"+responseData[i].mood+"</td>";
      var names ={fname:responseData[i].fname.toString(), lname:responseData[i].lname.toString()};
      names = JSON.stringify(names);
      html+="<td><button onclick='deleteRequest("+names+")'>Delete</button></td>";
      html+="</tr>";
    }
    html+="</tbody>"
    document.getElementById("tabletime").innerHTML = html;
  }
  
  const datapage = function(){
      location.href="results.html";
    }
  
  function deleteRequest(toDelete){
    const formJSON = {
        fname: toDelete.fname,
        lname: toDelete.lname
      }
      
      const body = JSON.stringify(formJSON);
    
    fetch('/delete', {
        method: 'POST',
        body
      }).then(function(response){
        response.json().then((responseData) => {
          console.log(responseData);
          datapage();
        })
      })
  }