//分享
function shareDesc(){
	var meta = document.getElementsByTagName('meta');
	var share_desc = '';
	for(i in meta){
		if(typeof meta[i].name!="undefined"&&meta[i].name.toLowerCase()=="description"){
			share_desc = meta[i].content;
		}
	}
	return share_desc;
}

var dataForWeixinShares = {
	title : function(){
		if(typeof dataForWeixinShare  != 'undefined' && typeof dataForWeixinShare .title != 'undefined'){
			return dataForWeixinShare .title
		}else{
			return document.title
		}
	}(),
	content : function(){
		if(typeof dataForWeixinShare  != 'undefined' && typeof dataForWeixinShare .content != 'undefined'){
			return dataForWeixinShare .content
		}else{
			return shareDesc()
		}
	}(),
	imgurl : function(){
		if(typeof dataForWeixinShare  != 'undefined' && typeof dataForWeixinShare .imgurl != 'undefined'){
			return dataForWeixinShare .imgurl
		}else{
			return 'http://www.iresearch.cn/include/public/images/ire-sharepic.jpg'
		}
	}(),
	contenturl : function(){
		if(typeof dataForWeixinShare  != 'undefined' && typeof dataForWeixinShare .contenturl != 'undefined'){
			return dataForWeixinShare .contenturl
		}else{
			return document.location.href
		}
	}()
};


var evalscripts = [];/*js相关*/
var JSLOADED = [];/*javascript动态载入标识数组*/
var CSSPATH = typeof CSSPATH == 'undefined' ? 'css/' : CSSPATH;
var JSPATH = typeof JSPATH == 'undefined' ? 'js/' : JSPATH;
var VERHASH = typeof VERHASH == 'undefined' ? '1.0' : VERHASH;

function $id(id) {
    return document.getElementById(id) ? document.getElementById(id) : null;
}

function isUndefined(val) {
    return typeof val == 'undefined' ? true : false;
}

function hash(string, length) {
    var length = length ? length : 32;
    var start = 0;
    var i = 0;
    var result = '';
    filllen = length - string.length % length;
    for (i = 0; i < filllen; i++) {
        string += "0";
    }

    while (start < string.length) {
        result = stringxor(result, string.substr(start, length));

        start += length;
    }
    return result;
}

function stringxor(s1, s2) {
    var s = '';
    var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var max = Math.max(s1.length, s2.length);
    for (var i = 0; i < max; i++) {
        var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
        s += hash.charAt(k % 52);
    }
    return s;
}

function in_array(needle, haystack) {
    if (typeof haystack == 'undefined') return false;
    if (typeof needle == 'string' || typeof needle == 'number') {
        for (var i in haystack) {
            if (haystack[i] == needle) {
                return true;
            }
        }
    }
    return false;
}

function appendscript(src, text, callback, reload, targetid, charset) {

    var src = isUndefined(src) ? '' : src;
    var text = isUndefined(text) ? '' : text;
    var callback = isUndefined(callback) ? '' : callback;
    var targetid = (isUndefined(targetid) || targetid == '' || targetid == null) ? 'htmlhead' : targetid;
    var reload = isUndefined(reload) ? 0 : (parseInt(reload) == 1 ? 1 : 0);
    var charset = isUndefined(charset) ? '' : charset;
    var id = hash(src + text);

    if (!src && !text) return;
    if (targetid != 'htmlhead' && targetid != 'htmlbody' && !$id(targetid)) return;
    if (!reload && in_array(id, evalscripts)) return;
    if (reload && $id(id)) {
        $id(id).parentNode.removeChild($id(id));
    }

    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : '';
    try {
        if (src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
                if (callback)
                    try { eval('callback()') } catch (e) { }
            };
            scriptNode.onreadystatechange = function () {
                if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                    if (callback)
                        try { eval('callback()') } catch (e) { }
                }
            };
        } else if (text) {
            scriptNode.text = text;
        }
        if (targetid == 'htmlhead') {
            document.getElementsByTagName('head')[0].appendChild(scriptNode);
        } else if (targetid == 'htmlbody') {
            document.getElementsByTagName('body')[0].appendChild(scriptNode);
        } else {
            $id(targetid).appendChild(scriptNode);
        }
    } catch (e) { }
}


appendscript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', '', function () {
    appendscript('http://www.iresearch.cn/include/auto/wxpro.ashx?work=get&url=' + encodeURIComponent(document.location.href), '', function () {
        var wxconfig = window['wxconfig'] || '';

        if (wxconfig) {
            wx.config({
                appId: wxconfig.appId,
                timestamp: wxconfig.timestamp,
                nonceStr: wxconfig.nonceStr,
                signature: wxconfig.signature,
                jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo'
                ]
            });
            wx.ready(function () {
                var title = dataForWeixinShares.title;
                var desc = dataForWeixinShares.content;
                var link = dataForWeixinShares.contenturl;
                var imgUrl = dataForWeixinShares.imgurl;
                wx.onMenuShareTimeline({
                    title: title,
                    link: link,
                    imgUrl: imgUrl,
                    success: function (res) {
                        //pb_count('share_weixin_timeline_succ');
                    },
                    cancel: function (res) {
                        //pb_count('share_weixin_timeline_cancel');
                    },
                    fail: function (res) {
                        //pb_count('share_weixin_timeline_fail');
                    }
                });
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    success: function (res) {
                        //pb_count('share_weixin_appmes_succ');
                    },
                    cancel: function (res) {
                        //pb_count('share_weixin_appmes_cancel');
                    },
                    fail: function (res) {
                        //pb_count('share_weixin_appmes_fail');
                    }
                });
                wx.onMenuShareQQ({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    success: function (res) {
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                    }
                });
                wx.onMenuShareWeibo({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    success: function (res) {
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                    }
                });
            });
        }
    });
});