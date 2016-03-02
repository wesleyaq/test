var $wTempWidth, $hDS, resizeTimer;
var $wWid = 0;
var $hOp = 0;

$(function() {
    resizeWindowBoxs();

    // Evento click para los tabs
    $('.tab').click(function() {
        var index = $(this).closest('.grupotabs').children('.tab').index(this);
        $(this).addClass('active').siblings('.tab').removeClass('active');
        $(this).closest('.box-contTabs').find('.gContenidoinfoTab:first').children('.gInfoTab').eq(index).addClass('active').siblings('.gInfoTab').removeClass('active');
        resetStretchTab();
    });

    // Evento click para el stretch
    $('.stretcher-new').click(function(event) { 
        if($(this).hasClass('active')){
            stretchUp($(this), '.box-seeMore');
        }else{
            stretchDown($(this), '.box-seeMore');
        }
    });

});

function resetStretchTab () {
    $('.box-seeMore').each(function(index, el) {
        var $elem = $(el);
        $elem.height($hOp);
        $elem.next('.stretcher-new').removeClass('active');
    });
}

function stretchUp (elem, cont) {
    var $elem = elem;
    var bthr = $elem.prev(cont);
    bthr.animate({
        height: $hOp
    }, 900);
    $elem.removeClass('active');
}

function stretchDown (elem, cont) {
    var $elem = elem;
    var bthr = $elem.prev(cont);
    $hDS = bthr[0].scrollHeight;
    bthr.animate({
        height: $hDS
    }, 900);
    $elem.addClass('active');
}

function resizeWindowBoxs(){
    if (($('.box-seeMore').length) && ($('.stretcher-new').length)){
        $wTempWidth = window.innerWidth;
        if($wTempWidth != $wWid){
            if ( $wTempWidth <= 639 ) {
                $hOp = 135;
            } else {
                $hOp = 270;
            };
            $wWid = $wTempWidth;
            $('.box-seeMore').each(function(index, el) {
                var $elem = $(el);
                $elem.height($hOp);
                $elem.next('.stretcher-new').removeClass('active');
            });
        }
    } 
}

$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeWindowBoxs, 150);
});