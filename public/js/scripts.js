// Add some Javascript code here, to run on the front end.

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const firstName = document.querySelector('#firstName'),
        lastName = document.querySelector('#lastName'),
        pronouns = document.querySelector('input[name="studentPronouns"]:checked').value,
        mostValued = document.querySelector('input[name="studentValue"]:checked').value

    var preferredPronouns, sortedHouse;
    console.log(pronouns)
    switch(pronouns) {
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
    switch(mostValued) {
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
            'firstName': firstName.value,
            'lastName': lastName.value,
            'pronouns': preferredPronouns,
            'house': sortedHouse
        },

        body = JSON.stringify(json)

    fetch( '/submit', { //url name = /submit
        method:'POST',
        body //same as saying->body:body
    })
        .then( function( response ) {
            // response = body

            //console.log( response )
            //showData();
        })

    showData();
    return false
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

const deleteRow = function (rowIndex) {
    const rowData = { rowData: rowIndex};
    console.log(rowIndex);
    const body = JSON.stringify(rowData);
    fetch('/delete', {
        method: 'POST',
        body
    });
    showData();
};

const showData = function(){
    fetch('/studentData',{
        method: 'GET'
    })
        .then( function (response){
            return response.json()
        })
        .then( function(studentList){
            let studentTable = document.querySelector('#HogwartsStudents');
            //setting the header at the top of the table
            studentTable.innerHTML =
                '<tr>\n'+
                '<th>First Name</th>\n'+
                '<th>Last Name</th>\n'+
                '<th>Pronouns</th>\n'+
                '<th>House</th>\n'+
                '<th>Delete</th>\n'+
                '</tr>';

            for(let i = 0; i < studentList.length; i++){
                const currentStudent = studentList[i];
                let newLine = '<tr>\n';
                var houseColor;
                switch(currentStudent.house) {
                    case 'Gryffindor':
                        houseColor = '<div id="gryffindorbg">'
                        break
                    case 'Hufflepuff':
                        houseColor = '<div id="hufflepuffbg">'
                        break
                    case 'Ravenclaw':
                        houseColor = '<div id="ravenclawbg">'
                        break
                    case 'Slytherin':
                        houseColor = '<div id="slytherinbg">'
                        break
                    default:
                        houseColor = '<div id="slytherinbg">'
                        break

                }
                newLine+=('<td>' + houseColor + currentStudent.firstName + '</div></td>\n');
                newLine+=('<td>'  + houseColor + currentStudent.lastName + '</div></td>\n');
                newLine+=('<td>' + houseColor + currentStudent.pronouns + '</td>\n');
                newLine+=('<td>' + houseColor + currentStudent.house + '</td>\n');
                newLine+=('<td>' + houseColor + '<button id="' + i + '" onclick="deleteRow(' + i + ')"> X </button></td>\n');
                newLine+='</div>'+'</tr>';

                studentTable.innerHTML += newLine
            }


        })
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit

}



//encodeURIComponent