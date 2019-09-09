// Add some Javascript code here, to run on the front end.

//******** HIDE-SHOW *******//
//Controls ADD NEW FORM
function displayNewForm(){
  var newForm = document.getElementById("newForm");
  var modForm = document.getElementById("modForm");
  var editForm = document.getElementById("editForm");
  var horo = document.getElementById("horo");
  if(horo !== null){
      horo.style.display = 'none'
  }
  modForm.style.display = 'none'
  if(editForm !== null){
      editForm.style.display = 'none'
  }
  if(document.getElementById("resultsTable") !== null){
    document.getElementById("Container").innerHTML = ''
  }
  if(newForm.style.display === 'none'){
    newForm.style.display = 'inline';
    var form = document.forms['NEW'];

    // reference to controlling select box
    var sel = form.elements['month'];
    sel.selectedIndex = 0;
    // name of associated select box
    var relName = 'days';
    // reference to associated select box
    var rel = form.elements[ relName ];
    // get data for associated select box passing its name
    // and value of selected in controlling select box
    var data = DateDataForDropdown[ relName ][ sel.value ];
    // add options to associated select box
    appendDataToSelect(rel, data);
    
    //Add onchange function to live update to new month
    sel.onchange = function(e){
      var subName = 'days'
      var dates = document.forms['NEW'].elements[subName]
      var newData = DateDataForDropdown[subName][this.value]
      removeAllOptions(dates)
      appendDataToSelect(dates, newData)
    }
  }
  else{
    newForm.style.display = 'none';
  }
}
 
//Controls MOD DATA FORM
function displayModForm(){
  var newForm = document.getElementById("newForm");
  var editForm = document.getElementById("editForm");
  var horo = document.getElementById("horo");
  if(horo !== null){
      horo.style.display = 'none'
  }
  newForm.style.display = 'none'
  if(editForm !== null){
      editForm.style.display = 'none'
  }
  if(document.getElementById("resultsTable") !== null){
    document.getElementById("Container").innerHTML = ''
  }
    
  var modForm = document.getElementById("modForm");
  if(modForm.style.display === 'none'){
    modForm.style.display = 'inline';
    //Add onchange function to live update to new month
    modForm.onchange = function(e){
      showEditDataForm()
    }
  }
  else{
    modForm.style.display = 'none';
  }
  populateFromDatabase()
}

//Controls EDIT DATA FORM
function showEditDataForm(){
  var parentInfo = document.getElementById("modForm");
  var editFormExists = document.forms['EDIT']
  if(editFormExists){
    editFormExists = null;
    showEditDataForm()
  }
  else{
    var html = "<form action=\"\" id=\"editForm\" class=\"editForm\"><legend>EDIT</legend>"
    html += "<label for=\"fName\">First Name:</label>"
    html += "<input type=\"text\" class=\"fNameE\" value=\""
    var selectInfo = document.getElementsByName('modList')[0]
    var selectedIndex = selectInfo.selectedIndex
    //selected index -1
    fetch('getData', {
      method: 'GET',
    })
    .then(function(response){
      response.text()
      .then(function(message){
        let allData = JSON.parse(message)
        if(selectedIndex > 0){
          selectedIndex--;
          html += allData[selectedIndex].fName + "\"><br>"
          html += "<p id=\"modHolder\" style=\"display:none\">" + JSON.stringify(allData[selectedIndex]) + "</p>"
          html += "<label for=\"lName\">Last Name:</label>"
          html += "<input type=\"text\" class=\"lNameE\" value=\""
          html += allData[selectedIndex].lName + "\"><br>"
          var month = allData[selectedIndex].month
          html += monthToHTML(month)
          var day = allData[selectedIndex].day
          html += daysToHTML(month, day)
          html += "<button id=\"submitChanges\">SubmitChanges</button>"
          html +="<button id=\"remove\">Delete Original</button>"
          html += "</form>"
          document.getElementById("Container").innerHTML = ""
          document.getElementById("Container").innerHTML = html
          var form = document.forms['editForm'];
          var sel = form.elements['month'];
          sel.onchange = function(e){
            var subName = 'days'
            var dates = document.forms['editForm'].elements[subName]
            var newData = DateDataForDropdown[subName][this.value]
            removeAllOptions(dates)
            appendDataToSelect(dates, newData)
          }
          document.getElementById("submitChanges").onclick = submitChanges;
          document.getElementById("remove").onclick = remove;
        }
      })
    })
    
  }

}

function displayData(){
  var newForm = document.getElementById("newForm");
  var modForm = document.getElementById("modForm");
  var editForm = document.getElementById("editForm");
  newForm.style.display = 'none'
  modForm.style.display = 'none'
  if(editForm !== null){
      editForm.style.display = 'none'
  }
  if(document.getElementById("resultsTable") !== null){
    document.getElementById("Container").innerHTML = ''
  }
  else{
    fetch('/getData', {
        method: 'GET',
    })
    .then(function(response){
      response.text()
      .then(function(message){
        let allData = JSON.parse(message)
        console.log(message)
        var html = "<table id=\"resultsTable\" class=\"resultsTable\"><tr><th colspan=\"6\">Existing Data</th></tr>"
        html += "<tr><td>Index</td><td>First Name</td><td>Last Name</td><td>Day of Birth</td><td>Month of Birth</td><td>Sign</td></tr>"
        for(let i = 0; i< Object.keys(allData).length; i++){
          html += "<tr>" 
          html += "<td>" + i + "</td>"
          html += "<td>" + allData[i].fName + "</td>"
          html += "<td>" + allData[i].lName + "</td>"
          html += "<td>" + allData[i].day + "</td>"
          html += "<td>" + allData[i].month + "</td>"
          html += "<td>" + allData[i].sign + "</td>"
          html +="</tr>"
        }
        html += "</table>"
        document.getElementById("Container").innerHTML = html
      })
    })
  }
}

function generateHoroscope(){
  var newForm = document.getElementById("newForm");
  var modForm = document.getElementById("modForm");
  var editForm = document.getElementById("editForm");
  newForm.style.display = 'none'
  modForm.style.display = 'none'
  if(editForm !== null){
      editForm.style.display = 'none'
  }
  var horo = document.getElementById("horo");
  console.log(horo.style.display)
  if(horo.style.display === 'none'){
      horo.style.display = 'inline'
  }
  else{
    horo.style.display = 'none'
  }
  
  if(document.getElementById("resultsTable") !== null){
    document.getElementById("Container").innerHTML = ''
  }
  populateFromDatabaseHoro()
    
}

//******* DYNAMIC DROPDOWNS ******//
//Removes all options from given select element
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

//Adds given data as options to given select element
function appendDataToSelect(sel, data) {
  for(let i = 0; i<data.length; i++){
      var opt = document.createElement("option")
      opt.innerHTML = opt.value = data[i]
      sel.appendChild(opt)
  }
}

//Populates initial modify dropdown will all information from database
function populateFromDatabase(){
  let nameSelector = document.querySelector(".modList");
  if(nameSelector !== null){
    console.log("IN REMOVE CHILDREN")
    var i;
    for(i = nameSelector.options.length - 1; i >= 0; i--){
      nameSelector.remove(i)
    }    
  }
  fetch( '/getData', {
    method:'GET',
  })
  .then( function( response ) {
    console.log(response)
    response.text()
    .then(function(message){
      let allData = JSON.parse(message)
      console.log(allData)
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

function populateFromDatabaseHoro(){
  let nameSelector = document.querySelector(".horoList");
  if(nameSelector !== null){
    console.log("IN REMOVE CHILDREN")
    var i;
    for(i = nameSelector.options.length - 1; i >= 0; i--){
      nameSelector.remove(i)
    }    
  }
  fetch( '/getData', {
    method:'GET',
  })
  .then( function( response ) {
    console.log(response)
    response.text()
    .then(function(message){
      let allData = JSON.parse(message)
      console.log(allData)
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
//******* HARD CODED DATA *******//
//HARD CODED VAR FOR ALL OD DATE INFORMATION
const DateDataForDropdown = {
  'days' : {
    January:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    February:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
    March:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    April:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
    May:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    June:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
    July:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    August:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      ,
    September:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ]    ,
    October:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      ,
    November:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    December:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]      
  }
}


//******* UTILITY DATE FUNCTIONS *******//
function monthToHTML(month){
  let html = "<select name=\"month\" class=\"monthE\">"
  switch(month){
    case "January":
      html += "<option selected=\"selected\" value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "February":
      html += "<option value=\"January\">January</option>"
      html += "<option selected=\"selected\" value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "March":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option selected=\"selected\" value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "April":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option selected=\"selected\" value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "May":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option selected=\"selected\" value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "June":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option selected=\"selected\" value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "July":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option selected=\"selected\" value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "August":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option selected=\"selected\" value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "September":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option selected=\"selected\" value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "October":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option selected=\"selected\" value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "November":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option selected=\"selected\" value=\"November\">November</option>"
      html += "<option value=\"December\">December</option></select><br>"
      return html;
    case "December":
      html += "<option value=\"January\">January</option>"
      html += "<option value=\"February\">February</option>"
      html += "<option value=\"March\">March</option>"
      html += "<option value=\"April\">April</option>"
      html += "<option value=\"May\">May</option>"
      html += "<option value=\"June\">June</option>"
      html += "<option value=\"July\">July</option>"
      html += "<option value=\"August\">August</option>"
      html += "<option value=\"September\">September</option>"
      html += "<option value=\"October\">October</option>"
      html += "<option value=\"November\">November</option>"
      html += "<option selected=\"selected\" value=\"December\">December</option></select><br>"
      return html;
  }
}

function daysToHTML(month, day){
  let totalDays = hasDays(monthToNum(month));
  let html = "<label for=\"days\">Day of Birth</label>"
  html += "<select name=\"days\" class=\"daysE\">"
  for(let i = 1; i <= totalDays; i++){
    html += "<option "
    if(i === day){
      html += "selected=\"selected\" "
    }
    html += "value=\"" + i + "\">"+ i + "</option>"
  }
  html += "</select><br>"
  return html;
}

function monthToNum(month){
  switch(month){
    case "January":
      return 0;
    case "February":
      return 1;
    case "March":
      return 2;
    case "April":
      return 3;
    case "May":
      return 4;
    case "June":
      return 5;
    case "July":
      return 6;
    case "August":
      return 7;
    case "September":
      return 8;
    case "October":
      return 9;
    case "November":
      return 10;
    case "December":
      return 11;
  }
}

function hasDays(month){
  switch(month){
    case 0:
      return 31;
    case 1:
      return 29;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
      break;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
  }
}

//******** UTILITY IMAGE FUNCTIONS *******//
function signToImageURL(sign){
  switch(sign){
    case "Aries":
      return "https://cdn.glitch.com/de12d0f3-3352-44ef-b62c-3acd45afc445%2FAries.svg?v=1567965712892"
    case "Taurus":
      return "https://cdn.glitch.com/de12d0f3-3352-44ef-b62c-3acd45afc445%2FTaurus.svg?v=1567965713442"
    case "Gemini":
      return
    case "Cancer":
      return
    case "Leo":
      return
    case "Virgo":
      return
    case "Libra":
      return
    case "Scorpio":
      return
    case "Sagittarius":
      return
    case "Capricorn":
      return
    case "Aquarius":
      return
    case "Pisces":
      return
    
  }
}
