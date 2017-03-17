function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function setDate() {
    switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
    }
    switch (new Date().getDate()) {
        default:
            suptext = "th";
            break;
        case 1:
            suptext = "st";
            break;
        case 21:
            suptext = "st";
            break;
        case 31:
            suptext = "st";
            break;
        case 2:
            suptext = "nd";
            break;
        case 22:
            suptext = "nd";
            break;
        case 3:
            suptext = "rd";
            break;
        case 23:
            suptext = "rd";
            break;
    }
    switch (new Date().getMonth()) {
    case 0:mm = "January";break;
    case 1:
        mm = "February";
        break;
    case 2:
        mm = "March";
        break;
    case 3:
        mm = "April";
        break;
    case 4:
        mm = "May";
        break;
    case 5:
        mm = "June";
        break;
    case 6:
        mm = "July";
        break;
    case 7:
        mm = "August";
        break;
    case 8:
        mm = "September";
        break;
    case 9:
        mm = "October";
        break;
    case 10:
        mm = "November";
        break;
    case 11:
        mm = "December";
        break;
    }
    document.getElementById('date').innerHTML=day+' '+new Date().getDate()+'<sup>'+suptext+'</sup> '+mm+': ';
}

setTimeout(startTime, 100);
setTimeout(setDate, 100);