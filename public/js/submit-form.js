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


// add model submit button events and model activation events
window.onload = function() {
    if (document.getElementById("addThreadSubmitBtn")) {
        document.getElementById("addThreadSubmitBtn").onclick = ((e) => submit(e, parseAddThreadForm, handelAddThreadResponse));
    } else {
        // if on forum page
        document.getElementById("addSubmitBtn").onclick = ((e) => submit(e, parseAddForm, handelAddResponse));
        document.getElementById("deleteSubmitBtn").onclick = ((e) => submit(e, parseDeleteForm, handelDeleteResponse));
        document.getElementById("editSubmitBtn").onclick = ((e) => submit(e, parseEditForm, handelEditResponse));
        // transfer data from button press to forum
        for (let addBtn of document.getElementsByClassName('add-btn')) {
            addBtn.onclick = addClick;
        }
        for (let deleteBtn of document.getElementsByClassName('delete-btn')) {
            deleteBtn.onclick = deleteClick;
        }
        for (let editBtn of document.getElementsByClassName('edit-btn')) {
            editBtn.onclick = editClick;
        }
    }
};


// Track current message and forum id so that info can be sent to the backend on a post

let curMessageId;
let curForumId;
function addClick(btn) {
    curForumId = btn.target.dataset.forumid;
}
function deleteClick(btn) {
    let link = btn.target.parentElement;
    curMessageId = link.dataset.messageid;
    curForumId = document.querySelector('.add-btn').dataset.forumid;
}
function editClick(btn) {
    let link = btn.target.parentElement;
    curMessageId = link.dataset.messageid;
    curForumId = document.querySelector('.add-btn').dataset.forumid;
    let curText = link.parentElement.parentElement.parentElement.lastElementChild.textContent.trim();
    let editMotelMessage = document.querySelector("#editFormModal textarea#message");
    console.log(curText);
    console.log(editMotelMessage);
    editMotelMessage.value = curText;
}


// PARSE FORM //

function parseAddThreadForm() {
    console.log("ran parse add");
    return {
        action: "ADDTHREAD",
        firstName: document.getElementById("first-name").value,
        middleName: document.getElementById("middle-name").value,
        lastName: document.getElementById("last-name").value,
        title: document.getElementById("title").value,
        message: document.getElementById("message").value,
    }
}

function parseAddForm() {
    console.log("ran parse add");
    return {
        action: "ADD",
        forumId: curForumId,
        firstName: document.getElementById("first-name").value,
        middleName: document.getElementById("middle-name").value,
        lastName: document.getElementById("last-name").value,
        message: document.querySelector("#addFormModal textarea#message").value,
    }
}

function parseDeleteForm() {
    return {
        action: "DELETE",
        messageId: curMessageId,
        forumId: curForumId,
    }
}

function parseEditForm() {
    return {
        action: "EDIT",
        messageId: curMessageId,
        forumId: curForumId,
        message: document.querySelector("#editFormModal textarea#message").value,
    }
}


// HANDEL RESPONSE //

function handelAddThreadResponse(data) {
    // change page to the new forum page
    if (data.forumId) {
        location = "/forum/" + data.forumId;
    } else {
        location.reload();
    }
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

