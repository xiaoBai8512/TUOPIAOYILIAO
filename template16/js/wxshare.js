$(function() {
	var url = window.location.href;
	// 获取分享标题、摘要、图片
	var sharetitle = $("meta[name='sharetitle']").attr("content");
	var sharedes = $("meta[name='sharedesc']").attr("content");
	var sharepic = $("meta[name='sharepic']").attr("content");

	if (typeof (sharepic) == "undefined") {
		sharepic = "http://www.ncd.org.cn/skin/images/share-logo.png";
	} else {
		if (sharepic == '') {
			sharepic = "http://www.ncd.org.cn/skin/images/share-logo.png";
		}
	}
	$.ajax({
        type: "get",
        url: "http://www.ncd.org.cn/ncdcms/static/wxshare.xhtml",
        dataType: "jsonp",
        jsonp: "jsoncallback",  // 指定回调函数，这里名字可以为其他任意你喜欢的，比如callback，不过必须与下一行的GET参数一
        jsonpCallback:"success_jsonpCallback",
        data: "url="+encodeURIComponent(url)+"&jsoncallback=?", // jsonpcallback与上面的jsonp值一
        success: function (json) {
        	var param = json;
    		wx.config({
    			debug : false, // 开启调试模,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    			appId : param.appId, // 必填，公众号的唯一标识
    			timestamp : param.timestamp, // 必填，生成签名的时间
    			nonceStr : param.nonceStr, // 必填，生成签名的随机
    			signature : param.signature,// 必填，签名，见附1
    			jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage',
    					'onMenuShareQQ', 'onMenuShareWeibo','scanQRCode' ]
    		// 必填，需要使用的JS接口列表，所有JS接口列表见附��?
    		});
        }
    });
	wx.ready(function() {
		var wxData = {
			"link" : url,
			"desc" : sharedes,
			"title" : sharetitle,
			"imgUrl" : sharepic
		};

		// 错误信息
		wx.error(function(res) {

			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			if (res.errMsg == "config:invalid signature") {
				$.ajax({
			        type: "get",
			        url: "http://www.ncd.org.cn/ncdcms/static/wxshare.xhtml?type=reset&url="
						+ encodeURIComponent(url), // 这个就是不同于当前域的一个URL地址，这里单纯演示，所以同
			        dataType: "jsonp",
			        jsonp: "jsoncallback",  // 指定回调函数，这里名字可以为其他任意你喜欢的，比如callback，不过必须与下一行的GET参数一
			        jsonpCallback:"success_jsonpCallback",
			        data: "url="+encodeURIComponent(url)+"&jsoncallback=?", // jsonpcallback与上面的jsonp值一
			        success: function (json) {
			        	var param = json;
			    		wx.config({
			    			debug : false, // 开启调试模,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
			    			appId : param.appId, // 必填，公众号的唯一标识
			    			timestamp : param.timestamp, // 必填，生成签名的时间
			    			nonceStr : param.nonceStr, // 必填，生成签名的随机
			    			signature : param.signature,// 必填，签名，见附1
			    			jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage',
			    					'onMenuShareQQ', 'onMenuShareWeibo']
			    		// 必填，需要使用的JS接口列表，所有JS接口列表见附��?
			    		});
			        }
			    });
			}
		});

		// 判断当前客户端版本是否支持指定JS接口
		wx.checkJsApi({
			jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage',
					'onMenuShareQQ', 'onMenuShareWeibo' ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			success : function(res) {
				// 以键值对的形式返回，可用的api值true，不可用为false
				// 如：{"checkResult":{"onMenuShareTimeline":true},"errMsg":"checkJsApi:ok"}
				var results = res.checkResult;
				var flag = true;
				for ( var ele in results) {
					if (!results[ele]) {
						flag = false;
						break;
					}
				}

				if (!flag) {
					alert("你的微信版本太低，暂时不支持分享，请升级在分享！");
				}
			}
		});

		// 分享给朋友
		wx.onMenuShareAppMessage({
			title : wxData.title, // 分享标题
			desc : wxData.desc, // 分享描述
			link : wxData.link, // 分享链接
			imgUrl : wxData.imgUrl, // 分享图标
			type : '', // 分享类型,music、video或link，不填默认为link
			dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空
			success : function() {
				// 用户确认分享后执行的回调函数
				afterSharefn();
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});

		// 分享到QQ
		wx.onMenuShareQQ({
			title : wxData.title, // 分享标题
			desc : wxData.desc, // 分享描述
			link : wxData.link, // 分享链接
			imgUrl : wxData.imgUrl, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
				afterSharefn();
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});

		// 分享到腾讯微博
		wx.onMenuShareWeibo({
			title : wxData.title, // 分享标题
			desc : wxData.desc, // 分享描述
			link : wxData.link, // 分享链接
			imgUrl : wxData.imgUrl, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
				afterSharefn();
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});

		// 分享到朋友圈
		wx.onMenuShareTimeline({
			title : wxData.title, // 分享标题
			link : wxData.link, // 分享链接
			imgUrl : wxData.imgUrl, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
				afterSharefn();
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
	})
});
