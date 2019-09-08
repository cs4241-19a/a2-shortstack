console.log("Welcome to assignment 2!")


$(document).ready(function () {
  $(document).on('click', "#next", function() {
    var sections = $('.boardsection[data-board]');
    $(".boardsection[data-board]:first-child").css({animation: "next 1s forwards"});

    sections.first().insertAfter(sections.last());
    $(".boardsection[data-board]").css({animation: "next 1s forwards"});
  })
})
