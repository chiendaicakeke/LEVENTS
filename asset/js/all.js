var app = angular.module('AppBanHang', []);
app.controller('AllCtrl', function ($scope, $http) {

    $scope.ListSanPham;
    $scope.GetSanPhamAll = function (data) {
        $http({
            url: API + 'Product/search',
            method: 'POST',
            data
        }).then(function (response) {
            debugger;
            $scope.ListSanPham = response.data.data;
        });
    };
    $scope.GetSanPhamAll({
        page: 1,
        pageSize: 12
    });
});
