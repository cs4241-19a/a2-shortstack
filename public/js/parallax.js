$(document).ready(function() {
    $(window).scroll(function() {
        var a = 1015 - $(this).scrollTop;
        $('.parallax').style.height = a.toString();
    });
});