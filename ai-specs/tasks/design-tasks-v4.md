# CV Design Task Briefs v4

9 tasks across three themes: cv.html layout fix, EN/ES language toggle, anti-AI pattern cleanup.
Same structure as previous task files.

---

## Theme 1: cv.html layout fix

---

## Task X01 — Fix cv.html entry-topbar misalignment

**Requirement:** Align the back link with the CV card content via a shared wrapper

**Story**
As a visitor on cv.html, I want the "← Engineering Notebook" link to align with the left edge of the CV card, so that the page does not look like two disconnected floating elements.

**Objective**
Wrap `entry-topbar` and `cv-page` in a shared `cv-shell` container that matches `cv-page` width, eliminating the visual disconnect between the full-width back link and the centered card.

**Context**
Currently `entry-topbar` is a full-viewport-width flex container while `cv-page` is centered at `min(920px, calc(100% - 48px))`. At 1440px viewport this means the back link sits ~260px to the left of the card's left edge. They look unrelated. Wrapping both in a container at the same width as `cv-page` aligns them visually.

**Scope**
In:
1. In cv.html, wrap `<div class="entry-topbar">` and `<main class="cv-page">` inside a new `<div class="cv-shell">`.
2. In styles.css, add:
```css
.cv-shell {
  width: min(920px, calc(100% - 48px));
  margin: 28px auto 40px;
}
```
3. Remove `width`, `margin` from `.cv-page` (they move to `.cv-shell`). Add `width: 100%; margin: 0;` to `.cv-page` or just remove those properties since the shell handles it.
Out: Changing cv.html content, changing the back link style.

**Closed decisions**
- Wrapper: `.cv-shell` — same width formula as original `.cv-page`
- `.cv-page` becomes full-width inside the shell
- `margin-top: 0` on `.cv-page` since the shell handles vertical margin

**Success criteria**
- "← Engineering Notebook" link left-aligns with the left edge of the CV card
- At mobile (≤780px), both still fit correctly within the wrapper

---

## Task X02 — Add horizontal rule between cv.html sections

**Requirement:** Add visible separators between CV sections for scannability

**Story**
As a recruiter reading the CV, I want clear visual breaks between Experience, Selected Systems, Technology and Public Repositories, so that I can jump to the right section without reading linearly.

**Objective**
Add a subtle horizontal rule between `.cv-section` blocks to improve at-a-glance scannability.

**Context**
`.cv-section` blocks have `margin-top: 24px` but no visual separator. On a printed/PDF CV this is standard. On screen with the current card treatment the sections blend together. A 1px rule at `var(--line)` color between sections matches the existing line system and is consistent with other dividers on the site (sheet-header, mission-block).

**Scope**
In: Add to styles.css:
```css
.cv-section + .cv-section {
  padding-top: 20px;
  border-top: 1px solid var(--line);
}
```
Out: Changing section content, headings, or layout.

**Closed decisions**
- Border: `1px solid var(--line)` — same as all other section dividers in the site
- Selector: `.cv-section + .cv-section` — only between sections, not before the first

**Success criteria**
- Visible dividing line between each CV section
- Consistent with the line system used in the rest of the site

---

## Theme 2: EN/ES language toggle

---

## Task I01 — Add EN/ES language toggle with JS i18n

**Requirement:** Implement a client-side EN/ES language toggle for the home page

**Story**
As a Spanish-speaking recruiter viewing the notebook, I want to read the content in Spanish, so that I can evaluate Sergio's profile in my preferred language without navigating to a separate URL.

**Objective**
Add a language toggle button (EN / ES) that swaps all visible text on index.html between English and Spanish without a page reload. Persist the preference in localStorage.

**Context**
The site is currently English-only. Spanish-speaking recruiters — relevant for a Madrid-based engineer working in the Spanish energy sector — benefit from an ES option. A JS i18n approach (single HTML file + translations object) is simpler than maintaining duplicate HTML files and avoids SEO complexity for a personal site.

**Scope**
In:
1. Create `translations.js` at repo root with:
```js
const TRANSLATIONS = {
  en: { /* all translatable strings keyed by data-i18n value */ },
  es: { /* Spanish equivalents */ }
};
```
2. Add `data-i18n="key"` attributes to all translatable text nodes in index.html (section headings, descriptions, CTA labels, nav items — NOT technical proper nouns like "Spring Boot", "Kubernetes", "OCM Brain").
3. Add a toggle button `<button class="lang-toggle" data-lang="en">ES</button>` to the `.rail-meta` area in index.html (and to `.mobile-nav-shell` for mobile).
4. In main.js, add:
   - `applyLanguage(lang)` function that reads `TRANSLATIONS[lang]` and writes `textContent` to all `[data-i18n]` nodes
   - On load: read `localStorage.getItem('lang') || 'en'`, apply
   - On toggle click: swap lang, save to localStorage, re-apply
5. Add `.lang-toggle` styles to styles.css: small Space Mono pill button in the rail footer, copper accent when ES is active.
6. Add `<script src="./translations.js"></script>` before `main.js` in index.html.

Out:
- Translating notes/*.html or journal/index.html (those are deeper pages, out of scope for v1)
- Translating cv.html (separate task if needed)
- SEO hreflang (not needed for a personal site JS toggle)
- Technical terms: keep in original language (Spring Boot, PostgreSQL, Kubernetes, etc.)

**Closed decisions**
- Architecture: separate `translations.js` file (keeps main.js clean, translations are easy to edit)
- Scope: index.html only (home page) for v1
- Default: English (`en`)
- Toggle label: shows the OTHER language ("ES" when in English, "EN" when in Spanish) — common pattern
- Non-translatable: all proper nouns, tech stack names, URLs, numbers, dates

**Key strings to translate (English → Spanish examples):**
- "Engineering Notebook" → "Cuaderno de Ingeniería"
- "I build production systems." → "Construyo sistemas en producción."
- "Backend · Data · Artificial Intelligence" → "Backend · Datos · Inteligencia Artificial"
- "Current Mission" → "Misión Actual"
- "Operating backend, data and AI systems..." → "Operando sistemas de backend, datos e IA..."
- "Download CV" → "Descargar CV"
- "Open case files" → "Ver expedientes"
- "Systems in Production" → "Sistemas en Producción"
- "Engineering Decisions" → "Decisiones de Ingeniería"
- "Evidence Trail" → "Trazabilidad"
- "Engineering Journal" → "Diario de Ingeniería"
- "Public Proof" → "Prueba Pública"
- "Repository" → "Repositorio"
- Section subtitles, decision copy, evidence copy, journal entry titles and descriptions

**Success criteria**
- Clicking ES toggles all translatable text to Spanish without reload
- Clicking EN toggles back to English
- Preference persists on page refresh (localStorage)
- Technical terms (Spring Boot, PostgreSQL, etc.) never translate
- Rail and mobile nav both show the toggle button
- `node --check main.js` passes

---

## Theme 3: Anti-AI pattern cleanup

---

## Task A01 — Remove invisible blob gradients from body background

**Requirement:** Remove the two radial-gradient blobs from the body background

**Story**
As a designer reviewing the site, I want to remove decorative elements that add no visible value, so that the background does not contain the most recognizable "AI-generated landing page" pattern.

**Objective**
Simplify the body background to the linear paper gradient only. The radial copper/green blobs at 6-8% opacity are invisible in practice and identify the design as AI-generated.

**Context**
The current body background has three layers:
```css
background:
  radial-gradient(circle at 8% 10%, rgba(181,99,62,0.08), transparent 20%),
  radial-gradient(circle at 85% 14%, rgba(43,123,82,0.06), transparent 18%),
  linear-gradient(180deg, var(--paper-2), var(--paper));
```
The two radial blobs are at 8% and 6% opacity — barely visible on any calibrated screen, yet they are a signature pattern of AI-generated "premium" landing pages (colorful blobs in corners). Removing them simplifies the CSS and removes the AI signal.

**Scope**
In: Simplify body `background` in styles.css to:
```css
background: linear-gradient(180deg, var(--paper-2), var(--paper));
```
Out: Changing the paper colors, changing the noise texture (V08).

**Closed decisions**
- Remove both radial gradients
- Keep the linear-gradient paper — it is visible and provides warmth
- Keep the noise texture (separate SVG data URI, also in body background) — it adds real texture

**Note on implementation:** The noise texture from V08 is also a `background` layer. Combine correctly:
```css
background:
  url("data:image/svg+xml,..."),  /* noise — keep */
  linear-gradient(180deg, var(--paper-2), var(--paper));  /* paper — keep */
```

**Success criteria**
- Body background has no radial blob gradients
- Linear paper gradient and noise texture remain
- Page looks identical or cleaner at a glance

---

## Task A02 — Consolidate border-radius to two CSS variables

**Requirement:** Replace the 7 different border-radius values with two design system variables

**Story**
As a developer reading styles.css, I want a consistent radius system, so that the codebase does not have 28px/24px/22px/20px/18px/16px/14px/12px scattered across selectors with no apparent logic.

**Objective**
Reduce border-radius to two semantic variables and apply them consistently.

**Context**
Current border-radius values in use:
- `28px` — hero-sheet
- `24px` — section-sheet, record-sheet, cv-page
- `22px` — casefile
- `20px` — capture-card (removed), map-node: 14px
- `18px` — record-card, decision-record, evidence-card, journal-entry, repo-link, entry-card, mermaid-card, dossier-step, decision-line, journal-record, journal-detail
- `16px` — snippet, journal-detail
- `14px` — map-node, figure (inline)
- `999px` — pill shapes (buttons, badges, chips, case-status)

This proliferation of values is a classic AI CSS output pattern. A real design system uses 2-3 radius values with clear intent.

**Proposed system:**
```css
--radius-lg: 20px;  /* large containers: sections, hero, cv-page */
--radius-md: 14px;  /* cards, inner elements: record-card, decision-record, chips within cards */
--radius-pill: 999px;  /* pills: buttons, badges, status indicators */
```

**Scope**
In:
1. Add `--radius-lg` and `--radius-md` to `:root` in styles.css.
2. Replace all fixed border-radius values:
   - 28px, 24px, 22px → `var(--radius-lg)` (20px)
   - 18px, 16px, 14px → `var(--radius-md)` (14px)
   - 999px stays — already semantic as pill
3. The `--radius-pill: 999px` variable is optional (999px is already semantic enough).
Out: Changing the pill shapes, changing any layout dimensions.

**Closed decisions**
- `--radius-lg: 20px` — large containers (was 22–28px, unified to 20px)
- `--radius-md: 14px` — cards and inner elements (was 14–18px, unified to 14px)
- Inline style on the figure in index.html (evidence GIF) also updated to `14px`

**Success criteria**
- No raw pixel border-radius values in styles.css except pill (999px) and the two variables
- Visual appearance is nearly identical — reduction of 2-4px on some elements is acceptable
- `--radius-lg` and `--radius-md` are defined in `:root`

---

## Task A03 — Add shadow hierarchy: sections flat, hover elevated

**Requirement:** Remove the universal shadow from all section cards; restore shadow on hover

**Story**
As a visitor reading the notebook, I want visual depth to indicate when an element is interactive, not just decorative, so that sections and cards feel grounded rather than floating.

**Objective**
Remove `--shadow` from static sections. Keep shadow only for the hero (primary focal element) and on hover states.

**Context**
`--shadow: 0 20px 60px rgba(20, 32, 51, 0.08)` is applied to: `.hero-sheet`, `.section-sheet`, `.entry-hero`, `.entry-section`, `.cv-page`. Every major container has the same large soft shadow. This creates a "floating card" aesthetic that is a direct AI-generated design pattern — everything appears to hover above the background equally. In a real design system, shadow indicates elevation/importance hierarchy.

**Proposed hierarchy:**
- Hero: keeps `--shadow` (highest importance, entry point)
- Sections: `box-shadow: none` (flat, part of the page structure)
- Interactive cards (casefile, repo-link, journal-entry): `--shadow` only on `:hover`

**Scope**
In:
1. Remove `box-shadow: var(--shadow)` from `.section-sheet` in styles.css.
2. Keep `box-shadow: var(--shadow)` on `.hero-sheet` only.
3. Add to interactive card hover states:
```css
.casefile:hover,
.repo-link:hover,
.journal-entry:hover {
  box-shadow: var(--shadow);
}
```
Out: Changing the shadow variable value, changing the hero design.

**Closed decisions**
- Hero: shadow stays (single elevated focal point)
- All section-sheets: shadow removed (flat, structural)
- Interactive cards: shadow on hover (elevation = action signal)

**Success criteria**
- Sections sit flat on the page background (no floating)
- Hero remains visually elevated
- Interactive cards lift on hover with shadow

---

## Task A04 — Replace glass morphism on secondary cards with solid white

**Requirement:** Use solid white backgrounds on inner cards instead of translucent rgba

**Story**
As a designer reviewing the site, I want inner cards (record-card, decision-record, evidence-card) to feel grounded and document-like, so that the page stops looking like a floating glass dashboard.

**Objective**
Replace `rgba(255, 255, 255, 0.72)` and similar translucent backgrounds on inner cards with `#ffffff` or `var(--paper-2)` solid backgrounds.

**Context**
The following elements use translucent backgrounds:
- `.hero-sheet`, `.section-sheet`: `rgba(255,255,255,0.58)` — keep (they are on the gradient background, translucency is intentional for the section level)
- `.record-card`, `.decision-record`, `.evidence-card`, `.journal-entry`, `.repo-link`, `.entry-card`: `rgba(255,255,255,0.72)` — replace with solid
- `.casefile`: `rgba(255,255,255,0.72)` — replace with solid
- `.map-node`: `rgba(255,255,255,0.78)` — replace with solid

Glass morphism on nested cards (cards inside sections that are already on a light background) gains nothing — there is no rich background to show through. The result is just slightly-less-opaque white, which is indistinguishable from solid white to the eye but is a classic AI aesthetic marker.

**Scope**
In: In styles.css, replace these backgrounds:
- `.record-card, .decision-record, .evidence-card, .journal-entry, .repo-link`: `rgba(255,255,255,0.72)` → `#fff`
- `.casefile`: `rgba(255,255,255,0.72)` → `#fff`
- `.map-node`: `rgba(255,255,255,0.78)` → `#fff`
- `.casefile.is-active`: keep as gradient (it uses a warm gradient, not glass) — no change
- Keep `.hero-sheet` and `.section-sheet` translucent — they sit on the page gradient

Out: Changing section-level backgrounds, changing hero, changing the rail.

**Closed decisions**
- Inner cards: `#fff` solid
- Section containers: keep translucent (they are against the gradient body)
- Active casefile gradient: keep (it is visually distinctive, not glass)

**Success criteria**
- Inner cards render in solid white
- No visible change at a glance — the cards were already nearly opaque
- Section containers maintain their soft translucency against the body background

---

## Task A05 — Remove or replace the map-block decorative diagram

**Requirement:** Remove the floating node diagram from the hero or replace it with something more documentary

**Story**
As a visitor reading the hero, I want the right column to support the notebook concept, so that it does not look like a generic "tech company landing page" diagram.

**Objective**
Remove the map-block floating node diagram. Replace with nothing (let the hero breathe) or with a simple textual system list that fits the notebook aesthetic better.

**Context**
The `.map-block` shows 4 floating cards (OCM Brain, Energy Simulator, Smart OCR, Data Processing) connected to a dashed border via horizontal lines. The DESIGN_BRIEF explicitly says: "avoid concept-art overload, avoid decorative AI visual noise." The floating-cards-with-dashed-connectors diagram is one of the most recognizable patterns in AI-generated tech landing pages.

After the V05 change (real system names), the map is more grounded. But the visual pattern — absolute positioned floating nodes, dashed lines, right-column diagram — still reads as generic.

**Option A (recommended):** Replace the map-block entirely with a plain text list of the 4 systems in a more documentary format:
```html
<div class="system-index" aria-hidden="true">
  <span class="meta-label">Active systems</span>
  <ol>
    <li>OCM Brain</li>
    <li>Energy Simulator</li>
    <li>Smart OCR</li>
    <li>Data Processing</li>
  </ol>
</div>
```
Style: numbered list, Instrument Serif for system names, no floating, no connectors. Reads like a notebook table of contents entry.

**Option B:** Remove the map-block entirely and let the hero-grid become 2-column (identity + hero-copy). The hero becomes calmer and more focused.

**Scope**
In: Replace `.map-block` div and its 4 `.map-node` children in index.html with the `.system-index` element (Option A) or nothing (Option B).
Remove `.map-block`, `.map-node`, `.map-node-top/mid/left/bottom` styles from styles.css.
Add `.system-index` styles if Option A.
Update `.hero-grid` column template: remove the `280px` third column if Option B.
Out: Changing the hero copy, identity block, or any other hero section content.

**Closed decisions**
- Preferred: Option A — keeps 3-column layout, replaces diagram with documentary list
- `.system-index ol` style: no bullets, numbered with `counter`, Instrument Serif 1.2rem, `var(--ink)`, generous line-height
- `aria-hidden="true"` — decorative/navigational, not primary content

**Success criteria**
- No floating node diagram in the hero
- Hero right column shows a clean system index list
- No traces of `.map-block` or `.map-node` CSS remain

---

## Task A06 — Differentiate at least one section visually from the default card treatment

**Requirement:** Give the Engineering Journal section a distinct visual treatment to break the uniform card stack

**Story**
As a visitor scrolling the notebook, I want visual variety between sections, so that the page does not read as an endless stack of identical white cards.

**Objective**
Apply a different visual treatment to the Engineering Journal section — darker background or no-card layout — to create one visual break in the uniform section pattern.

**Context**
Every section uses the same `.section-sheet` treatment: white translucent card, border, rounded corners, shadow (now removed per A03). After scrolling through Hero, Systems, Decisions, Evidence Trail — all identical card containers — the page becomes monotonous. One section with a different treatment creates visual rhythm and signals "this is a different kind of content."

The Engineering Journal is the best candidate: it is explicitly "not a blog" (per the brief), has a different nature from the systems/technical sections, and its 2×2 entry grid would benefit from a darker, more editorial background.

**Proposed treatment for `.journal-sheet`:**
```css
.journal-sheet {
  background: var(--ink);  /* deep navy */
  border-color: transparent;
  color: #f8f7f3;
}
.journal-sheet .section-head h2,
.journal-sheet .section-head p {
  color: #f8f7f3;
}
.journal-sheet .journal-entry {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.1);
  color: #f8f7f3;
}
.journal-sheet .journal-entry h3,
.journal-sheet .meta-label {
  color: #f8f7f3;
}
.journal-sheet .journal-entry:hover {
  border-color: rgba(181,99,62,0.5);
}
.journal-sheet .journal-meta span {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.12);
  color: rgba(248,247,243,0.8);
}
```

**Scope**
In: Add the `.journal-sheet` overrides to styles.css.
Out: Changing any other section's treatment, changing the journal content, touching notes pages.

**Closed decisions**
- Section: Engineering Journal — conceptually distinct from technical sections, good candidate for dark treatment
- Background: `var(--ink)` — the same deep navy as the sidebar, creates a visual echo of the notebook spine
- Text: cream/white tones for readability
- Entry cards: dark glass (rgba white at low opacity) — appropriate since the section bg is now dark

**Success criteria**
- Journal section renders with dark navy background
- All text is readable in cream/white tones
- Hover state on entries uses the copper accent (matches the rail hover language)
- No other sections are affected
