//为jquery 增加扩展方法 使艾瑞网的头部导航浮动
$.fn.smartFloat = function () {
    var position = function (element) {
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 0
                    });
                } else {
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos,
                    top: top
                });
            }
        });
    };
    return $(this).each(function () {
        position($(this));
    });
};

function ShowElement(sElement) {
    if ($(sElement).length > 0) {
        if ($(sElement).hasClass("hidden")) {
            $(sElement).removeClass("hidden");
        }
        else {
            $(sElement).addClass("hidden");
        }
    }
}

//验证邮箱地址
function CheckEmail(sText) {
    re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!re.test(sText)) {
        return false;
    }
    return true;
}

//验证手机格式
function CheckMobile(sText) {
    re = /^\d{11}$/;
    if (!re.test(sText)) {
        return false;
    }
    return true;
}

//验证电话格式
function CheckPhone(sText) {
    //"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"
    re = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,11})(-(\d{3,}))?$/;
    if (!re.test(sText)) {
        return false;
    }
    return true;
}


//对话框函数
function BoxHtml(data) {
    var sData = { title: "信息提示", info: "", button: "<input name=\"closeBtn\" id=\"closeBtn\"  type=\"button\" class=\"button\" value=\" 关闭 \" onclick=\"CloseBox();\"/>" };
    if (data) {
        if (data.title) {
            sData.title = data.title;
        }
        if (data.info) {
            sData.info = data.info;
        }
        if (data.button) {
            sData.button = data.button;
        }
    }
    if ($(".dialog-box").length == 0) {
        var html = "<div id=\"AlertBox\" class=\"dialog-box\">\r\n";
        html += "   <div class=\"float_win\">\r\n";
        html += "       <div class=\"float_win_title\"><span class=\"float_win_close\"><a href=\"javascript:void(0);\"><img src=\"/include/images/Icon_6.gif\" /></a></span><span class=\"float_win_n\"></span></div>\r\n";
        html += "       <div class=\"float_win_article\">\r\n";
        html += "       </div>\r\n";
        html += "       <div class=\"float_win_footer\">\r\n";
        html += "           <div id=\"ButtonBox\" class=\"winLandedzt\">\r\n";
        html += "           </div>\r\n";
        html += "       </div>\r\n";
        html += "   </div>\r\n";
        html += "   <div class=\"dialog-boxbg\"></div>\r\n";
        html += "</div>\r\n";
        $("body").append(html);
        $(".float_win_close img").click(function () { CloseBox("AlertBox"); });
    }
    //为对话框添加信息
    //.Pop_up_title_name title
    $(".float_win_n").html(sData.title);
    //.info info
    $(".float_win_article").html(sData.info);
    //.Pop_up_button button
    $("#ButtonBox").html(sData.button);
    document.getElementById("AlertBox").style.top = (document.documentElement.clientHeight - document.getElementById("AlertBox").clientHeight) / 2 + "px";
}

function ChangeHeight() {
    document.getElementById("AlertBox").style.top = (document.documentElement.clientHeight - document.getElementById("AlertBox").clientHeight) / 2 + "px";
}

//关闭对话框
function CloseBox(id) {
    if ($("#" + id).length > 0) {
        $("#" + id).remove();
    }
    else {
        if ($(".dialog-box").length > 0) {
            $(".dialog-box").remove();
        }
    }
}

//字符解码
function Decode(str) {
    var strArr;
    var strRtn = "";
    if (str != null && str != "") {
        str = str.toString();
        if (str.indexOf('a') > 1) {
            strArr = str.split('a');
            for (var i = strArr.length - 1; i >= 0; i--) {
                strRtn += String.fromCharCode(eval(strArr[i]));
            }
            return strRtn;
        }
        else {
            return String.fromCharCode(eval(str));
        }
    }
    return null;
}

//js 克隆对象函数
function clone(myObj) {
    if (typeof (myObj) != 'object') return myObj;
    if (myObj == null) return myObj;
    var myNewObj = new Object();
    for (var i in myObj)
        myNewObj[i] = clone(myObj[i]);
    return myNewObj;
}

//全选CheckBox
function AllChecked(sName) {
    $("[name='" + sName + "']").each(function () { $(this).attr("checked", "true"); });
}

//全取消CheckBox
function CancelChecked(sName) {
    $("[name='" + sName + "']").each(function () { $(this).removeAttr("checked"); });
}

//在莫窗口中打开传入的网站页面
//url：要在莫窗口中打开打开的页面地址
function OpenWin(sUrl) {
    $.ajax({
        url: sUrl,
        data: ({ t: Math.random() }),
        dataType: "html",
        async: false,
        success: function (sHtml) {
            if ($(".dialog-box").length == 0) {
                $("body").prepend("<div class=\"dialog-box\" id=\"AlertBox\"><div class=\"float_win\" id=\"float_win\" ></div><div class=\"dialog-boxbg\"></div></div>");
            }
            $(".float_win").html(sHtml);
            document.getElementById("float_win").style.top = (document.documentElement.clientHeight - document.getElementById("float_win").clientHeight) / 2 + "px";
        }
    });
}

//在莫窗口中打开传入的网站页面
//url：要在莫窗口中打开打开的页面地址
function OpenWinDownInfo(sUrl) {
    $.ajax({
        url: sUrl,
        data: ({ t: Math.random() }),
        dataType: "html",
        success: function (sHtml) {
            if (sHtml == "active"){ location.href = "http://center.iresearch.cn/active.aspx"; }
            if ($(".dialog-box").length == 0) {
                $("body").prepend("<div class=\"dialog-box\" id=\"AlertBox\"><div class=\"float_win\" id=\"float_win\" ></div><div class=\"dialog-boxbg\"></div></div>");
            }
            $(".float_win").html(sHtml);
            document.getElementById("float_win").style.top = (document.documentElement.clientHeight - document.getElementById("float_win").clientHeight) / 2 + "px";
        }
    });
}


function Subscribe(id) {
    var __data = new Object();
    if ($("#"+id).length == 1) {
        if ($("#"+id).val() == "") {
            irs_alert({ msg: "请填写您的邮箱!" });
            return false;
        }
        else if (!CheckEmail($("#"+id).val())) {
            irs_alert({ msg: "请正确填写您的邮箱!" });
            return false;
        }
        $.ajax({
            url: "/include/page/process.aspx",
            data: ({ work: "Subscribe", Email: $("#"+id).val(), t: Math.random() }),
            dataType: "text",
            success: function (text) {
                if (text == "1") {
                    irs_alert({ msg: "已向您的邮箱发送了服务邮件，请尽快登录您的邮箱确认!" });
                }
                else if (text == "0") {
                    irs_alert({ msg: "您已经订阅过邮件服务了，如不能收到邮件请联系管理员!" });
                }
                else {
                    irs_alert({ msg: "您的邮件格式不正确，请填写正确的邮箱地址!" });
                }
                $("#"+id).val("");
            }
        });
    }
}

function ZtDownInfo(freeid){
   OpenWin("/include/page/downinfo.aspx?Freeid=" + id);

}

function CheckInput(sName, sPrompt) {
    if ($("#" + sName).val() == "") {
        $("#" + sName + "_Div p").attr("class", "error");
        $("#" + sName + "_Div p").html("<span>" + sPrompt + "</span>");
        return false;
    }
    else {
        $("#" + sName + "_Div p").attr("class", "correct");
        $("#" + sName + "_Div p").html("<span>正确</span>");
        return true;
    }
}
function irs_alert(option) {
    var btn2 = "<a class=\"u-btn u-btn-c4\" id=\"alert-btn-2\" href=\"javascript:void(0);\">关闭</a>";
    var btn1 = "";
    $("#alert-msg").html(option.msg);
    if (option.btn1) {
        switch (option.btn1.type) {
            case "url":
                btn1 = "<a class=\"u-btn u-btn-sub\" id=\"alert-btn-1\" href=\"" + option.btn1.gofn + "\">" + option.btn1.txte + "</a>";
                break;
            case "fn":
                btn1 = "<a class=\"u-btn u-btn-sub\" id=\"alert-btn-1\"  href=\"javascript:void(0);\">" + option.btn1.txte + "</a>"
                break;
        }
    }
    $("#alert-btn").html(btn1 + btn2);
    $("#alert-btn-2").click(function () {
        $("#alert-warp").slideUp(200);
    });
    if (option.btn1) {
        if (option.btn1.type === "fn") {
            $("#alert-btn-1").click(option.btn1.gofn);
        } 
    }
    $("#alert-warp").slideDown(200);
}
 //极验验证
function CheckUserRandon() {
    var rev;
    var challenge = $("input[name='geetest_challenge']").val();
    var validate = $("input[name='geetest_validate']").val();
    var seccode = $("input[name='geetest_seccode']").val();
    // $("#Random").attr("disabled", "true");
    $.ajax({
        url: "/include/ajax/news_ajax.ashx",
        async: false,
        data: ({ work: "CheckRandom1", geetest_challenge: challenge, geetest_validate: validate, geetest_seccode: seccode, t: Math.random() }),
        dataType: "text",
        success: function (text) {

            // $("#Random").removeAttr("disabled");
            if (text == "1") {
                rev = true;
            }
            else {
                rev = false;
            }
        }
    });
    return rev;
}
function gtInit(obj) {
    var handler = function (captchaObj) {
        // 将验证码加到id为captcha的元素里
        captchaObj.appendTo(obj.appendto);
        if (obj.prod === "popup") {
            captchaObj.bindOn(obj.bindon);
            captchaObj.enable();
        }
        captchaObj.onSuccess(obj.fn(captchaObj));
        
    };
    $.ajax({
        // 获取id，challenge，success（是否启用failback）
        url: '/include/pages/process.ashx?t=' + (new Date()).getTime(),     
        type: "get",
        data: { work: 'checkcaptcha' },
        dataType: "json", // 使用jsonp格式
        success: function (data) {
            // 使用initGeetest接口
            // 参数1：配置参数，与创建Geetest实例时接受的参数一致
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: obj.prod, // 产品形式
                offline: !data.success
            }, handler);
        }
    });
}