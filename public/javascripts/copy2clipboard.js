/**
 * Created by Boyang on 2016/8/5.
 */

$('.btn-copy').on('click', function(){

    var url = document.getElementById('link');
    var range = document.createRange();
    range.selectNode(url);
    window.getSelection().addRange(range);
    document.execCommand('copy');

});