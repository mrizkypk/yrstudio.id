/* YR Studio — Main JS */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnimations();
  initBackToTop();
  setActiveNavLink();
});

/* ── Navigation ── */
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    if (open) {
      mobileNav.classList.add('open');
    } else {
      mobileNav.classList.remove('open');
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

/* ── Active Nav Link ── */
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.navbar-links a, .mobile-nav a[data-nav]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    // Exact match or starts-with for section pages
    const normalized = href.replace(/\/$/, '');
    const currentNorm = path.replace(/\/$/, '');
    if (normalized && currentNorm.endsWith(normalized) && normalized !== '') {
      a.classList.add('active');
    } else if ((normalized === '' || normalized === '/index.html') && (currentNorm === '' || currentNorm === '/')) {
      a.classList.add('active');
    }
  });
}

/* ── Scroll Fade-In ── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ── Back to Top ── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
