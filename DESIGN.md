# Design System: MyWebPage — Portfolio Desktop
**Project ID:** `15789045421220435825`
**Source Screen:** Portfolio - Desktop View — FINAL (`bbdee0a1aa8743ddbfeaeadaae1f6350`)
**Device Type:** Desktop (2560 × 8700 px canvas)

---

## 1. Visual Theme & Atmosphere

**Creative North Star: "The Luminescent Monolith"**

The overall aesthetic is cinematic, editorial, and intentionally dark. Think of a premium design agency's showcase — not a standard tech portfolio. The interface operates like a curated gallery: content is *carved out of darkness* using controlled bursts of light, scale, and a restrained but potent color accent.

- **Mood:** Sophisticated, confident, and high-density yet breathable. It conveys "architectural precision" rather than "startup friendly."
- **Density:** Medium-sparse. Large sections breathe with generous whitespace, punctuated by tightly organized skill grids and bold typographic statements.
- **Philosophy:** Intentional asymmetry. Massive typographic hooks juxtaposed against compact functional metadata. Layouts use negative space as a design element — if a section feels full, double the padding.
- **Feel:** Monolithic darkness with luminescent accents. The background acts as an "infinite canvas" that content floats upon rather than sits within.

---

## 2. Color Palette & Roles

The palette is built around a sophisticated interplay between deep light-absorbing neutrals and restrained "electric" accents.

### Surface Architecture (Background Family)
| Descriptive Name | Hex | Role |
|---|---|---|
| Infinite Canvas Black | `#131313` | Base background (`surface`) — the zero-elevation layer, the "infinite dark canvas" |
| Shadowed Onyx | `#0E0E0E` | Deepest container (`surface_container_lowest`) — used under the canvas for truly recessed areas |
| Charcoal Void | `#1C1B1B` | Low-elevation content blocks (`surface_container_low`) — large page sections sit here |
| Matte Graphite | `#201F1F` | Mid-level container (`surface_container`) — standard card parents |
| Elevated Graphite | `#2A2A2A` | High-elevation interactive surface (`surface_container_high`) — project cards, skill blocks |
| Floating Slate | `#353534` | Highest layer (`surface_container_highest`) — modals, active dropdowns, input backgrounds |
| Warm Stone | `#393939` | Surface bright (`surface_bright`) — used for highlighted/active list items |

### Accent Family
| Descriptive Name | Hex | Role |
|---|---|---|
| Goldenrod Glow (Dim) | `#FABD00` | The primary fixed dim — used in gradient starts for CTA shimmer effects |
| Warm Gilded Cream | `#FFE4AF` | Primary (`primary`) — the highest-priority text accent, sparingly applied for maximum impact |
| Solar Amber | `#FFC107` | Primary Container (`primary_container`) — filled CTA button background; the single most saturated point of attention |
| Pale Amber Parchment | `#FFDF9E` | Primary Fixed — used for secondary golden states |

### Supporting Accents
| Descriptive Name | Hex | Role |
|---|---|---|
| Soft Sky Blue | `#89D0ED` | Secondary (`secondary`) — skill tags, link highlights, secondary interactions |
| Deep Teal Ocean | `#00627B` | Secondary Container (`secondary_container`) — badges, filter chips background |
| Whisper Teal | `#B3F4E1` | Tertiary (`tertiary`) — hover glows, success states |
| Muted Sage | `#98D7C5` | Tertiary Container (`tertiary_container`) — tertiary card accents |

### Text Family
| Descriptive Name | Hex | Role |
|---|---|---|
| Warm Bone White | `#E5E2E1` | On-surface (`on_surface`) — primary display text, headings on dark |
| Warm Parchment Grey | `#D4C5AB` | On-surface-variant (`on_surface_variant`) — body text, descriptions; avoids eye strain on charcoal |
| Sandstone Border | `#9C8F78` | Outline (`outline`) — de-emphasis lines, separator suggestions |
| Muted Bronze Edge | `#4F4632` | Outline variant (`outline_variant`) — ghost borders at 15% opacity only |

---

## 3. Typography Rules

**Font Family:** `Inter` (variable weight) — used universally for Display, Headline, Body, and Labels. No mixing.

### Hierarchy & Usage
| Role | Weight | Spacing | Color | Notes |
|---|---|---|---|---|
| **Display / Hero** | ExtraBold (800) | -0.02em (tight) | Warm Bone White (`#E5E2E1`) | "Full-Stack Developer" headline — the visual hook that breaks the grid |
| **Section Headings (H2)** | Bold (700) | -0.01em | Warm Bone White (`#E5E2E1`) | "About me.", "Experience.", "Skills.", "Projects." — bold, assertive, dominant |
| **Sub-headings (H3/H4)** | SemiBold (600) | 0em | Warm Parchment Grey (`#D4C5AB`) | Company names, skill category titles — functional yet refined |
| **Body / Descriptions** | Regular (400) | 0.01em | Warm Parchment Grey (`#D4C5AB`) | Paragraph text — the warm grey prevents harshness on the dark canvas |
| **Labels / Metadata** | Medium (500) or SemiBold | +0.08em (wide) | Soft Sky Blue (`#89D0ED`) or Solar Amber (`#FFC107`) | Tags, nav items, bullet metadata — small-caps style when marking dates or roles |

### The "Oversized & Intentional" Rule
- Hero text at Display scale should be set large enough to *break across lines in unexpected ways*, creating rhythm and visual tension.
- Avoid centering large text — left-aligned display text commands more authority.
- Never use pure `#FFFFFF` for body — always use `on_surface_variant` for long-form reading.

---

## 4. Component Stylings

### Navigation Bar
- **Background:** Glassmorphism — `surface_variant` (#353534) at **60% opacity** with `backdrop-filter: blur(24px)`
- **Items:** Inter Medium, Warm Bone White (`#E5E2E1`), wide letter-spacing (+0.06em)
- **Active/Hover:** Goldenrod accent line or text shift to Solar Amber (`#FFC107`)
- **Border:** None — depth is created by the blur effect alone

### Buttons
- **Primary CTA:** Solid fill with `primary_container` Solar Amber (`#FFC107`); text in Deep Charcoal (`#3F2E00`) for contrast. Applied with a subtle 45° linear gradient from `#FABD00` → `#FFE4AF` for a metallic luster. No border. Corner roundness: **4px (sharp-ish, modern square)**. Hover: gentle brightness lift.
- **Secondary / Ghost:** No background, `primary` (#FFE4AF) text color. On hover, `surface_container_high` (#2A2A2A) background fades in at 200ms ease. No border.
- **Tertiary / Link-style:** `secondary` (#89D0ED) color, no container, used for "View All Works →" type actions.

### Project Cards
- **Background:** Elevated Graphite (`#2A2A2A`) — the card "lifts" from its parent container visually.
- **Corner roundness:** 4px — precise, modern, non-soft. Avoids the overly "friendly" feel of `rounded-xl`.
- **Hover behavior:** Card transitions from `surface_container_low` to `surface_container_high` (no scale transform — only a background shift with a Soft Sky Blue (`#89D0ED`) or Teal glow appearing *behind* the card).
- **Shadow:** No standard drop shadow. If separation is needed, use a shadow with `40px` blur, `8%` opacity, in the color of `surface_container_lowest` (#0E0E0E).
- **Content structure:** Project title in SemiBold Bone White; description in Parchment Grey body text. Tag chips in `secondary_container` (#00627B).

### Skill Blocks / Grid
- **Layout:** 4-column grid with tight internal padding (16px internal, 32px between columns).
- **Category Headers:** Solar Amber (`#FFC107`) or Soft Sky Blue accent dot or label before the heading.
- **Items:** Warm Parchment Grey list items with `check_circle` Material icons in Whisper Teal (`#B3F4E1`).
- **Container:** Elevated Graphite (`#2A2A2A`) background with no border.

### Experience Timeline Items
- **Check markers:** Whisper Teal (`#B3F4E1`) `check_circle` icons — communicating completeness/achievement.
- **Company name:** On-surface-variant Parchment Grey, subdued.
- **Role title:** Bold Inter, Bone White — dominant.
- **Separator:** No horizontal rules. Vertical spacing of 40–48px between timeline entries is the separator.

### Input Fields
- **State:** Filled — background is `surface_container_highest` (#353534).
- **Focus State:** 2px bottom-border of Solar Amber (`#FFC107`). The editorial feel is preserved while accessibility is maintained.
- **Placeholder text:** `on_surface_variant` (#D4C5AB) at 70% opacity.

### Footer
- **Background:** Charcoal Void (`#1C1B1B`) — slightly distinct from canvas to delineate without a line.
- **Text:** On-surface-variant Parchment Grey, small-caps labels.
- **Links:** Warm Gilded Cream (`#FFE4AF`) on hover; standard state in Sandstone Border grey.

---

## 5. Layout Principles

### The "No-Line" Rule (Critical)
**Borders are a failure of hierarchy.** All `1px solid` dividers are strictly forbidden for sectioning layout areas. Structure is created exclusively through:
1. **Background Tone Shifts** — e.g., placing a `surface_container_low` (#1C1B1B) section against the `surface` (#131313) canvas.
2. **Negative Space** — 64px–96px vertical padding between major sections.

### The "Ghost Border" Accessibility Fallback
When a container *must* have more edge definition for accessibility, use `outline_variant` (`#4F4632`) at **15% opacity only** — this creates a *suggestion* of an edge, not a hard line.

### Whitespace Strategy
- **Macro spacing:** 80px–120px vertical padding for hero and full-width sections.
- **Section-level spacing:** 64px top/bottom padding between distinct content areas.
- **Component-level spacing:** 32px between cards; 16px inside cards.
- **Text spacing:** 1.6–1.75 `line-height` for body text to ensure legibility on dark backgrounds.

### Grid
- **Desktop layout:** Max-content-width of `1280px`, centered with auto horizontal margins.
- **Projects grid:** 2-column asymmetric layout. Left card can be wider (2/3) than right (1/3) for editorial variety.
- **Skills grid:** 4-column equal grid with 32px gap.
- **Navigation:** Full-width sticky top bar with glassmorphism — content constrained to the 1280px column.

### Asymmetry Principle
Avoid perfectly symmetric layouts. Alternate content placement — hero text on left while accent visual bleeds off the right edge. Section subtitles can be offset using `ml-auto` or absolute positioning for typographic tension.

---

## 6. Motion & Interaction Principles

### Micro-Animations (CSS Transitions)
- All state changes (hover, focus, active) should transition in `200ms ease-in-out`.
- Card elevation shifts (background color) use `transition: background-color 200ms ease`.
- Button hover brightness: `filter: brightness(1.08)` with `200ms ease`.

### The "Content Spotlight" Signature Effect
For premium hover-state interactions on project cards, a `secondary` (Soft Sky Blue `#89D0ED`) or `tertiary` (Teal `#B3F4E1`) **radial gradient glow** follows the cursor *behind* transparent card elements, subtly illuminating the "monolith" beneath. This is the signature micro-interaction of this portfolio.

### Entrance Animations
- Content sections fade in + translate up (`translateY(20px) → 0`) on scroll-enter with `400ms ease-out` delay staggered by 80ms per item.
- Hero headline enters with a text-reveal clip animation (clip-path width 0 → 100%).

---

## 7. Do's and Don'ts

### ✅ Do
- Use **massive headings** that break across lines in unexpected ways to create rhythm.
- Apply `primary` (Solar Amber `#FFC107`) **sparingly** — only for the single most important conversion point per section.
- Embrace **empty space**. If a section feels even slightly crowded, double the padding.
- Use `on_surface_variant` (#D4C5AB) for all body text — pure white is too harsh.
- Use **background shifts** (not lines) to separate layout sections.

### ❌ Don't
- Use `#FFFFFF` for long-form body text — it creates eye-strain and reads "cheap" on charcoal.
- Use standard box shadows (`0 4px 10px rgba(0,0,0,0.3)`) — they look dated.
- Use `1px solid` borders to divide the header from the body or any layout section.
- Center large hero text — left-alignment commands more authority.
- Mix font families — Inter is the sole typeface at all weights.
