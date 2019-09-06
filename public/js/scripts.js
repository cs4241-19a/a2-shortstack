// Add some Javascript code here, to run on the front end.

 //FUNCTION TO CONROL Hide-Show of ADD NEW FORM
    function displayNewForm(){
      var form = document.getElementById("newForm");
      console.log(form.style.display)
      if(form.style.display === "none"){
        form.style.diplay = "block";
        console.log("CHANGED" + form.style.display)

      }
      else{
        console.log("HIDE")
        form.style.display = "none";
      }
    }