# AGENTS

## Project Intent

Build a personal career site for Sergio Ballesteros that feels like an `Engineering Notebook`, not a generic CV template.

The site should read like a documented engineering artifact for a software developer who works across:

- Java
- Spring Boot
- AWS
- Kubernetes
- AI integration
- Data engineering
- automation

The goal is to differentiate the profile immediately, while still staying credible for recruiters and technical reviewers.
The site should center systems, decisions, and evidence, not Sergio's biography.

## Core Identity

Do not present Sergio as a generic "Full Stack Developer" unless the user explicitly asks for that label.

Preferred positioning:

- Software Developer
- Java / Spring Boot / AWS / Kubernetes
- AI Integration
- Data Engineering

Tone:

- precise
- confident
- product-oriented
- technically mature
- minimal but not sterile

Avoid:

- hype
- fake startup fluff
- generic portfolio tropes
- AI-looking decorative chrome
- over-animated UI

## Visual Direction

The visual language is a blend of:

- editorial notebook
- technical dossier
- engineering logbook
- modern documentation

The UI should feel like opening an engineer's working notebook, not visiting a normal website.

### Layout Model

Prefer a structure that feels like:

- notebook cover / notebook index
- systems in production
- case files
- engineering decisions
- evidence trail
- engineering notes
- engineering journal

Avoid classic website navigation and generic portfolio sectioning.

### Typography

Typography should feel premium and engineered, not default.

Rules:

- large confident headings
- strong contrast between title and metadata
- readable body copy
- compact labels and chips
- clear hierarchy for scanning

If a section is meant for recruiters, it must be scannable in seconds.
If a section is meant for technical readers, it can go deeper.

### Color

Current direction:

- warm off-white base
- dark navy / charcoal foreground
- subtle blue and teal accents
- occasional earthy accent for warmth

Avoid:

- purple-heavy palettes
- neon gradients
- dark-mode-only aesthetics
- washed-out beige that kills contrast
- high-saturation rainbow UI

### Photo Treatment

Use the provided portrait as a small human anchor.

Rules:

- do not stylize it into a fake AI avatar
- do not add obvious filters
- do not crop it into a stock-photo frame
- do not bury it under decorative overlays

The portrait should make the site feel personal and trustworthy, but it must never dominate the systems.

## Content Strategy

The site should not be built around a generic "About me / Skills / Contact" template.

Canonical content inventory lives in [CONTENT.md](/Users/sergioballesteros/Documents/cv-sergioballesteros/CONTENT.md).

Preferred content model:

- notebook heading
- current mission
- systems in production
- case files
- engineering decisions
- evidence
- engineering notes
- engineering journal
- links to GitHub and LinkedIn
- downloadable CV

Project names currently relevant:

- OCM Brain
- Energy Simulator Platform
- OCR + LLM
- Automated Import Pipelines
- Microservices Architecture

These should be presented as real systems with operational framing, not as empty portfolio cards.

## Copy Rules

Copy should sound like a strong engineer describing shipped work.

Good:

- "Systems in Production"
- "Healthy"
- "In production"
- "Automated"
- "AI-assisted"
- "Engineering Decisions"
- "Evidence"
- "Case File"

Avoid:

- "passionate"
- "motivated"
- "creative problem solver"
- "I love coding"
- generic recruiter filler

If a metric is not real, do not invent it as a hard number.
Prefer status language over fake analytics.

## Technical Direction

Current implementation is a small static site. Keep the minimum moving parts required.

Prefer:

- semantic HTML
- CSS first
- tiny JS only where needed
- reusable styling primitives
- print-friendly output

Do not add frameworks unless there is a clear reason.
Do not add dependencies just because the site could use them later.

If the project is rebuilt in React / Next.js later, preserve the same identity:

- notebook-like structure
- systems-first framing
- technical product language
- restrained motion
- premium but functional layout

## Skills To Use

Use installed frontend and design skills when relevant:

- `figma-use`
- `figma-generate-design`
- `figma-implement-design`
- `figma-create-design-system-rules`
- `frontend-app-builder`
- `frontend-testing-debugging`
- `react-best-practices`

Use them to keep the UI coherent and to validate the rendered result.

## Verification

For any UI change:

- verify the rendered page in browser
- check desktop and mobile
- confirm the layout does not regress into a generic portfolio
- confirm the portrait stays secondary
- confirm the systems remain the protagonist
- confirm no clipped text, broken spacing, or unreadable labels

## Non-Negotiables

- No generic portfolio template.
- No fake AI gimmicks.
- No overdone motion.
- No classic website nav feel.
- No system cards that just look like landing-page cards.
- No stock-website feel.
- No invented experience or metrics.
- No loss of recruiter readability.

## Working Rule

Default to the shortest solution that preserves the identity above.
If a choice looks generic, it is probably wrong.

## Asset Policy

- Prefer WebP for photos and screenshots when the browser support is acceptable.
- Keep portrait assets small: target `<= 50KB` for the rendered hero image.
- Keep evidence screenshots and GIFs lean: target `<= 300KB` unless a larger asset is the only honest proof.
- Remove unreferenced binary assets from the working tree instead of leaving them as mystery files.
- If a binary asset is intentionally kept but not yet referenced, document why in `ROADMAP.md` before it lands in history.
