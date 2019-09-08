//Cat Sherman, a2 
//Due: 9-9-19
//Scripts used on Userpage.html

// Username is tracked in a cookie
const cookie = getCookie('username'); 

document.getElementById("user-title").innerHTML = "Welcome" + " " + cookie;

window.onload = function(){
  loadTable(); 
}

//Deletes the Row based on the selected button
function createDelReq(id){
      const json = { 
        'username': cookie,
        'id': id }
      const body = JSON.stringify( json )
      
      fetch( '/delTask', {//fix this
      method:'POST',
      body
      })
  
     .then( function( response ) {
        loadTable();
     })
}

//Called when Modify button is selected, returns the form that's filled in with the selected row's information
function updateForm(id){ 
  const json = {
        'username': cookie,
        'id': id },
        body = JSON.stringify( json )
  
      
  fetch( '/modifyRow', {
      method:'POST',
      body
      })
  
    .then( function( response ) {
      response.json().then(data => {
        console.log(data)
        const modForm = document.getElementById("modRowForm").innerHTML = '<form action="" id = "modify">Item: <input type="text" name="itemName" value="'+ data.itemName +'"> Time: <input type="text" name="time" value="'+ data.time +'"> Days Left:<input type="text" name="daysLeft" value="'+ data.daysleft +'"> Notes:<input type="text" name="notes" value="'+ data.notes +'">'
        const modBTN = document.getElementById("modRowForm").innerHTML += "<button onclick='enterChanges("+ id +")'> Enter Changes!</button>"
        })
  })
}

//Called when "Enter Changes!" button is clicked. It returns the updated row in the table and clears the modify row form
function enterChanges(id){ 
  const input = document.getElementById('modify'),
        json = { username: cookie,
                'id': id,
                 task: {
                   'itemName': input.elements["itemName"].value,
                   'time': input.elements["time"].value,
                   'daysleft': input.elements["daysLeft"].value,
                   'notes': input.elements["notes"].value,
                 }
              },
        body = JSON.stringify( json )
     
  fetch( '/enterChanges', {
      method:'POST',
      body
      })
  
    .then( function( response ) {
      document.getElementById("modRowForm").innerHTML = ""
      loadTable();
    })
}

// Loads the table with the correct user data when the page is initially loaded, and reloads the table after items have been added, deleted, 
// or modified. Returns the table with the user's tasks
function loadTable(){ 
  const input = cookie,
        json = { username: input },
        body = JSON.stringify( json )
      
      fetch( '/loadTable', {
      method:'POST',
      body
      })
  
    .then( function( response ) {
        response.json().then(data => {
          document.getElementById("to-do").innerHTML = ""
          addRow("To-Do:", "Approx. Time:", "Due Date:", "Days Left:", "Notes:", "Modify Task:", "Delete Task:")
          for(let i = 0; i < data.items.length; i++){
            let currItem = data.items[i];
            addRow(currItem.itemName, currItem.time, currItem.duedate, currItem.daysleft, currItem.notes, "<button onclick='updateForm("+ currItem.id +")'>Modify</button>", "<button onclick='createDelReq("+ currItem.id +")'>Delete Row</button>")
          }
        })   
    })    
}

//Used to get the value of the cookie 
//Code from https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

// Used to add a row to the table, just adds the HTML elements needed, relies on values found in load table
function addRow(item, time, date, daysLeft, notes, modifyItem, deleteItem){ 
  document.getElementById("to-do").innerHTML += "<tr><th>" + item + "</th><th>" + time + "</th><th>" + date + "</th><th>" + daysLeft + "</th><th>" + notes + "</th><th>" + modifyItem + "</th><th>"+ deleteItem + "</th></tr>";
}

//Sets the cookie, used for log out in deleting the cookie
//Code from https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

//Deletes cookie, used in log out function
//Code from https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
function deleteCookie(name) { 
  setCookie(name, '', -1); 
}

// Used to log out, clears cookie and sends user back to main page (index.html)
const logOutBTN = document.getElementById("out");
logOutBTN.addEventListener("click", function(event) {
  deleteCookie('username'); 
  location.assign("/");
} );

//Called when a row is added, uses information from form to generate a new task (and then calls loadTable() to actually generate the row from the info in the server)
const addRowBTN = document.getElementById("add");
addRowBTN.addEventListener("click", function(event) {
  event.preventDefault();
  const input = document.getElementById('addForm'),
        json = { username: cookie,
                 task: {
                   'itemName': input.elements["itemName"].value,
                   'time': input.elements["time"].value,
                   'daysleft': input.elements["daysLeft"].value,
                   'notes': input.elements["notes"].value,
                 }
              },
        body = JSON.stringify( json )
  
  console.log(body)
  fetch( '/addTask', {
      method:'POST',
      body
      })
  .then( function( response ) {
  loadTable();
  })
} );