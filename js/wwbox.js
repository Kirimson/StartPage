var regexurl = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
var shiftDown = false;
$(document).ready(function() {


	$( "#searchbox" ).keydown(function( e ) {
	    if (e.keyCode == 13) {
	        setTimeout(clearBox, 1000);
	    }

	    if (e.keyCode == 16)
	    {
	    	shiftDown = true;
	    }
	});

	$( "#searchbox" ).keyup(function( e ) {

		if (e.keyCode == 16)
	    {
	    	shiftDown = false;
	    }

		//set up regex search for list

		var temp = $("#searchbox").val().toLowerCase().replace(/\W/g, '.*');

		var regexdSearch = new RegExp('.*'+temp+'.*');
		if (e.keyCode == 13) {
			var normal = true;
			var items = $("#linkcontain").children(".section").children().children(".item");

			var regtest = regexurl.test($('#searchbox').val());

			var found = false;
			for(i=0; i < items.length;i++)
            {
            	if(items[i].innerHTML.toLowerCase().regexIndexOf(regexdSearch) != -1 && found === false)
                {
                	normal = false;
                	var noSpace = items[i].innerHTML.toLowerCase().replace(/\W/g, '');
            		var itemLink = $("#"+noSpace).parent().attr('href');
            		window.location.href = itemLink;
            		found = true;
           		}

            }
            
            if(normal === true || shiftDown == true)
            {
				if(regtest === true){
					// var win = window.open("http://"+$('#searchbox').val(), '_blank');
					window.location.href = "http://"+$('#searchbox').val();
					// win.focus();
				} else {
					window.location.href = "https://www.google.co.uk/search?q="+$('#searchbox').val();
				}
			}
		}
		else
		{
			var items = $("#linkcontain").children(".section").children().children(".item");
	        if(!$("#searchbox").val() == "")
	        {
	            $('#dropdown').html("");
	            $('#dropdown').css('display', 'none');

	            var match = false;
	            var k = 0;
	            for(i=0; i < items.length;i++)
	            {
	                if(k < 10 && items[i].innerHTML.toLowerCase().regexIndexOf(regexdSearch) != -1)
	                {
	                	k++;
	                    var noSpace = items[i].innerHTML.toLowerCase().replace(/\W/g, '');
	                    var itemLink = $("#"+noSpace).parent().attr('href');

	                   $('#dropdown').append("<a href='"+itemLink+"'><div class='gloss secthead'>"+items[i].innerHTML+"</div></a>");
	                   greeting();
	                   if($('#dropdown').css('display') == "none")
	                   {
	                        $('#dropdown').css('display', 'block');

	                   }
	                   match = true;
	                }
	            }
	            
	            if(!match)
	            {
	                $('#dropdown').html("");
	                $('#dropdown').css('display', 'none');
	            }

	        }
	        else
	        {
	            $('#dropdown').html("");
	            $('#dropdown').css('display', 'none');
	        }
		}
	});
});

function clearBox(){
	$('#searchbox').val('');
};

String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}