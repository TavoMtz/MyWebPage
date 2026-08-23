# Agent Instructions (AGENT.md)

Welcome to the **MyWebPage (GM. SOFTWARE SERVICES)** portfolio project workspace. As an AI Agent working in this repository, you must adhere strictly to the following architectural, design, and structural rules to ensure consistency, high performance, and a premium aesthetic.

---

## 1. Page Architecture & Section Hierarchy

The single-page portfolio (`index.html`) follows this exact semantic sequence:

1. **Header / Navigation (`#main-nav`):**
   - Branding: `GM.` with Solar Amber accent dot + `SOFTWARE SERVICES` subtitle tag.
   - Links: `Servicios` (`#services`), `Proyectos` (`#projects`), `Proceso` (`#process`), `Sobre mí` (`#about`).
   - Primary Action Button: `Iniciar un proyecto` (triggers `#contact-modal`).
2. **Hero Section (`#hero`):**
   - Primary headline with animated text-reveal, availability status indicator badge, and direct call-to-actions.
3. **Nuestros Servicios (`#services`):**
   - 5 service offerings arranged using Flexbox in 2 balanced rows (3 top, 2 centered bottom).
   - Compact cards with integrated horizontal header (SVG icon + title), concise description, and bulleted features.
4. **Proyectos Destacados (`#projects`):**
   - 4-column responsive grid featuring interactive project cards with imagery, tech stack pills, and detail page links.
5. **Cómo trabajamos / Proceso (`#process`):**
   - 4-phase structured methodology: `01 Descubrir`, `02 Diseñar`, `03 Construir`, `04 Entregar`.
   - Cards with gold/amber numerical badges (`01`–`04`), high-contrast titles, and illumination hover glow.
6. **Sobre mí (`#about`):**
   - Editorial split layout: portrait photo sticky column on the left, first-person narrative and value proposition on the right.
7. **Contacto / Hablemos de tu proyecto (`#contact`):**
   - Centered high-impact closing section: large headline with gold accent, 3 bulleted trust factors with checks (`✓`), and primary action buttons (`ENVIAR MENSAJE` + direct email).
8. **Footer (`#footer`):**
   - Left: `GM.` logo + `© 2026 GM Software Services`.
   - Right: Direct external link to `GitHub` (`https://github.com/TavoMtz`).
9. **Contact Modal (`#contact-modal`):**
   - Accessible dialog overlay with full form inputs (name, email, message) powered by EmailJS.

---

## 2. Modular CSS Architecture (`src/styles/`)

All stylesheets are modularized and imported via `<link>` tags in `index.html`. Do not combine them into monolithic files or write inline styles:

* **`tokens.css`**: Design system tokens (`:root`), colors (`--surface`, `--primary-container`, etc.), typography scale, transitions, and z-index layers.
* **`base.css`**: Modern reset, base HTML element stylings, scroll-reveal animation classes, and custom scrollbar.
* **`components.css`**: Reusable UI components (Navbar, Buttons, Badges, Contact Modal, Footer).
* **`sections.css`**: Section-specific layouts (`.hero`, `.services`, `.projects`, `.process`, `.about`, `.contact-cta`).
* **`responsive.css`**: Media queries (`@media (max-width: 992px)`, `@media (max-width: 768px)`, `@media (max-width: 480px)`).

---

## 3. Design System Strict Adherence ("Luminescent Monolith")

All visual modifications must comply with `DESIGN.md`:
* **Typography:** Solely use `Inter` with designated font-weights (Display `800`, Headline `700`, Subhead `600`, Body `400`, Label `500`).
* **Color Palette:**
  - Base surface: `#131313` (`--surface`), `#0E0E0E` (`--surface-container-lowest`), `#201F1F` (`--surface-container`).
  - Accents: Solar Amber `#FFC107` / `#FABD00` (Primary), Soft Blue `#89D0ED` (Secondary), Whisper Teal `#B3F4E1` (Tertiary).
  - Text: Warm Bone White `#E5E2E1` (Headings) and Warm Parchment Grey `#D4C5AB` (Body).
* **The "No-Line" Rule:** Rely on background tonal shifts and negative space rather than heavy `1px solid` border dividers.
* **Signature Micro-interaction:** Content Spotlight cursor glow on cards via CSS radial gradients and mousemove listeners.

---

## 4. JavaScript & Interactivity (`src/lib/main.js`)

* **Smooth Navigation:** Offset-aware smooth scroll for all anchor links (`a[href^="#"]`).
* **Scroll Animations:** `IntersectionObserver` observing `.reveal` elements with staggered delays.
* **Active Nav Indicator:** Automatically tracks scroll position to highlight the active menu item.
* **EmailJS Integration:** Handles contact form submission with validation, loading spinners, and status feedback.
* **Modal Management:** Accessible open/close handlers with Escape key support and scroll-locking.

---

## 5. Operational Directives

* **Maintain Documentation Integrity:** Keep `DESIGN.md`, `AGENT.md`, and `walkthrough.md` aligned whenever adding, removing, or modifying layout sections.
* **Language & Communication:** User requests may be in Spanish or English. Respond in the user's language, but keep source code, CSS variable names, and class names in clean English.
* **Avoid Generic Frameworks:** Do not inject Tailwind, Bootstrap, or foreign styling libraries unless explicitly requested.
