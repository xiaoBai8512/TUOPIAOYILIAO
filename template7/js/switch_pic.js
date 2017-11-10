var _currentTab=1;
function switchVouch(a)
{
	for(var b=1;b<=3;b++)
		if(b==a){
			$("#photo_order"+b).addClass("on");
			$("#vouch_photo"+b).fadeIn("slow");
			$("#vouch_text"+b).show()
		}else{
			$("#photo_order"+b).removeClass("on");
			$("#vouch_photo"+b).fadeOut("slow");
			$("#vouch_text"+b).hide()
		}
}
function clearAuto(){
	clearInterval(autoStart)
}
function setAuto(){
	autoStart=setInterval("auto(_currentTab)",6E3)
}
function auto(){
	_currentTab++;
	if(_currentTab>3)_currentTab=1;
	switchVouch(_currentTab)
}
setAuto();