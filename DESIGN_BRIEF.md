# Design Brief

## Direction

This project is not a developer portfolio.

It is an `Engineering Notebook` or `Engineering Logbook`:

- a documented view into how Sergio Ballesteros builds production systems
- a technical notebook, not a biography page
- a system-first product, not a face-first personal brand site
- a modern web experience that behaves like a notebook, not a normal website

## Core Narrative

The site should not say:

- look at Sergio
- here is his profile
- here are his skills

The site should say:

- these are the systems Sergio has built
- this is how he thinks about architecture
- this is how he makes engineering decisions
- this is how he documents real production work

The site can optionally orbit one editorial thesis, for example:

- `Documenting systems. Not portfolios.`
- `Production first. Presentation second.`
- `Building software. Documenting decisions.`

## Primary Positioning

- Software Developer
- Production systems
- Data
- Artificial Intelligence

Short framing:

`I build production systems.`

Then:

- Backend.
- Data.
- Artificial Intelligence.

## UX Goal

When a recruiter or tech lead opens the site, the reaction should be:

- this is not a normal portfolio
- this person thinks in systems
- this engineer documents real work
- I want to explore how these projects were built

The site should invite exploration, not just scanning.

## Experience Principles

- Sergio should have less visual protagonism than the systems.
- The systems should be larger than the biography.
- Portrait usage is allowed, but secondary.
- Portrait usage should be small enough to feel like an identity marker or signature.
- The hero should be minimal and calm.
- The exploration should feel like opening an engineer's notebook.

## Visual Model

Preferred visual metaphor:

- notebook
- technical dossier
- engineering logbook
- product documentation
- system map

Avoid:

- generic portfolio hero
- SaaS dashboard cliché
- concept-art overload
- game UI energy
- cyberpunk
- terminal gimmicks
- decorative AI visual noise
- classical navigation bars that make the notebook feel like a normal landing page

## Information Architecture

### 1. Hero

Very minimal.

Required content:

- Engineering Notebook
- Sergio Ballesteros
- Last updated
- `I build production systems.`
- `Backend. Data. Artificial Intelligence.`
- Current Mission
- `Building intelligent systems for the energy sector.`

Rules:

- No oversized self-presentation block.
- No dense personal metadata block in the hero.
- Role, location, timezone, and similar biography details should be de-emphasized or moved out of the opening.
- The hero should feel like a notebook title page, not a portfolio introduction.

### 2. Systems

Do not present these as normal portfolio cards.

Present them as active documented systems:

- Case 001: OCM Brain
- Case 002: Energy Simulator
- Case 003: Smart OCR
- Case 004: Data Processing

Each system should expose:

- status
- last updated
- evidence counts when available
- stack
- short description
- ability to open deeper notes

Preferred model:

- case file
- documented system record
- operational dossier
- notebook entry

Do not present them as marketing cards or feature tiles.

### 3. Engineering Decisions

This is a differentiator section.

Show explicit engineering reasoning:

- Why Spring Boot
- Why PostgreSQL
- Why Kubernetes
- Why OpenAI / Anthropic
- Why this architecture

The point is to teach how Sergio thinks, not list technology.

Preferred presentation:

- notebook page
- decision record
- context / problem / decision / tradeoffs / result

Avoid default accordion UI unless no other simple implementation works.

### 4. Evidence

Replace generic social proof with technical proof:

- screenshots
- diagrams
- architecture views
- code snippets
- SQL
- merge requests
- operational artifacts

Preferred presentation:

- system lifecycle
- architecture -> MR -> deployment -> monitoring
- evidence strips or engineering trail

Avoid showing evidence as a single decorative screenshot dump.

### 5. Engineering Notes

Each project should have a deeper article or document-like detail page:

- problem
- architecture
- solution
- decisions
- tradeoffs
- result

This should feel more like documentation than marketing copy.

### 6. Engineering Journal

This is not a blog.

It is a journal of technical decisions and system work.

Suggested entries:

- Why I migrated this repository
- How I fixed encoding issues while importing 900,000 records
- What I learned integrating Anthropic
- Why I chose Spring Boot over another option

The journal should communicate reflection, documentation habits, and engineering maturity.

## Tone

- serious
- calm
- precise
- documented
- technical
- human

Avoid:

- startup hype
- self-promotional fluff
- generic claims
- decorative cleverness

## Layout Guidance

- lots of whitespace
- clean reading rhythm
- restrained color
- strong typography
- large content surfaces for systems
- smaller identity surface for Sergio
- visual hierarchy should prioritize systems, notes, and decisions
- navigation should feel like notebook structure, volume, index, or sections, not a normal website menu

The site should feel readable for 5 minutes, not just impressive for 10 seconds.

## Color And Material

- warm white or paper-like background
- deep navy / charcoal text
- subtle copper or rust accent
- muted green for status or system health

The look should feel like:

- paper
- documentation
- notebook
- calm interface

Not like:

- glossy dashboard
- futuristic concept board
- neon product launch page

## Non-Negotiables

- Not a classic portfolio
- Not a generic developer website
- Not a dashboard-first aesthetic
- Not biography-first
- Systems first
- Thinking first
- Documentation first
- No classical website navigation feel
- No card-grid portfolio feel

## Build Rule

If a design choice makes the site look more like a normal portfolio, reject it.

If a design choice makes the site feel more like a documented engineering notebook, keep it.
