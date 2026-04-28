# DESIGN BRIEF — HOME PAGE

**Page:** /
**Tier:** 1 + 2
**Tuesday execution order:** 1 of 7 (Tier A — Tuesday primary block)
**Last updated:** April 27, 2026
**Status:** DRAFT — pending Matt's lock before Tuesday 9am

---

## 01 · WHAT THIS PAGE IS

The portfolio's first impression. Seven seconds to establish: who Matt is, what he does, what level he operates at, and whether the work is real. The Home page does not need to explain — it needs to declare. Visitors who don't pass the first viewport never see the case studies.

Home also has a structural dependency: it is the v2 source for Centaur Practice's Deployment Diff service record. Whatever ships Tuesday becomes the post-design-review screenshot Centaur references as the "after" state. Home and Centaur Practice are coupled — if Home doesn't ship, Centaur doesn't ship.

---

## 02 · COPY SOURCE

- **Tier 1:** /COPY-home.md — locked (canonical Home copy file)
- **Tier 2:** Tier 2 sections in same file — pending (Tuesday afternoon work)
- **Do not rewrite copy.** Build to locked copy. If layout breaks, flag it — don't trim.
- **Cross-page correction landed Tuesday morning:** Problem Ledger — Solved item #4 was updated April 27 from "Cut MTTR by 31% across 16,000 annual cases" to "Cut MTTR by 31% — 13K annual lockouts eliminated." Tuesday morning source-fix command applies this to BOTH the live source AND COPY-home.md before Claude Design starts. Verify it landed in both.
- **Wipro card on Home:** Already shows "13k annual reduction in lockout cases" correctly. No change needed.
- **Case Studies preview section** is already in COPY-home.md as a populated section (3 featured cards: Centaur Practice, Synthetic Users, Autodesk). Tuesday adds a secondary 2-card row (Wipro + EY) — see Section 03 structure and Section 07 locked decisions.

---

## 03 · STRUCTURE

The Home page in order:

01 · HERO — headline + subhead + portrait scatter + role line + contact links above fold
02 · CLIENT TICKER — scrolling strip of client names (Estée Lauder, UGA Athletics, Humana, Citi, Travel Wisconsin, Molson Coors)
03 · LOGOS / PROOF STRIP — Autodesk · Wipro · EY · Discovery Communications · Stanford AI Certified
04 · PROBLEM LEDGER — diptych: Solved (left) | Want to solve (right), PAIRED rotation (see Section 07 for pairing logic), dimension rule between
05 · TRANSFORMATION DASHBOARD — three cards (Autodesk, Wipro, EY), all numbers tick up on scroll/hover
06 · STANFORD AI CREDENTIAL — dark-themed card, forward-looking signal
07 · CASE STUDIES PREVIEW — 3 featured cards (Centaur Practice large + Synthetic Users + Autodesk supporting) + secondary 2-up row (Wipro + EY) exposing all 5 case studies
08 · SIGNAL → STORY — film tile grid with hover/scroll preview behavior
09 · CONTACT CTA — "Let's talk." + email link

The Problem Ledger replaces what was previously called "Experience isn't one moment" or "brand thesis." Two columns, PAIRED items rotating in lockstep, the dimension rule between them reads "TRACK RECORD → INTENT."

The Case Studies Preview section sits between Stanford and Signal → Story — the reading order is: claim (Dashboard) → credential (Stanford) → evidence (Case Studies) → narrative (Signal → Story).

---

## 04 · VISUAL VOCABULARY

- **Site-wide grammar:** /reference/visual-grammar.md — apply with RESTRAINT on Home. Mono eyebrows yes. Dimension rule between Problem Ledger columns yes. Figure stamps where they earn placement (sparingly — not on every card). Do NOT apply heavy fiche treatment (extensive leader lines on every metric, full technical-illustrator artifacts, REV stamps everywhere, heavy callout chrome). Home is the synthesis page — restrained grammar reads as confident; over-applied grammar reads as costume. Home should feel coherent with the case studies but not like a case study itself.

- **Intrigue moves on this page:**
  - **Move 01 — Counter animation applies to ALL THREE Transformation Dashboard cards.** Every number in every card ticks up: Autodesk ($50M, 106%, +27%, 0→1→2), Wipro (31%, 30+, 13%+, 13K), EY (4.57M, 715, 40+, 24+). Counters animate from 0 with thin sweep arc. Counters fire STAGGERED on scroll-into-view, not simultaneous — visual cacophony if all 12 numbers fire at once.
  - **Move 06 — Signal → Story preview-only film tiles (NEVER audio, NEVER full video):** each tile shows a SILENT preview clip — first 2s of the film, video element with `muted` attribute set, no audio track ever fires. The full video only plays in a separate context (e.g., Signal → Story dedicated page or modal where audio is the user's deliberate choice). On Home tiles, audio is OFF by spec. Each tile gets fiche-style corner crop mark (⌐) animating into crosshairs on hover. First 2s of preview plays in frame on hover. Holds still on mouseout. **On mobile:** scroll-triggered autoplay of the silent preview, NOT tap/click.

- **ANIMATION DESIGNS ARE LOCKED. Tuesday Claude Design changes ONLY the cueing.**
  - **Mobile:** scroll-into-view trigger for all counter animations
  - **Desktop:** hover-invitation gesture must invite hover without requiring it. Pick: subtle pulse on card ingress, dimension marks fading in, leader lines drawing partially. Animation timing, motion paths, and easing curves stay as currently designed — only the *cue that invites the user to hover* is new.
  - **Both platforms:** counters fire staggered, not simultaneous

- **Dimension rule between Problem Ledger columns:** monospace label "TRACK RECORD → INTENT" centered on a horizontal tick-mark rule

- **Problem Ledger paired rotation:** see Section 07 for the locked pairing logic. Pairs advance synchronously — left and right items in the same pair animate together as a unit. Offset timing exists only between consecutive pairs (pair 01 advances → ~3-4s → pair 02 advances → etc.).

---

## 05 · REFERENCE ASSETS

- **Current state screenshots:** /reference/current-state-screenshots/ — Mobile Homepage 1.PNG through 8.PNG (8 mobile screens of pre-Tuesday state) plus desktop equivalents if present
- **Fiche prototype screenshots:** /reference/fiche-prototype-screenshots/ — Desktop 1-3 + Mobile 1-4 (general grammar reference). Reference these for grammar VOCABULARY, but do not transplant the heavy treatment (Home is restrained synthesis, not full fiche application)
- **Transformation Dashboard cards reference Impact page:** Tuesday Claude Design will also touch Impact (page 3 of 3 in Tier A). The three cards on Home (Autodesk, Wipro, EY) share metrics with Impact's per-engagement breakdowns. Numbers must align across both surfaces. Visual treatment: cards on Home are summary-density; Impact is breakdown-density. Same data, different visual weights.

---

## 06 · DESIGN NOTES THAT APPLY

From /DESIGN-NOTES.md, Home section:

- **Hero scatter** (teal pointillist portrait outline) — keep exactly as is
- **Mobile hero:** must end with role line + contact links visible without scroll
- **Logos / proof strip** directly under hero — no dead dark panel between
- **Problem Ledger pairs rotate SYNCHRONOUSLY:** left and right items in the same pair advance together. Offset timing exists only between consecutive pairs. Pairing logic is locked in Section 07.
- **Problem Ledger mobile:** pairs scroll vertically as a block — left + right items move together as the user scrolls. NOT click/tap to advance.
- **Hover pauses rotation** on desktop for reading
- **Pair rotation pacing:** slower than current state. Each pair holds long enough to read both items. Tuesday picks specifics, but err toward 5-7s per pair, not 3s.
- **Portrait integration:** halftone/engraved version between columns OR figure stamp in section corner labeled "M. STANGL · ENGINEER OF RECORD" — Tuesday decision
- **All three Transformation Dashboard cards (Autodesk, Wipro, EY) must be responsive to zoom/width changes**, revealing more or less copy progressively. Cards must scale proportionally with viewport. Current state is broken on Wipro and EY — copy gets cutoff at narrow widths or higher zoom levels. Hold copy refinements on all three cards until layout is fluid.
- **All three cards:** counters tick up for every number (per Section 04). Animation designs are locked; cueing changes per platform.
- **Tier chips on Autodesk card** (currently teal-outlined pills) read as interactive filters but aren't. Replace with plain text separated by · dots.
- **Stanford AI Credential** must restore as dark-themed card (was previously a light-mode break)
- **"in progress · est. May 2026"** treats forward-looking, not as weakness
- **Case Studies preview section:** 3 featured cards (Centaur Practice large + Synthetic Users + Autodesk) plus secondary 2-up row exposing Wipro and EY. Inherits Case Studies hub picker component for consistency. Featured 3 stay visually heavy; secondary row is compact teaser-only treatment.
- **Signal → Story film previews on mobile:** auto-play loop on scroll into view, NOT tap/click/touch. **Audio is ALWAYS off on Home tile previews** — these are SILENT preview clips (video element with `muted` attribute), never the full film with audio. The full audio version plays only in a dedicated context where the user explicitly chooses to listen.
- **Cross-page:** Home does not scale fluidly with browser zoom (current state). All cards must scale proportionally with viewport. Test 80%, 100%, 125% zoom.

---

## 07 · DECISIONS LOCKED

Do not relitigate Tuesday morning:

- **Title everywhere:** "CX, Product & Service Design Leader · Director / Senior Manager"
- **Hero H1:** "I turn fragmented experiences into flow-state customer value."
- **Hero subhead:** "For enterprises where the journey has splintered across operational silos."
- **Brand thesis section was REPLACED** with Problem Ledger (diptych Solved | Want to solve). Don't revert to old framing.
- **Problem Ledger items locked** in COPY-home.md — six items per column

**PROBLEM LEDGER PAIRING LOGIC — LOCKED:**

Pairs rotate synchronously. Each pair below advances together as one unit; offset timing exists only between consecutive pairs.

| Pair | Solved | Want to solve | Pairing logic |
|---|---|---|---|
| 01 | Turned Autodesk's post-purchase support into a $50M revenue motion | Service tiers designed around what customers actually value — not what we can charge for | Both about value design driving commercial outcomes |
| 02 | Unified Wipro's six ITIL towers into one operating model for Estée Lauder | Experience design as an operating model, not a team | Both reframe XD as structural, not org-chart |
| 03 | De-politicized vaccination engagement across Georgia — CDC national best practice | Stigmatized care treated as a clinical experience, not a moral one | Both about meeting humans where they are in healthcare |
| 04 | Cut MTTR by 31% — 13K annual lockouts eliminated | Friction between patients, providers, and insurers that nobody owns by design | Both about ownership of operational signal |
| 05 | Built a global CX practice from zero at an enterprise consultancy | Scaling healthcare access for populations the system was never built to serve | Both about building capacity that didn't exist |
| 06 | Made synthetic users a research method with documented QA pipeline | AI strategy that raises the ceiling of what teams can do, not just the floor | Both methodology beats — what AI/research enables |

- **Item #4 Solved** updated to "Cut MTTR by 31% — 13K annual lockouts eliminated" (matches Wipro case study lock — Tuesday morning source-fix command applies this to both live source and COPY-home.md)
- **Dimension rule label:** "TRACK RECORD → INTENT"
- **Tier chips on Autodesk card:** plain text with · separators, not pill UI
- **Stanford credential:** dark-themed card, forward-looking framing
- **Signal → Story mobile autoplay:** scroll-triggered, not tap-triggered. **Audio always off on Home tiles** — silent preview clips only, never full film with audio.
- **Dark theme everywhere** — no light-mode sections (Stanford card and "Experience isn't one moment" both broke this previously)

**TRANSFORMATION DASHBOARD — LOCKED:**
- All three cards (Autodesk, Wipro, EY) get counter animation on every number
- All three cards must be responsive to zoom/viewport (current state is broken on Wipro and EY)
- Animation designs are LOCKED — Tuesday changes only the cueing
  - Mobile cue: scroll-into-view trigger
  - Desktop cue: hover-invitation gesture (Tuesday picks specifics)
- Counters fire staggered, not simultaneous

**FICHE GRAMMAR APPLICATION — LOCKED LIGHT TOUCH:**
- Apply with restraint: mono eyebrows, dimension rule between Problem Ledger columns, figure stamps where they earn placement
- Do NOT apply heavy treatment (extensive leader lines, full technical-illustrator artifacts everywhere, REV stamps on every metric)
- Home is the synthesis page — should feel coherent with case studies but not like a case study itself

**CASE STUDIES PREVIEW SECTION — LOCKED:**
- Section sits between Stanford credential and Signal → Story
- Featured tier: 3 cards — Centaur Practice (large/featured), Synthetic Users (supporting), Autodesk (supporting). Copy locked in COPY-home.md.
- Secondary tier: 2-card row exposing Wipro and EY — compact teaser-only treatment, exposes all 5 case studies for parity with Case Studies hub's "Five builds" framing
- Wipro secondary card teaser: pull from /COPY-case-studies-hub.md Card 04 teaser — "Estée Lauder's service desk was taking 3,515 password-reset tickets a month. I led the transformation that made the towers one." (Note: Hub copy says "made the towers one" but Wipro case study lock uses "unified the experience across six towers" — for the Home preview teaser, use the locked Wipro dek: "I led the transformation that unified the experience across six towers.")
- EY secondary card teaser: pull from /COPY-case-studies-hub.md Card 05 teaser — "Say YES Summer: three cities, ten events, live art, music, and murals, and 715 vaccinations delivered where mass media couldn't land."
- Inherits Case Studies hub picker component for visual consistency
- "View all → /case-studies" CTA preserved per COPY-home.md

---

## 08 · DECISIONS OPEN (Tuesday session real-time)

You decide these during the session:

- **Portrait integration treatment:** halftone engraved version between Problem Ledger columns vs. figure stamp in section corner ("M. STANGL · ENGINEER OF RECORD"). Both are defensible. Pick during build.
- **Dashboard cards progressive reveal logic:** how much copy shows at narrow widths vs. wide widths for Autodesk, Wipro, AND EY cards. Each card's copy density needs a fluid reveal/hide breakpoint strategy. Hold copy refinements until the layout decision lands.
- **Logos / proof strip ordering and density:** which logos get prominence, how many fit, mobile collapse strategy
- **Pair rotation pacing:** how slow the pair-by-pair advance, how long hover-pause holds. Err toward 5-7s per pair (slower than current state).
- **Stanford credential placement:** standalone or grouped with 2-3 other credentials into a strip — DESIGN-NOTES.md flags both options
- **Counter animation stagger pattern:** which number fires first within each card, timing offset between cards as user scrolls past dashboard
- **Desktop hover-invitation cue specifics:** subtle pulse / dimension marks fading in / leader line drawing — pick what feels invitational without being demanding
- **Mobile sticky nav treatment:** drawer / bottom tab bar / floating pill (DESIGN-NOTES.md flags current truncation)
- **Case Studies preview secondary row layout:** 2-up at desktop / stack at mobile, vs. compressed inline at all widths — pick what reads as "5 total, here are 3 featured + 2 supporting" without making the secondary feel demoted

---

## 09 · CONSTRAINTS

- **Mobile target:** 390px viewport. Hero must end with role + contact links visible without scroll.
- **Desktop target:** 1280px+. Fluid card scaling at 80% / 100% / 125% zoom levels.
- **Cliché kill list compliance:** /PROJECT-CONTEXT-HANDOFF.md
  - No "Proof in flight" / "Measured at altitude"
  - No "Exit velocity"
  - No "Operator" except on Impact ID card
  - No aerospace metaphors
  - No "Plausible scenarios and edge cases"
  - "At the system level" — once max
  - "Journey-led operating models" — once max
- **Native register:** Home is the synthesis page. Voice is calm, declarative, considered. Not sales copy. Not a pitch deck. The work speaks; the voice frames.
- **31% MTTR defensibility framing** (Reminder 8): Problem Ledger item #4 references the Wipro 31% figure. Do not weaken to "approximately 31%" or "around a third." Number stands.
- **Accessibility heuristics** (global, from DESIGN-NOTES.md):
  - 44px minimum tap target
  - No text below 14px (mono labels can be 11px if uppercase + tracked)
  - Max 3 screens per section on mobile before visible break
  - No decorative element taller than 40vh on mobile
  - Every ornamental flourish earns its place once per screen

---

## 10 · WHAT GOOD LOOKS LIKE

Testable post-build outcomes:

- Hero on mobile (390px) ends with role line + contact links visible without scroll
- Logos / proof strip sits directly under hero with no dead dark panel
- Problem Ledger renders as two columns on desktop ≥1280px, stacks on mobile ≤414px
- **Problem Ledger pairs rotate synchronously** — left and right items in the same pair advance together; offset timing exists only between consecutive pairs
- All 6 pairings from Section 07 render correctly (Solved 01 ↔ Want 05, Solved 02 ↔ Want 04, etc. per the locked logic)
- Mobile pairs scroll vertically as a block, NOT click/tap to advance
- **All three Transformation Dashboard cards (Autodesk, Wipro, EY) have working counter animations on every number** — staggered firing, not simultaneous
- All three cards scale proportionally with viewport at 80%/100%/125% zoom — no copy cutoff at any tested width
- Mobile counters trigger on scroll-into-view; desktop counters have hover-invitation cue (pulse/dimension mark fade-in/leader line draw)
- Animation designs themselves are unchanged — only the cueing is new
- Tier chips on Autodesk card render as plain text with · separators (not pill UI)
- Stanford AI credential renders as dark-themed card (no light-mode break)
- **Case Studies preview section** renders with 3 featured cards + 2-card secondary row exposing all 5 case studies
- Case Studies preview inherits Case Studies hub picker component for visual consistency
- Signal → Story film tiles autoplay first 2s on mobile scroll into view (not on tap)
- **All Signal → Story tiles render with audio MUTED** — silent preview clips only, never full film with audio. Verify `muted` attribute on every video element in Signal → Story tiles.
- **Fiche grammar applied with restraint** — Home reads as synthesis page, NOT as case study. Mono eyebrows, dimension rule between Problem Ledger columns, sparing figure stamps. NO heavy fiche treatment (extensive leader lines on every metric, full technical-illustrator artifacts, REV stamps everywhere).
- Page passes a clean QA cycle against Marc S. (systems purist) and John M. (metrics skeptic) personas — both must accept the Problem Ledger as a credible track-record + intent statement and the Dashboard as instrumented, not asserted
- Page becomes the v2 source for Centaur Practice Deployment Diff screenshot (Thursday capture)
- No copy from cliché kill list appears
- Page reads top-to-bottom in under 60 seconds on desktop, under 45 on mobile

---

## 11 · CROSS-PAGE COUPLING — CENTAUR PRACTICE V2 DEPENDENCY

This page's Tuesday output becomes the v2 reference state for Centaur Practice's Deployment Diff service record (Service Record 02).

Sequence:
1. Tuesday: Home rebuilt with fiche grammar applied
2. Wednesday: Review and approve v2 state
3. Thursday: Capture v2 screenshot at 1280px desktop and 390px mobile
4. Thursday: Replace placeholder in Centaur Practice Deployment Diff
5. Centaur Practice ships live

What's at risk: If Home rebuild misses Tuesday, Centaur Practice cannot ship until next week. This is the single most consequential dependency in the build.
