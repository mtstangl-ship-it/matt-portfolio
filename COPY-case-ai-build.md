# Case Study Copy — Centaur Practice (Case 01)

Edit any field below. When you're done, tell me what changed and I'll apply it.

---

## PAGE METADATA
- Page: Centaur Practice (AI Build case study)
- Purpose: Document a working methodology for AI-assisted creative work using the Centaur (vs. Cyborg) framework — and prove it through the artifact (this portfolio)
- Primary audience: Hiring managers, design directors, and AI-curious peers who want to see specific human/AI division of labor — not "I used AI" claims
- Desired state after visit: Visitor leaves with a clear mental model of how I work with AI (Centaur, human in the saddle), and at least one quotable insight or framework

---

## NAVIGATION CONTEXT
- Comes from: Default redirect from /case-studies, homepage featured card, case picker
- Links to: Other cases via picker, Synthetic Users case (natural next read)
- Must feel distinct from: Generic "I used AI" portfolio claims. This case shows specific division of labor with concrete examples — not aspiration.

---

## PAGE STRUCTURE

Six sections, in order:

1. **Hero** (existing — keep)
2. **Build Telemetry** (existing — keep, 6-week timeline + 130/34/5 metrics)
3. **The Centaur Declaration** (was 03 · METHOD — moves up, becomes the editorial spine)
4. **Service Records** (consolidated visual moment — Design Review Terminal, Deployment Diff, Signal Telemetry)
5. **Service Bulletin** (was 05 · FAILURE MODE — compressed)
6. **Footer / handoff**

Cut from previous version: Section 01 BRIEF (three-paragraph "Position me as a leader" exposition), Section 02 TOOLCHAIN (four cards describing each tool), Section 04 CADENCE (week-by-week breakdown — redundant with Build Telemetry).

---

## Hero

**Tag**
```
CENTAUR PRACTICE · CASE 01 OF 05
```

**Headline**
```
I built this portfolio with AI, and kept the decisions human.
```

**Subhead**
```
Six weeks. Four tools. One lesson I'll use for the rest of my career: AI raises the floor. Taste raises the ceiling.
```

**Meta strip**
```
Role:      Design & build lead
Timeline:  Mar 6 — Apr 21, 2026
Stack:     Cursor (build) · Claude (think) · Claude Design (visualize) · Vercel (deploy)
Model:     Centaur — human in the saddle
```

### Tier 2 — Tight version
```
HEADLINE: (same — already tight)
SUBHEAD: Six weeks. Four tools. AI raises the floor. Taste raises the ceiling.
META STRIP: (drop tool descriptions on mobile, keep just tool names)
```

### Cut priority
1. Mobile: drop tool role descriptions in Stack line (Cursor · Claude · Claude Design · Vercel only)
2. Mobile: subhead drops "I'll use for the rest of my career"

### Design decision flags
- [ ] Stack line expanded to name each tool's role (build / think / visualize / deploy) — replaces what was Section 02 TOOLCHAIN
- [ ] On hover (desktop) or tap (mobile), each tool name could expand to a one-line description

---

## Build Telemetry (existing — keep as is)

**Section eyebrow**
```
BUILD.TELEMETRY · Mar 6 — Apr 21, 2026 · 6 weeks · commit log distilled
```

**Live indicator**
```
LIVE · week 7
```

**Week markers** (W1 through W6 + NOW)
```
W1: IA in Cursor, no design
W2: Tokens + grid stand up
W3: Hero scatter added
W4: Impact console ships
W5: Claude Design arrives
W6: Critique + case studies
NOW: Shipped · Apr 21
```

**Three metrics**
```
130 commits · TOTAL OVER 6 WEEKS
34 deploys · INSTANT PREVIEW EVERY PUSH
5 case studies · EACH WITH A HERO ARTIFACT
```

**Outcome statement** (under metrics)
```
A production-grade portfolio, two reusable workflows, and one clear boundary between AI generation and human judgment.
```

**Hero metric** (large)
```
6 wks · BRIEF TO SHIPPED
Five case studies · three interactive artifacts
```

### Tier 2 — Tight version
Tier 1 is already tight. Mobile compression is layout-only, not copy:
- Three metrics stack vertically at 390px (instead of horizontal row)
- Week markers compress to dots-with-tooltip (W1·W2·W3·W4·W5·W6·NOW), tap reveals full label
- Hero metric ("6 wks · BRIEF TO SHIPPED / Five case studies · three interactive artifacts") preserves at all widths
- LIVE indicator preserves at all widths

### Cut priority
1. Drop week label expansion at 390px — dots + tooltip carry the timeline
2. Drop "commit log distilled" qualifier on section eyebrow at 320px
3. Outcome statement under metrics can compress to: "Production-grade portfolio. Two reusable workflows. One clear AI-vs-human boundary."

### Design decision flags
- [ ] No copy changes needed at Tier 2 — compression is visual/layout only
- [ ] Section visually anchors the page; preserve at all widths

---

## The Centaur Declaration (was 03 · METHOD — moves up)

*This is the editorial spine of the case study. Names the framework, declares position, shows one concrete example of human/AI split.*

**Section eyebrow**
```
03 · METHOD · CENTAUR, NOT CYBORG
```

**Section headline**
```
Human in the saddle. Always.
```

**Framing paragraph**
```
Ethan Mollick's framework draws a line between **Centaurs** and **Cyborgs**. A Centaur divides tasks with AI and keeps steering. A Cyborg fuses with it completely.

I'm a Centaur. The structure of every page, the positioning decisions, the copy that sounds like me — those were mine. AI produced faster drafts, better variations, sharper critique than I could generate alone. The decisions were mine.
```

**The split, in practice** (one concrete example)
```
EYEBROW: AI GENERATED
"Matt Stangl is a strategic design leader who transforms complex enterprise challenges into measurable business outcomes through human-centered methodologies and systems thinking."

EYEBROW: I CHANGED IT TO
"I rebuild fragmented enterprise experience as one operating model that actually ships."

WHY (caption below): The AI version is a job description. Mine is a positioning statement. AI defaults to comprehensiveness; I default to specificity. That pattern repeated across every piece of copy on this site.
```

**The pivot moment** (one short paragraph, woven in)
```
The hardest version of this lesson came in week four. I let AI write three case study pages end to end. The output was fluent, professional, and completely generic — the same portfolio language on a hundred other sites. **I tore it down and rebuilt from what actually happened: the real pivots, the real numbers.** That version is what you're reading now.
```

### Tier 2 — Tight version
```
SECTION HEADLINE: (same)
FRAMING PARAGRAPH: Mollick distinguishes Centaurs (humans and AI dividing tasks) from Cyborgs (total integration). I'm a Centaur. AI generated. I decided.
THE SPLIT EXAMPLE: keep the AI Generated / I Changed It To comparison — drop the WHY caption on mobile
THE PIVOT: I let AI write three case study pages. The output was generic. I tore it down and rebuilt.
```

### Cut priority
1. Mobile: WHY caption can drop, comparison still does the work
2. Mobile: pivot paragraph can drop one sentence
3. The split example is the load-bearing artifact — never cut it

### Design decision flags
- [ ] AI Generated copy renders in mono with red-orange accent (revision callout style)
- [ ] I Changed It To copy renders in sans with teal accent (current state)
- [ ] WHY caption renders as a service-bulletin annotation below
- [ ] On desktop, the comparison could animate — AI version writes itself in mono, then strikes through, then the human version replaces it

---

## Service Records (consolidated visual moment)

*All three service records cluster together as the page's visual proof. No exposition between them. Each gets a one-line eyebrow that invites interaction. A service record is what a mechanic logs when work is done — what changed, who did it, when, and why.*

### Record 01 — Design Review Terminal

**Eyebrow** (invites interaction)
```
TAP TO FILTER · 13 FINDINGS · 4 CRITICAL · 3 REVERSALS
```

**Title**
```
Design Review Terminal
```

**Caption**
```
Two critique passes, thirteen findings, three reversals.
```

**Static state** (what visitors see before interaction)
- Terminal header: ~/critique · v2 · post-desktop · 13 findings
- Filter pills: ALL · 13 / CRITICAL · 4 / MAJOR · 7 / MINOR · 4 / REVERSED · 3
- First three findings visible (F·01, F·02, F·03)
- Footer: Runtime: 6 weeks · Passes: 2 · Self-authored
- CTA at bottom: OPEN FULL REVIEW LOG →

**Caption note** (below artifact)
```
Each finding is a real critique I made of my own work, with the decision and reversal logged. Reversals are when AI was right and I was wrong, or vice versa.
```

### Record 02 — Deployment Diff (Home Hero)

**Eyebrow** (invites interaction)
```
DRAG SLIDER · COMPARE V1 → V2 · TWO WEEKS APART
```

**Title**
```
Deployment Diff — Home Hero
```

**Caption**
```
Drag the handle · commit 4a3f2c → 9e1ab7 · two weeks apart
```

**Static state**
- v1 (commit 4a3f2c, Apr 08): pre-Claude-Design, original hero scatter
- v2 (commit 9e1ab7, Apr 21, post-review): fiche grammar applied
- Slider handle defaults to 50% so both versions visible
- Below: v1 findings (3) · v2 decisions (3)
- Caption: Drag handle · ← → arrow keys

**Caption note** (below artifact)
```
v1 was my best work without Claude Design. v2 is what happens when AI extends the design system rather than just executes the spec.
```

⚠️ **PENDING:** v2 screenshot does not yet exist. Sequence to complete this artifact:
1. Tuesday: Claude Design rebuilds home page hero with fiche grammar applied
2. Wednesday: Review and approve v2 state
3. Thursday: Capture v2 screenshot, replace placeholder in artifact

Until v2 exists, render a placeholder state with the message "v2 screenshot pending — post-design-review state."

### Record 03 — Signal Telemetry (Six-week build log)

**Eyebrow** (invites interaction)
```
TAP A WEEK · SEE WHAT SHIPPED · 6 WEEKS
```

**Title**
```
Signal Telemetry — Six-week build log
```

**Caption**
```
Click a week · see the state · hover for commits
```

**Static state**
- Timeline header: MAR 06 / MAR 13 / MAR 20 / MAR 27 / APR 03 / APR 10 / APR 21 · LIVE
- Week dots: WK 01 / WK 02 / WK 03 / WK 04 / WK 05 / WK 06 / LIVE
- Default selection: WK 01 (or LIVE)
- Below: visual state for selected week + caption + commits/deploys count

**Week states**
```
WK 01 · IA · NO DESIGN
"What pages, what hierarchy, what each section has to say."
Cursor as structural partner. No visual decisions yet. 4 prompts to a confirmed sitemap.
6 commits · 0 deploys

WK 02 · TOKENS + GRID
Dark theme. Teal accent. Monospace labels.
Token pass in Claude, implemented in Cursor. First time the site feels like itself.
14 commits · 3 deploys

WK 03 · HERO SCATTER ADDED
Particle bloom lands on the hero.
First moment the site has a strong first impression. Accident that became a decision.
19 commits · 5 deploys

WK 04 · IMPACT CONSOLE
The strongest page on the site ships.
Three tabs, three engagements, per-tier revenue attribution. Two days of focused build.
23 commits · 8 deploys

WK 05 · CLAUDE DESIGN ARRIVES
Apr 17. The tool I needed six weeks ago, six weeks later.
Cursor becomes the implementer. The double-diamond on About is designed here, shipped in a day.
18 commits · 6 deploys

WK 06 · CRITIQUE + CASE STUDIES
Two critique passes. Five case studies. One lesson.
The site looks done. The case studies make it true. This is week six.
25 commits · 7 deploys
```

### Tier 2 — Tight version
Three service records cluster on mobile in a single tap-through. Eyebrow prompts ("TAP" / "DRAG" / "TAP A WEEK") are critical for mobile usability — without them, users won't know to interact.

### Cut priority
1. Caption notes below each record can drop on mobile if density is heavy
2. Two of three records can be hidden on mobile (Signal Telemetry is the most informationally dense — could be desktop-only)
3. Records could collapse to expandable accordions on mobile

### Design decision flags
- [ ] Eyebrows on each record MUST signal interactivity (TAP / DRAG / SEE) — without these, mobile users don't know to interact
- [ ] Static states for each record must be self-explanatory even without interaction — if a user just scrolls past, they should still understand what the record is showing
- [ ] Three records in sequence creates visual rhythm — design break / negative space between each
- [ ] Deployment Diff (Record 02) requires v2 screenshot before going live — see PENDING note above

---

## Service Bulletin (was 05 · FAILURE MODE — compressed)

*Compressed from two long paragraphs + THE TELL callout to one paragraph + one callout. A service bulletin is what manufacturers issue when something needs a fix in the field — same intent, fiche-native register.*

**Section eyebrow**
```
05 · SERVICE BULLETIN · WHAT I GOT WRONG
```

**Section headline**
```
I skipped the brief twice. I paid for it twice.
```

**Body**
```
Once: I asked Cursor to "design the impact dashboard" without specifying hierarchy, metric priority, or interaction logic. The output was technically correct and visually incoherent — every element equally weighted because I hadn't said what mattered most. Two hours fixing what a 15-minute brief would have prevented.

Twice: the AI-written case studies covered earlier in this page. Same root cause. Same generic result. **The fix was never less AI. It was more specificity.**
```

**The Tell** (callout)
```
EYEBROW: THE TELL
The AI red flag is the ratio of *presentation quality to case-study depth*, not the AI use itself. Experienced reviewers catch it in 30 seconds.
```

### Tier 2 — Tight version
```
HEADLINE: (same)
BODY: I skipped the brief twice. Once when I asked Cursor to design without hierarchy. Once when I let AI write case studies end to end. Both times: more specificity, not less AI.
THE TELL: keep — short callout
```

### Cut priority
1. Mobile: compress body to single paragraph
2. THE TELL callout can drop on extreme density, but it's the strongest line in the section

### Design decision flags
- [ ] THE TELL renders with a faint red-orange accent (revision callout / warning stamp)
- [ ] Section uses warmer color treatment than rest of page — this is the moment of failure, signal it visually

---

## Footer / Handoff

**Eyebrow**
```
Handoff · the larger story
```

**Headline**
```
The work that made these decisions possible.
```

**CTA**
```
Open case studies → /case-studies/synthetic-users (next case)
```

**Footer**
```
Matt Stangl · CX, Product & Service Design Leader
Case Study · v2026.04
```

### Tier 2 — Tight version
Tier 1 fields preserve at all widths. Mobile compression is layout-only:
- Eyebrow + Headline stack normally
- CTA "Open case studies → /case-studies/synthetic-users (next case)" stays as primary
- Footer compresses to single line at 390px ("Matt Stangl · CX, P&S Design Leader · v2026.04")

### Cut priority
1. Drop "Handoff · the larger story" eyebrow at 320px — headline carries it
2. Drop "(next case)" qualifier from CTA at 390px — link target makes it obvious
3. Footer version line ("Case Study · v2026.04") drops on mobile

### Design decision flags
- [ ] CTA defaults to next case (Synthetic Users) but should also offer "Back to all case studies" link
- [ ] Handoff headline aligns with Impact closing register (both pages share "behind the numbers/decisions" pattern)

---

## CUT LIST FOR ENTIRE CASE
Sections that have been cut from the previous version:
- 01 · BRIEF (three-paragraph "Position me as a leader" exposition) — folded one sentence into hero subhead
- 02 · TOOLCHAIN (four cards describing each tool) — folded into expanded meta strip + Centaur Declaration
- 04 · CADENCE (week-by-week breakdown) — redundant with Build Telemetry timeline at top

Phrases to cut on sight in this case:
- "Position me as a design leader, not a practitioner" — was the old framing, drop entirely
- "Four tools, four lanes. No overlap." — was the old toolchain section header
- "Structure first. Tooling second. Craft last." — was the old cadence section header
- Three-paragraph exposition of why I built the portfolio — implicit now, not stated

---

## ACCURACY NOTES
Inaccuracies in current copy that must not return:
- "AI Workflow" panel/picker label — replaced everywhere with "Centaur Practice"
- The case study previously had 9 sections with heavy exposition between artifacts — restructured to 6 sections with service records clustered as a single visual moment
- Aerospace/mission language anywhere in this case study — none in revised version, none should return
- Section names use fiche/service-manual register: "Service Records" (was Three Artifacts), "Service Bulletin" (was Failure Mode). These are surgical motorcycle/fiche choices, not pervasive — every term used must carry meaning, not decoration.

Clichés to kill:
- "Strategic design leader who transforms complex enterprise challenges through human-centered methodologies and systems thinking" — this is the AI-generated example we're calling out, must not appear elsewhere
- "Position me as a design leader" — was old self-referential framing
- "Human-centered methodologies and systems thinking" — generic portfolio language

---

## CROSS-PAGE FIXES TRIGGERED BY THIS REVISION

These changes need to flow to other COPY files and DESIGN-NOTES.md:

1. **DESIGN-NOTES.md, AI BUILD / CENTAUR PRACTICE CASE STUDY section** — add Deployment Diff v2 screenshot pending entry. Sequence: Tuesday Claude Design rebuild → Wednesday review → Thursday capture v2 screenshot.

2. **DESIGN-NOTES.md, AI BUILD / CENTAUR PRACTICE CASE STUDY section** — add note about three-artifact cluster requiring static states with interaction prompts (TAP / DRAG / SEE eyebrows).

3. **All COPY files** — title is "CX, Product & Service Design Leader" everywhere it appears (footer, ID cards, signatures).

---

## ⚠️ PERSISTENT REMINDERS — DO NOT REMOVE UNTIL COMPLETE

These reminders appear at the bottom of the file and should stay there until each item is complete. Re-check this section every time the case study file is touched.

### Deployment Diff v2 screenshot — REQUIRED BEFORE GOING LIVE

**Status:** ⏳ PENDING

**What's needed:** A screenshot of the home page hero in its post-Claude-Design v2 state.

**Why it's pending:** Claude Design rebuilds the home page on Tuesday. The v2 state doesn't exist until then.

**Sequence to complete:**
1. ⬜ Tuesday: Claude Design rebuilds home page hero with fiche grammar applied
2. ⬜ Wednesday: Review and approve v2 state
3. ⬜ Thursday: Capture v2 screenshot at 1280px desktop and 390px mobile
4. ⬜ Thursday: Replace placeholder in Deployment Diff artifact (Service Record 02)
5. ⬜ Thursday: Verify the record renders correctly with v1 → v2 comparison
6. ⬜ Mark this reminder as ✅ COMPLETE and remove from file

**What's at risk if forgotten:** The Deployment Diff service record won't function. The case study can't ship live without v2.
