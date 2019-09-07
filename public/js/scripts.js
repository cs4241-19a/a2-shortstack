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
          opt.innerHTML = ""
          opt.value = ""
          nameSelector.appendChild(opt)
        for(let i = 0; i<Object.keys(allData).length; i++){
          var opt = document.createElement('option');
          opt.innerHTML = allData[i].fName + " " + allData[i].lName + ", " + allData[i].month + " " + allData[i].day
          opt.value = allData[i].fName + " " + allData[i].lName + ", " + allData[i].month + " " + allData[i].day
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
    groups = selection.getElementsByTagName('optgroup')
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
    var f = document.createDocumentFragment();
    var labels = [], group, opts;
    
    function addOptions(obj) {
        var f = document.createDocumentFragment();
        var o;
        
        for (var i=0, len=obj.text.length; i<len; i++) {
            o = document.createElement('option');
            o.appendChild( document.createTextNode( obj.text[i] ) );
            
            if ( obj.value ) {
                o.value = obj.value[i];
            }
            
            f.appendChild(o);
        }
        return f;
    }
    
    if ( obj.text ) {
        opts = addOptions(obj);
        f.appendChild(opts);
    } else {
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) {
                labels.push(prop);
            }
        }
        
        for (var i=0, len=labels.length; i<len; i++) {
            group = document.createElement('optgroup');
            group.label = labels[i];
            f.appendChild(group);
            opts = addOptions(obj[ labels[i] ] );
            group.appendChild(opts);
        }
    }
    sel.appendChild(f);
}

const dateDataForDropdown = {
  'monthChoices' : {
    jan:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]
    },
    feb:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
    },
    mar:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]
    },
    apr:{
      text:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]
    },
    may:{
      
    },
    jun:{
      
    },
    jul:{
      
    },
    aug:{
      
    },
    sep:{
      
    },
    oct:{
      
    },
    nov:{
      
    },
    dec:{
      
    }
  }
}