/**
 * Created by Boyang on 2016/8/6.
 */

//创建AngularJS controller用于前端调用RESTful API
function indexctrl($scope, $http){
    $scope.showsu = function () {
        // 发送POST http请求
        $http({
            method : 'POST',
            url : '/api/shortening',
            data : {url: $('#url-field').val()},
        }).success(function (response) {
                // 返回接收到的短网址信息供前端显示
                $scope.c_short_url = response.shortUrl;
                $('#link').hide().fadeIn('slow');
                $('#bh').hide().fadeIn('slow');
                $('#bh').show();
        })
    }
}