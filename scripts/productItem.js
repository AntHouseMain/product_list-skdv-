// Function constructor for list of products
function ProductsList(config){

    var config = config || {};

    this.items = [];
    
    // Function adding product to list
    this.push = function(product){
        var newArr = this.items.slice()
        
        newArr.push(product)
        this.items = newArr

        return  this;
    }
    
    //Function removing product from list
    this.remove = function(id){
        return  this.items = this.items.filter( function(item){
            console.log('remove');
            return item.prop('id') !== id;
        })
    }

    this.filter = function(params){
        return this;
    }
    
    //Function displaying products
    this.showTo = function(element, startNumber, finishNumber){
        $(element).empty()

        for (var i = startNumber; i < finishNumber; i++){
            $(element).append(this.items[i])
        }

        return this;
    }

    this.length = function(){
        return this.items.length;
    }
}



// Function constructor for product
function Item (config){
    
    var self = this;
    var config = config || {};
    this.id = config.id,
    this.img = 'img/product-image.png',
    this.title = config.title,
    this.number = config.number,
    this.fireresistance = config.fireresistance,
    this.soundproof = config.soundproof,
    this.wallthickness = config.wallthickness,
    this.dampingstrength = config.dampingstrength,
    this.btnId = config.id,


    this.atachEvent = function(){
        //Handler button adding product to watchlist 
        $(document).on('click','.addToWatch-'+this.btnId,function(){
            config.addToWatchlist(item)
            config.onRemoveItem(item.prop('id'))
            $(this).before(removeFromWatchlist).remove()
        })

        //Handler button removing product from watchlist 
        $(document).on('click','.removeFromWatch-'+this.btnId,function(){
            config.addToListProduct(item)
            config.removeFromWatchlist(item.prop('id'))
            $(this).before(addToWatchlist).remove()
        })
    }
    
    var productImg = $('<img/>',{
        'class':"product-image",
        'src': this.img
    })      

    var addToWatchlist = $('<button/>',{
        'type': 'button',
        'class': 'uk-button addToWatch-'+this.btnId,
        'text': 'add to watchilst'   
    })

    var removeFromWatchlist = $('<button/>',{
        'type': 'button',
        'class': 'uk-button removeFromWatch-'+this.btnId,
        'text': 'remove from watchlist'
    })
        
    var desc = $('<div/>',{
        html: '<p>Id: <span class="product-id">' + this.id + '</span></p>' +
            '<p>Systemtitle: <span class="product-systemtitle">' + this.title +'</span></p>' + 
            '<p>Systemnumber: <span class="product-systemnumber">' + this.number + '</span></p>' +
            '<p>Firerasistance: <span class="product-fisreresistance">' + this.fireresistance + '</span></p>' + 
            '<p>Soundproof: <span class="product-soundproof">' + this.soundproof + '</span></p>' +
            '<p>Wallthickness: <span class="product-wallthickness">' + this.wallthickness + '</span></p>' +
            '<p>Dampingstrength: <span class="product-dampingstrength">' + this.dampingstrength + '</span></span></p>'
    })

    var body = $('<div/>',{
        'class' : 'product-item uk-width-1-2',
        'id': this.id
    })

    var item = body.append(productImg).append(addToWatchlist).append(desc)

    this.atachEvent()

    return  item;
}

var productItem = {
    items:[],

    create: function(id) {
        this.items.push( new Item(id) )
        return this;
    },
};


