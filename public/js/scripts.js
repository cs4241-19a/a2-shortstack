// Add some Javascript code here, to run on the front end.

 //Function to control hide-show of ADD NEW FORM
    function displayNewForm(){
      var form = document.getElementById("newForm");
      console.log(form.style.visible)
      if(form.style.visibility === 'visible'){
        form.style.visibility = 'hidden';
        console.log("CHANGED " + form.style.display)

      }
      else{
        console.log("HIDE")
        form.style.visibility = 'visible';
      }
    }
 
//Function to control hide-show of MOD DATA FORM
  function displayModifyForm(){
  
  }