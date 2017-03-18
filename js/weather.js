// Docs at http://simpleweatherjs.com
function loadWeather(location, woid) {
  $.simpleWeather({
    location: location,
    woeid: woid,
    unit: 'c',
    success: function(weather) {
      html =weather.temp + '&deg;' + weather.units.temp;
      city ='Weather: '+weather.city;
      $("#temperature").html(html);
      $("#weatherplace").html(city);

      var dayfor = [];
      for(var i=0;i<6;i++) {
        dayfor[i] = '<div class="forcastbox"><span class="daytitle">'+weather.forecast[i].day+'</span><br/><span id="daytemp">'+weather.forecast[i].high+'&deg;' + weather.units.temp+'</span></div>';
        $("#dayforcast").append(dayfor[i]);
      }

    },
    error: function(error) {
      $("#temperature").html('<p>Error getting current weather. Try again later.</p>');
    }
  });
};

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});