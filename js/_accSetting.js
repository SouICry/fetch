$(document).ready(function () {
    $('#address').hide();
    $('#payment').hide();

    $('.nav-tabs a').on('click', function (e) {

        e.preventDefault();
        $('#address').hide();
        $('#payment').hide();
        $('#delete')
        $('#home').hide();
        $(this).parent().addClass('active');
     //   $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tab-content > div').not(target).hide();

        $(target).fadeIn(600);

    });

});