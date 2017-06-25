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

		//set up regex search for list
		var temp = $("#searchbox").val().toLowerCase().replace(/\W/g, '.*');
		var regexdSearch = new RegExp('.*'+temp+'.*');

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
            	if(items[i].innerHTML.toLowerCase().regexIndexOf(regexdSearch) != -1 && found === false && shiftDown == false)
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
					//google search
					if(ctrlDown == true)
					{
						window.open("https://www.google.co.uk/search?q="+$('#searchbox').val())
					}
					else
					{
						window.location.href = "https://www.google.co.uk/search?q="+$('#searchbox').val();
					}
				}
			}
		}
		else
		{
			//get all items
			var items = $("#linkcontain").children(".section").children().children(".item");

			//if seatchbox not empty
	        if(!$("#searchbox").val() == "")
	        {
	            $('#dropdown').html("");
	            $('#dropdown').css('display', 'none');


	            //loop through all items
	            match = false;
	            var k = 0;
	            for(i=0; i < items.length;i++)
	            {
	            	//if the regexed search equals one of the items, add to the dropdown
	                if(k < 10 && items[i].innerHTML.toLowerCase().regexIndexOf(regexdSearch) != -1)
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
	                }
	            }

	            if(match && selected == 0)
	            {
	            	selected = 1;
	            	setHoverCol();
	            }

	            if(selected > maxSelect)
	            {
	            	selected = 1;
	            	setHoverCol();
	            }

	            if(!match)
	            {
	                $('#dropdown').html("");
	                $('#dropdown').css('display', 'none');
	                selected = 0;
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
	 			$('#item'+selected).css('background-color', itemhoverColor);
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