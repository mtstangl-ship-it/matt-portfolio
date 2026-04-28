# DESIGN BRIEF — CENTAUR PRACTICE CASE STUDY

**Page:** /case-studies/ai (slug stays as "ai" — display strings update only)
**Tier:** 1 + 2
**Tuesday execution order:** 2 of 7 (Tier A — Tuesday primary block)
**Last updated:** April 27, 2026
**Status:** DRAFT — pending Matt's lock before Tuesday 9am

---

## 01 · WHAT THIS PAGE IS

The portfolio's methodology proof — how Matt works, not just what he ships. Centaur Practice frames AI as instrumented partnership: Matt at the controls, AI as the engine, with telemetry visible at every stage. The case study uses the portfolio build itself as the primary specimen — six weeks, four tools, every consequential decision documented with Run A → Run B receipts.

This is a meta-case-study: the portfolio is evidence of itself. It must withstand reviewers (especially Marc S. systems purists and John M. metrics skeptics) who will scrutinize whether the methodology is actually rigorous or just well-decorated.

Coupled to Home: this case study contains a "Deployment Diff" service record that compares the pre-Centaur portfolio (v1) to the post-Centaur portfolio (v2). The v2 state is captured Thursday after Home ships. Without Home shipping Tuesday, Centaur cannot ship.

---

## 02 · COPY SOURCE

- **Tier 1:** /COPY-case-ai-build-revised.md (or /COPY-case-ai-build.md — verify which is canonical) — locked
- **Tier 2:** Tier 2 sections in same file — pending (Tuesday afternoon work)
- **Do not rewrite copy.** Build to locked copy. If layout breaks, flag it — don't trim.
- **Cross-page correction needed:** Display strings in /src/content/case-studies.ts for slug "ai" need updating Tuesday morning before Claude Design starts:
  - shortName: "AI Workflow" → "Centaur Practice"
  - tag: "AI WORKFLOW" → "CENTAUR PRACTICE"
  - panelLabel: "AI WORKFLOW" → "CENTAUR PRACTICE"
  - Comment on line 5 also references "AI Workflow"
  - URL slug stays as "ai" — slug migration deferred to post-launch (breaks inbound links)

---

## 03 · STRUCTURE

The Centaur Practice case study in order:

01 · BRIEF — what Centaur Practice is, why it exists, the AI-as-partnership thesis
02 · METHODOLOGY — the four-tool stack (Cursor, Claude, Claude Design, Vercel) with role for each
03 · SERVICE RECORDS — the case study's load-bearing artifact, three or four sub-records:
    - 01 · Synthetic Users research (links to Synthetic Users case study)
    - 02 · Deployment Diff (the v1 → v2 portfolio comparison)
    - 03 · Decision Ledger (when AI proposed, when Matt overrode)
    - 04 · (optional) Cost & Time Receipts
04 · LESSON — what carries forward, the "AI raises the floor, taste raises the ceiling" frame
05 · LINKS — Synthetic Users case study, Deployment Diff full-screen artifact

This is a six-section structure matching the rest of the case studies (Synthetic 6, Wipro 6).

---

## 04 · VISUAL VOCABULARY

- **Site-wide grammar:** /reference/visual-grammar.md — apply throughout
- **Intrigue moves on this page:**
  - **Move 03** — "Centaur Practice / Service Records" intrigue move. Each service record gets a fiche-style figure stamp (FIG. 03-A, FIG. 03-B, etc.). Stamps include rev marks ("REV. 02 · DEPLOYED" for completed records, "REV. 01 · IN REVIEW" for in-progress). Records cluster together visually — they don't intersperse with exposition.
  - **Move 06** — Eyebrow prompts must signal interactivity. Tabs and toggles within service records use TAP / DRAG / SEE language, not generic UI labels.
- **Service Record visual treatment:** Each record is a self-contained card with:
  - Top bar: service record number + title + figure stamp
  - Body: artifact (screenshot, embedded HTML, or interactive)
  - Bottom: methodology footnote in mono register
  - Border: thin teal rule with dimension marks at corners
- **Deployment Diff specific:** Side-by-side or stacked v1 (BEFORE) / v2 (AFTER) screenshots of Home page. Annotations point to specific changes with leader lines.

---

## 05 · REFERENCE ASSETS

- **Synthetic Users artifacts (already wired):**
  - /case-studies/synthetic-users/qa-report — Run A QA report
  - /case-studies/synthetic-users/design-critique — Run B design critique
  - These can be linked or embedded as references from Centaur Practice's Synthetic Users service record
- **Deployment Diff v1 screenshot:** Captured before Tuesday (existing portfolio state)
- **Deployment Diff v2 screenshot:** Captured Thursday after Home rebuild lands
- **Fiche prototype screenshots:** /reference/fiche-prototype-screenshots/ — apply same grammar

---

## 06 · DESIGN NOTES THAT APPLY

From /DESIGN-NOTES.md, Centaur Practice section:

- **Service records cluster together** — don't intersperse with exposition paragraphs. Records are the section's load-bearing artifact and need to read as a set, not as illustrations to surrounding text.
- **Each service record is interactive** — clicking opens the artifact in full or expands the record inline
- **Eyebrow prompts must signal interactivity** — TAP / DRAG / SEE language, not generic "click here" or "view details"
- **Mobile compression:** Service records stack vertically. Each record's artifact gets its own viewport (acceptable per 3-screen heuristic for record sets, since the records ARE the content).
- **Methodology section** must NOT read as a tools brag — frame each tool by the role it plays, not by its feature list
- **Decision Ledger** (if included as a service record) shows specific moments where AI proposed and Matt overrode, OR AI proposed and Matt accepted with modifications. Honesty earns credibility here.
- **Run A vs Run B framing:** Centaur is methodology; Synthetic Users is the demonstrated example. Don't repeat Synthetic's Run A/Run B explanation in detail — link to it.

---

## 07 · DECISIONS LOCKED

Do not relitigate Tuesday morning:

- **Display name everywhere:** "Centaur Practice" (not "AI Workflow," not "Human-AI Collaboration," not "AI Build")
- **Six-section structure** (Brief / Methodology / Service Records / Lesson / Links — with Service Records being the load-bearing section)
- **Methodology framed as instrumented partnership** — Matt at controls, AI as engine, telemetry visible
- **Service Records as the load-bearing artifact** — they ARE the case study, not illustrations of it
- **Synthetic Users as the demonstrated example** — service record links there, doesn't duplicate methodology
- **Deployment Diff is required** — v1 vs v2 comparison of Home is the case study's single strongest evidence beat
- **Decision Ledger is required** — moments where Matt overrode AI, with reasoning. Honesty over polish.
- **No "Human-AI Collaboration" language** — Centaur Practice is the named methodology
- **No copilot/assistant/tool framing** — AI is engine; Matt is engineer of record
- **Visual register:** technical illustrator / aerospace fiche, NOT software product UI
- **Slug stays as "ai" in URL** — display strings update, URL doesn't migrate

---

## 08 · DECISIONS OPEN (Tuesday session real-time)

You decide these during the session:

- **Service Records count:** 3 or 4? Synthetic Users + Deployment Diff + Decision Ledger is required (3); Cost & Time Receipts is optional (would make 4). DESIGN-NOTES.md flags this as "decide during build based on visual rhythm."
- **Deployment Diff layout:** side-by-side at desktop, stacked at mobile — OR stacked at all widths with toggle. Both defensible.
- **Decision Ledger visualization:** table format vs. timeline vs. ledger card format. Pick what reads as honest, not as decorated.
- **Methodology four-tool stack treatment:** four cards horizontally (desktop), stacked (mobile) — OR one diagram with tools labeled at points around a workflow loop. DESIGN-NOTES.md leans toward diagram but doesn't lock.
- **Service record figure stamps positioning:** top-right corner of each record (default) vs. inset within record header. Pick what gives breathing room.
- **Link treatment for Synthetic Users:** within the Synthetic Users service record body, the link to /case-studies/synthetic-users — embed-style preview vs. plain text link. Plain text reads more confident; preview-style is more friendly.

---

## 09 · CONSTRAINTS

- **Mobile target:** 390px viewport. Service records stack; each gets its own viewport.
- **Desktop target:** 1280px+. Service records can be 2-up if visual weight is balanced.
- **Cliché kill list compliance:** /PROJECT-CONTEXT-HANDOFF.md
  - No "Proof in flight" / "Measured at altitude" / "Mission control" framing
  - No "Plausible scenarios and edge cases" — this was specifically called out as a violation
  - No "Human-centered methodologies"
  - No "Centaur" used metaphorically beyond the practice name itself (don't say "I rode the centaur" or similar)
  - No motorcycle terms (those live on About only)
- **Native register:** Methodology vocabulary. Run A / Run B / service record / decision ledger / deployment diff / instrumented / telemetry. NOT product vocabulary, NOT consultant vocabulary, NOT AI hype vocabulary.
- **Copy weight:** Tier 1 ~900-1000 words to match Centaur (912) / Synthetic (972) / Wipro (~960) sibling pages
- **Accessibility heuristics** (global, from DESIGN-NOTES.md):
  - 44px minimum tap target on service record cards
  - Service record artifacts (screenshots, embeds) need alt text or methodology footnote describing what's shown
  - Max 3 screens per section on mobile — service records get exception (they're the content)
  - No decorative element taller than 40vh on mobile
  - Every ornamental flourish earns its place once per screen

---

## 10 · WHAT GOOD LOOKS LIKE

Testable post-build outcomes:

- Display name reads "Centaur Practice" everywhere on the page (no "AI Workflow" residue)
- Six sections render in order with clear stage labels
- Service Records section reads as a tight cluster of 3-4 records, not as scattered cards
- Deployment Diff service record shows v1 (current state) until Thursday; placeholder labeled "REV. 01 · CAPTURE PENDING THU 4/30"
- After Thursday capture: Deployment Diff shows side-by-side v1/v2 of Home with annotations
- Decision Ledger shows at least 3 specific moments where Matt overrode AI (or AI proposed something Matt changed) with one-line reasoning each
- Synthetic Users service record links cleanly to /case-studies/synthetic-users without duplicating its methodology
- Mobile: service records stack; each artifact loads progressively without breaking layout
- Page passes Marc S. (systems purist) review: methodology reads as rigorous, not decorated
- Page passes John M. (metrics skeptic) review: claims are receipted, not asserted
- No cliché kill list violations
- Word weight lands ~900-1000 Tier 1
- The page becomes the methodology proof for the entire portfolio — every other case study can reference it as "this is how I work"

---

## 11 · CROSS-PAGE COUPLING — HOME V2 DEPENDENCY

This page's Deployment Diff service record requires the Home page Tuesday rebuild as input.

Sequence:
1. Tuesday: Home rebuilt → Home v2 ships
2. Tuesday: Centaur Practice rebuilt with Deployment Diff placeholder ("REV. 01 · CAPTURE PENDING")
3. Wednesday: Home v2 reviewed and approved
4. Thursday: v2 screenshot captured at 1280px desktop and 390px mobile
5. Thursday: Deployment Diff placeholder replaced with actual v1/v2 comparison
6. Thursday: Centaur Practice marked REV. 02 · DEPLOYED, ships live

What's at risk: If Home Tuesday rebuild slips, Centaur Practice ships either with placeholder Deployment Diff (acceptable but weak) or doesn't ship at all (pushes case studies count from 5 to 4).

Mitigation: Tuesday Claude Design must execute Home FIRST in the Tier A block to maximize the window between Home v2 ship and Thursday screenshot capture. If Home runs late Tuesday, capture window compresses but doesn't disappear.
