var count = 0;
var time;
var mainColor, sectheadColor, itemColor, sectheadhoverColor, itemhoverColor;

function greeting() {
    var d = new Date();
    var h = d.getHours();
    var m;

    if(h >= 1 && h <= 8){
        
        m = "It's pretty late..."
        if(time != 0){$('html').css("background-image", "url(img/late.jpg)");}

        mainColor = "#333"
        sectheadColor = "#444"
        itemColor = "#555"
        sectheadhoverColor = "#333"
        itemhoverColor = "#444"

        $('meta[name=theme-color]').remove();
        $('head').append( '<meta name="theme-color" content="'+mainColor+'">' );

        $('.main').css("background-color", mainColor)
        $('.secthead').css("background-color", sectheadColor)
        $('.item').css("background-color", itemColor)

        $(".secthead").hover(function(e) {
            $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
        });
        $(".item").hover(function(e) {
             $(this).css("background-color",e.type === "mouseenter"?itemhoverColor:itemColor)
        });
        time = 0;
    }
    if(h >= 9 && h <= 11){
        
        m = "Why are you up?"
        if(time != 1){$('html').css("background-image", "url(img/morning.jpg)");}

        mainColor = "#1F2E1C"
        sectheadColor = "#253930"
        itemColor = "#354232"
        sectheadhoverColor = "#21332B"
        itemhoverColor = "#414B3F"

        $('meta[name=theme-color]').remove();
        $('head').append( '<meta name="theme-color" content="'+mainColor+'">' );

        $('.main').css("background-color", mainColor)
        $('.secthead').css("background-color", sectheadColor)
        $('.item').css("background-color", itemColor)

        $(".secthead").hover(function(e) {
            $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
        });
        $(".item").hover(function(e) {
             $(this).css("background-color",e.type === "mouseenter"?itemhoverColor:itemColor)
        });
        time = 1;
    }

    if(h >= 12 && h <= 17){
        
        m = "Good Afternoon"
        if(time != 2){$('html').css("background-image", "url(img/afternoon.jpg)");}

        mainColor = "#151A1D"
        sectheadColor = "#19262F"
        itemColor = "#2F3B43"
        sectheadhoverColor = "#16222a"
        itemhoverColor = "#3c464c"

        $('meta[name=theme-color]').remove();
        $('head').append( '<meta name="theme-color" content="'+mainColor+'">' );

        $('.main').css("background-color", mainColor)
        $('.secthead').css("background-color", sectheadColor)
        $('.item').css("background-color", itemColor)

        $(".secthead").hover(function(e) {
            $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
        });
        $(".item").hover(function(e) {
             $(this).css("background-color",e.type === "mouseenter"?itemhoverColor:itemColor)
        });

        time = 2;
    }

    if(h >= 18 || h==0){
        
        m = "Good Evening"
        if(time != 3){$('html').css("background-image", "url(img/evening.jpg)");}

        mainColor = "#2b2241"
        sectheadColor = "#403854"
        itemColor = "#4e4467"
        sectheadhoverColor = "#39324B"
        itemhoverColor = "#574C73"

        $('meta[name=theme-color]').remove();
        $('head').append( '<meta name="theme-color" content="'+mainColor+'">' );

        $('.main').css("background-color", mainColor)
        $('.secthead').css("background-color", sectheadColor)
        $('.item').css("background-color", itemColor)

        $(".secthead").hover(function(e) {
            $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
        });
        $(".item").hover(function(e) {
             $(this).css("background-color",e.type === "mouseenter"?itemhoverColor:itemColor)
        });
        time = 3;
    }

    $('#hello').html(m);
    $('#cc').html(count);
    count = count + 1;
    var t = setTimeout(greeting, 60000);
};
$(document).ready(function() {
    setTimeout(greeting, 1);
});
