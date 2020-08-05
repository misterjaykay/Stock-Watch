var baseURLIEX = "https://cloud.iexapis.com/stable/stock/"
var apiToken = "?token=pk_85904d0710804cf3865bcf30040ebec9"
var index = 0;
var quoteURL = "/quote"
var newsURL = "/news/last/1"

$(".search-btn").on("click", function(event) {
    event.preventDefault();
  
    // Builds both URLs
    buildiexURLs();
    
    //stock ajax
    $.ajax({
      url: iexURL,
      method: "GET"
    }).then(function(response){
        var compName = response.companyName;
        var latestPrice = response.latestPrice;
        var high = response.high;
        var low = response.low;
        var open = response.open;
        var close = response.close;

        //Latest Article ajax
        $.ajax({
            url: newsURL,
            method: "GET"
        }).then(function(response1){
            var headline= response1[0].headline;
            //var source = response1[0].source;
            var articleURL = response1[0].url;
        displayStock();

        function displayStock(){
            $(".stock-table").prepend('<tr class="stock-displayed'+index+'"><td>'+compName+'</td><td>$'+latestPrice+'</td><td>$'+high+'</td><td>$'+low+'</td><td>$'+open+'</td><td>$'+close+'</td><td><a href="'+ articleURL +'">'+headline+'</a></td><td><button class="clear-btn clear-btn'+index+'">Remove</button></td></tr>');
            //creates a table row for the stock searched and adds all info at once

            $(".table-heading").remove();
            // removes previous table heading

            $(".stock-table").prepend('<tr class="table-heading"><th>Stock Name</th><th>Latest Price</th><th>Daily High</th><th>Daily Low</th><th>Opening Price</th><th>Closing Price</th><th>Latest Article:</th><th></th></tr>');
            //create the table heading dynamically
            index++
        }

        $(".clear-btn").on("click", function(event){
            event.preventDefault();
            var loopIndex = 20;
            var removeIndex ="";
            //initializes the removeIndex
            while(JSON.stringify(this.getAttribute("class")).charAt(loopIndex)!=='"'){
                removeIndex += JSON.stringify(this.getAttribute("class")).charAt(loopIndex);
                loopIndex++;
            }
            $(".stock-displayed"+removeIndex).remove();
        });
        });
    });
    
  });

  function buildiexURLs(){
    var userInput = $(".user-input").val().trim();
    iexURL = baseURLIEX + userInput + quoteURL + apiToken;
    newsURL = baseURLIEX + userInput + newsURL + apiToken;

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

