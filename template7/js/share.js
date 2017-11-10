//分享同时添加评论
function auto_comment(){
	var auto_comment = $("#auto_comment").get(0).checked;
	var description = $(".area_body_innerbox .share_content .txt").val();
	if(auto_comment && description != ''){
		var datas ={ 
				action : 'addcomments',
				catid  : $("#catid").val(),
				contentid : $("#contentid").val(),
				title : $("#title").val(),
				content : $("#con").val(),
				mdl : $("#mdl").val(),
				div : $("#div").val(),
				uid : $("#uid").val(),
				username :$("#username").val(),
				photo_url : $("#photo_url").val(),
				comment : description,
				no_feed : 1,
				reply_users : 0
		};
		$.ajax({
			type : "POST",
			url : $("#action_url").val(),
			data : datas,
			success:function(){
				window.location.reload(true);
			}
		});
	}
	
}
//关闭弹出框
function closePopWindow() {
	$("#masklayer").hide();
	$("#popwindow_box").hide();
}
//防重复点击
function registerSubmit(button_id) {
	var btn = $('#'+button_id);
	btn.attr('disabled', 'disabled');
	setTimeout(function(){
		btn.removeAttr('disabled');
	}, 5000);
}

//点击确定发送数据
function submit_share(){
	var medlive_base_url = $('#medlive_base_url').val();
	//获得参数
	var datas ={ 
			action : 'shares',
			catid  : $("#catid").val(),
			contentid : $("#contentid").val(),
			title : $("#title").val(),
			content : $("#con").val(),
			mdl : $("#mdl").val(),
			uid : $("#uid").val(),
			div : $("#div").val(),
			photo_url : $("#photo_url").val(),
			description : $(".area_body_innerbox .share_content .txt").val()
	};
	var share_counts = $("#sharecounts").val();
	var share_counts = ++share_counts;
	$.ajax({
		type : "POST",
		url : $("#action_url").val(),
		data : datas,
		success : function(msg) {
			if(msg == -3){
				alert("您的账号异常");
				return false;
			}
			if(msg == "ok"){
				alert("分享成功！");
				$("#sharecounts").html(share_counts);
				return false;
			}
			if(msg == "err"){
				alert("您已经分享过了！");
				return false;
			}
			if(msg == "fail"){
				alert("对不起您没有分享成功请重试！");
				return false;
			}
			if(msg == "wrong"){
				location.href = medlive_base_url + '/auth/login?service=' + encodeURIComponent(location.href);
				return false;
			}
			$("#popwindow_box").hide();
			$("#masklayer").hide();
			$("#description").val("");
		}
	});
}
$(document).ready(function(){
	var medlive_base_url = $('#medlive_base_url').val();

	//分享js
	$("#share").click(function(){
		
		var userid = $("#uid").val();
		//判断登录
		if(userid == 0 || userid == "" || userid == null) {
			if(confirm("您尚未登录，需要登录并继续操作吗？")) {
				location.href = medlive_base_url + '/auth/login?service=' + encodeURIComponent(location.href);
			}
			return false;
		}
		
		//获得参数
		var datas ={ 
				title : $("#title").val(),
				content : $("#con").val(),
				mdl : $("#mdl").val(),
				photo_url : $("#photo_url").val()
		};
		
		//弹出分享输入框
		var elements_id = $("#popwindow_box");
		var popwindowHeight = 460;
		var popwindowWidth = 660;
		var x = $(window).scrollLeft();
		var y = $(window).scrollTop();
		x += ($(window).width() - popwindowWidth) / 2;
		y += ($(window).height() - popwindowHeight) / 2;
		$("#masklayer").show();
		elements_id.load('/cms/share_window.ajax.php',datas);
		setTimeout(function() {
			elements_id.width("");
			elements_id.css("width", popwindowWidth+"px");
			elements_id.css("border", "none");
			elements_id.css("position", "absolute").css("left", x).css("top", y).show();
		}, 100);
       });
	
	//我要看中文js
	$("#kanzhongwen").click(function(){
		
		var contentid3 = $("#contentid").val();
		var cn_content = $("#cn_content").val();
		
		if(cn_content){
		
			$("#kanzhongwen").hide();
		
		}
		data3 = "action=kzwAjax"+"&contentid="+contentid3;
		
		$.ajax({
            
			type:"POST",
            url:$("#action_url").val(),
            data:data3,
            success		: function(msg) {
            
    	    if(msg == 1){
		        
    	    	alert("我要看中文投票成功");
			
    	     }
		   }
         });
       });
	
	
	//期刊list和show 页的期刊简介
	    $("#show_all").click(function(){
	    	
	    	$("#synopsis_all").show();
	    	$("#synopsis_short").hide();
	    
	    });
	    $("#show_short").click(function(){
	   
		   $("#synopsis_all").hide();
	       $("#synopsis_short").show();
	    
	   });
	    
	  //过刊浏览点击查看更多月
	    $("#months").click(function(){
	    	
	    	$("#list_months").show();
	    	$("#guokan_list").hide();
	    
	    });
	 //期刊list页的在input框选择栏目 下面对应栏目中的子栏目js 
	    var content_n2 = $("#content_n").val();
		   
	      if(content_n2 == "all"){
			   
			    $("div.infoContBox li").show();
		   
		   }else{
			    
			    $("div.infoContBox li[name!='content_"+content_n2+"']").hide();
			    $("div.infoContBox li[name='content_"+content_n2+"']").show();
		   }
		  
		   $("#content_n").change(function(){
			    
			    var content_n = $(this).val();
		        
			     if(content_n == "all"){
			        
			    	 $("div.infoContBox li").show();
			     
			     }else{
			        
			    	 $("div.infoContBox li[name!='content_"+content_n+"']").hide();
					 $("div.infoContBox li[name='content_"+content_n+"']").show();
			    
			     }
		 });
	
});


function share_to_outer_site(type) {
	var url = '';
	switch(type){
		case 'douban' : url = 'http://www.douban.com/recommend/?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href);break;
		case 'baidukongjian' : url = 'http://apps.hi.baidu.com/share/?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href);break;
		case 'sinatmicroblog' : url = 'http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href);break;
		case 'kaixin' : url = 'http://www.kaixin001.com/repaste/share.php?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href);break;
		case 'renren' : url = 'http://share.renren.com/share/buttonshare.do?title='+encodeURIComponent(document.title)+'&link='+encodeURIComponent(location.href);break;
		case 'tengxunmicroblog' : url = 'http://v.t.qq.com/share/share.php?title='+encodeURIComponent(document.title)+'&link='+encodeURIComponent(location.href);break;
	}
	window.open(url, '_blank', 'scrollbars=no,resizable=yes,width=450,height=400');
}



