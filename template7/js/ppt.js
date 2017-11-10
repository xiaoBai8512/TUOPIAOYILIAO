/**
 * 
 */
document.onkeydown=function(event) 

{ 

e = event ? event :(window.event ? window.event : null); 

if(e.keyCode==13){ 
//	var img_n =parseInt($.trim($('#count').html()),10);
	var img_n = $('#count').val();
	img_n=img_n.replace(/\D/gi,"");
	$('#count').val(img_n);
	var num = parseInt($('#num').val(),10);
	var current_page = parseInt($('#current_page').val());
	if(img_n<=num&&img_n>0){
		var page = Math.ceil(img_n/5);
		get_page = page-current_page;
		if(get_page!=0){
			var n = (img_n-1)%5;
			get_list_img(get_page,n);
			$('#current_page').val(page);
		}else{
			var n = (img_n-1)%5;
			set_img(n);
		}
		
	}
} 

} 


//设置主图片

function set_img(img_n) {

	var img_num = parseInt(img_n,10);
	var page = $('#current_page').val();
	var prepage_num = $('#prepage_num').val();
	
	var num = (page-1)*prepage_num+img_num+1;
	$("#big_img").attr("src", $("#img_list_" + img_n).attr("src"));
	$("#count").val(num);
	$(".ppt_list_li").removeClass("current_sub");
	$("#img_list_" + img_n).addClass("current_sub")
	$("#image_current").val(img_num);
	set_class(img_n);

}

// 单张翻页
function get_a_img(num) {
	var Pnum = parseInt(num,10);
	if(num!=1 && num!=-1){ 
		 alert("非法操作"); 
	}
	//当前图片img_n
	var current_index = parseInt($("#image_current").val(), 10);
	var page_num = parseInt($('#page_num').val(), 10);
	var num = parseInt($('#num').val(), 10);
	var prepagnum = parseInt($('#prepage_num').val(), 10);
	var current_page = parseInt($('#current_page').val(), 10);
	var nextnum = current_index+Pnum;
	if(num==nextnum){
		nextnum = 0;
	}
    if(nextnum>=0 && nextnum<5){
       var hide = $("#img_list_"+nextnum).attr("hide");
       if(hide == 1){
    	   get_list_img(Pnum);
       }else{
    	   set_img(nextnum);
       }
    	
    }else{
    	get_list_img(Pnum);
    }
}

// 列表翻页
function get_list_img(page,n) {
	var Ppage=parseInt(page,10);
	var current_page =  parseInt($('#current_page').val(), 10) + Ppage;
	var page_num = parseInt($('#page_num').val(), 10);
	var prepagnum = parseInt($('#prepage_num').val(), 10);
	if (current_page <= 0) {
		current_page = page_num;
		$('#current_page').val(current_page);
	}else{
		$('#current_page').val(current_page);
	}
	if(current_page>page_num){
		current_page = 1;
		$('#current_page').val(current_page);
	}else{
		$('#current_page').val(current_page);
	}
//	alert(current_page);
	$.post("/cms.php", {
		page : current_page,
		submit_type : 'ajax',
		ac : 'pictures',
		contentid : $("#ppt_id").val(),
		prepagnum : prepagnum,
		model_type : 'info',
		cat_type : 'news',
	}, function(data) {
		console.log(data);
		var len = $(data).length;
		var s;
		if (len != 0) {
			clear_list();
			set_class(0);
			$.each(data, function(i,val){      
				$("#img_list_" + i).attr("src",val);
				$("#img_list_" + i).show();
				$("#img_list_" + i).attr("hide","2");
			  }); 
			//当列表不满时隐藏图框
			var per_page_num = $('#prepage_num').val();
			if (len < per_page_num) {
				per_page_num = per_page_num - 1;
				for ( var j = len; j <= per_page_num; j++) {
					$("#img_list_" + j).hide();
					$("#img_list_" + j).attr("hide","1");
				}
			}
			prepagnum--;
			if(n+1){
//				alert(n);
				set_img(n);
				return;
			}
			if(page==1){               //选中开始图片或者页尾图片
				set_img(0);
			} else {
				set_img(len-1);
			}
		}
	},'json');
}

// 清空list列表
function clear_list() {
	for ( var i = 0; i < $('#prepage_num').val(); i++) {
		$("#img_list_" + i).removeAttr("src");
	}
}
// 设置选中样式
function set_class(img_n) {
	for ( var i = 0; i < $('#prepage_num').val(); i++) {
		$("#li_" + i).removeClass('current_sub');
	}
	$("#li_" + img_n).addClass('current_sub');
}

// 图片到达开始、末尾提示
function set_alert(current_val) {
	if (current_val < 0) {
		alert("已到首页图片！");
	} else if (current_val >= $("#image_num").val()) {
		alert("已到末尾图片！");
	}
	return;
}

