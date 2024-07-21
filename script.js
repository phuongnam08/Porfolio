let slideIndex = 1;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const slider = document.querySelector(".slider");
let isDown = false;
let startX;
let scrollLeft;

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Calculate the correct transform value to show the desired slide
  slider.style.transform = `translateX(-${(slideIndex - 1) * 600}px)`;

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

showSlides(slideIndex);
