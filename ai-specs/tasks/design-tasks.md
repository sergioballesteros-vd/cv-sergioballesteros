# CV Design Task Briefs

10 tasks derived from the design audit of 2026-06-26. Same structure as audit-tasks.md:
Story → Objective → Context → Scope → Closed decisions → Success criteria.

---

## Task D01 — Fix hardcoded record-callout text

**Requirement:** Make "Featured system dossier" label dynamic per selected project

**Story**
As a recruiter switching between case files, I want the record sheet label to reflect the selected project, so that "Featured system dossier" does not appear on Data Processing.

**Objective**
Update `renderProject()` in main.js to write the callout label dynamically, or remove it if it only applies to OCM Brain.

**Context**
The `.record-callout` element always shows "Featured system dossier" regardless of which casefile button is active. It is a static string in the HTML. When the user clicks Data Processing or Smart OCR, the record sheet updates its title, description, stack, and notes — but the callout stays. This is a credibility bug: the label no longer matches the content.

**Scope**
In: Either (a) add a `callout` field to each project in `projects` in main.js and write it in `renderProject()`, or (b) replace the callout with a neutral label like "System dossier" that works for all projects.
Out: Redesigning the record sheet layout.

**Closed decisions**
- Approach (b): neutral label "System dossier" for all projects. Simpler, no new data field needed.
- If OCM Brain should remain "Featured", use approach (a) with `callout: "Featured system dossier"` on ocm and `callout: "System dossier"` on the rest.
- Preferred: approach (a) — preserves the distinction for OCM Brain, fixes the bug for the rest.

**Success criteria**
- Selecting any casefile shows a callout label that accurately describes that project
- "Featured system dossier" only appears when OCM Brain is selected

---

## Task D02 — Reduce hero-subtitle size and weight

**Requirement:** Tone down "Backend. Data. Artificial Intelligence." subtitle

**Story**
As a first-time visitor, I want the hero to feel calm and restrained, so that the subtitle does not compete visually with the main headline.

**Objective**
Reduce the visual weight of `.hero-subtitle` to support the h1 instead of challenging it.

**Context**
`.hero-subtitle` is currently `Space Mono` at `1.85rem`. At that size and typeface it reads with nearly the same visual weight as the `h1` serif. The DESIGN_BRIEF calls for "calm, restrained, minimal hero." The subtitle is neither calm nor restrained at 1.85rem monospace.

**Scope**
In: Change `.hero-subtitle` in styles.css to `Manrope` at `1.1rem`, weight `500`, color `var(--muted)`. Remove the `Space Mono` assignment from this element.
Out: Changing the h1, changing layout, touching font loading.

**Closed decisions**
- Font: Manrope (already loaded, used for body)
- Size: `1.1rem`
- Weight: `500`
- Color: `var(--muted)` — secondary, not competing with the h1
- Letter spacing: `0.04em` — slight openness without monospace feel

**Success criteria**
- Hero subtitle reads as a caption to the h1, not a second headline
- No monospace font in the subtitle
- Visual hierarchy is clear: h1 > subtitle > mission block

---

## Task D03 — Restrict Space Mono to technical data only

**Requirement:** Remove Space Mono from navigation, subtitles and structural UI elements

**Story**
As a visitor reading the notebook, I want clear typographic hierarchy, so that I can tell at a glance which text is a label, which is navigation, and which is body copy.

**Objective**
Reserve Space Mono for technical data tokens: status badges, meta-labels, timestamps, number chips. Switch all structural and navigational text to Manrope.

**Context**
Space Mono currently appears in: rail nav links, rail nav numbers, sheet-kicker, sheet-date, hero-subtitle (after D02), case-status, case-emphasis, case-link, record-version, record-link, mobile-nav, journal-meta, entry-home. Everything feels equally "terminal", which means nothing stands out as technical. The DESIGN_BRIEF says "restrained color / strong typography" — overusing the monospace typeface defeats typographic hierarchy.

**Scope**
In: Remove `font-family: "Space Mono"` from these selectors in styles.css and replace with Manrope or inherit:
- `.rail-nav a` (navigation — use Manrope 500)
- `.sheet-kicker`, `.sheet-date` (structural labels — use Manrope 500 uppercase)
- `.case-link` (CTA — use Manrope 600)
- `.record-link` (CTA — use Manrope 600)
- `.entry-home` (navigation — use Manrope 500)
Keep Space Mono on: `.meta-label`, `.case-status`, `.case-emphasis`, `.record-version`, `.journal-meta span`, `.rail-nav span` (numbers only), `.mobile-nav a`.
Out: Changing font loading, touching Instrument Serif, changing font sizes.

**Closed decisions**
- Space Mono stays on: data chips, badges, status indicators, number annotations
- Space Mono goes from: all navigation links, CTAs, structural kickers/dates

**Success criteria**
- Navigation text renders in Manrope
- Status badges and meta-labels remain in Space Mono
- Visual reading hierarchy is improved: headings → body → data markers

---

## Task D04 — Improve decision records scan pattern

**Requirement:** Visually separate labels from content in engineering decision records

**Story**
As a technical reviewer scanning the Decisions section, I want to read each decision in under 5 seconds, so that I can assess the engineering reasoning quickly without parsing inline labels.

**Objective**
Make Context / Decision / Tradeoffs scannable by separating label from content visually.

**Context**
Decision records currently use:
```html
<p><strong>Context:</strong> Long-lived services needed...</p>
<p><strong>Decision:</strong> Standardize core backend...</p>
<p><strong>Tradeoffs:</strong> Heavier than minimal...</p>
```
The bold inline label and the body text flow together. A fast scanner cannot separate signal from explanation. A visual separation — label above, content below — would make each record readable in 2–3 seconds instead of requiring full linear reading.

**Scope**
In: Replace `<p><strong>Label:</strong> content</p>` with a `<dl>` structure per decision:
```html
<dl class="decision-body">
  <dt>Context</dt>
  <dd>Long-lived services needed...</dd>
  <dt>Decision</dt>
  <dd>Standardize core backend...</dd>
  <dt>Tradeoffs</dt>
  <dd>Heavier than minimal...</dd>
</dl>
```
Add `.decision-body` styles to styles.css: `dt` in Space Mono uppercase at 0.72rem copper, `dd` in Manrope body color, `dd + dt` with `margin-top: 12px`.
Out: Redesigning the decision cards layout, adding new content.

**Closed decisions**
- Element: `<dl>` (semantic for label-value pairs)
- `dt` style: Space Mono, 0.72rem, var(--copper), uppercase — same pattern as `.meta-label`
- `dd` style: Manrope body, var(--muted) — same as current paragraph color
- Margin reset: `dd { margin: 4px 0 0 0 }`, no browser default indent

**Success criteria**
- Each decision record is readable in a top-to-bottom scan without following inline text
- Labels render visually distinct from content
- Semantic HTML passes validation (dl > dt + dd structure)

---

## Task D05 — Replace generic map-node labels with real system names

**Requirement:** Change map-block node labels to actual production system names

**Story**
As a visitor reading the hero section, I want the system map to show real systems, so that the decorative diagram is grounded in actual work rather than generic categories.

**Objective**
Replace "Applications", "Data pipelines", "AI services", "Infrastructure" with the four real system names from the notebook.

**Context**
The `.map-block` shows four floating nodes with generic category labels. The DESIGN_BRIEF says "systems first" and "these are the systems Sergio has built." The map currently shows taxonomy, not systems. Replacing with real names (OCM Brain, Energy Simulator, Smart OCR, Data Processing) makes the map a real system overview instead of a generic diagram.

**Scope**
In: In index.html, change the four `.map-node` text contents:
- "Applications" → "OCM Brain"
- "Data pipelines" → "Energy Simulator"
- "AI services" → "Smart OCR"
- "Infrastructure" → "Data Processing"
Out: Making the nodes interactive, linking them to case files, CSS changes.

**Closed decisions**
- Names: exact match to the case file titles in the Systems section
- No other changes to the map-block markup or CSS

**Success criteria**
- Map nodes show the four real system names
- No layout change — same positioning, same styles

---

## Task D06 — Fix trail grid vertical alignment

**Requirement:** Set `align-items: start` on the `.trail` grid

**Story**
As a visitor reading the Evidence Trail, I want the four steps to align at the top, so that the step with the GIF does not create a visual imbalance against the text-only steps.

**Objective**
Prevent the GIF in step 3 from stretching the other columns to match its height.

**Context**
`.trail` is `display: grid; grid-template-columns: repeat(4, 1fr)`. Default `align-items` is `stretch`, so all four steps match the height of the tallest step (step 3 with the GIF). This creates a lot of empty white space in steps 1, 2 and 4. The copper top border on `.trail-step` should anchor each step to the top, not fill equal height.

**Scope**
In: Add `align-items: start` to `.trail` in styles.css. One line.
Out: Changing the GIF, changing step content, responsive layout.

**Closed decisions**
- One CSS property change: `align-items: start` on `.trail`

**Success criteria**
- Each trail step is as tall as its content, not the tallest step
- Step 3 (with GIF) does not cause blank space in steps 1, 2, 4

---

## Task D07 — Make data-reveal scroll-triggered instead of page-load

**Requirement:** Animate sections when they enter the viewport, not when the page loads

**Story**
As a visitor loading the notebook, I want sections to reveal as I scroll to them, so that the animation matches the notebook-exploration metaphor instead of firing all at once on load.

**Objective**
Replace the current page-load `data-reveal` animation (all sections, staggered delay) with scroll-triggered reveals using IntersectionObserver.

**Context**
`main.js` currently runs:
```js
document.querySelectorAll("main section, .notebook-rail").forEach((section, index) => {
  section.setAttribute("data-reveal", "");
  section.style.animationDelay = `${index * 60}ms`;
});
```
This fires all animations on page load. Section 7 animates at 420ms even though the user is still at the top of the page. The `.notebook-rail` (sidebar navigation) also animates — navigation should be immediately visible, not reveal with a delay. Scroll-triggered reveals are more coherent with the "opening a notebook" metaphor.

**Scope**
In: Remove the current `forEach` block. Replace with an `IntersectionObserver` that adds `data-reveal` to each `main section` when it crosses `rootMargin: "0px 0px -10% 0px"`. Remove `.notebook-rail` from the selector — the sidebar should not animate.
Out: Changing the `@keyframes rise` animation itself, changing CSS, adding new animation types.

**Closed decisions**
- Observer: `threshold: 0`, `rootMargin: "0px 0px -10% 0px"` — trigger when section top enters viewport
- `once: true` behavior: after `data-reveal` is set, `observer.unobserve(section)` — each section animates only once
- Sidebar excluded: `.notebook-rail` never gets `data-reveal`
- Respect `prefers-reduced-motion`: skip observer and never set `data-reveal` if `matchMedia("(prefers-reduced-motion: reduce)").matches`

**Success criteria**
- Each section animates the first time it enters the viewport
- Sidebar never animates
- `prefers-reduced-motion` users see no animation
- No visible animation fires on sections below the fold at page load

---

## Task D08 — Add visual hierarchy to the Repository section links

**Requirement:** Differentiate GitHub/LinkedIn from Email and CV in the repository section

**Story**
As a recruiter in the Repository section, I want to find the most important contact point immediately, so that I do not scan four identical cards to figure out where to click.

**Objective**
Give the four repo-links different visual weight reflecting their importance: GitHub and LinkedIn as primary exploration, Email as direct action, CV as download.

**Context**
`.repo-links` is a 2×2 grid of identical `.repo-link` cards. GitHub, LinkedIn, Email and CV all look the same. A recruiter's priority is typically: Email > LinkedIn > GitHub > CV. The current layout inverts this by presenting them as equal. A minimal hierarchy — one larger primary card, three secondary — would guide attention without redesigning the section.

**Scope**
In: Make Email the primary card: span it across both columns (`grid-column: 1 / -1`), increase its internal padding slightly, add copper left border or accent. Keep GitHub, LinkedIn, CV as standard cards but order them: Email (full width), then GitHub, LinkedIn, CV in a 3-column or 2+1 layout.
Out: Adding icons, changing card styles beyond border/span, adding hover animations beyond what exists.

**Closed decisions**
- Primary: Email — full width, `border-left: 2px solid var(--copper)`
- Secondary: GitHub, LinkedIn, CV — standard card size
- Layout: `grid-template-columns: 1fr 1fr` with Email as `grid-column: 1 / -1`

**Success criteria**
- Email is visually the primary CTA in the Repository section
- All four links still visible and clickable
- No new CSS classes needed — use existing `.repo-link` with a modifier or inline style for the span

---

## Task D09 — Redesign Public Proof section: remove screenshot gallery, enrich repo cards

**Requirement:** Replace the capture-gallery with richer repo cards and correct gen-fraud-graph attribution

**Story**
As a technical reviewer in the Public Proof section, I want to see what each repo demonstrates without looking at a screenshot of GitHub, so that the evidence feels technical rather than decorative.

**Objective**
Remove the four GitHub screenshot cards. Enrich the existing repo-link cards with stack chips and a key-pattern line. Reframe gen-fraud-graph as an open source contribution, not an owned repository.

**Context**
The current layout has:
1. Four `.repo-link` cards (title + description)
2. A `.capture-gallery` of four GitHub page screenshots below

Problems:
- Screenshots of GitHub look like screenshots of another website pasted in — not technical evidence
- gen-fraud-graph is a Santander open source repo where Sergio contributed PRs, not his own project
- The cards lack enough technical signal (no stack, no pattern, no contribution context)

The DESIGN_BRIEF says: "replace generic social proof with technical proof." Screenshots of a repo homepage are not technical proof.

**Scope**
In:
1. Delete `.capture-gallery` and all four `.capture-card` figures from index.html
2. Delete the four evidence PNG files from `assets/evidence/` that are only used by the gallery (smart-document-extractor.png, async-task-dashboard.png, vertx-hexagonal-template.png, gen-fraud-graph.png)
3. Enrich each `.repo-link` card in index.html:
   - Add a `.chip-row` with stack chips (same pattern as record-grid stack chips)
   - Add a `<span class="case-emphasis">` badge: "Author" for the three owned repos, "Contributor" for gen-fraud-graph
4. Update gen-fraud-graph description to reflect contribution context: change `meta-label` from "Python · CLI · Data generation" to "Python · CLI · Santander OSS" and description to "Open source fraud graph generator. Contributed parallel generation improvements and dataset schema PRs."
Out: Adding new repos, redesigning the section header, adding hover states beyond what exists.

**Closed decisions**
- Gallery: deleted entirely
- Assets: the four PNG screenshots deleted (they were only used by the gallery)
- Badge pattern: reuse `.case-emphasis` class — already styled as copper tag
- gen-fraud-graph: "Contributor" badge, Santander OSS label, updated description
- Stack chips per repo:
  - smart-document-extractor: Python, FastAPI, Pydantic, OCR
  - async-task-dashboard: Next.js, FastAPI, Celery, Redis
  - vertx-hexagonal-template: Java, Vert.x, Hexagonal
  - gen-fraud-graph: Python, CLI, NetworkX

**Success criteria**
- No screenshot cards visible in the Public Proof section
- Each repo card shows stack chips and an Author/Contributor badge
- gen-fraud-graph is clearly labeled as a contribution to a Santander OSS repo
- assets/evidence/ no longer contains the four gallery PNGs
- Section reads as technical evidence, not a decorative gallery

---

## Task D10 — Add contribution count and key pattern to repo cards

**Requirement:** Add one-line "key pattern" and contribution context to each repo card

**Story**
As a technical reviewer reading the Public Proof section, I want to know what engineering pattern each repo demonstrates, so that I understand why it is included as evidence and what it proves.

**Objective**
Add a concise "pattern" line to each repo card that names what the repo proves technically, distinct from the description.

**Context**
After Task D09, each repo card has: stack chips, Author/Contributor badge, title, description. The description explains what the repo does. But a reviewer wants to know what it proves — what pattern, skill, or decision it demonstrates. This is the gap between "what it is" and "why it matters as evidence."

**Scope**
In: Add a `<span class="meta-label">` followed by a short pattern line inside each `.repo-link` card, below the description:
- smart-document-extractor: "Pattern: async extraction pipeline with typed validation"
- async-task-dashboard: "Pattern: full-stack async flow with queue-backed execution"
- vertx-hexagonal-template: "Pattern: reactive hexagonal architecture with domain isolation"
- gen-fraud-graph: "Pattern: large-scale parallel data generation for graph benchmarking"
Out: Adding links to specific files, changing card layout, adding tooltips.

**Closed decisions**
- Element: `<span class="meta-label">` above the pattern text — consistent with existing label style
- Pattern text: one line, lowercase, no full stop
- Position: after `<p>` description, before end of card

**Success criteria**
- Each card has a visible "Pattern:" label with one-line pattern text
- Style is consistent with other meta-labels in the site
- No new CSS classes needed
