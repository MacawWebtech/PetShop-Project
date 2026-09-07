/**
 * PAWSOME & CO. — main.js
 * Vanilla ES6+, no external dependencies besides Bootstrap 5 bundle.
 * Sections: Theme toggle, Search overlay, Scroll reveal, Back to top,
 *           Quantity selector, Size chips, Wishlist, Form validation,
 *           Countdown timer, Newsletter demo submit.
 */
(() => {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* 1. THEME TOGGLE (light / dark, persisted, respects system pref)     */
  /* ------------------------------------------------------------------ */
  const THEME_KEY = 'pawsome-theme';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', theme === 'dark');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  };

  const initTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  };

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  };

  document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', toggleTheme);
  });
  initTheme();

  /* ------------------------------------------------------------------ */
  /* 2. SEARCH OVERLAY                                                    */
  /* ------------------------------------------------------------------ */
  const searchOverlay = document.querySelector('.search-overlay');
  if (searchOverlay) {
    document.querySelectorAll('[data-open-search]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        const input = searchOverlay.querySelector('input');
        if (input) setTimeout(() => input.focus(), 50);
      });
    });
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });
    document.querySelectorAll('[data-close-search]').forEach((btn) => {
      btn.addEventListener('click', () => searchOverlay.classList.remove('active'));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchOverlay.classList.remove('active');
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. SCROLL REVEAL (single IntersectionObserver, reduced-motion safe) */
  /* ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal-up');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ------------------------------------------------------------------ */
  /* 4. BACK TO TOP                                                       */
  /* ------------------------------------------------------------------ */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 5. WISHLIST TOGGLE                                                   */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.wishlist-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-heart');
        icon.classList.toggle('bi-heart-fill');
      }
      btn.setAttribute('aria-pressed', btn.classList.contains('active'));
    });
  });

  /* ------------------------------------------------------------------ */
  /* 6. QUANTITY SELECTOR (product details page)                         */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.qty-selector').forEach((wrap) => {
    const input = wrap.querySelector('input');
    const min = parseInt(input?.min || '1', 10);
    const max = parseInt(input?.max || '99', 10);
    wrap.querySelector('[data-qty-minus]')?.addEventListener('click', () => {
      const val = Math.max(min, (parseInt(input.value, 10) || min) - 1);
      input.value = val;
    });
    wrap.querySelector('[data-qty-plus]')?.addEventListener('click', () => {
      const val = Math.min(max, (parseInt(input.value, 10) || min) + 1);
      input.value = val;
    });
  });

  /* ------------------------------------------------------------------ */
  /* 7. SIZE / VARIANT CHIPS                                              */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.size-options').forEach((group) => {
    group.querySelectorAll('.size-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.size-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });

  /* ------------------------------------------------------------------ */
  /* 8. PD IMAGE GALLERY THUMBNAILS                                       */
  /* ------------------------------------------------------------------ */
  const pdMain = document.querySelector('.pd-gallery-main img');
  document.querySelectorAll('.pd-thumbs button').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.pd-thumbs button').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
      const newSrc = thumb.querySelector('img')?.getAttribute('src');
      if (pdMain && newSrc) pdMain.setAttribute('src', newSrc);
    });
  });

  /* ------------------------------------------------------------------ */
  /* 9. CLIENT-SIDE FORM VALIDATION (no browser alert boxes)              */
  /* ------------------------------------------------------------------ */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[\d\s()-]{7,20}$/;

  const validateField = (field) => {
    const value = field.value.trim();
    let valid = true;

    if (field.hasAttribute('required') && value === '') {
      valid = false;
    } else if (field.type === 'email' && value !== '' && !emailPattern.test(value)) {
      valid = false;
    } else if (field.dataset.validate === 'phone' && value !== '' && !phonePattern.test(value)) {
      valid = false;
    }

    field.classList.toggle('is-invalid', !valid);
    field.classList.toggle('is-valid', valid && value !== '');
    return valid;
  };

  document.querySelectorAll('form[data-validate-form]').forEach((form) => {
    const fields = form.querySelectorAll('input, textarea, select');

    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      fields.forEach((field) => {
        if (!validateField(field)) allValid = false;
      });

      const successMsg = form.querySelector('.form-success-msg');
      const submitBtn = form.querySelector('[type="submit"]');

      if (!allValid) {
        const firstInvalid = form.querySelector('.is-invalid');
        firstInvalid?.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
      }

      // Simulated async submit — replace with fetch() to Formspree / Netlify Forms endpoint.
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        }
        if (successMsg) {
          successMsg.classList.add('show');
          successMsg.setAttribute('role', 'status');
        }
        form.reset();
        fields.forEach((f) => f.classList.remove('is-valid', 'is-invalid'));
      }, 900);
    });
  });

  /* ------------------------------------------------------------------ */
  /* 10. COUNTDOWN TIMER (Coming Soon page)                               */
  /* ------------------------------------------------------------------ */
  const countdownEl = document.querySelector('[data-countdown]');
  if (countdownEl) {
    const targetDate = new Date(countdownEl.dataset.countdown).getTime();
    const daysEl = countdownEl.querySelector('[data-cd-days]');
    const hoursEl = countdownEl.querySelector('[data-cd-hours]');
    const minsEl = countdownEl.querySelector('[data-cd-mins]');
    const secsEl = countdownEl.querySelector('[data-cd-secs]');

    const pad = (n) => String(n).padStart(2, '0');

    const tick = () => {
      const now = Date.now();
      let diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / 86400000);
      diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000);
      diff -= hours * 3600000;
      const mins = Math.floor(diff / 60000);
      diff -= mins * 60000;
      const secs = Math.floor(diff / 1000);

      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minsEl) minsEl.textContent = pad(mins);
      if (secsEl) secsEl.textContent = pad(secs);
    };

    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------------ */
  /* 11. SHOP: RANGE PRICE FILTER DISPLAY                                 */
  /* ------------------------------------------------------------------ */
  const priceRange = document.querySelector('[data-price-range]');
  const priceOutput = document.querySelector('[data-price-output]');
  if (priceRange && priceOutput) {
    const updatePrice = () => { priceOutput.textContent = `$${priceRange.value}`; };
    priceRange.addEventListener('input', updatePrice);
    updatePrice();
  }

  /* ------------------------------------------------------------------ */
  /* 12. NAVBAR ACTIVE LINK ON SCROLL SPY FALLBACK (simple aria-current) */
  /* ------------------------------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-pet .nav-link, .offcanvas-pet .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.split('/').pop() === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();
