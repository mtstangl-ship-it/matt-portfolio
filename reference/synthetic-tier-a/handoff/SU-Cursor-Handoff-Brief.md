# Synthetic Users — Artifact Sketch Round · Handoff Brief

**Round:** SU · artifact sketches · LO-FI · v2026.06
**From:** Claude Design (HTML prototypes)
**For:** (1) orchestration-Claude review/take, then (2) the Cursor port prompt
**Source files (in the design project):**

| Artifact | File | Status |
|---|---|---|
| 01 · Funnel — Direction A (narrowing) | `SU-01 Funnel - Direction A.html` | alternate |
| 01 · Funnel — **Direction B (two-track)** | `SU-01 Funnel - Direction B.html` | **SELECTED** |
| 02 · EVIDENCE.LADDER | `SU-02 Evidence Ladder.html` | locked |
| 03 · Pipeline Lanes | `SU-03 Pipeline Lanes.html` | locked |
| 04 · Marc S. Persona Card | `SU-04 Marc S. Persona Card.html` | locked |
| Shared stylesheet | `synthetic-artifacts.css` | required by all |
| Index / contact sheet | `SU - Artifacts Index.html` | navigation only |

Screenshots of each artboard are in `handoff/` (for the visual take — a chat can't render the HTML, but it can see PNGs).

> **Artifact 05 (persona silhouettes)** is intentionally deferred — it needs real visual sourcing and its own round designed toward the hero-image use case, not rushed hand-drawn SVGs.

---

## Locked rules (apply to all artifacts)

1. **Copy is verbatim** from the locked copy doc. Do not paraphrase or normalize.
2. **No real practitioner surnames anywhere.** Personas are referenced by pseudonym (e.g. *Marc S.*) and archetype role (*Systems Purist*) only. This overrides the original brief copy ("Stickdorn-derived") — that phrasing has been removed.
3. **Featured persona swap:** the live page samples *Teresa H.*; this round features **Marc S. — Systems Purist**. **Confirmed by Matt.**
4. **Single accent, placeholder.** Everything uses one teal `#2dd4b2` as a stand-in. Swap to the case's final accent per artifact. The only second colour is the grammar's warning-orange `#c47155`, used **only** for the persona card's FAIL stamp (semantic, not decorative).
5. **Type:** JetBrains Mono (chrome/labels) + Inter Tight (display/body). No serif. No 700 weight. Italic only for explicit emphasis.
6. **Rendered in isolation.** These artboards contain **no page chrome** — no nav, eyebrows, FIG page-stamps, dim ribbons, or sheet footer. Cursor adds all of that against the Tier A pattern. The sheet-top / title / id-card / footer in each file are *review scaffolding*, not part of the artifact.

---

## What each artifact is + the load-bearing decisions

**01 · Funnel (SELECTED: Direction B, two-track).** Run A (9 personas × 4 envs → 18 → 10) and Run B (1 design-systems persona → 53 fixes) drawn as **co-equal parallel tracks merging at one prioritized backlog**. The 3-of-10 gap resolves after the merge: the backlog renders as 10 countable cells (3 filled = self-review blind spots, encoded by **fill-state not colour**) plus a `+53` chip for Run B; the 3 flow down to "3 shipped." *Direction A (narrowing funnel, countable throat) is the alternate if you'd rather the gap be the spine and Run B a side rail.*

**02 · EVIDENCE.LADDER.** 2 methods × 4 environments. The settled spec: **confidence = a 4-segment meter where filled-segment count is the level** (Ship 4 / High 3 / Mid 2 / Baseline 1) — grayscale-legible, replacing the old amber-for-MID colour cue (accessibility fix). Shared columns + a per-column verdict strip reinforce REAL-vs-SYNTHETIC contrast. Footer metrics (3 / 1 / $8K→$0) land last. Mobile re-flows to per-environment cards so the head-to-head survives.

**03 · Pipeline Lanes.** DEV→QA→UAT→PROD as a **gated release pipeline** — continuous spine, PASS gates between lanes, terminal SHIP — so it reads as a process, not a 4-up grid. Two prominent layers per lane: the **persona-class chip** and the **diagnostic question** at display scale with its key phrase accented. Run B is a parallel companion rail beneath, explicitly not a 5th lane. Goes vertical ≤900px.

**04 · Marc S. Persona Card.** A **research spec-sheet**, not a marketing card: mono label gutter, dashed dividers. Hierarchy — name loudest, first question pulled to 22px in quotes, and the **finding as a bordered logged verdict** (FAIL flag + named case + recommendation) so it reads "this happened." A 5-archetype role index shows it's card 01 of a system. Mobile collapses labels above values; finding block stays full-weight.

---

## Block A — paste to get the orchestration-Claude take

> I have four artifact prototypes for the Synthetic Users case study (HTML + screenshots attached). They render each artifact in isolation in the Tier A fiche register (JetBrains Mono + Inter Tight, single teal placeholder accent). Selected funnel direction is B (two-track). Locked rules: copy verbatim, no real practitioner surnames (Marc S. + archetype role only), featured persona is Marc S. (swaps the live Teresa H.), confidence encoded by fill-count not colour.
>
> Give me your take as a hiring-design-leader-grade reviewer: where each artifact is strongest, where it strains, and anything that would read as under-built or over-built. Then flag any copy or hierarchy risks before we port.

## Block B — skeleton for the Cursor port prompt

> Port these four Synthetic Users artifacts into the Next.js Tier A case study (`/case-studies/synthetic`). The attached HTML files are the visual + structural reference — match their layout, type hierarchy, and the documented design decisions (read the source comments). Do **not** ship them as-is; rebuild against the Tier A pattern.
>
> - Wrap all artifact CSS under `.tier-a-case-root .case-synthetic-portfolio` (per BUILD-NOTES scoping rule); prefix any generic class names (`.lane`, `.meter`, `.funnel`, etc.) with `synth-` to avoid the `cases.css` collision class.
> - Page chrome (nav, kickers, FIG stamps, sheet footer, dim ribbons) comes from the shared Tier A chrome — do **not** lift it from these files.
> - Funnel: use Direction B. Confidence meters and funnel "blind-spot" cells must encode by fill-state/count, not colour alone.
> - Swap the single placeholder accent `#2dd4b2` to the case's final accent token; keep warning-orange only on the persona-card FAIL stamp.
> - Featured persona = Marc S.; no real practitioner surnames in markup or comments.
> - Verify per BUILD-NOTES: build passes, then 3-state nav check (direct / soft-nav / hard refresh) + multi-width hero check on Vercel preview. Flag what needs visual verification you can't do headless.

---

*Accent and final persona-set copy are Matt's to lock. Funnel Direction B and the Marc S. swap are **confirmed**. Everything here is swap-ready.*
