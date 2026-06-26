# CV Audit Task Briefs

18 tasks derived from the audit of 2026-06-26. Each brief follows the same structure:
Story → Objective → Context → Scope → Closed decisions → Success criteria.

---

## Task 01 — Optimize portrait.png

**Requirement:** Replace portrait.png with a WebP-optimized version

**Story**
As a site visitor, I want the page to load fast, so that a 1.8MB image displayed at 92×92px does not block initial paint.

**Objective**
Reduce portrait weight from 1.8MB to under 20KB with no visible quality loss.

**Context**
`portrait.png` is the single biggest performance problem in the repo. It is 1.8MB but renders at 92×92px in the hero. It is above the fold so it cannot be lazy-loaded — it must be fast.

**Scope**
In: Export as WebP at 200×200px (2× retina), update index.html to use `<picture>` with WebP source and PNG fallback.
Out: CDN setup, redesigning the portrait block.

**Closed decisions**
- Format: WebP with PNG fallback inside `<picture>` element
- Output size: ≤20KB at 200×200px
- Keep `portrait.png` as fallback only

**Success criteria**
- `portrait.webp` committed and ≤20KB
- `<picture>` element in index.html with `type="image/webp"` source + PNG fallback
- Visual result identical in Chrome, Firefox, Safari

---

## Task 02 — Add #proof to sidebar nav

**Requirement:** Add Public Proof section to notebook rail navigation

**Story**
As a recruiter exploring the notebook, I want a nav entry for Public Proof, so that I can reach the GitHub repos section directly without missing it while scrolling.

**Objective**
Make `#proof` reachable from the sidebar. Close the gap between 6 nav items and 7 sections.

**Context**
The rail nav has entries for 6 sections but the page has 7. `id="proof"` (Public Proof with GitHub repo cards and capture gallery) sits between Journal and Repository with no nav link. Users either miss it or land on it by accident.

**Scope**
In: Add `<a href="#proof"><span>06</span> Public Proof</a>` to `.rail-nav`, renumber Repository from 06 to 07.
Out: Scroll spy, active state highlighting, redesigning the nav structure.

**Closed decisions**
- Nav label: "Public Proof" — matches the section `h2`
- Position: between Journal (05) and Repository (07)
- Repository becomes 07

**Success criteria**
- Nav shows 7 sequential items (01–07)
- All `href` anchors resolve to existing section IDs
- Repository reads "07 Repository"

---

## Task 03 — Remove dead print listener in main.js

**Requirement:** Delete the unreachable `[data-action="print"]` event listener

**Story**
As a developer maintaining main.js, I want no dead code, so that the file only contains logic that is actually wired to the DOM.

**Objective**
Remove the orphan event listener that binds to zero elements.

**Context**
`main.js` contains:
```js
document.querySelectorAll('[data-action="print"]').forEach((button) => {
  button.addEventListener("click", () => window.print());
});
```
No element in index.html has `data-action="print"`. The selector returns an empty NodeList on every page load — the listener is dead weight.

**Scope**
In: Delete the three-line block from main.js.
Out: Adding a print button, wiring up window.print() elsewhere.

**Closed decisions**
- Action: delete the block entirely. If a print button is needed later, it can be added as Task 18 (polish phase) with a matching element.

**Success criteria**
- Block removed from main.js
- No reference to `data-action="print"` anywhere in the repo

---

## Task 04 — Add favicon to cv.html

**Requirement:** Add `<link rel="icon">` to cv.html

**Story**
As a recruiter with the CV tab open, I want to see the site favicon, so that the tab does not appear blank next to other tabs.

**Objective**
Match cv.html head to index.html head for the favicon link.

**Context**
`index.html` correctly links `./favicon.svg`. `cv.html` does not. The CV page is intended to be shared directly with recruiters and opened standalone — a blank tab icon looks unpolished.

**Scope**
In: Add `<link rel="icon" href="../favicon.svg" type="image/svg+xml">` to cv.html `<head>`.
Out: Changing the favicon, changing any other head metadata.

**Closed decisions**
- Path: `../favicon.svg` (cv.html is one level deep)

**Success criteria**
- cv.html tab shows the SB favicon in Chrome and Firefox

---

## Task 05 — Add back navigation to cv.html

**Requirement:** Add a "Back to notebook" link to cv.html

**Story**
As a recruiter who opened the CV directly, I want a way back to the full notebook, so that I can explore the project details without using the browser back button.

**Objective**
Make cv.html a connected page, not a dead end.

**Context**
`cv.html` has no navigation element. A recruiter who arrives via the direct PDF-less link or clicks "Download CV" then decides to explore further has no path back except the browser back button. This conflicts with the notebook metaphor.

**Scope**
In: Add a minimal topbar with `← Engineering Notebook` link pointing to `../index.html`. Use existing `.entry-home` class which is already styled in styles.css.
Out: Adding a full navbar, mirroring the sidebar rail.

**Closed decisions**
- Style: reuse `.entry-home` class (already in styles.css, used in notes pages)
- Text: `← Engineering Notebook`
- Target: `../index.html`

**Success criteria**
- cv.html shows a visible back link above the cv-page block
- Link navigates to index.html

---

## Task 06 — Add Open Graph meta tags to index.html and cv.html

**Requirement:** Add OG and Twitter Card meta tags for social sharing

**Story**
As a developer sharing the notebook URL in a LinkedIn message or Slack, I want a rich preview card, so that recruiters see the title and description instead of a blank preview.

**Objective**
Ensure both index.html and cv.html produce a usable social preview when the URL is pasted anywhere that unfurls links.

**Context**
Neither page has Open Graph tags. When the CV site URL is shared on LinkedIn — the primary recruiter channel — it renders as a plain link with no image or description. For a CV that is explicitly built to be shared, this is a missed signal.

**Scope**
In: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description` on both pages.
Out: Generating a dedicated OG image, setting up a server to serve dynamic tags.

**Closed decisions**
- `og:image`: use `portrait.png` (or `portrait.webp` once Task 01 is done) with an absolute URL pointing to the GitHub Pages deployment
- `og:type`: `website`
- `twitter:card`: `summary`
- Language: English (matches page content)

**Success criteria**
- Pasting the index.html URL in LinkedIn message preview shows title, description and image
- Both index.html and cv.html have the full tag set

---

## Task 07 — Fix mobile navigation (hidden rail with no replacement)

**Requirement:** Add minimal mobile navigation when the notebook rail is hidden

**Story**
As a recruiter opening the notebook on a phone, I want to jump between sections, so that I am not forced to scroll through the entire page to reach a specific section.

**Objective**
Give mobile users a navigation mechanism when `.notebook-rail` is hidden at ≤780px.

**Context**
At widths ≤780px the rail is `display: none` with no replacement. There is no hamburger, no bottom bar, no sticky nav — nothing. Mobile users have zero section navigation. Given the notebook has 7 sections and is content-heavy, this is a real usability gap.

**Scope**
In: A sticky top bar visible only at ≤780px with a dropdown or simple horizontal scroll of section links.
Out: Matching the full rail design, adding animations, implementing scroll spy.

**Closed decisions**
- Approach: sticky top bar with horizontal scrollable nav links (no JS hamburger overhead)
- Style: dark background matching the rail, `overflow-x: auto`, single row of links
- Breakpoint: activates at `≤780px` (same breakpoint that hides the rail)

**Success criteria**
- At 375px viewport, a sticky nav bar is visible at the top
- All 7 section links are reachable via horizontal scroll
- Clicking a link scrolls to the correct section

---

## Task 08 — Add aria-pressed to casefile buttons

**Requirement:** Set `aria-pressed` on `.casefile` buttons when toggling active state

**Story**
As a screen reader user navigating the case files, I want to know which case is currently selected, so that I understand what the record sheet below is showing.

**Objective**
Make the casefile selection state accessible to assistive technology.

**Context**
The four `.casefile` buttons toggle `.is-active` visually but never update `aria-pressed`. Screen readers announce all four as plain buttons with no selected state — a user cannot tell which case file is open just from the accessibility tree.

**Scope**
In: In `main.js`, when toggling `.is-active`, also set `aria-pressed="true"` on the clicked button and `aria-pressed="false"` on the rest. Add `aria-pressed="true"` to the initial OCM button in the HTML.
Out: Full ARIA live region redesign, adding role="tablist" pattern.

**Closed decisions**
- Pattern: `aria-pressed` toggle (simpler than tablist for this layout)
- Initial state: `aria-pressed="true"` on the OCM Brain button (first, default)

**Success criteria**
- `aria-pressed` reflects current selection at all times
- VoiceOver / NVDA announces the correct pressed state when switching cases

---

## Task 09 — Add IntersectionObserver active state to nav

**Requirement:** Highlight the current section in the sidebar nav while scrolling

**Story**
As a visitor reading through the notebook, I want the sidebar nav to show which section I am in, so that I can orient myself without looking at the section headings.

**Objective**
Add a visible active state to the `.rail-nav` links that tracks scroll position.

**Context**
The sidebar nav links have a hover state (copper left border) but no active state. While scrolling through a long page, the nav gives no orientation feedback. This is a standard UX pattern for sidebar navigation.

**Scope**
In: `IntersectionObserver` in main.js watching the 7 main sections, adding an `.is-active` class to the matching nav link.
Out: Animated transitions between nav states, mobile nav integration (covered in Task 07).

**Closed decisions**
- Implementation: `IntersectionObserver` with `rootMargin: "-40% 0px -50% 0px"` to trigger when section is in the middle viewport
- Active style: same copper left border as hover, but persistent
- Sections to observe: all 7 (overview, systems, decisions, evidence, journal, proof, repository)

**Success criteria**
- Scrolling to each section highlights the correct nav item
- Only one nav item is active at a time
- Works without JS errors on initial load

---

## Task 10 — Add real evidence artifacts to the Evidence section

**Requirement:** Replace text-only evidence bullets with actual visual artifacts

**Story**
As a technical reviewer reading the evidence section, I want to see real architecture artifacts or screenshots, so that I can judge the systems from evidence rather than self-description.

**Objective**
Make the Evidence section live up to the DESIGN_BRIEF promise: "screenshots, diagrams, architecture views, code snippets, SQL."

**Context**
The current `#evidence` section has a clean lifecycle trail (architecture → MR → deployment → monitoring) but the "Evidence Ledger" and "What It Proves" cards are plain text bullets. The site has GIFs and screenshots in `assets/evidence/` (energy-after-desktop.gif, energy-after-mobile.gif) that are unused on the home page. The DESIGN_BRIEF explicitly calls for real artifacts here.

**Scope**
In: Add at least one real artifact per evidence category (one architecture diagram or GIF, one code snippet, one SQL excerpt or one MR description card) to the evidence section.
Out: Full per-project evidence pages (that is the notes/ pages), uploading confidential internal data.

**Closed decisions**
- Use existing `energy-after-desktop.gif` and `energy-after-mobile.gif` as the first real evidence artifact in the deployment card
- Code snippet: add a representative Python or SQL snippet inline using `.snippet` class (already styled)
- Keep the existing trail structure, embed artifacts inside the trail steps

**Success criteria**
- At least one non-text artifact visible in the `#evidence` section on the home page
- No new assets over 200KB (optimize before committing)

---

## Task 11 — Fix hardcoded dates in two places

**Requirement:** Consolidate "Last updated" date to a single source

**Story**
As a developer updating the notebook, I want to change the date once, so that I do not have to find and update two separate hardcoded strings on each publish.

**Objective**
Single source of truth for the "Last updated" date shown in the sheet header and the rail meta.

**Context**
`"25 Jun 2026"` appears hardcoded in two places in index.html:
1. `.sheet-header` span in the hero section
2. `.rail-meta` strong element in the sidebar

Updating one and missing the other creates a visible inconsistency.

**Scope**
In: Set the date once in main.js as a constant (`const LAST_UPDATED = "25 Jun 2026"`) and write it to both DOM nodes on load. Or use a `<time>` element with a `data-` attribute and a single JS selector.
Out: Automating the date from git history or build pipeline (overkill for a static site).

**Closed decisions**
- Implementation: single JS constant in main.js, written to both nodes at load time
- Format: keep "25 Jun 2026" format (matches current style)

**Success criteria**
- No literal date string in index.html
- Changing the constant in main.js updates both display locations

---

## Task 12 — Audit and clean up unused assets

**Requirement:** Remove or document unused files in assets/evidence/

**Story**
As a developer maintaining the repo, I want no mystery binary files committed, so that the repo does not accumulate weight from assets that are referenced nowhere.

**Objective**
Identify every file in `assets/evidence/` and confirm each one is referenced somewhere in the site or document why it is kept.

**Context**
`assets/evidence/` contains `ocm-logo.png` (700KB) which is not referenced in `index.html`, `cv.html`, or any of the notes pages (unconfirmed — needs grep). If unreferenced it is 700KB of permanent git history weight with no benefit.

**Scope**
In: Grep all HTML files for each filename in `assets/evidence/`. Delete any file with zero references. If a file is planned for future use, add a comment in ROADMAP.md.
Out: Redesigning how assets are organized.

**Closed decisions**
- Action for unreferenced files: delete from repo (they remain in git history but stop adding confusion)
- Action for future-planned files: note in ROADMAP.md backlog, do not keep in the working tree

**Success criteria**
- Every file in `assets/evidence/` is referenced in at least one HTML file, OR explicitly listed in ROADMAP.md as planned
- No unreferenced binary over 100KB in the working tree

---

## Task 13 — Add robots.txt

**Requirement:** Add a minimal robots.txt to control search engine indexing

**Story**
As the site owner, I want explicit control over what search engines index, so that the notebook appears correctly in search results when recruiters search my name.

**Objective**
Add a `robots.txt` that allows full indexing (appropriate for a public CV) and optionally points to a sitemap.

**Context**
GitHub Pages sites are fully crawlable by default even without robots.txt. Adding one is not strictly necessary but signals intentionality and enables future control (e.g. blocking the cv.pdf from being indexed separately).

**Scope**
In: `robots.txt` at repo root allowing all crawlers, optionally with `Sitemap:` directive.
Out: Generating a sitemap.xml (separate task if needed), blocking any content.

**Closed decisions**
- Content: `User-agent: * / Allow: /` — full crawl permitted
- Sitemap: omit for now (only worth it once there are more pages)

**Success criteria**
- `robots.txt` present at root
- `curl https://<pages-url>/robots.txt` returns 200 with correct content

---

## Task 14 — Add Redis to technology mentions

**Requirement:** Add Redis to the stack where it is used across the site

**Story**
As a technical reviewer reading the project stacks, I want to see the full technology picture, so that I do not miss Redis as part of the backend capability.

**Objective**
Reconcile the technology inventory: Redis is in CONTENT.md but absent from all HTML pages.

**Context**
CONTENT.md lists Redis under Database stack. It does not appear in any project card stack in main.js, in cv.html technology list, or in the hero stack. Either it belongs in a specific project's stack (e.g. OCM Brain likely uses it for caching/session) or in the cv.html technology section.

**Scope**
In: Add Redis to the relevant project stack in main.js and to the cv.html technology list.
Out: Adding a dedicated Redis section, explaining Redis usage in detail (that belongs in the notes pages).

**Closed decisions**
- Add to: OCM Brain stack in main.js (most likely candidate for a caching/scoring layer)
- Also add to: cv.html technology paragraph

**Success criteria**
- Redis appears in at least one project stack on the home page
- Redis appears in the cv.html technology list
- CONTENT.md, main.js and cv.html are consistent

---

## Task 15 — Verify and fix journal anchor links

**Requirement:** Confirm journal/index.html has anchors matching all 6 entry links from index.html

**Story**
As a visitor clicking a journal entry on the home page, I want to land on the correct entry, so that I do not get dropped at the top of the journal page with no scroll.

**Objective**
Ensure every `./journal/index.html#entry-NN` href in index.html has a matching `id="entry-NN"` in journal/index.html.

**Context**
index.html links to `#entry-01` through `#entry-06` inside `journal/index.html`. If those IDs are missing or misnamed the link navigates to the journal page but ignores the anchor — silent failure that is invisible in normal testing.

**Scope**
In: Open journal/index.html and verify each of the 6 anchor IDs exist. Add any missing `id` attributes.
Out: Redesigning the journal page layout.

**Closed decisions**
- IDs must be on the `<article>` or `<section>` element that starts each journal entry
- Naming convention: `id="entry-01"` through `id="entry-06"` (match existing hrefs exactly)

**Success criteria**
- All 6 journal links from index.html scroll to the correct entry in journal/index.html
- No link lands at the top of the page when a specific entry was requested

---

## Task 16 — Add portrait.png to .gitignore for future replacement workflow

**Requirement:** Document the large binary asset policy in .gitignore or CONTRIBUTING notes

**Story**
As a developer replacing the portrait or adding new evidence screenshots, I want a clear policy on binary assets, so that I do not accidentally commit unoptimized images to the repo again.

**Objective**
Prevent future accidental commits of heavy unoptimized binaries.

**Context**
`portrait.png` (1.8MB) and `cv.pdf` (339KB) are committed as binaries. Every replacement appends to git history permanently. For a static site with no CI optimization pipeline, the safest guard is a note in the workflow or a pre-commit reminder.

**Scope**
In: Add a note to AGENTS.md or create a short `CONTRIBUTING.md` section on binary asset policy: max sizes per category (portraits ≤50KB WebP, evidence screenshots ≤300KB, PDFs tolerated).
Out: Setting up git-lfs, adding a pre-commit hook (valid but out of scope for this phase).

**Closed decisions**
- Location: add to the existing AGENTS.md as an "Asset policy" section (already the repo's AI/agent guidance file)
- Hard limits: portraits ≤50KB, screenshots ≤300KB, PDFs tolerated at current size

**Success criteria**
- AGENTS.md contains an "Asset policy" section with size limits per type
- Any agent or developer reading AGENTS.md before committing assets sees the policy

---

## Task 17 — Fix map-block connector line hardcoded offset

**Requirement:** Replace hardcoded `left: -74px` on `.map-node::before` with a layout-safe approach

**Story**
As a developer adjusting the hero grid layout, I want the connector lines on the map block to stay aligned, so that I do not introduce a visual bug every time I touch the column widths.

**Objective**
Remove the magic number `left: -74px` from the map node connector pseudo-element.

**Context**
`.map-node::before` draws the dashed connector line with `left: -74px` and `width: 64px`. This is calibrated to the current `hero-grid` column width of 280px. If any column width changes, the line detaches or overlaps. The `map-block` is already `aria-hidden="true"` (decorative) so correctness matters less than on functional elements, but it is still a fragile magic number.

**Scope**
In: Replace the hardcoded offset with a CSS custom property or percentage that is robust to the current layout. Or accept the magic number and add a `/* calibrated to hero-grid third column width */` comment.
Out: Redesigning the map block or making it dynamic.

**Closed decisions**
- Preferred fix: CSS custom property `--connector-width: 64px` and derive `left` from it: `left: calc(-1 * var(--connector-width) - 10px)`
- If the layout is unlikely to change: a `ponytail:` comment naming the dependency is acceptable

**Success criteria**
- No bare magic pixel offset for the connector line
- Connector lines still visually connect the dashed border to the map nodes

---

## Task 18 — Add print button wired to window.print()

**Requirement:** Add a print / save as PDF button to index.html and wire the existing main.js listener

**Story**
As a recruiter reading the notebook online, I want a way to save or print the page, so that I can keep a copy without navigating to the separate cv.html.

**Objective**
Complete the dead event listener from Task 03 by adding the button it was meant to serve, or confirm the feature is dropped and remove the listener (covered by Task 03 if dropped).

**Context**
`main.js` has a fully written print listener for `[data-action="print"]` but no button exists in the HTML. This was either planned and forgotten or abandoned. The print stylesheet in styles.css is already well-formed (hides nav, removes shadows, white backgrounds). The infrastructure for print exists — only the trigger button is missing.

**Scope**
In: Add a `<button data-action="print" class="button button-secondary">Save as PDF</button>` to the hero actions row in index.html.
Out: PDF generation server-side, custom print layout changes (styles.css already handles it).

**Closed decisions**
- Placement: inside `.hero-actions` alongside the existing Download CV and Open case files buttons
- Label: "Save as PDF"
- Style: `button-secondary` (tertiary feel, consistent with existing actions)

**Note:** This task is only valid if the print feature is wanted. If not, close this task as Won't Do and confirm Task 03 (delete the listener) is done instead.

**Success criteria**
- Button visible in hero actions
- Clicking triggers `window.print()` / browser print dialog
- Print output uses existing print stylesheet (no layout regressions)
