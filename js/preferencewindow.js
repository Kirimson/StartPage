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

function toggleSettings(){
	if(!clicked){
		$('#settingsmain').css('display', 'block');
		getcolorvals()
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

//colours
var selectedtheme = 1;
updatefakecol();

function updatefakecol(){

	switch(selectedtheme)
	{
		case 0: $('#themename').html("Theme: Late");break;
		case 1: $('#themename').html("Theme: Morning");break;
		case 2: $('#themename').html("Theme: Afternoon");break;
		case 3: $('#themename').html("Theme: Evening");break;
	}

	$('#fakemain').css("background-color", colors[selectedtheme][0]);
	$('#fakesecthead').css("background-color", colors[selectedtheme][1]);
	$('#fakeitem').css("background-color", colors[selectedtheme][2]);
	$('#fakemain').css("color", colors[selectedtheme][5]);


	$("#fakesecthead").hover(function(e) {
        if(!$(this).hasClass('nohover'))
        {
            $(this).css("background-color",e.type === "mouseenter"?colors[selectedtheme][3]:colors[selectedtheme][1])
        }
    });
    $("#fakeitem").hover(function(e) {
        if(!$(this).hasClass('nohover'))
        {
            $(this).css("background-color",e.type === "mouseenter"?colors[selectedtheme][4]:colors[selectedtheme][2])
        }
    });
}

//edit cols
$('#maincol').keyup(function(e){
	colors[selectedtheme][0] = $('#maincol').val();
	updatefakecol();
});
$('#sectcol').keyup(function(e){
	colors[selectedtheme][1] = $('#sectcol').val();
	updatefakecol();
});
$('#itemcol').keyup(function(e){
	colors[selectedtheme][2] = $('#itemcol').val();
	updatefakecol();
});
$('#secthovercol').keyup(function(e){
	colors[selectedtheme][3] = $('#secthovercol').val();
	updatefakecol();
});
$('#itemhovercol').keyup(function(e){
	colors[selectedtheme][4] = $('#itemhovercol').val();
	updatefakecol();
});
$('#textcol').keyup(function(e){
	colors[selectedtheme][5] = $('#textcol').val();
	updatefakecol();
});

//reset colors
$('#mainreset').click(function(event) {
	colors[selectedtheme][0] = colorsDef[selectedtheme][0];
	$('#maincol').val(colorsDef[selectedtheme][0]);
	updatefakecol();
});
$('#sectreset').click(function(event) {
	colors[selectedtheme][1] = colorsDef[selectedtheme][1];
	$('#sectcol').val(colorsDef[selectedtheme][1]);
	updatefakecol();
});
$('#itemreset').click(function(event) {
	colors[selectedtheme][2] = colorsDef[selectedtheme][2];
	$('#itemcol').val(colorsDef[selectedtheme][2]);
	updatefakecol();
});
$('#secthoverreset').click(function(event) {
	colors[selectedtheme][3] = colorsDef[selectedtheme][3];
	$('#secthovercol').val(colorsDef[selectedtheme][3]);
	updatefakecol();
});
$('#itemhoverreset').click(function(event) {
	colors[selectedtheme][4] = colorsDef[selectedtheme][4];
	$('#itemhovercol').val(colorsDef[selectedtheme][4]);
	updatefakecol();
});
$('#textreset').click(function(event) {
	colors[selectedtheme][5] = colorsDef[selectedtheme][5];
	$('#textcol').val(colorsDef[selectedtheme][5]);
	console.log(colors);
	updatefakecol();
});

function getcolorvals(){
	console.log(colors);
	$('#maincol').val(colors[selectedtheme][0]);
	$('#sectcol').val(colors[selectedtheme][1]);
	$('#itemcol').val(colors[selectedtheme][2]);
	$('#secthovercol').val(colors[selectedtheme][3]);
	$('#itemhovercol').val(colors[selectedtheme][4]);
	$('#textcol').val(colors[selectedtheme][5]);
}

//click to go up a theme
$('#uptheme').click(function(){
	if(selectedtheme == 3)
	{
		selectedtheme = 0;
	}
	else
	{
		selectedtheme++;
	}
	getcolorvals()
	updatefakecol();
});

//click to go down a theme
$('#downtheme').click(function(){
	if(selectedtheme == 0)
	{
		selectedtheme = 3;
	}
	else
	{
		selectedtheme--;
	}
	getcolorvals()
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

$('#settingssubmit').click(function(){

	//object to be jsonified
	var LinkData = { }
	//titles array for object
	var titles = [];
	//links array for object
	var links = [];
	//array of how links textarea is formatted
	var templinks = $('#settinglinks').val().split('\n');
	templinks = templinks.filter(function(v){return v!==''});
	var linklength = templinks.length;
	console.log(templinks);

	//if the last line is not a \ push a \
	if(templinks[linklength-1] != "\\")
	{
		templinks.push("\\");
		linklength++;
	}

	//array of each title links
	var linksforarray = [];
	for(var i = 0; i < linklength; i = i+2)
	{
		//check if the line is a link
		if(templinks[i].charAt(0) != "\\") 
		{
			//create a link array, containing the title and the url
			var linkdetails = [templinks[i], templinks[i+1]];
			linksforarray.push(linkdetails);
		}
		else
		{
			if(i != linklength-1)
			{
				//push the title to the title array
				var sectiontitle = templinks[i].substr(1);
				titles.push(sectiontitle);
			}

			//if not the first title push the array of the titles links to the links array as well as the title
			if(i !=0 )
			{
				links.push(linksforarray);
				linksforarray = [];
			}

			i = i-1;
		}

		//if on the last line push the links
		if(i == linklength-1)
		{
			links.push(linksforarray);
			linksforarray = [];
		}
	}
	
	LinkData.titles = titles;
	LinkData.links = links;

	console.log("From the textarea");
	console.log(LinkData);

	localStorage.setItem("personal-links", JSON.stringify(LinkData));

	var newBackgrounds = [];
	//backgrounds
	for(var i = 0; i < 4; i++)
	{
		if($('#'+times[i]+'bg').val() == "Default" || $('#'+times[i]+'bg').val() == "")
		{
			newBackgrounds.push(bgdefaults[i]);
		}
		else
		{
			newBackgrounds.push('url('+$('#'+times[i]+'bg').val()+')');
		}
	}

	localStorage.setItem("personal-bg", JSON.stringify(newBackgrounds));

	//colors
	localStorage.setItem("personal-colors", JSON.stringify(colors));

	location.reload();
});