console.log("Welcome to assignment 2!")


$(document).ready(function () {
  $(document).on('click', "#next", function() {
    var sections = $('.boardsection[data-board]');
    sections.first().insertAfter(sections.last());
    sections.css({animation: "next 1s 1"});
    });
  $('button').hover( function() {
    $(this).css({'background-color':'#D6DADA'})
    $(this).css({'color':'#1C1C1D'})
  }, function () {
    $(this).css({'background-color':'#1C1C1D'})
    $(this).css({'color':'white'})
  });
  $('div.boardsection[data-board] div.tasklist div.index').hover( function() {
    $(this).css({'background-color':'#FCA0A3'})
    $(this).css({'color':'#1C1C1D'})
  }, function () {
    $(this).css({'background-color':'#1C1C1D'})
    $(this).css({'color':'white'})
  });
})
