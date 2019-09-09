// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

const submit = function (e) {
    e.preventDefault(); // prevent default form action from being carried out

    const
        name = document.querySelector('#name'),
        contentType = getContentType(),
        content = document.querySelector('#content'),
        json = {
            name: name.value,
            type: contentType,
            content: content.value
        },
        body = JSON.stringify(json);


    fetch('/submit', {method: 'POST', body})
        .then(
            function (response) {
                // do something with the reponse
                console.log(response)
            });

    return false
};

window.onload = function () {
    const button = document.querySelector('#submitButton');
    const resultsButton = document.querySelector('#resultsButton');
    button.onclick = submit;
    resultsButton.onclick = goToResults;
    updateContentLabel();
};

const goToResults = function(){
    const url = window.location;
    window.location.href = url.protocol + "//" + url.host + "/results.html";
};

function getContentType() {
    let typeSelector = document.querySelector('#contentTypeSelector');
    return typeSelector.options[typeSelector.selectedIndex].value;
}

function updateContentLabel() {
    document.getElementById('contentLabel').innerHTML = 'Your ' + getContentType() + ": ";
}




