// Product/get-new-product

var app = angular.module('AppBanHang', []);
app.controller('HomeCtrl', function ($scope, $http) {
    $scope.listSP;
    $scope.listBoPhoi;

    // var urlObject = new URL(window.location.href);
    // var id = urlObject.searchParams.get('id');

    $scope.GetSPMoi = function () {
        $http({
            url: API + 'Product/get-new-product',
            method: 'GET',
        }).then(function (response) {
            $scope.listSP = response.data;
            console.log(response.data.data);
        });
    };

    $scope.GetSPMoi();

    $scope.GetBoPhoi = function (data) {
        $http({
            url: API + 'Collection/search',
            method: 'POST',
            data: data,
        }).then(function (response) {
            $scope.listBoPhoi = response.data.data;
            console.log(response.data.data);
        });
    };

    $scope.GetBoPhoi({
        page: 1,
        pageSize: 6,
    });
});
