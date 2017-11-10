//内容页分页用
function setContentPage(page){
	if(page < 1){
		page = 1;
	}
	var currentpage = parseInt($("#currentpage").val());
	var totalpage = parseInt($("#totalpage").val());
	if(page == currentpage) return false;
	$("div[id^='Page_']").each(function(){
		$(this).hide();
	});
	$("#currentpage").val(page);
	$("#Page_"+page).show();
	$("#page_nav").children().each(function(){
		$(this).removeClass('black');
	});
	var page_nav = $("#page_nav > ");
	var i = 0;
	while(i < totalpage){
		i++;
		if(i == page){
			page_nav.eq(i).html(i);
			page_nav.eq(i).attr('style', '');
		}else{
			page_nav.eq(i).html('['+i+']');
			page_nav.eq(i).attr('style', 'cursor:pointer;');
		}
	}
	page_nav.eq(page).addClass('black');
	if(page == 1) page_nav.eq(0).addClass('black');
	if(page == totalpage) page_nav.eq(totalpage+1).addClass('black');
}

//翻页
function nextpage(next){
	next = parseInt(next);
	if(next != 1 && next != -1){
		return false;
	}
	var currentpage = parseInt($("#currentpage").val());
	var totalpage = parseInt($("#totalpage").val());
	currentpage += next;
	if(currentpage < 1 || currentpage > totalpage){
		return false;
	}
	setContentPage(currentpage);
}