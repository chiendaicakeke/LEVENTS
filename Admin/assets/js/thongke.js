const form = document.forms["form"];

const formDataObject = {};
let total = 0;

var app = angular.module("AppBanHang", []);
app.controller("ThongKeCtrl", function ($scope, $http) {
  const date = new Date();

  $scope.month = date.getMonth() + 1;

  $scope.listItem;
  $scope.GetBill = function (data) {
    $http({
      method: "POST",
      data,
      url: API + "Bill/search",
    }).then(function (response) {
      // debugger;
      $scope.listItem = response.data;
      total = Number(response.data.totalItems);
      reload({
        GetBill: $scope.GetBill,
      });
    });
  };

  $scope.GetBill({
    page: 1,
    pageSize: 10,
    fr_NgayTao: `${date.getFullYear()}-${date.getMonth() + 1}-01`,
    to_NgayTao: `${date.getFullYear()}-${date.getMonth() + 1}-30`,
  });

  const btnThongke = document.querySelector(".btn-thongke");
  btnThongke.onclick = () => {
    console.log(formDataObject);

    $scope.GetBill({
      page: 1,
      pageSize: 10,
      fr_NgayTao: formDataObject.fr_NgayTao,
      to_NgayTao: formDataObject.to_NgayTao,
    });
  };
});

// Reload
function reload({ GetBill }) {
  setTimeout(() => {
    // Navigation
    const totalPages = Math.ceil(total / 10);
    document.querySelector(".navigation").innerHTML = "";
    for (let index = 0; index < totalPages; index++) {
      document.querySelector(".navigation").innerHTML += `
                <button data-id="${index + 1}" class="btn-primary">${
        index + 1
      }</button>
            `;
    }

    // Sự kiện nhấn của thanh điều hướng
    const btnNavigation = document.querySelectorAll("button[data-id]");
    btnNavigation.forEach(
      (item) =>
        (item.onclick = () =>
          GetBill({
            page: item.dataset.id,
            pageSize: 10,
          }))
    );
  }, 100);
}

form.onsubmit = (e) => {
  e.preventDefault();

  console.log(formDataObject);
  Object.assign(formDataObject, convertFormData(form));
};

function convertFormData(form) {
  const formDataObject = {};
  const data = new FormData(form);
  data.forEach((value, key) => {
    formDataObject[key] = value;
  });

  return formDataObject;
}
