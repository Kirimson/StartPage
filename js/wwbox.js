var regexurl = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
var shiftDown = false;
var ctrlDown = false;
var match = false;
var selected = 0;
var maxSelect;

var late = "#333";
var morning = "#21332B";
var afternoon = "#16222a";
var evening = "#39324B";
var dropText = "";

function getSearchTerms(searchString){

	try {
		baseString = encodeURIComponent($('#searchbox').val().split(":")[1].substring(1));
	} catch(err) {
		baseString = encodeURIComponent($('#searchbox').val());
	}

	var plainSearch = $('#searchbox').val().split(":")[1];

	switch(searchString){
		case "img":
			finalSearch = "https://www.google.co.uk/search?tbm=isch&q="+baseString;
			dropText = "Image search:"+plainSearch;
			break;
		case "yt":
			finalSearch = "https://www.youtube.com/results?search_query="+baseString;
			dropText = "Youtube search:"+plainSearch;
			break;
		case "ama":
			finalSearch = "https://www.amazon.co.uk/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords="+baseString;
			dropText = "Amazon search:"+plainSearch;
			break;
		case "map":
			finalSearch = "https://www.google.co.uk/maps/search/"+baseString;
			dropText = "Maps search:"+plainSearch;
			break;
		case "stack":
			finalSearch = "https://stackoverflow.com/questions/tagged/"+baseString;
			dropText = "Stack search:"+plainSearch;
			break;
		case "ddg":
			finalSearch = "https://duckduckgo.com/?q="+baseString;
			dropText = "Duckduckgo:"+plainSearch;
			break;
		default:
			finalSearch = "https://www.google.co.uk/search?q="+baseString;
			dropText = "default";
	}

	if(minmode){var maxlength = 24;}else{var maxlength = 27;}

	console.log(maxlength)

	if(dropText.length >= maxlength)
	{
		dropText = dropText.substring(0, maxlength-3)+"...";
	}

}

function analyseSearch(searchString){
	console.log(searchString);

	getSearchTerms(searchString);

	if(ctrlDown == true)
	{
		window.open(finalSearch);
	}
	else
	{
		window.location.href = finalSearch;
	}
}

$(document).ready(function() {

	$( "#searchbox" ).keydown(function( e ) {
	    if (e.keyCode == 13) {
	        setTimeout(clearBox, 1000);
	    }

	    if (e.keyCode == 16)
	    {
	    	shiftDown = true;
	    }
	    else if (e.keyCode == 17)
	    {
	    	ctrlDown = true;
	    }
	});

	$( "#searchbox" ).keyup(function( e ) {

		if (e.keyCode == 16)
	    {
	    	shiftDown = false;
	    }
	    else if (e.keyCode == 17)
	    {
	    	ctrlDown = false;
	    }

		var searchText = $("#searchbox").val().toLowerCase();

		//if enter
		if (e.keyCode == 13) {
			var normal = true;
			//get all items
			var items = $("#linkcontain").children(".section").children().children(".item");

			var regtest = regexurl.test($('#searchbox').val());

			//loop through all list items, searching for an item in the list that matches 
			found = false;
			for(i=0; i < items.length;i++)
            {
            	//check if conditions are met. If shift is held, item url is not used
            	if(items[i].innerHTML.toLowerCase().indexOf(searchText) != -1 && found === false && shiftDown == false)
                {
                	normal = false;
                	var noSpace = "item"+selected;
            		var itemLink = $("#"+noSpace).parent().attr('href');

            		//go to item link
            		if(ctrlDown == true)
					{
						clearBox();
						window.open(itemLink)
					}
					else
					{
						window.location.href = itemLink;
					}

            		found = true;
           		}
            }
            
            //if doing a normal search
            if(normal === true || shiftDown == true)
            {
            	//check if valid url
				if(regtest === true){
					if(ctrlDown == true)
					{
						window.open("http://"+$('#searchbox').val())
					}
					else
					{
						window.location.href = "http://"+$('#searchbox').val();
					}
				} else {
					analyseSearch($('#searchbox').val().split(':')[0]);
				}
			}
		}
		else
		{
			//get all items
			var items = $("#linkcontain").children(".section").children().children(".item");

			//if searchbox not empty
	        if(!$("#searchbox").val() == "")
	        {
	            $('#dropdown').html("");
	            $('#dropdown').css('display', 'none');

	            var maxitems = 10;
	            if(minmode){maxitems = 6;}

	            //loop through all items
	            match = false;
	            var k = 0;
	            for(i=0; i < items.length;i++)
	            {
	            	//if the regexed search equals one of the items, add to the dropdown
	                if(k < maxitems && items[i].innerHTML.toLowerCase().indexOf(searchText) != -1)
	                {
	                	k++;
	                	maxSelect = k;
	                    var noSpace = items[i].innerHTML.toLowerCase().replace(/\W/g, '');
	                    var itemLink = $("#"+noSpace).parent().attr('href');

						$('#dropdown').append("<a href='"+itemLink+"'><div id='item"+k+"'' class='gloss secthead'>"+items[i].innerHTML+"</div></a>");
						greeting();
	                   	if($('#dropdown').css('display') == "none")
	                   	{
	                        $('#dropdown').css('display', 'block');
	                   	}
	                   	match = true;
	                   	if(minmode){
				        	$('#dropdown').find('.secthead').css({
								'font-size': '6vh',
								'height':'7.5vh'
							});
				        }
	                }
	            }
	            
            	if($('#searchbox').val().indexOf(":") !== -1){
            		getSearchTerms($('#searchbox').val().split(':')[0]);
            	}
            	else
            	{
            		dropText = "default";
            	}

	            if(match && selected == 0)
	            {
	            	selected = 1;
	            }

	            if(selected > maxSelect)
	            {
	            	selected = 1;
	            }

	            if(!match)
	            {
	                $('#dropdown').html("");
	                $('#dropdown').css('display', 'none');
	                selected = 0;
	            }

	            if(dropText != "default")
	            {
	            	$('#dropdown').html("<a href='"+finalSearch+"'><div id='item"+k+"'' class='gloss secthead'>"+dropText+"</div></a>");
	            	$('#dropdown').css('display', 'block');
	            	greeting();
	            	match = true;
	            	if(minmode){
			        	$('#dropdown').find('.secthead').css({
							'font-size': '6vh',
							'height':'7.5vh'
						});
			        }
	            }

	        }
	        else
	        {
	            $('#dropdown').html("");
	            $('#dropdown').css('display', 'none');
	            match = false;
	            selected = 0;
	        }
		}

		//up/down
	    if(e.keyCode == 38 || e.keyCode == 40)
	    {
	    	
	    	if(match)
	    	{
	    		if(selected < maxSelect && e.keyCode == 40)
	    		{
	    			selected++;
	    		}
	    		
	    		if(selected > 1  && e.keyCode == 38)
	    		{
	    			selected--;
	    		}
	 			$('#item'+selected).css('background-color', sectheadhoverColor);
	    	}
	    }
	});
});

function clearBox(){
	$('#searchbox').val('');
	shiftDown = false;
	ctrlDown = false;
};

String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if($('#searchbox').is(':focus'))
    {
    	if([38, 40].indexOf(e.keyCode) > -1) {
	        e.preventDefault();
	    }
    }
    
}, false);