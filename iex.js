var baseURLIEX = "https://cloud.iexapis.com/stable/stock/"
var apiToken = "?token=pk_85904d0710804cf3865bcf30040ebec9"
var index = 0;
var quoteURL = "/quote"
var newsURL = "/news/last/1"

$(".search-btn").on("click", function(event) {
    console.log('click works');
   
    event.preventDefault();
  
    // Build the query URL for the ajax request to the NYT API
    buildiexURLs();
  
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

        $.ajax({
            url: newsURL,
            method: "GET"
        }).then(function(response1){
            console.log(response1);
            var headline= response1[0].headline;
            console.log(headline);
            var source = response1[0].source;
            console.log(source);
            var articleURL = response1[0].url;
            console.log(articleURL);
        displayStock();

        function displayStock(){
            $(".stock-table").prepend('<tr class="stock-displayed'+index+'"><td>'+compName+'</td><td>$'+latestPrice+'</td><td>$'+high+'</td><td>$'+low+'</td><td>$'+open+'</td><td>$'+close+'</td><td><a href="'+ articleURL +'">'+headline+'</a></td><td><button class="clear-btn clear-btn'+index+'">Remove</button></td></tr>');
            //creates a table row for the stock searched
            //creates the company name, latest price, daily high, daily low, open price, close price,  data cell in the table
            $(".table-heading").remove();
            // removes previous table heading
            $(".stock-table").prepend('<tr class="table-heading"><th>Stock Name</th><th>Latest Price</th><th>Daily High</th><th>Daily Low</th><th>Opening Price</th><th>Closing Price</th><th>Latest Article:</th><th></th></tr>');
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
    
  });

  function buildiexURLs(){
    var userInput = $(".user-input").val().trim();
    console.log('userInput: ' + userInput);
    iexURL = baseURLIEX + userInput + quoteURL + apiToken;
    console.log("iexURL: " + iexURL);
    newsURL = baseURLIEX + userInput + newsURL + apiToken;
    console.log("newsURL: "+ newsURL);
  }

  function renderTopStock() {
    var topStockList = ["AAPL", "TSLA", "AMZN", "MSFT", "NFLX", "NVDA" ];
    for (var i = 0; i < topStockList.length; i++) {
      iexURL = baseURLIEX + topStockList[i] + quoteURL + apiToken;
      $.ajax({
        url: iexURL,
        method: "GET"
      }).then(function(response){
        var card = $("<div class='column is-half card'>");
        card.attr("data-value", topStockList[i]);

        var cardH4 = $("<h6>");
        cardH4.text(response.companyName);

        var cardP = $("<p>");
        cardP.text("$" + response.latestPrice);

        $(card).append(cardH4,cardP);
        $(".card-top-stock").append(card);

      });
    }
  }
renderTopStock();

