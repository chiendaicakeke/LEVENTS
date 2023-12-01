window.addEventListener("scroll", function () {
  if (document.documentElement.scrollTop > 100) {
    document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
  }
});

document
  .getElementById("scrollToTopBtn")
  .addEventListener("click", function () {
    3;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

var cart = document.querySelector(".button__li.cart");
cart.onclick = function () {
  location.assign("detail.html");
};

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
