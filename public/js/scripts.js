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

//Function to control hide-how of entire database table
function diplayDataTable(data){
  document.getElementByID("Containter").innerHTML = ""
  updateDatabaseDisplayTable(data)
}

//Runs everytime the database is updated
function updateDatabaseDisplayTable(data){
    var html = "<table><th>Existing Data</th>"
    html += "<tr><td>Index</td><td>First Name></td><td>Last Name</td><td>Day of Birth</td><td>Month of Birth</td><td>Sign</td></tr>"
    for(let i = 0; i< data.length(); i++){
      html += "<tr>" 
      for( let j = 0; j < 6; j++){
        html += "<td>" + data[i][j] + "</td>"
      }
      html +="</tr>"
    }
    html += "</table>"
    
    document.getElementByID("Containter").innerHTML = html
  }