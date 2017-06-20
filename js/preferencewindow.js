var clicked = false;

try{
	var LinkData = JSON.parse($.cookie("personal-links"));
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
	}
	clicked=!clicked;
}

if(typeof LinkData == 'undefined')
{
	toggleSettings();
}
else
{
	console.log(LinkData);

	jQuery.each(LinkData.titles, function(index, el) {
		$('#settingtitles').append(el);
		if(index != LinkData.titles.length-1){
			$('#settingtitles').append('\n');
		}
	});

	jQuery.each(LinkData.links, function(index1, el1) {
		jQuery.each(el1, function(index2, el2) {
			jQuery.each(el2, function(index3, el3) {
				$('#settinglinks').append(el3);
				$('#settinglinks').append('\n');
			});
		});

		$('#settinglinks').append('\\');
		if(index1 != LinkData.links.length-1){
			$('#settinglinks').append('\n');
		}
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

	var titles = $('#settingtitles').val().split('\n');
	var titlelength = titles.length;

	var links = [];

	var templinks = $('#settinglinks').val().split('\n');
	var linklength = templinks.length;

	var linksforarray = [];
	for(var i = 0; i < linklength; i = i+2)
	{
		if(templinks[i] != "\\") 
		{
			var linkdetails = [templinks[i], templinks[i+1]];
			linksforarray.push(linkdetails);
		}
		else
		{
			links.push(linksforarray);
			linksforarray = [];
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

	console.log(LinkData);

	$.cookie("personal-links", JSON.stringify(LinkData), { expires: 365 });
	location.reload();
});