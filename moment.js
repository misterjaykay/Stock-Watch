
var update = setInterval( function() {  
    var localTime  = moment.utc().toDate();
    var currentTime = moment(localTime).format("HH:mm:ss MM/DD/YY");
    $(".current-time").text(currentTime);

}, 1000)
setInterval(update, 1000);