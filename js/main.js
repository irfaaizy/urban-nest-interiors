/**
 * UrbanNest Interiors — Main Interactive Script
 * CYVEXA Level 1 Internship Project
 * 
 * Features:
 *  1. Responsive Navigation & Mobile Drawer with ARIA and focus trapping
 *  2. Header scroll observer (dynamic shadow/compact mode)
 *  3. Testimonials Carousel / Slider with auto-play and dot navigation
 *  4. Interactive FAQ Accordion with accessible ARIA states
 *  5. Animated Numbers & Statistics Counters with IntersectionObserver
 *  6. Services Filter System with animated transitions
 *  7. Floating Back-to-Top Button
 *  8. Open-Meteo Public API Integration (Chennai Weather & Site Visit Advisor)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initTestimonialCarousel();
  initFaqAccordion();
  initStatsCounter();
  initServicesFilter();
  initBackToTop();
  initWeatherWidget();
});

/* ==========================================================================
   1. Responsive Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  if (!navToggle || !navMenu) return;

  function toggleMenu(isOpen) {
    const willOpen = typeof isOpen === 'boolean' ? isOpen : !navMenu.classList.contains('open');

    navToggle.classList.toggle('open', willOpen);
    navMenu.classList.toggle('open', willOpen);
    if (navOverlay) navOverlay.classList.toggle('active', willOpen);

    navToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    navMenu.setAttribute('aria-hidden', willOpen ? 'false' : 'true');

    // Prevent body scroll when menu is active on mobile
    document.body.style.overflow = willOpen ? 'hidden' : '';

    if (willOpen) {
      // Focus first link in mobile menu for accessibility
      const firstLink = navMenu.querySelector('a');
      if (firstLink) setTimeout(() => firstLink.focus(), 150);
    } else {
      navToggle.focus();
    }
  }

  navToggle.addEventListener('click', () => toggleMenu());

  if (navOverlay) {
    navOverlay.addEventListener('click', () => toggleMenu(false));
  }

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Close drawer when clicking a navigation link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        toggleMenu(false);
      }
    });
  });

  // Highlight current page link based on pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* ==========================================================================
   2. Header Scroll Observer
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. Testimonial Carousel / Slider
   ========================================================================== */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  // Build dot indicators
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    startAutoplay();
  }

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
  track.addEventListener('focusin', stopAutoplay);
  track.addEventListener('focusout', startAutoplay);

  // Swipe support for touch screens
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    } else if (touchEndX - touchStartX > 45) {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    }
  }, { passive: true });

  startAutoplay();
}

/* ==========================================================================
   4. Interactive FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Close sibling items for single-open accordion feel
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          const otherAns = other.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (!isCurrentlyActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   5. Animated Statistics Counters
   ========================================================================== */
function initStatsCounter() {
  const counterElements = document.querySelectorAll('.stat-count');
  if (!counterElements.length) return;

  const observerOptions = {
    threshold: 0.4,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counterElements.forEach((el) => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    const duration = 2000; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = progress === 1 ? target : target * ease;

      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : target;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   6. Services Filter System
   ========================================================================== */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card[data-category]');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      serviceCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCat === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Back to Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. Public API Integration: Open-Meteo Weather for Chennai
   Endpoint: Chennai (Lat: 13.0827, Long: 80.2707)
   Advises: "Good day for a site visit?"
   ========================================================================== */
function initWeatherWidget() {
  const widget = document.getElementById('chennaiWeatherWidget');
  if (!widget) return;

  const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FKolkata';

  function renderLoading() {
    widget.innerHTML = `
      <div class="weather-loading" role="status" aria-live="polite">
        <div class="spinner" aria-hidden="true"></div>
        <p>Fetching real-time weather & site consultation forecast for Chennai...</p>
      </div>
    `;
  }

  function renderError(message) {
    widget.innerHTML = `
      <div class="weather-error" role="alert">
        <p class="weather-error-msg">⚠️ Unable to load live weather data (${escapeHTML(message)}).</p>
        <button type="button" class="btn btn-sm btn-outline-white" id="retryWeatherBtn">
          🔄 Retry Weather Forecast
        </button>
      </div>
    `;
    const retryBtn = document.getElementById('retryWeatherBtn');
    if (retryBtn) {
      retryBtn.addEventListener('click', fetchWeatherData);
    }
  }

  function getWeatherInterpretation(code) {
    // WMO Weather interpretation codes (WW)
    if (code === 0) return { title: 'Clear Sky', sub: 'Sunny & bright', visitScore: 'optimal' };
    if (code === 1 || code === 2) return { title: 'Partly Cloudy', sub: 'Pleasant natural light', visitScore: 'optimal' };
    if (code === 3) return { title: 'Overcast', sub: 'Diffused ambient light', visitScore: 'good' };
    if (code >= 45 && code <= 48) return { title: 'Foggy / Hazy', sub: 'Misty conditions', visitScore: 'fair' };
    if (code >= 51 && code <= 55) return { title: 'Light Drizzle', sub: 'Carry an umbrella', visitScore: 'fair' };
    if (code >= 61 && code <= 65) return { title: 'Rainy', sub: 'Monsoon showers in city', visitScore: 'reschedule' };
    if (code >= 80 && code <= 82) return { title: 'Heavy Showers', sub: 'Expect traffic & delays', visitScore: 'reschedule' };
    if (code >= 95) return { title: 'Thunderstorm', sub: 'Active storm warning', visitScore: 'reschedule' };
    return { title: 'Pleasant', sub: 'Standard Chennai climate', visitScore: 'good' };
  }

  function getSiteVisitVerdict(temp, rain, wind, score) {
    if (score === 'reschedule' || rain > 0.5) {
      return {
        icon: '☔',
        text: 'Rain forecast in Chennai today — We recommend an online 3D consultation or rescheduling outdoor site inspections.'
      };
    }
    if (temp > 38) {
      return {
        icon: '☀️',
        text: 'High Chennai summer temperatures — Morning or late evening visits (9:30 AM – 11:30 AM / 4:30 PM – 6:30 PM) are best.'
      };
    }
    if (score === 'optimal') {
      return {
        icon: '🌟',
        text: 'Prime day for a site visit! Clear natural daylight is perfect for room measurements, lighting audits & material checks.'
      };
    }
    return {
      icon: '🌿',
      text: 'Good conditions for an in-person design consultation at your home or our Anna Nagar studio.'
    };
  }

  async function fetchWeatherData() {
    renderLoading();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const res = await fetch(API_URL, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }

      const data = await res.json();
      if (!data || !data.current) {
        throw new Error('Invalid weather payload');
      }

      const current = data.current;
      const temp = Math.round(current.temperature_2m);
      const apparentTemp = Math.round(current.apparent_temperature);
      const humidity = current.relative_humidity_2m;
      const wind = current.wind_speed_10m;
      const rain = current.precipitation;
      const weatherCode = current.weather_code;

      const interpretation = getWeatherInterpretation(weatherCode);
      const verdict = getSiteVisitVerdict(temp, rain, wind, interpretation.visitScore);

      widget.innerHTML = `
        <div class="weather-header">
          <div class="weather-location">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Chennai, TN • Anna Nagar Hub</span>
          </div>
          <span class="weather-badge">Live Open-Meteo Feed</span>
        </div>

        <div class="weather-content">
          <div class="weather-main-temp">${escapeHTML(temp.toString())}°C</div>
          <div class="weather-condition">
            <span class="condition-title">${escapeHTML(interpretation.title)}</span>
            <span class="condition-sub">${escapeHTML(interpretation.sub)} • Feels like ${escapeHTML(apparentTemp.toString())}°C</span>
          </div>
          <div class="weather-details-grid">
            <div class="weather-detail-item">
              <span class="weather-detail-label">Humidity</span>
              <span class="weather-detail-val">${escapeHTML(humidity.toString())}%</span>
            </div>
            <div class="weather-detail-item">
              <span class="weather-detail-label">Wind Speed</span>
              <span class="weather-detail-val">${escapeHTML(wind.toString())} km/h</span>
            </div>
            <div class="weather-detail-item">
              <span class="weather-detail-label">Precipitation</span>
              <span class="weather-detail-val">${escapeHTML(rain.toString())} mm</span>
            </div>
          </div>
        </div>

        <div class="weather-verdict-banner">
          <span class="verdict-icon" aria-hidden="true">${verdict.icon}</span>
          <div>
            <strong>Good day for a site visit?</strong>
            <p style="margin: 0.2rem 0 0 0;">${escapeHTML(verdict.text)}</p>
          </div>
        </div>
      `;

    } catch (err) {
      console.warn('Weather API fetch failed, displaying graceful fallback:', err);
      renderError(err.name === 'AbortError' ? 'Connection timed out' : 'Service unreachable');
    }
  }

  fetchWeatherData();
}

/**
 * XSS-Safe HTML String Escaper
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
