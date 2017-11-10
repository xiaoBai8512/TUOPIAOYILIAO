//ga
//liuy 2016.8.8 暂停 出现 double click？
 /*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66410535-1', 'auto');
  ga('send', 'pageview');
*/
//
//liuy 2016 1205 数据库迁移暂停 已放开
var info=document.cookie.match(new RegExp("(^| )ymtinfo=([^;]*)(;|$)")) ? document.cookie.match(new RegExp("(^| )ymtinfo=([^;]*)(;|$)"))[2] : ''; 
  var _paq = _paq || [];
	_paq.push(["setCustomVariable",1, "ymtinfo",info,"visit"]); 
	_paq.push(["setCustomVariable",1,"ymtinfo",info,"page"]); 
	_paq.push(["setCookieDomain", "*.medlive.cn"]);
	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
  (function() {
    var u="//tongji.medlive.cn/";
    _paq.push(['setTrackerUrl', u+'medtj.php']);
    _paq.push(['setSiteId', 3]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'medtj.js'; s.parentNode.insertBefore(g,s);
  })();


  (function(){
	  var ids = getCookie('_pk_id.3.a971');
	  var temp = ids.split('.');
	  if(temp[0]){
	      var now = new Date(),
	      nowTs = now.getTime();
	      var validtime = nowTs + 1000 * 60 * 60 * 24 * 365 * 10;
	  
	 	  var ymt_pk_id = getCookie('ymt_pk_id');
	 	  if( !ymt_pk_id || ymt_pk_id != temp[0]) setCookie('ymt_pk_id', temp[0] , validtime, '/', '.medlive.cn'); 
	  }
  })();

 function getCookie(cookieName) {
	 return document.cookie.match(new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)")) ? document.cookie.match(new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)"))[2] : ''; 
 }
 function setCookie(cookieName, value, msToExpire, path, domain, secure) {
     var expiryDate;
     // relative time to expire in milliseconds
     if (msToExpire) {
         expiryDate = new Date();
         expiryDate.setTime(expiryDate.getTime() + msToExpire);
     }
     document.cookie = cookieName + '=' + window.encodeURIComponent(value) +
         (msToExpire ? ';expires=' + expiryDate.toGMTString() : '') +
         ';path=' + (path || '/') +
         (domain ? ';domain=' + domain : '') +
         (secure ? ';secure' : '');
 }
 
 //ty
/* (function() {
	 var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	    g.type='text/javascript';  g.async=true; g.src='//tongji.medlive.cn/tingyun.js'; s.parentNode.insertBefore(g,s);
	 })();*/
//神策 20170616取消
/*(function(para) {
  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
  w['sensorsDataAnalytic201505'] = n;
  w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
  var ifs = ['track','quick','register','registerPage','registerOnce','clearAllRegister','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    y.parentNode.insertBefore(x, y);
    w[n].para = para;
  }
})({
  sdk_url: 'http://static.sensorsdata.cn/sdk/1.7.7/sensorsdata.min.js',
  name: 'sa',
  server_url: 'http://analysis.kydev.net/sa?project=default'
});
sa.quick('autoTrack');*/