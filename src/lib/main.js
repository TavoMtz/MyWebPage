/* =========================================================
   MAIN.JS — Interactions & Micro-animations
   Luminescent Monolith Portfolio
   ========================================================= */

'use strict';

// ── Scroll Reveal ──────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ── Active Nav Link on Scroll ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((s) => sectionObserver.observe(s));

// ── Nav scroll state ──────────────────────────────────────
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 32) {
    nav.style.background = 'rgba(19, 19, 19, 0.85)';
  } else {
    nav.style.background = 'rgba(53, 53, 52, 0.6)';
  }
}, { passive: true });

// ── Card "Content Spotlight" cursor glow ──────────────────
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ── Hero headline text reveal clip animation ──────────────
const heroHeadline = document.getElementById('hero-headline');

if (heroHeadline) {
  heroHeadline.style.clipPath = 'inset(0 100% 0 0)';
  heroHeadline.style.transition = 'clip-path 700ms cubic-bezier(0.16, 1, 0.3, 1)';

  // Trigger after a short delay so the element is painted
  requestAnimationFrame(() => {
    setTimeout(() => {
      heroHeadline.style.clipPath = 'inset(0 0% 0 0)';
    }, 300);
  });
}

// ── Smooth anchor scroll with offset ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 72; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Staggered badge animations (reset on load) ────────────
document.querySelectorAll('.hero__badge').forEach((badge, i) => {
  badge.style.animationDelay = `${i * 0.5}s`;
});

console.log('%c🚀 Gustavo Martinez — Portfolio loaded',
  'color: #FFC107; font-weight: 700; font-size: 14px;');

// ── Mobile Menu Toggle ─────────────────────────────────────
(function () {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // Cerrar al hacer clic en cualquier enlace o botón del menú
  menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav__link') || e.target.classList.contains('nav__cta') || e.target.closest('.nav__cta')) {
      closeMenu();
    }
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open') && !menu.contains(e.target) && e.target !== toggle) {
      closeMenu();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });
})();


// ── Contact Modal & EmailJS ────────────────────────────────
const btnContact = document.getElementById('nav-contact');
const modal = document.getElementById('contact-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const btnSubmit = document.getElementById('btn-submit-form');

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init({
    publicKey: "DXrIDRdffZ5A-6tOz",
  });
}

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  btnContact.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  // Focus trap could be added here for full accessibility
  document.getElementById('name').focus();
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  btnContact.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  // Reset form status on close
  setTimeout(() => {
    formStatus.className = 'form-status';
    formStatus.textContent = '';
  }, 300);
}

if (btnContact && modal && btnCloseModal) {
  btnContact.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // UI Loading state
    btnSubmit.classList.add('is-loading');
    btnSubmit.disabled = true;
    formStatus.className = 'form-status';
    formStatus.textContent = '';
    
    // Send form data
    emailjs.sendForm('Trabajo_Email', 'Template_CasoContacto', this)
      .then(() => {
        // Success
        btnSubmit.classList.remove('is-loading');
        btnSubmit.disabled = false;
        
        formStatus.textContent = '¡Mensaje enviado con éxito! Te contactaré pronto.';
        formStatus.className = 'form-status success';
        
        contactForm.reset();
        
        // Auto close after 3 seconds
        setTimeout(closeModal, 3000);
      }, (error) => {
        // Error
        btnSubmit.classList.remove('is-loading');
        btnSubmit.disabled = false;
        
        const errorMsg = error && error.text ? error.text : 'Error desconocido.';
        formStatus.textContent = `Hubo un error al enviar el mensaje: ${errorMsg}`;
        formStatus.className = 'form-status error';
        console.error('EmailJS Error:', error);
      });
  });
}
