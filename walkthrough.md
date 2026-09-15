# Editorial hero

## Header scroll appearance

- The fixed header is transparent at the top, visually joining the hero. After 32px of scroll, a dark glass layer fades in; scrolling back to the top removes it.
- State initializes on load and page restoration. Reduced-motion preferences disable the transition. The mobile menu keeps its opaque background and viewport positioning.

- Implemented the approved typography-led hero: “Tu próximo proyecto empieza aquí.”
- Preserved Inter, dark surfaces and Solar Amber. Added a compact description and specialties list.
- The primary action uses the existing contact modal handler; “Ver proyectos” links to the featured projects.
- Supporting content stacks on small screens; reduced-motion preferences disable the entrance animation.
- Updated the hero guidance in AGENT.md and DESIGN.md.

## Particle background

- Vendored particles.js 2.0.0 and its MIT license in `src/lib/vendor/` from the versioned npm distribution via jsDelivr. Upstream: https://github.com/VincentGarreau/particles.js.
- `src/lib/hero-particles.js` configures small amber particles and subtle connections behind the hero content without blocking clicks.
- Uses fewer particles on mobile, a static frame for reduced motion, pause/resume controls, and pauses animation offscreen or in a hidden tab.
- The final contact section reuses the initializer with lower density (40 desktop / 18 mobile) and opacity (0.32), its own canvas and independent playback control. Content and contact actions stay above the decorative layer.
