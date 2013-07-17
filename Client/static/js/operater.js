var auctionData = {
    list: [
        { 	id:'0000001', 
        	status: 1,
        	auctionName:'ipad mini', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'neikvon', 
	        timeLeft: 10, 
	        buyPrice: '21.00'
	    },
	    { 	id:'0000002', 
        	status: 1,
	    	auctionName:'Apple 苹果 iPhone 5（16G）3G', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '5.00', 
	        bidder: 'inman', 
	        timeLeft: 20, 
	        buyPrice: '99.50'
	    },
	    { 	id:'0000003', 
        	status: 1,
	    	auctionName:'ipad mini', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '3.00', 
	        bidder: 'pmben', 
	        timeLeft: 30, 
	        buyPrice: '102.00'
	    },
	    { 	id:'0000004', 
        	status: 2,
	    	auctionName:'Apple 苹果 iPhone 5（16G）3G', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '8.00', 
	        bidder: 'slash', 
	        timeLeft: 30, 
	        buyPrice: '39.02'
	    },
	    { 	id:'0000005', 
        	status: 3,
        	auctionName:'ipad mini', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '18.00', 
	        bidder: 'neikvon', 
	        timeLeft: 10, 
	        buyPrice: '21.00'
	    },
	    { 	id:'0000006', 
        	status: 4,
	    	auctionName:'Apple 苹果 iPhone 5（16G）3G', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'inman', 
	        timeLeft: 10, 
	        buyPrice: '99.50'
	    },
	    { 	id:'0000007', 
        	status: 0,
	    	auctionName:'ipad mini', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'pmben', 
	        timeLeft: 10, 
	        buyPrice: '102.00'
	    },
	    { 	id:'0000008', 
        	status: 1,
	    	auctionName:'Apple 苹果 iPhone 5（16G）3G', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'slash', 
	        timeLeft: 10, 
	        buyPrice: '39.02'
	    },
	    { 	id:'0000009', 
        	status: 1,
        	auctionName:'ipad mini', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'neikvon', 
	        timeLeft: 10, 
	        buyPrice: '21.00'
	    },
	    { 	id:'0000010', 
        	status: 1,
	    	auctionName:'Apple 苹果 iPhone 5（16G）3G', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'inman', 
	        timeLeft: 10, 
	        buyPrice: '99.50'
	    },
	    { 	id:'0000011', 
        	status: 1,
	    	auctionName:'ipad mini', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'pmben', 
	        timeLeft: 10, 
	        buyPrice: '102.00'
	    },
	    { 	id:'0000012', 
        	status: 1,
	    	auctionName:'Apple 苹果 iPhone 5（16G）3G', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'slash', 
	        timeLeft: 10, 
	        buyPrice: '39.02'
	    },
	    { 	id:'0000013', 
        	status: 1,
        	auctionName:'ipad mini', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'neikvon', 
	        timeLeft: 10, 
	        buyPrice: '21.00'
	    },
	    { 	id:'0000014', 
        	status: 1,
	    	auctionName:'Apple 苹果 iPhone 5（16G）3G', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'inman', 
	        timeLeft: 10, 
	        buyPrice: '99.50'
	    },
	    { 	id:'0000015', 
        	status: 1,
	    	auctionName:'ipad mini', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'pmben', 
	        timeLeft: 10, 
	        buyPrice: '102.00'
	    },
	    { 	id:'0000016', 
        	status: 1,
	    	auctionName:'Apple 苹果 iPhone 5（16G）3G', 
	        auctionImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        bidder: 'slash', 
	        timeLeft: 10, 
	        buyPrice: '39.02'
	    }	
    ]
};
var auctions = {},
	isPolling = false,
	firstRun = true,
	auctionPoller = false,
	forceRefresh =false;
var activeLimit = 1800; //请求时间最低限制，避免延迟

//竞拍初始化
function initAuction(id,$dom) {
	var obj={
		'id': id,				//竞拍id
		'dom': $dom, 			//竞拍item
		'timeLeft': 0,			//剩余时间
		'timer': false,			//计时器
		'auctionTime': 30,		//竞拍倒计时
		'price': 0,				//当前竞拍价格
		'oldPrice': 0,			//前一次竞拍价格
		'buyPrice': 0,			//购买价格
		'canBid': false,
		'status': 0,			//竞拍状态
		'winner': false,
		'isWinner': false,		//获得者
		'bidsPlaced': 0,
		'noNewBidders': false,
		'message': '',
		'userRibbon': false
	};

	$dom.data('holdRedcount', 0);
	$dom.timer = $('#time_' + id);
	$dom.winner = $('#bidder_' + id);
	$dom.price = $('#price_' + id);

	obj.timeLeft = obj.oldtimeLeft = $dom.attr('rel');
	obj.price = ($dom.price.html()+'').replace('¥','');

	switch ($dom.attr('data-bin')) {
		case 'nobin':
		case 'no': //不能购买
			obj.buyPrice = false;
			break;
		default:
			obj.buyPrice = $dom.attr('data-bin');
			break;
	}
	$dom.timer.html(secsToString(obj.timeLeft));
	obj.timer = setInterval(function() {
		obj.timeLeft--;

		timeHandler(obj);

		// 竞拍更新时清除计时器
		if (firstRun == false && (obj.status == 1 || obj.status == 3) && obj.timeLeft < activeLimit) {
			clearInterval(obj.timer);
		}
		$dom.timer.html(secsToString(obj.timeLeft));
	}, 1000);

	return obj;
}

//操盘手
function timeHandler(obj){
	//test
	if(obj.timeLeft == 0){
		obj.timeLeft = 30;
	}
	//end test
}

//更新单个竞拍
function reFresh(auction){
	firstRun = false;
	var id= auction.id,
		$dom= $('#'+ auction.dom),
		$price= $('#price_'+ id),
		$timeLeft= $('#time_'+ id),
		$bidder= $('#bidder_'+ id);
		timeShow=secsToString(auction.timeLeft);
	$dom.attr('rel', auction.timeLeft);
	$price.html('¥' + auction.price);
	$timeLeft.html(timeShow);
	$bidder.html(auction.bidder);

	auction.timeLeft--;
	timeHandler(auction);
}

//刷新
function updateAuction(auction){
	var j_time=$('#auction_'+ auction.id).find('.j_time');
	j_time.stop().animate({ opacity: .5 }, 100, function() {
		$(this).addClass('time-slash');
	}).animate({ opacity: 1 }, 200,function(){
		$(this).removeClass('time-slash');
	}).animate({ opacity: .5 }, 100, function() {
		$(this).addClass('time-slash');
	}).animate({ opacity: 1 }, 200,function(){
		$(this).removeClass('time-slash');
	});

	clearInterval(auctions[auction.id].timer);
	reFresh(auction);
	auctions[auction.id].timer= setInterval(function(){
		reFresh(auction);
	}, 1000);
}

//初始化轮询
function initPolling() {
	auctions = {};
	firstRun = true;
	isPolling = false;
	$('.item').each(function() {
		var auction_id = this.id.split('_').pop();
		auctions[auction_id] = initAuction(auction_id, $(this));
	});
}

var clickCheck = {},
	clickCheckTimeLimit = 0.25;

function setClickCacheTime(auctid) {
	var date = new Date();
	clickCheck[auctid] = date.getTime() / 1000;
}	

//文档初始化
$(function(){
	//alert(getTimeStamp());
	//auction tpl
	var auction_tpl = $('#auctionTpl').html();
	var auction_html = juicer(auction_tpl, auctionData);
	$('#auction').append(auction_html);

	initPolling();

	var socket = io.connect('http://localhost');
	socket.on('auction', function(auction) {
		updateAuction(auction);
	});

	//竞拍按钮事件
	$(".btnBid").on("click", function(event) {
		event.preventDefault();
		var $this = $(this);
		var id = $this.attr("id").replace("btnBid_", "");
		var bidder = 'someone';
		var oldPrice = toDecimal( $('#price_'+id).html().replace("¥", "") , 0);
		var priceStr=$('#price_'+id).html().replace("¥", "");
		var price = toDecimal(priceStr,0.1);

		// 检测多重点击
		if (typeof(clickCheck[id]) != "undefined") {
			var date = new Date();
			if (clickCheck[id] >= ((date.getTime() / 1000) - clickCheckTimeLimit)) {
				return false;
			}
		}

		setClickCacheTime(id);

		var auction={
			"id": id,				//竞拍id
			"dom": "auction_"+id , 	//竞拍item
			"timeLeft": 30,			//剩余时间
			"timer": false,			//计时器
			"auctionTime": 30,		//竞拍倒计时
			"price": price,			//当前竞拍价格
			"oldPrice": oldPrice,	// 前一次竞拍价格
			"buyPrice": 0,			//购买价格
			"canBid": true,
			"status": 1,			//竞拍状态
			'winner': false,
			'isWinner': false,		//获得者
			'bidsPlaced': 0,
			'noNewBidders': false,
			'message': '',
			'userRibbon': false
		};
		//提交
		var item = auctions[id];
		clearInterval(item.timer);
		socket.emit('auction', auction);
		updateAuction(auction);
	});
});
//功能：获取竞拍列表
function getAuctionList(){
	$.ajax({
		type: "POST",
		url: "some.php",
		data: "auction.index,select,"+getTimeStamp()
	}).done(function( msg ) {
		alert( "Data Saved: " + msg );
	});
}

//功能：秒格式化
function secsToString(secs) {
	var h, m, s;
	h = parseInt(Math.floor(secs / 3600));
	m = Math.floor((secs - (3600*h)) / 60);
	s = secs - (m*60 + (3600*h));
	
	if (parseInt(m) < 0 || parseInt(h) < 0 || parseInt(s) < 0) {
		m = s = h = 0;
	}
	if(h < 10) h = "0" + h;
	if(s < 10) s = "0" + s;
	if(m < 10) m = "0" + m;
	
	// 检查
	if(h > 1000 || h < -10) {
		return '<span style="font-size: 1em;">计算时间...</span>';
	}
	return h + ":" + m + ":" + s;
}	

//功能：两数相加，总是保留两位小数，返回字符串  
function toDecimal(x,y){
	var f = parseFloat(x) + parseFloat(y);
	if (isNaN(f))
	{
		return false;
	}
	f = Math.round(f*100)/100;
	var s = f.toString();
	var pos_decimal = s.indexOf('.');
	if (pos_decimal < 0)
	{
		pos_decimal = s.length;
		s += '.';
	}
	while (s.length <= pos_decimal + 2)
	{
		s += '0';
	}
	return s;
}

//预加载图片
function preloadImage(url) {
	$("<img />").load().attr("src", url);
}



