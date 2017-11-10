(function($, window, document, undefined) {
//	var hookuri = 'http://api.medlive.cn/bdshare/add_bdshare_log.php';	//回调log请求url
	var hookuri = 'http://www.medlive.cn/webapi/bdshare/add_bdshare_log.php';	//回调log请求url
	
    $.dbShare = function(obj) {
    	if(obj.hookuri) {
    		hookuri = obj.hookuri;
    	}
    	obj.desc = obj.desc || '';																//分享摘要
    	obj.text = obj.text || '医脉通 - 感知世界医学脉搏，助力中国临床决策： 疾病诊疗知识库，医学信息服务，医生在线交流平台';	//分享内容
    	obj.pic = obj.pic || 'http://webres.medlive.cn/index/logo.jpg';							//分享图片地址
    	obj.url = obj.url || 'http://www.medlive.cn';											//分享页的url地址

    	obj.resources_type = obj.resources_type || '';	//资源类型
    	obj.resources_id = obj.resources_id || 0;		//资源id
    	obj.userid = obj.userid || '';					//用户id
    	obj.cnt_show = obj.cnt_show || 'N';				//分享数量显示标记
    	if(obj.cnt_show == 'N') {
    		$('.bds_count').hide();
    	} else {
    		$('.bds_count').show();
    	}
    	
		if(obj.slide == true) {
			window._bd_share_config = {
				"common":{
//					"bdSnsKey":{"tsina":"sina_AppKey","tqq":"tencent_AppKey","t163":"163_AppKey","tsohu":"sohu_AppKey"},
					"bdSnsKey":{},
					"bdDesc":obj.desc,
					"bdText":obj.text,
					"bdUrl":obj.url,
					"bdPic":obj.pic,
					"bdMini":"2",
					"bdMiniList":false,
					"bdStyle":"1",
					"bdSize":"16",//24
					"onBeforeClick": function(cmd, config) {
						$.sendPost(cmd, obj.userid, obj.url, obj.resources_type, obj.resources_id);
					}
				},
				"share":{
					//自定义样式
					"bdSize": 16,
					"bdCustomStyle":""	//bdshare.css
				},
				"slide":{  //侧边栏分享
					"type":"slide",
					"bdImg":"2", //0-8
					"bdPos":"right", //left
					"bdTop":"100"
				}
			}
    	} else {
    		window._bd_share_config={
				"common":{
//    				"bdSnsKey":{"tsina":"sina_AppKey","tqq":"tencent_AppKey","t163":"163_AppKey","tsohu":"sohu_AppKey"},
					"bdSnsKey":{},
					"bdDesc":obj.desc,
					"bdText":obj.text,
					"bdUrl":obj.url,
					"bdPic":obj.pic,
					"bdMini":"2",
					"bdMiniList":false,
					"bdStyle":"1",
					"bdSize":"16",//24
					"onBeforeClick": function(cmd, config) {
						$.sendPost(cmd, obj.userid, obj.url, obj.resources_type, obj.resources_id);
					}
				},
				"share":{
					//自定义样式
					"bdSize": 16,
					"bdCustomStyle":""	//bdshare.css
				}
//    			"image":{"viewList":["weixin","qzone","tsina","tqq"],"viewText":"分享到：","viewSize":"16"},
//    			"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["weixin","qzone","tsina","tqq"]}
			};
    	}
		with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
    };
    
    $.sendPost = function(type, userid, referer, resources_type, resources_id) {
    	if(!hookuri) {
    		return false;
    	}
    	$.ajax({
	        type: "post",
	        async: true,
	        data:{ "type":type, "userid":userid, "referer":referer, "resources_type":resources_type, "resources_id":resources_id },
	        url: hookuri,
	        dataType: 'json',
	        success: function (data) {
				if(data.success_msg) {
					return true;
				}
	        },
	        error: function() {
	        	return false;
	        }
	    });
    }
    
})(jQuery, window, document);