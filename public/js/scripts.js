const errorValidation = function(fname, lname, color, birthday, mood){
    var errors = [];
    if(fname === ""){
      errors.push("first name");
    }
    if(lname === ""){
      errors.push("last name");
    }
    if(color === ""){
      errors.push("color");
    }
    if(birthday === ""){
      errors.push("birthday");
    }
    if(mood===""){
      errors.push("mood");
    }
    var error = "*The ";
    if(errors.length>0){      
      for(var i = 0; i<errors.length;i++){
        error+=errors[i]+" ";
        if(i === errors.length-2){
          error+="and ";
        }
      }  
    error += " fields are required!"
    }
    return error;
  }
  
  const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    var fname = document.querySelector("#firstname").value;
    var lname = document.querySelector("#lastname").value;
    var color = document.querySelector("#favcolor").value;
    var birthday = document.querySelector("#birthday").value;
    var mood = document.querySelector(".mood input[type='radio']:checked");
    if(mood === null){
      mood = "";
    }else{
      mood = mood.value;
    }

    var error = errorValidation(fname, lname, color, birthday, mood);
    
    console.log(error);
    if(error === "*The "){
      document.getElementById("error").style.display = "none";
    }else{
      document.getElementById("error").style.display = "block";
      document.getElementById("error").innerHTML = error;
      return false;
    }
    
    const formJSON = {
      fname: fname,
      lname: lname,
      color: color,
      birthday: birthday,
      mood: mood
    }
    
    const body = JSON.stringify(formJSON);
    fetch('/submit', {
      method: 'POST',
      body
    }).then(function(response){
      response.json().then((responseData) => {
        console.log(responseData);
        datafill(responseData);
      })
    })
    
    document.getElementById("formzone").style.display="none";
    document.getElementById("resultszone").style.display="block";
    
    return false
  }
  
  function datafill(responseData){
    document.getElementById("yourname").innerHTML = "Your full name is: "+responseData.yourname+"!";
    document.getElementById("yourage").innerHTML = "You are "+responseData.yourage+" years old! (at least I think so)";    
    document.getElementById("yourcolor").innerHTML = "<b>Your favorite color is:</b> RGB"+responseData.color;
    document.getElementById("yourcolorR").innerHTML = responseData.yourcolorR+" percent red,";
    document.getElementById("yourcolorG").innerHTML = responseData.yourcolorG+" percent green, and";
    document.getElementById("yourcolorB").innerHTML = responseData.yourcolorB+" percent blue!";
    document.getElementById("yourmood").innerHTML = "<b>mood: </b>"+responseData.yourmood;
    document.getElementById("avgnamelength").innerHTML = "The average name is " + responseData.avgnamelength + " characters long!";
    document.getElementById("avgname").innerHTML = "The average name is: "+ responseData.avgname;
    document.getElementById("avgage").innerHTML = "The average quiz taker's age is: "+responseData.avgage;
    document.getElementById("avgcolor").innerHTML = "The average favorite color is: "+responseData.avgcolor +"!<span style='background:"+responseData.avgcolor+";width:50px;height:16px;border:3px solid #000;display:inline-block;'></span>";
    document.getElementById("avgmood").innerHTML = "The average person taking this suvery is having a " + responseData.avgmood+" out of 5 kind of time";
  }

  const datapage = function(){
    location.href="results.html";
  }
  
  const tryagain = function(){
    location.href="index.html";
  }
  
  window.onload = function () {
    const button = document.querySelector('#submitButton');
    button.onclick = submit;
    const button2 = document.querySelector('#tryagain');
    button2.onclick = tryagain;
    const button3 = document.querySelector('#viewresults');
    button3.onclick = datapage;
  }