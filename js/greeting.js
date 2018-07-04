var count = 0;
var time;

var coloursDef = [
        ["#333", "#444", "#555", "#333", "#444"],
        ["#1F2E1C", "#253930", "#354232", "#21332B", "#414B3F"],
        ["#151A1D", "#19262F", "#2F3B43", "#16222a", "#3c464c"],
        ["#2b2241", "#403854", "#4e4467", "#39324B", "#574C73"]
    ];

var customText = [];
var textDef = [
        ["It's pretty late...", "What we doing now?"],
        ["Good Morning", "What we doing now?"],
        ["Good Afternoon", "What we doing now?"],
        ["Good Evening", "What we doing now?"]
    ];

var customColors;

//try and get custom colours
try{
    customColors = JSON.parse(localStorage.getItem("personal-colors"));
    var test = customColors[0];
} catch(err) {
    console.warn(err.message);
    customColors = coloursDef;
}

//try and get custom text
try{
    customText = JSON.parse(localStorage.getItem("personal-text"));
    var test = customText[0];
} catch(err) {
    console.log(err.message);
    customText = textDef;
}

var mainColor, sectheadColor, itemColor, sectheadhoverColor, itemhoverColor;

//try and get backgrounds from local storage
try{
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
    
    if(ho >= 1 && ho <= 6){return 1;}
    if(ho >= 6 && ho <= 11){return 2;}
    if(ho >= 12 && ho <= 17){return 3;}
    if(ho >= 18 || ho == 0){return 4;}
};

function greeting() {
    var d = new Date();
    var h = d.getHours();
    var m;

    var t = timeCheck();

    if(t == 1){
        
        msg = customText[0][0];
        doingmsg = customText[0][1];
        if(time != 0){$('html').css("background-image", backgrounds[0]);}

        mainColor = customColors[0][0];
        sectheadColor = customColors[0][1];
        itemColor = customColors[0][2];
        sectheadhoverColor = customColors[0][3];
        itemhoverColor = customColors[0][4];
        textColor = customColors[0][5];

        time = 0;
    }
    if(t == 2){
        
        msg = customText[1][0];
        doingmsg = customText[1][1];
        if(time != 1){$('html').css("background-image", backgrounds[1]);}

        mainColor = customColors[1][0]
        sectheadColor = customColors[1][1]
        itemColor = customColors[1][2]
        sectheadhoverColor = customColors[1][3]
        itemhoverColor = customColors[1][4]
        textColor = customColors[1][5];

        time = 1;
    }

    if(t == 3){
        
        msg = customText[2][0];
        doingmsg = customText[2][1];
        if(time != 2){$('html').css("background-image", backgrounds[2]);}

        mainColor = customColors[2][0]
        sectheadColor = customColors[2][1]
        itemColor = customColors[2][2]
        sectheadhoverColor = customColors[2][3]
        itemhoverColor = customColors[2][4]
        textColor = customColors[2][5];

        time = 2;
    }

    if(t == 4){
        
        msg = customText[3][0];
        doingmsg = customText[3][1];
        if(time != 3){$('html').css("background-image", backgrounds[3]);}

        mainColor = customColors[3][0]
        sectheadColor = customColors[3][1]
        itemColor = customColors[3][2]
        sectheadhoverColor = customColors[3][3]
        itemhoverColor = customColors[3][4]
        textColor = customColors[3][5];

        time = 3;
    }

    $('html').css('color', textColor);
    $('input').css('color', textColor);

    $('meta[name=theme-color]').remove();
    $('head').append( '<meta name="theme-color" content="'+mainColor+'">' );

    $('.main').css("background-color", mainColor);
    $('.secthead').css("background-color", sectheadColor);
    $('.item').css("background-color", itemColor);

    $('#settings').css("background-color", sectheadColor);

    $(".secthead").hover(function(e) {
        if(!$(this).hasClass('nohover'))
        {
            $(this).css("background-color",e.type === "mouseenter"?sectheadhoverColor:sectheadColor)
        }
    });
    $("#settings").hover(function(e) {
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

    $('#hello').html(msg);
    $('#whatwedoing').html(doingmsg);
    count = count + 1;
    var t = setTimeout(greeting, 60000);
};

$(document).ready(function() {
    setTimeout(greeting, 1);
});
