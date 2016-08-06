/**
 * Created by Boyang on 2016/8/5.
 */

// 复制短网址链接的功能
$('.btn-copy').on('click', function(){
    var url = document.getElementById('link');
    var range = document.createRange();
    range.selectNode(url);
    window.getSelection().addRange(range);
    document.execCommand('copy');
});