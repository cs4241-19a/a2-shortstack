// JQuery
$(document).ready(function() {
    $("#dateRange").flatpickr({
        mode: 'range',
        dateFormat: "Y-m-d"
    });

    $("#startTime").flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });

    $("#endTime").flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });
});

// Javascript
function validateThenSubmitForm() {
    if (validateFormFields()) {
        submitForm();
    }
}

function validateFormFields() {
    return validateEventName(document.getElementById("eventName").value) &&
        validatePotentialDates(document.getElementById("dateRange").value) &&
        validateStartTime(document.getElementById("startTime").value) &&
        validateEndTime(document.getElementById("endTime").value);
}

function validateEventName(eventName) {
    if (eventName != null && eventName !== "") return true;
    alert("Please enter an event name");
    return false;

}

function validatePotentialDates(potentialDates) {
    const parsedDates = potentialDates.split(" to ");
    if (parsedDates.length == 2) return true;
    alert("Please enter valid dates formated like yyyy-mm-dd to yyyy-mm-dd");
    return false;
}

function validateStartTime(startTime) {
    if (isValidTime(startTime)) return true;
    alert("Please enter a valid start time formated like HH:MM in military");
    return false;
}

function validateEndTime(endTime) {
    if (isValidTime(endTime)) return true;
    alert("Please enter a valid end time formated like HH:MM in military");
    return false;
}

function isValidTime(time) {
    const parsedTime = time.split(":");
    return parsedTime[0] <= 24 && parsedTime[0] >= 0 && parsedTime[1] <= 59 && parsedTime[1] >= 0;
}

function submitForm() {
    const json = buildEventJSON();
    const body = JSON.stringify(json);

    fetch( '/submit', {
        method:'POST',
        body 
    }).then( function( response ) {
        console.log(response);
    });

    return false;
}

function buildEventJSON() {
    const eventJSON = {
        "eventName": document.getElementById("eventName").value,
        "potentialDates": document.getElementById("dateRange").value,
        "startTime": document.getElementById("startTime").value,
        "endTime": document.getElementById("endTime").value,
        "participants": [
        ]
    };
    return eventJSON;
}