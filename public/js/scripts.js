// Add some Javascript code here, to run on the front end.
/*
console.log("Welcome to assignment 2!")

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
*/

$(document).ready(function () {
  $("#next").on('click', function() {
    var tests = $('.boardsection[data]');
    tests.first().insertAfter(tests.last());
    //$(".boardsection[data-board]").css({animation: "nextbody 1s forwards"});
    //$(".boardsection[data-board='day_0']").css({animation: "next 1s forwards"});
    $(".boardsection[data-board='day_1']").css({
      'order': "1"
    });
    console.log($(".boardsection[data-board='day_1']").order)
  })
})


// /$(".boardsection[data-board]").style.order + 1 > 7 ? 7 : $(".boardsection[data-board]").style.order + 1



//.boardsection[data-board]
//const nextButton = document.querySelector( '#next' );
/*
const nextAction = function() {
  var num = 0;
  var day = document.getElementById( '.boardsection[data-board=day_' + num + ']' );
  var body = document.getElementById( ':not(.boardsection[data-board=day_' + num + '])' );

  //day.style.color = "blue";
  body.css({animation: "nextbody 1s forwards"})
*/
  //day.style.animation = "next 1s forwards";
  //body.css({animation: "nextbody 1s forwards"});
  

          
//animation: nextbody 1s forwards;
//animation: next 1s forwards;


/*

document.getElementById("tunnel").animate([
  // keyframes
  { transform: 'translateY(0px)' }, 
  { transform: 'translateY(-300px)' }
], { 
  // timing options
  duration: 1000,
  iterations: Infinity
})
*/