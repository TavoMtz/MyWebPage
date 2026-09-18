/* particles.js 2.0.0 — decorative section backgrounds, served locally. */
(() => {
  'use strict';

  function initSection(sectionId, containerId, toggleId, desktopCount, mobileCount, opacity, mobileOpacity = opacity, mobileMinimum = 0) {
    const section = document.getElementById(sectionId);
    const container = document.getElementById(containerId);
    const toggle = document.getElementById(toggleId);
    if (!section || !container || typeof window.particlesJS !== 'function') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 768px)');
    const amber = getComputedStyle(section).getPropertyValue('--primary-container').trim();
    const initialOpacity = mobile.matches ? mobileOpacity : opacity;

    window.particlesJS(container.id, {
      particles: {
        number: { value: mobile.matches ? mobileCount : desktopCount, density: { enable: false } },
        color: { value: amber },
        shape: { type: 'circle', stroke: { width: 0 } },
        opacity: { value: initialOpacity, random: true, anim: { enable: false } },
        size: { value: 2.5, random: true, anim: { enable: false } },
        line_linked: { enable: true, distance: 170, color: amber, opacity: initialOpacity * 0.43, width: 1 },
        move: { enable: true, speed: 0.45, direction: 'none', random: false,
          straight: false, out_mode: 'out', bounce: false, attract: { enable: false } }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: false }, onclick: { enable: false }, resize: false }
      },
      retina_detect: true
    });

    const instanceEntry = window.pJSDom.find(entry => entry.pJS.canvas.el.parentElement === container);
    const instance = instanceEntry && instanceEntry.pJS;
    if (!instance) return;

    const canvas = instance.canvas.el;
    let inView = false;
    let userPaused = false;
    let running = false;
    let resizeFrame = null;
    let contextLost = false;
    let hasSize = false;

    // The vendor starts its loop inside particlesJS(), before our observers exist.
    // Stop it even when the initial layout has no usable dimensions yet.
    cancelDraw();
    instance.particles.move.enable = false;

    function targetParticleCount() {
      const area = canvas.offsetWidth * canvas.offsetHeight;
      const configuredCount = mobile.matches ? mobileCount : desktopCount;
      const densityCount = Math.round((area * configuredCount) / 900000);
      return mobile.matches ? Math.max(mobileMinimum, densityCount) : Math.max(configuredCount, densityCount);
    }

    function syncParticleCount() {
      const target = targetParticleCount();
      const difference = instance.particles.array.length - target;
      instance.particles.number.value = target;
      if (difference < 0) instance.fn.modes.pushParticles(Math.abs(difference));
      if (difference > 0) instance.fn.modes.removeParticles(difference);
    }

    function cancelDraw() {
      window.cancelRequestAnimFrame(instance.fn.drawAnimFrame);
      instance.fn.drawAnimFrame = null;
    }

    function updatePlayback({ repaint = false } = {}) {
      const shouldRun = hasSize && !contextLost && inView && !document.hidden && !reducedMotion.matches && !userPaused;
      if (toggle) {
        toggle.hidden = reducedMotion.matches;
        toggle.textContent = userPaused ? 'Reanudar animación' : 'Pausar animación';
      }
      if (shouldRun === running && !repaint) return;

      running = shouldRun;
      instance.particles.move.enable = shouldRun;
      cancelDraw();
      if (shouldRun) {
        instance.fn.vendors.draw();
      } else if (hasSize && !contextLost) {
        // Retain one frame when Safari pauses animation during browser-chrome changes.
        instance.fn.particlesDraw();
      }
    }

    function syncCanvas() {
      if (contextLost) return;
      const width = Math.round(container.offsetWidth * instance.canvas.pxratio);
      const height = Math.round(container.offsetHeight * instance.canvas.pxratio);
      hasSize = width > 0 && height > 0;
      if (!hasSize) {
        updatePlayback();
        return;
      }

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        instance.canvas.w = width;
        instance.canvas.h = height;
        instance.fn.particlesEmpty();
        instance.fn.particlesCreate();
      }
      syncParticleCount();
      updatePlayback({ repaint: true });
    }

    function scheduleCanvasSync() {
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        syncCanvas();
      });
    }

    function observeMediaQuery(query, callback) {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', callback);
      } else if (typeof query.addListener === 'function') {
        query.addListener(callback);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(section);

    if (typeof ResizeObserver === 'function') {
      new ResizeObserver(scheduleCanvasSync).observe(container);
    } else {
      window.addEventListener('resize', scheduleCanvasSync);
    }
    if (window.visualViewport) window.visualViewport.addEventListener('resize', scheduleCanvasSync);

    canvas.addEventListener('contextlost', () => {
      contextLost = true;
      updatePlayback();
    });
    canvas.addEventListener('contextrestored', () => {
      contextLost = false;
      instance.fn.canvasInit();
      syncCanvas();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) updatePlayback();
      else syncCanvas();
    });
    // Paint synchronously on restoration; animation frames can still be suspended.
    window.addEventListener('pageshow', syncCanvas);
    window.addEventListener('load', syncCanvas, { once: true });
    observeMediaQuery(reducedMotion, () => updatePlayback({ repaint: true }));
    observeMediaQuery(mobile, () => {
      const nextOpacity = mobile.matches ? mobileOpacity : opacity;
      const opacityRatio = nextOpacity / instance.particles.opacity.value;
      instance.particles.array.forEach(particle => { particle.opacity *= opacityRatio; });
      instance.particles.opacity.value = nextOpacity;
      instance.particles.line_linked.opacity = nextOpacity * 0.43;
      scheduleCanvasSync();
    });
    if (toggle) {
      toggle.addEventListener('click', () => {
        userPaused = !userPaused;
        updatePlayback({ repaint: true });
      });
    }

    syncCanvas();
  }

  initSection('hero', 'particles-js', 'hero-motion', 65, 56, 0.42, 0.62, 32);
  initSection('contact', 'contact-particles', 'contact-motion', 40, 18, 0.32, 0.32, 12);
})();
