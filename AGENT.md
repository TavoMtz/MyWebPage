# Agent Instructions (AGENT.md)

Welcome to the **MyWebPage** portfolio project workspace. As an AI Agent working in this repository, you must adhere strictly to the following architectural, design, and structural rules to ensure consistency, quality, and a premium aesthetic.

## 1. Design System Strict Adherence
All visual modifications and new components MUST strictly follow the "Luminescent Monolith" design system defined in `DESIGN.md`.
- **Read First:** Always review `DESIGN.md` before writing any CSS or generating new UI components.
- **Typography:** Only use `Inter`. Follow the specified font weights and color roles.
- **Colors:** Use the exact HEX codes provided in the Color Palette section (e.g., Infinite Canvas Black `#131313`, Solar Amber `#FFC107`). Do not introduce new colors or "generic" defaults.
- **The "No-Line" Rule:** Never use `1px solid` borders for layout separation. Use background tone shifts and generous negative space instead.
- **Atmosphere:** Cinematic, dark, monolithic, premium, and intentional asymmetry.

## 2. HTML Standards & Accessibility
All markup MUST comply with the rules outlined in `instructionsHTML.md`.
- **Semantic Tags:** Use appropriate sectioning tags (`<main>`, `<section>`, `<nav>`, `<article>`, etc.) instead of generic `<div>` wrappers.
- **Accessibility (a11y):** Ensure proper heading hierarchies (one `<h1>` per page), use `aria` attributes where necessary, and always include meaningful `alt` text on images.
- **Inline Styles:** Forbidden. Use external stylesheets and semantic class names (e.g., `kebab-case`).

## 3. Stitch Skills & MCP Integration
This workspace leverages the Google Stitch MCP server and specialized agent skills located in `.agents/skills/`.
- When asked to create, edit, or iterate on designs, utilize the available skills such as:
  - `stitch-loop`: For autonomous, iterative site-building using the baton-passing pattern.
  - `taste-design` & `design-md`: For maintaining and enforcing premium design tokens.
  - `enhance-prompt`: For transforming vague UI ideas into high-fidelity Stitch prompts.
- Ensure any generated screens align with the existing `DESIGN.md` and use the established Stitch project context.

## 4. Operational Directives
- **Don't Assume:** If a pattern is unclear, consult the core documentation (`DESIGN.md`, `instructionsHTML.md`) rather than falling back on generic frameworks.
- **Keep it Premium:** This is a high-end portfolio. Avoid basic "MVP" aesthetics. Every element should feel deliberate and polished.
- **Language & Communication:** The user may communicate in Spanish (e.g., "Genera un AGENT.md") or English. Respond and assist in their preferred language, but keep source code, class names, and project documentation in standard English.

---
*By following these rules, you ensure the portfolio remains a stunning, cohesive, and highly functional digital monolith.*
