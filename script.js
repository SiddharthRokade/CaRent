// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href !== '#') {
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Burger menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  burger.classList.toggle('toggle');
  overlay.classList.toggle('overlay-active');

  navLinks.querySelectorAll('li').forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
});

overlay.addEventListener('click', () => {
  navLinks.classList.remove('nav-active');
  burger.classList.remove('toggle');
  overlay.classList.remove('overlay-active');
  navLinks.querySelectorAll('li').forEach(link => {
    link.style.animation = '';
  });
});

// Back-to-top button functionality
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Handle booking form submission
const bookingForm = document.getElementById('booking-form');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const bookingDetails = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    pickupLocation: document.getElementById('modal-pickup-location').value,
    pickupDate: document.getElementById('modal-pickup-date').value,
    returnDate: document.getElementById('modal-return-date').value,
  };

  fetch('/api/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingDetails),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      bookingConsole.classList.add('hidden');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing your booking.');
    });
});

// Handle search cars button click
const searchCarsButton = document.getElementById('search-cars');

searchCarsButton.addEventListener('click', () => {
  const pickupLocation = document.getElementById('pickup-location').value;
  const pickupDate = document.getElementById('pickup-date').value;
  const returnDate = document.getElementById('return-date').value;

  if (pickupLocation && pickupDate && returnDate) {
    alert(`Searching cars for ${pickupLocation} from ${pickupDate} to ${returnDate}`);
    // Here you can add the logic to search for cars based on the input values
  } else {
    alert('Please fill in all fields to search for cars.');
  }
});

// Animated counters
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  counter.innerText = '0';

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const increment = target / 200;

    if (count < target) {
      counter.innerText = `${Math.ceil(count + increment)}`;
      setTimeout(updateCounter, 10);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
