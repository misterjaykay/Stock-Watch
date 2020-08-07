//////////////////// CURRENT TIME CODE
// get the current time using moment.js
// and using setInterval to update the time lively
function setCurrentTime() {
    var localTime  = moment.utc().toDate();
    var currentTime = moment(localTime).format("HH:mm:ss MM/DD/YY");
    $(".current-time").text(currentTime);
}
setCurrentTime();
var clockUpdate = setInterval( function() {  
    setCurrentTime();
}, 1000)
setInterval(clockUpdate, 1000);


//////////////////// CURRENCY EXCHANGE CODE
// gets local time using moment.js library
localTime = moment.utc().toDate();
//  format the time
var currentTime = moment(localTime).format("YYYY-MM-DD");
// get yesterday's time using moment.js
var yesterday = moment(currentTime).add(-1, 'days').format("YYYY-MM-DD");
console.log(yesterday);

var currency = $(this).attr("data-name");
// the query url with api key used to make an AJAX call 
var moneyUrl = "https://openexchangerates.org/api/latest.json?app_id=072740dd2d5c4bc996fd2fcfcbacbd1d";
// query url that takes the day as query paramater to give us past currency exchange rates
var moneyHistoryUrl = "https://openexchangerates.org/api/historical/" + yesterday + ".json?app_id=072740dd2d5c4bc996fd2fcfcbacbd1d";

// make an AJAX call to get the exchange rates
$.ajax({
    url: moneyUrl,
    method: "GET"
}).then(function (response) {
    // console log the response
    console.log(response);

    // get the base currency 
    var baseCurr = response.base;

    // get the exchange rate in euros
    var euroRate = response.rates.EUR;
    euroRate = euroRate.toFixed(2);
    // passes the value stored inside the variable into an id
    $("#euroRate").html("&#8364;" + euroRate);

    // get exchange rate for yen
    var jpyRate = response.rates.JPY;
    jpyRate = jpyRate.toFixed(2);
    // passes the value stored inside the variable into an id
    $("#jpyRate").html("&#165;" + jpyRate);

    // get the exchange rate for great british pound
    var gbpRate = response.rates.GBP;
    gbpRate = gbpRate.toFixed(2);
    // passes the value stored inside the variable into an id
    $("#gbpRate").html("&#163;" + gbpRate);

    // get the exchange rate for canadian dollar
    var cadRate = response.rates.CAD;
    cadRate = cadRate.toFixed(2);
    // passes the value stored inside the variable into an id
    $("#cadRate").html("&#36;" + cadRate);

    // get the exchange rate for kuwaiti dinar
    var kwdRate = response.rates.KWD;
    kwdRate = kwdRate.toFixed(2);
    // passes the value stored inside the variable into an id
    $("#kwdRate").html("&#164;" + kwdRate);

    // get the exchange rate for indian rupee
    var inrRate = response.rates.INR;
    inrRate = inrRate.toFixed(2);
    // passes the value stored inside the variable into an id
    $("#inrRate").html("&#8377;" + inrRate);

    // make an ajax call to get yesterday's rates and compare them with current rates
    $.ajax({
        url: moneyHistoryUrl,
        method: "GET"
    }).then(function (response) {

        // checked if the current rate is greater than yesterday
        if (inrRate < response.rates.INR) {
            $("#inrRate").attr("style", "color:red;");
            $("#inrArrow").html("<img src='assets/images/red-down.svg' width='10'>");
        }
        else {
            $("#inrRate").attr("style", "color:green;");
            $("#inrArrow").html("<img src='assets/images/green-up.svg' width='10'>");
        }

        if (jpyRate < response.rates.JPY) {
            $("#jpyRate").attr("style", "color:red;");
            $("#jpyArrow").html("<img src='assets/images/red-down.svg' width='10'>");

        }
        else {
            $("#jpyRate").attr("style", "color:green;");
            $("#jpyArrow").html("<img src='assets/images/green-up.svg' width='10'>");
            
        }

        if (cadRate < response.rates.CAD) {
            $("#cadRate").attr("style", "color:red;");
            $("#cadArrow").html("<img src='assets/images/red-down.svg' width='10'>");
        }
        else {
            $("#cadRate").attr("style", "color:green;");
            $("#cadArrow").html("<img src='assets/images/green-up.svg' width='10'>");
        }

        if (gbpRate < response.rates.GBP) {
            $("#gbpRate").attr("style", "color:red;");
            $("#gbpArrow").html("<img src='assets/images/red-down.svg' width='10'>");
        }
        else {
            $("#gbpRate").attr("style", "color:green;");
            $("#gbpArrow").html("<img src='assets/images/green-up.svg' width='10'>");
        }

        if (kwdRate < response.rates.KWD) {
            $("#kwdRate").attr("style", "color:red;");
            $("#kwdArrow").html("<img src='assets/images/red-down.svg' width='10'>");
        }
        else {
            $("#kwdRate").attr("style", "color:green;");
            $("#kwdArrow").html("<img src='assets/images/green-up.svg' width='10'>");
        }

        if (euroRate < response.rates.EUR) {
            $("#euroRate").attr("style", "color:red;");
            $("#eurArrow").html("<img src='assets/images/red-down.svg' width='10'>");
        }
        else {
            $("#euroRate").attr("style", "color:green;");
            $("#eurArrow").html("<img src='assets/images/green-up.svg' width='10'>");
        }
    })

});