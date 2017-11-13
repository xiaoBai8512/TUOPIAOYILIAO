var irsuser = function () {
    var _self = this;
    this._userinfo = {};//用户信息类
    this.LoadUserInfo = function () {
        var html="";
        if ($.cookies.get("iRsUserId") != null) {
            _self._userinfo.userId = Decode($.cookies.get("iRsUserId"));
            _self._userinfo.userAccount = Decode($.cookies.get("iRsUserAccount"));
            _self._userinfo.userGroup = Decode($.cookies.get("iRsUserGroup"));
            _self._userinfo.userDate = Decode($.cookies.get("iRsUserDate"));
            _self._userinfo.userType = Decode($.cookies.get("iRsUserType"));
            if ($.cookies.get("iRsUserName") != null) {
                _self._userinfo.userName = Decode($.cookies.get("iRsUserName"));
            }
            if ($.cookies.get("iRsUserNick") != null) {
                _self._userinfo.usernick = Decode($.cookies.get("iRsUserNick"));
            }
            if ($.cookies.get("iRsUserPhoto") != null) {
                _self._userinfo.userphoto = Decode($.cookies.get("iRsUserPhoto"));
            }
            $("#loginstate").attr("class", "u-icon u-icon-user2");
            html="<em class=\"u-icon u-icon-up2\"><i></i></em>";
            html+="<span class=\"u-icon u-icon-my\"><a href=\"http://center.iresearch.cn\"><i></i>我的艾瑞</a></span>";
            html+="<span class=\"u-icon u-icon-set\"><a href=\"http://center.iresearch.cn/set/\"><i></i>账户设置</a></span>";
            html += "<span class=\"u-icon u-icon-out\"><a id=\"logoutBtn\" href=\"javascript:void(0);\"><i></i>退出</a></span>";
            $('#userbox').attr("class", "u-menu u-menu-2");
        } else {
            $("#loginstate").attr("class", "u-icon u-icon-user");
            html="<em class=\"u-icon u-icon-up2\"><i></i></em>";
            html+="<span><a href=\"http://center.iresearch.cn/loginbk.shtml\">登录</a></span>";
            html += "<span><a href=\"http://center.iresearch.cn/reg.shtml\">用户注册</a></span>";
            $('#userbox').attr("class", "u-menu u-menu-1");
        }
        $('#userbox').html(html);
    }
    this.Logout = function () {
        $.ajax({
            url: "/include/page/process.aspx",
            data: ({ work: "Logout", t: Math.random() }),
            dataType: "text",
            success: function () {
                location.href = "http://www.iresearch.cn";
            }
        });
    }
    this.Favorites = function (sClassid, sNewsid) {
        if (_self._userinfo.userId) {
            var __sclassid = 0;
            var __snewsid = 0;
            if (sClassid > 0 && sNewsid > 0) {
                __sclassid = sClassid;
                __snewsid = sNewsid;
            }
            else {
                __sclassid = $("#h_classid").val();
                __snewsid = _$("#h_newsid").val();
            }
            if (__sclassid > 0 && __snewsid > 0) {
                $.ajax({
                    url: "/include/page/process.aspx",
                    data: ({ work: "Favorites", classid: __sclassid, newsid: __snewsid, t: Math.random() }),
                    dataType: "text",
                    success: function (text) {
                       // alert(text);
                        if (text == "1") {
                            irs_alert({ msg: "收藏成功！" });
                        }
                        else if (text == "-1") {
                            switch (__sclassid) {
                                case "1":
                                    irs_alert({ msg: "您已经收藏了此篇文章！" });
                                    break;
                                case "2":
                                    irs_alert({ msg: "您已经收藏了此篇文章！" });
                                    
                                    break;
                                case "3":
                                    irs_alert({ msg: "您已经关注了这位专栏作者！" });
                                   
                                    break;
                                case "4":
                                    irs_alert({ msg: "您已经收藏了此份报告！" });
                                    break;
                            }
                        }
                        else if(text=="2") {
                            irs_alert({
                                msg: "此操作需要登录！",
                                btn1: {
                                    type: "url",
                                    txte: "登录",
                                    gofn: "http://center.iresearch.cn/loginbk.shtml"
                                }
                            });
                        } else {
                            irs_alert({ msg: "好像服务器坏了，请稍候再试试！" });
                        }
                    }
                });
            }
        }
        else {
            irs_alert({
                msg: "此操作需要登录！",
                btn1: {
                    type: "url",
                    txte:"登录",
                    gofn: "http://center.iresearch.cn/loginbk.shtml"
                }
            });
        }
    }
    this.SearchGo = function () {
        var __notGo = true;
        var __keyword = $("#keywrod").val().replace(/(^\s*)|(\s*$)/g, "");
        if (__keyword == "" || __keyword == "Search") {
            return;
        }
        var enKewword = encodeURIComponent(__keyword);
        if (location.href.indexOf("http://s.iresearch.cn/") == 0) {
            __notGo = false;
            location.href = "http://s.iresearch.cn/search/" + enKewword + "/";
        }
        if (__notGo) {
            window.open("http://s.iresearch.cn/search/" + enKewword + "/");
        }

    }
}
var iu = new irsuser();
$("#userbox").ready(function () {
    iu.LoadUserInfo();
   // alert(JSON.stringify(iu._userinfo));
    if ($("#logoutBtn").length > 0) {
        $("#logoutBtn").click(function () {
            iu.Logout();
        });
    }
})
$("#searchBtn").ready(function () {
    $("#searchBtn").click(function () {
        iu.SearchGo();
    });
});
$("#keywrod").bind("keypress", function (event) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13 && document.activeElement.id == "keywrod") {
        iu.SearchGo();
    }
});