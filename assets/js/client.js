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
    });


    $('.layout__side').css('min-height', $('.layout__content').height());


    setTimeout(function() {
        $('.article h2').each( function (i, v) {
            $('.layout__side .short-list').append('<div class="side__item" data-href="' + $(v).attr('id') + '">' + $(v).text() + '</div>')
        });
        $('.short-list .side__item:first-child').addClass('active');

        $('[data-href]').click(function() {
            var $this = $(this),
                link = $this.data('href');

            if (link !== 'undefined') {
                $("html, body").animate({scrollTop: $('[id="' + link + '"]').offset().top - 30});
            } else {
                $("html, body").animate({scrollTop: 0});
            }

        });

    }, 10);


    $(window).on('scroll', function(e) {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > $('.contents').offset().top) {
            $('.contents').addClass('contents_fixed');
        } else {
            $('.contents').removeClass('contents_fixed');
        }

        $('.article h2').each(function(i, v) {
            if (scrollTop > $(v).offset().top - ($(window).height() / 2)) {
                $('[data-href]').removeClass('active');
                $('[data-href="' + $('.article h2').eq(i).attr('id') + '"]').addClass('active');
                return
            }
        })

    });

});