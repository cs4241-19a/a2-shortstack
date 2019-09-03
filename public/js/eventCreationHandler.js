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
const FormValidation = {
    validateThenSubmitForm: function() {
        if (this.validateFormFields()) {
            this.submitForm();
        }
    },
    validateFormFields: function() {
        return this.validateEventName(document.getElementById("eventName").value) &&
            this.validatePotentialDates(document.getElementById("dateRange").value) &&
            this.validateStartTime(document.getElementById("startTime").value) &&
            this.validateEndTime(document.getElementById("endTime").value);
    },
    validateEventName: function(eventName) {
        if (eventName != null && eventName !== "") return true;
        alert("Please enter an event name");
        return false;

    },
    validatePotentialDates: function(potentialDates) {
        const parsedDates = potentialDates.split(" to ");
        if (parsedDates.length == 2) return true;
        alert("Please enter valid dates formated like yyyy-mm-dd to yyyy-mm-dd");
        return false;
    },
    validateStartTime: function(startTime) {
        if (this.isValidTime(startTime)) return true;
        alert("Please enter a valid start time formated like HH:MM in military");
        return false;
    },
    validateEndTime: function(endTime) {
        if (this.isValidTime(endTime)) return true;
        alert("Please enter a valid end time formated like HH:MM in military");
        return false;
    },
    isValidTime: function(time) {
        const parsedTime = time.split(":");
        return parsedTime[0] <= 24 && parsedTime[0] >= 0 && parsedTime[1] <= 59 && parsedTime[1] >= 0;
    },
    submitForm: function() {
        const json = this.buildEventJSON();
        const body = JSON.stringify(json);

        fetch( '/submit', {
            method:'POST',
            body
        }).then( function( response ) {
            console.log(response);
        });

        return false;
    },
    buildEventJSON: function() {
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
};