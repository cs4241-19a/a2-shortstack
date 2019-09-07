// Add some Javascript code here, to run on the front end.

//Function to control hide-show of ADD NEW FORM
function displayNewForm(){
  var newForm = document.getElementById("newForm");
  var modForm = document.getElementById("modForm");
  modForm.style.display = 'none'
  if(newForm.style.display === 'none'){
    newForm.style.display = 'inline';
    var form = document.forms['CHANGE'];

    // reference to controlling select box
    var sel = form.elements['month'];
    sel.selectedIndex = 0;
    
    // name of associated select box
    var relName = 'day';
    // reference to associated select box
    var rel = form.elements[ relName ];
    
    // get data for associated select box passing its name
    // and value of selected in controlling select box
    var data = DateDataForDropdown[ relName ][ sel.value ];

    // add options to associated select box
    appendDataToSelect(rel, data);
  }
  else{
    newForm.style.display = 'none';
  }
}
 
//Function to control hide-show of MOD DATA FORM
function displayModForm(){
  var newForm = document.getElementById("newForm");
  newForm.style.display = 'none'
  var modForm = document.getElementById("modForm");
  if(modForm.style.display === 'none'){
    modForm.style.display = 'inline';
  }
  else{
    modForm.style.display = 'none';
  }
  populateFromDatabase()
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

//Populates first name drop down
function populateFromDatabase(){
  fetch( '/getData', {
    method:'GET',
  })
  .then( function( response ) {
    console.log(response)
    response.text()
    .then(function(message){
      let allData = JSON.parse(message)
      console.log(allData)
      let nameSelector = document.querySelector(".modList");
      var opt = document.createElement('option');
      opt.innerHTML = opt.value = ""
      nameSelector.appendChild(opt)
      for(let i = 0; i<Object.keys(allData).length; i++){
        var opt = document.createElement('option');
        opt.innerHTML = opt.value = allData[i].fName + " " + allData[i].lName + ", " + allData[i].month + " " + allData[i].day
        nameSelector.appendChild(opt)
      }
      console.log(nameSelector)
    })
  })
  return false
}

//FUNCTIONS FOR DYNAMIC SELECTION BOXES
function removeAllOptions(selection, removalGroup){
  var len, groups, par;
  if(removalGroup){
    groups = selection.getElementsByTagName('option')
    len = groups.length;
    for(var i = len; i; i--){
      selection.removeChild(groups[i-1])
    }
  }
  len = selection.options.length
  for(var i=len; i; i--){
    par = selection.options[i-1].parentNode;
    par.removeChild(selection.options[i-1])
  }
}

//EDIT FOR CLARITY
function appendDataToSelect(sel, obj) {
    for(let i = 0; i<data)
}

const DateDataForDropdown = {
  'day' : {
    January:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]
    },
    February:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
    },
    March:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]
    },
    April:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ]
    },
    May:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]
    },
    June:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ]
    },
    July:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]
    },
    August:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      
    },
    September:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ]    
    },
    October:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      
    },
    November:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
    },
    December:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      
    }
  }
}