(function($) {

    var startNumProd = 0, finishNumProd = 10;

    var watchlist = new ProductsList();
    var listOfProduct = new ProductsList();

    
    //Listener of changing in product list
    function handleListUpdate(changes){    
         changes.forEach(function(change){
            var newObject = change.object;
            newObject.showTo('#product-list', startNumProd, finishNumProd);         
        });
    }

     //Listener of changing in watchlist
    function handleWatchListUpdate(changes){
        changes.forEach(function(change){ 
            var newObject = change.object;
            $('#numbOfProducts').text(newObject.length())
            newObject.showTo('#product-watchlist', startNumProd, finishNumProd);
        });
    }

    Object.observe(listOfProduct, handleListUpdate);
    Object.observe(watchlist, handleWatchListUpdate);


    //Get products and display them
    $.getJSON("assets/data.json", function(data) {

        for (key in data.product){
            var element = data.product[key];

            //Creating product object
            var Product = new Item({
                id:key,
                title: element.data.systemtitle,
                number: element.data.systemnumber,
                fireresistance: element.data.fireresistance,
                soundproof: element.data.soundproof_filter,
                wallthickness: element.data.wallthickness,
                dampingstrength: element.data.dampingstrength,
                onRemoveItem: listOfProduct.remove.bind(listOfProduct),
                removeFromWatchlist: watchlist.remove.bind(watchlist),
                addToWatchlist: watchlist.push.bind(watchlist),
                addToListProduct: listOfProduct.push.bind(listOfProduct),
            });
                
            listOfProduct.push( Product )          
        }
    
        listOfProduct.showTo('#product-list', startNumProd, finishNumProd)
        
    });

    //Loading more 5 products
    $(window).scroll(function () {
        if ($(document).height() - $(window).height() <= $(window).scrollTop()) {
            if(startNumProd < listOfProduct.length()){
                if(startNumProd + 5 < listOfProduct.length()){
                    listOfProduct.showTo('#product-list', 0, startNumProd + 5);
                    startNumProd = startNumProd + 5;
                } else {
                    alert('End of the list');
                }
            }
        }
    });

})(jQuery);
