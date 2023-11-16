// Lắng nghe sự kiện cuộn trang
window.addEventListener('scroll', function () {
    // Kiểm tra vị trí cuộn trang
    if (document.documentElement.scrollTop > 100) {
      // Hiển thị nút scroll top khi người dùng cuộn xuống dưới 100px
      document.getElementById('scrollToTopBtn').style.display = 'block';
    } else {
      // Ẩn nút scroll top khi người dùng ở đầu trang hoặc cuộn lên trên 100px
      document.getElementById('scrollToTopBtn').style.display = 'none';
    }
  });
  
  // Xử lý sự kiện khi nút scroll top được nhấp
  document.getElementById('scrollToTopBtn').addEventListener('click', function () {
    // Cuộn trang về đầu trang một cách mượt mà
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
var cart = document.querySelector(".button__li.cart")
cart.onclick=function(){
  location.assign('detail.html')
}
  