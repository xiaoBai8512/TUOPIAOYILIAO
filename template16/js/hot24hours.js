var neturlpath = 'http://www.ncd.org.cn/';
$(document).ready(function(){
	$("#hot24hours li").remove();
	$.ajax({
        type: "get",
        dataType: "json",
        url: neturlpath+'ncdcms/json/hot24hoursArticleJson.xhtml?start=0&size=4',
        success: function(data){
	    	if(data.result.list && data.result.list.length > 0){
	        	$.each(data.result.list,function(i,item){
	        		var url = item.url;
	        		if(item.type!=2){
	        			url = neturlpath+item.url; 
	        		}
	        		if(item.litpic){
	        			var li = $('<li>'
	        					+'   <a href="'+url+'" target="_blank">'
	        					+'      <img src="'+neturlpath+item.litpic+'" width="310" height="200" border="0">'
	        					+'      <p>'+item.title+'</p>'
	        					+'   </a>'
	        					+'</li>');
	        			$("#hot24hours ul").append(li);
	        		}
	        		$("#hot24hours").show();
	        	});
	    	}else{
	    		$("#hot24hours").hide();
	    	}
        },
        error: function(request) {
        	
        }
	});
	
	$.ajax({
        type: "get",
        dataType: "json",
        url: neturlpath+'ncdcms/json/hotweekArticleJson.xhtml?start=0&size=5',
        success: function(data){
	    	if(data.result.list && data.result.list.length > 0){
	    		$("#weekhot").find(".main-c2").remove();
	    		$("#weekhot li").remove();
	    		$("#weekhot1").find(".main-c2").remove();
	    		$("#weekhot1 li").remove();
	        	$.each(data.result.list,function(i,item){
	        		if(i == 0){
	        			$("#weekhot").find(".main-c-title").after(makeatr("showimg",item));
	        			$("#weekhot1").find(".main-c-title").after(makeatr("showimg",item));
	        		}else if(i == 1){
	        			$("#weekhot").find(".main-c2").after(makeatr("showimg",item));
	        			$("#weekhot1 ul").append(makeatr("hideimg",item));
	        		}else{
	        			$("#weekhot ul").append(makeatr("hideimg",item));
	        			$("#weekhot1 ul").append(makeatr("hideimg",item));
	        		}
	        	});
	    	}
        },
        error: function(request) {
        	
        }
	});	
});
function makeatr(type, item){
	var url = item.url;
	if(item.type!=2){
		url = neturlpath+item.url; 
	}
	if(type == "showimg"){
		var div = $('<div class="main-c2">'
				+'       <a target="_blank" href="'+url+'">'
				+'           <img src="'+neturlpath+item.litpic+'" width="310" height="200" border="0">'
				+'           <p>'+item.title+'</p>'
				+'       </a>'
				+'   </div>');
		return div;
	}else if(type == "hideimg"){
		var li = $('<li>'
				+'	<a target="_blank" href="'+url+'">'+item.title+'</a>'
				+'</li>');
		return li;
	}
}