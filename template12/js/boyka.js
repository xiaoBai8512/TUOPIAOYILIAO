var autoScaling = function (img, t, _width, _height) {//boyka的图片自适应缩放,这个是静态缩放;
    if (img.width > 0 && img.height > 0) {
        if (img.width / img.height >= _width / _height) {
            if (img.width > _width) {
                t.width(_width);
                t.height((img.height * _width) / img.width);
            } else {
                t.width(img.width);
                t.height(img.height);
            }
        } else {
            if (img.height > _height) {
                t.height(_height);
                t.width((img.width * _height) / img.height);
            } else {
                t.width(img.width);
                t.height(img.height);
            }
        }
    }
};
var Box = function () {
    this.init.apply(this, arguments);
};
Box.prototype = {
    init: function (options) {
        var _this = this;
        this.ele = options.ele;
        $(window).bind("load", function () {
            _this.ele.each(function (i) {
                var img = new Image();
                img.src = $(this).attr("src");
                var _width = $(this).parent().width();
                var _height = $(this).parent().height();
                autoScaling(img, $(this), _width, _height);
                $(this).css({
                    marginLeft: ($(this).parent().width() - $(this).width()) / 2,
                    marginTop: ($(this).parent().height() - $(this).height()) / 2,
                    visibility: "visible"
                })
            })
        })
    }
};
var Hov = function () {
    this.init.apply(this, arguments);
};
Hov.prototype = {
    init: function (options) {
        var _this = this;
        this.main = options.main;
        this.ele = options.ele;
        this.ele.bind("mouseenter", function () {
            $(this).find(".close").addClass("visible");
            $(this).addClass("hov");
        })
        this.ele.bind("mouseleave", function () {
            $(this).find(".close").removeClass("visible");
            $(this).removeClass("hov");
        })
        this.ele.live("mouseenter", function () {
            $(this).find(".close").addClass("visible");
            $(this).addClass("hov");
        })
        this.ele.live("mouseleave", function () {
            $(this).find(".close").removeClass("visible");
            $(this).removeClass("hov");
        })
    }
};
var Focus = function () {
    this.init.apply(this, arguments);
};
Focus.prototype = {
    move: function (i) {
        this.dot.find("a").eq(i).addClass("active").parent().siblings().find("a").removeClass("active");
        var data = {scrollLeft: this.ele.width() * i};
        this.main.find(".wrap").stop(true, true).animate(data, 500);
    },
    init: function (options) {
        var _this = this;
        this.main = options.main;
        this.ele = options.ele;
        this.prev = options.prev;
        this.next = options.next;
        this.dot = options.dot;
        var i = 0;
        var time = null;
        var auto = function () {
            i++;
            if (i > _this.ele.length - 1) {
                i = 0;
            }
            _this.move(i);
        }
        time = setInterval(auto, 2000);
        $(window).bind("load", function () {
            _this.main.find(".scroll").css({
                width: _this.ele.width() * _this.ele.length
            })
            _this.dot.css({
                left: (_this.main.width() - _this.dot.find("a").outerWidth(true) * _this.dot.find("a").length) / 2
            })
        })
        this.prev.bind("click", function (event) {
            event.preventDefault();
            i--;
            if (i < 0) {
                i = _this.ele.length - 1;
            }
            _this.move(i);
        })
        this.next.bind("click", function (event) {
            event.preventDefault();
            i++;
            if (i > _this.ele.length - 1) {
                i = 0;
            }
            _this.move(i);
        })
        this.dot.find("a").bind("click", function (event) {
            event.preventDefault();
            i = $(this).parent().index();
            _this.move(i);
        })
        this.main.bind("mouseenter", function (event) {
            event.preventDefault();
            if (time) {
                clearInterval(time);
            }
        })
        this.main.bind("mouseleave", function (event) {
            event.preventDefault();
            if (time) {
                clearInterval(time);
            }
            time = setInterval(auto, 2000);
        })
    }
};
var Tab = function () {
    this.init.apply(this, arguments);
};
Tab.prototype = {
    init: function (options) {
        var _this = this;
        this.main = options.main;
        this.btn = options.btn;
        this.view = options.view;
        var num = 0;
        this.btn.find("a").bind("mouseenter", function (event) {
            event.preventDefault();
            var i = $(this).parent().index();
            return function (i) {
                if (i == num) {
                    return;
                } else {
                    _this.btn.find("a").eq(num).removeClass("active");
                    _this.btn.find("a").eq(i).addClass("active");
                    _this.view.eq(num).removeClass("visible");
                    _this.view.eq(i).addClass("visible");
                    num = i
                }
            }(i)
        })
    }
};
var Header = function () {
    this.init.apply(this, arguments);
};
Header.prototype = {
    init: function (options) {
        var _this = this;
        this.main = options.main;
        this.icon = options.icon;
        var y;
        $(window).bind('load', function () {
            var _t = $(this);
            setTimeout(function () {
                y = _this.main.offset().top;
                if (_t.scrollTop() > y) {
                    _this.main.addClass("fix");
                } else {
                    _this.main.removeClass("fix");
                }
            }, 500)
        })
        $(window).bind("scroll", function () {
            if ($(this).scrollTop() > y) {
                _this.icon.find(".scroll").addClass("active");
                _this.main.addClass("fix");
            } else {
                _this.icon.find(".scroll").removeClass("active");
                _this.main.removeClass("fix");
            }
        })
    }
};
var Menu = function () {
    this.init.apply(this, arguments);
};
Menu.prototype = {
    init: function (options) {
        var _this = this;
        this.main = options.main;
        this.btn = options.btn;
        this.btn.bind("mouseenter", function (event) {
            event.preventDefault();
            $(this).find(".selected").addClass("hov")
            $(this).find(".menu").stop(true, true).animate({
                height: $(this).find(".list").outerHeight(true)
            }, 500)
            //console.log($(this).find(".list").outerHeight(true))
        })
        this.btn.bind("mouseleave", function (event) {
            event.preventDefault();
            $(this).find(".selected").removeClass("hov")
            $(this).find(".menu").stop(true, true).animate({
                height: 0
            }, 100)
        })
    }
};
var Facing = function () {
    this.init.apply(this, arguments);
};
Facing.prototype = {
    init: function (options) {
        var _this = this;
        this.ele = options.ele;

        $(window).bind("load", function () {
            var y = _this.ele.find(".float").offset().top;
            var x = _this.ele.find(".float").offset().left;
            _this.ele.find(".float").css({
                left: x,
                top: y
            })
        })
        $(window).bind("scroll", function () {
            if ($(this).scrollTop() > 0) {
                _this.ele.find(".float").addClass("fix");
                _this.ele.find(".float").css({
                    left: x,
                    top: y
                })
            } else {
                _this.ele.find(".float").removeClass("fix");
            }
        })
    }
};
var Center = function () {
    this.init.apply(this, arguments);
};
Center.prototype = {
    init: function (options) {
        var _this = this;
        this.ele = options.ele;
        $(window).bind("load", function () {
            _this.ele.find(".inside").css({
                paddingLeft: (_this.ele.width() - _this.ele.find(".inside").outerWidth(true)) / 2
            })
        })
    }
};
var Rainbow = function () {
    this.init.apply(this, arguments);
};
Rainbow.prototype = {
    init: function (options) {
        var _this = this;
        var num;
        this.ele = options.ele;
        $(window).bind("load", function () {
            _this.ele.each(function (i) {
                if (i > 3) {
                    $(this).find(".connect").css({
                        top: -8 + "px"
                    })
                    $(this).find(".view").css({
                        top: -218 + "px"
                    })

                } else {
                    $(this).find(".connect").css({
                        bottom: -8 + "px"
                    })
                    $(this).find(".view").css({
                        bottom: -218 + "px"
                    })

                }
                $(this).find(".view").css({
                    left: -(i % 4) * (210 + 8) + "px"
                })
            })
        })
        this.ele.find(".btn").bind("mouseenter", function (event) {
            event.preventDefault();
            $(this).parent().css({
                zIndex: 9
            })
            $(this).parent().siblings().css({
                zIndex: 1
            })
            $(this).parent().find(".connect").addClass("visible");
            $(this).parent().find(".view").addClass("visible");
            $(this).parent().siblings().find(".connect").removeClass("visible");
            $(this).parent().siblings().find(".view").removeClass("visible");

        })
        this.ele.find(".btn").bind("mouseleave", function (event) {
            event.preventDefault();


        })
        this.ele.find(".close").find("a").bind("click", function (event) {
            event.preventDefault();
            $(this).parents(".view").removeClass("visible");
            $(this).parents(".element").find(".connect").removeClass("visible");
        })
    }
};
var Ad = function () {
    this.init.apply(this, arguments);
};
Ad.prototype = {
    init: function (options) {
        var _this = this;
        this.ele = options.ele;
        $(window).bind("load", function () {
            setTimeout(function () {
                _this.ele.each(function () {
                    if ($(this).find("object").size()) {
                        $(this).css({
                            display: "block"
                        })
                        $(this).find("object").css({
                            /*float:"left",
                            height:"100%",
                            marginLeft:($(this).width()-$(this).find("object").attr("width"))/2*/
                        })
                    } else if ($(this).find("img").size()) {
                        $(this).css({
                            display: "block"
                        })
                        var img = new Image();
                        img.src = $(this).find("img").attr("src");
                        var _width = $(this).width();
                        var _height = $(this).height();
                        autoScaling(img, $(this).find("img"), _width, _height);
                        $(this).find("img").css({
                            marginLeft: ($(this).find("img").parent().width() - $(this).find("img").width()) / 2,
                            marginTop: ($(this).find("img").parent().height() - $(this).find("img").height()) / 2,
                            visibility: "visible"
                        })
                    }
                })
            }, 0)
        })
    }
};
var Adv = function () {
    this.init.apply(this, arguments);
};
Adv.prototype = {
    init: function (options) {
        var _this = this;
        this.ele = options.ele;
        $(window).bind("load", function () {
            setTimeout(function () {
                _this.ele.each(function () {
                    if ($(this).find("img").size()) {
                        $(this).parents(".focus").css({
                            display: "block",
                            height: 260
                        })
                        var img = new Image();
                        img.src = $(this).find("img").attr("src");
                        var _width = $(this).width();
                        var _height = $(this).height();
                        autoScaling(img, $(this).find("img"), _width, _height);
                        $(this).find("img").css({
                            marginLeft: ($(this).find("img").parent().width() - $(this).find("img").width()) / 2,
                            marginTop: ($(this).find("img").parent().height() - $(this).find("img").height()) / 2,
                            visibility: "visible"
                        })
                    }
                })
            }, 0)
        })
    }
};
(function () {
    new Box({
        ele: $(".box")
    })
    if ($(document).find(".channel").find(".categorys").size()) {
        //new Facing({
        //	ele:$(".categorys")
        //})
        new Tab({
            main: $(".tab"),
            btn: $(".tab").find(".btn"),
            view: $(".tab").find(".view")
        })
    }
    if ($(document).find(".biodome").find(".categorys").size()) {
        //new Facing({
        //	ele:$(".categorys")
        //})
    }
    if ($(document).find(".detail").size()) {
        new Menu({
            btn: $(".select")
        })
        new Tab({
            main: $(".hotspot"),
            btn: $(".hotspot").find(".btn"),
            view: $(".hotspot").find(".view")
        })

        new Tab({
            main: $(".sidebar").find(".article"),
            btn: $(".sidebar").find(".article").find(".btn"),
            view: $(".sidebar").find(".article").find(".view")
        })
    }
    if ($(document).find(".channell").size()) {
        new Hov({
            main: $(".main").find(".article"),
            ele: $(".main").find(".article").find(".element")
        })
        new Tab({
            main: $(".hotspot"),
            btn: $(".hotspot").find(".btn"),
            view: $(".hotspot").find(".view")
        })
        new Tab({
            main: $(".sidebar").find(".article"),
            btn: $(".sidebar").find(".article").find(".btn"),
            view: $(".sidebar").find(".article").find(".view")
        })
    }
    if ($(document).find(".articlel").size()) {
        new Tab({
            main: $(".hotspot"),
            btn: $(".hotspot").find(".btn"),
            view: $(".hotspot").find(".view")
        })
        new Tab({
            main: $(".sidebar").find(".article"),
            btn: $(".sidebar").find(".article").find(".btn"),
            view: $(".sidebar").find(".article").find(".view")
        })
        new Center({
            ele: $(".page")
        })
    }
    if ($(document).find(".rainbow").size()) {
        new Rainbow({
            main: $(".rainbow"),
            ele: $(".rainbow").find(".element")
        })
    }
    if ($(document).find(".banner").size()) {
        new Ad({
            ele: $(".banner")
        })
    }
    if ($(document).find(".advertisement").size()) {
        new Adv({
            ele: $(".advertisement").find(".element")
        })
    }
})()
