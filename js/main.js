/**
 * main.js - Core functionality for the 'Find My Solution' website
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Behavior
  const navbar = document.querySelector('.navbar-premium');
  const scrollTopBtn = document.querySelector('.floating-btn-top');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
      scrollTopBtn?.classList.add('visible');
    } else {
      navbar?.classList.remove('scrolled');
      scrollTopBtn?.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run

  // Scroll to Top action
  scrollTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 2. Animated Counters
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the slower

  const runCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('+', '');
        const inc = target / speed;

        if (count < target) {
          counter.innerText = `${Math.ceil(count + inc)}+`;
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = `${target}+`;
        }
      };
      updateCount();
    });
  };

  // Trigger counters when in viewport
  if (counters.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      counterObserver.observe(statsSection);
    }
  }

  // 3. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
      once: true,
      mirror: false
    });
  }

  // 4. Initialize Swiper Sliders
  // Featured Projects Slider (Home Page)
  if (document.querySelector('.projects-slider') && typeof Swiper !== 'undefined') {
    new Swiper('.projects-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      }
    });
  }

  // Testimonials Slider (Home & Testimonials page)
  if (document.querySelector('.testimonials-slider') && typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        }
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      }
    });
  }

  // Before/After Slider Interaction
  const baContainer = document.querySelector('.ba-container');
  if (baContainer) {
    const slider = baContainer.querySelector('.ba-slider');
    const beforeImage = baContainer.querySelector('.ba-image:first-child');
    const handle = baContainer.querySelector('.ba-handle');

    const updateSlider = (value) => {
      beforeImage.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
      handle.style.left = `${value}%`;
    };

    // Initialize values on load
    updateSlider(slider.value);

    slider.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });
  }
});
