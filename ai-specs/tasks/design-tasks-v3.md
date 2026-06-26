# CV Design Task Briefs v3

10 tasks from visual audit of 2026-06-26 (screenshots after design-tasks-v2 pass).
Same structure as previous task files.

---

## Task W01 — Fix ghost button invisible border

**Requirement:** Increase border contrast on `.button-secondary` so it reads as a button

**Story**
As a visitor looking at the hero CTAs, I want "Open case files" to be clearly visible as a button, so that I do not miss it against the paper background.

**Objective**
Make the secondary button border visible on the warm paper background.

**Context**
`.button-secondary` has `border-color: var(--line)` which is `rgba(20, 32, 51, 0.13)`. On `var(--paper)` / `var(--paper-2)` backgrounds this is nearly invisible — the button reads as a floating label with no affordance. The primary dark button is strong; the secondary looks absent. The fix is raising the border opacity.

**Scope**
In: Change `.button-secondary` border-color in styles.css from `var(--line)` to `var(--line-strong)` (`rgba(20, 32, 51, 0.22)`).
Out: Changing button size, padding, or background.

**Closed decisions**
- New border: `var(--line-strong)` — already a CSS variable, 0.22 opacity gives a clear outline without being heavy
- No background change — the translucent white is intentional

**Success criteria**
- "Open case files" button has a clearly visible border on the hero background at desktop and mobile
- Button does not look heavier than intended — border is visible, not dominant

---

## Task W02 — Fix repo title color in Public Proof cards

**Requirement:** Change `.repo-link strong` color from `var(--muted)` to `var(--ink)`

**Story**
As a visitor reading the Public Proof section, I want the repository names to stand out as titles, so that I can scan the section at a glance without parsing muted-grey text.

**Objective**
Make repo names prominent in the card hierarchy.

**Context**
In styles.css the selector `.section-head p, .record-head p, .record-card p, .decision-record p, .trail-step p, .journal-entry p, .repo-link strong { color: var(--muted) }` groups `.repo-link strong` with body/description text. This makes the repo name (the title of the card) render in grey instead of near-black. The title should be the most prominent element in the card.

**Scope**
In: Add a single override after the grouped rule:
```css
.repo-link strong {
  color: var(--ink);
}
```
Out: Changing font size, font weight, or any other repo-link styles.

**Closed decisions**
- Color: `var(--ink)` — the standard near-black used for all headings on the page
- Specificity: a standalone rule after the grouped one overrides without touching the group

**Success criteria**
- Repository names (smart-document-extractor, async-task-dashboard, etc.) render in dark ink color
- Other text inside `.repo-link` (description, pattern) remains muted or as-is

---

## Task W03 — Fix gen-fraud-graph URL

**Requirement:** Update gen-fraud-graph href to the correct Santander upstream repository URL

**Story**
As a technical reviewer clicking gen-fraud-graph, I want the link to open the actual repository, so that I do not land on a 404 or on Sergio's account page where the repo does not exist.

**Objective**
Point the gen-fraud-graph link to the correct upstream OSS repo.

**Context**
The current href is `https://github.com/sergioballesteros-vd/gen-fraud-graph`. This repo belongs to Santander, not Sergio. Sergio has contributed PRs to it. The link should point to the Santander organization repo. The correct URL needs to be confirmed before this task can be closed.

**Scope**
In: Update the `href` on the gen-fraud-graph `.repo-link` in index.html to the correct Santander upstream URL.
Out: Any other changes to the card content.

**Closed decisions**
- **Action required before implementation**: confirm the correct upstream URL (e.g., `https://github.com/Santander-Technology/gen-fraud-graph` or similar). Do not guess — find the real URL.
- If the repo is private or the URL is unknown, replace the link with `href="#"` and add a note until confirmed.

**Success criteria**
- gen-fraud-graph link opens the correct public Santander repo
- No 404 on click

---

## Task W04 — Increase section margin from 22px to 32px

**Requirement:** Add breathing room between `section-sheet` blocks

**Story**
As a visitor scrolling the notebook, I want each section to feel like a distinct page rather than a continuous card stack, so that the notebook metaphor holds and the page has visual rhythm.

**Objective**
Increase separation between sections to give each one more visual weight.

**Context**
All `.section-sheet` elements have `margin-top: 22px`. At 22px on a page this long, the sections flow together as one dense block. The notebook metaphor implies distinct pages or chapters. 32px creates clear visual breathing between sections while keeping the compact reading feel.

**Scope**
In: Change `.section-sheet` in styles.css: `margin-top: 22px` → `margin-top: 32px`. One line.
Out: Changing hero-sheet, padding, or any other spacing.

**Closed decisions**
- Value: `32px` — enough separation without wasting vertical space

**Success criteria**
- Scrolling the page, each section reads as a distinct block with visible gap
- No layout regressions

---

## Task W05 — Increase section-head subtitle font size

**Requirement:** Raise `.section-head p` from `0.78rem` to `0.9rem`

**Story**
As a visitor reading each section header, I want the subtitle sentence to be comfortably readable, so that the context line ("Systems I have to keep useful after deployment, not just finish once.") is not strained to read.

**Objective**
Improve readability of section subtitle copy without changing the visual hierarchy.

**Context**
`.section-head p` is grouped in a multi-selector rule at `font-size: 0.78rem`. The section subtitles are the only explanatory copy at section level — they set context for the entire section. At 0.78rem they are technically readable but strained, especially on retina screens where the eye expects the equivalent of at least 12–13px body copy. `0.9rem` keeps them clearly secondary to the `h2` while being comfortable to read.

**Scope**
In: Add an override after the grouped selector in styles.css:
```css
.section-head p {
  font-size: 0.9rem;
}
```
Out: Changing h2 size, changing other grouped selectors.

**Closed decisions**
- Size: `0.9rem` — comfortable reading without competing with the `h2`
- Standalone override to avoid touching the multi-selector group

**Success criteria**
- Section subtitle text is noticeably more readable
- Visual hierarchy `h2 > p` is preserved

---

## Task W06 — Set Pattern line text to muted color

**Requirement:** Apply `var(--muted)` to the Pattern `<p>` inside `.repo-link` cards

**Story**
As a visitor reading a Public Proof repo card, I want the description to be the primary text and the pattern line to be secondary metadata, so that the card has a clear reading order.

**Objective**
Create hierarchy within the repo card: title (ink) → description (ink) → pattern (muted).

**Context**
After D09/D10, each `.repo-link` card contains two `<p>` elements:
1. Description — the main explanation of what the repo does
2. Pattern line — metadata about what engineering pattern it demonstrates

Both `<p>` elements currently render at the same color (body ink or inherited muted). The pattern line is metadata, not primary content. Making it `var(--muted)` creates a clear secondary level.

**Scope**
In: Target the pattern paragraph specifically. Since it follows a `<span class="meta-label">`, use the adjacent sibling selector in styles.css:
```css
.repo-link .meta-label + p {
  color: var(--muted);
  font-size: 0.88rem;
}
```
Out: Changing the description paragraph, changing meta-label styles.

**Closed decisions**
- Selector: `.repo-link .meta-label + p` — precise, targets only the pattern paragraph
- Color: `var(--muted)` — consistent with other secondary text
- Size: `0.88rem` — slightly smaller than body to reinforce secondary status

**Success criteria**
- Pattern text renders in muted grey, clearly secondary to the description
- Description paragraph color unchanged

---

## Task W07 — Add hover arrow hint to journal entries

**Requirement:** Add a visual signal on journal entry hover to indicate the cards are clickable links

**Story**
As a visitor reading the Engineering Journal section, I want to know the entries are clickable, so that I do not miss the deeper journal content assuming the cards are static.

**Objective**
Add a subtle "→" or copper border-left that appears on hover/focus to signal that journal entries are links.

**Context**
`.journal-entry` elements are `<a>` tags but look like static cards. No underline (removed globally), no arrow, no hover state beyond `transform: translateY(-1px)` inherited from button rules... actually journal-entry does not have a hover rule currently. The cards need a hover signal.

**Scope**
In: Add to styles.css:
```css
.journal-entry {
  transition: border-color 180ms ease, transform 180ms ease;
}
.journal-entry:hover,
.journal-entry:focus-visible {
  border-color: rgba(181, 99, 62, 0.34);
  transform: translateY(-1px);
}
```
Out: Adding arrow text to the HTML, changing card layout.

**Closed decisions**
- Signal: copper border on hover — consistent with `.casefile.is-active` which uses the same `rgba(181,99,62,0.34)` border
- Transform: `-1px` lift — same as buttons and casefiles, consistent micro-interaction language
- No HTML change — pure CSS

**Success criteria**
- Hovering a journal entry shows a copper border and a subtle lift
- Matches the hover/active language already used on casefiles

---

## Task W08 — Replace periods with middle dot in hero subtitle

**Requirement:** Change "Backend. Data. Artificial Intelligence." to use `·` separators

**Story**
As a visitor reading the hero subtitle, I want the three terms to read as a refined list, so that the full-stop periods do not give the subtitle a blunt, sentence-like rhythm.

**Objective**
Replace the period-separated format with middle dots for a more typographically refined feel.

**Context**
"Backend. Data. Artificial Intelligence." — the full stops after each word read as sentence endings, which creates a staccato rhythm. "Backend · Data · Artificial Intelligence." uses the middle dot (U+00B7, `&middot;`) as a typographic separator, common in refined editorial design and more appropriate for a "terms of focus" list than terminal punctuation.

**Scope**
In: In index.html, change the `<p class="hero-subtitle">` content from:
```
Backend. Data. Artificial Intelligence.
```
to:
```
Backend · Data · Artificial Intelligence.
```
Out: CSS changes, font changes, sizing changes.

**Closed decisions**
- Separator: `·` (`&middot;` — U+00B7 middle dot with spaces either side)
- Keep the trailing period on "Intelligence." → remove it: end on "Intelligence." → "Artificial Intelligence" (no trailing stop needed with dot separators)
- Final form: `Backend · Data · Artificial Intelligence`

**Success criteria**
- Hero subtitle reads "Backend · Data · Artificial Intelligence" with middle dots
- No trailing period at end of line

---

## Task W09 — Add copper accent to CV download card in Repository

**Requirement:** Visually distinguish the "Download PDF-ready version" card in the Repository section

**Story**
As a recruiter in the Repository section, I want the CV download to stand out as an action, so that I can find the download quickly without scanning all four cards.

**Objective**
Apply the same copper left-border treatment already on the Email card to the CV download card, making it a co-primary CTA alongside Email.

**Context**
The Repository section has:
- Email — full-width, `border-left: 2px solid var(--copper)` (D08)
- GitHub — standard card
- LinkedIn — standard card
- Printable CV — standard card

The CV download is the second most important action for a recruiter (after email). It should be visually distinguished. The Email card already has the copper border treatment; applying the same to CV download creates two clear primary CTAs without introducing new visual language.

**Scope**
In: In index.html, add `style="border-left: 2px solid var(--copper); padding-left: 18px;"` to the `.repo-link` for the CV download (the one with `href="./cv.pdf"`).
Out: Changing card layout, changing the Email card, redesigning the section.

**Closed decisions**
- Treatment: same inline style as the Email card for consistency
- Do NOT make it full-width — two full-width cards would create too much visual weight; CV download stays standard width with just the copper border

**Success criteria**
- CV download card has a copper left border matching the Email card style
- Email and CV download are visually distinct from GitHub and LinkedIn cards

---

## Task W10 — Reorder repo card elements: badge to bottom

**Requirement:** Move Author/Contributor badge to after the description, above the chip-row

**Story**
As a visitor reading a Public Proof repo card, I want to read title then description without the badge interrupting the flow, so that the card has a natural top-to-bottom reading order.

**Objective**
Move the `.case-emphasis` badge (Author/Contributor) to appear after the description `<p>` and before the `.chip-row`.

**Context**
Current order inside each `.repo-link`:
1. `<span class="meta-label">` (stack label)
2. `<strong>` (repo name)
3. `<span class="case-emphasis">` (Author/Contributor) ← interrupts title-to-description flow
4. `<p>` (description)
5. `.chip-row` (stack chips)
6. `<span class="meta-label">Pattern:</span>`
7. `<p>` (pattern text)

The badge between title and description creates a visual bump in the reading flow. Better:
1. meta-label (stack)
2. strong (title)
3. p (description)
4. case-emphasis badge
5. chip-row
6. meta-label Pattern:
7. p (pattern)

**Scope**
In: In index.html, for all four `.repo-link` cards, move the `<span class="case-emphasis">` from after `<strong>` to after the description `<p>` (before `.chip-row`).
Out: CSS changes, content changes.

**Closed decisions**
- New position: after description, before chip-row — the badge becomes a footer tag rather than a heading interrupt
- No CSS needed — pure DOM reorder

**Success criteria**
- Reading each card: stack label → repo name → description → badge → chips → pattern
- No visual regressions in the card layout
