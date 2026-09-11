/**
 * Inertia Electric Motors Solutions - Master JavaScript Controller
 * High-performance, dependency-free vanilla JS for navigation, motion, modals & RFQ.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initRollingWords();
  initStatsCounters();
  initScrollReveal();
  initQuoteModal();
  initContactForms();
  initPingPongTickers();
});

/* ==========================================================================
   Navigation & Header
   ========================================================================== */

function initNavigation() {
  const header = document.querySelector('.main-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Sticky header transition on scroll
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile drawer toggle
  if (mobileToggle && mobileMenu) {
    const closeDrawer = () => {
      mobileMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    const closeBtn = mobileMenu.querySelector('.home-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeDrawer();
    });

    // Close on navigation link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Highlight active link based on current pathname
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href').toLowerCase();
    if (
      (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === '') &&
      (href === 'index.html' || href === './' || href === '/')
    ) {
      link.classList.add('active');
    } else if (currentPath.includes('about') && href.includes('about')) {
      link.classList.add('active');
    } else if (currentPath.includes('product') && href.includes('product')) {
      link.classList.add('active');
    } else if (currentPath.includes('industr') && href.includes('industr')) {
      link.classList.add('active');
    } else if (currentPath.includes('contact') && href.includes('contact')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   Rolling Words Hero Animation
   ========================================================================== */

function initRollingWords() {
  const container = document.querySelector('.rolling-words');
  if (!container) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.textContent = 'Manufacturing Plants';
    return;
  }

  const words = [
    'Manufacturing Lines',
    'Cement Plants',
    'Pharma Cleanrooms',
    'Water Treatment Works',
    'Steel Rolling Mills',
    'Industrial HVAC'
  ];

  let currentIndex = 0;
  container.textContent = words[currentIndex];

  setInterval(() => {
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % words.length;
      container.textContent = words[currentIndex];
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 280);
  }, 3200);

  container.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
}

/* ==========================================================================
   Animated Statistics Counters (IntersectionObserver)
   ========================================================================== */

function initStatsCounters() {
  const statElements = document.querySelectorAll('[data-counter-target]');
  if (!statElements.length) return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReduced) {
    statElements.forEach(el => {
      el.textContent = el.getAttribute('data-counter-target');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  statElements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter-target'), 10);
  const suffix = el.getAttribute('data-counter-suffix') || '';
  const duration = 1400; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current + (progress === 1 ? suffix : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */

function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll, .stagger-parent').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const elements = document.querySelectorAll('.reveal-on-scroll, .stagger-parent');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Interactive Quote / RFQ Modal
   ========================================================================== */

function initQuoteModal() {
  const modalBackdrop = document.getElementById('quoteModal');
  if (!modalBackdrop) return;

  const openButtons = document.querySelectorAll('.open-quote-modal');
  const closeButtons = modalBackdrop.querySelectorAll('.modal-close, .modal-cancel');
  const quoteForm = document.getElementById('globalQuoteForm');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefillProduct = btn.getAttribute('data-product-name');
      if (prefillProduct && quoteForm) {
        const motorField = quoteForm.querySelector('#quoteMotorType');
        if (motorField) motorField.value = prefillProduct;
      }
      openModal(modalBackdrop);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => closeModal(modalBackdrop));
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal(modalBackdrop);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal(modalBackdrop);
    }
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(quoteForm);
      const name = formData.get('name') || 'Valued Client';
      const phone = formData.get('phone') || '';
      const motor = formData.get('motor') || 'Industrial Motor Requirement';
      const power = formData.get('power') || '';
      const notes = formData.get('notes') || '';

      // Direct WhatsApp transfer option
      const waText = encodeURIComponent(
        `*New Quotation Request - Inertia Electric Motors*\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone}\n` +
        `• Motor Type: ${motor}\n` +
        `• Power/Spec: ${power}\n` +
        `• Notes: ${notes}`
      );

      closeModal(modalBackdrop);
      quoteForm.reset();

      showToast(`Thank you ${name}! Your quotation inquiry has been received. Our technical team will reply within 24h.`, 'success');

      // Offer opening WhatsApp directly
      setTimeout(() => {
        if (confirm('Would you also like to send this requirement directly on WhatsApp for priority quotation?')) {
          window.open(`https://wa.me/919000000000?text=${waText}`, '_blank');
        }
      }, 600);
    });
  }
}

function openModal(modal) {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ==========================================================================
   Contact Page Form & WhatsApp RFQ
   ========================================================================== */

function initContactForms() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const subjectPills = document.querySelectorAll('.choice-pill');
  let selectedSubject = 'Product enquiry';

  subjectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      subjectPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSubject = pill.textContent.trim();
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Client';
    const phone = document.getElementById('contactPhone')?.value || '';
    const company = document.getElementById('contactCompany')?.value || 'N/A';
    const message = document.getElementById('contactMessage')?.value || '';

    if (!phone) {
      alert('Please provide a contact phone or WhatsApp number so our technical team can reach you.');
      return;
    }

    showToast(`Thank you, ${name}! Your message regarding "${selectedSubject}" has been received. We will respond promptly.`, 'success');
    contactForm.reset();
  });

  const waSendBtn = document.getElementById('contactWhatsAppSend');
  if (waSendBtn) {
    waSendBtn.addEventListener('click', () => {
      const name = document.getElementById('contactName')?.value || 'Client';
      const phone = document.getElementById('contactPhone')?.value || '';
      const company = document.getElementById('contactCompany')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';

      const text = encodeURIComponent(
        `*Inertia Electric Motors - B2B Enquiry*\n` +
        `• Subject: ${selectedSubject}\n` +
        `• Name: ${name}\n` +
        `• Company: ${company}\n` +
        `• Phone: ${phone}\n` +
        `• Details: ${message || 'Please send catalog and price list'}`
      );

      window.open(`https://wa.me/919000000000?text=${text}`, '_blank');
    });
  }
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

// Global WhatsApp redirect helper
window.openWhatsAppQuote = function(productName = '') {
  let msg = 'Hello Inertia Electric Motors, I would like to request a quotation and technical specifications';
  if (productName) {
    msg += ` for: *${productName}*`;
  }
  window.open(`https://wa.me/919000000000?text=${encodeURIComponent(msg)}`, '_blank');
};

/* ==========================================================================
   Ping-Pong Tickers (Brands & Product Categories)
   Dynamic Travel Distance = Track Width - Container Width
   Smooth Ease-In-Out, Alternate Direction, Infinite Loop, Pause-on-Hover
   ========================================================================== */

function initPingPongTickers() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const brandsTrack = document.getElementById('brandsTrack') || document.querySelector('.brands-ticker-track, .ticker-track');
  const brandsContainer = brandsTrack ? (brandsTrack.closest('.ticker-container') || brandsTrack.parentElement) : null;

  const productsTrack = document.getElementById('productTrack') || document.getElementById('productTicker') || document.querySelector('.product-ticker-track');
  const productsContainer = productsTrack ? (productsTrack.closest('.ticker-container') || productsTrack.parentElement) : null;

  let keyframeStyle = document.getElementById('ping-pong-keyframes');
  if (!keyframeStyle) {
    keyframeStyle = document.createElement('style');
    keyframeStyle.id = 'ping-pong-keyframes';
    document.head.appendChild(keyframeStyle);
  }

  function getDistance(track, container) {
    if (!track || !container) return 0;
    const containerWidth = container.clientWidth || container.getBoundingClientRect().width;
    const trackWidth = track.scrollWidth;
    return Math.max(0, Math.round(trackWidth - containerWidth));
  }

  function update() {
    const brandsTravel = getDistance(brandsTrack, brandsContainer);
    const productsTravel = getDistance(productsTrack, productsContainer);

    if (brandsTrack) {
      brandsTrack.style.setProperty('--brands-travel', `-${brandsTravel}px`);
    }
    if (productsTrack) {
      productsTrack.style.setProperty('--products-travel', `-${productsTravel}px`);
    }

    // Dynamic keyframes matching exact available travel distance
    keyframeStyle.textContent = `
      @keyframes pingPongBrands {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-${brandsTravel}px, 0, 0); }
      }
      @keyframes pingPongProducts {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-${productsTravel}px, 0, 0); }
      }
    `;
  }

  // Calculate immediately
  update();

  // Recalculate once window is completely loaded (including webfonts & images)
  window.addEventListener('load', update);

  // Recalculate on window resize
  let rafId;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(update);
  }, { passive: true });

  // Use ResizeObserver for accurate container / element tracking
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      update();
    });
    if (brandsContainer) ro.observe(brandsContainer);
    if (brandsTrack) ro.observe(brandsTrack);
    if (productsContainer) ro.observe(productsContainer);
    if (productsTrack) ro.observe(productsTrack);
  }

  // Touch handlers for mobile (pause while touching, resume when released)
  [brandsTrack, productsTrack].forEach(track => {
    if (!track) return;
    track.addEventListener('touchstart', () => {
      track.style.animationPlayState = 'paused';
    }, { passive: true });
    track.addEventListener('touchend', () => {
      track.style.animationPlayState = 'running';
    }, { passive: true });
    track.addEventListener('touchcancel', () => {
      track.style.animationPlayState = 'running';
    }, { passive: true });
  });
}

