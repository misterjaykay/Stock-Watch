var baseURLIEX = "https://cloud.iexapis.com/stable/stock/"
var apiToken = "/quote?token=pk_85904d0710804cf3865bcf30040ebec9"



$(".search-btn").on("click", function(event) {
    console.log('click works');
   
    event.preventDefault();
  
    // Empty the region associated with the articles
    //clear();
  
    // Build the query URL for the ajax request to the NYT API
    buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: iexURL,
      method: "GET"
    }).then(function(response){
        console.log(response);
        var compName = response.companyName;
        console.log("Company Name: " + compName);
        var latestPrice = response.latestPrice;
        console.log("Latest Price: " + latestPrice);
        var high = response.high;
        console.log("High Price: "+ high);
        var low = response.low;
        console.log("Low Price: " + low);
        var open = response.open;
        console.log("Opening Price: " + open);
        var close = response.close;
        console.log("Closing Price: " + close);
    });
    
  });

  function buildQueryURL(){
    var userInput = $(".user-input").val().trim();
    console.log('userInput: ' + userInput);
    iexURL = baseURLIEX + userInput + apiToken;
    console.log(iexURL);
  }