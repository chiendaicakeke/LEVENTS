const form = document.forms['form'];
const btnAddProduct = document.getElementById('btn-add-product');
const btnUpdateProduct = document.getElementById('btn-update-product');

const formDataObject = {};
let total = 0;

var app = angular.module('AppBanHang', []);
app.controller('ProductCtrl', function ($scope, $http) {
    $scope.CreateProduct = function (data) {
        console.log('create');

        $http({
            method: 'POST',
            data,
            url: API + 'Product/create-Product',
        }).then(function (response) {
            alert('Bạn thêm thành công');
            location.reload();
        });
    };

    // Cập nhật khóa học
    $scope.UpdateProduct = function (data) {
        console.log('update');

        $http({
            method: 'POST',
            data,
            url: API + 'Product/update-Product',
        }).then(function (response) {
            alert('Bạn sửa  thành công');
            location.reload();
        });
    };

    $scope.DeleteProduct = function (id) {
        console.log('delete');

        confirm('Bạn có chắc chắn muốn xóa?') &&
            $http({
                method: 'DELETE',
                url: API + 'Product/delete-Product?id=' + id,
            }).then(function (response) {
                location.reload();
                alert('Bạn xóa thành công.');
            });
    };

    $scope.listItem;
    $scope.GetProduct = function (data) {
        $http({
            method: 'POST',
            data,
            url: API + 'Product/search',
        }).then(function (response) {
            // debugger;
            $scope.listItem = response.data;
            total = Number(response.data.totalItems);
            reload({
                DeleteProduct: $scope.DeleteProduct,
                GetProduct: $scope.GetProduct,
            });
        });
    };
    $scope.GetProduct({
        page: 1,
        pageSize: 10,
    });

    btnAddProduct.onclick = () => {
        formDataObject.productId = 0;
    
        $scope.CreateProduct(formDataObject);
    };

    btnUpdateProduct.onclick = () => {

        $scope.UpdateProduct(formDataObject);
    }

    //     // Sự kiện nhấn của nút tìm kiếm khóa học

    const btnSearch = document.querySelector('.btn-search')
    const searchType = document.querySelector('.search-type')
        btnSearch.onclick = () => {
            $scope.GetProduct({
                page: 1,
                pageSize: 10,
                name: searchType.value,
            });
        };
});

// Reload
function reload( { DeleteProduct, GetProduct }) {
    setTimeout(() => {
        // Navigation

        // Load thanh điều hướng theo tổng số khóa học
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
                    GetProduct({
                        page: item.dataset.id,
                        pageSize: 10,
                    })),
        );


        document.querySelectorAll('.product-item').forEach((ele, index) => {
            const btnDelete = ele.querySelector('.btn-delete-product');
            console.log("🚀 ~ file: product.js:121 ~ document.querySelectorAll ~ btnDelete:", btnDelete)

            btnDelete.onclick = (e) => DeleteProduct(e.target.dataset.id);
            
        });
    }, 100);
}

form.onsubmit = (e) => {
    e.preventDefault();
    formDataObject.productId = Number(formDataObject.productId);
    formDataObject.price = Number(formDataObject.price);
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
