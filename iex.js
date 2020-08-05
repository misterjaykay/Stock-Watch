var baseURLIEX = "https://cloud.iexapis.com/stable/stock/"
var apiToken = "/quote?token=pk_85904d0710804cf3865bcf30040ebec9"
var index = 0;


$(".search-btn").on("click", function(event) {
    console.log('click works');
   
    event.preventDefault();
  
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

        displayStock();

        function displayStock(){
            $(".stock-table").prepend('<tr class="stock-displayed'+index+'"><td>'+compName+'</td><td>$'+latestPrice+'</td><td>$'+high+'</td><td>$'+low+'</td><td>$'+open+'</td><td>$'+close+'</td><td><button class="clear-btn clear-btn'+index+'">Remove</button></td></tr>');
            //creates a table row for the stock searched
            //creates the company name, latest price, daily high, daily low, open price, close price,  data cell in the table
            $(".table-heading").remove();
            // removes previous table heading
            $(".stock-table").prepend('<tr class="table-heading"><th>Stock Name</th><th>Latest Price</th><th>Daily High</th><th>Daily Low</th><th>Opening Price</th><th>Closing Price</th><th></th></tr>');
            //create the table heading dynamically
            index++
        }

        $(".clear-btn").on("click", function(event){
            event.preventDefault();
            console.log("click works")
            var loopIndex = 20;

            console.log("21:" +JSON.stringify(this.getAttribute("class")).charAt(21));
            var removeIndex ="";
            console.log("remove 1: "+removeIndex);
            //initializes the removeIndex
            while(JSON.stringify(this.getAttribute("class")).charAt(loopIndex)!=='"'){
                removeIndex += JSON.stringify(this.getAttribute("class")).charAt(loopIndex);
                loopIndex++;
            }
            console.log("Remove Index: " + removeIndex);
            $(".stock-displayed"+removeIndex).remove();
        });
    });
    
  });

  function buildQueryURL(){
    var userInput = $(".user-input").val().trim();
    console.log('userInput: ' + userInput);
    iexURL = baseURLIEX + userInput + apiToken;
    console.log(iexURL);
  }
