$(document).ready(function(){

	inquiry_popup = $('#inquiry_popup');
	inquiryCallBack = function(){}

	if (inquiry_popup != null && inquiry_popup.hasClass('pleaseShow')){
		inquiryCallBack = function(){
			_colorbox(inquiry_popup.html());
			$('a.inquiry_popup_answer').click(function(){
				$.getJSON($(this).attr('href'),function(data){
					if(data){
						if(!data.success){
							alert(data.reason);
						}

					}
					$.fn.colorbox.close();
				});
				
				return false;
			});
		}
	}
	
	

	mainpage_popup = $("#mainpage_popup_content");
	if (mainpage_popup != null && mainpage_popup.hasClass('pleaseShow'))
	{
		mainpage_popup.addClass('dontShow');
		mainpage_popup.removeClass('pleaseShow');

		var height = mainpage_popup.attr('box_height');
		if (height != null) {
			_colorbox_custom(mainpage_popup.html(), height,inquiryCallBack);
		} else {
			_colorbox(mainpage_popup.html(),inquiryCallBack);
		}
	} else {
		inquiryCallBack();
	}

	$(".openTarget").live("click", function(event) {
		popupshow = $('.openTarget');
		if (popupshow != null)
		{
			_colorbox(popupshow.html());
		}
		event.preventDefault();
	});

	if(!$(".f1, .f2").val()){
		$(".f1").addClass('bg');
	}
	if(!$(".f2").val()){
		$(".f2").addClass('bg');
	}
	
	$(".f1, .f2").focus(function () {
		$(this).removeClass('bg');
	}).bind("keydown", function() {
		$(this).removeClass('bg');
	});
	
	$(".f1, .f2").blur(function () {
		var $this = $(this);
		if(!$this.val()){
			$this.addClass('bg');
		}
	});
	
	
	//previous bids fade out
	var count = $("ul#previousBids li").size();
	var value = 100;
	var step = 90 / count;
	$("ul#previousBids li").each(function(i){
		if(i%3 == 0){value = 100 - (step * i);}
		$(this).css("opacity", value == 100 ? "1" : "0." + parseInt(value));
	});
	
	/* colorboxes */
	$("#bidNow a.not_logged_in").colorbox({opacity:"0.5"});
	
	$("#bidNow a.no_bids").colorbox({
		opacity:"0.5",
		onComplete:function(){ 
			$("#cboxCloseInline").live("click", function(event){
				event.preventDefault();
				$.fn.colorbox.close();
			});
		}
	});
	
	$(".closeColorbox").live("click", function(event) {
		$.fn.colorbox.close();
		event.preventDefault();
	});

	/*
	// dealbattle page
	if($("#auctionControls .buyItNow").length > 0) {
		var auction_id = $("#auctionControls .buyItNow").attr("id").replace("auction_", "");
		$("#auctionControls .buyItNow").colorbox({opacity:"0.5",href:"auction_buynowdialog.php?auction_id=" + auction_id});
		
	}
	*/

	// auction page
	$("#auctionControls .buyItNow:not(.bidsbackSmall,.bidsbackBig)").live("click", function(event) {
		var $this = $(this);
		if($this.hasClass("bidsbackSmall bidsbackBig")) {
			return false;
		}

		if ($this.parent('.bidForFree2012').length > 0) {
			_colorbox('<h1 style="margin-left: -20px;">Win or Lose<br/>Get Your Bids Back for FREE!</h1><p>' +
				'No Buy it Now - we return your Bids for FREE on Monday midnight 4/2!<br />' +
				'Applies to all Bids placed on any auction between now and Monday midnight.</p><br />' +
				'Note: if the auction ends after Monday midnight, the Bids placed after Monday midnight will be returned within 24 hours after the auction has ended.' +
				'<a href="#" style="margin-top: 10px;" class="closeColorbox ui_btn_big ui_btn_big_narrow_green nicebox right">OK</a>');
			return false;
		}

		var auction_id = $this.attr("id").replace("auction_", "");
		$.fn.colorbox({opacity:"0.5",href:"auction_buynowdialog.php?auction_id=" + auction_id});
		event.preventDefault();
	});

	var footerInterval;

	function footer(content, newClass) {
		clearInterval(footerInterval);
		$footer = $("#messageFooter");
		$footer.stop(1,1).html(content)

		if(typeof newClass != "undefined") {
			$footer.addClass(newClass);
		} else {
			$footer.removeAttr("class");
		}

		$footer.slideDown("slow", function() {
			footerInterval = setTimeout(function() {
				$footer.slideUp("slow", function() {
					if(typeof newClass != "undefined") {
						$footer.removeClass(newClass);
					}
				});
			}, 3000);
		});

	}

	// auction box
	$(".yourPrice:not(.bidsbackSmall,.bidsbackBig)").live("click", function(event) {
		var $this = $(this);
		if($this.hasClass("bidsbackSmall bidsbackBig")) {
			return false;
		}
		if ($this.parent('.product').find('.bidForFree2012').length > 0) {
			_colorbox('<h1 style="margin-left: -20px;">Win or Lose<br/>Get Your Bids Back for FREE!</h1><p>' +
				'No Buy it Now - we return your Bids for FREE on Monday midnight 4/2!<br />' +
				'Applies to all Bids placed on any auction between now and Monday midnight.</p><br />' +
				'Note: if the auction ends after Monday midnight, the Bids placed after Monday midnight will be returned within 24 hours after the auction has ended.' +
				'<a href="#" style="margin-top: 10px;" class="closeColorbox ui_btn_big ui_btn_big_narrow_green nicebox right">OK</a>');
			return false;
		}
		var auction_id = $this.attr("id");

		if ($this.hasClass('binJoin'))
		{
			footer('<b>You need to create an account first!</b><br />Join today for free and start saving money on auctions.', 'joinPage');
			regForm = $('a[name="cta-form"]').get(0);
			if (regForm != null)
			{
				if ($this.hasClass('binPage'))
				{
					$('#choosePath_bin').click();
					$("#path_register").hide();
					$("#path_buyItNow").show();
				}

				regForm.scrollIntoView(true);
			}
		} else {
			$.fn.colorbox({opacity:"0.5",href:"auction_buynowdialog.php?auction_id=" + auction_id});
		}
		event.preventDefault();
	});

	// bids back clicked
	$(".bidsbackSmall,.bidsbackBig").live("click", function(event) {
		event.preventDefault();
		_colorbox('<p style="margin-top:35px;">If you don\'t win this special auction, we will return all your spent bids back to your account for free!</p>');
	});

	function _colorbox(content, onCloseRun) {
		onCloseRun = typeof onCloseRun !== 'undefined' ? onCloseRun : false;
		var message = '<div id="popupContent" class="big">' + content +
		'<div class="clear">&nbsp;</div></div>';
		$.fn.colorbox({opacity:"0.5",html: message, onClosed: onCloseRun});
	}

	function _colorbox_custom(content, height, onCloseRun ) {
		onCloseRun = typeof onCloseRun !== 'undefined' ? onCloseRun : false;
		var height_attr = height + 'px';
		var message = '<div id="popupContent" class="big">' + content +
			'<div class="clear">&nbsp;</div></div>';
		$.fn.colorbox({opacity:"0.5",height: height_attr, innerHeight: height_attr, scrolling: false, html: message, onClosed: onCloseRun});
	}

	function _colorbox2(content) {
		var message = '<div id="popupContent" class="big">' + content +
			'<div class="clear">&nbsp;</div></div>';
		$.fn.colorbox({html: message});
	}

	$(".login").live("click", function(event) {
		var loginFormAction = $('div#loginContent form#login').attr('action');
		if(!loginFormAction) {
			loginFormAction = 'https://www.dealdash.com/login_user.php?login=1';
		}
		var loginhtml = '<div class="popuplogin">'+
			'<form name="loginfrm" method="post" action="login_user.php?login=1">'+
			'<ul>'+
			'<li><b>Username</b><br /><input type="text" name="u" class="textInput f1" value="" /></li>'+
			'<li><b>Password</b><br /><input type="password" name="p" class="textInput f2" value="" /></li>'+
			'<li class="btn"><button type="submit" class="ui_btn ui_btn_small_narrow_gold">Log in</button></li>'+
			'<li><a href="join.php" class="l">Don\'t have an account? Click here to create an account!</a></li>'+
			'<li><a href="forgotpassword.php">Forgot your password?</a></li>'+
			'</ul></form>'+
			'</div>';

		_colorbox2(loginhtml);
		event.preventDefault();
	});
	
	if($(".autobid").length > 0) {
		if(!$(".autobid_activate_button").hasClass("not_logged")) {
			var auction_id = $(".autobid_activate_button").attr("id").replace("auction_", "");
			$(".autobid_activate_button").colorbox({opacity:"0.5", href:"autobid_dialog.php?auction_id=" + auction_id});
		}
	}
	
	$("#buy_now_dialog_button").live("click", function(event) {
		var form = $(this).closest("form"),
			bbinput = form.children('input[name=hasBidBuddy]'),
			url = form.attr("action");
		if (bbinput.length && $(bbinput[0]).val() == 1) {
			var confirmHtml = '<div id="popupContent" class="cancelBidBuddyConfirm" class="popupContent">'+
				'<form action="'+url+'">'+
				'<h1>You have an active BidBuddy on this auction!</h1>'+
				'<p>Advancing to the Buy it Now screen will cancel your BidBuddy.<br /><br />Are you sure you want to do this?</p>'+
				'<div class="center" style="width:350px;padding:20px">'+
				'<button class="ui_btn_big ui_btn_big_wide_red left" id="buy_now_dialog_confirm_button" type="submit">'+
				'<span>Yes, cancel</span>'+
				'</button>'+
				'<button class="ui_btn_big ui_btn_big_wide_gold right" id="buy_now_dialog_cancel_button" type="button">'+
				'<span>Go back</span>'+
				'</button>'+
				'</div>'+
				'</form>'+
				'</div>';
			$.fn.colorbox({ html: confirmHtml });
			event.preventDefault();
			
			// Bind it to the confirmation button
			$("#buy_now_dialog_confirm_button").live("click", function(event) {
				$.getJSON(url, function(data) {
					if(data.canbuy){
						window.location = data.returnvalue;
					}else{
						$.fn.colorbox({html: data.returnvalue});
					}
				});
				event.preventDefault();				
			});
			
			$("#buy_now_dialog_cancel_button").live("click", function(event) {
				event.preventDefault();
				$.fn.colorbox.close();
			});
			
			return;
		}

		$.getJSON(url, function(data) {
			if(data.canbuy){
				window.location = data.returnvalue;
			}else{
				$.fn.colorbox({html: data.returnvalue});
			}
		});
		event.preventDefault();
	});
	
	/* accordion */
	//hide all except first 
	$(".accordion dd, .accordion_type_2 dd").not(':first').addClass("hide");
	$(".accordion_type_2 dt:first").addClass("active");
	$(".accordion dt").live("click", function(){
		$(this).next().slideToggle('normal');
		return false;
	}).css("cursor","pointer");
	$(".accordion_type_2 dt").live("click", function(){
		if($(this).hasClass('active')){
			return false;
		}		
		$(".accordion_type_2 dd:visible").slideUp('normal');
		$(".accordion_type_2 dt.active").removeClass("active");
		$(this).toggleClass("active").next().slideToggle('normal');
		return false;
	}).css("cursor","pointer");


	/* login */

	/*
	$("form#login").submit(function(event) {
		event.preventDefault();
		$.post($(this).attr("action") + "&ajax=1", {u: $("#f1").val(),p: $("#f2").val()},
			function(d) {
				// same as the personal fetch here										
				if(d.logged) {
					window.location.href = d.url;
				} else {
					if(typeof d.errReason == "undefined") {
						alert("The password or the username was incorrect.");
					} else {
						alert(d.errReason);
					}
				}
			},"json");
	});
	*/

	$(".dummyclick").live("click", function(event) {
		event.preventDefault();
	});

	$("span.onePerUser").livequery(function() {
		var $this = $(this);
		if($this.parent(".bidsBack").length > 0) {
			$this.tipsy({gravity: "s", title: function() {
				return "Win or get your bids back!";
			}});
		} else {
			$this.tipsy({gravity: "s", title: function() {
				return "You may only win this product once.";
			}});
		}
	});

	$(".noBuyItNow_large, .noBuyItNow_small").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "Buy it Now option not available.";
		}});
	});
	
	$(".patriots").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "I'm with the Patriots!";
		}});
	});
	$(".giants").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "I'm with the Giants!";
		}});
	});
    
	$(".women2012_flag").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "Exclusive Women's Day Discount Sale Item!";
		}});
	});

	$(".mystery2012_easter_flag").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "Easter Egg Mystery Auction! Item will be revealed when auction ends.";
		}});
	});

	$(".mystery2012_easter_flag_auction").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "Easter Egg Mystery Auction! Item will be revealed when auction ends.";
		}});
	});

	$(".promo_flag_right").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "Extra laptop auction! (Laptop Weekend Special)";
		}});
	});

	$(".promo_flag_right_2x").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "Mother’s Day Special! The winner of this auction gets TWO of the auction items for the same price!";
		}});
	});

	$(".promo_flag_battle_2x").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "Mother’s Day Special! The winner of this auction gets TWO of the auction items for the same price!";
		}});
	});


	$(".promo_flag_battle").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "Extra laptop auction! (Laptop Weekend Special)";
		}});
	});

	$(".ribbon_veteran:not('.notooltip')").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "I helped to honor Disabled American Veterans!";
		}});
	});


	$("span.lockprice").livequery(function() {
		$(this).tipsy({gravity: "s", title: function() {
			return "These auctions are reserved to users who have won fewer auctions than you.";
		}});
	});

	$(".christmaspromo").livequery(function() {
		$(this).tipsy({gravity: "s", html:true,title: function() {
			return "<center>All auction wins during Christmas Shopping Spree are FREE! DealDash pays the final sales price for the winner. Auction winners will only be subject to a $0.01 transaction fee that goes to the payment processor and does not benefit DealDash.</center>";
		}});
	});
	$(".bfpromo").livequery(function() {
		var bfname = $(this).find('.bfname:first-child').html();
		if(!bfname || bfname.length == 0) {
			bfname = 'Free auction wins'
		}
		$(this).tipsy({gravity: "s", html:true,title: function() {
			return "<center>All auction wins during the "+bfname+" are FREE! DealDash pays the final sales price for the winner. Auction winners will only be subject to a $0.01 transaction fee that goes to the payment processor and does not benefit DealDash.</center>";
		}});
	});

	$(".discountpromo").livequery(function() {
		var discountpromoname = $(this).find('.discountpromoname:first-child').html();
		if(!discountpromoname || discountpromoname.length == 0) {
			discountpromoname = 'Half Price Week'
		}
		$(this).tipsy({gravity: "s", html:true,title: function() {
			return "<center>During the "+discountpromoname+" you have to pay only 50% of the final auction price when you win! And shipping on DealDash is always free!</center>";
		}});
	});

	$(".mystery_auctionbox_stamp, .mystery_auctionpage_button").livequery(function() {
		var mysterypromotext= $(this).find('.mysterypromotext:first-child').html();
		if(!mysterypromotext || mysterypromotext.length == 0) {
			mysterypromotext = 'Mystery Auction! <br/>Item will be revealed when auction ends.';
		}
		$(this).tipsy({gravity: "s", html:true,title: function() {
			return "<center>"+mysterypromotext+"</center>";
		}});
	});


	$(".no_jumper_flag").livequery(function() {
		$(this).tipsy({gravity: "s", html:true,title: function() {
			if ($(this).attr('data-limit')) {
				return "<center>This is a No Jumper™ auction.<br>No new bidders can enter the auction after $"+$(this).attr('data-limit')+".</center>";				
			}
			return "<center>This is a No Jumper™ auction.<br>No new bidders can enter the auction after $5.00.</center>";
		}});
	});

	$(".no_jumper_tag_battle").livequery(function() {
		$(this).tipsy({gravity: "s", html:true,title: function() {
			if ($(this).attr('data-limit')) {
				return "<center>This is a No Jumper™ auction.<br>No new bidders can enter the auction after $"+$(this).attr('data-limit')+".</center>";				
			}			
			return "<center>This is a No Jumper™ auction.<br>No new bidders can enter the auction after $5.00.</center>";
		}});
	});

	$(".blackfriday .no_jumper_flag").livequery(function() {
		$(this).tipsy({gravity: "s", html:true,title: function() {
			if ($(this).attr('data-limit')) {
				return "<center>This is a No Jumper™ auction.<br>No new bidders can enter the auction after $"+$(this).attr('data-limit')+".</center>";				
			}			
			return "<center>This is a No Jumper™ auction.<br>No new bidders can enter the auction after $3.00.</center>";
		}});
	});

	$(".no_jumper_tag_battle.blackfriday").livequery(function() {
		$(this).tipsy({gravity: "s", html:true,title: function() {
			if ($(this).attr('data-limit')) {
				return "<center>This is a No Jumper™ auction.<br>No new bidders can enter the auction after $"+$(this).attr('data-limit')+".</center>";				
			}			
			return "<center>This is a No Jumper™ auction.<br>No new bidders can enter the auction after $3.00.</center>";
		}});
	});
	$(".beginner_tier_flag").livequery(function() {
		$(this).tipsy({gravity: "s", html:true,title: function() {
			return "<center>This auction is reserved for bidders that<br />have won less than 4 auctions.</center>";
		}});
	});

	$(".beginner_tier_tag_battle").livequery(function() {
		$(this).tipsy({gravity: "s", html:true,title: function() {
			return "<center>This auction is reserved for bidders that have won less than 4 auctions.</center>";
		}});
	});


	$(".bidbonusInfo").livequery(function() {
		var $this = $(this);
		$this.tipsy({gravity: "s", title: function() {
			return "You've just won " + $this.attr("rel") + " bids, keep bidding!";
		}});
	}).live("click", function(event) {
		var $this = $(this);
		$.get("resetBidBonus.php");
		$this.fadeOut(function() {
			$this.remove();
			$(".tipsy").remove();
		});
		event.preventDefault();
	});

	$("span.tmrGfx").livequery(function() {
		var $this = $(this);
		$this.tipsy({gravity: "s", html: true, title: function() {
			var id = $this.attr("id").replace("tmr_","");
			if(id == 30) {
				var text = "The timer is bumped to 30 seconds with each bid. When the price hits $2.00, it bumps to 20 seconds and to 10 seconds at $10.00!";
			} else if(id == 20) {
				var text = "The timer is bumped to 20 seconds with each bid.";
			} else {
				var text = "The timer is bumped to 10 seconds with each bid.";
			}
			return "<center>" + text + "</center>";
		}});
	});


	$(".halloween").livequery(function() {
		$(this).tipsy({gravity: "s", html: true, title: function() {
			var text = "Halloween Mystery Auction!<br />Item will be revealed when auction ends.";			
			return "<center>" + text + "</center>";
		}});
	});
	$(".heart,.auctionHeart").livequery(function() {
		$(this).tipsy({gravity: "s", html: true, title: function() {
			var text = "Win 2 auctions with a heart piece to unlock the special discount sale!";			
			return "<center>" + text + "</center>";
		}});
	});

	/*
	// tipsy values
	var wootPrice = "This is the price you get to buy the product (excluding Shipping & Handling) for if you win the auction by being the highest bidder when the timer runs out.";
	var wootTimer = "When the timer runs out, the highest bidder wins a crazy deal! With every bid, the timer restarts at 30 seconds. DealBattles with a timer higher than 30 seconds are upcoming DealBattles. You can already bid on them, but the timer won't be affected from bids until the clock goes under 30 seconds for the first time, and the fierce battle for the deal starts";

	var woot = $(".idontget");
	if(woot.length > 0) {
		woot.livequery(function() {
			var $this = $(this);

			$this.tipsy({gravity: "s", title: function() {
				if($this.parent().hasClass("idontget1")) {
					return wootPrice;
				} else {
					return wootTimer;
				}
			}});
		});
	}
	*/
	
	// bookmarking
	$(".bookmark").live("click", function(event) {
		var $this = $(this);
		var id = $this.attr("rel").replace("id_", "");
		var hasClass = $this.hasClass("addBookmark");
		var url = 'bookmark.php?save=' + id;
		if(!hasClass) {
			url = 'bookmark.php?delete=' + id;
		}
		var url = 
		$.ajax({
			url: url,
			success: function() {
				if(hasClass) {
					$this.removeClass("addBookmark").addClass("removeBookmark");
				} else {
					$this.removeClass("removeBookmark").addClass("addBookmark");
				}
			}
		});
		
		event.preventDefault();
	}).livequery(function() {
		var $this = $(this);
		if($this.hasClass("addBookmark")) {
			$this.tipsy({gravity: "s", html: true, title: function() {
				return 'Bookmark this auction!';
			}});
		}
	});

	// safeguard
	$(".sgShield, .sgShieldButton").live("click", function(event) {
		var $this = $(this);
		var url = $this.attr("href");
		if(url == "#") {
			return false;
		}
		$.ajax({url: url});
		
		event.preventDefault();
	}).tipsy({html:true, gravity: "s", title: function() {
		return '<center>The Safeguard places a bid for you in the very last second to prevent you from losing the auction.<br />Using the Safeguard costs 2 bids and you may only activate it once every 25 bids placed.</center>';
	}});

	// more content
	$("a.more").live("click", function(event) {
			var $this = $(this), url = $this.attr("href");
			$.ajax({
				url: url + "&ajax=1",
				success: function(html) {
					if(html.length > 0) {
						$this.parent().append(html);
					} else {
						$this.parent().append("No more results");
					}
					// remove the "old" more link
					$this.remove();
				}
			});
		event.preventDefault();
	});
	
	$("#verisignlogo").live("click", function(event) {
	  tbar = "location=yes,status=yes,resizable=yes,scrollbars=yes,width=560,height=500";
	  var sw = window.open($(this).attr("href"),'VRSN_Splash',tbar);

	  event.preventDefault();
	});
});

function frontpageSecsToString(secs) {
	var d, h, m, s;
	if(secs > 86400) {
		d = Math.floor(secs / 86400);
		var base = (d * 86400);
		h = Math.floor((secs - base) / 3600);
		m = Math.floor( ( (secs - base) - (3600*h)) / 60);
		s = (secs - base) - (m*60 + (3600*h));
	} else {
		h = parseInt(Math.floor(secs / 3600));
		m = Math.floor( ( secs - (3600*h)) / 60);
		s = secs - (m*60 + (3600*h));
	}
	
	if(parseInt(m) < 0 || parseInt(h) < 0 || parseInt(s) < 0) {
		m = s = h = 0;
	}
	if(h < 10) h = "0" + h;
	if(s < 10) s = "0" + s;
	if(m < 10) m = "0" + m;
	
	if(typeof(d) != "undefined") {
		var strDay = " days ";
		if(d == 1) {
			strDay = " day ";
		}

		return d + strDay + " + " + h + "h";
	}
	
	return h + ":" + m + ":" + s;
}

function claimFade($claimButton) {
	if($claimButton.is(":visible")) {
		$claimButton.removeClass("activeReward").addClass("claim");
	}
}
function highestBidder(object) {
	var $hLevel = $(".hLevel"), $inside = $(".hProgressbar");
	if($hLevel.length > 0) {
		var $claimButton = $(".claimButton");
		var level = object.level;
		var currentTime = parseInt(object.time);
		
		//$hLevel.find("strong").text("Level " + level);
		//$hLevel.find(".time").text(frontpageSecsToString(currentTime));

		if(typeof(object.nextTime) != "undefined") {
			var nextTime = parseInt(object.nextTime);

			var currentLevelTime = 0, progress = 0;
			if(typeof(object.currentLevelTime) != "undefined") {
				currentLevelTime = object.currentLevelTime;
			}
			

			var showClaim = currentTime >= nextTime;

			// Do not show more TAHB than the current limit
			if(showClaim) {
				var currentTime = nextTime;

				if(object.nextNextTime) {
					nextTime = object.nextNextTime;
					currentLevelTime = currentTime;
					level++;
				}
			}

			$hLevel.find("strong").text("Level " + level);
			$hLevel.find(".time").text(frontpageSecsToString(currentTime));

			if(!$inside.is(":visible")) {
				$inside.fadeIn();
			}
			if($hLevel.attr("rel") == "final") {
				$hLevel.html('<span class="bg sprite">&nbsp;</span><strong>Level ' + level + '</strong> - Time as highest bidder (<span class="time">' + frontpageSecsToString(currentTime) + '</span>)').attr("rel","");
			}
			
			if(level == 0) {
				progress = (currentTime / nextTime) * 100;
			} else {
				progress = ((currentTime - currentLevelTime) / (nextTime - currentLevelTime)) * 100;
			}

			var start = -203;
			start += progress;
			$(".inside").animate({backgroundPosition: + start + "px 31px"});

			var $timeLeft = (nextTime - currentTime);
			var $calculatedTimeLeft = frontpageSecsToString($timeLeft);
			$(".progressTime").text($calculatedTimeLeft);
			if(level > 0) {
				$hLevel.attr("rel", $calculatedTimeLeft);
			} else {
				$hLevel.attr("rel", $timeLeft);
			}
			
			var strBids = 'Bids';
			if(object.nextReward == 1) {
				strBids = 'Bid';
			}
			$claimButton.find("span.strbids").text(strBids);

			if(typeof(object.nextReward) != "undefined") {
				$claimButton.find("span.bids").text(object.nextReward);
			} else {
				$claimButton.fadeOut();
			}
			if(typeof(object.claimed) != "undefined") {
				if(showClaim) {
					$claimButton.css("display","block").removeClass("hidden2 claim").addClass("activeReward").find("span.bids").text(object.nextReward);
				} else {
					$claimButton.attr("rel", "Collect more time to claim reward");
					claimFade($claimButton);
				}
			} else {
				$claimButton.attr("rel", "Collect more time to claim reward");
				claimFade($claimButton);
			}
			
		} else {
			if($inside.is(":visible")) {
				$inside.fadeOut();
			}
			$hLevel.html('<span class="bg sprite">&nbsp;</span> Final level reached!').attr("rel","final");

			if(typeof(object.claimed) != "undefined") {
				if(object.claimed == 0) {
					$claimButton.css("display","block").removeClass("hidden2 claim").addClass("activeReward").find("span.bids").text(object.nextReward);
				} else {
					claimFade($claimButton);
				}
			} else {
				claimFade($claimButton);
			}
		}
	}
}


/**
 * Convert time to PDT timezone
 * @param time
 * @return object
 */
function pdtTime(time) {

	// pdt offset compared to utc
	var offset = "-7";
	
	// if time is given, use that
	if(typeof(time) == "undefined") {
    	d = new Date();
    } else {
    	d = new Date(time);
    }
   
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000 * offset));
}
/*
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui||(function(a){a.ui={version:"1.8",plugin:{add:function(c,d,f){var e=a.ui[c].prototype;for(var b in f){e.plugins[b]=e.plugins[b]||[];e.plugins[b].push([d,f[b]])}},call:function(b,d,c){var f=b.plugins[d];if(!f||!b.element[0].parentNode){return}for(var e=0;e<f.length;e++){if(b.options[f[e][0]]){f[e][1].apply(b.element,c)}}}},contains:function(d,c){return document.compareDocumentPosition?d.compareDocumentPosition(c)&16:d!==c&&d.contains(c)},hasScroll:function(e,c){if(a(e).css("overflow")=="hidden"){return false}var b=(c&&c=="left")?"scrollLeft":"scrollTop",d=false;if(e[b]>0){return true}e[b]=1;d=(e[b]>0);e[b]=0;return d},isOverAxis:function(c,b,d){return(c>b)&&(c<(b+d))},isOver:function(g,c,f,e,b,d){return a.ui.isOverAxis(g,f,b)&&a.ui.isOverAxis(c,e,d)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};a.fn.extend({_focus:a.fn.focus,focus:function(b,c){return typeof b==="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus();(c&&c.call(d))},b)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var b;if((a.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){b=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(a.curCSS(this,"position",1))&&(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0)}else{b=this.parents().filter(function(){return(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!b.length?a(document):b},zIndex:function(e){if(e!==undefined){return this.css("zIndex",e)}if(this.length){var c=a(this[0]),b,d;while(c.length&&c[0]!==document){b=c.css("position");if(b=="absolute"||b=="relative"||b=="fixed"){d=parseInt(c.css("zIndex"));if(!isNaN(d)&&d!=0){return d}}c=c.parent()}}return 0}});a.extend(a.expr[":"],{data:function(d,c,b){return !!a.data(d,b[3])},focusable:function(c){var d=c.nodeName.toLowerCase(),b=a.attr(c,"tabindex");return(/input|select|textarea|button|object/.test(d)?!c.disabled:"a"==d||"area"==d?c.href||!isNaN(b):!isNaN(b))&&!a(c)["area"==d?"parents":"closest"](":hidden").length},tabbable:function(c){var b=a.attr(c,"tabindex");return(isNaN(b)||b>=0)&&a(c).is(":focusable")}})})(jQuery);;/*
 * jQuery UI Effects 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects||(function(g){g.effects={};g.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(l,k){g.fx.step[k]=function(m){if(!m.colorInit){m.start=j(m.elem,k);m.end=i(m.end);m.colorInit=true}m.elem.style[k]="rgb("+Math.max(Math.min(parseInt((m.pos*(m.end[0]-m.start[0]))+m.start[0],10),255),0)+","+Math.max(Math.min(parseInt((m.pos*(m.end[1]-m.start[1]))+m.start[1],10),255),0)+","+Math.max(Math.min(parseInt((m.pos*(m.end[2]-m.start[2]))+m.start[2],10),255),0)+")"}});function i(l){var k;if(l&&l.constructor==Array&&l.length==3){return l}if(k=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(l)){return[parseInt(k[1],10),parseInt(k[2],10),parseInt(k[3],10)]}if(k=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(l)){return[parseFloat(k[1])*2.55,parseFloat(k[2])*2.55,parseFloat(k[3])*2.55]}if(k=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(l)){return[parseInt(k[1],16),parseInt(k[2],16),parseInt(k[3],16)]}if(k=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(l)){return[parseInt(k[1]+k[1],16),parseInt(k[2]+k[2],16),parseInt(k[3]+k[3],16)]}if(k=/rgba\(0, 0, 0, 0\)/.exec(l)){return a.transparent}return a[g.trim(l).toLowerCase()]}function j(m,k){var l;do{l=g.curCSS(m,k);if(l!=""&&l!="transparent"||g.nodeName(m,"body")){break}k="backgroundColor"}while(m=m.parentNode);return i(l)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};var e=["add","remove","toggle"],c={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};function f(){var n=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,o={},l,m;if(n&&n.length&&n[0]&&n[n[0]]){var k=n.length;while(k--){l=n[k];if(typeof n[l]=="string"){m=l.replace(/\-(\w)/g,function(p,q){return q.toUpperCase()});o[m]=n[l]}}}else{for(l in n){if(typeof n[l]==="string"){o[l]=n[l]}}}return o}function b(l){var k,m;for(k in l){m=l[k];if(m==null||g.isFunction(m)||k in c||(/scrollbar/).test(k)||(!(/color/i).test(k)&&isNaN(parseFloat(m)))){delete l[k]}}return l}function h(k,m){var n={_:0},l;for(l in m){if(k[l]!=m[l]){n[l]=m[l]}}return n}g.effects.animateClass=function(k,l,n,m){if(g.isFunction(n)){m=n;n=null}return this.each(function(){var r=g(this),o=r.attr("style")||" ",s=b(f.call(this)),q,p=r.attr("className");g.each(e,function(t,u){if(k[u]){r[u+"Class"](k[u])}});q=b(f.call(this));r.attr("className",p);r.animate(h(s,q),l,n,function(){g.each(e,function(t,u){if(k[u]){r[u+"Class"](k[u])}});if(typeof r.attr("style")=="object"){r.attr("style").cssText="";r.attr("style").cssText=o}else{r.attr("style",o)}if(m){m.apply(this,arguments)}})})};g.fn.extend({_addClass:g.fn.addClass,addClass:function(l,k,n,m){return k?g.effects.animateClass.apply(this,[{add:l},k,n,m]):this._addClass(l)},_removeClass:g.fn.removeClass,removeClass:function(l,k,n,m){return k?g.effects.animateClass.apply(this,[{remove:l},k,n,m]):this._removeClass(l)},_toggleClass:g.fn.toggleClass,toggleClass:function(m,l,k,o,n){if(typeof l=="boolean"||l===undefined){if(!k){return this._toggleClass(m,l)}else{return g.effects.animateClass.apply(this,[(l?{add:m}:{remove:m}),k,o,n])}}else{return g.effects.animateClass.apply(this,[{toggle:m},l,k,o])}},switchClass:function(k,m,l,o,n){return g.effects.animateClass.apply(this,[{add:m,remove:k},l,o,n])}});g.extend(g.effects,{version:"1.8",save:function(l,m){for(var k=0;k<m.length;k++){if(m[k]!==null){l.data("ec.storage."+m[k],l[0].style[m[k]])}}},restore:function(l,m){for(var k=0;k<m.length;k++){if(m[k]!==null){l.css(m[k],l.data("ec.storage."+m[k]))}}},setMode:function(k,l){if(l=="toggle"){l=k.is(":hidden")?"show":"hide"}return l},getBaseline:function(l,m){var n,k;switch(l[0]){case"top":n=0;break;case"middle":n=0.5;break;case"bottom":n=1;break;default:n=l[0]/m.height}switch(l[1]){case"left":k=0;break;case"center":k=0.5;break;case"right":k=1;break;default:k=l[1]/m.width}return{x:k,y:n}},createWrapper:function(k){if(k.parent().is(".ui-effects-wrapper")){return k.parent()}var l={width:k.outerWidth(true),height:k.outerHeight(true),"float":k.css("float")},m=g("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});k.wrap(m);m=k.parent();if(k.css("position")=="static"){m.css({position:"relative"});k.css({position:"relative"})}else{g.extend(l,{position:k.css("position"),zIndex:k.css("z-index")});g.each(["top","left","bottom","right"],function(n,o){l[o]=k.css(o);if(isNaN(parseInt(l[o],10))){l[o]="auto"}});k.css({position:"relative",top:0,left:0})}return m.css(l).show()},removeWrapper:function(k){if(k.parent().is(".ui-effects-wrapper")){return k.parent().replaceWith(k)}return k},setTransition:function(l,n,k,m){m=m||{};g.each(n,function(p,o){unit=l.cssUnit(o);if(unit[0]>0){m[o]=unit[0]*k+unit[1]}});return m}});function d(l,k,m,n){if(typeof l=="object"){n=k;m=null;k=l;l=k.effect}if(g.isFunction(k)){n=k;m=null;k={}}if(g.isFunction(m)){n=m;m=null}if(typeof k=="number"||g.fx.speeds[k]){n=m;m=k;k={}}k=k||{};m=m||k.duration;m=g.fx.off?0:typeof m=="number"?m:g.fx.speeds[m]||g.fx.speeds._default;n=n||k.complete;return[l,k,m,n]}g.fn.extend({effect:function(n,m,p,q){var l=d.apply(this,arguments),o={options:l[1],duration:l[2],callback:l[3]},k=g.effects[n];return k&&!g.fx.off?k.call(this,o):this},_show:g.fn.show,show:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]){return this._show.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="show";return this.effect.apply(this,k)}},_hide:g.fn.hide,hide:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]){return this._hide.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="hide";return this.effect.apply(this,k)}},__toggle:g.fn.toggle,toggle:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]||typeof l=="boolean"||g.isFunction(l)){return this.__toggle.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="toggle";return this.effect.apply(this,k)}},cssUnit:function(k){var l=this.css(k),m=[];g.each(["em","px","%","pt"],function(n,o){if(l.indexOf(o)>0){m=[parseFloat(l),o]}});return m}});g.easing.jswing=g.easing.swing;g.extend(g.easing,{def:"easeOutQuad",swing:function(l,m,k,o,n){return g.easing[g.easing.def](l,m,k,o,n)},easeInQuad:function(l,m,k,o,n){return o*(m/=n)*m+k},easeOutQuad:function(l,m,k,o,n){return -o*(m/=n)*(m-2)+k},easeInOutQuad:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m+k}return -o/2*((--m)*(m-2)-1)+k},easeInCubic:function(l,m,k,o,n){return o*(m/=n)*m*m+k},easeOutCubic:function(l,m,k,o,n){return o*((m=m/n-1)*m*m+1)+k},easeInOutCubic:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m+k}return o/2*((m-=2)*m*m+2)+k},easeInQuart:function(l,m,k,o,n){return o*(m/=n)*m*m*m+k},easeOutQuart:function(l,m,k,o,n){return -o*((m=m/n-1)*m*m*m-1)+k},easeInOutQuart:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m*m+k}return -o/2*((m-=2)*m*m*m-2)+k},easeInQuint:function(l,m,k,o,n){return o*(m/=n)*m*m*m*m+k},easeOutQuint:function(l,m,k,o,n){return o*((m=m/n-1)*m*m*m*m+1)+k},easeInOutQuint:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m*m*m+k}return o/2*((m-=2)*m*m*m*m+2)+k},easeInSine:function(l,m,k,o,n){return -o*Math.cos(m/n*(Math.PI/2))+o+k},easeOutSine:function(l,m,k,o,n){return o*Math.sin(m/n*(Math.PI/2))+k},easeInOutSine:function(l,m,k,o,n){return -o/2*(Math.cos(Math.PI*m/n)-1)+k},easeInExpo:function(l,m,k,o,n){return(m==0)?k:o*Math.pow(2,10*(m/n-1))+k},easeOutExpo:function(l,m,k,o,n){return(m==n)?k+o:o*(-Math.pow(2,-10*m/n)+1)+k},easeInOutExpo:function(l,m,k,o,n){if(m==0){return k}if(m==n){return k+o}if((m/=n/2)<1){return o/2*Math.pow(2,10*(m-1))+k}return o/2*(-Math.pow(2,-10*--m)+2)+k},easeInCirc:function(l,m,k,o,n){return -o*(Math.sqrt(1-(m/=n)*m)-1)+k},easeOutCirc:function(l,m,k,o,n){return o*Math.sqrt(1-(m=m/n-1)*m)+k},easeInOutCirc:function(l,m,k,o,n){if((m/=n/2)<1){return -o/2*(Math.sqrt(1-m*m)-1)+k}return o/2*(Math.sqrt(1-(m-=2)*m)+1)+k},easeInElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r)==1){return k+u}if(!q){q=r*0.3}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}return -(m*Math.pow(2,10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q))+k},easeOutElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r)==1){return k+u}if(!q){q=r*0.3}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}return m*Math.pow(2,-10*n)*Math.sin((n*r-o)*(2*Math.PI)/q)+u+k},easeInOutElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r/2)==2){return k+u}if(!q){q=r*(0.3*1.5)}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}if(n<1){return -0.5*(m*Math.pow(2,10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q))+k}return m*Math.pow(2,-10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q)*0.5+u+k},easeInBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}return p*(m/=o)*m*((n+1)*m-n)+k},easeOutBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}return p*((m=m/o-1)*m*((n+1)*m+n)+1)+k},easeInOutBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}if((m/=o/2)<1){return p/2*(m*m*(((n*=(1.525))+1)*m-n))+k}return p/2*((m-=2)*m*(((n*=(1.525))+1)*m+n)+2)+k},easeInBounce:function(l,m,k,o,n){return o-g.easing.easeOutBounce(l,n-m,0,o,n)+k},easeOutBounce:function(l,m,k,o,n){if((m/=n)<(1/2.75)){return o*(7.5625*m*m)+k}else{if(m<(2/2.75)){return o*(7.5625*(m-=(1.5/2.75))*m+0.75)+k}else{if(m<(2.5/2.75)){return o*(7.5625*(m-=(2.25/2.75))*m+0.9375)+k}else{return o*(7.5625*(m-=(2.625/2.75))*m+0.984375)+k}}}},easeInOutBounce:function(l,m,k,o,n){if(m<n/2){return g.easing.easeInBounce(l,m*2,0,o,n)*0.5+k}return g.easing.easeOutBounce(l,m*2-n,0,o,n)*0.5+o*0.5+k}})})(jQuery);; 