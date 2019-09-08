// Add some Javascript code here, to run on the front end.

// PRELOADING SCREEN
jQuery('a:not([target="_blank"]):not([href*=#]):not([href^=mailto]):not(.fancybox-media):not(.btn.responsive-menu):not(a[href$="jpg"]):not([href$="jpeg"]):not(a[href$="gif"]):not(a[href$="png"]):not(a.ajax-link)').on('click', function(){
    var href = jQuery(this).attr('href');
    jQuery('.preloader').fadeIn(300);
    setTimeout(function(){
        window.location = href;
    }, 300);
    return false;
});

