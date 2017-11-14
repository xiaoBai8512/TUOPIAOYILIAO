function setTab(m, n) {
    var tli = document.getElementById("menu" + m).getElementsByTagName("li");
    var mli = document.getElementById("main" + m).getElementsByTagName("ul");
    for (i = 0; i < tli.length; i++) {
        tli[i].className = i == n ? "hover" : "";
        mli[i].style.display = i == n ? "block" : "none";
    }
}
function toRefreshPV(){
	$("#zxlist li").each(function(){
		var id = $(this).attr("id");
		var aid = id.substring(1);
		var ptype = id.substring(0,1);
		refreshPV(aid, ptype);
	});
}
function refreshPV(aid,ptype){
	$.ajax({
        type: "get",
        dataType: "json",
        url: neturlpath+'ncdcms/json/countsArticleJson.xhtml?type='+ptype+'&aid='+aid,
        success: function(data){
        	if(data.result){
        		$("#"+ptype+aid).find("#clickCount").html(data.result.clickCount);
        		$("#"+ptype+aid).find("#likeCount").html(data.result.likeCount);
        		$("#"+ptype+aid).find("#PostCount").html(data.result.PostCount);
        	}
        },
        error: function(request) {
        	
        }
	});
}
function adds(){
	$(".adv").each(function(){
		var rid = $(this).attr("id");
		var closebtn = $(this).attr("closebtn");
		$(this).children().remove();
		var rdiv = $(this);
		$.ajax({
	        type: "get",
	        dataType: "json",
	        url: neturlpath+'ncdcms/json/rcmdArticleJson.xhtml?rid='+rid,
	        success: function(data){
	        	if(data.result 
	        			&& data.result.recommendlist 
	        			&& data.result.recommendlist.length > 0){
	        		$.each(data.result.recommendlist,function(i,item){
	        			if(item){
	        				var aurl = item.rcmdUrl;
	        				if(aurl.indexOf("http") == -1){
	        					aurl = neturlpath+aurl;
	        				}
	        				var amsg = $(' <a rel="nofollow" href="'+aurl+'" target="_blank">'
	        						+'       <img src="'+neturlpath+item.rcmdImgpath+'">'
	        						+' </a>');
	        				rdiv.append(amsg);
	        			}
	        		});
	        		if(closebtn == 'true'){
	        			rdiv.append('<span>关闭</span>');
	        		}
	        	}
	        },
	        error: function(request) {
	        	
	        }
		});
	});
}
