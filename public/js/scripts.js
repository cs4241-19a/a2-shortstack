const rowItem = `<tr>
<th scope="row"></th>
<td>[name]</td>
<td>[birthday]</td>
<td>[major]</td>
<td>[age]</td>
<td><button type="button" class="btn btn-danger">Delete</button></td>
</tr>
`



window.onload = function () {
    const button = document.querySelector('#add-row-btn')
    button.onclick = handleSubmitPerson
    updateTableContent()
    addDropdownMajors()
    console.log('this javascript file was successfully loaded.')
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/**
 * add a row to the table of people
 */
const handleSubmitPerson = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const form = $('#add-form')
    const name = form.find('#input-name').val()
    const birthday = form.find('#input-birthday').val()
    const major = form.find('#select-major').val()

    json = {
        name: name,
        birthday: birthday,
        major: major
    }
    body = JSON.stringify(json)

    fetch('person', {
        method: 'POST',
        body: body
    }).then(function (response) {
        console.log(response)
    })

    updateTableContent();
}


const handleDeletePerson = function (idx) {
    let path = 'person?idx=' + idx;

    fetch(path, {
        method: 'DELETE'
    }).then(function (response) {
        console.log(response)
    })
    
    updateTableContent();
}

/**
 * Add the json/major.json to the dropdown box
 */
const addDropdownMajors = function () {
    $.getJSON("json/major.json", function (data) {
        majors = data.majors
        $.each(majors, function (key, val) {
            $('#select-major').append("<option value='" + val + "'>" + val + "</option>");
        });
    });
}

/**
 * Clear table, fetch data from server, then place people on table
 */
const updateTableContent = function () {
    // clear the table
    $('#people-table').find('tbody').empty()

    // fetch data from the server
    fetch('people', {
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        return response.json()
    }).then(function (data) {
        console.log(data)
        $.each(data, function (idx, person) {
            const tbody = $('#people-table').find('tbody')
            tbody.append(
                $('<tr>')
                    .append($('<th>')
                        .attr('scope', 'row')
                        .text(idx + 1))
                    .append($('<td>')
                        .text(person.name))
                    .append($('<td>')
                        .text(person.birthday))
                    .append($('<td>')
                        .text(person.major))
                    .append($('<td>')
                        .text(person.age))
                    .append($('<td>')
                        .append($('<button>')
                            .attr('type', 'button')
                            .attr('class', 'btn btn-danger')
                            .attr('onclick', 'handleDeletePerson(' + idx + ')')
                            .text('Delete')))
            );
        })
        return data
    })
}
