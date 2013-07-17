/* 
	@name: index.js
	@description: for index.html
	@author:neikvon@hotmail.com
*/
var auctionData = {
    list: [
        { 	productId:'ec00001', 
        	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'neikvon', 
	        timeleft: '00:00:10', 
	        price2: '21.00'
	    },
	    { 	productId:'ec00002', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'inman', 
	        timeleft: '00:00:10', 
	        price2: '99.50'
	    },
	    { 	productId:'ec00003', 
	    	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'pmben', 
	        timeleft: '00:00:10', 
	        price2: '102.00'
	    },
	    { 	productId:'ec00004', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'slash', 
	        timeleft: '00:00:10', 
	        price2: '39.02'
	    }
    ]
};
var historyData = {
    list: [
        { 	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'neikvon', 
	    },
	    { 	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'neikvon', 
	    },
	    { 	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'neikvon', 
	    },
	    { 	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'neikvon', 
	    }
    ]
};
$(function(){
	//auction
	// var auction_tpl = $('#index-auction-tpl').html();
	// var auction_html = juicer(auction_tpl, auctionData);
	// $('#indexAuction').append(auction_html);
	//history
	var history_tpl = $('#index-history-tpl').html();
	var history_html = juicer(history_tpl, historyData);
	$('#indexHistory').append(history_html);
});

$(function() {
  $('#slides').slidesjs({
    width: 760,
    height: 280,
    navigation: false,
    play:{
    	auto: true,
    	interval: 3000,
    	pauseOnHover: true,
    }
  });
});

$(function(){
    

    

    //Buy
    $('.btnBuy').on('click',function(){
    	alert(0);
    });
});



