// sets up css styles for min mode. will only be run if min mode is on.
var searchHidden = true;
$(document).ready(function() {

	if(minmode){

		//hide unneeded elements
		$('#links').css('display', 'none');
		$('#weather').css('display', 'none');
		$('#searchtext').css('display', 'none');
		$('#search').children(".glossheading").css('display', 'none');

		//make search text bigger
		$('#searchbox').css({
			'height': '100%',
			'font-size': '7vh'
		});

		//hide and set up search div
		$('#search').css({
			'left': '10%',
			'top': '70%',
			'width': '80%',
			'height': '11vh',
			'display': 'none',
			'opacity': '0'
		});

		//resize greeting
		$('#greeting').css({
			'top': '30vh',
			'font-size': '20vh',
		});

		$('#whatwedoing').css('font-size', '8vh');

		$( "html" ).keydown(function( e ) {

			if(e.keyCode != 27)
			{
				showSearch();
			}
			else
			{
				hideSearch();
			}

		});
	}
});

function showSearch(){
	if(searchHidden){

		//set search to visible and focus the searchbox
		$('#search').css('display', 'block');
		$('#searchbox').focus();

		//animate search and greeting
		$('#search').animate({opacity: '0.9', top: '40vh'});
		$('#greeting').animate({top: '4vh'});
		$('#hello').animate({opacity: '0'});

		searchHidden = false;
	}
}

function hideSearch(){
	if(!searchHidden){

		//animate search and greeting
		$('#search').animate({opacity: '0.0', top: '70vh'}, function(){
			//set search to none and unfocus the searchbox
			$('#search').css('display', 'none');
			$('#searchbox').blur();
		});

		$('#greeting').animate({top: '30vh'});
		$('#hello').animate({opacity: '1'});

		//clear searchbox
		$('#searchbox').val("")

		searchHidden = true;
	}
}