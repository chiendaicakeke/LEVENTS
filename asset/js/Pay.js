const btnThanhToan = document.querySelector(".thanh-toan");

var app = angular.module("AppBanHang", []);
app.controller("PayCtrl", function ($scope, $http) {
  var urlObject = new URL(window.location.href);
  var id = urlObject.searchParams.get("id");

  $scope.ListItem;
  $scope.total;
  $scope.GetSanPham = function (id) {
    $scope.ListItem = JSON.parse(localStorage.getItem("cart")) || [];

    $scope.total = $scope.ListItem.reduce((total, num) => {
      return total + num.price;
    }, 0);
  };

  $scope.GetSanPham(id);

  $scope.ThanhToan = function (data) {
    $http({
      url: API + "Bill/create-Bill",
      method: "POST",
      data,
    }).then(function (response) {
      debugger;
      $scope.SanPham = response.data;
      alert("them hoa don thanh cong");
    });
  };

  btnThanhToan.onclick = () => {
    console.log(123);
    const newData = {
      totalPrice: $scope.total,
      status: false,
      customerId: 1,
      customerName: "string",
      list_json_DetailBills: null,
    };
    $scope.ThanhToan(newData);
  };
});
