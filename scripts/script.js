const navbar = document.querySelector('.navbar');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');
const cards = document.querySelectorAll('.card-slide');
let isMenuOpen = false;

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle mobile menu
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileNavToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

mobileNavToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) toggleMenu();
});

// Prevent scroll when menu is open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }
});            

// Smooth scroll and activate navbar link when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      window.scrollTo({
          top: targetElement.offsetTop - document.querySelector('.navbar').offsetHeight, // Subtract navbar height
          behavior: 'smooth'
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");
  
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        // Remove 'active-link' from all
        navLinks.forEach(nav => nav.classList.remove("active-link"));
        // Add 'active-link' to the clicked one
        link.classList.add("active-link");
      });
    });
  });

// Make the first card active
if (cards.length > 0) {
    cards[0].classList.add('active');
}
  
cards.forEach(card => {
    card.addEventListener('click', () => {
      // If this card is already active, redirect
      if (card.classList.contains('active')) {
        const targetUrl = card.getAttribute('data-href');
        if (targetUrl) {
          window.open(targetUrl, '_blank'); // open in a new tab
        }
      } else {
        // Otherwise, just make it active
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  });