var baseURLIEX = "https://cloud.iexapis.com/stable/stock/"
var apiToken = "?token=pk_85904d0710804cf3865bcf30040ebec9"
var index = 0;
var quoteURL = "/quote";
var newsURLBase = "/news/last/1";
var intraDayURLBase = "/intraday-prices";
var tableRows = [".stock-displayed0"];

$(".search-btn").on("click", function(event) {
    event.preventDefault();
  
    // Builds both URLs
    buildiexURLs();
    
    //stock ajax for after market closes
    $.ajax({
      url: iexURL,
      method: "GET"
    })
    .then(function(response){
        var compName = response.companyName;
        var latestPrice = response.latestPrice;
        var high = response.high;
        var low = response.low;
        var open = response.open;
        var close = response.close;
        
    // intraDay stock info
    $.ajax({
        url: intraDayURL,
        method: "GET"
    }).then(function(response2){
        var responseIndex= response2.length-1;
        while(response2[response2.length-1].high==null){
            if(responseIndex===0){
                break;
            }
            responseIndex--;
        }
        if(high===null){
            high = response2[responseIndex].high;
            low = response2[responseIndex].low;
            open = response2[responseIndex].open;
            close = response2[responseIndex].close;
        }
    
        //Latest Article ajax
        $.ajax({
            url: newsURL,
            method: "GET"
        }).then(function(response1){
            var headline= response1[0].headline;
            // var source = response1[0].source;
            // source for article if needed 
            var articleURL = response1[0].url;
        displayStock();
            
        function displayStock(){
            $(".stock-table").prepend('<tr class="stock-displayed stock-displayed'+index+'"><td>'+compName+'</td><td>$'+latestPrice.toFixed(2)+'</td><td>$'+high.toFixed(2)+'</td><td>$'+low.toFixed(2)+'</td><td>$'+open.toFixed(2)+'</td><td>$'+close.toFixed(2)+'</td><td><a href="'+ articleURL +'">'+headline+'</a></td><td><button class="clear-btn clear-btn'+index+'">Remove</button></td></tr>');
            //creates a table row for the stock searched and adds all info at once

            $(".table-heading").remove();
            // removes previous table heading

            $(".stock-table").prepend('<tr class="table-heading"><th>Stock Name</th><th>Latest Price</th><th>Daily High</th><th>Daily Low</th><th>Opening Price</th><th>Closing Price</th><th>Latest Article:</th><th></th></tr>');
            //create the table heading dynamically
            if(index>0){
                tableRows += ".stock-displayed"+index;
            }
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
        
        })

        $(".clear-btn-all").on("click", function(){
            $(".stock-displayed").detach();
        })
    })
    })
    
  })
})

function buildiexURLs(){
    var userInput = $(".user-input").val().trim();
    iexURL = baseURLIEX + userInput + quoteURL + apiToken;
    newsURL = baseURLIEX + userInput + newsURLBase + apiToken;
    intraDayURL = baseURLIEX + userInput + intraDayURLBase + apiToken;
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
        // cardP.text("$" + response.latestPrice);

        if (response.change < 0) {
          cardP.attr("style", "color:red;");
          cardP.html("$" + response.latestPrice + "<img src='assets/images/red-down.svg' width='10'>");
        }
        else if (response.change > 0) {
          cardP.attr("style", "color:green;");  
          cardP.html("$" + response.latestPrice + "<img src='assets/images/green-up.svg' width='10'>");
        }

        $(card).append(cardH4,cardP);
        $(".card-top-stock").append(card);

      });
    }
}

renderTopStock();

// working iexURL
// https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_85904d0710804cf3865bcf30040ebec9

// working newsURL:
// https://cloud.iexapis.com/stable/stock/aapl/news/last/1?token=pk_85904d0710804cf3865bcf30040ebec9

//working intraDayURL:
// https://cloud.iexapis.com/stable/stock/aapl/intraday-prices?token=pk_85904d0710804cf3865bcf30040ebec9