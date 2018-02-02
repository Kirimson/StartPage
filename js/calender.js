// Client ID and API key from the Developer Console
var CLIENT_ID = '446020468772-pcrq8gi0rrbneo8h7lgpqcnlbr3ihvao.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAWdGLx7AM28NIyYAEUaswbU4x2HtLNomw';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
/**
 *  On load, called to load the auth2 library and API client library.
 */

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var textContent = message + '\n';
  $('#upcoming').append(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;

    if (events.length > 0) {
      var lastday = new Date();
      lastday.setDate(lastday.getDate() - 1)
      var oldDate;
      var decombined = false;
      for (i = 0; i < events.length; i++) {

        var event = events[i];
        var htmlLink = event.htmlLink;
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }

        var day = new Date(when);

        if(day.getDay() != lastday.getDay())
        {
          if(i > 0)
          {
            appendPre(newHTML+'</div>');
            if(!decombined)
            {
              setToday(lastday.getDay());
              decombined = true;
            }
            
          }
          var newHTML='<div id="'+days[day.getDay()]+'" class="secthead gloss">'+days[day.getDay()]+'</div><div id="'+days[day.getDay()]+'list" class="section hidden">';
        }

        newHTML+='<a class="sectionlink" href="'+htmlLink+'" target="_blank" ><div class="item">'+event.summary + ' (' + getTime(day) + ')'+'</div></a>'

        lastday = day;
        console.log(lastday.getDay())
      }
      appendPre(newHTML+'</div>');
    } else {
      appendPre('No upcoming events found.');
    }
    greeting();
  });
}

function getTime(day){
  return (day.getHours() < 10 ? '0'+day.getHours() : day.getHours()) + ':' + (day.getMinutes() < 10 ? '0'+day.getMinutes() : day.getMinutes())
}

function setToday(day){
  var itemname = days[day];

  document.getElementById(itemname+'list').style.display = "block"

}