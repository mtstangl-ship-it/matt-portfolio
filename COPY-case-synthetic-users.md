<!-- TIER 1 + TIER 2 LOCKED — April 27, 2026 -->
<!-- Six-section structure. Run B integrated. Marc S. as sample persona. -->
<!-- DESIGN-NOTES.md compliance verified. -->
<!-- Run B count: 53 line-fixes / 8 sections. Confirmed from Critique.html. -->
<!-- Word weight: 972 Tier 1 / 337 Tier 2. Aligned with Centaur (912 Tier 1). -->
<!-- F·02 metric verified against PROJECT-CONTEXT-HANDOFF.md Impact locked details. -->
<!-- Marc S. persona card text confirmed from QA report and DESIGN-NOTES.md attribution. -->

# Case Study Copy — Synthetic Users (Case 02)

---

## PAGE METADATA

- **Page:** /case-studies/synthetic
- **Purpose:** Demonstrate synthetic users as a research method by documenting the methodology being run on the portfolio itself.
- **Primary audience:** Senior design leaders, hiring managers evaluating methodology rigor, peers skeptical of AI-augmented research claims.
- **Desired state after visit:** Reader concludes the method has inputs, outputs, and an audit trail — therefore it is research, not a feedback loop.

---

## NAVIGATION CONTEXT

- **Comes from:** Case picker (slot 02), homepage Problem Ledger (Solved column #6: "Made synthetic users a research method with documented QA pipeline"), Centaur Practice case study (methodological sibling)
- **Links to:** Case picker → Autodesk (methodology applied to enterprise transformation); Run A artifact (/case-studies/synthetic-users/qa-report); Run B artifact (/case-studies/synthetic-users/design-critique)
- **Must feel distinct from:** Centaur Practice (which shares structural pattern but argues a different point — Centaur is about AI as collaborator; Synthetic Users is about persona-driven QA as method)

---

## STRUCTURE — SIX SECTIONS

01 · HERO
02 · OUTCOME / FUNNEL
03 · EVIDENCE LADDER
04 · THE PIPELINE
05 · THREE FINDINGS
06 · THE LESSON

Visual rhythm on mobile: text → visual → visual → visual → visual → text

---

## 01 · HERO

### Tier 1

**Tag**
```
Simulation · Research · Case 02 of 05
```

**Headline**
```
Synthetic users as a research method.
```

**Dek**
```
Nine personas, four QA environments, three findings self-review missed. The methodology, documented by running it on this portfolio.
```

**Problem framing (folded in from former Section 01 · The Gap)**
```
Design artifacts fail in predictable ways — evaluated by the wrong audience at the wrong moment, with no structured way to stress-test before live exposure. Traditional usability testing requires recruited participants, often impossible for portfolios, internal tools, or pre-launch strategy work.
```

**Hypothesis callout**
```
HYPOTHESIS

Structured synthetic personas — modeled on practitioners with documented worldviews — can surface blind spots that self-review misses. Only if you build them the right way.
```
*(Italic emphasis on "Only if you build them the right way." preserved from live copy.)*

**Brief fields**
```
Method:              Persona-driven QA
Personas:            9 across 4 environments
Artifact under test: This portfolio · v3 pre-ship
Outcome:             10-item prioritized backlog · 3 shipped changes
```

### Tier 2 — Tight

**Tag**
```
Simulation · Research · Case 02
```

**Headline**
```
Synthetic users as a research method.
```

**Dek**
```
Nine personas. Four QA environments. Three findings self-review missed.
```

**Problem framing**
```
Design artifacts fail predictably — wrong audience, wrong moment, no stress-test before launch.
```

**Hypothesis**
```
Synthetic personas can surface blind spots. Only if you build them right.
```

**Brief fields**
```
9 personas · 4 envs · 3 shipped changes
```

### Cut priority
1. Problem framing (compresses to dek if needed)
2. Brief fields detail (compress to single line)
3. Tag suffix "of 05" (drop on 320px)

### Design decision flags
- [ ] Hypothesis callout: typographic treatment vs. boxed callout — Tuesday session
- [ ] Brief fields layout: 4-column grid (desktop) vs. 2-column (mobile) vs. inline (320px)

---

## 02 · OUTCOME / FUNNEL

### Tier 1

**Outcome statement**
```
Traceability from synthetic persona → specific design decision is what separates research from a feedback loop.
```

**Hero metric (preserved verbatim from live)**
```
3
Findings self-review missed
All three became shipped changes
```

**Funnel artifact**
```
RUN A · CONTENT & METHODOLOGY

9 personas × 4 environments
        ↓
18 findings surfaced
        ↓
10 prioritized as actionable
        ↓
3 self-review had missed
        ↓
3 became shipped changes


RUN B · DESIGN & SYSTEMS (companion run)

1 design-systems persona × full site audit
        ↓
53 line-level fixes across 8 sections
        ↓
Integrated into Run A's shipped change list
```
*(Visual: stair-step funnel on desktop horizontal, vertical stack on mobile. Run B is a parallel companion, not a fifth lane in Run A.)*

**Methodology framing line**
```
Three of ten actionable findings would not have been caught by self-review. That gap is the methodology argument.
```

### Tier 2 — Tight

**Outcome statement**
```
Synthetic persona → specific design decision = research, not feedback loop.
```

**Hero metric**
```
3 / Findings self-review missed / All three shipped
```

**Funnel artifact**
```
9×4 → 18 → 10 → 3 → 3
```
*(Single line on mobile. Run B as small footnote: "+ Run B · 53 line-fixes from design-system audit.")*

**Methodology framing**
```
3 of 10 actionable findings missed without the pipeline. That gap is the argument.
```

### Cut priority
1. Methodology framing line (it's implied by the funnel)
2. Run B companion (collapses to footnote on mobile)
3. Outcome statement (the funnel says it visually)

### Design decision flags
- [ ] Funnel composition: vertical stair-step (mobile) vs. horizontal flow (desktop)
- [ ] Run B companion treatment: small block beneath Run A vs. parallel column

---

## 03 · EVIDENCE LADDER

### Tier 1 — kept verbatim from live

**Band header**
```
EVIDENCE.LADDER
Where synthetic research replaces, augments, or fails real research
N=9 personas · 4 QA envs
```

**Column headers**
```
METHOD | DEV · structural | QA · content | UAT · audience | PROD · adversarial
```

**Row 1 · REAL USERS**
```
REAL USERS · Recruited practitioners · N=12 · 6 wk · $8k

DEV: IA clarity · HIGH · ground truth
QA: Copy resonance · SHIP · observational
UAT: Target-fit signal · SHIP · highest confidence
PROD: Edge stress · MID · access-limited
```

**Row 2 · SYNTHETIC**
```
SYNTHETIC · Persona-driven QA · N=9 · 2 hr · $0

DEV: Structural gaps · HIGH · replaces real
QA: Positioning drift · HIGH · replaces real
UAT: Audience targeting · MID · augments real
PROD: Adversarial review · SHIP · pre-flight stress
```

**Footer metrics**
```
3 decision types · Synthetic replaced real research
1 decision type  · Real research still required
$8K → $0         · Pre-flight cost · self-review baseline
```

### Tier 2 — Tight

Evidence Ladder structure preserved on mobile; collapses from 4-column grid (desktop) to vertical stack of two row-blocks (mobile). Confidence ladder marks render at smaller scale. Footer metrics stack vertically.

### Cut priority
1. Footer metrics (cut last — they're the punchline)
2. Cell labels could compress (e.g., "ground truth" → "GT") — last resort
3. Band header subhead (the visual structure carries the meaning)

### Design decision flags
- [ ] Confidence ladder marks (the four `<i></i>` nodes per cell): visual specification needed Tuesday
- [ ] Mobile collapse: 4-col grid → 2-row stack vs. 4-row stack
- [ ] Mobile margin violation fix per DESIGN-NOTES.md — apply max-width: 100% with explicit padding on bordered container

---

## 04 · THE PIPELINE

### Tier 1

**Stage label**
```
04 · Pipeline
```

**Subtitle**
```
Two synthetic runs, parallel methodologies.
```

**Lead paragraph**
```
The pipeline runs different persona classes against different artifacts. Run A stress-tests the work itself across four environments, each environment matched to a persona class with a defined critical frame. Run B audits the design system against a single domain-expert persona. Both runs feed the same prioritized backlog.
```

**RUN A · 9 personas × 4 environments**

```
DEV · Structural — Archetype users
Can any user find what they need in 60 seconds? IA integrity.

QA · Content — Thought-leader personas
Does the copy communicate leadership? Five practitioner worldviews stress-test method and metrics.

UAT · Audience — LinkedIn-modeled personas
Would the specific person I'm targeting respond? Pre-outreach sharpening.

PROD · Stress — Adversarial users
Does it survive a skeptical reviewer with 300 portfolios this month? Ship only if it does.
```

**Persona logic — sample card**
```
PERSONA CARD · SAMPLE

Marc S. — Systems Purist

Worldview anchor: Stickdorn-derived. Service systems thinking. Backstage architecture as the test of whether work is service design or product redesign with a service label.

First question: "Where's the backstage? Who delivers this internally, and what changed in their work to make it real?"

Pass criteria: At least one artifact per service-design engagement shows internal capability change — not just customer-facing model.

Failure mode: Sees a tier structure with no organizational change behind it and stops trusting the service-design framing.

Finding: FAIL on Autodesk — three-tier model legible from the front, backstage architecture invisible. Recommendation logged: service blueprint excerpt or org-behavior narrative required in Autodesk case study.
```

**Persona construction principle**
```
Each persona was built from a published worldview, not an invented archetype. For each: what would this person look for first, and what would make them stop reading?
```
*(Italic emphasis on "what would this person look for first, and what would make them stop reading?" preserved from live copy.)*

**RUN B · Design system audit (parallel run)**
```
Run B is a different methodology against the same portfolio. One persona — a design-system domain expert — auditing visual grammar, voice consistency, cadence, and cliché ledger across all pages, line by line. Not a stress test. A specification audit.

Output: structured BEFORE/AFTER recommendations across 8 sections of the site. Findings integrated into the Run A prioritized backlog where they overlap; held separately where they don't.
```

**Artifact links**
```
[OPEN · 9 PERSONAS / 4 ENVIRONMENTS / 18 FINDINGS]
FIG. 04-A · QA REPORT (Run A full audit trail)
→ /case-studies/synthetic-users/qa-report

[OPEN · LINE-BY-LINE / 53 FIXES / 8 SECTIONS]
FIG. 04-B · DESIGN CRITIQUE (Run B full audit trail)
→ /case-studies/synthetic-users/design-critique
```

### Tier 2 — Tight

**Stage label**
```
04 · Pipeline
```

**Lead**
```
Two runs. Run A: 9 personas × 4 environments. Run B: 1 design-system audit. Both feed one backlog.
```

**RUN A — four lanes, compressed**
```
DEV · Archetype — IA in 60 seconds
QA · Thought-leader — copy & method
UAT · LinkedIn-modeled — target fit
PROD · Adversarial — survives 300/month
```

**Persona card — Marc S.**
```
Marc S. · Systems Purist
Anchor: Stickdorn. Service systems.
Q: "Where's the backstage?"
Pass: Internal capability change visible.
Fail: FAIL on Autodesk — tier model without backstage.
```

**RUN B**
```
1 design-system persona × full site audit. Output: line-by-line BEFORE/AFTER, 8 sections.
```

**Artifact links** — same as Tier 1, full eyebrow + path

### Cut priority
1. Run B framing paragraph (artifact link carries meaning)
2. Persona construction principle (compresses to italicized one-liner)
3. Lead paragraph (replaceable by structure alone)

### Design decision flags
- [ ] Marc S. card placement: alongside four lanes vs. inside QA lane (it's a thought-leader persona)
- [ ] Run B treatment: vertical stack below Run A vs. fifth column right
- [ ] Artifact links: button-style affordance vs. inline link with figure stamp
- [ ] Persona silhouettes: illustrative vs. abstract treatment for the four lanes
- [ ] Section density check per DESIGN-NOTES.md: this section likely exceeds 3-screen mobile heuristic. Tuesday must add visible break between Run A and Run B, jump link, or restructure
- [ ] Five thought-leader archetype mapping confirmed: Marc S. (Stickdorn) / Indi Y. (Young) / Ethan M. (Mollick) / John M. (Maeda) / Teresa H. (Torres)

---
## 05 · THREE FINDINGS

### Tier 1

**Stage label**
```
05 · Findings
```

**Subtitle**
```
What self-review missed.
```

**F·01**
```
F·01 · PRESENTATION-TO-DEPTH RATIO

The ratio of presentation quality to case study depth reads as an AI-generation signal to experienced reviewers — not the AI use itself.

The fix wasn't less AI. It was more depth.

[BECAME SHIPPED CHANGE]
Centaur Practice case study expanded from stub to full Service Records cluster.
```

**F·02**
```
F·02 · METRIC CATEGORY MIXING

"$50M YOY AOV" and "15 services shipped" belong to different metric categories — outcome vs output. Their coexistence undermines the more defensible numbers.

A recruiter wouldn't notice. A hiring design leader will.

[BECAME SHIPPED CHANGE]
"15 services shipped" replaced with "Business plan renewal rate exceeded 75% goal in Q1 post-launch" — a behavior-change metric, not an activity count.
```

**F·03**
```
F·03 · META-IRONY

The Synthetic Users case study — the very methodology being documented here — had no methodology shown. Meta-irony surfaced only by running the session.

The fix: show the persona card, show the hypothesis, show the finding. Which is what this case study now does.

[BECAME SHIPPED CHANGE]
This page. Restructured from 3-section stub to six-section documented methodology with two artifact links.
```

**Run B caught (companion list)**
```
RUN B · SELECTED FIXES

— Hub title cliché resolved April 2026 — see **Hub-only copy** footnote below (inventory aligns `caseStudiesPage` with Selected work / Five builds subhead).
— Career arc voice: third person → first person ("Matt's work spans..." → "I started in creative...")
— Cliché ledger: 12 verdicts logged. "Outcomes that compound" KEEP. "Exit velocity" CUT.

See FIG. 04-B for full audit.
```

### Tier 2 — Tight

**Stage label**
```
05 · Findings
```

**F·01**
```
F·01 · Presentation-to-depth ratio
The signal is the ratio, not the AI use. Fix: more depth.
SHIPPED: Centaur Practice expanded.
```

**F·02**
```
F·02 · Metric category mixing
Outcome and output side-by-side undermines both. Hiring leaders notice.
SHIPPED: "15 shipped" → behavior-change metric.
```

**F·03**
```
F·03 · Meta-irony
Methodology case study showed no methodology. Surfaced only by running the session.
SHIPPED: This page.
```

**Run B caught**
```
H1 cliché. Voice mismatch. 12 cliché verdicts. See FIG. 04-B.
```

### Cut priority
1. Run B companion list (cuts to footnote with link)
2. F-card body lengths (compress to single sentence each)
3. Subtitle (the F·01/02/03 pattern carries meaning)

### Design decision flags
- [ ] F-card grammar: inherits Centaur Practice Service Records pattern (eyebrow / headline / body / outcome stamp). Apply pattern, don't redesign
- [ ] Move 03 application: type-in animation on first scroll? Single-fire, never looped
- [ ] Outcome stamp visual: distinct from body copy, mono kicker font

---

## 06 · THE LESSON

### Tier 1

**Stage label**
```
06 · Lesson
```

**Subtitle**
```
What I'd do differently.
```

**Lead headline**
```
Synthetic users cannot replace real ones. I under-invested in the ones I shipped.
```

**Body (preserved from live)**
```
They surface hypotheses the designer was already able to form — not unknown unknowns. The quality of a session is bounded by the quality of the persona model. In this session, adversarial personas were the most productive; archetypes surfaced less.
```

**Closing pull quote (preserved from live)**
```
The method is a pre-research sharpening tool. It doesn't replace observation. It makes observation more targeted when you get there.
```

### Tier 2 — Tight

**Stage label**
```
06 · Lesson
```

**Lead**
```
Synthetic users can't replace real ones. I under-invested in the ones I shipped.
```

**Body**
```
They surface hypotheses you could already form — not unknown unknowns. Adversarial personas earned their keep. Archetypes surfaced less.
```

**Pull quote**
```
A pre-research sharpening tool. Doesn't replace observation. Makes it more targeted.
```

### Cut priority
1. Body paragraph (lesson + pull quote do the work alone)
2. Subtitle (lesson section is self-evident)
3. Pull quote (the close — cut last)

### Design decision flags
- [ ] Pull quote: typographic treatment vs. box treatment
- [ ] Section closes the page — no footer artifact, just CaseShell prev/next

---

## CUT LIST FOR ENTIRE CASE

Sections that can drop entirely if layout demands:
- Run B companion list (Section 05) — collapses to "see FIG. 04-B" footnote
- Methodology framing line (Section 02) — funnel carries the argument visually
- Persona construction principle (Section 04) — compresses to italicized inline

Phrases to cut on sight in this case:
- "human-centered methodologies and systems thinking" (cliché kill list)
- "plausible scenarios and edge cases" (lifted from AI marketing copy)
- "exit velocity" (startup vernacular in research context)
- "proof in flight" / "measured at altitude" (aerospace metaphor — explicitly kill list)
- "operator" (kill list — only allowed on Impact ID card)
- "live briefing" / "mission profile" (mission control metaphor)
- T-minus timestamps anywhere

---

## ACCURACY NOTES

Inaccuracies in current copy that must not return:
- The page is NOT a stub. It is a documented methodology with audit trail
- Methodology runs 9 personas, not 5 (the 5 thought-leader personas are one of four populations within Run A)
- Run B (Claude Design critique) is part of the methodology, not separate from it
- Funnel: 9×4 → 18 → 10 → 3 → 3. Headline is "3 of 10 actionable," not "3 findings total"

Clichés to kill:
- See full kill list in /PROJECT-CONTEXT-HANDOFF.md
- Page-specific watch: "synthetic" is not a marketing term here. It is a methodology classifier. Don't let it drift into AI-marketing register

---

## DESIGN NOTES THAT TRAVEL WITH THIS COPY

For Tuesday Claude Design — repeating from /DESIGN-NOTES.md to ensure visibility on this page:

### Cross-page (apply throughout)
- Mobile margin violation on boxed elements — apply max-width: 100% with explicit padding on bordered containers (Evidence Ladder is named explicitly in DESIGN-NOTES.md)
- Left-edge text tension — increase left padding/margin on case study templates, mobile and desktop

### Synthetic Users specific
- Persona silhouettes built from thought-leader archetypes (Stickdorn / Young / Mollick / Maeda / Torres) — visual interest with conceptual payoff
- Vertical compositions for mobile (current visuals are horizontal table-driven)
- Sample persona card (Marc S. — replacing live Teresa H.) anchors visually, not just textually

### Accessibility heuristics (global, from DESIGN-NOTES.md)
- 44px minimum tap target on all interactive elements (artifact links, F-cards if tappable)
- No text below 14px (mono labels can be 11px if uppercase + tracked)
- Max 3 screens per section on mobile before visible break or jump link — Section 04 likely exceeds this, see flag
- No decorative element taller than 40vh on mobile
- Every ornamental flourish earns its place once per screen

### Artifact affordances
- Two artifact affordances at end of Section 04 — eyebrow text signals interactivity ("OPEN · 9 PERSONAS / 4 ENVIRONMENTS / 18 FINDINGS" / "OPEN · LINE-BY-LINE / 8 SECTIONS")
- Run B Section 04 lane: parallel methodology, not sequential phase
- Section 05 F-cards inherit Centaur Practice Service Records grammar — apply, don't redesign
- Artifact top bar (~48px, dark, mono kicker, single bottom border) — research appendix register, not site page header

---

## SOURCE FOOTNOTES

### Case studies hub copy only in source file (`src/content/case-studies.ts`, `caseStudiesPage` — not rendered on `/case-studies/synthetic` by `CaseShell`; hub/route inventory)

```
eyebrow: (none — no eyebrow on hub)
title: Selected work.
subhead: Five builds. The systems behind the outcomes, and the decisions that shaped each.
```

*(Updated 2026-04-28 to reflect post-source-fix hub state. Live `src/content/case-studies.ts` may still contain old aerospace-cliché copy — flagged for separate cleanup.)*

---

## ORPHANED LIVE COPY — preserved for reference, not for new build

[Original case chrome and case picker copy preserved in handoff notes — managed by CaseShell.tsx and case-studies.ts, not edited from this MD]

---

## OPEN ITEMS — RESOLVED AT LOCK

1. ✅ Run B exact line-fix count — **53 line-fixes across 8 sections** (confirmed from Critique.html: 37 standard + 9 notes + 7 cuts = 53 BEFORE/AFTER rows)
2. ✅ Marc S. sample persona card text — confirmed: voice, structure, and Stickdorn attribution match QA report and DESIGN-NOTES.md
3. ✅ F·02 metric reference — verified against PROJECT-CONTEXT-HANDOFF.md Impact locked details ("Replaced '15 services shipped' with 'Business plan renewal rate exceeded 75% goal in Q1 post-launch'")
4. ⏳ Section 04 mobile density — flagged for Tuesday Claude Design as layout problem (jump link, sub-section break, or content reduction). NOT a copy issue; do not address through copy revision.

---

End of Tier 1 + Tier 2 lock.
