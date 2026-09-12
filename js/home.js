/**
 * Inertia Electric Motors — Home Page Visual Enhancements
 * Premium motion: hero pointer depth, image frame scroll parallax, directional section timing.
 * Harmonizes with CSS back-and-forth (ping-pong) motion system.
 * Does not alter business logic, tickers, or modals (handled in main.js).
 */

function initHome() {
  if (!document.body.classList.contains('home-page')) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  initHeroSlideshow();
  initHeroParallax();
  initImageParallax();
  initCtaReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHome);
} else {
  initHome();
}

/* --------------------------------------------------------------------------
   Hero — subtle pointer depth on inner content
   (Background layers use pure GPU-accelerated CSS ping-pong keyframes)
   -------------------------------------------------------------------------- */

function initHeroParallax() {
  const hero = document.querySelector('.home-hero');
  const heroInner = document.querySelector('.home-hero-inner');
  if (!hero || !heroInner) return;

  let ticking = false;
  let pointerX = 0;
  let pointerY = 0;

  const apply = () => {
    ticking = false;
    heroInner.style.transform = `translate3d(${pointerX * 6}px, ${pointerY * 4}px, 0)`;
  };

  const requestTick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  };

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    pointerX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    pointerY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    requestTick();
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    pointerX = 0;
    pointerY = 0;
    requestTick();
  });

  requestTick();
}

/* --------------------------------------------------------------------------
   Engineers dual-frame — restrained scroll parallax on frame container
   (Main and sub image boxes use CSS horizontal ping-pong keyframes)
   -------------------------------------------------------------------------- */

function initImageParallax() {
  const frame = document.querySelector('.home-dual-frame');
  if (!frame) return;

  let ticking = false;

  const apply = () => {
    ticking = false;
    const rect = frame.getBoundingClientRect();
    const viewH = window.innerHeight;
    if (rect.bottom < 0 || rect.top > viewH) return;

    const center = rect.top + rect.height / 2;
    const offset = (center - viewH / 2) / viewH;
    frame.style.transform = `translate3d(0, ${offset * -14}px, 0)`;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  }, { passive: true });

  apply();
}

/* --------------------------------------------------------------------------
   Final CTA — directional entrance on scroll (left/right ping-pong settle)
   -------------------------------------------------------------------------- */

function initCtaReveal() {
  const band = document.querySelector('.home-cta-band');
  if (!band) return;

  const leftContent = band.querySelector('.home-cta-inner > div:first-child');
  const actions = band.querySelector('.home-cta-actions');
  const targets = [
    { el: leftContent, from: 'translate3d(-24px, 0, 0)' },
    { el: actions, from: 'translate3d(24px, 0, 0)' }
  ].filter(t => Boolean(t.el));

  if (!targets.length) return;

  targets.forEach(({ el, from }) => {
    el.style.opacity = '0';
    el.style.transform = from;
    el.style.transition = 'opacity 0.62s cubic-bezier(0.16, 1, 0.3, 1), transform 0.62s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      targets.forEach(({ el }, i) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0)';
        }, i * 90);
      });
      observer.disconnect();
    });
  }, { threshold: 0.25 });

  observer.observe(band);
}

/* --------------------------------------------------------------------------
   Hero — Authentic Background Slideshow (5-7s smooth crossfade)
   Image 1 -> Image 2 -> Image 3 -> Image 4 -> Image 1
   -------------------------------------------------------------------------- */

function initHeroSlideshow() {
  const slides = document.querySelectorAll('.home-hero-slide');
  if (slides.length <= 1) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  let currentIndex = 0;
  const slideDuration = 6000; // ~6 seconds per image

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, slideDuration);
}


