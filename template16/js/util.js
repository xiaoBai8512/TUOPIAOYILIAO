function isMobile(mobile){
	var matchrs = mobile.match(/^((13[0-9])|(14[5,7])|(15[^4,\D])|(17[0,6,7,8])|(18[0-9]))\d{8}$/);
	return matchrs;
}

function isEmail(email){
	return email.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/);
}
//计算字符串长度
function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) { 
     var c = str.charCodeAt(i); 
    //单字节加1 
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
       len++; 
     } 
     else { 
      len+=2; 
     } 
    } 
    return len;
}