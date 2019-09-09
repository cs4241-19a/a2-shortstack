// Add some Javascript code here, to run on the front end.

const displayTasks = function(taskData) {
  const template = '<tr><td>{name}</td><td>{task}</td><td>{priority}</td></tr>';
  const row = template.replace("{name}", taskData.name).replace("{task}", taskData.task).replace("{priority}", taskData.priority);
  const tbody = document.querySelector("#all-tasks");
  tbody.innerHTML += row;
}

const displayData = function ( data ) {
	document.querySelector("#all-tasks").innerHTML = ""
	for (let i = 0; i < data.length; i++) {
	  const taskData = data[i]
	    displayTasks(taskData)
	}
}
	
// Fetch the appdata and then display
const loadData = function( e ) {
	fetch( '/todo', {
	  method:'GET',
	})
	.then( function( response ) {
	  response.json().then(displayData)
	  console.log(response)
	})
}
	
// Add task function
const addTask = function(e) {
  // Validate that the user has entered some input
  if(document.getElementById('name').value === '' ||
     document.getElementById('task').value === '' ||
     document.getElementById('priority').value === '') {
    return false;
  }
  const newTask = {
	        name: document.getElementById('name').value,
	        task: document.getElementById('task').value,
	        priority:document.getElementById('priority').value,
  };
	
	const body = JSON.stringify( newTask );
  fetch( '/addTask', {
	        method:'POST',
	        body
	}).then( function( response ) {
	        resetForm();
	        loadData();
	})
  resetForm();
  loadData();
	return false;
}
      
// Reset form after adding task
const resetForm = () => {
  document.getElementById('name').value = '';
  document.getElementById('task').value = '';
  document.getElementById('priority').value = '';
};

// Startup function
window.onload = function() {
	    const addTaskbutton = document.getElementById( 'submit-btn' )
	    addTaskbutton.onclick = addTask
	    loadData()
}