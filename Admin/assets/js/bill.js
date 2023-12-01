const form = document.forms['form'];
const btnAddBill = document.getElementById('btn-add-Bill');
const btnUpdateBill = document.getElementById('btn-update-Bill');

const formDataObject = {};
let total = 0;
let object;

var app = angular.module('AppBanHang', []);
app.controller('BillCtrl', function ($scope, $http) {
    $scope.CreateBill = function (data) {
        console.log('create');

        $http({
            method: 'POST',
            data,
            url: API + 'Bill/create-Bill',
        }).then(function (response) {
            alert('Bạn thêm thành công');
            location.reload();
        });
    };

    $scope.UpdateBill = function (data) {
        console.log('update');

        $http({
            method: 'POST',
            data,
            url: API + 'Bill/update-Bill',
        }).then(function (response) {
            alert('Bạn sửa  thành công');
            location.reload();
        });
    };

    $scope.DeleteBill = function (id) {
        console.log('delete');

        confirm('Bạn có chắc chắn muốn xóa?') &&
            $http({
                method: 'DELETE',
                url: API + 'Bill/delete-Bill?id=' + id,
            }).then(function (response) {
                location.reload();
                alert('Bạn xóa thành công.');
            });
    };

  

    $scope.listItem;
    $scope.GetBill = function (data) {
        $http({
            method: 'POST',
            data,
            url: API + 'Bill/search',
        }).then(function (response) {
            // debugger;
            $scope.listItem = response.data;
            total = Number(response.data.totalItems);
            reload(response.data.data, {
                DeleteBill: $scope.DeleteBill,
                GetBill: $scope.GetBill,
                listDetail: $scope.listDetail,
            });
        });
    };

    $scope.listDetail;
    $scope.display = function(x)  {
        $scope.$apply(()=>{
            $scope.listDetail = x
        })
    };

    $scope.GetBill({
        page: 1,
        pageSize: 10,
    });

    btnAddBill.onclick = () => {
        formDataObject.BillId = 0;
        console.log(formDataObject);

        $scope.CreateBill(formDataObject);
    };

    btnUpdateBill.onclick = () => {
        $scope.UpdateBill(formDataObject);
    };

    const btnSearch = document.querySelector('.btn-search');
    const searchType = document.querySelector('.search-type');
    btnSearch.onclick = () => {
        $scope.GetBill({
            page: 1,
            pageSize: 10,
            ten_khach: searchType.value,
        });
    };

    // Reload
    function reload(data, { DeleteBill, GetBill }) {
        setTimeout(() => {
            // Navigation

            const totalPages = Math.ceil(total / 10);
            document.querySelector('.navigation').innerHTML = '';
            for (let index = 0; index < totalPages; index++) {
                document.querySelector('.navigation').innerHTML += `
                <button data-id="${index + 1}" class="btn-primary">${index + 1}</button>
            `;
            }

            // Sự kiện nhấn của thanh điều hướng
            const btnNavigation = document.querySelectorAll('button[data-id]');
            btnNavigation.forEach(
                (item) =>
                    (item.onclick = () =>
                        GetBill({
                            page: item.dataset.id,
                            pageSize: 10,
                        })),
            );

            document.querySelectorAll('.Bill-item').forEach((ele, index) => {
                const btnDelete = ele.querySelector('.btn-delete-Bill');

                btnDelete.onclick = (e) => DeleteBill(e.target.dataset.id);
                ele.onclick = () => {
                    $scope.display(data[index].list_json_DetailBills)
                };
            });
        }, 100);
    }



});

form.onsubmit = (e) => {
    e.preventDefault();

    formDataObject.billId = Number(formDataObject.BillId);
    formDataObject.totalPrice = Number(formDataObject.totalPrice);
    formDataObject.customerId = Number(formDataObject.customerId);
    formDataObject.list_json_DetailBills = null;
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
