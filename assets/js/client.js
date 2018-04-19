$(function() {
    var $header = $('header'),
        $search = $('.search input'),
        burgerDelay = 0;

    $search.on('focus', function() {
        $header.addClass('header_search');
    });

    $search.on('blur', function() {
        $header.removeClass('header_search');
    });

    $(document).on('mousemove', function(e) {
        if (burgerDelay) {
            if ($(e.target).is('.burger .big-menu *')) {
                $('body').addClass('burger_open');
            } else {
                $('body').removeClass('burger_open');
            }
        }
    });

    $(document).click(function(m) {
        if ($(m.target).is('.burger, .burger > *')) {
            $('body').addClass('burger_open');
            burgerDelay = 0;
            setTimeout(function() {
                burgerDelay = 1
            }, 1000)
        } else {
            $('body').removeClass('burger_open');
        }
    })


});