var nextpagef=1;
var arctypeshowf = 0;
var artorderby = "";
var neturlpath = 'http://www.ncd.org.cn/';

function articlelistshow(page,size,articlelistdiv,arctype){
	page = parseInt(page);

	if(arctype == null || arctype==""){
		arctype = 0;
	}
	
	var sortjson='';
	if(artorderby!=""){
		sortjson = artorderby;
	}
	$("#"+articlelistdiv).append('<div class="more" id="listloading"><a href="javascript:;">正在加载...</a></div>');
	$.ajax({
        type: "get",
        dataType: "json",
        url: neturlpath+'ncdcms/json/articlelistArticleJson.xhtml?start='+page+'&size='+size+'&arctype='+arctype+sortjson,
        success: function(data){
        	if(data.result.code!="0"){
        		return;
        	}
        	var html = '';
        	
        	if(data.result.list){
	           
        		html = artlistrefresh(data.result.list,page,size,articlelistdiv,arctype);
        	}
        	//去掉load
        	$("#listloading").remove();
    	   if(page==0){
    		   $("#"+articlelistdiv).html(html);
    	   }else{
    		   $("#"+articlelistdiv).append(html);
    	   }
//    	   mui(".main-b .more").on('tap','a',function(){
//			    $(".more a").click();
//		   });
        },
        error: function(request) {
        	
        }
	});
}

function artlistrefresh(jsonstr,start,size,articlelistdiv,arctype){
	var artid = articlelistdiv+"art";
	var html = "";
	var artindex = 0;
	$.each(jsonstr,function(idx,item){
 		artindex++;
 		if(item.description){
 			var url = item.url;
 			if(item.type!=2){
 				url = neturlpath+item.url; 
 			}
 			
 			html+='<li class="mui-table-view-cell mui-media-large">';
 			html+='     <article>';
 			if(item.litpic){
 				html+='	        <a href="'+url+'"  target="_blank">';
 				html+='	            <img class="mui-media-object mui-pull-left" src="'+neturlpath+item.litpic+'">';
 				html+='        </a>';
 			}
 			html+='        <div class="mui-media-body">';
 			html+='            <a href="'+url+'" target="_blank"><h3>'+item.title+'</h3></a>';
 			html+='            <p class="mui-ellipsis">'+item.description+'<p>';
 			html+='            <p>';
 			html+='                <span>'+item.pubdateStr+'</span>';
 			html+='            <small>';
 			html+='                 <i class="mui-icon-extra mui-icon-extra-heart-filled"></i>'+item.likeCounts;
 			html+='              </small>';
 			html+='              <small>';
 			html+='                  <i class="mui-icon mui-icon-chatbubble-filled"></i>'+item.likeCounts;
 			html+='              </small>';
 			html+='             <small>';
 			html+='                 <i class="mui-icon mui-icon-eye"></i>'+item.click;
 			html+='             </small>';
 			html+='           </p>';
 			html+='       </div>';
 			html+='   </article>';
 			html+='   <a href="'+url+'"></a>'
 			html+='</li>';
 		}
	});
    if(artindex==size){
 	   html +='<div class="more"><a href="javascript:;" onclick="artgengduo('+(start+size)+','+size+',\''+articlelistdiv+'\','+arctype+',this);">加载更多>></a></div>';
    }
	return html;
}

function longtoData(timelong){
	var day = new Date(timelong); 
	Year= day.getFullYear();//ie火狐下都可以
	Month= day.getMonth()+1;
	if(Month<10){
		Month = "0"+Month;
	}
	Day = day.getDate();
	if(Day<10){
		Day = "0"+Day;
	}
	Hour = day.getHours();
	if(Hour<10){
		Hour = "0"+Hour;
	}
	 Minute = day.getMinutes();
		if(Minute<10){
			Minute = "0"+Minute;
		}
	 Second = day.getSeconds(); 
	return Year+"-"+Month+"-"+Day+" "+Hour+":"+Minute;
}

function artgengduo(page,size,articlelistdiv,arctype,obj){
	$(obj).parent().remove();
	articlelistshow(page,size,articlelistdiv,arctype);
}
function articlelist(id,page,obj){
	
	$("#zixunlanmu a").removeClass("clickon");
	$(obj).addClass("clickon");
	articlelistshow(page,10,"zxlist",id);
	if(id==1){
		arctypeshowf = 1;
	}else{
		arctypeshowf = 0;
	}
}
function knowledgeGengduo(page,size,articlelistdiv,arctype,obj){
	nextpagef = 0;
	$("#"+articlelistdiv).children().remove();
	articlelistshow(page,size,articlelistdiv,arctype);
}