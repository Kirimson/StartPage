var clicked = false;

var late = "#333";
var darkLate = "#444";
var morning = "#21332B";
var darkMorning = "#253930"
var afternoon = "#16222a";
var darkAfternoon = "#19262F";
var evening = "#2b2241";
var darkEvening = "#39324B";

var textAreas = document.getElementsByTagName('textarea');

Array.prototype.forEach.call(textAreas, function(elem) {
	console.log("woo2");
    elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
});

try{
	var LinkData = JSON.parse($.cookie("personal-links"));
} catch(err) {
	console.log(err.message);
}

function toggleSettings(){
	if(!clicked){
		$('#settingsmain').css('display', 'block');

		var currTime = timeCheck();

		if(currTime == 1){
			$('#settingsmain').css('background-color', late);
			$('#settinglinks').css('background-color', darkLate);
		}
		if(currTime == 2){
			$('#settingsmain').css('background-color', morning);
			$('#settinglinks').css('background-color', darkMorning);
		}
		if(currTime == 3){
			$('#settingsmain').css('background-color', afternoon);
			$('#settinglinks').css('background-color', darkAfternoon);
		}
		if(currTime == 4){
			$('#settingsmain').css('background-color', evening);
			$('#settinglinks').css('background-color', darkEvening);
		}
	}
	else
	{
		$('#settingsmain').css('display', 'none');
	}
	clicked=!clicked;
}

$( "#settinglinks" ).keydown(function( e ) {
	    if (e.keyCode == 27) {
	        toggleSettings();
	    }
	});

if(typeof LinkData == 'undefined')
{
	toggleSettings();
}
else
{
	console.log("From the cookie");
	console.log(LinkData);

	jQuery.each(LinkData.titles, function(index, el) {
		$('#settingtitles').append(el);
		if(index != LinkData.titles.length-1){
			$('#settingtitles').append('\n');
		}
	});


	jQuery.each(LinkData.links, function(index1, el1) {

		if(index1==0){$('#settinglinks').append('\\');}
		$('#settinglinks').append(LinkData.titles[index1]);
		$('#settinglinks').append('\n');

		jQuery.each(el1, function(index2, el2) {
			jQuery.each(el2, function(index3, el3) {
				$('#settinglinks').append(el3);
				$('#settinglinks').append('\n');
			});
		});

		$('#settinglinks').append('\\');
	});

}


$('#settings').click(function(){
	toggleSettings()
});

$('#settingsclose').click(function(){
	toggleSettings()
});

$('#settingssubmit').click(function(){
	var LinkData = { }

	var titles = [];

	var links = [];

	var templinks = $('#settinglinks').val().split('\n');
	var linklength = templinks.length;

	var linksforarray = [];
	for(var i = 0; i < linklength; i = i+2)
	{
		if(templinks[i].charAt(0) != "\\") 
		{
			var linkdetails = [templinks[i], templinks[i+1]];
			linksforarray.push(linkdetails);
		}
		else
		{
			if(i != linklength-1)
			{
				var sectiontitle = templinks[i].substr(1);
				titles.push(sectiontitle);
			}

			if(i !=0 )
			{
				links.push(linksforarray);
				linksforarray = [];
			}

			i = i-1;
		}

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

	$.cookie("personal-links", JSON.stringify(LinkData), { expires: 365 });
	location.reload();
});