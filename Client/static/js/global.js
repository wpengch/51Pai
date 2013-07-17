// tpl

var hdTpl='<div class="p-wrap">'+
				'<div class="p-wbox">'+
					'<div class="p-grid linearize-4 header">'+
						'<div class="p-g15 p-gl logo ta2"><h1>51Pai</h1></div>'+
						'<div class="p-g85 p-gr login-status ta3">'+
							'<span>pmben</span><a href="personal">我的拍吧</a><a href="javascript:;" class="exit">退出</a>'+
						'</div>'+
						'<nav class="p-g85 p-gr linearize-4 nav">'+
							'<a class="di p-g16" href="/">首页</a><a class="di p-g16" href="auction">全部竞拍</a><a class="di p-g16" href="winners">最近成交</a><a class="di p-g16" href="integral">获得积分</a><a class="di p-g16" href="personal">个人中心</a><a class="di p-g16" href="faq">FAQ</a>'+
						'</nav>'+
					'</div>'+
				'</div>'+
			'</div>';

var ftTpl='<div class="p-wrap footer">'+
				'<div class="p-wbox">'+
					'<div class="p-grid linearize-4">'+
						'<div class="p-g62 p-gl clearfix footer-list">'+
							'<dl class="p-g25 p-gl">'+
								'<dt>新手指南</dt>'+
								'<dd><a href="###">加入我们</a></dd>'+
								'<dd><a href="###">竞拍指南</a></dd>'+
								'<dd><a href="###">支付方式</a></dd>'+
								'<dd><a href="###">常见问题</a></dd>'+
							'</dl>'+
							'<dl class="p-g25 p-gl">'+
								'<dt>支付与配送</dt>'+
								'<dd><a href="###">支付方式</a></dd>'+
								'<dd><a href="###">常见问题</a></dd>'+
							'</dl>'+
							'<dl class="p-g25 p-gl">'+
								'<dt>服务保障</dt>'+
								'<dd><a href="###">加入我们</a></dd>'+
								'<dd><a href="###">竞拍指南</a></dd>'+
								'<dd><a href="###">支付方式</a></dd>'+
								'<dd><a href="###">常见问题</a></dd>'+
								'<dd><a href="###">支付方式</a></dd>'+
								'<dd><a href="###">常见问题</a></dd>'+
							'</dl>'+
							'<dl class="p-g25 p-gl">'+
								'<dt>公平准则</dt>'+
								'<dd><a href="###">加入我们</a></dd>'+
								'<dd><a href="###">竞拍指南</a></dd>'+
								'<dd><a href="###">支付方式</a></dd>'+
								'<dd><a href="###">常见问题</a></dd>'+
							'</dl>'+
						'</div>'+
						'<div class="p-g38 p-gr">'+
							'<p>'+
								'<span>合作伙伴：</span>'+
								'<a href="###">'+
									'<img src="" alt="">'+
								'</a>'+
							'</p>'+
						'</div>'+
					'</div>'+
					'<div class="p-grid mt2 pt1 linearize-2 copyright">'+
						'<div class="p-50 p-gl">'+
							'<div class="attention-list">关注拍吧：'+
							'<a href="###" title="新浪微博"><i class="social_gray sina"></i></a>'+
							'<a href="###" title="人人网"><i class="social_gray renren"></i></a>'+
							'<a href="###" title="QQ 空间"><i class="social_gray qzone"></i></a>'+
							'<a href="###" title="腾讯微博"><i class="social_gray qqt"></i></a>'+
							'<a href="###" title="豆瓣"><i class="social_gray douban"></i></a></div>'+
						'</div>'+
						'<div class="p-50 p-gr">'+
							'@2013   51paiba.com － <a href="###">网站地图</a><br>'+
							'粤ICP备08103200号-2    经营许可证编号 粤B2-20130188'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';

$(function(){
	$('body > header').append(hdTpl);
	$('body > footer').append(ftTpl);
});
//获取当前时间戳
function getTimeStamp(){
	return Date.parse(new Date());
}



