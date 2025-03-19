const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
});

// --------------------Animation for slider ----------
window.addEventListener('scroll', function() {
    const partnerContainer = document.querySelector('.partner-container');
    const rect = partnerContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
  
    if (rect.top <= windowHeight * 0.8) {
      partnerContainer.classList.add('scroll-active');
    }
  });

//   ---------------------- Comment Slider ----------
const slider = document.querySelector('.comments');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let scrollAmount = 0;
const scrollStep = slider.querySelector('.each-comment').offsetWidth + 25; // Include the gap
const maxScroll = slider.scrollWidth - slider.clientWidth;

rightArrow.addEventListener('click', () => {
    scrollAmount += scrollStep;
    if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    slider.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

leftArrow.addEventListener('click', () => {
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) scrollAmount = 0;
    slider.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
});


// --------------Scroll on the Professional Section on Telemedicine ----------------

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.doctor-slider');
    
    if (!slider) {
        console.error("Slider element not found");
        return;
    }

    let scrollAmount = 0;
    const scrollStep = 300; // Amount to scroll with each button click

    function scrollLeft() {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }

    function scrollRight() {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        scrollAmount += scrollStep;
        if (scrollAmount > maxScroll) {
            scrollAmount = maxScroll;
        }
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }

    // Attach the functions to the buttons
    document.querySelector('.left-btn').addEventListener('click', scrollLeft);
    document.querySelector('.right-btn').addEventListener('click', scrollRight);
});

// Educational Information Scroll Effect on the Resources Section
// JavaScript for Scroll Buttons
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const resourcesItems = document.querySelector('.resources-items');

leftBtn.addEventListener('click', () => {
  resourcesItems.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

rightBtn.addEventListener('click', () => {
  resourcesItems.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;

  const updateSlider = () => {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slider.children.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });
});

// ----- Login Message -----
document.getElementById('account-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Account created successfully!');
});

