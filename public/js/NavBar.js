$(document).ready(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() > 950) {
            $('#navB').addClass('solid');
            $('.textH').addClass('navSc');
        } else {
            $('#navB').removeClass('solid');
            $('.textH').removeClass('navSc');
        }
    });
});