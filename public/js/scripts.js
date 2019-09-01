// Add some Javascript code here, to run on the front end.
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
console.log("Welcome to assignment 2!")