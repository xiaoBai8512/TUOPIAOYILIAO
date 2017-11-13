// JavaScript Document
$(function(){
	$("#loadbtn").click(function(){
	    var _data = $("#tab-list>div:visible").attr("data");
	    var _lastid = $("#tab-list>div:visible li:last-child").attr("id");
	   // alert(_lastid);
		if(_data != null && _lastid != null){
			$.ajax({
				   type: "Get",
				   url: "/include/pages/redis.aspx",
				   data: _data + "&lastId=" + _lastid,
				   dataType:"html",
				   success: function(html){
					  $("#tab-list>div:visible ul").append(html);
				   }
			});
		}
	});
    
});
function loadhtml(opt) {
    
    $.ajax({
        type: "Get",
        url: "/include/ajax/news_ajax.ashx",
        data: "work=getlisthtml&filename=" + opt.filename,
        dataType: "html",
        success: function (html) {
            $(opt.selstr).append(html);
        }
    });
}