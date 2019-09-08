// Add some Javascript code here, to run on the front end.

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const firstName = document.querySelector('#firstName').value,
        lastName = document.querySelector('#lastName').value,
        pronouns = document.querySelector('input[name="studentPronouns"]:checked').value,
        mostValued = document.querySelector('input[name="studentValue"]:checked').value

    if (formComplete(firstName, lastName)) {
        let preferredPronouns, sortedHouse;
        console.log(pronouns)
        switch (pronouns) {
            case 'he':
                preferredPronouns = 'He/Him/His'
                break
            case 'she':
                preferredPronouns = 'She/Her/Hers'
                break
            case 'they':
                preferredPronouns = 'They/Them/Theirs'
                break
            default:
                document.getElementById('other').checked ?
                    preferredPronouns = document.getElementById('inputother').value
                    : preferredPronouns = 'No'
        }
        switch (mostValued) {
            case 'bravery':
                sortedHouse = 'Gryffindor'
                break
            case 'loyalty':
                sortedHouse = 'Hufflepuff'
                break
            case 'wisdom':
                sortedHouse = 'Ravenclaw'
                break
            case 'ambition':
                sortedHouse = 'Slytherin'
                break
            default:
                sortedHouse = 'Slytherin'
        }

        const json = {
                'firstName': firstName,
                'lastName': lastName,
                'pronouns': preferredPronouns,
                'house': sortedHouse
            },

            body = JSON.stringify(json)

        fetch('/submit', { //url name = /submit
            method: 'POST',
            body //same as saying->body:body
        })
            .then(function (response) {
                // response = body

                //console.log( response )
                //showData();
            })

        showData();
        return false
    }
}

function formComplete(studentFirstName, studentLastName) {
    if (studentFirstName === '' || studentLastName === '') {
        document.getElementById('error').style.display = "block"
        document.getElementById('error').focus()
        return false
    }
    else {
        document.getElementById('error').style.display = "none"
        document.getElementById('error').focus()
        return true
    }
}

function changeradioOther() {
    var other = document.getElementById("other");
    other.value = document.getElementById("inputother").value;
    other.checked = true
    console.log(other.value)
}

function clearOther() {
    document.getElementById("other").value = ""
    document.getElementById("inputother").value = ""
}

const updateRow = function (rowIndex) {
    let updateFirstName = document.getElementById('firstName'+rowIndex).value
    let updateLastName = document.getElementById('lastName' + rowIndex).value
    let pronouns = document.getElementById('pronouns' + rowIndex).value
    let house = document.getElementById('house' + rowIndex).value

    const json = {
        'firstName': updateFirstName,
        'lastName': updateLastName,
        'pronouns': pronouns,
        'house': house
    }
    json.index = rowIndex

    const body = JSON.stringify(json)
    fetch('/update', {
        method: 'POST',
        body
    }).then(function(response){
        showData()
    })
}

const editRow = function (rowIndex) {
    //redraw the table
    fetch('/studentData', {
        method: 'GET'
    }).then(function(response) {
        return response.json()
    }).then(function (studentList) {
        genTable(studentList, rowIndex)
    })
}

const deleteRow = function (rowIndex) {
    const rowData = {rowData: rowIndex};
    console.log(rowIndex);
    const body = JSON.stringify(rowData);
    fetch('/delete', {
        method: 'POST',
        body
    });
    showData();
};

const genTable = function (studentList, editIndex) {
    let studentTable = document.querySelector('#HogwartsStudents');
    //setting the header at the top of the table
    studentTable.innerHTML =
        '<tr>\n' +
        '<th>First Name</th>\n' +
        '<th>Last Name</th>\n' +
        '<th>Pronouns</th>\n' +
        '<th>House</th>\n' +
        '<th>Edit</th>\n' +
        '<th>Delete</th>\n' +
        '</tr>';

    for (let i = 0; i < studentList.length; i++) {
        const currentStudent = studentList[i];
        let newLine = '<tr>\n';
        var houseColor;
        if(currentStudent.house === 'Gryffindor' || currentStudent.house === 'gryffindor') {
            houseColor = '<div id="gryffindorbg">'
        }
        else if(currentStudent.house === 'Hufflepuff' || currentStudent.house === 'hufflepuff') {
            houseColor = '<div id="hufflepuffbg">'
        }
        else if(currentStudent.house === 'Ravenclaw' || currentStudent.house === 'ravenclaw') {
            houseColor = '<div id="ravenclawbg">'
        }
        else if(currentStudent.house === 'Slytherin' || currentStudent.house === 'Slytherin') {
            houseColor = '<div id="slytherinbg">'
        }
        else {
            houseColor = '<div id="mugglebg">'
        }
        if(i === editIndex) {
            newLine += ('<td>' + houseColor + '<input id="firstName' + i + '" type="text" value="' + currentStudent.firstName + '"> </div></td>\n');
            newLine += ('<td>' + houseColor + '<input id="lastName' + i + '" type="text" value="' + currentStudent.lastName + '"> </div></td>\n');
            newLine += ('<td>' + houseColor + '<input id="pronouns' + i + '" type="text" value="' + currentStudent.pronouns + '"> </div></td>\n');
            newLine += ('<td>' + houseColor + '<input id="house' + i + '" type="text" value="' + currentStudent.house + '"></div></td>\n');
            newLine += ('<td>' + houseColor + '<button id="' + i + '" onclick="updateRow(' + i + ')"> Update </button></div></td>\n');
            newLine += ('<td>' + houseColor + '<button id="' + i + '" onclick="deleteRow(' + i + ')"> X </button></div></td>\n');
            newLine += '</tr>';
        }
        else {
            newLine += ('<td>' + houseColor + currentStudent.firstName + '</div></td>\n');
            newLine += ('<td>' + houseColor + currentStudent.lastName + '</div></td>\n');
            newLine += ('<td>' + houseColor + currentStudent.pronouns + '</td>\n');
            newLine += ('<td>' + houseColor+ currentStudent.house + '</td>\n');
            newLine += ('<td>' + houseColor + '<button id="' + i + '" onclick="editRow(' + i + ')"> Edit </button></td>\n');
            newLine += ('<td>' + houseColor + '<button id="' + i + '" onclick="deleteRow(' + i + ')"> X </button></td>\n');
            newLine += '</div>' + '</tr>';
        }

        studentTable.innerHTML += newLine
    }
}

const showData = function () {
    fetch('/studentData', {
        method: 'GET'
    }).then(function(response) {
        return response.json()
    }).then(function (studentList) {
        genTable(studentList, -1)
    })
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit

}


//encodeURIComponent