/*
TODO:
- add computed field in server
    - validate: error when input loses focus and date is default value mm/dd/yyyy
*- add ability to remove a record from the server
- add a results html file to display all results
?- date inputs are 5px taller than text
*- onchange funcs for assignment must get event
    - or not...?
*- date inputs change width depending on value
*- validate: how to find record in db if all the info is the same?
    - validate the post request, do not allow if record already exists
*/

//add btn onclick
function addAssignment(e) {
    e.preventDefault();

    let assignment = document.getElementById("assignment").value;
    let classname = document.getElementById("classname").value;
    let due_date = document.getElementById("due_date").value;
    if (due_date === "") {
        alert("Please add a valid date")
        return
    } 

    const json = {
        assignment: assignment,
        classname: classname,
        due_date: due_date,
    }
    const body = JSON.stringify(json)

    fetch('/add', {
        method: 'POST',
        body
    }).then(function(response) {
        if (response.statusText === 'no') {
            addAssignmentRow(assignment, classname, due_date)
        } else alert('That assignment already exists!')
    })

    document.getElementById("assignment").value = "assignment";
    document.getElementById("classname").value = "classname";
    document.getElementById("due_date").value = "";
}

function addAssignmentRow(assignment, classname, due_date) {
    let row = document.createElement("li");
    row.className = 'list';
    document.getElementById('todo-ol').appendChild(row);

    let assign_input = document.createElement('input');
    assign_input.type = 'text';
    assign_input.value = assignment;
    assign_input.className = "assignment";
    assign_input.readOnly = true;
    assign_input.size = "1"

    let classname_input = document.createElement('input');
    classname_input.value = classname;
    classname_input.className = "classname";
    classname_input.readOnly = true;
    classname_input.size = "1"

    let due_date_input = document.createElement('input');
    due_date_input.type ='date';
    due_date_input.value = due_date;
    due_date_input.readOnly = true;
    due_date_input.className = "due_date";

    let now = new Date();
    let due_date_date = new Date(due_date + 'GMT-0400');
    let time_left = due_date_date - now;
    let days = Math.round(time_left / 8.64e7)
    if (days < 1) days='Today'

    let time_left_input = document.createElement('input');
    time_left_input.type = 'text';
    time_left_input.size = "1"
    time_left_input.value = days;
    time_left_input.readOnly = true;
    time_left_input.className = "time_left";

    let rm_btn = document.createElement('button');
    rm_btn.onclick = rm_click;
    rm_btn.className = 'btn rm_btn';
    rm_btn.id = 'rm_btn';
    let times = document.createElement('i');
    times.className = 'fa fa-times';
    rm_btn.appendChild(times);
    
    let done_btn = document.createElement('button');
    done_btn.onclick = done_click;
    done_btn.className = 'btn done_btn';
    let check = document.createElement('i');
    check.className = 'fa fa-check';
    done_btn.appendChild(check);

    row.appendChild(rm_btn);
    row.appendChild(assign_input);
    row.appendChild(classname_input);
    row.appendChild(due_date_input);
    row.appendChild(time_left_input);
    row.appendChild(done_btn);
}

const done_click = function(e) {
    e.preventDefault();

    let parent = this.parentNode;
    let color = ''

    const json = {
        assignment: parent.querySelector('.assignment').value,
        classname: parent.querySelector('.classname').value,
        due_date: parent.querySelector('.due_date').value,
    }
    const body = JSON.stringify(json);

    fetch('/checkDone', {
        method: 'POST',
        body
    }).then(function(response) {
        if (response.statusText == 'yes') {
            color = '#9adbbe'
            let rmbtn = parent.querySelector("#rm_btn")
            parent.removeChild(rmbtn)
            let kids = parent.children;
            for (var i = 0; i < kids.length; i++) {
                kids[i].style.background = color;
            }
        } else if (response.statusText == 'no') {
            color = '#fff'
            let rm_btn = document.createElement('button');
            rm_btn.onclick = rm_click;
            rm_btn.className = 'btn rm_btn';
            rm_btn.id = 'rm_btn';
            let times = document.createElement('i');
            times.className = 'fa fa-times';
            rm_btn.appendChild(times);
            parent.prepend(rm_btn)
            let kids = parent.children;
            for (var i = 0; i < kids.length; i++) {
                kids[i].style.background = color;
            }
        }
    })
}

const rm_click = function(e) {
    e.preventDefault();

    let parent = this.parentNode;

    const json = {
        assignment: parent.querySelector('.assignment').value,
        classname: parent.querySelector('.classname').value,
        due_date: parent.querySelector('.due_date').value,
    }
    const body = JSON.stringify(json);

    fetch('delete', {
        method: 'POST',
        body
    }).then(function(response) {
        
    })
    

    parent.parentNode.removeChild(this.parentNode)
}