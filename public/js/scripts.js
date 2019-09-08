console.log("Welcome to assignment 2!")


$(document).ready(function () {
  $(document).on('click', "#next", function() {
    var sections = $('.boardsection[data-board]');
    sections.first().insertAfter(sections.last());
    sections.css({animation: "next 1s 1"});
  })
})
