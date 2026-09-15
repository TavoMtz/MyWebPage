# Design System: GM. SOFTWARE SERVICES — Portfolio
**Project:** Portfolio & Digital Services Platform  
**Creative North Star:** "The Luminescent Monolith"  
**Device Target:** Responsive (Desktop 1280px+ canvas, Tablet & Mobile adapted)

---

## 1. Visual Theme & Atmosphere

**"The Luminescent Monolith"**

The overall aesthetic is cinematic, editorial, and intentionally dark. The interface operates like a curated architectural gallery: content is *carved out of darkness* using controlled bursts of light, intentional scale, and restrained solar-amber accents.

- **Mood:** Sophisticated, confident, and high-density yet breathable. It conveys architectural precision and engineering craft.
- **Density:** Balanced and comfortable. Large viewport sections breathe with generous whitespace, punctuated by clean grids and bold typographic statements.
- **Philosophy:** Intentional hierarchy. Massive typographic hooks juxtaposed against compact functional metadata. Negative space is treated as a core design element.
- **Feel:** Monolithic darkness with luminescent accents. Content floats on an infinite dark canvas.

---

## 2. Color Palette & Tokens

Defined centrally in `src/styles/tokens.css` via `:root`:

### Surface Architecture (Background Family)
| Token Name | Hex | Role |
|---|---|---|
| `--surface` | `#131313` | Base background — zero-elevation "infinite dark canvas" |
| `--surface-container-lowest` | `#0E0E0E` | Deepest surface — used in `#services` and footer backdrop |
| `--surface-container-low` | `#1C1B1B` | Low-elevation container — base layer for sections |
| `--surface-container` | `#201F1F` | Standard card surface — `#process` and project cards |
| `--surface-container-high` | `#2A2A2A` | Interactive hover surface — cards elevate on hover |
| `--surface-container-highest` | `#353534` | Highest surface — modals, inputs, and icon wraps |
| `--surface-bright` | `#393939` | Highlighted active states |

### Accent Family
| Token Name | Hex | Role |
|---|---|---|
| `--primary-container` | `#FFC107` | Solar Amber — filled CTA button background, focal accent |
| `--primary-dim` | `#FABD00` | Goldenrod glow — gradient start for shimmering states |
| `--primary` | `#FFE4AF` | Warm gilded cream — primary text accent |
| `--primary-fixed` | `#FFDF9E` | Secondary amber states |
| `--secondary` | `#89D0ED` | Soft Sky Blue — link highlights, detail accents |
| `--secondary-container` | `#00627B` | Deep teal ocean — tag pills background |
| `--tertiary` | `#B3F4E1` | Whisper Teal — check icons (`✓`), status indicators |
| `--tertiary-container` | `#98D7C5` | Muted sage — tertiary badge accents |

### Text Family
| Token Name | Hex | Role |
|---|---|---|
| `--on-surface` | `#E5E2E1` | Warm Bone White — primary display text and headings |
| `--on-surface-variant` | `#D4C5AB` | Warm Parchment Grey — body text, descriptions, subtext |
| `--outline` | `#9C8F78` | Sandstone — subtle borders, inactive metadata |
| `--outline-variant` | `#4F4632` | Muted Bronze — ghost borders at 15% opacity |

---

## 3. Typography Rules

**Font Family:** `Inter` (variable weight, sans-serif) — used universally across all text elements.

### Hierarchy & Usage
| Role | Weight | Spacing | Color | Notes |
|---|---|---|---|---|
| **Display / Hero Headline** | ExtraBold (800) / Black (900) | `-0.02em` | `#E5E2E1` | Hero hook & Contact CTA heading |
| **Section Headings (H2)** | Bold (700) / ExtraBold (800) | `-0.01em` | `#E5E2E1` | Section titles ("Cómo trabajamos.", "Nuestros servicios") |
| **Card Titles (H3)** | SemiBold (600) / Bold (700) | `0em` | `#E5E2E1` | Service titles, process steps, project names |
| **Body / Descriptions** | Regular (400) | `0.01em` | `#D4C5AB` / `#CFC9C0` | `1.55` to `1.65` line-height for effortless legibility |
| **Labels / Badges / Nav** | Medium (500) / Bold (700) | `+0.06em` | Solar Amber `#FFC107` or Soft Blue | Small caps / uppercase navigation, numerical badges |

---

## 4. Component & Section Design

### Navigation Bar (`#main-nav`)
- **Branding:** `GM.` logo with Solar Amber accent dot + `SOFTWARE SERVICES` tag.
- **Scroll appearance:** Fully transparent at the top, integrated with the hero. Beyond 32px of scroll, `.is-scrolled` fades in a separate dark glass background (`rgba(19, 19, 19, 0.92)`, 24px blur). Returning to the top removes it. Reduced motion disables the transition; the mobile menu retains its own opaque background.
- **Links:** Uppercase Inter, hover color shift to `#FFC107` with underline animation.
- **CTA:** `Iniciar un proyecto` button in Solar Amber.

### Hero Section (`#hero`)
- **Viewport height (all sizes):** Full initial viewport with `min-height: 100svh`; center content below the fixed header and allow natural growth on short screens or enlarged text. Mobile uses the stable viewport with browser controls visible. Preserve the desktop horizontal composition and mobile stacked layout.
- **Mobile (≤768px):** Deliberate three-line title, larger proportional type, compact description, full-width primary button, centered project link and specialties in two rows. Hero particles use density setting 56 and opacity 0.62 with a stronger mask; desktop retains 65 and 0.42. Contact particles are unchanged.
- Editorial typography-led composition with a broad, left-aligned Inter 800 headline: "Tu próximo proyecto / empieza aquí." Solid Solar Amber emphasizes "aquí."; no heading hover glow.
- Compact description alongside a primary contact modal button and secondary "Ver proyectos" text link. Smaller screens stack the supporting content and actions.
- Specialties list: Desarrollo web, Sistemas de gestión, Arquitectura de software. No availability badge.
- Local particles.js 2.0.0 background: small amber dots, fine translucent connections and slow movement. Fade intensity behind the text; keep the canvas behind all controls. Lower density on mobile, static reduced-motion rendering, manual pause/resume, and automatic pause offscreen or in hidden tabs.
- Styles live in `src/styles/hero.css`. A short entrance reveal respects reduced-motion preferences.

### Nuestros Servicios (`#services`)
- **Layout:** Flexbox grid with 5 cards in 2 balanced rows (3 top, 2 centered bottom).
- **Cards:** Compact card structure with horizontal header (`.service-card__header` pairing a 36px icon wrap with title), concise description, and 3 feature items with checkmarks.
- **Hover:** Background shift to `--surface-container-high` + subtle golden glow.

### Proyectos Destacados (`#projects`)
- **Layout:** 4-column responsive grid (`min-height: 100vh`).
- **Cards:** Preview image with ratio 16:9, tech stack pills, and detail button.
- **Spotlight:** Dynamic cursor spotlight glow tracking mouse position.

### Cómo trabajamos (`#process`)
- **Layout:** 4-column sequence representing the 4 delivery phases (`01 Descubrir`, `02 Diseñar`, `03 Construir`, `04 Entregar`).
- **Card Structure:** Solid `#201F1F` surface with subtle border, rectangular gold badge (`01`–`04`), bold white title, and spacious description.
- **Hover:** Static illumination glow without vertical displacement (`box-shadow: 0 0 28px rgba(250, 189, 0, 0.08)`).

### Sobre mí (`#about`)
- **Layout:** Asymmetric split: sticky column with professional portrait on the left; narrative, credentials, and language proficiency on the right.

### Contacto / CTA (`#contact`)
- **Background:** Amber particles echo the hero with lower density and opacity, faded behind the centered content. Independent pause/resume control; static reduced-motion rendering and automatic pause offscreen or in hidden tabs. Shared initializer: `src/lib/hero-particles.js`.
- **Layout:** Centered high-impact block: massive headline (`Hablemos de tu proyecto.`), 3 trust bullet points with teal checks, and horizontal action buttons (`ENVIAR MENSAJE` modal trigger + direct email).

### Footer (`#footer`)
- **Layout:** Dual-sided clean footer:
  - Left: `GM.` logo + `© 2026 GM Software Services`.
  - Right: `GitHub` repository/profile external link.

---

## 5. Motion & Interaction

- **Transitions:** Standard `200ms ease-in-out` on all interactive elements.
- **Content Spotlight Glow:** Mouse-following radial gradient highlights on cards.
- **Scroll Reveal:** Smooth entrance fade-in and upward slide (`translateY(24px) → 0`) triggered via `IntersectionObserver`.

---

## 6. Do's and Don'ts

### ✅ Do
- Use **background shifts** and negative space to separate sections naturally.
- Keep body text in **Warm Parchment Grey (`#D4C5AB`)** rather than harsh `#FFFFFF`.
- Use **Solar Amber (`#FFC107`)** selectively for primary buttons, accent dots, and badges.
- Keep typography strictly within the **`Inter`** family.

### ❌ Don't
- Do not use heavy `1px solid` border dividers across full-width layout sections.
- Do not add random vertical shifts to cards on hover if the user preferred static illumination.
- Do not use pure white `#FFFFFF` for continuous multi-paragraph body text.
