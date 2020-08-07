var baseURLIEX = "https://cloud.iexapis.com/stable/stock/"
var apiToken = "?token=pk_85904d0710804cf3865bcf30040ebec9"
var quoteURL = "/quote";
var newsURLBase = "/news/last/1";
var intraDayURLBase = "/intraday-prices";
var stockListURL = "https://financialmodelingprep.com/api/v3/company/stock/list?apikey=513abe965cedbb3357ade6b1f1b12dc2";
var baseObject = {"name": "", "symbol":"", "latestPrice":"", "high":"", "low":"", "open":"", "close":"", "articleURL": "", "articleHeadline": ""};
localStorage.setItem("baseObject", JSON.stringify(baseObject))

$(".search-btn-name").on("click", function(event){
    event.preventDefault();
    localStorage.setItem("latestClick", "name");
}) //empties the symbol input so it wont conflict with name search

$(".search-btn-symbol").on("click", function(event){
    event.preventDefault();
    localStorage.setItem("latestClick", "symbol");
}) // empties the name input so it wont conflict with symbol search

$(".search-btn").on("click", function(event) {
    event.preventDefault();

    $.ajax({
       url: stockListURL,
       method: "GET"
    }).then(function(response4){
        console.log(response4.symbolsList);
       for(var i = 0; i<response4.symbolsList.length; i++){
            var name = response4.symbolsList[i].name;
            var symbol = response4.symbolsList[i].symbol;
            // assigns variables for current stock name and symbol it is comparing to user input
            if(localStorage.getItem("latestClick")==="name"){
            if($(".user-input-name").val().trim().toLowerCase()==name.toLowerCase() && $(".user-input-name").val() != ""){
                // finds a match for the name of the stock also checks if input is empty
                
                localStorage.setItem("matchedName", name);
                localStorage.setItem("matchedSymbol", symbol);
                // saves matched info to local storage to pull later out of scope of variables
                
                var storageArr = [];
                //initializes a storage arr to hold each stockObject
                
                if(JSON.parse(localStorage.getItem("stockObjects")) != null){
                    //checks if local storage has info already

                    for(var i = 0; i < JSON.parse(localStorage.getItem("stockObjects")).length; i++){
                    storageArr.push(JSON.parse(localStorage.getItem("stockObjects"))[i]);
                    console.log(storageArr);
                    //if there is a search history in local storage it pushes all elements into an array
                    }
                    storageArr.push(JSON.parse(localStorage.getItem("baseObject")));
                    // adds an object template to the end of the array of stockObjects

                    storageArr[storageArr.length-1].name = localStorage.getItem("matchedName");
                    storageArr[storageArr.length-1].symbol = localStorage.getItem("matchedSymbol");
                    // adds stock name and symbol to that stockObject template

                    localStorage.setItem("stockObjects", JSON.stringify(storageArr));
                    // update the saved stockObjects
                
                } else {
                    storageArr.push(JSON.parse(localStorage.getItem("baseObject")));
                    // adds an stockObject template to the empty array
                    
                    storageArr[storageArr.length-1].name = localStorage.getItem("matchedName");
                    storageArr[storageArr.length-1].symbol = localStorage.getItem("matchedSymbol");
                    // adds stock name and symbol to the stockObject template 

                    localStorage.setItem("stockObjects", JSON.stringify(storageArr));
                }
                
                var localVar = localStorage.getItem("matchedSymbol");
                localStorage.setItem("latestSymbol", localVar);
                //creates a local variable to hold the only matched symbol and saves it as the latest symbol

                break;
            }} else if($(".user-input-symbol").val().trim().toLowerCase()==symbol.toLowerCase() && $(".user-input-symbol").val() != ""){
                localStorage.setItem("matchedName", name);
                localStorage.setItem("matchedSymbol", symbol);
                // saves matched info to local storage to pull later out of scope of variables
                
                var storageArr = [];
                //initializes a storage arr to hold each stockObject
                
                if(localStorage.getItem("stockObjects") != null){
                    //checks if local storage has info already

                    for(var i = 0; i < JSON.parse(localStorage.getItem("stockObjects")).length; i++){
                    storageArr.push(JSON.parse(localStorage.getItem("stockObjects"))[i]);
                    console.log(storageArr);
                    //if there is a search history in local storage it pushes all elements into an array
                    }
                    storageArr.push(JSON.parse(localStorage.getItem("baseObject")));
                    // adds an object template to the end of the array of stockObjects

                    storageArr[storageArr.length-1].name = localStorage.getItem("matchedName");
                    storageArr[storageArr.length-1].symbol = localStorage.getItem("matchedSymbol");
                    // adds stock name and symbol to that stockObject template

                    localStorage.setItem("stockObjects", JSON.stringify(storageArr));
                    // update the saved stockObjects
                
                } else {
                    storageArr.push(JSON.parse(localStorage.getItem("baseObject")));
                    // adds an stockObject template to the empty array
                    
                    storageArr[storageArr.length-1].name = localStorage.getItem("matchedName");
                    storageArr[storageArr.length-1].symbol = localStorage.getItem("matchedSymbol");
                    // adds stock name and symbol to the stockObject template

                    localStorage.setItem("stockObjects", JSON.stringify(storageArr));
                }

                var localVar = localStorage.getItem("matchedSymbol");
                localStorage.setItem("latestSymbol", localVar);
                //saves the latest symbol
                break;
            } else{
                //add modal alert that no match for search;
            }
        }
    
        localStorage.removeItem("matchedSymbol");
        localStorage.removeItem("matchedName");

        buildiexURLs(); // Builds all URLs using the saved latestSymbol
   

    //stock ajax for after market closes
    $.ajax({
      url: iexURL,
      method: "GET"
    }).then(function(response){
        //response holds the info for the latest symbol

        baseObject.symbol = localStorage.getItem("latestSymbol");
        baseObject.name = JSON.parse(localStorage.getItem("stockObjects"))[JSON.parse(localStorage.getItem("stockObjects")).length-1].name;
        baseObject.latestPrice = response.latestPrice;
        baseObject.high = response.high;
        console.log(baseObject.high);
        baseObject.low = response.low;
        baseObject.open = response.open;
        baseObject.close = response.close;
        // uses the stockObject template to hold all values before they get saved

        localStorage.removeItem("latestSymbol");

        if(localStorage.getItem("stockObjects") == null){
            var localArr = [baseObject];
        } else {
            var localArr = JSON.parse(localStorage.getItem("stockObjects"))
            // initialize a local array to hold the array of stock objects

            localArr[localArr.length-1] = baseObject;
            //replaces the last stock object in the array with one that has all the info gathered so far
        }

        localStorage.setItem("stockObjects", JSON.stringify(localArr));
        // Updates the saved array of stock objects
        
    // intraDay stock info
    $.ajax({
        url: intraDayURL,
        method: "GET"
    }).then(function(response2){
        console.log("gets intraDay")
        var responseIndex= response2.length-1;
        console.log(response2[response2.length-1].high)
        while(response2[response2.length-1].high==null){
            console.log("goes into while loop")
            if(responseIndex===0){
                break;
            }
            responseIndex--;
            console.log(response2[responseIndex].high);
        } 
        //while loop searches intraDayUrl to find latest non null info and establishes an index to that array object with proper info
        console.log(baseObject.high);
        if(baseObject.high == null){

            baseObject.high = response2[responseIndex].high
            baseObject.low = response2[responseIndex].low
            baseObject.open = response2[responseIndex].open
            baseObject.close = response2[responseIndex].close

            if(localStorage.getItem("stockObjects") == null){
                localStorage.setItem("stockobjects", JSON.stringify(baseObject))
            } else {
                var localArr = JSON.parse(localStorage.getItem("stockObjects"));
                localArr[JSON.parse(localStorage.getItem("stockObjects")).length-1] = (baseObject)
                localStorage.setItem("stockObjects", JSON.stringify(localArr));
            }
        }

        baseObject = {"name": "", "symbol":"", "latestPrice":"", "high":"", "low":"", "open":"", "close":"", "articleURL": "", "articleHeadline": ""};
        //returns baseObject to its former glory

        // if statment check if data pulled from IEX quote URL is null, if it is then it uses new data from IEX intraDay URL to replace the null data
    
        //AJAX call to receive the latest article corresponding with the current stock being worked with
        $.ajax({
            url: newsURL,
            method: "GET"
        }).then(function(response1){
            
            var localArr = JSON.parse(localStorage.getItem("stockObjects"));
            console.log("local1:"+ localArr);
            localArr[JSON.parse(localStorage.getItem("stockObjects")).length-1].articleHeadline = response1[0].headline;
            localArr[JSON.parse(localStorage.getItem("stockObjects")).length-1].articleURL = response1[0].url;
            console.log("local2:"+localArr[JSON.parse(localStorage.getItem("stockObjects")).length-1]);
            console.log("local3:"+localArr[JSON.parse(localStorage.getItem("stockObjects")).length-1].articleURL);
            // Adds the article headline and URL into the last stock Object in the stockObjects array held in a local variable
            localStorage.setItem("stockObjects", JSON.stringify(localArr));
        
        displayStock();
        function displayStock(){
            $(".stock-displayed").detach();
            for(var i = 0; i < JSON.parse(localStorage.getItem("stockObjects")).length; i++){
            $(".stock-table").prepend('<tr class="stock-displayed stock-displayed'+i+'"><td>'+JSON.parse(localStorage.getItem("stockObjects"))[i].name+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].latestPrice+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].high+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].low+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].open+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].close+'</td><td><a href="'+ JSON.parse(localStorage.getItem("stockObjects"))[i].articleURL +'">'+JSON.parse(localStorage.getItem("stockObjects"))[i].articleHeadline+'</a></td><td><button class="clear-btn clear-btn'+i+'">Remove</button></td></tr>');
            } //creates a table row for the stock searched and adds all info at once from local storage

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
            while(JSON.stringify(this.getAttribute("class")).charAt(loopIndex) != '"'){
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

$(".clear-btn-all").on("click", function(event){
    event.preventDefault();

    $(".stock-displayed").detach();
    localStorage.removeItem("stockObjects");
    localStorage.removeItem("latestSymbol");
    localStorage.removeItem("matchedName");
    localStorage.removeItem("matchedSymbol");
})

function buildiexURLs(){
    iexURL = baseURLIEX + localStorage.getItem("latestSymbol") + quoteURL + apiToken;
    newsURL = baseURLIEX + localStorage.getItem("latestSymbol") + newsURLBase + apiToken;
    intraDayURL = baseURLIEX + localStorage.getItem("latestSymbol") + intraDayURLBase + apiToken;
}

function displayHistory() {
    if(JSON.parse(localStorage.getItem("stockObjects")) != null){
    $(".stock-displayed").detach();
    for(var i = 0; i < JSON.parse(localStorage.getItem("stockObjects")).length; i++){
        $(".stock-table").prepend('<tr class="stock-displayed stock-displayed'+i+'"><td>'+JSON.parse(localStorage.getItem("stockObjects"))[i].name+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].latestPrice+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].high+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].low+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].open+'</td><td>$'+JSON.parse(localStorage.getItem("stockObjects"))[i].close+'</td><td><a href="'+ JSON.parse(localStorage.getItem("stockObjects"))[i].articleURL +'">'+JSON.parse(localStorage.getItem("stockObjects"))[i].articleHeadline+'</a></td><td><button class="clear-btn clear-btn'+i+'">Remove</button></td></tr>');
        }  //creates a table row for each of the stocks searched and adds all info for each row at once from local storage

    $(".table-heading").remove();
    // removes previous table heading

    $(".stock-table").prepend('<tr class="table-heading"><th>Company</th><th>Latest Price</th><th>Daily High</th><th>Daily Low</th><th>Opening Price</th><th>Closing Price</th><th>Latest Article:</th><th></th></tr>');
    } //create the table heading dynamically
} // Pulls all the search history for each stock saved in stockObjects and creates a table based off the info

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
if(localStorage.getItem("stockObjects") != null){
displayHistory();
}


// working iexURL
// https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_85904d0710804cf3865bcf30040ebec9

// working newsURL:
// https://cloud.iexapis.com/stable/stock/aapl/news/last/1?token=pk_85904d0710804cf3865bcf30040ebec9

//working intraDayURL:
// https://cloud.iexapis.com/stable/stock/aapl/intraday-prices?token=pk_85904d0710804cf3865bcf30040ebec9

// working financialmodelingprep URL:
// https://financialmodelingprep.com/api/v3/company/stock/list?apikey=50cb9e8f707557d71a23370f6431ed64

// George's api-key: 50cb9e8f707557d71a23370f6431ed64
// Jonghyun's api-key: 513abe965cedbb3357ade6b1f1b12dc2
