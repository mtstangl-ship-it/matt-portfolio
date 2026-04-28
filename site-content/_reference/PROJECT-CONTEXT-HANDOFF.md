# PROJECT CONTEXT HANDOFF — MATT STANGL PORTFOLIO REFRESH

**Purpose of this file:** This brief captures the full state of the Matt Stangl portfolio refresh project so a new Claude conversation can pick up cleanly without re-explaining context. Save this file in the project root. When starting a new chat, upload this file or paste its contents as the first message.

**Last updated:** April 27, 2026 — Triage locked. 8 of 10 pages locked. Home Ledger updated. Reminder 8 added.

---

## WHO MATT IS

- **Name:** Matt Stangl
- **Title (locked everywhere):** CX, Product & Service Design Leader
- **Targeting:** Senior manager → director-level roles, especially behavioral health
- **Location:** Denver, Colorado
- **Email:** mtstangl@gmail.com
- **Background:** 15+ years experience
- **Education in progress:** Stanford AI for Product Strategy cert (est. May 2026)
- **Personal context:** 6 months in recovery (kept off Home; flagged optional for About — currently OUT of all copy)
- **Owns:** 1978 BMW R100/7 "Alice" + 1977 BMW R75/7 "Ayda"

**Career history (in his own words for Mileage Log on About):**
- Autodesk (2023-2026, in-house) — current
- Wipro Digital — Estée Lauder ONLY (Takeda was CUT from copy as inaccurate)
- EY — Georgia DPH, Humana, Citi, Oklahoma DOL
- Discovery
- Stangl LLC (creative side)

---

## THE STACK

- **Cursor** — build environment (where code lives)
- **Claude (this chat) + future chats** — strategy, copy, critique, structured prompts
- **Claude Design** — visual prototyping (separate weekly limit, resets Tuesday 9am)
- **Vercel** — deploy with instant previews

**Project root:** `/Users/tron/Desktop/matt-portfolio/`

**Critical context:** Site is HARDCODED in components — markdown files are working docs only. Live application happens via Cursor pasting from approved COPY-*.md files. Tuesday 9am is when Claude Design's weekly limit resets and the visual rebuild can begin.

---

## VISUAL DIRECTION

### Site-wide: FICHE/TECHNICAL ILLUSTRATOR GRAMMAR

References: Linear.app, Stripe Press, Bloomberg terminal, Notion changelog.

Visual elements: leader lines, dimension rules, part numbers, figure stamps, revision callouts, title blocks, crosshair alignment marks. Dark theme only.

Claude Design has the prototype URL for the Autodesk journey ribbon, which exemplifies the fiche aesthetic.

### About page exception: MOTORCYCLE/BMW AIRHEAD METAPHOR

The About page leans into Alice + Ayda. Halftone/duotone treated photos + factory diagrams (gauge cluster, Tafel 3 engine, boxer cutaway) interspersed. Photos must NEVER appear raw. Section names motorcycle-native.

**About page section names (locked):**
1. Hero — "I work on old BMWs in my garage..."
2. Trade-offs at Speed (was How I Choose) — 5 even-over statements
3. Service Manual (Double Diamond) — "Probe the brief" / "Ship and observe"
4. Riding Conditions (was What Working Together Feels Like)
5. Mileage Log (was Career Arc/Operator Log) — first person, full client list with parentheticals
6. Off-Shift (was Personal Note)

### Centaur Practice case study exception (light motorcycle terms only):

Surgical fiche/motorcycle terms: "Service Records" (was Three Artifacts), "Service Bulletin" (was Failure Mode), "tore it down and rebuilt" (was deleted/started over). Discipline of restraint — every term must carry meaning, not decoration.

### Other case studies: STAY IN THEIR OWN WORLD

- **Synthetic Users** — research methodology vocabulary (pipeline, evidence ladder, hypothesis, persona, adversarial, pre-flight cost)
- **Autodesk** — service design + revenue motion vocabulary
- **Wipro** — ITIL operations vocabulary (six towers, MTTR, incident management)
- **EY** — public health field activation vocabulary

DON'T push motorcycle terms into Wipro, EY, Autodesk, or Synthetic Users. Fiche grammar visually unifies the site. Editorial voice stays in each case's native register.

---

## PAGE STATUS — 8 OF 10 LOCKED

✅ **Home** — Tier 1 locked at `COPY-home-final-sunday.md`
✅ **Impact** — Tier 1 locked at `COPY-impact-revised.md`
✅ **Signal → Story** — Tier 1 locked at `COPY-signal-story-revised.md`
✅ **Case Studies hub** — Tier 1 locked at `COPY-case-studies-hub-final.md`
✅ **About** — Tier 1 locked at `COPY-about-final.md`
✅ **Centaur Practice case study** — Tier 1 locked at `COPY-case-ai-build-revised.md`
✅ **Synthetic Users case study** — Tier 1 + Tier 2 locked at COPY-case-synthetic-users.md (April 27)
⬜ **Autodesk case study** — needs major rewrite, requires deck + resume + 10-15 Q&A
✅ **Wipro case study** — Tier 1 + Tier 2 locked at COPY-case-wipro.md (April 27)
⬜ **EY case study** — pending

---

## CURRENT MOMENT — WHERE WE STOPPED

**On Synthetic Users case study.** Audited the live page. Identified problems:

1. EVIDENCE.LADDER table is the page's load-bearing artifact — strong, keep
2. "Three findings self-review missed" headline reads as under-delivered methodology to research skeptics
3. Sections 01-05 are too prose-heavy
4. Visuals are insufficient (table-only, horizontal, not mobile-friendly)

**Final structure (six sections, locked April 27, 2026):**
1. Hero — headline + dek + one-line problem framing folded in (was Section 04 · The Gap, cut)
2. Outcome / Funnel — headline number (3/3) + funnel artifact (9×4 → 18 → 10 → 3 → 3)
3. Evidence Ladder (existing — keep, the load-bearing artifact)
4. The Pipeline — Run A (5 thought-leader personas + 4 audience role-cards × 4 environments) + Run B (Claude Design critique) as parallel lanes, with sample persona card (Marc S. recommended) and 2 artifact links (FIG. 04-A QA Report, FIG. 04-B Design Critique)
5. Three Findings — F·01 / F·02 / F·03 cards + small 'Run B caught' companion list
6. The Lesson — compressed lesson + limits paragraph

Visual rhythm (mobile): text → visual → visual → visual → visual → text.
Section count discipline: started at 7, cut to 6 during restructure planning when Section 04 · The Gap couldn't justify its scroll unit.

**Cut entirely:**
- Section 03 · PERSONA LOGIC as standalone (folded into Pipeline). Section 04 · The Gap also cut (folded into Hero).

**Critical reframe needed: the funnel.**

"3 findings self-review missed" reads as low yield. Reframe as a multi-stage funnel showing the methodology's full output:

```
9 personas × 4 environments → 18 findings surfaced
18 findings → 10 actionable
10 actionable → 3 self-review missed  ← headline number
3 missed → 3 became shipped changes
```

Funnel numbers locked April 27, 2026: 9 personas × 4 environments → 18 findings surfaced → 10 prioritized as actionable → 3 self-review missed → 3 became shipped changes. The headline reframe holds: '3 of 10 actionable findings would not have been caught by self-review' is the methodology argument. See Reminder 2 (CLOSED) for confirmation.

Run B addition (April 27, 2026): The Pipeline section now documents two synthetic runs in parallel — Run A (content & methodology, 5 thought-leader personas + 4 audience role-cards) and Run B (design & systems, Claude Design critique). Both artifacts are wired as clickable evidence at /case-studies/synthetic-users/qa-report and /case-studies/synthetic-users/design-critique. Smoke test passed April 27. See Reminders 3, 4, 5 for build dependencies.

**Rewrite in progress, drafting Tier 1 + Tier 2 against:**
- Six sections as outlined above
- Funnel as a small visual artifact (stepped bar or stair-step diagram, fiche grammar)
- Three findings as discrete cards (eyebrow F·01/F·02/F·03, headline, body 2-3 sentences, "BECAME SHIPPED CHANGE" outcome stamp)
- Persona silhouettes as visual motif (deferred to Tuesday Claude Design — see design notes below)
- ~50% exposition cut from current draft

---

## EDITORIAL DECISIONS LOCKED ACROSS THE SITE

### Site-wide
- **Title everywhere:** "CX, Product & Service Design Leader"
- **Tagline:** "CX, Product & Service Design Leader · Director / Senior Manager"
- **Availability:** "Available for senior design leadership roles, especially in healthcare."

### Home page
- **Hero H1:** "I turn fragmented experiences into flow-state customer value."
- **Hero subhead:** "For enterprises where the journey has splintered across operational silos."
- **Brand thesis replaced with PROBLEM LEDGER (diptych: Solved | Want to solve)**

#### Problem Ledger — Solved (rotating left col)
1. Turned Autodesk's post-purchase support into a $50M revenue motion
2. Unified Wipro's six ITIL towers into one operating model for Estée Lauder
3. De-politicized vaccination engagement across Georgia — CDC national best practice
4. Cut MTTR by 31% — 13K annual lockouts eliminated
5. Built a global CX practice from zero at an enterprise consultancy
6. Made synthetic users a research method with documented QA pipeline

#### Problem Ledger — Want to solve (rotating right col)
1. Scaling healthcare access for populations the system was never built to serve
2. Friction between patients, providers, and insurers that nobody owns by design
3. Stigmatized care treated as a clinical experience, not a moral one
4. Experience design as an operating model, not a team
5. Service tiers designed around what customers actually value — not what we can charge for
6. AI strategy that raises the ceiling of what teams can do, not just the floor

Dimension rule between: "TRACK RECORD → INTENT"

### Impact page
- **$50M caption:** "$50M+ · Projected incremental revenue · YoY after 2 quarters" (NOT delivered — projected from design)
- **Replaced "15 services shipped"** with "Business plan renewal rate exceeded 75% goal in Q1 post-launch"
- **Autodesk Impact section title:** "My team designed Autodesk's new Post-Purchase Model"

### EY case study locked details
- **Metrics:** 4.57M engagements / 715 vaccinations / 40+ live vax hours / 24+ local partners
- **CUT "10+ partners" everywhere** (replaced with 24+)
- **Three cities only:** Atlanta (452 vaccines), Athens (175 — "Twilight Criterium · UGA Athletics partnership"), Savannah (88) — math reconciles to 715
- **Title:** "Vaccine hesitancy isn't a comms problem. It's a showing-up problem."

### Wipro case study locked details (Tier 1 + Tier 2 LOCKED April 27, 2026)
- **Estée Lauder ONLY** (no Takeda — Takeda was CUT as inaccurate)
- **NPS:** +13% (not +15%)
- **Annual lockouts eliminated:** 13K (not 16K — 16K reference cut everywhere)
- **Eight-figure renewal CUT** (couldn't be substantiated, replaced with three defensible outcomes)
- **MTTR reduction:** 31% (defensible per Matt; no source deliverable)
- **Title:** "Password lockouts were the symptom. Six towers were the disease."
- **Dek (locked):** "Estée Lauder's service desk was taking 3,515 password-reset tickets a month — and escalating 42.6% of them. I led the transformation that unified the experience across six towers."
- **Section count:** 6 (Brief absorbs Pivot / Diagnosis / Case Flow / Design / Delta / Lesson)
- **Word weight:** ~960 Tier 1 user-facing — aligned with Centaur (912) and Synthetic (972)
- **Scope frame:** Lockout workflow framed as load-bearing demonstrated example of broader six-towers operating-model unification (not as the totality of Matt's scope)
- **Section 03 headline tightened from live:** "Follow one lockout ticket through both models" → "One ticket. Two models. Same Monday morning."

### Centaur Practice case study locked
- **Title:** "I built this portfolio with AI, and kept the decisions human."
- **Six sections:** Hero / Build Telemetry / Centaur Declaration / Service Records / Service Bulletin / Footer
- **Mollick framework:** Centaur (humans + AI dividing tasks) vs Cyborg (total integration). Matt is a Centaur.
- **Concrete example required:** AI Generated → "I Changed It To" copy comparison
- **Pivot moment:** "I tore it down and rebuilt"
- **Three artifacts (now Service Records):** Design Review Terminal / Deployment Diff / Signal Telemetry
- **Eyebrow prompts on each artifact:** "TAP TO FILTER" / "DRAG SLIDER" / "TAP A WEEK"

### Autodesk case study locked
- **Title:** "Autodesk's 106% NRR design. The customer value journey behind it."
- **Note:** Case study scope = horizontal value journey; Impact dashboard scope = vertical post-purchase service slice. DIFFERENT scopes. Don't conflate.

### Case Studies hub locked
- **Header:** "Documented work." / "Five builds. The systems behind the outcomes, and the decisions that shaped each."
- **Picker labels (ALL CAPS):**
  - 01 · CENTAUR PRACTICE
  - 02 · SYNTHETIC USERS
  - 03 · AUTODESK
  - 04 · WIPRO
  - 05 · EY HEALTHCARE
- **Build true index page at /case-studies AND keep inline tab picker on individual case study pages** — picker doesn't need to return-to-index for navigation

### Signal → Story page
- **Framing line:** "I'm a design leader who can also write the spot, cut the film, and tell the story. That's not common." (replaced aerospace framing)
- **Subhead:** "A running record of the signals I catch — moments, behavior, culture, emotion — and the short films they turn into."
- **Mobile film previews:** autoplay on scroll, NOT on hover/click/touch

---

## SEVEN INTRIGUE MOVES (catalogued in /reference/intrigue-moves.md)

1. Counter animation $50M from 0 (torque dial)
2. Tier ladder morphs (exploded assembly)
3. Review Terminal types (FIG. 03 · QA TRACE)
4. EY 4.57M→715 spatial gap (dimension rule, GAP BY DESIGN)
5. Wipro six-to-one collapse (REV. 02 · REDRAWN)
6. Signal → Story hover plays film (mobile: scroll-triggered autoplay)
7. Case cards figure stamps (FIG. 01-A etc with sparklines)

---

## TWO-TIER COPY SYSTEM

Every section has Tier 1 (full) and Tier 2 (tight, mobile-first ~40-50% reduction).

**[DECISION]** Matt is comfortable with Claude (this chat) writing Tier 2 across all locked pages later, with emphasis on mobile text footprints. Will execute Monday afternoon after Tier 1 is locked across all pages.

---

## CLICHÉ KILL LIST

Apply across all remaining work:

- "Human-centered methodologies and systems thinking"
- "Exit velocity" / "Proof in flight" / "Measured at altitude"
- "Plausible scenarios and edge cases"
- "Journey-led operating models" (1 use max site-wide)
- "At the system level" (1 use max site-wide)
- T-minus timestamps anywhere
- "CH 01 · LIVE" pills (drop LIVE)
- "Operator Log" (use "Mileage Log" on About; "Operator" only once on Impact ID card)
- "AI Workflow" panel/picker labels (now "Centaur Practice")
- "Mission profile" / aerospace metaphor anywhere outside the deliberately-cut Phase Flow
- Aerospace metaphor on About specifically — zero tolerance
- "Strategic design leader who transforms complex enterprise challenges through human-centered methodologies and systems thinking" — this is the AI-generated example called out in Centaur Practice, must not appear elsewhere

---

## ⚠️ PERSISTENT REMINDERS

### REMINDER 1: Deployment Diff V2 Screenshot for Centaur Practice

**Status:** ⏳ PENDING

**What's needed:** A screenshot of the home page hero in its post-Claude-Design v2 state.

**Why it's pending:** Claude Design rebuilds the home page on Tuesday. The v2 state doesn't exist until then.

**Sequence to complete:**
1. ⬜ Tuesday: Claude Design rebuilds home page hero with fiche grammar applied
2. ⬜ Wednesday: Review and approve v2 state
3. ⬜ Thursday: Capture v2 screenshot at 1280px desktop and 390px mobile
4. ⬜ Thursday: Replace placeholder in Deployment Diff service record (Service Record 02)
5. ⬜ Thursday: Verify the record renders correctly with v1 → v2 comparison
6. ⬜ Mark this reminder as ✅ COMPLETE

**What's at risk if forgotten:** The Deployment Diff service record won't function. The Centaur Practice case study can't ship live without v2.

This reminder is also locked into the COPY-case-ai-build.md file with checkboxes.

### REMINDER 2: Synthetic Users — Funnel numbers (CLOSED)

**Status:** ✅ CLOSED — numbers confirmed Apr 27, 2026

**Confirmed funnel:** 9×4 → 18 → 10 → 3 → 3 (nine personas × four environments; eighteen findings generated; ten actionable; three self-review missed; three shipped).

---

### REMINDER 3: Synthetic Users — Tuesday Build Pre-Flight Checklist

Status: ⏳ PENDING — execute before Tuesday 9am Claude Design session

Items Claude Design must have answered or in hand before touching this case study:

- [x] COPY-case-synthetic-users.md Tier 1 + Tier 2 LOCKED (locked April 27, 2026)
- [ ] Six-section structure confirmed: Hero / Outcome-Funnel / Evidence Ladder / Pipeline / Three Findings / Lesson
- [ ] Funnel numbers confirmed: 9×4 → 18 → 10 → 3 → 3 (locked Apr 27)
- [x] Run B line-item count finalized (53 line-fixes / 8 sections)
- [x] Sample persona card pick locked (Marc S. — Stickdorn-derived)
- [ ] Persona silhouette treatment direction: 5 thought-leader (illustrative) + 4 audience role-cards (abstract) — visual differentiation reinforces methodology argument
- [x] Artifact route URLs verified working: /case-studies/synthetic-users/qa-report and /design-critique (smoke test passed Apr 27)
- [x] QA report tab-switching JS verified in iframe (smoke test passed Apr 27 — all 7 tabs functional, no event.target issues)

What's at risk if forgotten: Claude Design will guess at structure, persona treatment, or copy placement. Tuesday session is 9am — these answers need to be in the file by Monday EOD.

---

### REMINDER 4: Synthetic Users — Post-Tuesday Cleanup

Status: ⏳ PENDING — execute Wednesday/Thursday next week

Items to revisit after Tuesday's Claude Design pass:

- [ ] Slug migration decision: live case study at /case-studies/synthetic, artifacts at /case-studies/synthetic-users (redirect bridges them). Decide: migrate case to /synthetic-users for symmetry, OR migrate artifacts to /synthetic for shorter URLs, OR keep redirect permanently. Recommendation: migrate case to /synthetic-users (matches picker label "02 · SYNTHETIC USERS").
- [ ] Nav + Footer chrome on artifact pages: decide whether to strip global Nav/Footer from /case-studies/synthetic-users/qa-report and /design-critique pages. Current state: full site chrome wraps the iframe + top bar. Tuesday call: strip if Claude Design has bandwidth (route-group restructure, ~15 min); otherwise leave and revisit.
- [ ] Run B line-item count: replace TBD in design-critique/README.md with final number once counted during Section 04 · The Pipeline drafting.
- [ ] 404 on artifact shell pages: track down and fix (likely favicon.ico — confirmed non-fatal during smoke test, cosmetic only).

What's at risk if forgotten: minor — these are polish items. Won't block ship but will read as small inconsistencies if left.

---

### REMINDER 5: Synthetic Users — Mid-Build Dependencies

Status: ⏳ PENDING — Tuesday session real-time

These are decisions Claude Design needs to make DURING the Tuesday session, not before. Flagging them so they don't get missed:

- Visual treatment differentiation: 5 thought-leader silhouettes vs. 4 audience role-cards must read as visually distinct populations on first glance, mobile and desktop. If Claude Design defaults to uniform treatment "for consistency," that defeats the methodology argument — the two populations SHOULD look different.
- Funnel composition: vertical stair-step on mobile (390px), horizontal on desktop (1280px+). Same content, two layouts. Don't compromise to a single layout that works "okay" on both.
- Artifact top bar styling: thin (~48px), dark theme, mono kicker font, single bottom border. Should feel like a research appendix wrapper, not a site page header. Don't add breadcrumbs or secondary nav.
- The Pipeline section's two runs (A and B): visual treatment must show them as parallel lanes of the same methodology, not as sequential phases. They're concurrent runs of the same pipeline against different persona classes.

What's at risk if forgotten: visual choices Tuesday that don't reinforce the methodology argument and require rework Wednesday.

---

### REMINDER 6: About Page Assets — Format Conversion + Pending Photos

Status: ⏳ PENDING — execute before Tuesday 9am Claude Design session (slot 6)

Pre-flight items:

- [ ] /photos-original/ has 11 files — mix of .jpg, .HEIC, .MP4. Browser-incompatible formats need conversion or removal:
  - .HEIC files (3): IMG_3046.HEIC, IMG_3047.HEIC, IMG_3067.HEIC — convert to .jpg
  - .MP4 files (2): IMG_3046.MP4, IMG_3047.MP4 — confirm relevance to static About treatment; if not relevant, remove
  - .jpg files (6): keep as-is
- [ ] /photos-new/ is empty (.gitkeep only) — Matt confirmed Saturday he'd take new photos this week. Status: pending Matt
- [ ] /diagrams-factory/ has 3 BMW factory diagrams — usable as-is, no action

What's at risk if forgotten: About page slot on Tuesday produces work against incomplete asset set. Halftone/duotone treatment cannot be applied to formats that don't load. Photos-new emptiness means About page may ship with stock-feeling imagery if Matt's photos don't arrive.

---

### REMINDER 7: Wipro + Cross-Page Source Fixes — Tuesday Pre-Flight

Status: ⏳ PENDING — execute before Tuesday 9am Claude Design session

These edits to live source files are required to bring source into alignment with locked COPY-*.md files. Discovered during Wipro April 27 lock pass.

Wipro-specific (in src/content/cases/wipro.html):
- [ ] Brief field "Outcome": remove "Eight-figure renewal · NPS past goal", replace with "31% MTTR reduction · 13K annual lockouts · 13%+ NPS over goal"
- [ ] Outcome strip "+15%" → "+13%"
- [ ] Hero unit line "31% — MTTR reduction · 16,000+ annual cases" → "31% — MTTR reduction · process behavior change, not throughput" (drop 16K denominator)
- [ ] Add "13K annual lockouts eliminated" to outcome metrics strip
- [ ] Tag spacing: "Companies· Case 04" → "Companies · Case 04" (add missing space)
- [ ] Section 02 "Pivot" entirely removed (folded into Section 01 Brief per locked structure)
- [ ] Section 02 chapter headline "Four weeks in, we killed the original plan" removed (no longer applicable)
- [ ] Section 03 headline "Follow one lockout ticket through both models" → "One ticket. Two models. Same Monday morning."

Cross-page (affect multiple files):
- [ ] src/components/case-studies/CasePicker.tsx OR src/content/case-studies.ts: case shortName for centaur slug "AI Workflow" → "Centaur Practice" (affects all 5 case study pages and hub)
- [ ] src/content/case-studies.ts: caseStudiesPage.title "Proof in flight." → "Selected work." (cliché kill list violation; locked Hub copy in COPY-case-studies-hub-final.md)
- [ ] src/content/case-studies.ts: caseStudiesPage.subhead replace per locked COPY-case-studies-hub-final.md (Matt to provide locked subhead)

Synthetic Users edge cases noted but not blocking (already locked):
- These same source updates surface in Synthetic Users case picker chrome — single fix to CasePicker / case-studies.ts handles all five pages.

What's at risk if forgotten: Live page renders with outdated metrics ("+15% NPS", "Eight-figure renewal", "16,000+ annual cases") that contradict the locked Tier 1 + Tier 2 deliverables. Tuesday Claude Design will work against contradictions in source vs. MD.

---

### REMINDER 8: 31% MTTR Reduction — Defensibility Framing

Status: ⏳ STANDING — applies whenever 31% MTTR is referenced

The 31% MTTR reduction is defensible-per-Matt with no source deliverable. Wipro PDF (March 2023) covers diagnostic phase only. The 31% comes from post-implementation telemetry Matt holds in institutional knowledge.

Locations to verify consistency:
- Wipro case study Section 05 hero metric ✓ (locked April 27)
- Wipro case study Brief field "Outcome" ✓ (locked April 27)
- Home Problem Ledger item #4 ✓ (updated April 27)
- Impact dashboard Wipro section (verify)
- Case Studies hub Wipro card (verify)

Interview-answer framing if asked about source:
"Internal Wipro tracking from the post-implementation period. The deliverables I retained cover the diagnostic phase — SPLUNK analysis, lockout economics, tier design recommendation. Post-implementation MTTR was tracked in ServiceNow telemetry that Wipro and ELC owned. I can speak to calculation method, but I don't have a deliverable to share."

Do NOT use "approximately 31%" or "around a third" anywhere — those weaken the claim. Number stands.

What's at risk if forgotten: Inconsistent framing across pages, or hedging language signaling reviewer the number isn't held with confidence.

---

## DESIGN NOTES — KEY ENTRIES IN /DESIGN-NOTES.md

(Cursor manages this file. Some entries listed below; refer to file for full inventory.)

### Cross-page — Case Study Templates
- **Mobile margin violation on boxed visual elements** — boxes bleed past viewport edge on mobile zoom-out. Apply max-width: 100% with explicit padding on bordered containers. Test 320/375/390/414px.
- **Left-edge text tension** — body copy and headlines sit too close to browser left edge on case study pages, mobile and desktop. Increase left padding/margin across all five case study templates.

### Synthetic Users
- **Visual interest insufficient** — leans entirely on EVIDENCE.LADDER table for visual structure. Needs: persona silhouettes built from thought-leader archetypes (Stickdorn, Young, Mollick, Maeda, Torres), vertical compositions for mobile, persona card sample (Teresa H.) anchoring visually not just textually.

### Centaur Practice
- **Three-record cluster requires static states with interaction prompts** (TAP / DRAG / SEE eyebrows)
- **Deployment Diff V2 screenshot pending** (see Reminder 1 above)

### About
- **Motorcycle metaphor + halftone photo treatment** — photos NEVER raw, halftone/duotone with single accent color (teal) over dark base
- **Card-rhythm fix** — vary treatment per section to avoid monotony
- **Photo asset folders:** `/site-content/_reference/about-page-assets/photos-original/`, `/diagrams-factory/`, `/photos-new/`

### Impact / Home
- **Home page responsiveness fix** (zoom levels, fluid layout)
- **EY map summary strip removal + right-column footer gap redesign**

---

## QA APPROACH (PATH C)

### Personas (5 total)
- **Marc S.** — service systems purist (Stickdorn-derived)
- **Indi Y.** — problem-space researcher (Young-derived)
- **Ethan M.** — AI pragmatist (Mollick-derived)
- **John M.** — metrics skeptic (Maeda-derived)
- **Teresa H.** — outcome enforcer (Torres-derived)

### Schedule
- **Sunday/Monday:** Lightweight spot-check QA after Tier 1 locked (Marc S. + John M. only, ~15 min/page)
- **Wednesday/Thursday next week:** Full QA all 5 personas after Claude Design pass

---

## EXECUTION ORDER — CLAUDE DESIGN TRIAGE

Realistic capacity reality check (April 27, 2026): 10 pages in one Tuesday is not feasible. Claude Design realistic capacity is 3-4 pages with full passes, plus polish on 2-3 more. Triaged into tiers.

### TIER A — Tuesday primary block (full Claude Design passes)

1. Home — first impression credibility, V2 screenshot dependency for Centaur Practice (Reminder 1)
2. Centaur Practice — V2 screenshot dependency, methodologically heaviest case study to design
3. Impact — highest visual complexity, multiple intrigue moves

Rationale: Home and Centaur are coupled by V2 dependency. Impact is most visually complex.

### TIER B — Tuesday secondary block (if capacity holds, otherwise Wednesday)

4. About — motorcycle metaphor exception, halftone photo treatment (asset format conversion needed first per Reminder 6)
5. Case Studies hub — index page build, intrigue Move 07

### TIER C — Wednesday-Thursday block

6. Synthetic Users — Pipeline section mobile compression, persona silhouette treatment (copy locked April 27)
7. Wipro — LOCKOUT.ECONOMICS mobile compression, Move 05 six-to-three towers collapse (copy locked April 27)
8. EY Healthcare — Move 04 spatial gap dimension rule, three-city map fix (copy pending Tuesday-Wednesday)
9. Autodesk — full case study build, fiche prototype already exists (copy pending Matt's source materials)
10. Signal → Story — focused JS task (mobile autoplay-on-scroll), not a full Claude Design pass

### SHIP DISCIPLINE

Acceptable: some pages ship with "good enough" Tuesday passes and get deeper iteration over the rest of the week. Portfolio doesn't have to be perfect Tuesday. Has to be coherent and signaling-correct.

Cross-page source fixes (Reminders 7 and 8) execute Monday/Tuesday morning regardless of Claude Design tier — they are Cursor edits, not Claude Design dependent.

---

## TIMELINE

- **Wednesday-Saturday last week:** Folder + reference files + 4 of 5 short pages locked
- **Sunday:** About locked, Home cross-page fixes applied, Centaur Practice locked
- **Monday (today):** Synthetic Users (in progress) → Wipro → EY → Autodesk (needs Q&A+deck), Tier 2 across all pages, briefs assembled, screenshots, lightweight spot-check QA
- **Tuesday 9am:** Claude Design execution
- **Wednesday-Thursday next week:** Full QA, integration, polish, V2 screenshot capture for Centaur Practice

---

## FOLDER STRUCTURE (all confirmed in project)

```
# Active deliverables (root)
/COPY-home.md, COPY-impact.md, COPY-about.md, COPY-signal-story.md
/COPY-case-studies-hub.md, COPY-case-autodesk.md, COPY-case-ai-build.md
/COPY-case-synthetic-users.md, COPY-case-wipro.md, COPY-case-ey.md
/DESIGN-NOTES.md
/PROJECT-CONTEXT-HANDOFF.md
/_briefs/                                    [TO BE CREATED — drafts pending]
  master-plan.md
  brief-impact.md
  brief-autodesk.md
  brief-case-studies-hub.md
  brief-centaur-practice.md
  brief-synthetic-users.md
  brief-about.md
  brief-home.md

# Reference materials (repo root /reference/)
/reference/visual-grammar.md
/reference/intrigue-moves.md
/reference/fiche-prototype-screenshots/      [7 files — desktop + mobile fiche prototypes]
/reference/current-state-screenshots/        [92 files — pre-Tuesday state, mobile + desktop]

# Page-specific assets
/site-content/_reference/about-page-assets/README.md
/site-content/_reference/about-page-assets/photos-original/   [11 files — mixed formats, see Reminder 6]
/site-content/_reference/about-page-assets/photos-new/        [empty — pending Matt's new photos]
/site-content/_reference/about-page-assets/diagrams-factory/  [3 BMW factory diagrams]

# Synthetic Users artifacts (wired April 27)
/site-content/_artifacts/synthetic-users/qa-report/index.html + README.md
/site-content/_artifacts/synthetic-users/design-critique/index.html + README.md
```

---

## HOW TO KICK OFF THE NEW CHAT

After uploading or pasting this brief, the first message should be:

> "Read this brief — it's the full context of where we are. We're mid-Synthetic-Users case study rewrite. Funnel numbers are locked (Reminder 2, CLOSED). Six-section structure is locked (see CURRENT MOMENT). Both artifacts (QA Report and Design Critique) are wired and smoke-tested. The next move is drafting Tier 1 + Tier 2 against the populated COPY-case-synthetic-users.md (pending Cursor populate command). Acknowledge you've read the brief, then ask whether the populated MD is in hand or whether the populate command still needs to run."

Or if Matt is jumping straight to a different task:

> "Read this brief — it's the full context of where we are. I want to skip Synthetic Users for now and work on [Wipro / EY / Autodesk / Tier 2 versions / etc.] instead. Acknowledge you've read the brief, then we'll start there."

---

## CRITICAL CONSTRAINTS THE NEW CLAUDE MUST RESPECT

1. **NEVER push motorcycle terms into Wipro, EY, Autodesk, or Synthetic Users.** Each case stays in its native register.
2. **NEVER reintroduce phrases from the cliché kill list.**
3. **NEVER reintroduce Takeda for Wipro** (Estée Lauder ONLY).
4. **NEVER reintroduce "10+ partners" for EY** (24+ partners).
5. **NEVER inflate Wipro renewal to eight figures** (CUT for being unsubstantiated).
6. **Always check tone:** Matt is calm, measured, considered. Aggressive or hyped language reads off. Service manual register, not sales copy.
7. **Tier 2 (mobile) target:** ~40-50% reduction from Tier 1. Mobile readers see less text, faster.
8. **Six-section structure is the discipline for case studies.** Don't drift back to 8-9 sections of exposition.
9. **Artifacts cluster together.** Don't intersperse exposition between visual artifacts within a case study.
10. **Eyebrow prompts on artifacts MUST signal interactivity** (TAP / DRAG / SEE) for mobile users.

---

End of handoff brief.
