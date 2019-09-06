var $select = $('.selectBox');
$select.each(function() {
    $(this).addClass($(this).children(':selected').val());
}).on('change', function(ev) {
    $(this).attr('class', '').addClass($(this).children(':selected').val());
});