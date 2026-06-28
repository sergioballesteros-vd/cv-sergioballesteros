# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Static personal site for Sergio Ballesteros — framed as an **Engineering Notebook**, not a CV template. No build system, no framework, no package.json. Pure HTML/CSS/JS served directly.

Deployed via GitHub Pages (`sergioballesteros-vd.github.io/cv-sergioballesteros`).

## Development

```bash
# Serve locally (from repo root)
python3 -m http.server 8080

# Syntax check JS
node --check main.js
node --check translations.js
```

No tests, no linter config, no CI beyond GitHub Pages deploy.

## File map

| File | Role |
|------|------|
| `index.html` | Main page — all sections in one HTML file |
| `styles.css` | All CSS — one file, structured by section |
| `main.js` | All JS — i18n, project switcher, scroll observer |
| `translations.js` | EN/ES string map (`TRANSLATIONS.en` / `TRANSLATIONS.es`) |
| `cv.html` | Printable CV page (standalone, links from main) |
| `notes/*.html` | Per-project deep-dive pages (static, styled via styles.css) |
| `journal/index.html` | Engineering journal page |
| `AGENTS.md` | Design brief, copy rules, visual direction (read before any UI change) |
| `CONTENT.md` | Canonical content inventory — source of truth for copy |
| `ai-specs/tasks/` | Task briefs for planned work |

## Architecture

**No framework.** The entire site is:

1. `index.html` — 7 sections in a single scrollable page with a sticky sidebar rail
2. `styles.css` — CSS variables in `:root`, then styles roughly in DOM order
3. `main.js` — three responsibilities:
   - `applyLanguage(lang)` — EN/ES toggle via `data-i18n` attributes + `TRANSLATIONS` object
   - `renderProject(project, lang)` — swaps the record sheet when a casefile is clicked
   - `IntersectionObserver` — active nav state (both desktop rail and mobile sticky nav)

**i18n pattern:**
- Translatable text nodes have `data-i18n="key"` attributes
- `main.js` reads `TRANSLATIONS[lang][key]` and sets `textContent`
- Dynamic content (project descriptions, notes) lives in the `projects` object in `main.js` with an `i18n` subobject per project
- Technical terms (Spring Boot, PostgreSQL, project names) are never translated

**CSS variables:**
```css
--paper / --paper-2   /* warm white backgrounds */
--ink                 /* near-black foreground */
--muted               /* secondary text */
--copper              /* accent — CTAs, active states, meta-labels in content */
--line / --line-strong/* borders */
--shadow              /* used only on hero-sheet + hover states */
--radius-lg: 20px     /* section containers */
--radius-md: 14px     /* inner cards */
```

## Key constraints

**Design identity** (from AGENTS.md — non-negotiable):
- Systems are the protagonist, not Sergio's biography
- No generic portfolio look — if a choice looks like a template, it's wrong
- No AI-looking decorative chrome (no pill-chip grids, no glass morphism on nested cards, no uniform shadows everywhere)
- Copy uses operational language: "In production", "Healthy", "Case File" — not "passionate", "motivated", "creative"

**CSS conventions:**
- Sections are `.section-sheet` (flat, no shadow). Only `.hero-sheet` has shadow
- Inner cards (`.record-card`, `.decision-record`, `.journal-entry`, `.repo-link`) use `#fff` solid background
- Journal section (`.journal-sheet`) overrides to dark navy — the one visually distinct section
- Space Mono is reserved for data tokens: meta-labels, status badges, numbers, timestamps. Navigation and body use Manrope

**JS conventions:**
- `currentLang` is module-level state in `main.js`
- `renderProject` must be called with `(project, currentLang)` — never without lang arg
- `applyLanguage` re-renders the active project and updates `document.title` and `document.documentElement.lang`

## Adding content

**New translation key:** add to both `TRANSLATIONS.en` and `TRANSLATIONS.es` in `translations.js`, add `data-i18n="key"` to the element in `index.html`.

**New project:** add entry to `projects` object in `main.js` (with `i18n` subobject), add a `.casefile` button in `index.html`, add notes page in `notes/`.

**New section:** add to both rail nav and mobile nav in `index.html` (with `data-i18n` on the text span), add translations, use `.section-sheet` class.

## Assets

- Portrait: `portrait.webp` (4KB) with `portrait.png` fallback via `<picture>` — ≤50KB target
- Evidence screenshots: `assets/evidence/` — ≤300KB each, all must be referenced in HTML
- No unreferenced binaries in the working tree

## Print

`cv.html` is the printable CV. `@media print` in `styles.css` resets `.cv-page` to full-width, removes border/radius/shadow, hides the back link, and forces white background. Test with Cmd+P in browser.
