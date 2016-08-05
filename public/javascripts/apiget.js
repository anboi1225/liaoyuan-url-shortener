/**
 * Created by Boyang on 2016/8/5.
 */

function apiget($scope, $http) {
    $http.get('').
    success(function(data) {
        $scope.short_url = data;
    });
}