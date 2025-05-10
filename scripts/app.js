const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let currentIndex = 0;

function updateSlidePosition() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

next.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
});

prev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
});

// Auto-slide
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
}, 5000);

// Initialize
updateSlidePosition();
