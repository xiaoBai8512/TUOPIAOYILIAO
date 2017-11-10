function wpcollect(post_id, user_id){
	var id = "#wp-collect-" + post_id,
		$collect = jQuery(id);

	if(post_id){
		$collect.addClass('collect-loader');
    	jQuery.post(wpcollect_ajax_url, {
    		"action": "wpcollect",
        	"post_id": post_id,
        	"user_id": user_id
    	}, function(result) { //console.log(result);
    		if( result.status == 200 ){
    			var $count = $collect.find('span');
    			$collect.addClass('collected is-favorite').removeClass('collect-loader');
    			$count.text(result.count);
    		}else if( result.status == 300 ){
    			var $count = $collect.find('span');
    			$collect.removeClass('collected is-favorite').removeClass('collect-loader');
    			$count.text(result.count);
    		}else{
    			alert('系统超时，请稍后重试');
    		}
    	}, 'json');		
	}
}

function wpcollect2(post_id, user_id){
	var id = "#wp-collect-" + post_id,
		$collect = jQuery(id);

	if(post_id){
		$collect.addClass('collect-loader');
    	jQuery.post(wpcollect_ajax_url, {
    		"action": "wpcollect",
        	"post_id": post_id,
        	"user_id": user_id
    	}, function(result) { //console.log(result);
    		if( result.status == 200 ){
    			location.reload();     
    		}else if( result.status == 300 ){
    			location.reload();     
    		}else{
    			alert('系统超时，请稍后重试');
    		}
    	}, 'json');		
	}
}


// this is the js for banner by Hongjian, if you found any problem, please let me know. Thanks!

var timeImage = "";
var indexImage = 1;
$(function () {
 showimg(indexImage);
 //鼠标移入移出
 $(".imgnum span").hover(function () {
    clearTimeout(timeImage);
    var iconImage=$(this).text();

    $(".imgnum span").removeClass("onselect").eq(iconImage-1).addClass("onselect");
    $("#banner_img .scrollers").hide().stop(true,true).eq(iconImage-1).fadeIn(500);
 }, function () {
    indexImage=$(this).text()> 2 ? 1 :parseInt($(this).text())+1;
    timeImage = setTimeout("showimg(" + indexImage + ")", 4000);
 });
});

function showimg(num) {
 indexImage = num;
 $(".imgnum span").removeClass("onselect").eq(indexImage-1).addClass("onselect");
 $("#banner_img .scrollers").eq(indexImage-1).fadeIn(500).siblings().fadeOut(50);
 indexImage = indexImage + 1 > 3 ? 1 : indexImage + 1;
 timeImage = setTimeout("showimg(" + indexImage + ")", 4000);
}

// var timeImage = tempImage = 0; 
// var countImageNum;

// $(document).ready(lunbo())

// funciton lunbo(){
//     countImageNum = $("#banner_img .scrollers ").length;
//     $("#banner_img .scrollers:not(:first-child)").hide();
//     $(".imgnum span").click(function(){
//         var iconImage = $(this).text()-1;
//         tempImage = iconImage;
//         if(iconImage>=countImageNum) return;
//          $(".imgnum span").removeClass("onselect").eq(iconImage-1).addClass("onselect");
//         $("#banner_img .scrollers").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000); 
//     });

//     timeImage = setInterval("showAuto()", 4000);
//     $("#banner_img").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 4000);});
// }

// function showAuto(){
//     tempImage = tempImage >=(countImageNum - 1)?0 : ++tempImage;
//     $(".imgnum span").eq(tempImage).trigger('click'); 
// }


