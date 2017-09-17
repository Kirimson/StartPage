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
			if(templinks[i+1].substring(0,8) != "https://" && templinks[i+1].substring(0,7) != "http://"){
				templinks[i+1] = "http://"+templinks[i+1];
			}
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

	localStorage.setItem("personal-links", JSON.stringify(LinkData));

	var newBackgrounds = [];
	//backgrounds
	for(var i = 0; i < 4; i++)
	{
		if($('#'+times[i]+'bg').val().toLowerCase() == "default" || $('#'+times[i]+'bg').val() == "")
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

	//text
	localStorage.setItem("personal-text", JSON.stringify(TextArr));

	location.reload();
});