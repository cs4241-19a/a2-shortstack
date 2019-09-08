// Add some Javascript code here, to run on the front end.

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const firstName = document.querySelector('#firstName'),
        lastName = document.querySelector('#lastName'),
        pronouns = document.querySelector('#pronouns'),
        house = document.querySelector('#house'),

        json = {
            'firstName': firstName.value,
            'lastName': lastName.value,
            'pronouns': pronouns.value,
            'house': house.value
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
            console.log(studentList)

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

function setColor() {
    rgbValue[0] = Math.round(Math.random() * 255);
    rgbValue[1] = Math.round(Math.random() * 255);
    rgbValue[2] = Math.round(Math.random() * 255);
    var color = Math.round(((parseInt(rgbValue[0]) * 299) +
        (parseInt(rgbValue[1]) * 587) +
        (parseInt(rgbValue[2]) * 114)) / 1000);
    var textColor = (color > 125) ? 'black' : 'white';
    var backColor =
        'rgb(' + rgbValue[0] + ', ' + rgbValue[1] + ', '
        + rgbValue[2] + ')';

    $('#backG').css('color', textColor);
    $('#backG').css('background-color', backColor);
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit

}



//encodeURIComponent