var autoScaling=function(img,t,_width,_height){//boyka的图片自适应缩放,这个是静态缩放;
	if(img.width>0&&img.height>0){
		if(img.width/img.height>=_width/_height){
			if(img.width>_width){
				t.width(_width);
				t.height((img.height*_width)/img.width);          
			}else{
				t.width(img.width);
				t.height(img.height);
			}	
		}else{
			if(img.height>_height) {
				t.height(_height);
				t.width((img.width*_height)/img.height);
			}else{
				t.width(img.width);
				t.height(img.height);
			}
		}
	}
};
var Box=function(){
	this.init.apply(this,arguments);
};
Box.prototype={
	init:function(options){
		var _this=this;
		this.ele=options.ele;
		$(window).bind("load",function(){
			_this.ele.each(function(i){
				var img=new Image();
				img.src=$(this).attr("src");
				var _width=$(this).parent().width();
				var _height=$(this).parent().height();
				autoScaling(img,$(this),_width,_height);
				$(this).css({
					marginLeft:($(this).parent().width()-$(this).width())/2,
					marginTop:($(this).parent().height()-$(this).height())/2,
					visibility:"visible"
				})
			})
		})
	}
};
var Header=function(){
	this.init.apply(this,arguments);
};
Header.prototype={
	init:function(options){
		var _this=this;
		this.main=options.main;
		this.icon=options.icon;
		var y;
		$(window).bind('load',function(){
			var _t=$(this);
			setTimeout(function(){
				y=_this.main.offset().top;
				if(_t.scrollTop()>y){
					_this.main.find(".method").addClass("fix")
					_this.icon.find(".scroll").css({
						top:-85
					})
				}else{
					_this.main.find(".method").removeClass("fix")
					_this.icon.find(".scroll").css({
						top:0
					})
				}
			},500)	
		})
		$(window).bind("scroll",function(){
			if($(this).scrollTop()>y){
				_this.main.find(".method").addClass("fix")
				_this.icon.find(".scroll").css({
					top:-85
				})
			}else{
				_this.main.find(".method").removeClass("fix")
				_this.icon.find(".scroll").css({
					top:0
				})
			}
		})
	}
};
var Menu=function(){
	this.init.apply(this,arguments);
};
Menu.prototype={
	init:function(options){
		var _this=this;
		this.main=options.main;
		this.btn=options.btn;
		this.btn.bind("mouseenter",function(event){
			event.preventDefault();
			$(this).find(".selected").addClass("hov")
			$(this).find(".menu").stop(true,true).animate({
				height:$(this).find(".list").outerHeight(true)
			},500)
			console.log($(this).find(".list").outerHeight(true))
		})
		this.btn.bind("mouseleave",function(event){
			event.preventDefault();
			$(this).find(".selected").removeClass("hov")
			$(this).find(".menu").stop(true,true).animate({
				height:0
			},100)
		})
	}
};
(function(){
	new Box({
		ele:$(".box")
	})
	if($(document).find(".header").size()){
		new Menu({
			main:$(".user"),
			btn:$(".user")
		})
	}
	if($(document).find(".header").size()){
		new Header({
			main:$(".header"),
			icon:$(".header").find(".logo")
		})
		
	}
	if($(document).find(".navigation").size()){
		new Menu({
			main:$(".navigation"),
			btn:$(".navigation").find(".select")
		})
	}
})()