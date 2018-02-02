var speed = 250;

$(document).ready(function() {
    $(document).on('click','.secthead',function(){
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
        var linkscontainer = $("#links");
		var settingscontainer = $("#settingsmain");
        var schedule = $("#schedule");
	    if (!linkscontainer.is(e.target) && !settingscontainer.is(e.target)
            && linkscontainer.has(e.target).length === 0  && settingscontainer.has(e.target).length === 0){
	    	$('#linkcontain').siblings('.section').slideUp(speed);
	    }
	});

	$( ".close" ).click(function() {
    	window.open('', '_self', ''); window.close();
    });

});