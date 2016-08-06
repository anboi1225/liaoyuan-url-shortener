/**
 * Created by Boyang on 2016/8/6.
 */

function indexctrl($scope, $http){
    // http.get().success(function (response) {
    //     $window.location.href = response.nu;
    // })

    $scope.showsu = function () {
        $http({
            method : 'POST',
            url : '/api/shortening',
            data : {url: $('#url-field').val()},
        }).success(function (response) {
                $scope.c_short_url = response.shortUrl;
                $('#link').hide().fadeIn('slow');
                $('#bh').hide().fadeIn('slow');
                $('#bh').show();
        })
    }
}

