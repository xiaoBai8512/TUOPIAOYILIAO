var touchSupport = !IsPC();

$(function(){
	
	//�ƶ��˷���͸
	if(touchSupport){
		addJS("/include/public/js/fastclick.js");
		setTimeout(function(){FastClick.attach(document.body)},100);
	}
	
	//���а���б�ɫ
	$('.list-s1').find('ul').each(function(){
		$(this).find('li:even').css({background:'#fff'});
	});
	
	$('.list-s1_2').find('ul').each(function(){
		$(this).find('li:odd').css({background:'#f8f8f8'});
	});

	//���а��Զ�����
	$('.list-s2').find('ul').each(function(){
		$(this).find('li').each(function(i){
			if(i < 3){
				$(this).addClass('z-top');
			}
			$(this).find('.nub').text(i+1);
		});
	});

	//�б��Զ���������
	/*$('.list-s3').find('ul').each(function(){
		var n = $(this).find('li').size(),
			h = $(this).find('li').outerHeight(),
			i = $(this).attr('line-data') ? $(this).attr('line-data') : Math.ceil(n/2),
			ul_h = i < Math.ceil(n/2) ? h*(n-i) : h*i;

			
		$(this).height(ul_h).find('li').eq(i).css({
			'margin-top':-h*i,
			'left':'50%',
			'background':'#fff'
		}).nextAll().each(function(i){

			if(i%2 != 0){
				$(this).css({background:'#fff'});
			}else{
				$(this).css({background:'#F8F8F8'});
			}

			$(this).css({
				'left':'50%'
			});
		});
	});*/
	
	//���ۻظ�
	$('.reply').click(function(){
		$(this).parent().next().attr('sd','8888').slideToggle(300,function(){
			//alert($(this).css('display'))
			if($(this).css('display') == 'block'){
				$(this).find('textarea').focus();
			}
		}).parent().parent().parent().siblings().find('.reply-info').find('.g-textarea').slideUp(300);
	});
	
	//�������Э��������
	$('.clause-btn','.page-usercenter-setup').click(function(){
		$('.clause-con','.page-usercenter-setup').slideToggle(300);
	});
	
	//����ɸѡ���
	$('.m-Select .tab span').on(touchSupport?'touchend':'click',function(){
		var i = $(this).index();
		$('.m-Select .u-btn-search').show();
		$(this).toggleClass('z-crt').siblings().removeClass('z-crt');
		$(".m-Select .select-bd .item").eq(i).stop().slideToggle(300).siblings().slideUp(300);
				
	});
	$('.m-Select .u-btn-search').on(touchSupport?'touchend':'click',function(){
		$(this).hide();
		$('.m-Select .tab span').removeClass('z-crt');
		$(".m-Select .select-bd .search-con").stop().slideToggle(300).siblings().slideUp(300);
				
	});
	/*$(".m-Select .select-bd .t-link a").on(touchSupport?'touchend':'click',function(){
		$(this).toggleClass('z-crt').siblings().removeClass('z-crt').parents('.item').siblings().find('a').removeClass('z-crt');
						
	});*/
	
	//�����շѱ���Ԥ��
	if($('#h_isfree').val() == 1){
		$('.info-down .buttons li.look').hide();
	}
	
	
	
	if(IsPC()){ navCur(); }
	searchClick();
	userHover();
	navFixed();
	navMore();

});	


//�ƶ��˵���
function navMore(){


//��������
	$('#nav-more').on(touchSupport?'touchend':'click',function(){

			$('body').addClass('z-crt');

		
	});
	$('.exp-bg','.g-nav-mobile').on(touchSupport?'touchend':'click',function(){

			$('body').removeClass('z-crt');

	});
	$('.close-btn-icon','.exp-cont').on(touchSupport?'touchend':'click',function(){

			$('body').removeClass('z-crt');

	});
	//$('.exp-nav-cont','.exp-cont').html($('.m-nav','.g-hd').html());
	
	$('.m-nav','.g-hd').find('a').each(function(){
		$('.exp-nav-cont','.exp-cont').append($(this).clone());
	});
	setTimeout(function(){
		$('.exp-nav-cont','.exp-cont').find('a').wrapAll("<ul class='f-cb'></ul>").each(function(){
			$(this).wrapAll("<li class='link'></li>")
		});
	},200);
	
//�ƶ��˶�������
	$('ul','.m-hd-bg').each(function(){
		var f = true;		
		if($(this).find('li').size() > 3){
			$(this).append("<span class='more'><img alt='����' src='/include/public/images/icon_menu.png'></span>");
			$(this).find('.more').on(touchSupport?'touchstart':'click',function(){
				if(f){
					$(this).parent().parent().animate({height:'78px'},200);
					f = false;
				}else{
					$(this).parent().parent().animate({height:'39px'},200);
					f = true;
				}
			});
		}
	});
}

	
// ѡ�
function tabs(self,id){
	$(self).addClass('z-crt').siblings().removeClass('z-crt');
	$('#'+id).children().eq($(self).index()).show().siblings().hide();
	if($(window).width() < 980){
		$('body,html').animate({ scrollTop: 0 }, 0);
	}
}

//top������ǰҳ�±�
function navCur(){
	var pageName = $('body').attr('class');
	var i;
	var navArr = {
		'page-home':'��ҳ',
		'page-web':'������+',
		'page-column':'ר��',
		'page-research':'�о�',
		'page-start':'��ҵ'	
	}
	if(navArr[pageName]){
		i = $('.link:contains('+navArr[pageName]+')','.m-nav').index();
	}else{
		i = 0;
	}
	
	Menumove(i);
	
}

//�˵���ʾλ���ƶ�
function Menumove(i){
	var w,l;
	var $menuCrt = $("<div id='menu-crt'></div>");
	var $li = $('.m-nav >ul >li');
	$(".g-hd .m-nav").append($menuCrt);
	
	$li.each(function(n){
		
		w = $li.eq(i).outerWidth()-2;
		l = $li.eq(i).position().left;
		
		if(n == i){
			menuSlide(w,l,0);
		}
		
		$(this).mouseover(function(){
			w2 = $(this).outerWidth()-2;
			l2 = $(this).position().left;
			
			
			menuSlide(w2,l2,300);
			
		}).parent().mouseleave(function(){

			menuSlide(w,l,200);
			
		});
	});
	
	function menuSlide(w,l,s){
		$menuCrt.stop().animate({ 
			width:w,
			left:l
		},s);
	}
}

// ���������
function searchClick(){
	$('.search-keyword','.search ').find('.u-ipt').focus(function(){
		$('.searchbtn').addClass('z-crt');
	}).blur(function(){
		$('.searchbtn').removeClass('z-crt');
	}).hover(function(){
		$('.searchbtn').addClass('z-crt');
	},function(){
		
		if(!$(this).is(":focus")){
			$('.searchbtn').removeClass('z-crt');
		}
	});
}


//��ʾ��¼�˵�
function userHover(){
	$('#user').hover(function(){
		$(this).addClass('z-show');
	},function(){
		$(this).removeClass('z-show');
	});
}


//top����������
function navFixed(){
	var $nav = $('.g-nav-user').length > 0 ? $('.g-nav-user') : null;
	var $navTop = $nav ? $nav.offset().top : 0;
	var _scrolTop = $(window).scrollTop();
	
	function Zcur(){
		if($nav){		
			if(_scrolTop > $navTop){
				$nav.addClass('nav-fixed');
			}else{
				$nav.removeClass('nav-fixed');
			}
		}else {
			return ;
		}
	}
	
	$(window).scroll(function(){	
		_scrolTop = $(this).scrollTop();
		Zcur();
	});
	
	Zcur();
}

//�ж��Ƿ�PC��
function IsPC(){  
   var userAgentInfo = navigator.userAgent;  
   
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
   var flag = true;  
   
   for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}

//��̬����JS
function addJS(Src){
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript= document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src=Src;
	oHead.appendChild(oScript);
}	


//������ȡ����ı�״̬
function Valfocus(obj){
	var Val = $(obj).attr('value');
	var dat_val = $(obj).attr('dat-value');
	
	if($(obj).val() == dat_val){
		$(obj).css('color','#ddd');
	}else{
		$(obj).css('color','#777');
	}
	
	$(obj).val(Val).focus(function(){
		$(this).css('color','#777');
		if($(this).val() == dat_val){
			$(this).val('');
		}
	}).blur(function(){		
		if(!$(this).val()){
			$(this).val(dat_val).css('color','#ddd');
		}else if($(this).val() == dat_val){
			$(this).css('color','#ddd');
		}
	});
}	

//���������ʽ
function clearStyle(obj){
	$(obj).each(function(){
		if($(this).attr('style')){
			$(this).css({
				"margin":"",
				"padding":"",
				"line-height":"",
				"font-family":"",
				"font-size":"",
				"letter-spacing":""
			});
		}
	});	
}

//����ѡ�Ĭ��չʾ��ѡ��
function TabShow(tit,con,cur,arr){
	var urlA = location.search?location.search.split('?')[1]:'';
	
	$.each(arr, function(i, n){
		var urlB = urlA.substr(0,arr[i].length);
		
	    if(urlB == n){
		  $(tit).children().eq(i).addClass(cur).siblings().removeClass(cur);
		  $(con).children().eq(i).show().siblings().hide();
		  return;
	    } 
	});
}
