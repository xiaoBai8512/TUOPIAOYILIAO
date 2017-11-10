// JavaScript Document
//author hlf
//time 917
$(document).ready(function(){
	$(".m_out").mouseHover();		   
	$(".ul_menu > li").mouseHover();
	$(".newmap").HClick();
//	$("#rall").height($("#lall").height()-40);
	$("#rall2").height($("#lall2").height()-130);
});




(function( $ ) {   
  $.fn.mouseHover = function() { 
 
    $(this).hover(
		function(){
			$(this).addClass("hover");
		},
		function(){
			$(this).removeClass("hover");
		}
	);  
  };
  
	$.fn.HClick = function() { 
			 $(this).hover(
					function(){
							$(".maph > a").addClass("hover");
							$(".mapcont").show();
					},
					function(){
							$(".maph > a").removeClass("hover");
							$(".mapcont").hide();
					}
			);  
	};
  
})(jQuery);



//
function setTab(name,cursel,n){
for(i=0;i<=n;i++){
var menu=document.getElementById(name+i);
var con=document.getElementById("con_"+name+"_"+i);
menu.className=i==cursel?"hover":"";
con.style.display=i==cursel?"block":"none";
}
}

$(function() {
       $(".tk").find("li:eq(4)").addClass("m_none");
	   $(".tk").find("li:eq(9)").addClass("m_none");
	   $(".ul_3h").find("li:eq(2)").addClass("li_mb");
	   $(".ul_3h").find("li:eq(5)").addClass("li_mb");
	   $(".ul_3h").find("li:eq(8)").addClass("li_mb");
	   //$(".page").find("li:last").addClass("end");	      
});

//
$(".sec_div").ready(function(){
	if($(".sec_div a").length>0){						 
		$(".sec_div a").each(
			function(i){
				var lk=$(this).attr("href").toLowerCase();
				var url=window.location.href.toLowerCase();
				if(url.indexOf(lk)>=0){
					$(this).attr('class','onhere');
				}else{
					$(this).attr('class','link');
				}
			}
		);
//		$(".sec_div").slideDown();
	}
});

jQuery.fn.Focus = function() {
	var obj = $(this);
	var sWidth = $(this).width(); 
	var len = $("ul li",this).length;
	var index = 0;
	var picTimer;
	
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	
	$(this).append(btn);
	$(".btnBg",this).css("opacity",0.1);

	$(".btn span", this).css("opacity",0.4).mouseenter(function() {
		index = $(this).index()
		showPics(index);
	}).eq(0).trigger("mouseenter");

	$("ul",this).css("width",sWidth * (len));
	$(this).hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},4000); 
	}).trigger("mouseleave");
	
	
	function showPics(index) { 
		var nowLeft = -index*sWidth; 
		$("ul",obj).stop(true,false).animate({"left":nowLeft},300); 
		$(".btn span",obj).stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300);
	}
};


