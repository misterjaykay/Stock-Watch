var currency = $(this).attr("data-name");
// the query url with api key used to make an AJAX call 
var moneyUrl = "https://openexchangerates.org/api/latest.json?app_id=072740dd2d5c4bc996fd2fcfcbacbd1d";

// make an AJAX call to get the exchange rates
$.ajax({
    url: moneyUrl,
    method: "GET"
}).then(function(response){
    // console log the response
    console.log(response);

    // get the base currency 
    var baseCurr = response.base;

    // get the exchange rate in euros
    var euroRate = response.rates.EUR;
    // passes the value stored inside the variable into an id
    $("#euroRate").text(euroRate);

    // get exchange rate for yen
    var jpyRate = response.rates.JPY;
    // passes the value stored inside the variable into an id
    $("#jpyRate").text(jpyRate);

    // get the exchange rate for great british pound
    var gbpRate = response.rates.GBP;
    // passes the value stored inside the variable into an id
    $("#gbpRate").text(gbpRate);

    // get the exchange rate for canadian dollar
    var cadRate = response.rates.CAD;
    // passes the value stored inside the variable into an id
    $("#cadRate").text(cadRate);

    // get the exchange rate for kuwaiti dinar
    var kwdRate = response.rates.KWD;
    // passes the value stored inside the variable into an id
    $("#kwdRate").text(kwdRate);
});