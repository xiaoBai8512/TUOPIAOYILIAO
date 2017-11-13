function addFav()
{
    var sURL = window.location.href;
    var sTitle = document.title;
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {        
        alert("加入收藏失败，请使用Ctrl+D进行添加");
    }
}
