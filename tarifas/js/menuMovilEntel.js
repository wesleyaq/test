var $Window, $iButtom, $iButtomInt, $prev, $wWidth, $wHeight, $bWidth, $nWidth, $bdHeight, $wTempWidth, $wTempHeight, $bTempWidth, $nTempWidth, $bdTempHeight, htmlMenu;



$(window).resize(function() {
    /* Act on the event */
    $wTempWidth = window.innerWidth;
    $bdTempHeight = $('body').height();
    $bTempWidth = $('#iButtom').width();
    $nTempWidth = $wTempWidth / 2;
    $('.gNav').css({
        width: $nTempWidth,
        height: $bdTempHeight
    });
});

$(function() {
    var btBack = '<a href="javascript:history.back();" class="clearfix btn-back"></a>'
    if ($('#header').length) {
        if ($('#header').hasClass('js-menu')) { //validad si el header tiene la clase js-menu y si la tiene hace el llamdo del
            var urlMenu = '/m/includes/header/menu/menu.html'     //menu desplegable que ese en cuenta en menu.html
            $.ajax({
                type: "GET",
                url: urlMenu,
                dataType: 'html',
                success: function(data) {
                    $('#header').append(data);
                    fxMenu();
                }
            });
        } else{
            $('#header').append(btBack);
        };
    };

});

function fxMenu() {
    // body...
    $Window = $(window);
    $iButtom = $('#iButtom');
    $iButtomInt = $('.gInterButtom');
    $prev = $iButtom.prev('.gNav');

    $wWidth = $Window.width();
    $wHeight = $Window.height();
    $bWidth = $iButtom.width();
    $bdHeight = $('body').height();
    $nWidth = $wWidth / 2;
    $('.gNav').css({
        width: $nWidth,
        height: $bdHeight
    });


    $iButtom.on('click', function() {
        $prev.css('display', 'block');
        if (($nWidth != $nTempWidth) && (!isNaN($nTempWidth))) {
            $nWidth = $nTempWidth;
        };
        $iButtom.hide();
        $prev.stop().animate({
            /*display: 'block',*/
            left: 0
        }, {
            complete: function() {
                $prev.css('display', 'block');
            }
        });
    });
    $iButtomInt.on('click', function() {
        if (($nWidth != $nTempWidth) && (!isNaN($nTempWidth))) {
            $nWidth = $nTempWidth;
        };
        $prev.stop().animate({
            left: -$nWidth
        }, {
            complete: function() {
                $prev.css('display', 'none');
                $iButtom.show();
            }
        });
    });
    $prev.touchwipe({
        wipeLeft: function() {
            $prev.stop().animate({
                left: -$nWidth
            }, {
                complete: function() {
                    $prev.css('display', 'none');
                    $iButtom.show();
                }
            });
            $prev.toggleClass('activo');
            $iButtom.toggleClass('push');
        },
        min_move_x: 50,
        preventDefaultEvents: false
    });
}
