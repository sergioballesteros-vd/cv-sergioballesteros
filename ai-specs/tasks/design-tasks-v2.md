# CV Design Task Briefs v2

11 tasks from visual audit of 2026-06-26 (screenshots at 1440px and 390px).
Same structure as previous task files.

---

## Task V01 — Fix mobile anchor scroll hidden behind sticky nav

**Requirement:** Add `scroll-padding-top` so nav anchors are not covered by the mobile nav bar

**Story**
As a mobile visitor clicking a nav pill, I want the target section to appear below the nav bar, so that the section heading is not hidden behind the sticky navigation.

**Objective**
Fix the scroll offset so anchor links account for the sticky mobile nav height (~53px).

**Context**
The mobile nav (`mobile-nav-shell`) is `position: sticky; top: 0`. When a user taps "02 Case Files" the page scrolls to `#systems` but the section header is obscured by the nav bar sitting on top of it. `scroll-padding-top` on `html` corrects this at the CSS level without JS.

**Scope**
In: Add `scroll-padding-top: 56px` inside the `@media (max-width: 780px)` block in styles.css. One line.
Out: Changing nav height, changing scroll behavior.

**Closed decisions**
- Value: `56px` (mobile-nav padding 12px top + nav links ~32px + 12px bottom = ~56px)
- Scope: mobile breakpoint only — desktop has no sticky top bar

**Success criteria**
- Tapping any nav pill on mobile shows the section heading fully below the nav bar
- No regression on desktop scroll behavior

---

## Task V02 — Balance h1 text to prevent orphan

**Requirement:** Apply `text-wrap: balance` to the hero h1

**Story**
As a visitor reading the hero, I want "I build production systems." to break evenly, so that "systems." does not sit alone on a second line.

**Objective**
Eliminate the orphan line in the hero h1 without hardcoding a line break.

**Context**
At mid-range viewport widths the h1 breaks as:
```
I build production
systems.
```
"systems." alone on line 2 is typographically weak. `text-wrap: balance` distributes words evenly across lines without hardcoded `<br>`. Supported in all modern browsers (Chrome 114+, Safari 17.5+, Firefox 121+).

**Scope**
In: Add `text-wrap: balance` to `.hero-copy h1` in styles.css. One line.
Out: Changing font size, changing the h1 text.

**Closed decisions**
- Property: `text-wrap: balance` (native CSS, no JS needed)
- Fallback: older browsers keep current behavior — acceptable, it is progressive enhancement

**Success criteria**
- At 1440px, 1200px and 900px viewports the h1 words distribute more evenly
- No layout regressions in other sections

---

## Task V03 — Fix Public Proof chip-row visibility

**Requirement:** Give stack chips inside `.repo-link` a visible background

**Story**
As a visitor reading the Public Proof repo cards, I want to see the stack chips clearly, so that the technology tags do not disappear against the white card background.

**Objective**
Make the chip-row chips readable inside `.repo-link` cards.

**Context**
After D09, each `.repo-link` card contains a `.chip-row` with stack chips. The chips use `.chip-row span` styles: `background: rgba(255,255,255,0.82)` and `border: 1px solid var(--line)`. On the white card background, white chips with a faint border are nearly invisible. The chips need a slightly warm background to stand out.

**Scope**
In: Add a scoped override in styles.css:
```css
.repo-link .chip-row span {
  background: var(--copper-soft);
  border-color: rgba(181, 99, 62, 0.18);
  color: var(--copper);
}
```
Out: Changing chip styles globally, redesigning repo cards.

**Closed decisions**
- Background: `var(--copper-soft)` — already a CSS variable, matches the card's copper accent family
- Color: `var(--copper)` — consistent with other technical tags in the page
- Scope: `.repo-link .chip-row span` only — no global change

**Success criteria**
- Stack chips in Public Proof cards are clearly readable on the white card background
- Style is consistent with the copper accent system already used on the page

---

## Task V04 — Reduce hero identity column width

**Requirement:** Narrow the identity block column so the h1 gets more visual dominance

**Story**
As a visitor opening the notebook, I want the headline to be the first thing I read, so that the identity block feels like a signature rather than a competing element.

**Objective**
Reduce the first column of `.hero-grid` from 250px to 160px. The portrait (92px) and name fit in 160px. The current 250px leaves ~90px of dead space that steals visual weight from the h1.

**Context**
`.hero-grid` is `grid-template-columns: 250px minmax(0, 1fr) 280px`. The identity block only uses ~92px (portrait) + text. The 250px column allocation creates blank space beside the portrait and pushes the h1 right by ~90px of empty air. Reducing to 160px tightens the composition.

**Scope**
In: Change `.hero-grid` in styles.css: first column from `250px` to `160px`.
Also update the `@media (max-width: 1200px)` override where hero-grid is `220px minmax(0, 1fr)` — change to `160px minmax(0, 1fr)`.
Out: Touching the identity block layout, the portrait size, or the map block.

**Closed decisions**
- Desktop: `160px minmax(0, 1fr) 280px`
- Tablet (≤1200px): `160px minmax(0, 1fr)`
- Mobile (≤780px): already `1fr` — no change needed

**Success criteria**
- Identity block clearly reads as a signature alongside a dominant h1
- No portrait clipping or text overflow in the identity block

---

## Task V05 — Add arrow to "View notebook" case link

**Requirement:** Add `→` to the `.case-link` text to signal it is a clickable action

**Story**
As a visitor looking at the case file row, I want a clear visual signal that "View notebook" is clickable, so that I do not mistake it for a static label.

**Objective**
Add an arrow character to the case-link to improve affordance without changing layout.

**Context**
`.case-link` renders "VIEW NOTEBOOK" in copper uppercase Space Mono on the right of each casefile row. The text reads as a CTA but has no directional cue — it looks like a tag rather than a link. A `→` appended makes it unmistakably actionable.

**Scope**
In: In index.html, change all four `<span class="case-link">View notebook</span>` to `<span class="case-link">View notebook →</span>`.
Out: CSS changes, layout changes, converting spans to anchors (the button handles navigation).

**Closed decisions**
- Character: `→` (HTML entity `&rarr;` or literal `→`)
- No CSS change needed — the arrow inherits the copper color

**Success criteria**
- All four casefile rows show "View notebook →" in copper
- The arrow inherits the existing case-link copper color and uppercase transform

---

## Task V06 — Remove "System Owner" card from record grid

**Requirement:** Remove the "System Owner: Sergio Ballesteros" card from the project record sheet

**Story**
As a visitor reading the project record, I want the four info cards to contain meaningful project-specific data, so that a card is not wasted on information already known (the site is Sergio's).

**Objective**
Remove the hardcoded "System Owner" card. Use the freed column for better layout breathing or redistribute the remaining three cards.

**Context**
The `.record-grid` has 4 columns: Mission, System Owner, Current Stack, Evidence Count. "System Owner" is always "Sergio Ballesteros" — it adds no information since this is his notebook. The card takes 25% of the record grid for 2 known words. Removing it leaves 3 cards which work better in a 3-column grid, or the remaining cards can span more space in the 4-column layout.

**Scope**
In:
1. Remove `<div class="record-card">System Owner...</div>` from index.html.
2. Change `.record-grid` in styles.css from `repeat(4, minmax(0, 1fr))` to `repeat(3, minmax(0, 1fr))`.
Out: Changing the other three record cards, changing the record sheet layout beyond the grid column count.

**Closed decisions**
- Remove entirely — do not replace with other content
- Grid becomes 3-column: Mission | Current Stack | Evidence Count

**Success criteria**
- Record sheet shows 3 cards: Mission, Current Stack, Evidence Count
- No empty card or layout gap
- Looks correct across all three casefile selections

---

## Task V07 — Move identity block below h1 on mobile

**Requirement:** Reorder hero content on mobile so h1 appears before the identity block

**Story**
As a mobile visitor, I want "I build production systems." to be the first thing I read after the nav, so that the message leads rather than the biography.

**Objective**
On mobile, the h1 should appear before the portrait + name. On desktop the 3-column grid handles this naturally (h1 in the middle column). On mobile the columns stack in DOM order: identity block first, then hero copy.

**Context**
At ≤780px `.hero-grid` becomes `1fr` and stacks in DOM order. The DOM has:
1. `.identity-block` (portrait + name)
2. `.hero-copy` (h1, subtitle, mission, CTAs)
3. `.map-block` (hidden on mobile)

So mobile shows: portrait → name → h1. This inverts the DESIGN_BRIEF principle "systems first, identity secondary." The identity block should follow the h1 on mobile.

**Scope**
In: Add to the `@media (max-width: 780px)` block in styles.css:
```css
.identity-block { order: 2; }
.hero-copy { order: 1; }
```
The `.map-block` is already `display: none` on mobile — order does not matter for it.
Out: DOM reordering (CSS order is sufficient and correct), changing desktop layout.

**Closed decisions**
- Solution: CSS `order` property — no DOM change, no JS
- Desktop: unaffected (grid with explicit columns, order property has no visual effect when columns are defined)

**Success criteria**
- On mobile (≤780px): h1 appears before portrait + name
- On desktop (>780px): layout unchanged

---

## Task V08 — Add subtle noise texture to body background

**Requirement:** Add a faint paper noise texture to the body to reinforce the notebook material metaphor

**Story**
As a visitor reading the notebook, I want the background to feel like paper rather than a flat screen, so that the material metaphor of the engineering notebook is physically present.

**Objective**
Add a very subtle noise texture over the existing paper gradient background. The effect should be visible up close but not distracting.

**Context**
The current body background is a paper-colored radial + linear gradient. On screen it reads as plain warm white — the "paper" feeling is only conceptual, not visual. A 3–5% opacity SVG noise filter or a CSS-only noise pattern adds physical texture without affecting readability or performance. The DESIGN_BRIEF calls for "paper, documentation, notebook, calm interface" as the visual material.

**Scope**
In: Add an SVG noise texture as a CSS `background-image` layer on `body` using an inline SVG data URI:
```css
body {
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E"),
    radial-gradient(...existing...),
    radial-gradient(...existing...),
    linear-gradient(...existing...);
}
```
Opacity: `0.028` (barely visible, felt more than seen).
Out: External image files, canvas noise, JS animation, any effect that impacts performance.

**Closed decisions**
- Technique: inline SVG data URI noise — zero HTTP request, pure CSS
- Opacity: `0.028` — test and adjust between 0.02–0.04 if needed
- Tile size: 200×200px (small enough to tile seamlessly)

**Success criteria**
- Background has a faint texture visible when looking closely
- Text readability unchanged
- No perceptible performance impact

---

## Task V09 — Add large decorative number to decision records

**Requirement:** Add a large background number (01–04) to each decision record card

**Story**
As a visitor scanning the Decisions section, I want each decision to feel individually numbered and distinctive, so that the 2×2 grid of identical white cards has personality and visual hierarchy.

**Objective**
Add a decorative large number in Instrument Serif as a background element to each `.decision-record`, making the section scannable and visually interesting.

**Context**
The four decision records are identical white rectangles with the same padding, border and background. Nothing differentiates them visually except their titles. A large decorative number (01, 02, 03, 04) positioned in the bottom-right or top-right of each card as a `::before` pseudo-element in Instrument Serif at 6–8rem, very low opacity (0.06–0.08), creates visual personality without affecting content readability.

**Scope**
In:
1. In index.html, add `data-decision="01"` through `data-decision="04"` to each `.decision-record` article.
2. In styles.css, add:
```css
.decision-record {
  position: relative;
  overflow: hidden;
}
.decision-record::before {
  content: attr(data-decision);
  position: absolute;
  bottom: -10px;
  right: 12px;
  font: 400 7rem/1 "Instrument Serif", serif;
  color: var(--ink);
  opacity: 0.06;
  pointer-events: none;
  user-select: none;
}
```
Out: Changing card layout, content, or adding interactive states.

**Closed decisions**
- Font: Instrument Serif (already loaded, matches the editorial aesthetic)
- Size: `7rem`
- Opacity: `0.06` — decorative watermark, not competing with content
- Position: bottom-right inside the card

**Success criteria**
- Each decision card shows a large faint number in the bottom-right corner
- Text content is fully readable over the number
- Works correctly in the 2×2 grid at desktop and 1-column on mobile

---

## Task V10 — Add notebook spine detail to the rail sidebar

**Requirement:** Add a subtle decorative detail to the sidebar that reinforces the physical notebook metaphor

**Story**
As a visitor reading the notebook, I want the sidebar to feel like the spine of a physical notebook, so that the "engineering notebook" metaphor is visually grounded, not just conceptual.

**Objective**
Add a small decorative element — a vertical line, page-number style notation, or ruled marks — to the sidebar that makes it read as a notebook spine rather than a generic dark nav.

**Context**
The `.notebook-rail` is a sticky dark sidebar with the SB badge, nav items, and meta. It is the structural metaphor of the entire site. Currently it is a plain dark rectangle — correct in function but missing the physical detail that would make the "notebook spine" concept land visually. A vertical rule, subtle horizontal marks at section intervals, or a "Vol. I" notation with a ruled-line detail would complete the metaphor at low visual cost.

**Scope**
In: Add to the bottom of `.notebook-rail` in styles.css a `::after` pseudo-element:
```css
.notebook-rail::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(255,255,255,0.08) 20%,
    rgba(181,99,62,0.22) 50%,
    rgba(255,255,255,0.08) 80%,
    transparent
  );
}
```
Also add `position: relative` to `.notebook-rail` if not already set.
This creates a subtle gradient rule on the right edge of the rail — the existing `border-right` handles the hard border, this adds an inner glow detail that makes the spine feel like a physical edge.
Out: Adding icons, adding page numbers, changing nav layout.

**Closed decisions**
- Technique: `::after` gradient rule on the interior right edge
- Colors: copper accent at midpoint — connects to the existing copper system
- No new HTML

**Success criteria**
- Rail right edge shows a subtle gradient glow (copper at center, fading at top/bottom)
- Does not interfere with the `border-right` that already exists
- Subtle enough that it is felt rather than noticed

---

## Task V11 — Increase journal tag size or remove them

**Requirement:** Make journal entry tags readable or remove them entirely

**Story**
As a visitor reading the Engineering Journal section, I want the topic tags to either add value or be absent, so that 0.72rem pills do not create visual noise without contributing information.

**Objective**
Either increase journal tag size to be comfortably readable, or remove them. At 0.72rem they are below comfortable reading threshold and compete with the entry description without clarifying it.

**Context**
`.journal-meta span` renders at `0.72rem` Space Mono uppercase. At that size on a screen, especially on mobile, the tags are technically visible but not comfortably readable. They appear as small horizontal pills under each entry description. The tags (System design, Ownership, Migration, etc.) are potentially useful for scanning, but only if readable.

**Scope**
Option A (recommended): Increase to `0.8rem`, change from uppercase to sentence case, remove letter-spacing, keep Space Mono. Small improvement, keeps the tags.
Option B: Remove `.journal-meta` div entirely from all 6 journal entries in index.html and delete `.journal-meta` styles from styles.css.

**Closed decisions**
- Preferred: Option A. The tags have editorial value, they just need to be legible.
- New size: `0.8rem`
- Case: sentence case (remove `text-transform: uppercase`)
- Letter-spacing: remove (was adding to the illegibility at small size)

**Success criteria**
- Journal entry tags are readable without zooming on both desktop and mobile
- Tags still render in Space Mono with pill border styling
