// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
//.boardsection[data-board]
//const nextButton = document.querySelector( '#next' );

const nextAction = function(num) {
  var day = document.querySelector( '.boardsection[data-board=day_' + num + ']' );
  var body = document.querySelector( ':not(.boardsection[data-board=day_' + num + '])' );
  day.animate('next', '1s', 'forwards');
  body.animate('nextbody', '1s', 'forwards');
  
}

