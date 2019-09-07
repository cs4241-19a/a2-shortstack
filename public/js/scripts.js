// Add some Javascript code here, to run on the front end.

function submitForm() {
    // prevent default form action from being carried out
    const form = document.querySelector('#queryForm'),
        data = formToJSON(form.elements);
    
    console.log(data)
    fetch('/', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return false;
}

const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    data[element.name] = element.value;
    return data;

}, {});

window.onload = function() {
    document.querySelector('#queryForm').addEventListener('submit', submitForm);
}
