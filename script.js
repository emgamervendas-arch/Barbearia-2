// ============================================
// NAVIGATION
// ============================================

const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
function handleNavScroll() {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

// Mobile toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ============================================
// ACTIVE NAV LINK (Scroll Spy)
// ============================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTop = document.getElementById('backToTop');

function handleBackToTop() {
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// FADE-IN ANIMATIONS (Intersection Observer)
// ============================================

const fadeElements = document.querySelectorAll(
  '.service-card, .about-content, .about-image-wrapper, ' +
  '.section-header, .contact-info, .contact-form-wrapper, ' +
  '.gallery-item'
);

function initFadeAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation for gallery items and service cards
          const parent = entry.target.parentElement;
          const siblings = parent ? Array.from(parent.children) : [];
          const idx = siblings.indexOf(entry.target);
          const delay = siblings.length > 1 ? idx * 100 : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
          }, 50);

          // Trigger animation after a brief delay
          requestAnimationFrame(() => {
            setTimeout(() => {
              entry.target.style.opacity = '';
              entry.target.style.transform = '';
              entry.target.classList.add('visible');
            }, delay + 50);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// ============================================
// PHONE INPUT MASK
// ============================================

const phoneInput = document.getElementById('phone');

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    e.target.value = value;
  });
}

// ============================================
// FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  // Set min date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const service = document.getElementById('service');
    const serviceText = service.options[service.selectedIndex].text;

    // Simple success feedback
    const btn = contactForm.querySelector('.btn-primary');
    const originalText = btn.textContent;
    btn.textContent = '✓ Solicitação Enviada!';
    btn.style.background = '#4a7c59';
    btn.style.borderColor = '#4a7c59';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ============================================
// HERO TITLE ANIMATION
// ============================================

function animateHeroTitle() {
  const subtitle = document.querySelector('.hero-subtitle');
  const title = document.querySelector('.hero-title');
  const description = document.querySelector('.hero-description');
  const actions = document.querySelector('.hero-actions');

  if (!subtitle || !title || !description || !actions) return;

  [subtitle, title, description, actions].forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + (i * 200));
  });
}

// ============================================
// SCROLL EVENT LISTENER
// ============================================

let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleNavScroll();
      highlightNavLink();
      handleBackToTop();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  animateHeroTitle();
  handleNavScroll();
  highlightNavLink();
  initFadeAnimations();
});
