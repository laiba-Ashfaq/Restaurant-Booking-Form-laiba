
'use strict';
/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});
/**
 * add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}
/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}
addEventOnElements(navTogglers, "click", toggleNavbar);
/**
 * HEADER & BACK TOP BTN
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;
const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPos = window.scrollY;
}
window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
/**
 * HERO SLIDER
 */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];
const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}
const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
}
heroSliderNextBtn.addEventListener("click", slideNext);
const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
}
heroSliderPrevBtn.addEventListener("click", slidePrev);
/**
 * auto slide
 */
let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
window.addEventListener("load", autoSlide);
/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;
window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;
  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);
  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});
//form validation
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    var valid = true;

     // Validate Name
     var name = document.getElementById('name');
     var nameError = document.getElementById('name-error');
     if (!name.value) {
         valid = false;
         name.classList.add('error');
         nameError.textContent = 'Please Enter your name';
     } else {
         name.classList.remove('error');
         nameError.textContent = '';
     }
     // Validate Email
    var email = document.getElementById('email');
    var emailError = document.getElementById('email-error');
    if (!email.value) {
        valid = false;
        email.classList.add('error');
        emailError.textContent = 'Please select a time';
    } else {
        email.classList.remove('error');
        emailError.textContent = '';
    }
      // Validate Phone number
    var phone = document.getElementById('phone');
    var phoneError = document.getElementById('phone-error');
    if (!phone.value) {
        valid = false;
        phone.classList.add('error');
        phoneError.textContent = 'Please Enter phone number';
    } else {
        phone.classList.remove('error');
        phoneError.textContent = '';
    }
    // Validate Person
    var person = document.getElementById('person');
    var personError = document.getElementById('person-error');
    if (!person.value) {
        valid = false;
        person.classList.add('error');
        personError.textContent = 'Please select a person';
    } else {
        person.classList.remove('error');
        personError.textContent = '';
    }
    // Validate Date
    var date = document.getElementById('datepicker');
    var dateError = document.getElementById('date-error');
    if (!date.value) {
        valid = false;
        date.classList.add('error');
        dateError.textContent = 'Please select a date';
    } else {
        date.classList.remove('error');
        dateError.textContent = '';
    }
    // Validate Time
    var time = document.getElementById('timepicker');
    var timeError = document.getElementById('time-error');
    if (!time.value) {
        valid = false;
        time.classList.add('error');
        timeError.textContent = 'Please select a time';
    } else {
        time.classList.remove('error');
        timeError.textContent = '';
    }
    // Prevent form submission if validation fails
    if (!valid) {
        event.preventDefault();
    }
});
