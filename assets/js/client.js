$(function() {
    var $header = $('header'),
        $search = $('.search input'),
        burgerDelay = 0,
        $dateControl = $('.date__control'),
        $dateList = $('.date__list'),
        $date = $('.date'),
        dateItemOutPos = [],
        dateItemOutWidth = [];


    if ($('.date__item').length > 0) {
        datePositionControl($('.date__item.active'));
    }


    $dateControl.click(function() {
        if ($(this).is('.date__control_r')) {
            $.each($('.date__item'), function(i, v) {
                if ($(v).position().left > ($('.date__view').width() - parseInt($('.date__list').css('left'), 10))) {
                    dateItemOutPos.push($(v).position().left);
                    dateItemOutWidth.push($(v).width());
                }
            });
            $dateList.css('left', ($('.date__view').width() - (dateItemOutPos[0] + dateItemOutWidth[0])) + 'px');
            if ( Math.ceil((-($('.date__view').width() - (dateItemOutPos[0] + dateItemOutWidth[0])))) + $('.date__view').width() >= dateItemSum()) {
                $date.addClass('date_none_next');
            } else {
                $date.removeClass('date_none_next');
                $date.addClass('date_has_prev');
            }
        } else {
            $.each($('.date__item'), function(i, v) {
                if (($(v).position().left < (-parseInt($('.date__list').css('left'), 10)))) {
                    dateItemOutPos.push($(v).position().left);
                    dateItemOutWidth.push($(v).width());
                }
            });
            $dateList.css('left', '-' + dateItemOutPos[dateItemOutPos.length-1] + 'px');
            if (dateItemOutPos[dateItemOutPos.length-1] == 0) {
                $date.removeClass('date_has_prev');
            } else {
                $date.addClass('date_has_prev');
                $date.removeClass('date_none_next');
            }
        }
        dateItemOutPos = [];
        dateItemOutWidth = [];
    });




    function dateItemSum() {
        var dateItemSum = 0;
        $.each($('.date__item'), function() {
            dateItemSum += parseInt($(this).width(), 10) + parseInt($(this).css('marginRight'), 10);
        });
        if ($('.date').length == 1) {
            dateItemSum = dateItemSum;
        } else if ($('.date').length == 2) {
            dateItemSum = dateItemSum / 2;
        }
        return dateItemSum;
    }

    function datePositionControl($node) {
        var nodeLeftPosition = $node.position().left,
            $Ddate = $node.parents('.date'),
            $DdateView = $('.date__view', $Ddate),
            $DdateList = $('.date__list', $Ddate),
            newDatePos = 0;

        newDatePos = nodeLeftPosition;
        $Ddate.removeClass('date_none_next');

        if (nodeLeftPosition > dateItemSum() - $DdateView.width()) {
            newDatePos = dateItemSum() - $DdateView.width();
            $Ddate.addClass('date_none_next');
            $Ddate.addClass('date_has_prev');
        }

        if (nodeLeftPosition > 0) {
            $Ddate.addClass('date_has_prev');
        } else {
            $Ddate.removeClass('date_has_prev');
        }

        $DdateList.css('left', '-' + newDatePos + 'px');
    }






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

    $(function() {
        return $("h2, h3, h4, h5, h6").each(function(i, el) {
            var $el, icon, id;
            $el = $(el);
            id = $el.attr('id');
            icon = '<i class="fa fa-link"></i>';
            if (id) {
                return $el.prepend($("<a />").addClass("deep-link").attr("href", "#" + id).html(icon));
            }
        });
    });

});