var count = 0;
var time;
var mainColor, sectheadColor, itemColor, sectheadhoverColor, itemhoverColor;

try{
    //try and get data from local storage
    var backgrounds = JSON.parse(localStorage.getItem("personal-bg"));
    var test = backgrounds[0];
} catch(err) {
    console.log("caught");
    backgrounds = ["url(img/late.jpg)", "url(img/morning.jpg)", "url(img/afternoon.jpg)", "url(img/evening.jpg)"];
}

function timeCheck()
{
    var date = new Date();
    var ho = date.getHours();
    
    if(ho >= 1 && ho <= 8){return 1;}

    if(ho >= 9 && ho <= 11){return 2;}

    if(ho >= 12 && ho <= 17){return 3;}

    if(ho >= 18 || ho ==0){return 4;}
};

function greeting() {
    var d = new Date();
    var h = d.getHours();
    var m;

    var t = timeCheck();

    if(t == 1){
        
        m = "It's pretty late..."
        if(time != 0){$('html').css("background-image", backgrounds[0]);}

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
            if(!$(this).hasClass('nohover'))
            {
                $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
            }
        });

        $(".item").hover(function(e) {
            if(!$(this).hasClass('nohover'))
            {
                $(this).css("background-color",e.type === "mouseenter"?itemhoverColor:itemColor)
            }
        });
        time = 0;
    }
    if(t == 2){
        
        m = "Why are you up?"
        if(time != 1){$('html').css("background-image", backgrounds[1]);}

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
            if(!$(this).hasClass('nohover'))
            {
                $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
            }
        });
        $(".item").hover(function(e) {
            if(!$(this).hasClass('nohover'))
            {
                $(this).css("background-color",e.type === "mouseenter"?itemhoverColor:itemColor)
            }
        });
        time = 1;
    }

    if(t == 3){
        
        m = "Good Afternoon"
        if(time != 2){$('html').css("background-image", backgrounds[2]);}

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
            if(!$(this).hasClass('nohover'))
            {
                $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
            }
        });
        $(".item").hover(function(e) {
            if(!$(this).hasClass('nohover'))
            {
                $(this).css("background-color",e.type === "mouseenter"?itemhoverColor:itemColor)
            }
        });

        time = 2;
    }

    if(t == 4){
        
        m = "Good Evening"
        if(time != 3){$('html').css("background-image", backgrounds[3]);}

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
            if(!$(this).hasClass('nohover'))
            {
                $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
            }
        });
        $(".item").hover(function(e) {
            if(!$(this).hasClass('nohover'))
            {
                $(this).css("background-color",e.type === "mouseenter"?itemhoverColor:itemColor)
            }
        });
        time = 3;
    }

    $('#hello').html(m);
    count = count + 1;
    var t = setTimeout(greeting, 60000);
};

$(document).ready(function() {
    setTimeout(greeting, 1);
});
