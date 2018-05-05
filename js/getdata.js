try{
	//try and get data from local storage
	var LinkData = JSON.parse(localStorage.getItem("personal-links"));
	var test = LinkData.titles;
} catch(err) {
	try{
		//if the cookie from old version is presnet, use thad
		var LinkData = JSON.parse($.cookie("personal-links"));

		//place data into local storage, upgrading storage method
		localStorage.setItem("personal-links", JSON.stringify(LinkData));

		//delete legacy cookie
		$.cookie("personal-links", null);
	}
	catch(err){
		console.log(err.message);
	}
	console.log(err.message);
}

//build html using LinkData
if(LinkData != null)
{
	for(var i = 0; i < LinkData.titles.length; i++)
	{
		//for each title make a secthead div
		var title = LinkData.titles[i].toLowerCase().replace(/\s/g, '');
		var newHTML='<div id="'+title+'" class="gloss secthead">'+LinkData.titles[i]+'</div><div id="'+title+'list" class="section hidden">';

		//for each title go through the links inside the same index of the links parameter
		for(var k = 0; k < LinkData.links[i].length; k++)
		{
			//create an item div
			var noSpace = LinkData.links[i][k][0].toLowerCase().replace(/\W/g, '');
			newHTML+='<a class="sectionlink" href="'+LinkData.links[i][k][1]+'"><div id="'+noSpace+'" class="item">'+LinkData.links[i][k][0]+'</div></a>'
		}
		newHTML += "</div>";

		//append the html to the page
		$('#linkcontain').append(newHTML);
	}
}

//try and get minmode flag
try{
	var minmode = JSON.parse(localStorage.getItem("min-mode"));
	if(minmode == "true")
	{
		minmode = true
	}
	else
	{
		minmode = false;
	}
} catch(err) {
	console.warn("Couldnt find min-mode storage val. Defaulting")
	minmode = false;
}