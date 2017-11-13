(function(){
	var n = navigator;
	var sDomain = document.domain;
	var version = '1.1';
navigator.userAgent.toLowerCase()
	var userAgent = n.userAgent.toLowerCase();
	var oBrowser = {
		version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0,'0'])[1],
		safari: /version.+?safari/.test(userAgent),
		opera: /opera/.test(userAgent),
		chrome: /chrome/.test(userAgent),
		msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
		mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
	};

	var oOs = {
		win: /windows/.test(userAgent),
		mac: /mac/.test(userAgent),
		unix: /x11/.test(userAgent)
	};

	var aUrl = location.href.match("http://([^/]+)(\/.+)");


	function getvalue(type, varname)
	{
		try
		{
			if (type == 'cookie')
			{
				var p = '/' + varname + '=([^;]+);?/';
				var ret = document.cookie.match(eval(p));
				return ret[1];
			}

			if (type == 'meta')
			{
				var metas = document.getElementsByTagName("meta");
				for (var i=0; i<metas.length; i++)
				{
					if (metas[i].name == varname) return metas[i].content;
				}
				return "";
			}

			if (type == 'jsvar')
			{
				return eval(varname);
			}
			return "";

		} catch(e) {return "";}
	}

	

	var title = function() {
		try {
			var t = document.getElementsByTagName("title");
			return encodeURIComponent(t[0].text);
		} catch (e) {return "";}
	}

	//浏览器名称
	var browser = function(){
		if(oBrowser.safari) return "safari";
		else if(oBrowser.opera) return "opera";
		else if(oBrowser.chrome) return "chrome";
		else if(oBrowser.mozilla) return "firefox";
		else if(oBrowser.msie) return "ie";
		else return "other";
	};

	//浏览器版本
	var browser_version = oBrowser.version;

	//操作系统
	var operation_system = function(){
		if(oOs.win) return "windows";
		else if(oOs.mac) return "mac";
		else if(oOs.unix) return "unix";
	};
	/*
 * _args 获取_cmtia.js文件后的url参数组，如：_cmtia.js?后面的内容
 */
var _args, _path =(function( script, i, me )
{
    var l = script.length;
	
	for( ; i < l; i++ )
	{
		me = !!document.querySelector ?
		    script[i].src : script[i].getAttribute('src',4);
		
		if( me.substr(me.lastIndexOf('/')).indexOf('cmtia') !== -1 )
		    break;
	}
	
	me = me.split('?'); _args = me[1];
	
	return me[0].substr( 0, me[0].lastIndexOf('/') + 1 );
})(document.getElementsByTagName('script'),0)

_getArgs = function( name )
{
    if( _args)
	{
	    var p = _args.split('&'), i = 0, l = p.length, a;
		for( ; i < l; i++ )
		{
		    a = p[i].split('=');
			if( name === a[0] ) return a[1];
		}
	}
	return null;
}
	////操作系统版本
	var operation_system_version = function(){
		var version;
		if(oOs.win)
		{
			var aMatch = userAgent.match(/windows[^\d]+([^;]+);/);
			switch(aMatch[1])
			{
				case "5.0":
					version = "win2000";
					break;
				case "5.1":
					version = "winxp";
					break;
				case "5.2":
					version = "win2003";
					break;
				case "6.1":
					version = "win7";
					break;
				default:
					version = "other";
					break;
			}
		}
		else if(oOs.mac)
		{
			if(/iphone/.test(userAgent)) version = "iphone";
			else version = "other";
		}
		return version;
	};

	//获取flash版本
	var flash_version = function(){
		if(n.plugins && n.plugins.length)
		{
			var count = n.plugins.length;
			for(var i=0;i<count;i++)
			{
				if(n.plugins[i].name.indexOf("Shockwave Flash") != -1)
				{
					var aMatch = n.plugins[i].description.match(/Shockwave Flash (\d*)/);
					return aMatch[1];
				}
			}
		}
		else if(window.ActiveXObject)
		{
			for(var i=10;i>=2;i--)
			{
				try{
					var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+i+"');");
					if(fl) return i;
				}
				catch(e){}
			}
		}
		return "false";
	};

	//是否支持java
	var java_enabled = n.javaEnabled();

	//获取浏览器语言
	var language = function(){
		if(oBrowser.msie) return n.browserLanguage;
		else return n.language;
	};

	//显示器的颜色深度
	var screen_colors = screen.colorDepth;

	//显示器的屏幕分辨率
	var screen_resolution = function(){
		return screen.availWidth +"*"+ screen.availHeight;
	};

	//来源URL
	var referrer = document.referrer;

	//目标URL
	var tourl = location.href;
	var app = _getArgs('app') || 'default';
	var aid = _getArgs('aid') || 0;
	var getParams = {
		version:version,
		browser:browser(),
		browser_version:browser_version,
		operation_system:operation_system(),
	//	operation_system_version:operation_system_version(),
		flash_version:flash_version(),
		java_enabled:java_enabled,
		language:language(),
		screen_colors:screen_colors,
		screen_resolution:screen_resolution(),
		referrer:encodeURIComponent(referrer),
		tourl:encodeURIComponent(tourl),
		title:title(),
		aid:aid,
		app:app,
		rnd:Math.round(2147483647*Math.random())
	};

	var ac = function(params){
		var sParams = "";
		for(var o in params)
		{
			sParams += o + "=" + params[o] + "&";
		}
		sParams = sParams.replace(/&$/,'');
		return "http://www.cmt.com.cn/__ia.gif?"+sParams;
	};

	var run = function(){
		var oImg = new Image(1,1);
		oImg.src = ac(getParams);
		oImg.onload = function(){
			oImg.onload = null;
		}
	};
	
	run();
})();
