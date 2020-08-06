var baseURLIEX = "https://cloud.iexapis.com/stable/stock/"
var apiToken = "?token=pk_85904d0710804cf3865bcf30040ebec9"
var index = 0;
var quoteURL = "/quote";
var newsURLBase = "/news/last/1";
var intraDayURLBase = "/intraday-prices";
var stockListURL = "https://financialmodelingprep.com/api/v3/company/stock/list?apikey=50cb9e8f707557d71a23370f6431ed64";

$(".search-btn").on("click", function(event) {
    event.preventDefault();
    
    $.ajax({
       url: stockListURL,
       method: "GET"
    }).then(function(response4){
       for(var i = 0; i<response4.symbolsList.length; i++){
            var name = response4.symbolsList[i].name;
            var symbol = response4.symbolsList[i].symbol;
            if($(".user-input-name").val().trim().toLowerCase()==name.toLowerCase() && $(".user-input-name").val()!==""){
                var storageArr = [""];
                if(localStorage.getItem("companySymbol")!==null){
                    storageArr = JSON.parse(localStorage.getItem("companySymbol"));
                    console.log(storageArr);  
                }
                if(storageArr[0]===""){
                    console.log("pop")
                    storageArr.pop();
                }
                console.log("symbol: " + symbol);
                storageArr.push(symbol);
                console.log("storageArr: "+ storageArr + ";");
                localStorage.setItem("companySymbol", JSON.stringify(storageArr));
                localStorage.setItem("latestSymbol", storageArr[storageArr.length-1]);
                break;
            } else if($(".user-input-symbol").val().trim().toLowerCase()==symbol.toLowerCase() && $(".user-input-symbol").val()!==""){
                if(localStorage.getItem("companySymbol")===null){
                    storageArr = [$(".user-input-symbol").val()];  
                  }
                    storageArr.push(symbol)
                    localStorage.setItem("companySymbol", JSON.stringify(storageArr));
                    localStorage.setItem("latestSymbol", storageArr[storageArr.length-1]);
                    break;
            } else{
                //add modal alert that no match for search;
            }
        }
    
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
            $(".stock-displayed").detach();
            for(var i = 0; i < JSON.parse(localStorage.getItem("companySymbol")).length; i++){
            $(".stock-table").prepend('<tr class="stock-displayed stock-displayed'+i+'"><td>'+compName+'</td><td>$'+latestPrice.toFixed(2)+'</td><td>$'+high.toFixed(2)+'</td><td>$'+low.toFixed(2)+'</td><td>$'+open.toFixed(2)+'</td><td>$'+close.toFixed(2)+'</td><td><a href="'+ articleURL +'">'+headline+'</a></td><td><button class="clear-btn clear-btn'+i+'">Remove</button></td></tr>');
            //creates a table row for the stock searched and adds all info at once
             index++
            }

            $(".table-heading").remove();
            // removes previous table heading

            $(".stock-table").prepend('<tr class="table-heading"><th>Company</th><th>Latest Price</th><th>Daily High</th><th>Daily Low</th><th>Opening Price</th><th>Closing Price</th><th>Latest Article:</th><th></th></tr>');
            //create the table heading dynamically
           
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
        })
    })
    })
    })
})

console.log(localStorage.getItem("companySymbol"));
console.log(JSON.stringify(localStorage.getItem("companySymbol")));
console.log(JSON.parse(localStorage.getItem("companySymbol")));

$(".clear-btn-all").on("click", function(event){
    event.preventDefault();

    $(".stock-displayed").detach();
    localStorage.removeItem("companySymbol");
    localStorage.removeItem("latestSymbol");
    console.log("button Works");
})

function buildiexURLs(){
    // var symbolInput = $(".user-input-symbol").val().trim();
    // if(symbolInput==""){
    //     symbolInput = localStorage.getItem("companySymbol");
    // }
    // console.log(symbolInput);
    iexURL = baseURLIEX + localStorage.getItem("latestSymbol") + quoteURL + apiToken;
    newsURL = baseURLIEX + localStorage.getItem("latestSymbol") + newsURLBase + apiToken;
    intraDayURL = baseURLIEX + localStorage.getItem("latestSymbol") + intraDayURLBase + apiToken;
}

function displayHistory() {
    $(".stock-displayed").detach();
    for(var i = 0; i < JSON.parse(localStorage.getItem("companySymbol")).length; i++){
        $(".stock-table").prepend('<tr class="stock-displayed stock-displayed'+index+'"><td>'+compName+'</td><td>$'+latestPrice.toFixed(2)+'</td><td>$'+high.toFixed(2)+'</td><td>$'+low.toFixed(2)+'</td><td>$'+open.toFixed(2)+'</td><td>$'+close.toFixed(2)+'</td><td><a href="'+ articleURL +'">'+headline+'</a></td><td><button class="clear-btn clear-btn'+index+'">Remove</button></td></tr>');
        //creates a table row for the stock searched and adds all info at once
        index++
    }

    $(".table-heading").remove();
    // removes previous table heading

    $(".stock-table").prepend('<tr class="table-heading"><th>Company</th><th>Latest Price</th><th>Daily High</th><th>Daily Low</th><th>Opening Price</th><th>Closing Price</th><th>Latest Article:</th><th></th></tr>');
    //create the table heading dynamically
}

function renderTopStock() {
    var topStockList = ["AAPL", "TSLA", "AMZN", "MSFT", "NFLX", "NVDA" ];
    for (var i = 0; i < topStockList.length; i++) {
      iexURL = baseURLIEX + topStockList[i] + quoteURL + apiToken;
      $.ajax({
        url: iexURL,
        method: "GET"
    }).then(function(response){
        var card = $("<div class='column is-half card top-card'>");
        card.attr("data-value", topStockList[i]);

        var cardH4 = $("<h6>");
        cardH4.text(response.companyName);

        var cardP = $("<p>");
        // cardP.text("$" + response.latestPrice);

        if (response.change < 0) {
          cardP.attr("style", "color:red;");
          cardP.html("$" + response.latestPrice.toFixed(2) + "<img src='assets/images/red-down.svg' width='10'>");
        }
        else if (response.change > 0) {
          cardP.attr("style", "color:green;");  
          cardP.html("$" + response.latestPrice.toFixed(2) + "<img src='assets/images/green-up.svg' width='10'>");
        }

        $(card).append(cardH4,cardP);
        $(".card-top-stock").append(card);

      });
    }
}

renderTopStock();
// displayHistory();

// working iexURL
// https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_85904d0710804cf3865bcf30040ebec9

// working newsURL:
// https://cloud.iexapis.com/stable/stock/aapl/news/last/1?token=pk_85904d0710804cf3865bcf30040ebec9

//working intraDayURL:
// https://cloud.iexapis.com/stable/stock/aapl/intraday-prices?token=pk_85904d0710804cf3865bcf30040ebec9

// working financialmodelingprep URL:
// https://financialmodelingprep.com/api/v3/company/stock/list?apikey=50cb9e8f707557d71a23370f6431ed64
