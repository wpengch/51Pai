/* 
	@name: auction.js
	@description: for auction
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
	        timeleft: '00:00:20', 
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
	        timeleft: '00:00:30', 
	        price2: '39.02'
	    },
	    { 	productId:'ec00005', 
        	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'neikvon', 
	        timeleft: '00:00:10', 
	        price2: '21.00'
	    },
	    { 	productId:'ec00006', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'inman', 
	        timeleft: '00:00:10', 
	        price2: '99.50'
	    },
	    { 	productId:'ec00007', 
	    	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'pmben', 
	        timeleft: '00:00:10', 
	        price2: '102.00'
	    },
	    { 	productId:'ec00008', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'slash', 
	        timeleft: '00:00:10', 
	        price2: '39.02'
	    },
	    { 	productId:'ec00009', 
        	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'neikvon', 
	        timeleft: '00:00:10', 
	        price2: '21.00'
	    },
	    { 	productId:'ec00010', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'inman', 
	        timeleft: '00:00:10', 
	        price2: '99.50'
	    },
	    { 	productId:'ec00011', 
	    	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'pmben', 
	        timeleft: '00:00:10', 
	        price2: '102.00'
	    },
	    { 	productId:'ec00012', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'slash', 
	        timeleft: '00:00:10', 
	        price2: '39.02'
	    },
	    { 	productId:'ec00013', 
        	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'neikvon', 
	        timeleft: '00:00:10', 
	        price2: '21.00'
	    },
	    { 	productId:'ec00014', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'inman', 
	        timeleft: '00:00:10', 
	        price2: '99.50'
	    },
	    { 	productId:'ec00015', 
	    	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'pmben', 
	        timeleft: '00:00:10', 
	        price2: '102.00'
	    },
	    { 	productId:'ec00016', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'slash', 
	        timeleft: '00:00:10', 
	        price2: '39.02'
	    },
	    { 	productId:'ec00017', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'inman', 
	        timeleft: '00:00:10', 
	        price2: '99.50'
	    },
	    { 	productId:'ec00018', 
	    	productName:'ipad mini', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'pmben', 
	        timeleft: '00:00:10', 
	        price2: '102.00'
	    },
	    { 	productId:'ec00019', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'slash', 
	        timeleft: '00:00:10', 
	        price2: '39.02'
	    },
	    { 	productId:'ec00020', 
	    	productName:'Apple 苹果 iPhone 5（16G）3G', 
	        productImg: 'http://cdn.51paiba.com/static/img/product/200x230/1.jpg', 
	        price: '235.00', 
	        lastUser: 'slash', 
	        timeleft: '00:00:10', 
	        price2: '39.02'
	    }
    ]
};
$(function(){
	//auction tpl
	var auction_tpl = $('#auction-auction-tpl').html();
	var auction_html = juicer(auction_tpl, auctionData);
	$('#auction').append(auction_html).find('.item').each(function(){
		var id=$(this).attr('id');
		timeCount(id);
	});

	var iosocket = io.connect();

    iosocket.on('connect', function () {

        $('#connect_status').text('已连接').css('color','green');

        iosocket.on('disconnect', function() {
            $('#connect_status').text('未连接').css('color','red');
        });

        iosocket.on('message', function(message) {
        	setStatus(message);
            $('#connect_status').append(message);
        });
        
    });

	//Bid
    $('.btnBid').on('click',function(){
    	$this=$(this);
    	var id=$this.parent().parent().attr('id');
    	var usr=$('#'+id).find('.user').html();
    	var prc=$('#'+id).find('.price-now').html();
    	var arr=[id,usr,prc];
    	iosocket.send(arr);
    	timeShake(id);
    	//timeCount(id);
    	
    	$('#'+id).find('.price-now').html(toDecimal(prc) + 0.5);
    	$('#'+id).find('.time').html("00:00:50");

    });
});

//时间闪动
function timeShake(id){
	var span=$('#'+id).find('.time');
	span.animate({
		opacity: .2
	},500,function(){
		$(this).css({'background-color':'red', 'color': '#fff'}).fadeIn('slow');
	}).animate({
		opacity: 1
	},300,function(){
		$(this).css({'background-color':'#fff', 'color': 'red'}).fadeIn(500);
	});
}

//update terminal
function setStatus(msg){
	var strs= new Array();
	strs=msg.split(",");
	var newPrice= toDecimal(strs[2]) + 0.5;
	$('#'+strs[0]).find('.price-now').text(newPrice);
	$('#'+strs[0]).find('.time').html("00:00:50");

	timeShake(strs[0]);
}

//功能：将浮点数四舍五入，取小数点后2位  
function toDecimal(x) {  
    var f = parseFloat(x);  
    if (isNaN(f)) {  
        return;  
    }  
    f = Math.round(x*100)/100;  
    return f;  
}  

var start = 0;
var step = -1;

//倒计时
function timeCount(id){
	var obj=$('#'+id).find('.time');
	var t0=$.trim(obj.html()).split(':');
	start=parseInt( t0[0]*60*60 + t0[1]*60 + t0[2] );
	start += step;
	var t1=formatSeconds(start);
	obj.html(t1);
	if(start <= 0){
		clearTimeout(tt);
		obj.html("00:00:50");
	}

	var tt=setTimeout(function(){ timeCount(id); },1000);

}
//格式化分钟为时分  
function formatMinutes(minutes){  
    var hour = Math.floor(minutes/60);  
    var minute = hour > 0 ? hour*60 : minutes;  
    var time="";  
    if (hour > 0) {
    	if(hour < 10)
    		time += "0" + hour + ":";  
    	else
    		time += hour + ":";  
    }else{
    	time += "00:";
    }
    if (minute > 0) {
    	if(minute < 10)
    		time += "0" +  minute + ":";  
    	else
    		time += minute + ":";  
    }else{
    	time += "00:";
    }
    return time;  
}  
//格式化秒数为时分秒  
function formatSeconds(seconds) {
    if(seconds >0){  
        var minutes = Math.floor(seconds/60);  
        seconds = seconds - minutes * 60;  
    	if(seconds < 10){
    		return formatMinutes(minutes) + (seconds > 0 ? "0" + seconds : "");
	    }else{
	    	return formatMinutes(minutes) + (seconds > 0 ? seconds : "");
	    }
    }  
    return seconds;  
}  




