// Add some Javascript code here, to run on the front end.

 //Function to control hide-show of ADD NEW FORM
    function displayNewForm(){
      var newForm = document.getElementById("newForm");
      var modForm = document.getElementById("modForm");
      modForm.style.display = 'none'
      if(newForm.style.display === 'none'){
        newForm.style.display = 'inline';
      }
      else{
        newForm.style.display = 'none';
      }
    }
 
//Function to control hide-show of MOD DATA FORM
  function displayModifyForm(){
    var newForm = document.getElementById("newForm");
    newForm.style.display = 'none'
    var modForm = document.getElementById("modForm");
    if(modForm.style.display === 'none'){
        modForm.style.display = 'inline';
      }
      else{
        modForm.style.display = 'none';
      }
  }

//Function to control hide-how of entire database table
function diplayDataTable(data){
  document.getElementById("Containter").innerHTML = ""
  updateDatabaseDisplayTable(data)
}

//Runs everytime the database is updated
function updateDatabaseDisplayTable(data){
    var html = "<table><tr><th" + " align=" + ">Existing Data</th></tr>"
    html += "<tr><td>Index</td><td>First Name</td><td>Last Name</td><td>Day of Birth</td><td>Month of Birth</td><td>Sign</td></tr>"
    for(let i = 0; i< Object.keys(data).length; i++){
      html += "<tr>" 
      html += "<td>" + i + "</td>"
      html += "<td>" + data[i].fName + "</td>"
      html += "<td>" + data[i].lName + "</td>"
      html += "<td>" + data[i].day + "</td>"
      html += "<td>" + data[i].month + "</td>"
      html += "<td>" + data[i].sign + "</td>"
      html +="</tr>"
    }
    html += "</table>"
    
    document.getElementById("Containter").innerHTML = html
  }

//Handle modification later
function dynamicDropDown(){}