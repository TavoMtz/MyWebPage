const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');

// Execute the shipped vendor and initializer together. This checks lifecycle
// behavior, not Safari's compositor; physical-device verification is separate.
function boot({ width = 390, height = 844, reduced = false, dpr = 3 } = {}) {
  const frames = new Map();
  let frameId = 0;
  const intersections = [];
  const resizes = [];
  function events(target = {}) {
    const listeners = {};
    target.addEventListener = (name, fn) => (listeners[name] ||= []).push(fn);
    target.emit = (name, data = {}) => (listeners[name] || []).forEach(fn => fn(data));
    return target;
  }
  const section = events({ getBoundingClientRect: () => ({ top: 0, bottom: height }) });
  const toggle = events({ hidden: true });
  const container = {
    id: 'particles-js',
    get offsetWidth() { return width; },
    get offsetHeight() { return height; },
    getElementsByClassName: () => [],
    appendChild(el) { el.parentElement = this; return el; }
  };
  const pixels = { painted: false, lost: false, paints: 0 };
  const context = new Proxy({}, { get: (object, key) => {
    if (!(key in object)) object[key] = () => {
      if (key === 'clearRect') pixels.painted = false;
      if (key === 'fill' && !pixels.lost) { pixels.painted = true; pixels.paints++; }
    };
    return object[key];
  } });
  let bitmapWidth = 0, bitmapHeight = 0;
  const canvas = events({
    style: {}, getContext: () => context,
    get offsetWidth() { return width; }, get offsetHeight() { return height; },
    get width() { return bitmapWidth; }, set width(value) { bitmapWidth = value; pixels.painted = false; },
    get height() { return bitmapHeight; }, set height(value) { bitmapHeight = value; pixels.painted = false; }
  });
  const media = { reduced: events({ matches: reduced }), mobile: events({ matches: width <= 768 }) };
  const document = events({ hidden: false, readyState: 'complete',
    getElementById: id => ({ hero: section, 'particles-js': container, 'hero-motion': toggle })[id],
    querySelector: () => canvas, createElement: () => canvas
  });
  const sandbox = events({ document, console, devicePixelRatio: dpr, innerHeight: 844,
    getComputedStyle: () => ({ getPropertyValue: () => '#FFC107' }),
    matchMedia: query => query.includes('reduced-motion') ? media.reduced : media.mobile,
    requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class { constructor(fn) { intersections.push(fn); } observe() {} },
    ResizeObserver: class { constructor(fn) { resizes.push(fn); } observe() {} },
    visualViewport: events({}), setTimeout, clearTimeout
  });
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  for (const file of ['src/lib/vendor/particles.js', 'src/lib/hero-particles.js']) {
    vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  }
  return { sandbox, frames, pixels, canvas, toggle, media,
    intersect: visible => intersections.forEach(fn => fn([{ isIntersecting: visible }])),
    resize(w, h) { width = w; height = h; resizes.forEach(fn => fn()); },
    tick() { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(fn => fn()); }
  };
}

test('repeated initial loads paint a static frame before intersection delivery', () => {
  for (let i = 0; i < 100; i++) {
    const app = boot({ dpr: i % 3 + 1, reduced: i % 2 === 0 });
    assert.equal(app.pixels.painted, true);
    assert.equal(app.frames.size, 0);
    assert.equal(app.sandbox.pJSDom[0].pJS.particles.array.length, 32);
  }
});

test('a zero-size initial layout does not leave the vendor animation running', () => {
  const app = boot({ width: 0, height: 0, reduced: true });
  assert.equal(app.frames.size, 0);
  app.resize(390, 844);
  app.tick();
  assert.equal(app.pixels.painted, true);
  assert.equal(app.frames.size, 0);
});

test('restoring a lost context repaints even when reduced motion is enabled', () => {
  const app = boot({ reduced: true });
  app.pixels.lost = true;
  app.pixels.painted = false;
  app.canvas.emit('contextlost');
  app.pixels.lost = false;
  app.canvas.emit('contextrestored');
  assert.equal(app.pixels.painted, true);
  assert.equal(app.frames.size, 0);
});

test('resize, pause, visibility and page restore keep at most one draw loop', () => {
  const app = boot();
  app.intersect(true);
  assert.equal(app.frames.size, 1);
  app.resize(430, 932);
  app.tick();
  assert.equal(app.pixels.painted, true);
  assert.equal(app.frames.size, 1);
  app.toggle.emit('click');
  assert.equal(app.frames.size, 0);
  app.sandbox.emit('pageshow');
  app.tick();
  assert.equal(app.pixels.painted, true);
  assert.equal(app.frames.size, 0);
  app.toggle.emit('click');
  app.sandbox.document.hidden = true;
  app.sandbox.document.emit('visibilitychange');
  assert.equal(app.frames.size, 0);
  app.sandbox.document.hidden = false;
  app.sandbox.document.emit('visibilitychange');
  assert.equal(app.frames.size, 1);
});
