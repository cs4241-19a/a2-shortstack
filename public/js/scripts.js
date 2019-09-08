// Add some Javascript code here, to run on the front end.
var add_edit_delete = 0;

var edit_data = {};
var edit_username = "";
var USERNAME = "";

function addUser(){
  showLogin();
  document.getElementById("VIEW_DATA").innerHTML = "Add New User!";
  add_edit_delete = 1;
}

function signInUser(){
  showLogin();
  document.getElementById("VIEW_DATA").innerHTML = "Sign In!";
  add_edit_delete = 2;
}

function deleteUser(){
  showLogin();
  document.getElementById("VIEW_DATA").innerHTML = "Delete a User!";
  add_edit_delete = 3;
}

function showUserInfo(){
  showUserAccess();
  add_edit_delete = 4;
  submitUserChanges();
}

function editUser(){
  showUserAccess();
  document.getElementById("VIEW_DATA").innerHTML = "Edit User Data!";
  add_edit_delete = 5;
  submitUserChanges();
}

function changeUser(){
  showUserHeader();
  document.getElementById("USERNAME_HEADER").innerHTML = "";
  document.getElementById("DATABASE_TO_HOME").style.display = "none";
  document.getElementById("USER_ENTRY").innerHTML = "";
  document.getElementById("ALL_DATABASE_INFO").innerHTML = "";
  add_edit_delete = 0;
}

function showLogin(){
  document.getElementById("USERNAME_HEADER").style.display = "none";
  document.getElementById("LOGIN_HEADER").style.display = "none";
  document.getElementById("SUBMIT_USER_CHANGES").style.display = "block"
}

function showUserHeader(){
  document.getElementById("VIEW_DATA").innerHTML = "Select New User, Edit User, or Remove User!";
  document.getElementById("LOGIN_HEADER").style.display = "block";
  document.getElementById("SUBMIT_USER_CHANGES").style.display = "none";
  document.getElementById("USER_HEADER").style.display = "none";
  document.getElementById("VIEW_DATA").innerHTML = "";
}

function showUserAccess(){
  document.getElementById("DATABASE_TO_HOME").style.display = "block";
  document.getElementById("LOGIN_HEADER").style.display = "none";
  document.getElementById("SUBMIT_USER_CHANGES").style.display = "none";;
  document.getElementById("USER_HEADER").style.display = "block";
  document.getElementById("USER_ENTRY").innerHTML = "";
  document.getElementById("ALL_DATABASE_INFO").innerHTML = "";
}

function viewDatabase(){
  document.getElementById("VIEW_DATABASE").style.display = "block";
  document.getElementById("ALL_DATABASE_INFO").style.display = "block";
  document.getElementById("DATABASE_TO_HOME").style.display = "block";
  document.getElementById("LOGIN_HEADER").style.display = "none";
  document.getElementById("SUBMIT_USER_CHANGES").style.display = "none"; 
  document.getElementById("VIEW_DATA").innerHTML = "";
  document.getElementById("USER_ENTRY").innerHTML = "";
  requestDatabase();
}

function returnHome(){
  document.getElementById("DATABASE_TO_HOME").style.display = "none";
  document.getElementById("ALL_DATABASE_INFO").style.display = "none";
  document.getElementById("VIEW_DATABASE").style.display = "block";
  document.getElementById("USER_ENTRY").style.display = "none";
  document.getElementById("VIEW_DATA").innerHTML = "";
  document.getElementById("VIEW_DATA").innerHTML = "<p>This is the WPI Track and Field Diet Tracker Website.</p>\
    <p>The purpose of this website is to allow WPI athletes to keep track of major food groups in their diet such as carbohydrates, proteins, vegetables, oils, and more. A user can input data into the database and retrieve it at any time.</p>\
    <p>Select a button on the navigation panel to the left to view, edit, or upload data.</p> \
    <p>To delete a user select 'Sign Out' then select 'Remove User' and submit the user to delete. </p> \
    <p>The current model for this website only allows the user to log a single day of information. In the future, this will be expanded for multiple days, and the 'score' field will be used as a comparison metric for comparing athletes dieting habits.</p>";
  showUserAccess();
}

function submitUserChanges(){
  let myRequest;
  var submit_fetch = 1;
  const input = document.getElementById("USER_DATA");
  
  var body = input.value;
  console.log(add_edit_delete);
  switch(add_edit_delete){
    case 1: 
      myRequest = new Request('/addUser', { method:'POST', body: body } );
      break;
    case 2:
      myRequest = new Request('/signInUser', {method: 'POST', body: body} );
      break;
    case 3:
      myRequest = new Request('/deleteUser', {method:'POST', body: body} );
      break;
    case 4:
      myRequest = new Request('/getUser', {method:'POST', body: USERNAME} );
      break;
    case 5:
      myRequest = new Request('/editUser', {method:'POST', body: USERNAME} );
      break;
    default:
      submit_fetch = 0;
      break;
  }
  fetch(myRequest).then(function(response) {
    response.text().then(function(data) {   
      switch(add_edit_delete){
        case 1:
          if (data === "New User Created"){
            USERNAME = document.getElementById("USER_DATA").value;
            document.getElementById("USERNAME_HEADER").style.display = "block";
            document.getElementById("USERNAME_HEADER").innerHTML = "Welcome: " + USERNAME;
            document.getElementById("VIEW_DATA").innerHTML = data;
            returnHome()
          }
          else{
            document.getElementById("VIEW_DATA").innerHTML = data;
          }
          break;
        case 2:
          if (data === "User Found"){
            USERNAME = document.getElementById("USER_DATA").value;
            document.getElementById("USERNAME_HEADER").style.display = "block";
            document.getElementById("USERNAME_HEADER").innerHTML = "Welcome: " + USERNAME;
            document.getElementById("VIEW_DATA").innerHTML = data;
            returnHome()
          }
          else{
            document.getElementById("VIEW_DATA").innerHTML = data;
          }
          break;
        case 3:
          document.getElementById("VIEW_DATA").innerHTML = data;
          break;
        case 4:
          showAllUserInfo(data);
          document.getElementById("VIEW_DATA").innerHTML = "";
          break;
        case 5:
          showEditInfo(data);
          document.getElementById("VIEW_DATA").innerHTML = "";
          break;
        default:
          break;
      }
    });
  });
}

function requestDatabase(){
  var body = "";
  let myRequest = new Request('/getDatabase', { method:'POST', body: body } );
  fetch(myRequest).then(function(response) {
    response.json().then(function(data) {
      var output = "<h1>Database Info</h1>";
      output += "<ul>";    
      for (var key in data){
        output += "<li>" + key + " - Food Eaten:";
        for (var innerkey in data[key]){
           output+= "<dd><li>" + innerkey + ": " + data[key][innerkey] + "</li></dd>";
        }
        output += "</li>";
      }
      output += "</ul>";
      document.getElementById("ALL_DATABASE_INFO").innerHTML=output;
    });
  });
}

function showAllUserInfo(data){
  var output = "<h1>User Info: ";
  data = JSON.parse(data);
  for (var name in data){
    output += name + "</h1>";
    edit_username = name;
    for (var user_info_field in data[name]){
      if (user_info_field !== "score"){
        if (data[name][user_info_field] === "true"){
          output += '<p><img src="http://www.knowledgepoint.co.uk/wp-content/uploads/2018/05/iStock-845888110.jpg" width="20" height="20">'+ user_info_field + '</p>';
        }
        else{
          output += '<p><img src="https://cdn4.vectorstock.com/i/1000x1000/37/68/icon-concept-of-x-mark-colored-and-color-outlines-vector-23463768.jpg" width="20" height="20">'+ user_info_field + '</p>'; 
        }
      }
      else{
        output += '<p>Score: '+ data[name][user_info_field] + '</p>'; 
      }
    }
  }
  document.getElementById("USER_ENTRY").innerHTML=output;
  document.getElementById("USER_ENTRY").style.display="block";  
}

function showEditInfo (data){
  var output = "<h1>User Info: ";
  
  data = JSON.parse(data);
  for (var name in data){
    output += name + "</h1>";
    edit_username = name;
    for (var user_info_field in data[name]){
      if (user_info_field !== "score"){
        if (data[name][user_info_field] === "true"){
          output += "<p>"+ '<input type="checkbox" id="' + user_info_field + '" name="USER_EDIT_CHECKBOXES" checked>'+user_info_field +'</p>' 
        }
        else{
          output += "<p>"+ '<input type="checkbox" id="' + user_info_field + '" name="USER_EDIT_CHECKBOXES">'+user_info_field + '</p>' 
        }
      }
    }
  }
  edit_data = data;
  output += '<button id="SUBMIT_EDITS" onclick="submitEdits()">Submit Edits</button>';
  document.getElementById("USER_ENTRY").innerHTML=output;
  document.getElementById("USER_ENTRY").style.display="block";
}

function submitEdits(){
  var checkboxes = document.getElementsByName("USER_EDIT_CHECKBOXES");

  var data = edit_data;

  // loop over them all checkboxes
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        data[edit_username][checkboxes[i].id] = "true"; 
     }
    else{
      data[edit_username][checkboxes[i].id] = "false"; 
    }
  }
  
  var myRequest = new Request('/updateUser', {method: 'POST', body: JSON.stringify(data)}) ;
  fetch(myRequest).then(function(response) {
    response.text().then(function(info) {
      document.getElementById("VIEW_DATA").innerHTML = info;
    });
  });
  add_edit_delete = 4;
  returnHome();
}
