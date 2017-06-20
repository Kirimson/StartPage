try{
	var LinkData = JSON.parse($.cookie("personal-links"));
} catch(err) {
	console.log(err.message);
}


if(typeof LinkData != 'undefined')
{
	for(var i = 0; i < LinkData.titles.length; i++)
	{
		var newHTML='<div id="'+LinkData.titles[i].toLowerCase()+'" class="gloss secthead">'+LinkData.titles[i]+'</div><div id="'+LinkData.titles[i].toLowerCase()+'list" class="section hidden">';
		for(var k = 0; k < LinkData.links[i].length; k++)
		{
			var noSpace = LinkData.links[i][k][0].toLowerCase().replace(/\W/g, '');
			newHTML+='<a class="sectionlink" href="'+LinkData.links[i][k][1]+'"><div id="'+noSpace+'" class="item">'+LinkData.links[i][k][0]+'</div></a>'
		}
		newHTML += "</div>";
		$('#linkcontain').append(newHTML);
	}
}