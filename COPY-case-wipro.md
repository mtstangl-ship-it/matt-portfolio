<!-- TIER 1 + TIER 2 LOCKED — April 27, 2026 — confirmed by Matt -->
<!-- Six-section structure. Pivot folded into Brief. Lockout workflow as demonstrated example -->
<!-- of broader six-towers operating-model unification. -->
<!-- Hero dek scope: experience unified across six towers (NOT org-chart consolidation) -->
<!-- Cross-page corrections integrated: -->
<!--   - "Eight-figure renewal" CUT (not substantiated) -->
<!--   - "+15% NPS" → "+13% NPS" (locked correction) -->
<!--   - "16,000+ annual cases" CUT everywhere; hero leads with 31% MTTR -->
<!--   - 13K annual lockouts reduction added to outcome strip -->
<!-- Source verification: ELC_Lockout_Analysis_for_03232023.pdf (Wipro Exceed Team, March 2023) -->
<!-- 31% MTTR reduction: defensible per Matt; no source deliverable available -->
<!-- Word weight: ~960 Tier 1 user-facing words. Aligned with Centaur (912) and Synthetic (972). -->
<!-- 9 cross-page source fixes queued; see CROSS-PAGE FIXES NEEDED IN SOURCE BEFORE TUESDAY -->

# Case Study Copy — Wipro / Estée Lauder (Case 04)

---

## PAGE METADATA

- **Page:** /case-studies/wipro
- **Purpose:** Demonstrate enterprise CX/EX transformation: a six-tower operating model unified through structural redesign, with the lockout workflow as the load-bearing demonstrated example.
- **Primary audience:** Senior design and operations leaders evaluating enterprise transformation work, hiring managers assessing service-design rigor, peers familiar with ITIL operations and skeptical of "transformation" claims that don't ship.
- **Desired state after visit:** Reader concludes Matt diagnosed a structural systems problem, designed and implemented a workflow that proved the diagnosis at scale, and unified the experience of six towers without conflating workflow ownership with org-chart consolidation.

---

## NAVIGATION CONTEXT

- **Comes from:** Case picker (slot 04), homepage Problem Ledger (Solved column #2: "Unified Wipro's six ITIL towers into one operating model for Estée Lauder")
- **Links to:** Case picker → Autodesk (enterprise transformation continuity); previous case Autodesk; next case EY Healthcare
- **Must feel distinct from:** Autodesk (which is product/service tier design at one company); Centaur Practice (which is methodology/AI). Wipro is operations-native: ITIL, SPLUNK, MTTR, ServiceNow, ticket flow. The voice is operational, not strategic.

---

## STRUCTURE — SIX SECTIONS

01 · BRIEF (absorbs pivot — was 01 + 02 in live)
02 · DIAGNOSIS
03 · CASE FLOW
04 · DESIGN
05 · DELTA
06 · LESSON

Visual rhythm on mobile: text → visual → visual → visual → visual → text

---

## 01 · BRIEF

### Tier 1

**Tag**
```
Operations · ITIL Transformation · Estée Lauder Companies · Case 04 of 05
```
*(Note: live HTML missing space between "Companies" and "·" — fix in source.)*

**Headline**
```
Password lockouts were the symptom. Six towers were the disease.
```

**Dek**
```
Estée Lauder's service desk was taking 3,515 password-reset tickets a month — and escalating 42.6% of them. I led the transformation that unified the experience across six towers.
```

**Brief fields**
```
Client:   Wipro Digital · Estée Lauder Companies (ELC)
Role:     CX & EX transformation lead
Scope:    6 ITIL towers · 3 unified tiers · ~40K employees
Outcome:  31% MTTR reduction · 13K annual lockouts eliminated · 13%+ NPS over goal
```

**Body — what I walked into (folded from live Section 01)**
```
Wipro Digital recruited me to build their Experience Design practice and lead CX/EX transformation for Estée Lauder Companies — a ~40,000-employee global enterprise running its IT service delivery through six discrete ITIL towers.

The brief was SME enablement: equip practitioners within each tower with better CX practices. What I found inside: six towers operating as six companies. No shared success metrics. No common escalation logic. Customer experience managed as a function of IT delivery rather than as a strategic design problem.
```

**Body — the pivot (folded from live Section 02)**
```
The towers weren't failing at execution. They were failing at integration. An ELC employee didn't experience six towers. They experienced one company. And that company was incoherent.

We pivoted from SME enablement to programmatic redesign: instead of training within existing structures, redesigning the structures themselves. The lockout workflow became the tip of the spear — a high-volume, high-visibility process that proved the towers' incoherence could be measured in hours of lost productivity.
```

**Callout — what that cost** (preserved from live)
```
WHAT THAT COST

The pivot cost weeks. I should have run a structural diagnostic before proposing the enablement model. Six towers operating independently is a systems problem — not a skills problem. The lesson carries forward: model organizational capacity before designing against it.
```

### Tier 2 — Tight

**Tag**
```
Operations · ITIL Transformation · Estée Lauder · Case 04
```

**Headline**
```
Password lockouts were the symptom. Six towers were the disease.
```

**Dek**
```
Estée Lauder's service desk: 3,515 password-reset tickets a month, 42.6% escalated. I led the transformation that unified the experience across six towers.
```

**Brief fields**
```
6 towers · 3 tiers · ~40K employees · 31% MTTR reduction
```

**Body — compressed brief**
```
Wipro recruited me to lead CX/EX transformation for Estée Lauder — ~40K employees, six ITIL towers operating as six companies. No shared metrics. No common escalation logic.
```

**Body — compressed pivot**
```
The brief was SME enablement. The work was structural. We pivoted from training within the towers to redesigning how they fit together — with the lockout workflow as the wedge.
```

**Callout — compressed**
```
WHAT THAT COST: Weeks of proving the enablement model wrong. Lesson: model organizational capacity before designing against it.
```

### Cut priority
1. Pivot body paragraph 2 (compresses to one sentence)
2. "What that cost" callout (cuts to footnote)
3. Tag suffix "of 05" (drops on 320px)

### Design decision flags
- [ ] Brief fields layout: 4-column grid (desktop) vs. 2x2 (mobile) vs. inline (320px)
- [ ] "What that cost" callout treatment: warm color accent (warning stamp register, distinct from teal accents elsewhere)
- [ ] Section absorbs former Section 02 — visual treatment must signal the pivot moment without requiring a new section break (sub-heading? rule line? margin shift?)

---

## 02 · DIAGNOSIS

### Tier 1

**Stage label**
```
02 · Diagnosis
WHERE LOCKOUTS ACTUALLY CAME FROM
```

**Headline**
```
3,515 tickets a month. Nobody could say where they originated.
```

**Body — preserved verbatim from live**
```
The Service Desk was resolving ~2,000 password reset/lockout INCs a month — most of them AD-related, routed by heuristic. But 42.6% escalated, and when they did, resolution took 4× longer. The escalation tax was the business.

Our CAS team built a SPLUNK query correlating AD lockout events with source host, caller computer name, and failure signature. The result was the first time lockouts had a geography. And the geography said something nobody had said out loud: 43% of lockouts were browser-cached passwords — users who changed their AD password but didn't update the saved credential in Chrome, Edge, or an enterprise app. A classical routing system couldn't see that. It saw "AD lockout" and fired the same playbook every time.
```

**Callout — the shift** (preserved verbatim)
```
THE SHIFT

Lockouts moved from volume problem to be deflected to signal to be listened to. The 50+ repeat users surfaced by SPLUNK each month weren't bad-actor employees. They were the canaries for process gaps elsewhere — cached passwords in unmanaged apps, devices with stale policy, onboarding handoffs where credentials were distributed across four systems and three emails.
```

**LOCKOUT.ECONOMICS hero band** (preserved verbatim from live — load-bearing artifact)

**Header**
```
LOCKOUT.ECONOMICS
Password reset & lockout INCs · 90-day SPLUNK analysis · ELC Service Desk
SOURCE · SPLUNK + ServiceNow
```

**Stage 1 · volume**
```
3,515
Password reset & lockout INCs
per month · Service Desk intake
100% INCOMING
```

**Stage 2 · leak**
```
42.6%
Escalated beyond Service Desk
~1,498 INCs leaking to higher tiers
ESCALATED

WHY THEY ESCALATED
— SD agents could not localize complex lockouts
— No cross-tool telemetry — AD, Cisco ISE, endpoint all separate
— Inaccurate routing · repeated customer restarts
```

**Stage 3 · cost**
```
4×
Time-to-resolve when escalated
vs. cases closed at the Service Desk

ROOT CAUSE · 43%
Lockouts traced to browser-cached passwords, not AD policy and not user error in the usual sense. Invisible to legacy routing.
```

**Stage 4 · intervention**
```
10%
Reduction target
Redesign + SPLUNK-driven routing

$62K   Annual SD cost · saved
2,283 hrs   Employee lost time · reclaimed / yr
15K+ hrs   Resolver-group time · potential saved
```

**The diagnostic that unlocked it** (preserved verbatim)
```
THE DIAGNOSTIC THAT UNLOCKED IT

A single SPLUNK query — written by Wipro's CAS team, surfaced to 10 of 80+ SD agents — correlated AD lockout events (EventCode 4740) with source host, caller, and signature. Before: lockouts were anonymous. After: every lockout had a traceable origin — device, browser, session, repeat-offender pattern. You can't redesign what you can't see.

source=WinEventLog:Security EventCode=4740 · dedup _time user EventCode · coalesce(Caller_Computer_Name, host) · eval signature=COALESCE(signature, failure_reason)
```

**Footer metrics**
```
35%   Lockouts handled by phone · pre-redesign
50+ · 200+   Repeat users · INCs · reviewed via SPLUNK
10 / 80+   Agents with SPLUNK access · day-one gap
```

### Tier 2 — Tight

**Stage label**
```
02 · Diagnosis
```

**Headline**
```
3,515 tickets a month. Nobody could say where they originated.
```

**Body — compressed**
```
~2,000 password/lockout INCs a month — most AD-related, routed by heuristic. But 42.6% escalated, taking 4× longer to resolve. The escalation tax was the business.

A SPLUNK query correlated AD events with source host and signature. Lockouts had a geography. 43% were browser-cached passwords — invisible to classical routing.
```

**The shift** (preserved)
```
Lockouts moved from volume problem to be deflected to signal to be listened to.
```

**LOCKOUT.ECONOMICS** (mobile-compressed structure preserved; see design flags)

### Cut priority
1. Footer metrics (35% / 50+·200+ / 10/80+ stack to footnote on 320px)
2. "The shift" callout body paragraph (callout headline + first sentence carry meaning)
3. Stage 4 intervention sub-metrics ($62K / 2,283 hrs / 15K+ hrs) — keep top-level "10% reduction target," compress sub-list

### Design decision flags
- [ ] LOCKOUT.ECONOMICS mobile compression — current state is 5+ screens on 390px; per DESIGN-NOTES.md 3-screen heuristic, this exceeds budget. Tuesday must apply: horizontal scroll-snap, 2x2 grouping, or stage-pair compression
- [ ] Stage 1-4 confidence ladder color encoding (white → red → amber → green) preserve on mobile
- [ ] SPLUNK code block: monospace, dashed border, single line on desktop, scroll on mobile
- [ ] "Geography" line (preserved verbatim) is the section's strongest moment — visual treatment should mark it (rule line above, accent below, or callout register)
- [ ] Section 03 dense paragraph break — current state has 17 lines of body before "THE SHIFT" callout on mobile; consider sub-paragraph break or pull-quote treatment

---
## 03 · CASE FLOW

### Tier 1

**Stage label**
```
03 · Case Flow
BEFORE & AFTER · ONE TICKET
```

**Headline**
```
One ticket. Two models. Same Monday morning.
```
*(Tightened from live "Follow one lockout ticket through both models" — sharper, declarative register matches Centaur and Synthetic siblings.)*

**Body — preserved from live, lightly tightened**
```
This is the same employee, same problem, same Monday morning. Before: they restart the story at every handoff. After: the context travels with the case and the Service Desk closes it before coffee gets cold.
```

**Case Flow diagram** (preserved verbatim from live — second-strongest artifact on the site)

**BEFORE · legacy lane**
```
BEFORE · legacy
Context lost at every handoff
6 towers · manual routing · customer restarts

09:12 · Claudia · Can't sign in. Calls Service Desk.
09:18 · SD Agent · T1 · AD lockout assumed. Resets password. Hangs up.
10:47 · Claudia · Locked out again. Different agent. Restarts the story.
11:02 · SD Agent · T1 · Routes to AD Engineering — suspected policy issue.
Day 2 · AD Tower · No AD issue. Bounces to Endpoint. No context payload.
Day 3 · Endpoint Tower · Requests Claudia's asset ID. Third restart.
Day 5 · Network Tower · Routed again. Cisco ISE logs requested.
Day 6.8 · Resolved · Root cause: browser-cached password. Nobody writes that down.

Totals: 6.8d MTTR · 4 tower handoffs · 3 customer restarts
```

**Divider**
```
vs.
SAME TICKET
NEW MODEL
```

**AFTER · redesigned lane**
```
AFTER · redesigned
Context travels with the case
3 tiers · SPLUNK-aware routing · structured intake

09:12 · Claudia · Can't sign in. Opens intake via self-service.
09:12 · Intake · SPLUNK · Correlates AD event 4740 + source host + signature. Flags browser-cache pattern.
09:17 · SD Agent · T1 · Ticket opens with full payload: user, host, signature, 2 prior lockouts. Agent runs the browser-cache playbook.
09:34 · Resolved · T1 · Cleared Chrome credential cache. Guided re-auth. Closed at Service Desk.
09:34 · Feedback loop · Resolution pattern logged. If the same signature fires 3× for a user, it routes direct-to-playbook next time.

Totals: 22min MTTR · 0 tower handoffs · 0 customer restarts
```

### Tier 2 — Tight

**Stage label**
```
03 · Case Flow
```

**Headline**
```
One ticket. Two models. Same Monday morning.
```

**Body — compressed**
```
Same employee, same problem, same Monday morning. Before: restart the story at every handoff. After: context travels with the case.
```

**Case flow** — preserve full timeline structure on mobile (vertical stack, BEFORE then AFTER); see design flags

### Cut priority
1. Body paragraph (the visual carries the meaning)
2. Lane sub-headers ("6 towers · manual routing · customer restarts" / "3 tiers · SPLUNK-aware routing · structured intake") — last to cut
3. Compressing timeline steps would lose the cause-and-effect; keep all steps

### Design decision flags
- [ ] Mobile: BEFORE and AFTER lanes stack vertically (already working in live, see image 14, 15); preserve
- [ ] Right-column text wrapping in timeline steps (image 14) gets tight on mobile — review font size / column ratio
- [ ] "vs. SAME TICKET NEW MODEL" divider treatment — preserve as visual hinge between lanes
- [ ] Color encoding: BEFORE lane red dots / AFTER lane teal dots — preserve, this is the only color signaling on the artifact
- [ ] Totals row: BEFORE (6.8d / 4 / 3) and AFTER (22min / 0 / 0) — current treatment understates the dramatic shift; consider visual emphasis on the AFTER zeros

---

## 04 · DESIGN

### Tier 1

**Stage label**
```
04 · Design
SIX TOWERS, THREE TIERS
```

**Headline**
```
Ops said three tiers was the ceiling. They were right.
```

**Body — preserved verbatim from live**
```
My first design was four tiers. Operations pushed back — given current staffing, they'd be stuck running two of them understaffed. We rebuilt around three. It performed better because every team could actually own their lane without ambiguity.
```

**Tier ladder**
```
T01 · Triage & resolve · <4h target
Structured intake with SPLUNK-driven payload. 72% of cases close here. Browser-cache playbook lives here.

T02 · Specialist engage · <2d target
Domain engineers pick up a full context payload. No customer restart. Signature + source host + prior history attached.

T03 · Product & engineering · <5d target
Reserved for defects and architectural fixes. Repeat signatures trigger here, feed roadmap directly.
```

### Tier 2 — Tight

**Stage label**
```
04 · Design
```

**Headline**
```
Ops said three tiers was the ceiling. They were right.
```

**Body — compressed**
```
First design was four tiers. Ops pushed back — current staffing meant two would run understaffed. We rebuilt around three. Every team could own their lane.
```

**Tier ladder** — compressed
```
T01 · Triage & resolve · <4h · 72% close here
T02 · Specialist engage · <2d · full context payload
T03 · Product & engineering · <5d · defects, repeat signatures
```

### Cut priority
1. Tier ladder body descriptions (compress to single line per tier)
2. Body paragraph (lesson carries from headline alone)
3. Tier targets are last to cut — they're the contractual claim

### Design decision flags
- [ ] Six-to-three towers collapse animation (Move 05 from intrigue-moves.md) — does NOT yet exist in live page; Tuesday Claude Design must build this. Six labeled columns redraw into three tiers on scroll, with projection lines from old to new. Stamp: REV. 02 · REDRAWN
- [ ] Tier ladder breathing/exploded-assembly treatment (similar pattern to Move 02 for Autodesk) — current ladder is static, could earn motion
- [ ] Targets (<4h / <2d / <5d) treatment: currently teal accent text on the right; preserve, they're the operational contract
- [ ] T01 "72% close here" is a claim that earns visual weight — pull-quote or stat callout?

---

## 05 · DELTA

### Tier 1

**Stage label**
```
05 · Delta
BEFORE / AFTER · ALL CASES
```

**Headline**
```
Context traveled with the case.
```

**Before · legacy handoff**
```
6.8 days
Cases bounced across towers. Context rewritten at each handoff. Customer restarted the conversation.
```

**After · redesigned tiers**
```
4.7 days
Structured intake. Context payload per handoff. Resolution at the lowest capable tier, enforced in ServiceNow.
```

**Outcome statement**
```
One operating model, owned in ServiceNow. The password-lockout problem didn't get solved — it stopped being a routing problem and became a signal.
```

**Hero metric**
```
31%
MTTR reduction · process behavior change, not throughput
```

**Outcome strip**
```
+13%NPS over goal
30+    Operational outcomes shipped
3      Escalation tiers (from 6)
72%    Cases resolved at T1
13K Annual lockouts eliminated
```

### Tier 2 — Tight

**Stage label**
```
05 · Delta
```

**Headline**
```
Context traveled with the case.
```

**Before / After**
```
6.8 days → 4.7 days
Towers bouncing the customer · vs · context payload per handoff
```

**Outcome statement**
```
One operating model, owned in ServiceNow. Lockouts stopped being a routing problem and became a signal.
```

**Hero metric**
```
31% MTTR reduction · process behavior change, not throughput
```

**Outcome strip**
```
+13% NPS · 30+ outcomes shipped · 3 tiers from 6 · 72% T1 close · 13K annual lockouts cut
```

### Cut priority
1. Before/After body lines (the metric carries it)
2. Outcome strip line items (5 metrics → 3 most defensible: 31% MTTR, +13% NPS, 13K annual lockouts)
3. "Process behavior change, not throughput" qualifier — cut last, it's the methodological signal

### Design decision flags
- [ ] Hero metric "31%" treatment: large numeric, teal accent, mono unit line below (current treatment in live works; preserve)
- [ ] Outcome strip 5-card layout: 5 across (desktop), 2x2 + 1 (mobile tablet), vertical stack (390px)
- [ ] "13K annual lockouts eliminated" is NEW addition (replaces "16,000+ annual cases" cut) — visual treatment should match other strip cards
- [ ] +13% NPS metric replaces live "+15%" — confirm cross-page fix landed in source before Tuesday

---

## 06 · LESSON

### Tier 1

**Stage label**
```
06 · Lesson
WHAT I'D DO DIFFERENTLY
```

**Lead headline**
```
When an org has six of anything, the problem is almost never execution. Diagnose the system before prescribing the intervention.
```

**Body — preserved verbatim from live**
```
A structural diagnostic in week one would have saved weeks of proving the enablement model wrong. And the lockout story is the smaller version of the same lesson: signals the org can't see are the signals the org is paying for. The SPLUNK query didn't reduce lockouts. It made them legible. Reducing them was a design choice the legibility made possible.
```

### Tier 2 — Tight

**Stage label**
```
06 · Lesson
```

**Lead headline**
```
When an org has six of anything, the problem is almost never execution. Diagnose the system before prescribing the intervention.
```

**Body — compressed**
```
A structural diagnostic in week one would have saved weeks of proving the enablement model wrong. The lockout story is the smaller version of the same lesson: signals the org can't see are the signals the org is paying for.
```

**Pull quote** (preserve as close)
```
The SPLUNK query didn't reduce lockouts. It made them legible. Reducing them was a design choice the legibility made possible.
```

### Cut priority
1. Body paragraph 2 ("And the lockout story is the smaller version...") — lesson + pull quote carry the close
2. "What I'd do differently" subtitle — section is self-evident
3. Pull quote is the close — cut last

### Design decision flags
- [ ] Lesson headline is two sentences — typographic treatment must give breath between sentences without breaking the rhythm
- [ ] Pull quote ("signals the org can't see are the signals the org is paying for") — preserved verbatim, this is the case study's strongest aphorism. Visual treatment: typographic, not boxed. Accent color teal.
- [ ] "The SPLUNK query didn't reduce lockouts. It made them legible." — preserved verbatim, second-strongest moment in the section. Visual treatment must signal the methodological insight (rule line above, mono kicker, or pull-quote register)
- [ ] Section closes the page — no footer artifact, just CaseShell prev/next chrome

---

## CUT LIST FOR ENTIRE CASE

Sections that can drop entirely if layout demands:
- "What that cost" callout (Section 01) — can collapse to footnote on 320px
- LOCKOUT.ECONOMICS Stage 4 sub-metrics ($62K / 2,283 hrs / 15K+ hrs) — top-level "10% reduction target" carries the meaning
- Outcome strip (Section 05) compresses from 5 metrics to 3 (31% MTTR / +13% NPS / 13K annual lockouts) on 390px

Phrases to cut on sight in this case:
- "Eight-figure renewal" — CUT (could not be substantiated; live source still contains, queue for cross-page fix)
- "+15% NPS" — replaced with "+13% NPS" everywhere (locked correction)
- "16,000+ annual cases" — CUT everywhere; hero leads with 31% MTTR percentage
- "human-centered methodologies and systems thinking" (cliché kill list)
- "exit velocity" (startup vernacular in operations context)
- "proof in flight" / "measured at altitude" (aerospace metaphor — kill list)
- "operator" (kill list — only allowed on Impact ID card)
- "live briefing" / "mission profile" (mission control metaphor)
- T-minus timestamps anywhere

---

## ACCURACY NOTES

Inaccuracies in current live copy that must not return:
- "Eight-figure renewal" was in live brief field "Outcome" — was never substantiated; cut everywhere. Outcome now reads "31% MTTR reduction · 13K annual lockouts eliminated · 13%+ NPS over goal"
- "+15% NPS" in outcome metrics strip — locked correction to "+13% NPS"
- "16,000+ annual cases" in hero unit line "31% MTTR reduction · 16,000+ annual cases" — CUT. The 16K figure was structurally implausible (ELC at ~40K employees with 3,515 password-reset INCs/month would total well above 16K cases annually). Lead with 31% MTTR percentage; "13K annual lockouts eliminated" goes in outcome strip as a separate, defensible metric.
- "Four weeks in, we killed the original plan" headline (Section 02 in live) — CUT entirely. Section 02 dropped; pivot logic folded into Section 01 (Brief). Real timeline per source was Summer 2022 → Spring 2023, not four weeks.
- Live tag has "Companies· Case 04" with no space between Companies and ·  — cosmetic source fix needed
- Live case picker still shows "01 · AI WORKFLOW" — separate cross-page fix (locked decision: "Centaur Practice")

Defensible-but-unsourced claims (per Matt):
- 31% MTTR reduction — Matt confirms defensible from his ELC implementation work; no Wipro deliverable available. Document references in Wipro PDF (March 2023) cover the diagnostic phase, not post-implementation outcomes.

Clichés to kill:
- See full kill list in /PROJECT-CONTEXT-HANDOFF.md
- Page-specific watch: "transformation" in the dek must read as operating-model unification (which Matt led), not org-chart consolidation (which he didn't claim). Current dek "I led the transformation that unified the experience across six towers" makes the experience-level claim explicit.

---

## SCOPE CLARIFICATION

Matt's scope per his confirmation, April 27, 2026:

**Remit:** Lead CX/EX transformation for Estée Lauder Companies — unify the experience of the six ITIL towers as one operating model. This is enterprise scope across the full engagement.

**Demonstrated example:** The lockout workflow is the case study's load-bearing example of the broader operating-model work. Matt led design + recommendation + implementation of the lockout workflow specifically. The case study uses this workflow as the wedge that proves the diagnosis (towers were incoherent at the experience level) and demonstrates the fix (structured intake + SPLUNK-aware routing + tier consolidation).

**What Matt did NOT do:** Flatten the six towers into a smaller number of organizational entities. The towers stayed six structurally. The *experience* was unified through workflow redesign, not through org-chart consolidation. The dek's "made [or unified] the experience across six towers" language reflects this scope precisely.

This distinction matters for senior reviewers (Marc S. systems-purist persona, Teresa H. outcome-enforcer persona). Both will read the dek for what it claims and what it doesn't claim. The current language threads correctly.

---

## DESIGN NOTES THAT TRAVEL WITH THIS COPY

For Tuesday Claude Design — repeating from /DESIGN-NOTES.md to ensure visibility:

### Cross-page (apply throughout)
- Mobile margin violation on boxed elements — apply max-width: 100% with explicit padding on bordered containers (LOCKOUT.ECONOMICS hero band is named candidate)
- Left-edge text tension — increase left padding/margin on case study templates, mobile and desktop

### Wipro specific
- LOCKOUT.ECONOMICS hero band on mobile currently exceeds 3-screen heuristic (5+ screens on 390px) — Tuesday must compress via horizontal scroll-snap, 2x2 grouping, or stage-pair compression
- Six-to-three towers collapse (Move 05 from intrigue-moves.md) — does NOT yet exist; Tuesday must build with REV. 02 · REDRAWN stamp
- Tier ladder breathing/exploded-assembly treatment optional Tuesday enhancement
- Case Flow before/after artifact on mobile: text wrapping in right column gets tight; review font size / column ratio
- Section 02 mobile dense paragraph (17 lines before THE SHIFT callout) — consider sub-paragraph break

### Native register (do not violate)
- ITIL operations vocabulary only: six towers, MTTR, INCs, escalation tiers, ServiceNow, SPLUNK, Cisco ISE, AD, EventCode 4740
- No motorcycle terms (those live on About only)
- No aerospace terms (cliché kill list)
- No "service design" jargon imported from Autodesk register — this case is operations-design, not product-service-design
- No methodology vocabulary imported from Synthetic Users register

### Accessibility heuristics (global, from DESIGN-NOTES.md)
- 44px minimum tap target on all interactive elements
- No text below 14px (mono labels can be 11px if uppercase + tracked)
- Max 3 screens per section on mobile before visible break or jump link — Section 02 LOCKOUT.ECONOMICS exceeds, see flag
- No decorative element taller than 40vh on mobile
- Every ornamental flourish earns its place once per screen

---

## CROSS-PAGE FIXES NEEDED IN SOURCE BEFORE TUESDAY

These edits to live source files are required before or during Tuesday's Claude Design pass. They are NOT scope-driven; they are corrections of existing live inaccuracies.

1. **`src/content/cases/wipro.html`**: Brief field "Outcome" — remove "Eight-figure renewal · NPS past goal", replace with "31% MTTR reduction · 13K annual lockouts · 13%+ NPS over goal"
2. **`src/content/cases/wipro.html`**: Outcome strip "+15%" → "+13%"
3. **`src/content/cases/wipro.html`**: Hero unit line "31% — MTTR reduction · 16,000+ annual cases" → "31% — MTTR reduction · process behavior change, not throughput" (drop the 16K denominator)
4. **`src/content/cases/wipro.html`**: Add "13K annual lockouts eliminated" to outcome metrics strip alongside +13% NPS / 30+ outcomes / 3 tiers / 72% T1
5. **`src/content/cases/wipro.html`**: Tag "Companies· Case 04" — add space between "Companies" and "·"
6. **`src/components/case-studies/CasePicker.tsx`** or `case-studies.ts`: "01 · AI WORKFLOW" → "01 · CENTAUR PRACTICE" (cross-page fix, also affects all 5 case study pages)
7. **`src/content/case-studies.ts`**: Hub title/subhead — inventory documented in **Hub-only copy** footnote above (April 2026); verify live file matches or queue cleanup.
8. **`src/content/cases/wipro.html`**: Section 02 entirely removed (Pivot folded into Section 01)
9. **`src/content/cases/wipro.html`**: Section 02 chapter headline "Four weeks in, we killed the original plan." removed (no longer applicable since section dropped)

---

### Hub-only copy (`src/content/case-studies.ts`, `caseStudiesPage` — not rendered on this case route)

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

1. ✅ Hero dek scope corrected to (f): "I led the transformation that unified the experience across six towers." — accurate to Matt's actual remit (operating-model unification, not org-chart flattening)
2. ✅ Section count locked at 6 — Section 02 (Pivot) dropped, pivot logic folded into Section 01 (Brief)
3. ✅ "Four weeks in, we killed the original plan" — CUT (per Q3)
4. ✅ Communication/education prevention half — NOT included (per Q4, not in scope for this case study's framing)
5. ✅ Regional finding (EMEA disparity) — NOT included (per Q6, keeps section tight)
6. ✅ 31% MTTR reduction — defensible per Matt; no source deliverable available, kept as locked claim
7. ✅ "16,000+ annual cases" — CUT everywhere; replaced with "13K annual lockouts eliminated" in outcome strip
8. ✅ "+15% NPS" → "+13% NPS" everywhere
9. ✅ "Eight-figure renewal" — CUT everywhere
10. ✅ Word weight: ~960 user-facing Tier 1 words (aligned with Centaur 912 / Synthetic 972)
11. ⏳ LOCKOUT.ECONOMICS mobile compression — flagged for Tuesday Claude Design as layout problem, NOT a copy issue
12. ⏳ Six-to-three towers collapse animation (Move 05) — flagged for Tuesday Claude Design as build, does not exist in live yet

---

End of Tier 1 + Tier 2 lock.
