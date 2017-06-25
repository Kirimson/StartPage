var clicked = false;

var bgdefaults = ["url(img/late.jpg)", "url(img/morning.jpg)", "url(img/afternoon.jpg)", "url(img/evening.jpg)"];
var times = ["late", "morning", "afternoon", "evening"];

var colorsDef = [
		["#333", "#444", "#555", "#333", "#444", "#eee"],
		["#1F2E1C", "#253930", "#354232", "#21332B", "#414B3F", "#eee"],
		["#151A1D", "#19262F", "#2F3B43", "#16222a", "#3c464c", "#eee"],
		["#2b2241", "#403854", "#4e4467", "#39324B", "#574C73", "#eee"]
	];
var colors = [];

var TextArr = [];
var textDef = [
	["It's pretty late...", "What we doing now?"],
	["Why are you up?", "What we doing now?"],
	["Good Afternoon", "What we doing now?"],
	["Good Evening", "What we doing now?"]
]

//try and get custom backgrounds and links
try{
	var LinkData = JSON.parse(localStorage.getItem("personal-links"));
	var Backgrounds = JSON.parse(localStorage.getItem("personal-bg"));
} catch(err) {
	console.log(err.message);
}

//try and get custom colours
try{
	colors = JSON.parse(localStorage.getItem("personal-colors"));
	var test = colors[0];
} catch(err) {
	console.log(err.message);
	colors = colorsDef;
}

//try and get text
try{
	TextArr = JSON.parse(localStorage.getItem("personal-text"));
	var test = TextArr[0];
}catch(err){
	console.log(err.message);
	TextArr = textDef;
}

function toggleSettings(){
	if(!clicked){
		$('#settingsmain').css('display', 'block');
		getcolorvals();
		gettextvals();
	}
	else
	{
		$('#settingsmain').css('display', 'none');
		$('#settinglinks').focus();
	}
	clicked=!clicked;
}

//clicking outside closes
$(document).mousedown(function (e)
{
	var container = $("#settingsmain");
    if (!container.is(e.target) && container.has(e.target).length === 0 && clicked){
    	toggleSettings();
    }
});

//pressing esc closes
$( "#settinglinks" ).keydown(function( e ) {
	    if (e.keyCode == 27) {
	        toggleSettings();
	    }
	});

//if no linkData show setting window
if(LinkData == null)
{
	toggleSettings();
}
else
{
	//for each titles links
	jQuery.each(LinkData.links, function(index1, el1) {

		//append title for this set of links, with \
		$('#settinglinks').append('\\');
		$('#settinglinks').append(LinkData.titles[index1]);
		$('#settinglinks').append('\n');

		//loop through all links in the section
		jQuery.each(el1, function(index2, el2) {

			//loop through array for each link, extracting lnik name and link title. appeneding both to textarea
			jQuery.each(el2, function(index3, el3) {
				$('#settinglinks').append(el3);
				$('#settinglinks').append('\n');
				
			});
			//append a new line for easier reading
			$('#settinglinks').append('\n');
		});
	});
}

//backgrounds
if(Backgrounds != null)
{
	jQuery.each(LinkData.links, function(index, el) {
		if(Backgrounds[index] == bgdefaults[index])
		{
			$('#'+times[index]+'bg').val('Default');
		}
		else
		{
			var urlless = Backgrounds[index].substr(4);
			urlless = urlless.slice(0, -1);
			$('#'+times[index]+'bg').val(urlless);
		}
	});
}
else
{
	for(var i = 0; i < 4; i++)
	{
		$('#'+times[i]+'bg').val("Default");
	}
}

//click to go up a theme
$('.uptheme').click(function(){
	if(selectedtheme == 3)
	{
		selectedtheme = 0;
	}
	else
	{
		selectedtheme++;
	}
	getcolorvals()
	gettextvals();
	updatefakecol();
});

//click to go down a theme
$('.downtheme').click(function(){
	if(selectedtheme == 0)
	{
		selectedtheme = 3;
	}
	else
	{
		selectedtheme--;
	}
	getcolorvals();
	gettextvals();
	updatefakecol();
});

//clicking settings toggles
$('#settings').click(function(){
	toggleSettings()
});

//clicking x closes
$('#settingsclose').click(function(){
	toggleSettings()
});

function gettextvals(){
	$('#maintext').val(TextArr[selectedtheme][0]);
	$('#subtext').val(TextArr[selectedtheme][1]);
	console.log(TextArr);
}

//Text edit
$('#maintext').keyup(function(e){
	TextArr[selectedtheme][0] = $('#maintext').val();
	console.log(TextArr);
});
$('#subtext').keyup(function(e){
	TextArr[selectedtheme][1] = $('#subtext').val();
	console.log(TextArr);
});

//reset text
$('#maintextreset').click(function(event) {
	TextArr[selectedtheme][0] = textDef[selectedtheme][0];
	$('#maincol').val(textDef[selectedtheme][0]);
});
$('#subtextreset').click(function(event) {
	TextArr[selectedtheme][1] = textDef[selectedtheme][1];
	$('#sectcol').val(textDef[selectedtheme][1]);
});