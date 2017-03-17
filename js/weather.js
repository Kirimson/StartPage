// Docs at http://simpleweatherjs.com
function Weather() {
  $.simpleWeather({
    location: 'Birmingham, UK',
    woeid: '',
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

setTimeout(Weather, 1000);