var auctions = {},
	mainAuctionId = false,
	mainAuction = false,
	mainAuctionSold = false,
	isPolling = false,
	firstRun = true,
	auctionPoller = false,
	forceRefresh = false,
	oldIdList = [],
	disableFlashes = {};

var activeLimit = 1800; // Amount of seconds left in auction to begin polling the server - tweak me! :)

function initAuction(id, $dom) {
	if (typeof auctions[id] != 'undefined') {
		return auctions[id];
	}
	var obj = {
		'id': id,
		'dom': $dom,
		'timeLeft': 0,
		'timer': false,
		'auctionTime': 30,
		'price': 0,
		'oldPrice': 0, // used for animating
		'binPrice': 0,
		'canBid': false,
		'status': 0,
		'winner': false,
		'isWinner': false,
		'bidsPlaced': 0,
		'noNewBidders': false,
		'message': '',
		'userRibbon': false
	};
	
	// helper variable for displaying item "red" for a while after new bid
	$dom.data('holdRedcount', 0);
	$dom.timer = $('#time_' + id);
	$dom.winner = $('#username_' + id);
	$dom.price = $('#price_' + id);
	$dom.bidnow = $('#bidnow_' + id);
	$dom.bidbutton = $('#bidbutton_' + id);
	$dom.binholder = $('#auction_' + id + ' .yourPrice');

	obj.timeLeft = obj.oldTimeLeft = $dom.attr('rel');
	obj.price = ($dom.price.html()+'').replace('$','');
	
	switch ($dom.attr('data-bin')) {
		case 'nobin': 
		case 'no':
			obj.binPrice = false;
			break;
		default:
			obj.binPrice = $dom.attr('data-bin');
			break;
	}

	obj.timer = setInterval(function() {
		obj.timeLeft--;
		  // Remove local timer when auction is updating
		  if (firstRun == false && (obj.status == 1 || obj.status == 3) && obj.timeLeft < activeLimit) {
			  clearInterval(obj.timer);
		  }
		  decorateAuctionBox(obj);
	}, 1000);

	return obj;
}

function updateAuction(data) {
	if (typeof auctions[data.i] == 'undefined') {
		forceRefresh = true;
		return false;
	}
	var auction = auctions[data.i];
	
	// Update data
	auction.timeLeft = data.t;
	auction.auctionTime = data.t2;
	auction.status = (typeof data.s != 'undefined') ? data.s : auction.status;
	auction.price = (typeof data.r != 'undefined') ? data.r : auction.price;
	auction.canBid = (data.canBid == 1) ? true : false;
	auction.winner = (typeof data.w != 'undefined') ? data.w : false;
	auction.bidsPlaced = (typeof data.x != 'undefined') ? data.x : 0;
	auction.message = (typeof data.m != 'undefined') ? data.m : '';
	auction.isWinner = (typeof data.me != 'undefined' && data.me == 1) ? true : false;
	auction.noNewBidders = (typeof data.noNewBidders != 'undefined' && data.noNewBidders == 1) ? true : false;
	auction.userRibbon = (typeof data.userRibbon != 'undefined') ? data.userRibbon : false;

	decorateAuctionBox(auction);
}

function decorateAuctionBox(auction) {	
	var dom = auction.dom,
		timerMessage = secsToString(auction.timeLeft),
		tmrGfxClass = dom.timer.siblings('.tmrGfx');

	var animateTime = $('#time_' + auction.id + ', #username_' + auction.id + ', #price_' + auction.id).removeAttr('style');
	
	dom.price.html('$' + auction.price);

	if (auction.winner) {
		dom.winner.html(auction.winner).addClass('normalText');
	}
	
	function setTimerClass(timer, className) {
		switch (className) {
			case 'hurry':
				timer.addClass('timer-hurry').removeClass('timer-basic').removeClass('timer-hurry2');
				break;				

			case 'hurry2':
				timer.addClass('timer-hurry2').removeClass('timer-basic').removeClass('timer-hurry');
				break;				
				
			case 'basic':
			default:
				timer.addClass('timer-basic').removeClass('timer-hurry').removeClass('timer-hurry2');
				break;				
		}
	}
	
	// Live auction
	if (auction.status == 1) {
		dom.timer.removeClass('normalText comingDeal').parent().removeClass('noLineHeight').siblings('li.bidder').show();
		
		var hold = dom.data('holdRedcount');
		if (hold > 0) {
			dom.data('holdRedcount', hold - 1);
		} else {
			setTimerClass(dom.timer, 'basic');
		}
		
		if (auction.timeLeft <= 10) {
			setTimerClass(dom.timer, 'hurry2');
		}		
		else if (auction.timeLeft <= auction.auctionTime && auction.timeLeft > 10) {
			setTimerClass(dom.timer, 'hurry');
		}
		
		if (auction.timeLeft <= auction.auctionTime) {
			dom.bidnow.removeClass('startingSoon');
			if (!auction.winner) {
				dom.winner.html('No bids yet');
			}
		}
		else {
			dom.bidnow.addClass('startingSoon');
		}
		
		// set timer image class
		tmrGfxClass.attr("id", "tmr_" + auction.auctionTime);

		// if timer reaches zero and doesn't update to sold, show checking
		if (timerMessage == '00:00:00') {
			timerMessage = 'Checking...';
		}		
	}
	// Future
	else if (auction.status == 2) {
		timerMessage = "Opens " + auction.message + " PST";
		dom.timer.addClass("normalText");		
	}
	// Closed auction
	else if (auction.status == 3) {
		if (auction.winner) {
			timerMessage = 'Congratulations!';
			
			dom.timer.addClass('normalText').css("left", 0);
			dom.bidnow.addClass('wonButton');
			dom.addClass('sold');
		} else {
			timerMessage = 'ENDED';
			dom.timer.css("left", 0);
			tmrGfxClass.removeAttr('id');
			dom.bidbutton.html('');
		}
		setTimerClass(dom.timer, 'basic');
	}
	// Paused
	else if (auction.status == 4) {
		tmrGfxClass.removeAttr("id").hide();
		dom.timer.css("left", 0).addClass("normalText");
		timerMessage = auction.message;
	}
	
	if (auction.binPrice == false) {
		dom.binholder.html('').addClass('noBuyItNow_small');
	}
	else {
		var text;
		if (auction.bidsPlaced > 0) {
			if (auction.bidsPlaced == 1) {
				text = 'Buy it Now & Get ' + auction.bidsPlaced + ' Bid';
				text = getMessage('common.buynow.bid_button', text, auction.binPrice, auction.bidsPlaced);
			}
			else {
				text = 'Buy it Now & Get ' + auction.bidsPlaced + ' Bids';
				text = getMessage('common.buynow.bids_button', text, auction.binPrice, auction.bidsPlaced);
			}			
		}
		else {
			if ($('.myDashboard').length == 0) {
				text = 'Buy at store & get bids back!';
			}
			else {
				text = 'Buy from store at $' + auction.binPrice;				
			}
			text = getMessage('common.buynow.button', text, auction.binPrice);
		}
		dom.binholder.html('<a href="#">' + text + '</a>');
	}
	
	if (auction.isWinner == true && dom.bidnow.hasClass('winningBidderSmall') == false) {
		dom.bidnow.addClass('winningBidderSmall');
	}
	else if (auction.isWinner == false && dom.bidnow.hasClass('winningBidderSmall') == true) {
		dom.bidnow.removeClass('winningBidderSmall');
	}
	
	if (auction.canBid == true && dom.bidnow.hasClass('bidNotAllowed') == true) {
		dom.bidnow.removeClass('bidNotAllowed');
	}
	else if (auction.canBid == false && dom.bidnow.hasClass('bidNotAllowed') == false) {
		dom.bidnow.addClass('bidNotAllowed');
	}
	
	if (auction.noNewBidders == true) {
		$('#no_jumper_stripe_' + auction.id).show();
	}

	if (auction.oldPrice != auction.price) {
		animateTime.css({ 'background-color': false });
		if (typeof disableFlashes[auction.id] == 'undefined') {
			animateTime.each(function() {
				var xthis = this;
				$(xthis).css({ 'background-color': false } ).switchClass('bidTimer', 'bidTimerFlash', 220, function() {
					$(xthis).css({ 'background-color': false } ).switchClass('bidTimerFlash', 'bidTimer', 220, function() {
						$(xthis).css({ 'background-color': false } ).removeClass('bidTimerFlash').addClass('bidTimer');
					});
				});
			});
//			animateTime.animate({ 'backgroundColor': color }, 220, function() {
//				animateTime.animate({ 'backgroundColor': '#0d0d0d' }, 220);
//			});			
		}
		else {
			delete disableFlashes[auction.id];
		}
		auction.oldPrice = auction.price;
	}
		
	dom.attr('rel', auction.timeLeft);
	dom.timer.html(timerMessage).removeClass('small_red ended_blue');
}

function updateAuctions() {
	var idList = [],
		params = [];
	
	// Allow only single update call at a time
	if (isPolling == true) {
		return false;
	}
	isPolling = true;
	  
	// Compile list of active timers
	for (var idx in auctions) {
		var auction = auctions[idx];
		// Fetch all on first run, otherwise update only currently running auctions when user recently scrolled or when they are visible in viewport
		if (firstRun == true || (auction.status != 3 && auction.timeLeft < activeLimit && $('DIV#auction_'+auction.id+':in-viewport').length)) {
			idList.push(auction.id);
		}
	}
	
	// Compile params
	if (idList.length > 0) {
		params.push('idlist='+idList.join(','));
	}
	if (mainAuctionId && mainAuctionSold == false) {
		params.push('auctionDetailsIds='+mainAuctionId);
	}
	
	// Nothing to update?
	if (params.length == 0) {
		//clearInterval(auctionPoller);
		isPolling = false;
		return false;
	}
	
	// Lets calculate an intersection of new IDs versus old, so we can disable flashes for a better experience
	disableFlashes = {};
	for (var i in idList) {
		var found = false;
		for (var j in oldIdList) {
			if (idList[i] == oldIdList[j]) {
				found = true;
				break;
			}
		}
		if (!found) {
			disableFlashes[idList[i]] = true;
		}
	}
	oldIdList = idList;
	
	// Query server
	$.ajax({
		  url: 'gonzales.php?' + params.join('&'),
		  dataType: 'json',
		  timeout: 8000,
		  error: function() {
			  isPolling = false;
		  },
		  success: function(data) {
			  isPolling = false;
			  
			  if (data == null) {
				  return false;
			  }
			  
			  // Handle main auction
			  if (data.auctionsDetails && data.auctionsDetails.length > 0) {
				  updateMainBox(data.auctionsDetails[0]);				  
			  }
			  
			  // Handle other auctions
			  if (data.auctions && data.auctions.length > 0) {
				  for (var idx in data.auctions) {
					  updateAuction(data.auctions[idx]);					  
				  }
			  }
			  
			  // Other stuff
			  if (typeof(data.p.bc) != "undefined") {
				  $(".loginCredits").html("Bids left: " + data.p.bc);
			  }
			  if (typeof(data.p.highest) != "undefined") {
				  highestBidder(data.p.highest);
			  }
		  }
	});

	firstRun = false;
	
	if (forceRefresh == true) {
		forceRefresh = false;
		initPolling();
	} 
}

function initPolling() {
	clearInterval(auctionPoller);
	for (var id in auctions) {
		var auction = auctions[id];
		clearInterval(auction.timer);
	}
	auctions = {};
	firstRun = true;
	isPolling = false;

	// Scan for auction boxes
	$('.product').each(function() {
		var auction_id = this.id.split('_').pop();
		auctions[auction_id] = initAuction(auction_id, $(this));
	});
	
	// Check for main auction
	mainAuctionId = $("#auctionid").length == 1 ? $("#auctionid").attr("data-id") : false;
	auctionPoller = setInterval(updateAuctions, 1000);
	updateAuctions();
	
	var catPagingContainer = $(".category_paging");
	if (catPagingContainer.length > 0) {
		var $paginationContent = $("#auction_container").find(".pagination");
		var $paginationHtml = '';
		if ($paginationContent.length > 0) {
			$paginationHtml = $paginationContent.html();
		}

		catPagingContainer.html('<div class="pagination">' + $paginationHtml + '</div>');
		catPagingContainer.find(".frontpageAllAuctions").remove();
	}	
}

var clickCheck = {},
	clickCheckTimeLimit = 0.25;

function setClickCacheTime(auctid) {
	var date = new Date();
	clickCheck[auctid] = date.getTime() / 1000;
}

$(".bidlink").live("click", function(event) {
	event.preventDefault();
	var $this = $(this);
	var auctid = $this.attr("id").replace("bidnow_", "");
	
	// check for multiple clicks
	if (typeof(clickCheck[auctid]) != "undefined") {
		var date = new Date();
		if (clickCheck[auctid] >= ((date.getTime() / 1000) - clickCheckTimeLimit)) {
			return false;
		}
	}

	setClickCacheTime(auctid);

	$.get("auction.php?action=ajax_business&auction_id=" + auctid, function(response) {
		var ok;
		
		var limit = $('div#page span.no_jumper_tag_battle').attr('data-limit');
		if (typeof limit == 'undefined') limit = $('div#auction_'+auctid+' span.no_jumper_flag').attr('data-limit');
		if (typeof limit == 'undefined') limit = '5.00';
		
		if (response == -1) {
			ok = 0;
			if ($this.hasClass('bidJoin')) {
				regForm = $('a[name="cta-form"]').get(0);
				if (regForm != null) {
					if ($this.hasClass('binPage')) {
						$('#choosePath_register').click();
						$("#path_buyItNow").hide();
						$("#path_register").show();
					}
					regForm.scrollIntoView(true);
				}
				footer('<b>You need to create an account first!</b><br />Join today for free and start saving money on auctions.', 'joinPage');
			}
			else {
				frontpageLoginBox();
			}
			return true;
		}
		if (response == 1 || response == 4) {
			var message = '<h1>Buy Bids before you can Bid!</h1>' +
				'<h2>Here\'s how it works:</h2>' +
					'1. Each Bid raises the auction price by $0.01<br />' +
					'2. The auction clock restarts from a maximum of 30 seconds with every Bid.<br />' +
					'3. If no new Bids are placed before the clock runs out, the last bidder wins.<br />' +
					'4. Each bid costs 60¢. This small fee makes the massive 95% off savings possible!<br />' +
				'<br />' +
				'<a href="buybids.php">Click here to buy Bids and start saving money!</a>';
			ok = 0;
		}
		if (response == 5) {
			$.ajax({
				url: "checkRegDate.php",
				success: function(res) {
				var message = '<h1>Not so fast rock star!</h1><p>You have reached your weekly winning limit for items worth less than $200.<br />' + 
					'Your winning limit will be reset next <b>' + res + '</b>.<br /><a href="#" class="closeColorbox ui_btn_big ui_btn_big_narrow_green nicebox right">Sure thing!</a></p>';
					colorbox(message);
				}
			});
		}
		if (response == 900) {
			var message = '<h1>Oops!</h1><p>These auctions are reserved for users who have won fewer auctions than you.<br /><a href="#" style="margin-top: 10px;" class="closeColorbox ui_btn_big ui_btn_big_narrow_green nicebox right">OK</a></p>';
			ok = 0;
		}
		if (response == 77) {
			$.ajax({
				url: "checkRegDate.php",
				success: function(res) {
				var message = '<h1>Not so fast rock star!</h1>' +
					'<p>You have reached your weekly winning limit for items worth more than $200.<br />' + 
					'Your winning limit will be reset next <b>' + res + '</b>.<br /><a href="#" class="closeColorbox">Sure thing!</a></p>';
					colorbox(message);
				}
			});
		}

		if (response == 78) {
			$.getJSON("checkRegDate.php?new=true", function(json) {
				var message = '<h1>Not so fast rock star!</h1>' +
				'<p>You\'ve hit your monthly winning limit by winning auctions worth <b>$' + json.amount + '</b> - your limits have been decreased and will reset to normal on <b>' + json.time + '</b><br />' + 
					'<br /><a href="#" class="closeColorbox">Sure thing!</a></p>';
					colorbox(message);
				}
			);
		}

		// no stamping
		if (response == 30) {
			var offset = $this.offset();
			var errMsg = $("<div />").addClass("stampingError");
			var seconds = $("#time_" + auctid).siblings(".tmrGfx").attr("id").replace("tmr_","");
			var content = "This auction accepts bids within the last " + seconds + " seconds only.";
			errMsg.html(content).css({left:offset.left +"px", top:offset.top + "px"}).appendTo("body");
			var stampTimes = 0;
			
			var stampInterval = setInterval(function() {
				if(stampTimes >= 2) {
					errMsg.fadeOut(400, function() {
						errMsg.remove();
					});
					clearInterval(stampInterval);
					return false;
				}
				errMsg.animate({backgroundColor: "#FFA200"}, 350, function() {
					errMsg.animate({backgroundColor: "#EBE72D"}, 400, function() {
						stampTimes++;
					});
				});
			}, 800);
		}

		if (response == 31) {
			var message = '<h1>No new bidders!</h1>' +
				'<p>This is a No Jumper™ auction, where no new bidders can enter the auction after $'+limit+'.</p>' +
//				'<p><strong>During the Black Friday Sale you must enter the auction already before $3.00!</strong></p>' +
				'<p>Choose another auction to bid on, and get in on the action before $'+limit+'!</p>';
			ok = 0;
		}

		if (response == 6) {
			var message = '<h1>Oops!</h1><p>This auction is for beginners and you can not bid for it because you have won auctions before.</p>';
			ok = 0;
		}
		if (response == 9) {
			var message = '<h1>Whoaa</h1><p>This auction hasn\'t started yet, so you can\'t bid on it quite yet.</p>';
			ok = 0;
		}
		if (response == 15) {
			var message = '<h1>You power-bidder! Not so fast.. ;)</h1><p>This product can only be won once per user. Look\'s like you\'ve won this product before!</p>';
			ok = 0;
		}
		if (ok == 0) {
			colorbox(message);
		}
		else {
			if (typeof(response) != "undefined" && isNaN(response)) {
				var json = $.parseJSON(response);
				if (typeof(json.credits) != "undefined") {
					var bidLinkOffset = $this.offset();
					
					var creditOffset = loginCreditsElem.offset();
					var bidbonusInfo = $(".bidbonusInfo");
					if(bidbonusInfo.length == 0) {
						$("<li />").insertAfter(loginCreditsElem).html('<a href="#" class="bidbonusInfo" rel="' + json.credits + '">!</a>');
					} else {
						bidbonusInfo.attr("rel", json.credits);
					}
					// create element that will be moved from bidlink to credit offset
					var elem = $("<div />").appendTo("body").text("+" + json.credits).addClass("movingCredits").css({top: bidLinkOffset.top, left: bidLinkOffset.left});
					elem.animate({top: creditOffset.top, fontSize: "12px", left: (creditOffset.left + loginCreditsElem.width() - (elem.width()/2))}, 3000, function() {
						$(this).fadeOut(function() {
							$(this).remove();
						});
					});
				}
			}
		}
	});
});	

// bidding
$(".bidNow").live("click", function(event){
	event.preventDefault();
	var $this = $(this);

	var bidAuctId = $this.attr("id").replace("bidnow_", "");

	if (isNaN(bidAuctId))
	{
		bidAuctId = mainAuctionId;
	}

	// clear session timeout
//	clearTimeout(sessionTimeout);
//	autorefresh();

	$.get("auction.php?action=ajax_business&auction_id=" + bidAuctId, function(response) {
		var ok;
		response = parseInt(response);
		
		var limit = $('div#page span.no_jumper_tag_battle').attr('data-limit');
		if (typeof limit == 'undefined') limit = $('div#auction_'+bidAuctId+' span.no_jumper_flag').attr('data-limit');
		if (typeof limit == 'undefined') limit = '5.00';
		
		switch (response) {
			case 1:
			case 4:
				var message = '<h1>Buy Bids before you can Bid!</h1>' +
					'<h2>Here\'s how it works:</h2>' +
					'1. Each Bid raises the auction price by $0.01<br />' +
					'2. The auction clock restarts from a maximum of 30 seconds with every Bid.<br />' +
					'3. If no new Bids are placed before the clock runs out, the last bidder wins.<br />' +
					'4. Each bid costs 60¢. This small fee makes the massive 95% off savings possible!<br />' +
					'<br />' +
					'<a href="buybids.php">Click here to buy Bids and start saving money!</a>';
				ok = 0;
			break;
			case 5:
			case 77:
				ok = false;
				var moreless = "less";
				if(response == 77) {
					moreless = "more";
				}
				$.ajax({
					url: "checkRegDate.php",
					success: function(res) {
					var message = '<h1>Not so fast rock star!</h1><p>You have reached your weekly winning limit for items worth ' + moreless + ' than $200.<br />' + 
						'Your winning limit will be reset next <b>' + res + '</b>.<br /><a href="#" class="closeColorbox">Sure thing!</a></p>';
						colorbox(message);
					}
				});
			break;

			case 78:
				ok = false;
				$.getJSON("checkRegDate.php?new=true", function(json) {
					var message = '<h1>Not so fast rock star!</h1>' +
					'<p>You\'ve hit your monthly winning limit by winning auctions worth <b>$' + json.amount + '</b> - your limits have been decreased and will reset to normal on <b>' + json.time + '</b><br />' + 
					'<br /><a href="#" class="closeColorbox">Sure thing!</a></p>';
					colorbox(message);
				});
			break;
			
			case 6:
				var message = "<h1>Oops!</h1><p>This auction is for beginners and you can not bid for it because you have won auctions before.</p>";
				ok = 0;
			break;
			case 9:
				var message = '<h1>Whoaa</h1><p>This auction hasn\'t started yet, so you can\'t bid on it quite yet.</p>';
				ok = 0;
			break;
			case 15:
				var message = '<h1>You power-bidder! Not so fast.. ;)</h1><p>This product can only be won once per user. Look\'s like you\'ve won this product before!</p>';
				ok = 0;
			break;

			// no stamping
			case 30:
				ok = false;
				var offset = $this.offset(), errMsg = $("<div />").addClass("stampingError" + (!$this.hasClass("bidlink") ? "BattlePage" : ""));
				var seconds = $(".productPageTmrGfx").attr("id").replace("tmr_",""),
//				var seconds = $(".tmrDuration ").attr("rel"),
					stampTimes = 0,
					content = "This auction accepts bids within the last " + seconds + " seconds only.";
				errMsg.html(content).css({left:offset.left +"px", top:offset.top + "px"}).appendTo("body");
				
				var stampInterval = setInterval(function() {
					if(stampTimes >= 2) {
						errMsg.fadeOut(400, function() {
							errMsg.remove();
						});
						clearInterval(stampInterval);
						return false;
					}
					errMsg.animate({backgroundColor: "#FFA200"}, 350, function() {
						errMsg.animate({backgroundColor: "#EBE72D"}, 400, function() {
							stampTimes++;
						});
					});
				}, 800);
			break;

			case 31:
				var message = '<h1>No new bidders!</h1>' +
					'<p>This is a No Jumper auction, where no new bidders can enter the auction after $'+limit+'.</p>' +
//					'<p><strong>During the Black Friday Sale you must enter the auction already before $3.00!</strong></p>' +
				'<p>Choose another auction to bid on, and get in on the action before $'+limit+'!</p>';
				ok = 0;
			break;
		}
		
		if (ab && ab[1] == 1) {
			$('#auction_' + bidAuctId + ' a.bookmark.addBookmark').click();
		}
		
		// break here if no ok message
		if(ok === false) {
			return true;
		}
		
		if(ok == 0) {
			colorbox(message);
		} else {
			if(typeof(response) != "undefined" && isNaN(response)) {
				var json = $.parseJSON(response);
				if(json != null && typeof(json.credits) != "undefined") {
					var bidLinkOffset = $this.offset(), creditOffset = $loginCredits.offset(), bidbonusInfo = $(".bidbonusInfo");
					if(bidbonusInfo.length == 0) {
						$("<li />").insertAfter($loginCredits).html('<a href="#" class="bidbonusInfo" rel="' + json.credits + '">!</a>');
					} else {
						bidbonusInfo.attr("rel", json.credits);
					}
					// create element that will be moved from bidlink to credit offset
					var elem = $("<div />").appendTo("body").text("+" + json.credits).addClass("movingCredits").css({top: bidLinkOffset.top, left: bidLinkOffset.left});
					elem.animate({top: creditOffset.top, fontSize: "12px", left: (creditOffset.left + $loginCredits.width() - (elem.width()/2))}, 3000, function() {
						$(this).fadeOut(function() {
							$(this).remove();
						});
					});
				}
			}
		}
	});
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

function frontpageLoginBox() {
	var loginFormAction = $('div#loginContent form#login').attr('action');
	if(!loginFormAction) {
		loginFormAction = 'https://www.dealdash.com/login_user.php?login=1';
	}
	var html = '<div class="popuplogin">'+
	'<form name="loginfrm" method="post" action="'+loginFormAction+'">'+
	 '<ul>'+
	 '<li><b>Username</b><br /><input type="text" name="u" class="textInput f1" value="" /></li>'+
	 '<li><b>Password</b><br /><input type="password" name="p" class="textInput f2" value="" /></li>'+
	 '<li class="btn"><button type="submit" class="ui_btn ui_btn_small_narrow_gold">Log in</button></li>'+
	 '<li><a href="join.php" class="l">Don\'t have an account? Click here to create an account!</a></li>'+
	 '<li><a href="forgotpassword.php">Forgot your password?</a></li>'+
	 '</ul></form>'+
	 '</div>';

	 colorbox(html);
}

function colorbox(msg, onCloseRun) {
	onCloseRun = typeof onCloseRun == 'function' ? onCloseRun : false;
	var message = '<body><div id="popupContent" class="big">' + msg + '<div class="clear">&nbsp;</div></div>';
	$.fn.colorbox({html: message, onClosed: onCloseRun, maxWidth: '1000px' });
}

$(".selectpage").live("click", function(event) {
	goToPage($(this).attr("id").replace("pageindex_", ""));

	setTimeout(function() {
		$(window).scrollTop($("#auction_container").offset().top);
	}, 600);
	
	event.preventDefault();
});

var pageLoading = false;
function goToPage(index) {
	if (pageLoading == true) {
		return false;
	}
	pageLoading = true;
	
	setLocationHash("do=home&page=" + index);
	
	$("#auction_container").load("ajax_get_page.php?page=" + index, function() {
		pageLoading = false;
		initPolling();
	});
}

function setLocationHash(hash) {
	window.location.hash = hash;
}

$(document).ready(function() {
	initPolling();
		
	var locationHash = $.trim(window.location.hash);
	if (locationHash.length > 0) {
		openContent(locationHash);
	}
	
	function openContent(hash) {
		hash = hash.replace("#","");
		var parts = hash.split("&");
		var service = parts[0].replace("do=","");
		
		if(service != "q" && service != "cat" && service != "home" && service != "new") {
			return false;
		}

		if (service != "home") {
			var query = parts[1].replace("q=","");
			var page = Number(parts[2].replace("page=",""));
		}
		else {
			var page = Number(parts[1].replace("page=",""));
		}
		
		if (isNaN(page)) {
			page = 0;
		}

		if (service == "q") {
			$(".searchText").val(query);
		}
		if (service == "cat") {
			$("#categoryMenu .first").text($("#catid_" + query).text());
		}
		if (service == "new") {
			$("#categoryMenu .first").text($("#newProducts").text());
		}
		
		// if not calling home
		if (service != "home") {
			var url = 'search.php?' + service + '=' + query + '&page=' + page;
			loadSearchContent(url);
		}
		else {
			goToPage(page);
		}
	}

	// load content to page
	function loadSearchContent(url) {
		url = url.replace("#","");
		$.get(url, function(data) {
			data = $.trim(data);
			if(data.length == 0 || data == "<div id=\"searchResults\"><p>Your search returned no results.</p></div>") {
				colorbox("<h1>Oops!</h1><p>Unfortunately we didn\'t find anything :/</p><a href=\"#\" class=\"closeColorbox\">Ok, no problems!</a>");
				return false;
			}
			
			appendResults(data);
		});
	}

	function appendResults(data) {
		var $container = $("#auction_container");
		
		data += '<div class="clear"></div><p class="frontpageAllAuctions"><a href="#" id="backToFrontpage">Show all auctions</a></p>';
		$container.html(data);

		initPolling();
	}
	
	function showAllAuctions() {
		setLocationHash("");
		goToPage(0);
		jumpToContainer();
	}

	$("#backToFrontpage").live("click", function(event) {
		event.preventDefault();
		$(".searchText").val("");
		showAllAuctions();
	});
	
	function jumpToContainer() {
		setTimeout(function() {
			$(window).scrollTop($("#auction_container").offset().top);
		}, 600);
	}
	
	// search result paging
	$(".sPaging").live("click", function(event) {
		event.preventDefault();
		var $this = $(this), url = $this.attr("href");
		var file = url.replace("search.php?","");
		var parts = file.split("&"), part = parts[0].split("=");
		var service = part[0], query = part[1];
		var page = Number(parts[1].replace("page=",""));
		if (isNaN(page)) {
			page = 0;
		}
		setLocationHash("do=" + service + "&q=" + query + "&page=" + page);
		loadSearchContent(url);
		jumpToContainer();
	});

	$("#categoryMenu a").live("click", function(event) {
		event.preventDefault();
		var $this = $(this);
		
		if($this.hasClass("first")) {
			return false;
		}
		
		$("#categoryMenu .first").text($this.text());
		if($this.hasClass("last")) {
			showAllAuctions();
			return false;
		}
		
		var $id = $this.attr("id");
		if($id == "newProducts") {
			setLocationHash("do=new&new=1&page=0");
			loadSearchContent("search.php?new=1");
			return true;
		}
		var query = $id.replace("catid_","");
		setLocationHash("do=cat&q=" + query + "&page=0");
		loadSearchContent("search.php?cat=" + query);
	});

	$("#itemSearchForm form").submit(function(event) {
		event.preventDefault();
		var value = $.trim($(".searchText").val());
		if (value.length == 0) {
			return false;
		}

		setLocationHash("do=q&q=" + value + "&page=0");
		loadSearchContent("search.php?q=" + value);
		return false;
	});

	var sessionTimeout, _mx, _my;
	function autorefresh() {
		/*
		sessionTimeout = setTimeout(function() {
			clearInterval(auctionPoller);
			colorbox('<h1>Are you still there?</h1><p>We noticed that you haven\'t done anything for a while, are you still there?</p><p><a href="#" class="closeColorbox ui_btn_big ui_btn_big_narrow_green nicebox right">Yes I am!</a></p>', function() {
				initPolling();				
			});
		}, 60000*10);
		*/
	}
	
	$(document).mousemove(function(event) {
		if (_mx != event.pageX || _my != event.pageY) {
			_mx = event.pageX;
			_my = event.pageY;
			clearTimeout(sessionTimeout);
			autorefresh();
		}
	});
	
	autorefresh();
});

var hideTmr = false,
	tmrShown = false,
	tmrElement,
	$binTimer,
	$mainParent,
	check = {},
	infoCards = {},
	lastWinner,
	aboutLast,
	aboutMe = {},
	aboutmeObj,
	bidderbio = {},
	abouts,
	$loginCredits,
	$input,
	$status,
	$box,
	$errors,
	$list = [],
	skip,
	bidbuddyActive = false,
	lastLength = 0,
	submitted,
	$newbinbutton;

$(document).ready(function() {
	tmrElement = $(".productPageTmrGfx");
	$binTimer = $("#timeleftTimer");
	$mainParent = $(".auctionDataContainer");
	aboutmeObj = $(".aboutme");
	abouts = $(".abouts");
	$loginCredits = $(".loginCredits");
	$input = $(".bidbuddybidbox");
	$status = $(".bidbuddyStatus");
	$box = $(".newbbbox");
	$errors = $(".bidbuddyErrors");
	$newbinbutton = $(".newBuyitnowButton");

	function bookBidbuddy(bids, animate) {

		if(bids <= 0) {
			$errors.html("The BidBuddy was not booked.<br />Please check your bid amount and try again.");
			submitted = false;
			return false;
		}
		if(bids == "" || bids <= 0 || parseInt(bids) == 0) {
			$errors.html("Please add proper amount of bids.");
			submitted = false;
			return false;
		}
		if(isNaN(bids)) {
			$errors.html("Please, only numbers");
			submitted = false;
			return false;
		}
		
		bids = Number(bids);

		if(animate === true) {
			var moreBidsContainer = $(".bidbuddyMorebids");
			moreBidsContainer.hide();
			moreBidsContainer.parent(".left").append('<span class="bbloading"><img src="https://s3.amazonaws.com/dd-static-cdn/new_layout/images/fbload.gif" /> loading..</span>');
		}
		
		$.get("auction.php?action=ajax_book_bid_butler&auction_id=" + mainAuctionId + "&auction_bid_count=" + bids, function(data) {

			if(animate === true) {
				moreBidsContainer.show();
				$(".bbloading").remove();
			}
			submitted = false;
			var bookOk = false, result = parseInt(data), stillShowError = false;
			if(result == 1) {
				bookOk = true;
			} else {
				var error;
				var showPopup = popupMessage = false;
				switch (result) {
					default:
					case 7:
						error = "Your request was not completed. Please try again.";
						break;
					case 107:
						error = "<h2>Auction has ended</h2>Unfortunately this auction has already ended";
						break;
					case 117:
						error = "This auction was not found.";
						break;
					case 2007:
						error = "<h2>BidBuddy disabled on this auction</h2>Unfortunately it seems that the BidBuddy functionality has been disabled from this auction.";
						break;
					case 457:
						error = "Please add proper amount of bids.";
						break;
					case 907:
						error = "These auctions are reserved for users who have won fewer auctions than you.";
						break;
					case 997:
						error = "Unfortunately we were unable to book this bidbuddy for you.";
						break;
					case 2:
					case 27:
						error = "<h2>Oh no! Out of bids!</h2>It seems that you don't have bids left. <a href=\"buybids.php\">Click here</a> to buy more.";
						break;
					case 807:
						error = "<p>You do not have that many Bids.<br />Please check your bid amount and try again.</p>";
						break;
					case 157:
						error = "<h2>You power-bidder! Not so fast.. ;)</h2><p>You may only attempt to win this product once!</p>";
						break;
					case 12:
						error = "You have already used Buy it Now for this auction. You are no longer able to participate.";
						break;
					case 600:
					case 607:
						error = "You already have a BidBuddy booked on this auction.";
						break;
					case 317:
						showPopup = true;

						error = "";

						var popupMessage = '<h1>No new bidders!</h1>' +
							'<p>This is a No Jumper™ auction, where no new bidders can enter the auction after $5.00.</p>' +
							'<p><strong>During the Black Friday Sale you must enter the auction already before $3.00!</strong></p>' +
							'<p>Choose another auction to bid on, and get in on the action before $5.00!</p>';
							
						ok = 0;

						break;
					case 771:
						bookOk = true;
						stillShowError = true;
					case 777:
						error = 'You can\'t book that many Bids at a time<br />in this special auction!';
						break;
				}
				$errors.html(error);
				if (showPopup == true && popupMessage != false)
				{
					colorbox(popupMessage);
				}
			}

			if(bookOk === true) {
				skip = true;
				if (stillShowError == false) {
					$errors.html("");
				}
				$("input[name=bidbuddyMorebids]").val("");
				activateNewBidbuddyBox(bids);
			}
		});
	}
	
	// add more bids to an active bidbuddy
	$("#bidbuddyAddMoreBids").submit(function(event) {
		event.preventDefault();
		var bids = $("input[name=bidbuddyMorebids]").val();
		bookBidbuddy(bids, true);
	});
	
	// bidbuddy
	$("#newbidbuddy").submit(function(event) {
		event.preventDefault();
		var $this = $(this);

		if(submitted == true) {
			return false;
		}
		
		submitted = true;
		$errors.html("");

		if($(".bidbuddyButton").hasClass("bidbuddySubmit")) {
			var bids = $input.val();
			bookBidbuddy(bids);
		}
	});
	
	// bidbuddy cancelling
	$(".bidbuddyCancel").live("click", function(event) {
		event.preventDefault();
		$.get("auction.php?action=ajax_cancel_bid_butler&auction_id=" + mainAuctionId, function(data) {
			submitted = false;
			var cancelOk = false;
			if(parseInt(data) == 1) {
				cancelOk = true;
			}
			
			if(cancelOk) {
				skip = true;
				deactivateNewBidbuddyBox();
			}
		});
	});
	
	var bidbuddyCheckInterval = setInterval(function() {
		if(skip === true) {
			skip = false;
			return false;
		}
		var bidValue = $(".ab_left").html();
		if(bidValue != null && bidValue != "") {
			var bidsLeft = parseInt(bidValue);
			if(bidsLeft != 0) {
				activateNewBidbuddyBox(bidsLeft);
			} else {
				deactivateNewBidbuddyBox();
			}
		}
	}, 500);

	function deactivateNewBidbuddyBox() {
		if(bidbuddyActive === false) {
			return false;
		}
		bidbuddyActive = false;
		$box.removeClass("newbidbuddy2").addClass("newbidbuddy");
		$input.show().val("");
		$status.html("").hide();
		$(".bidbuddyCancel").addClass("bidbuddySubmit").removeClass("bidbuddyCancel");
		$(".addbids").hide();
	}
	function activateNewBidbuddyBox(bids) {
		if(bidbuddyActive === true) {
			return false;
		}
		bidbuddyActive = true;
		$box.addClass("newbidbuddy2").removeClass("newbidbuddy");
		$input.hide();
		$status.html("<span class=\"ab_left\">" + bids + "</span> " + (bids == 1 ? "Bid" : "Bids") + " left").show();
		$(".bidbuddyButton").addClass("bidbuddyCancel").removeClass("bidbuddySubmit");
		$(".addbids").show();
	}
	
	// bidder bio
	$(".shoutpic").livequery(function() {
		var $this = $(this);
		$this.tipsy({gravity: "s", html:true, title: function() {
			var usernameExtra = $this.attr('data-username-extra');
			if (usernameExtra == null || usernameExtra == "undefined")
			{
				usernameExtra = '';
			}
			return "<center><b>" + $this.attr("data-username") + "</b>" + usernameExtra + "<br />" + $this.attr("data-content") + "</center>";
		}});
	});
	
	function resizeImages() {
		var shoutpics = $(".shoutpic"), length = shoutpics.length;
		
		// if last length is bigger or same size as the current, dont animate
		if(lastLength >= length) {
			return false;
		}

		lastLength = length;
		var container = $(".comments"), containerWidth = container.width(), containerHeight = container.height();
		var minWidth = 33, minHeight = 36, originalWidth = 41, originalHeight = 49;
		
		if(length > 24) {
			var newWidth = (originalWidth - (length - 24)), newHeight = (originalHeight - (length - 24));
			
			// if width/height is less than min values, force min values
			if(newWidth < minWidth) {
				newWidth = minWidth;
			}
			if(newHeight < minHeight) {
				newHeight = minHeight;
			}

			shoutpics.children("span").css("top", (newHeight - 16) + "px");
			shoutpics.css({width: newWidth + "px", height: newHeight + "px"});
		}
	}

	var resizeInterval = setInterval(function() {
		resizeImages();
	},1000);
	
	// load three auction boxes to the right side
	$("#battle_auctionwindow").load("ajax_get_page.php?battle=1&auctionid=" + mainAuctionId, function() {
		loadAuctionBoxes();
	});
	
	// get auctionid's for auction boxes on the side
	function loadAuctionBoxes() {
		if ($list.length > 0) {
			return $list;
		}
		$(".product").each(function(){
			$list.push($(this).attr("id").replace("auction_",""));
		});
		
		initPolling();
		
		// first loop returns false
		return false;
	}
	
	// navigation
	$("#prevnext a:not(.inactive)").tipsy({gravity: "s"});
	
	// bid buddy disabled message & one per user
	$(".nobidbuddyInfo, .productPageOnePerUser").tipsy({gravity: "n"}).live("click", function(event) { event.preventDefault(); });	
});

// update main content
function updateMainBox(json) {
	// DISGUSTING!
	var auctionData = json.data.split("<>");
	var status = auctionData[1], time = auctionData[5];

	// if timer reaches zero and doesn't update to sold, show checking
	if(time == '00:00:00') {
		time = 'Checking...';
	}
	
	// super bowl
	if(typeof json.bowl != "undefined") {
		var team = (json.bowl == 1 ? "patriots" : "giants");
		$(".winningBowl").removeClass("patriots giants").addClass(team).show();
	} else {
		$(".winningBowl").hide();
	}



	if(status == 3) {
		hideTmr = true;
		time = "Congratulations!";
		mainAuctionSold = true;
		if(json.winnerisme == true) {
			// refresh user data
			$.getJSON("ajax_about_me.php?username=" + auctionData[4] + "&won_auction=1", function(json) {});

			colorbox('<h1>Congratulations!</h1><p>If you want to pay for your win immediately, <a href="choose_product.php?auctionid=' + mainAuctionId + '">click here</a> or <a href="#" class="closeColorbox">pay later</a>');
		}
		
		// hide bidbuddy box
		$(".newbidbuddy2").hide();
	}

	// timer icon
	if(tmrShown === false) {
		var tmrParent = tmrElement.parent(".left");
	}

	if(hideTmr === false) {
		if(typeof(json.left != "undefined")) {
			// if more than 12h left to start, hide timer icon
			if(json.left > 43200) {
				hideTmr = true;
			}
		}

		if(tmrShown === false) {
			var tmpParentClass = tmrParent.siblings(".tmpTMR");
			if(tmpParentClass.length > 0) {
				tmpParentClass.removeClass("tmpTMR").addClass(".left");
				tmrParent.show();
			}
			tmrShown = true;
		}
		tmrElement.attr("id", "tmr_" + json.timer);
	} else {
		if(tmrShown === false) {
			tmrParent.siblings(".left").removeClass("left").addClass("tmpTMR");
			tmrParent.hide();
		}
	}

	var canBid = json.canBid;
	var noNewBidders = json.noNewBidders;
	var bidNowButton = $('#productpage_bidnowButton');


	if (canBid == false)
	{
		bidNowButton.addClass('bidNotAllowed');
	} else {
		bidNowButton.removeClass('bidNotAllowed');
	}

	var noBiddersStripe = $('#no_jumper_stripe_battle');

	if (noNewBidders == true)
	{
		noBiddersStripe.show();
	} else {
		noBiddersStripe.hide();
	}


	if(typeof json.balance != "undefined") {
		var balance = json.balance;

		// if user has placed bids, update bin value
		if(balance.bidded > 0) {

			if ($('#auctionControls.bidForFree2012').length > 0) {
				$newbinbutton.html("Win or Lose - Get " + balance.bidded + " " + (balance.bidded == 1 ? "Bid" : "Bids"));
			} else {
				var binMessage = "Buy it Now & Get " + balance.bidded + " " + (balance.bidded == 1 ? "Bid" : "Bids");
				binMessage = getMessage('common.buynow.long_bids_button', binMessage, balance.bnprice, balance.bidded);
				$newbinbutton.html(binMessage);
			}

		}
		
		// update bidbuddy bidcount
		$(".ab_left").html(balance.bbleft);
		
		// update user bid count
		$loginCredits.html("Bids left: " + (balance.cr + balance.free));

		if(typeof(balance.bidded) != "undefined" && balance.bidded == 0) {
			if($binTimer.length > 0) {
				$binTimer.siblings("span").html("You did not bid in this auction.");
				$binTimer.remove();
			}
		} else {
			if(balance.bntimer > 0) {
				if($binTimer.length > 0) {
					if(balance.bntimer > 0) {
						$binTimer.html(secsToString(balance.bntimer));
					} else {
						$binTimer.parent("#timeLeft").remove();
					}
				}
			}
		}
		// if non logged in user views the page
	} else {
		if($binTimer.length > 0) {
			if(json.bntimer > 0) {
				$binTimer.html(secsToString(json.bntimer));
			} else {
				$binTimer.parent("#timeLeft").remove();
			}
		}
	}

	var $timerElement = $mainParent.find("#time"), $winningBidder = $mainParent.find("#winningBidder .bidder"), $currentPrice = $mainParent.find("#productPage_bidInfo_current_price");
	
	if(typeof(json.left != "undefined")) {
		// Display orange for timers less than 30
		if (json.left <= 30 && json.left > 10) {
			$timerElement.css("color", "#FF6600");
		}

		// Display red for timers less than 10
		if (json.left <= 10) {
			$timerElement.css("color", "red");
		}
	}
	
	$timerElement.html(time);
	$winningBidder.html(auctionData[4]);
	$currentPrice.html('<strong>$' + auctionData[3] + '</strong>');
	$("#previousBids").html("");
	$.each(json.history, function(index, item){
		if(index <= 10){
			if(typeof item[4] != "undefined" && item[4] == 1) {
				flag = '<span class="promo_flag_battle_historylist ribbon_veteran notooltip"></span>';
				$('<li class="bid">$'+item[0]+'</li><li class="bidder">'+flag+'<span class="left">'+item[2]+'</span></li><li class="bidTime">'+item[1]+'</li><li class="clear"></li>').appendTo("#previousBids");
			} else {
				$('<li class="bid">$'+item[0]+'</li><li class="bidder">'+item[2]+'</li><li class="bidTime">'+item[1]+'</li><li class="clear"></li>').appendTo("#previousBids");
			}
		}
	});

	ribbon_img = $('#winningBidder .ribbon_veteran');
	if (json.winnerRibbon == 1)
	{
		ribbon_img.removeClass('hidden2');
	} else {
		ribbon_img.addClass('hidden2');
	}

	// get winner info
	if(json.history.length > 0) {
		getInfoCard(auctionData[4], mainAuctionId, 1);
		setInfoCardHtml(auctionData[4], mainAuctionId, 1);
	}
	
	// previous bids fade out
	var $previousBids = $("#previousBids li"), count = $previousBids.length;
	if(count > 0) {
		var value = 100, step = 90 / count;
		$previousBids.each(function(i){
			if(i%3 == 0){
				value = 100 - (step * i);
			}
			$(this).css("opacity", value == 100 ? "1" : "0." + parseInt(value));
		});
	}
	
	// flash price, username and timer
	if( typeof(json.history[0]) != "undefined") {
		if(typeof(timerCacheBattle) != "undefined") {

			if(timerCacheBattle != auctionData[4]) {
				var color = "#FFA200";

				$timerElement.animate({backgroundColor: color}, 220, function() {
					$timerElement.animate({backgroundColor: "#262626"}, 220);
				});
				
				$winningBidder.animate({backgroundColor: color}, 220, function() {
					$winningBidder.animate({backgroundColor: "#343434"}, 220);
				});

				$currentPrice.css("backgroundColor", "#434343");
				$currentPrice.animate({backgroundColor: color}, 220, function() {
					$currentPrice.animate({backgroundColor: "#434343"}, 220);
				});
			}
		}

		// add price to cache
		timerCacheBattle = auctionData[4];
	}
	
	return true;
}

function setInfoCardHtml(username, auctionid, priority) {
	if(auctionid == 0) {
		setTimeout(function() {
			setInfoCardHtml(username, mainAuctionId, priority);
		}, 1000);
		return false;
	}
	if(lastWinner == username) {
		return false;
	}
	if(typeof(infoCards[username]) == "undefined") {
		infoCards[username] = getInfoCard(username, mainAuctionId, priority);
	}
	var data = infoCards[username];
	if(typeof data == "undefined") {
		return false;
	}
	if(data === false) {
		setTimeout(function() {
			setInfoCardHtml(username, mainAuctionId);
		}, 1000);
		return false;
	}

	if(typeof data != "undefined") {
		if(typeof data.image  != "undefined") {
			if(data.image.length == 0) {
				$(".infocard .card_image").hide();
			} else {
				$(".infocard .card_image").html('<img src="' + data.image + '" alt="" />').show();
			}
		}
	}
	$(".infocard .card_registered").text(data.registered);
	$(".infocard .card_state").text(data.state);
	$(".infocard .card_wonDeals").text(data.wonDeals);
	
	if(data.shadow == 1) {
		$(".infocard .card_image img").addClass("imageShadow");
	} else {
		$(".infocard .card_image img").removeClass("imageShadow");
	}

	getAboutMe(username, data);
	$(".infocard").show();
	lastWinner = username;
	return true;
}

function getInfoCard(username, auctionid, priority) {
	if(typeof(check[username]) != "undefined") {
		return false;
	}
	if(auctionid == 0) {
		setTimeout(function() {
			getInfoCard(username, mainAuctionId, priority);
			if(priority == 1) {
				setInfoCardHtml(username, mainAuctionId, priority);
			}
		}, 1000);
		return false;
	}
	if(typeof(infoCards[username]) == "undefined") {
		$.getJSON("getInfoCard.php?username=" + username + "&auctionid=" + auctionid, function(json) {
			infoCards[username] = json;
			if(typeof json != "undefined") {
				if(typeof json.image != "undefined") {
					if(json.image.length > 0) {
						preloadImage(json.image);
					}
				}
			}
		});
	}
	check[username] = true;
	return infoCards[username];
}

function preloadImage(url) {
	$("<img />").load().attr("src", url);
}

function getAboutMe(username, data) {
	if(username == aboutLast) {
		return false;
	}
	aboutLast = username;
	if(typeof(aboutMe[username]) != "undefined") {
		return addAboutMe(username, aboutMe[username], data);
	}
	$.getJSON("ajax_about_me.php?username=" + username, function(json) {
		if(json.aboutme.length == 0) {
			aboutmeObj.html("");
			aboutMe[username] = "";
		} else {
			aboutMe[username] = json.aboutme;
			addAboutMe(username, json.aboutme, data);
		}
	});
}

function addAboutMe(username, content, data) {
	if(content.length == 0 || content == false || content == "false") {
		content = "";
	}
	
	aboutmeObj.html(content);
	if(typeof(bidderbio[username]) != "undefined") {
		return false;
	}
	
	var $pics = $(".shoutpic[data-username='" + username + "']");
	if($pics.length > 0) {
		return false;
	}

	bidderbio[username] = username;
	var html = '<div class="left">',bg = "",ieStyle = "",extra = "-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;";
	
	// if browser is not msie 
	if(!$.browser.msie) {
		bg = "background:url(" + data.image + ");";
	} else {
		ieStyle = "filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + data.image + "', sizingMethod='scale');";
	}
	
	html += '<div style="' + bg + ieStyle + extra + '" class="shoutpic" data-username="' + username + '" data-content="' + content + '"></div></div>';
	abouts.append(html);
	
	return true;
}

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
	
	// Sanity check
	if(h > 1000 || h < -10) {
		return '<span style="font-size: 15px;">Checking time..</span>';
	}
	
	return h + ":" + m + ":" + s;
}	

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($){$.belowthefold=function(element,settings){var fold=$(window).height()+$(window).scrollTop();return fold<=$(element).offset().top-settings.threshold;};$.abovethetop=function(element,settings){var top=$(window).scrollTop();return top>=$(element).offset().top+$(element).height()-settings.threshold;};$.rightofscreen=function(element,settings){var fold=$(window).width()+$(window).scrollLeft();return fold<=$(element).offset().left-settings.threshold;};$.leftofscreen=function(element,settings){var left=$(window).scrollLeft();return left>=$(element).offset().left+$(element).width()-settings.threshold;};$.inviewport=function(element,settings){return!$.rightofscreen(element,settings)&&!$.leftofscreen(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings);};$.extend($.expr[':'],{"below-the-fold":function(a,i,m){return $.belowthefold(a,{threshold:0});},"above-the-top":function(a,i,m){return $.abovethetop(a,{threshold:0});},"left-of-screen":function(a,i,m){return $.leftofscreen(a,{threshold:0});},"right-of-screen":function(a,i,m){return $.rightofscreen(a,{threshold:0});},"in-viewport":function(a,i,m){return $.inviewport(a,{threshold:0});}});})(jQuery);