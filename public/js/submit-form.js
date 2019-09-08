function submit(e, dataParser, handelResponse) {
    console.log(e, dataParser, handelResponse);
    e.preventDefault();  // prevent url form submission

    const data = JSON.stringify(dataParser());
    console.log("sending: ", data);

    const url = '/submit/create';
    let request = new Request(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(request);

    fetch(request)
        .then((resp) => resp.json())
        .then(function( data ) {
            // do something with the response
            console.log( data );
            handelResponse(data);
        })
        .catch(function (error) {
            console.log( error );
        });

    return false;
}


window.onload = function() {
    if (document.getElementById("addThreadSubmitBtn")) {
        document.getElementById("addThreadSubmitBtn").onclick = ((e) => submit(e, parseAddThreadForm, handelAddThreadResponse));
    } else {
        // if on forum page
        document.getElementById("addSubmitBtn").onclick = ((e) => submit(e, parseAddForm, handelAddResponse));
        document.getElementById("deleteSubmitBtn").onclick = ((e) => submit(e, parseDeleteForm, handelDeleteResponse));
        document.getElementById("editSubmitBtn").onclick = ((e) => submit(e, parseEditForm, handelEditResponse));
    }
};

// PARSE FORM //

function parseAddThreadForm() {
    console.log("ran parse add");
    return {
        action: "ADDTHREAD",
        firstName: document.getElementById("first-name").value,
        middleName: document.getElementById("middle-name").value,
        lastName: document.getElementById("last-name").value,
        message: document.getElementById("message").value,
    }
}

function parseAddForm() {
    console.log("ran parse add");
    return {
        action: "ADD",
        forumId: 1,
        firstName: document.getElementById("first-name").value,
        middleName: document.getElementById("middle-name").value,
        lastName: document.getElementById("last-name").value,
        message: document.getElementById("message").value,
    }
}

function parseDeleteForm() {
    return {
        action: "DELETE",
        forumId: 1,
        messageId: 2,
    }
}

function parseEditForm() {
    return {
        action: "EDIT",
        forumId: 1,
        messageId: 2,
        message: document.getElementById("message").value,
    }
}

// HANDEL RESPONSE //

function handelAddThreadResponse(data) {
    // change page to the new forum page
    location = "/forum/" + data.forumId;
}

function handelAddResponse(data) {
    // refresh the page to show added message
    location.reload();
}

function handelDeleteResponse(data) {
    // refresh the page to show the message was deleted
    location.reload();
}

function handelEditResponse(data) {
    // refresh the page to show the edited message
    location.reload();
}

