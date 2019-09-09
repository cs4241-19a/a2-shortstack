jQuery.noConflict();
jQuery(document).ready(function() {
    jQuery('#addColumnChild').click(function () {
        console.log("added List")
        jQuery('#listRow').each(function () {
            jQuery(this).append(`<td class="listEle"></td>`);
        });
    });
});

