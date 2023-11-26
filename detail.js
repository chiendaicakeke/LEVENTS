function toggleInfo() {
  var infoContent = document.querySelector(".infor");
  infoContent.style.display =
    infoContent.style.display === "none" || infoContent.style.display === ""
      ? "block"
      : "none";
}
function toggleSize() {
  var infoContent = document.querySelector(".img-size");
  infoContent.style.display =
    infoContent.style.display === "none" || infoContent.style.display === ""
      ? "block"
      : "none";
}
function toggleWarranty() {
  var policyContent = document.querySelector(".policy-content");
  policyContent.style.display =
    policyContent.style.display === "none" || policyContent.style.display === ""
      ? "block"
      : "none";
}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("img");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 1500);
}
