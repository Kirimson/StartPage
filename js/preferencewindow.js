var clicked = false;

var late = "#333";
var darkLate = "#444";
var darkHover = "555";

var morning = "#1F2E1C";
var darkMorning = "#253930"
var morningHover = "#21332B";

var afternoon = "#151A1D";
var darkAfternoon = "#19262F";
var afternoonHover = "#16222a";

var evening = "#2b2241";
var darkEvening = "#403854";
var eveningHover = "#39324B";

var bgdefaults = ["url(img/late.jpg)", "url(img/morning.jpg)", "url(img/afternoon.jpg)", "url(img/evening.jpg)"];
var times = ["late", "morning", "afternoon", "evening"];

try{
	var LinkData = JSON.parse(localStorage.getItem("personal-links"));
	var Backgrounds = JSON.parse(localStorage.getItem("personal-bg"));
} catch(err) {
	console.log(err.message);
}

function toggleSettings(){
	if(!clicked){
		$('#settingsmain').css('display', 'block');
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

	location.reload();
});