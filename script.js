let slideIndex = 1;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const slider = document.querySelector(".slider");
let isDown = false;
let startX;
let scrollLeft;

function getSlideWidth() {
  return window.matchMedia("(max-width: 768px)").matches ? 400 : 600;
}

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  const slideWidth = getSlideWidth();
  slider.style.transform = `translateX(-${(slideIndex - 1) * slideWidth}px)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === slideIndex - 1);
  });
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

// Mouse dragging functionality
slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.getBoundingClientRect().left;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", (e) => {
  isDown = false;
  const x = e.pageX - slider.getBoundingClientRect().left;
  const walk = x - startX;
  if (walk < -50) {
    slideIndex = Math.min(slideIndex + 1, slides.length);
  } else if (walk > 50) {
    slideIndex = Math.max(slideIndex - 1, 1);
  }
  showSlides(slideIndex);
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.getBoundingClientRect().left;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});

// Lắng nghe sự kiện resize để cập nhật slider
window.addEventListener("resize", () => {
  showSlides(slideIndex);
});

// Hiển thị slide ban đầu
showSlides(slideIndex);
