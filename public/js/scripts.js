/*
TODO:
add computed field in server
add ability to remove a record from the server
add a results html file to display all results
date inputs are 5px taller than text
*/

//add btn onclick
function addAssignment(e) {
    e.preventDefault();
    console.log('abc')

    let assignment = document.getElementById("assignment").value;
    let classname = document.getElementById("classname").value;
    let due_date = document.getElementById('due_date').value; 

    let row = document.createElement("li");
    row.className = 'list';
    document.getElementById('todo-ol').appendChild(row);

    let assign_input = document.createElement('input');
    assign_input.type = 'text';
    assign_input.value = assignment;

    let classname_input = document.createElement('input');
    classname_input.value = classname;

    let due_date_input = document.createElement('input');
    due_date_input.type ='date';
    due_date_input.value = due_date;

    let now = new Date();
    let due_date_date = new Date(due_date + 'GMT-0400');
    let time_left = due_date_date - now;
    console.log(time_left)
    console.log(due_date_date)
    console.log(now)
    console.log(due_date)

    let time_left_input = document.createElement('input');
    time_left_input.type = 'date';
    time_left_input.value = time_left;
    time_left_input.readOnly = true;

    // let rm_btn = document.createElement('button');
    // rm_btn.onclick = rm_click;
    // rm_btn.className = 'btn rm_btn';
    // let times = document.createElement('i');
    // times.className = 'fa fa-times';
    // rm_btn.appendChild(times);
    
    let done_btn = document.createElement('button');
    done_btn.onclick = done_click;
    done_btn.className = 'btn done_btn';
    let check = document.createElement('i');
    check.className = 'fa fa-check';
    done_btn.appendChild(check);

    //row.appendChild(rm_btn);
    row.appendChild(assign_input);
    row.appendChild(classname_input);
    row.appendChild(due_date_input);
    row.appendChild(time_left_input);
    row.appendChild(done_btn);

    const json = {
        assignment: assignment,
        classname: classname,
        due_date: due_date,
    }
    const body = JSON.stringify(json)

    fetch('/add', {
            method: 'POST',
            body
        })
        .then(function(response) {
            // do something with the reponse 
            console.log(response)
        })

}


//how to dynamically add the 'event' argument
//on call, as this function is added as an onclick prop
//in js
const done_click = function(e) {
    e.preventDefault();

}

const rm_click = function(e) {
    e.preventDefault();

}