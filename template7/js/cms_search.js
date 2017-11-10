function hideDefault(input){
	if(typeof(input.defaultValue)=="undefined") {
		input.defaultValue = input.value;
	}
	if(input.value == input.defaultValue) {
		input.value = "";
		input.style.color = '#000000';
	}
	return true;
}

function showDefault(input){
	if(input.value == "" && typeof(input.defaultValue)!="undefined"){
		input.value = input.defaultValue;
	}
	return true;
} 

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function checkSearch() {
	var q = trim($("#q").val());
	if(q == "" || q == "请输入关键词") {
		return false;
	} else {
		$("#form_search_medlive").get(0).submit();
	}
}

function setSearchFocus(search_type, info) {
    var tab_search = document.getElementsByName('tab_search');
    var num = tab_search.length;
    if(search_type == "wiki") {
        //诊疗知识库
        for(var i=0; i<num; i++) {
            tab_search[i].className = "";
        }
        $('#tab_search_wiki').get(0).className = "current";
        document.form_search_medlive.type.value='wiki';
        document.form_search_medlive.action='/wiki/search.php';
    } else if (search_type == "info") {
        //医学资讯
        for(var i=0; i<num; i++) {
            tab_search[i].className = "";
        }
        $('#tab_search_info').get(0).className = "current";
        document.form_search_medlive.type.value='info';
        document.form_search_medlive.action='/cms.php';
    } else if (search_type == "topic") {
        //话题
        for(var i=0; i<num; i++) {
            tab_search[i].className = "";
        }
        $('#tab_search_topic').get(0).className = "current";
        document.form_search_medlive.type.value='2';
        document.form_search_medlive.action='/group/search.php';
    } else if (search_type == "res") {
        //医学资源
        for(var i=0; i<num; i++) {
            tab_search[i].className = "";
        }
        $('#tab_search_res').get(0).className = "current";
        document.form_search_medlive.type.value='res';
        document.form_search_medlive.action="/res/res_search.do";
    } else if (search_type == "case") {
        //病例
        for(var i=0; i<num; i++) {
            tab_search[i].className = "";
        }
        $('#tab_search_case').get(0).className = "current";
        document.form_search_medlive.type.value='case';
        document.form_search_medlive.action='/cms.php';
    } else if (search_type == "member") {
    	//医友
        for(var i=0; i<num; i++) {
            tab_search[i].className = "";
        }
        $('#tab_search_member').get(0).className = "current";
        document.form_search_medlive.type.value='member';
        document.form_search_medlive.action='/search.php';
    } else if (search_type == "lit") {
        //文献服务
        for ( var i = 0; i < num; i++) {
            tab_search[i].className = "";
        }
        $('#tab_search_lit').get(0).className = "current";
        document.form_search_medlive.type.value = 'lit';
        document.form_search_medlive.action = "/literature/search.php";
    } 
    
    if(info != undefined && "null" != info && "auto_search" == info) {
        var form = document.form_search_medlive;
        var keyword = $("#keyword").val();
        if(keyword != null && "" != keyword) {
            if(form != undefined) {
                form.submit();
            }
        }
    }
}

