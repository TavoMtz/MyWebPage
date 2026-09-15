/* particles.js 2.0.0 — decorative section backgrounds, served locally. */
(() => {
  'use strict';

  function initSection(sectionId, containerId, toggleId, desktopCount, mobileCount, opacity, mobileOpacity = opacity) {
  const hero = document.getElementById(sectionId);
  const container = document.getElementById(containerId);
  const toggle = document.getElementById(toggleId);
  if (!hero || !container || typeof window.particlesJS !== 'function') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 768px)');
  const amber = getComputedStyle(hero).getPropertyValue('--primary-container').trim();
  const initialOpacity = mobile.matches ? mobileOpacity : opacity;

  window.particlesJS(container.id, {
    particles: {
      number: { value: mobile.matches ? mobileCount : desktopCount, density: { enable: true, value_area: 900 } },
      color: { value: amber },
      shape: { type: 'circle', stroke: { width: 0 } },
      opacity: { value: initialOpacity, random: true, anim: { enable: false } },
      size: { value: 2.5, random: true, anim: { enable: false } },
      line_linked: { enable: true, distance: 170, color: amber, opacity: initialOpacity * 0.43, width: 1 },
      // v2 initializes line colors after density; stop its first loop below.
      move: { enable: true, speed: 0.45, direction: 'none', random: false,
        straight: false, out_mode: 'out', bounce: false, attract: { enable: false } }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    },
    retina_detect: true
  });

  const instance = window.pJSDom.find(entry => entry.pJS.canvas.el.parentElement === container)?.pJS;
  if (!instance) return;

  let inView = false;
  let userPaused = false;
  let running = true;

  function updatePlayback() {
    const shouldRun = inView && !document.hidden && !reducedMotion.matches && !userPaused;
    if (toggle) {
      toggle.hidden = reducedMotion.matches;
      toggle.textContent = userPaused ? 'Reanudar animación' : 'Pausar animación';
    }
    if (shouldRun === running) return;
    running = shouldRun;
    instance.particles.move.enable = shouldRun;
    window.cancelRequestAnimFrame(instance.fn.drawAnimFrame);
    instance.fn.drawAnimFrame = null;
    if (shouldRun) instance.fn.vendors.draw();
  }

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updatePlayback();
  });
  observer.observe(hero);

  document.addEventListener('visibilitychange', updatePlayback);
  reducedMotion.addEventListener('change', updatePlayback);
  mobile.addEventListener('change', () => {
    const nextOpacity = mobile.matches ? mobileOpacity : opacity;
    const opacityRatio = nextOpacity / instance.particles.opacity.value;
    instance.particles.array.forEach(particle => { particle.opacity *= opacityRatio; });
    instance.particles.opacity.value = nextOpacity;
    instance.particles.line_linked.opacity = nextOpacity * 0.43;
    instance.particles.number.value = mobile.matches ? mobileCount : desktopCount;
    instance.fn.vendors.densityAutoParticles();
    if (!running) instance.fn.particlesDraw();
  });
  toggle?.addEventListener('click', () => {
    userPaused = !userPaused;
    updatePlayback();
  });
  updatePlayback();
  }

  initSection('hero', 'particles-js', 'hero-motion', 65, 56, 0.42, 0.62);
  initSection('contact', 'contact-particles', 'contact-motion', 40, 18, 0.32);
})();
