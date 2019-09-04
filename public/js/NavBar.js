$(document).ready(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() > 950) {
            $('#navB').addClass('solid');
            $('.nav-link').addClass('navSc');
        } else {
            $('#navB').removeClass('solid');
            $('.nav-link').removeClass('navSc');
        }
    });
});