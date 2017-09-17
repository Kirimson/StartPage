//colours
var selectedtheme = timeCheck();
selectedtheme--;

var colors = [];

var colorsDef = [
		["#333", "#444", "#555", "#333", "#444", "#eee"],
		["#1F2E1C", "#253930", "#354232", "#21332B", "#414B3F", "#eee"],
		["#151A1D", "#19262F", "#2F3B43", "#16222a", "#3c464c", "#eee"],
		["#2b2241", "#403854", "#4e4467", "#39324B", "#574C73", "#eee"]
	];

//try and get custom colours
try{
	colors = JSON.parse(localStorage.getItem("personal-colors"));
	var test = colors[0];
} catch(err) {
	console.log(err.message);
	colors = colorsDef;
}

updatefakecol();

function updatefakecol(){

	switch(selectedtheme)
	{
		case 0: $('.themename').html("Theme: Late");break;
		case 1: $('.themename').html("Theme: Morning");break;
		case 2: $('.themename').html("Theme: Afternoon");break;
		case 3: $('.themename').html("Theme: Evening");break;
	}

	$('#fakemain').css("background-color", colors[selectedtheme][0]);
	$('#fakesecthead').css("background-color", colors[selectedtheme][1]);
	$('#fakeitem').css("background-color", colors[selectedtheme][2]);
	$('#fakemain').css("color", colors[selectedtheme][5]);

	//text

	$("#fakesecthead").hover(function(e) {
        if(!$(this).hasClass('nohover'))
        {
            $(this).css("background-color",e.type === "mouseenter"?colors[selectedtheme][3]:colors[selectedtheme][1])
        }
    });
    $("#fakeitem").hover(function(e) {
        if(!$(this).hasClass('nohover'))
        {
            $(this).css("background-color",e.type === "mouseenter"?colors[selectedtheme][4]:colors[selectedtheme][2])
        }
    });
}

//edit cols
$('#maincol').keyup(function(e){
	colors[selectedtheme][0] = $('#maincol').val();
	updatefakecol();
});
$('#sectcol').keyup(function(e){
	colors[selectedtheme][1] = $('#sectcol').val();
	updatefakecol();
});
$('#itemcol').keyup(function(e){
	colors[selectedtheme][2] = $('#itemcol').val();
	updatefakecol();
});
$('#secthovercol').keyup(function(e){
	colors[selectedtheme][3] = $('#secthovercol').val();
	updatefakecol();
});
$('#itemhovercol').keyup(function(e){
	colors[selectedtheme][4] = $('#itemhovercol').val();
	updatefakecol();
});
$('#textcol').keyup(function(e){
	colors[selectedtheme][5] = $('#textcol').val();
	updatefakecol();
});

//reset colors
$('#mainreset').click(function(event) {
	colors[selectedtheme][0] = colorsDef[selectedtheme][0];
	$('#maincol').val(colorsDef[selectedtheme][0]);
	updatefakecol();
});
$('#sectreset').click(function(event) {
	colors[selectedtheme][1] = colorsDef[selectedtheme][1];
	$('#sectcol').val(colorsDef[selectedtheme][1]);
	updatefakecol();
});
$('#itemreset').click(function(event) {
	colors[selectedtheme][2] = colorsDef[selectedtheme][2];
	$('#itemcol').val(colorsDef[selectedtheme][2]);
	updatefakecol();
});
$('#secthoverreset').click(function(event) {
	colors[selectedtheme][3] = colorsDef[selectedtheme][3];
	$('#secthovercol').val(colorsDef[selectedtheme][3]);
	updatefakecol();
});
$('#itemhoverreset').click(function(event) {
	colors[selectedtheme][4] = colorsDef[selectedtheme][4];
	$('#itemhovercol').val(colorsDef[selectedtheme][4]);
	updatefakecol();
});
$('#textreset').click(function(event) {
	colors[selectedtheme][5] = colorsDef[selectedtheme][5];
	$('#textcol').val(colorsDef[selectedtheme][5]);
	updatefakecol();
});

//set inputs to color values
function getcolorvals(){
	$('#maincol').val(colors[selectedtheme][0]);
	$('#sectcol').val(colors[selectedtheme][1]);
	$('#itemcol').val(colors[selectedtheme][2]);
	$('#secthovercol').val(colors[selectedtheme][3]);
	$('#itemhovercol').val(colors[selectedtheme][4]);
	$('#textcol').val(colors[selectedtheme][5]);
}