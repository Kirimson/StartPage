var speed = 250;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isChrome = !!window.chrome && !!window.chrome.webstore;

$(document).ready(function() {
    $( ".secthead" ).click(function(e) {
    	var itemname = this.id;

    	if($(this).siblings('#'+itemname+'list').is(":hidden")){
    		$(this).siblings('.section').slideUp(speed);
			$(this).siblings('#'+itemname+'list').slideToggle(speed);
    	} else {
    		$(this).siblings('#'+itemname+'list').slideToggle(speed);
    	}         

    });

    $(document).mouseup(function (e)
	{
		var container = $("#links");
	    if (!container.is(e.target) && container.has(e.target).length === 0){
	    	$('.section').slideUp(speed);
	    }
	});

	$( ".close" ).click(function() {
    	window.open('', '_self', ''); window.close();
    });

    if(isFirefox===true){
    	$('#chrome').hide();
    }

    if(isChrome===true){
    	$('#firefox').hide();
    }

});