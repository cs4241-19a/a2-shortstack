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