# Energy Simulator Demo

A public, dependency-free runtime demonstration of a private production energy platform. In about a minute: try a fictional invoice, see the extraction boundaries, review typed data, and compare calculated scenarios. This is an engineering artifact, not a commercial comparison service.

## Context and inspected production concepts

The production repository was inspected before implementation: its architecture guide and README, invoice schema, upload handler, document/text/OCR strategies, extractor interface, postprocessing pipeline, LLM payload allowlist, normalized invoice validator, simulation orchestration and batch runner, review wizard, and relevant test structure. Production uses Next.js/TypeScript, FastAPI, PostgreSQL, Redis/Celery, text extraction, Tesseract and hosted LLM extraction. The actual pipeline includes text-first strategies and heuristic fallbacks; OCR is not a mandatory first step for every PDF.

The portfolio frames Energy Simulator as a private shared pricing platform; KetoHoy provides direct public production proof. This route supplies interactive public evidence for Energy Simulator without claiming to be its production application. It inherits the notebook's serif headings, compact metadata, warm paper and navy/teal palette. The portfolio links to the demo from Public Proof, the Energy Simulator case row and the case-study header.

## Architecture

```text
Document / sample
    ↓
Local ingestion (size, MIME, magic bytes)
    ↓
DemoExtractor (OCR / LLM concepts mocked)
    ↓
Allowlisted extraction schema
    ↓
Normalized invoice (dates, units, reconciliation)
    ↓
Human review + validation again
    ↓
Pure deterministic synthetic simulation
    ↓
Scenario comparison and cost breakdown
```

- `extraction.js`: ingestion boundary, fictional fixture and replaceable async extractor. `extract(onStage, signal)` returns `{ invoice, review, source }`. Both sample and valid uploads use the same mock extraction/validation/review path; uploads do not affect the fixture.
- `domain.js`: runtime schema checks, explicit nulls, numeric parsing, UTC dates, normalization, invoice reconciliation, synthetic tariffs and pure calculations. JSDoc provides checked TypeScript types without introducing a framework or runtime dependency.
- `app.js`: state transitions and presentation only. Cancellation prevents stale asynchronous work from repopulating a reset screen.
- `index.html` / `demo.css`: accessible labels, review confirmation, live status and errors, keyboard controls, print styles and responsive layout.
- `sample-invoice.pdf`: a fictional bill created from scratch, matching the visible document and fixture. No copied or anonymized customer invoice.

## Production vs demo

| Production concept | Public implementation | Treatment |
| --- | --- | --- |
| Document ingestion and queued processing | Ephemeral browser file checks | Simplify |
| Text extraction, OCR, LLM and heuristic fallback | Replaceable `DemoExtractor` with visible mocked stages | Mock |
| Typed extracted data and field provenance | Public allowlist, null handling, synthetic review flag | Keep concept |
| Versioned normalized invoice and validation issues | Small electricity-only normalized model | Simplify |
| Review before downstream operations | Editable inputs and explicit confirmation | Keep concept |
| Fixed/indexed pricing and detailed results | Three synthetic fixed-rate scenarios and invoice baseline | Reimplement with synthetic data |
| Commercial tariffs, policies, commissions, market data | No copied values or algorithms | Exclude |
| Persistence, authentication, integrations, infrastructure | No backend or provider integration | Exclude |
| Personal data, real CUPS, internal prompts and secrets | No production identifiers; intentionally invalid demo supply reference | Exclude |

No private code, prompts, pricing policies, datasets, invoice samples or deployment details were transferred. The public model deliberately excludes gas, additional access tariffs, indexed market pricing, export credit, reactive energy, commercial commissions and integrations.

## Calculation assumptions

Billing end is exclusive. Annual consumption = period kWh × 365 / billing days; power cost = kW × synthetic €/kW/day × 365. Scenario other costs use a synthetic daily fee. The levy is an illustrative 4% and VAT an illustrative 20%; these do not model current law. Calculation details and all demo rates are inspectable in the results UI.

Current baseline annualizes the reviewed invoice amounts, rather than reconstructing an unknown current tariff. Changing consumption changes scenario prices; changing invoice amounts changes the baseline. This distinction is explicit in the UI. Missing numbers block simulation; zero is accepted. Zero baseline produces no percentage comparison. Values are calculated unrounded internally, then formatted to cents; individual displayed components can differ from their displayed total by a cent.

The sample uses 30 days, 280 kWh and 4.6 kW in P1/P2. Energy €61.60 + power €17.94 + levy €3.18 + rental €0.90 + VAT €16.72 = €100.34. All names, identifiers, dates and values are invented.

## Privacy and upload limitations

The public provider is **mock**. A PDF, PNG or JPEG upload is checked for size (1 byte–5 MB), declared MIME and matching file signature. These checks identify the container; they do not parse document content or guarantee a complete, readable invoice. No preview of the user's document is rendered. The app discards the file bytes after ingestion and returns the fictional fixture. It does not claim to have extracted the uploaded invoice.

The app never uploads documents, calls no AI service, writes no local/session storage or cookies, includes no analytics, and logs no document content. Reviewed values remain in page memory until reset/reload; reset clears the file control and state. Browser/OS memory reclamation timing is outside the app's control. Static hosting may log ordinary page/asset requests (including the static fictional sample PDF); those requests contain no uploaded invoice content.

## Running locally

From the portfolio repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/demo/energy-simulator/`. No API key, build or npm installation is required to run the demo. Serve the repository root so the links back to the notebook work. The directory can also be hosted on any static host with its relative links adjusted.

For development checks (Node 22+):

```sh
cd demo/energy-simulator
npm ci
npm test
npm run lint
npm run typecheck
npm run build
```

`build` verifies typed browser modules, local assets and workflow states; the deployable static files need no bundling. `node_modules` is development tooling and must not be included in a static deployment. No root package manager or framework was added.

## Optional AI provider

No real AI provider is implemented. A future provider should live behind a server endpoint and keep the same extraction boundary, validate its untrusted output, enforce MIME/size/time limits, avoid PII logs and document persistence, and document the actual third-party data flow. Never place a provider key in these browser modules. Environment variables are not an active configuration mechanism for this static demo.

## Portfolio entry point

Intended link: `/demo/energy-simulator/`, labeled **Launch interactive demo ↗** beside the Energy Simulator case study. Suggested framing: “Production system · Private. A platform for extracting structured energy data from invoices and simulating pricing scenarios.” These entry points are now integrated in the portfolio in English and Spanish. The demo inherits the portfolio language (`?lang=es` / `?lang=en`, falling back to its saved preference); headings, review fields, validation messages, stages and results are translated. JSON keys and the fictional downloadable PDF retain their original form.

## Verification

Domain/ingestion tests cover nulls vs zero, malformed payloads, numeric coercion, date boundaries, amount reconciliation, independently computed pricing, edited inputs, zero baseline, MIME/signature/size checks and cancellation. Browser QA covers sample → review → results, editing/recalculation, missing-field errors/recovery, reset, sample-PDF upload, keyboard controls, console health and desktop/tablet/375px layouts.

Visual verification used Codex's in-app browser at 1280×720, 1536×1024 (concept native dimensions), 768×1024 and 375×812. The concept and rendered screenshots were inspected with `view_image`: serif hierarchy, paper/navy/teal/copper palette, invoice layout, three-step workflow and horizontal comparison bars. Intentional adaptations: one active screen instead of a three-screen concept board; euros and mathematically consistent synthetic figures; explicit mock language replacing the concept's inaccurate local-OCR claim; upload controls and review form move first on narrow screens. Above-the-fold copy was checked against the user framing, with these documented corrections. Tablet document crowding and mobile caption clipping were fixed. No relevant console errors or page-wide horizontal overflow remained in the checked viewports. This is not a pixel-for-pixel implementation of the board; it preserves its visual system while meeting the functional and truthful-copy requirements.
