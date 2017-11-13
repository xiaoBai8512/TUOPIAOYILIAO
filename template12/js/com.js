/**
 * common usage
 */
var has_done =false;
(function(arg){
	if(has_done ==false){
		var aid = parseInt(document.URL.replace(/^.+?\/(\d+)[a-z]?([-_]\d+)?\.htm$/, '$1'));
		var script = document.createElement('script');
		script.type='text/javascript';
		script.src='http://www.hc3i.cn/php/com.php?aid='+aid;	
		document.body.appendChild(script);
	}else {
		has_done = true;
	}	
})();