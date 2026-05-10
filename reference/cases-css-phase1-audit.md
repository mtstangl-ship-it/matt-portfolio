# Phase 1 audit — `src/app/cases.css` hygiene (evidence only; no CSS edits)

**Branch:** `css-hygiene-cases` (sub-branch off `tier-a-rebuild`)  
**Audit date:** 2026-05-06  
**Scope:** Inventory unscoped rules, consumer grep, Tier A collision cross-check, preliminary classifications per BUILD-NOTES.  
**Phase 2:** Do **not** apply until classifications are reviewed/approved.

---

## A. Blast radius (critical context)

| Fact | Evidence |
|------|-----------|
| **Global stylesheet** | `@import './cases.css';` in `src/app/globals.css` (line 3). Loaded on **every route** (home, about, Impact, Tier A cases, legacy cases). |
| **Comment at top of `cases.css` is inaccurate** | It claims selectors are “case-unique” and don’t leak. Unscoped rules **do** apply anywhere matching markup/classes exist; specificity/order determines winners. |
| **Legacy case bodies** | Injected HTML from `src/content/cases/{synth,autodesk,wipro}.html` via `CaseShell` + `dangerouslySetInnerHTML`. **`ai.html` and `ey.html` exist on disk but are not loaded** by live routes — Centaur and EY use Tier A React under `CaseShell` (`cases/ai.tsx`, `cases/ey.tsx`). |
| **Tier A wrapper** | `CaseShell` with **React children** wraps output in `<div class="tier-a-case-root">` + `<article data-case={slug}>`. Legacy **`body` HTML** path uses **`impact-console`** article but **no** `tier-a-case-root`. |

**Standing instruction match:** `cases.css` is intentionally loaded globally and doubles as the shared stylesheet for **legacy** slug-rendered case HTML. Tier A cases still parse **global** rules from this file unless overridden by more specific dual-scoped rules in `case-ai.css` / `ey-case.css`. When Wipro moves to Tier A, deleting or scoping this file becomes simpler.

---

## B. Truly narrowed selectors (not `.tier-a-case-root`, but not “site arbitrary” either)

Only **three** top-level narrowing selectors appear (CSS variables + Autodesk tier hooks):

| Selector(s) | Lines | Role |
|-------------|-------|------|
| `article[data-case="autodesk"]` | ~868 | Autodesk accent token |
| `.adsk-hero[data-tier="nurture"]`, `.adsk-hero::before`, `.adsk-hero[data-tier="growth"] …` + blueprint tier chains | ~869–907, 932–937 | Autodesk hero / blueprint behavior tied to `.adsk-hero` |
| `article[data-case="wipro"]` | ~1019 | Wipro tokens |
| `article[data-case="ey"]` | ~1190 | **Legacy EY** tokens (still global whenever `article[data-case="ey"]` exists — includes Tier A EY page) |

**Everything else** in the file is keyed only by short class names (`.mast`, `.delta`, `.ribbon`, `.cta`, `.diff`, etc.) with **no** legacy wrapper class — hence BUILD-NOTES “generic collision risk.”

---

## C. Document sections / line ranges (for navigation)

Approximate blocks by banner comments:

| Lines | Block theme |
|------|-------------|
| 10–31 | Masthead `.mast` + `.dek` |
| 33–49 | Briefing `.brief` |
| 51–82 | Outcome strip `.outcome` |
| 84–100 | Metrics `.metrics` |
| 102–137 | Chapter `.chapter`, `.stage`, `.chap-body` |
| 139–151 | Callout `.callout` |
| 153–184 | Trace `.trace` |
| 186–210 | Artifact `.artifact`, `.persona-card` |
| 212–255 | Weeks `.weeks`, tools `.tools`, envs `.env`, `.env` |
| 257–271 | Mini ladder `.mini-ladder` |
| 273–284 | **Wipro handoff `.delta`** |
| 286–295 | Hubs `.hubs` |
| 297–309 | Pull `.pull` |
| 311–317 | Endnote `.endnote` |
| 319–334 | Next/prev `.next` |
| 337–350 | **CTA strip `.cta`** |
| 353–367 | Tweaks `.tweaks-panel` |
| 369–437 | Breakout `.breakout`, `.break-*`, terminal `.terminal`, `.term-*`, `.sev-dot`, `.term-open` |
| 441–526 | **Diff viewport `.diff*`**, `.fake-*`, `.hero-h`, `.eyebrow`, `.scatter`, `.pin`, `.pin.red`, `.handle-*`, `.diff-legend` |
| 528–638 | Telemetry `.telemetry`, `.tel-*`, `.state-wk*`, `.tel-note`, `.tel-k` |
| 639–865 | Hero band `.hero-band`, `.hb-*`, `.signal-strip`, `.sig-*`, `.sm-wk*`, ladder `.ladder`, `.lad-*`, **ribbon `.ribbon`**, `.rib-phase`, `.rp-*` |
| 867–954 | Autodesk `.tier-toggle`, `.blueprint`, `.bp-*` |
| 956–1016 | Opportunities `.opps`, `.opp` |
| 1018–1099 | Wipro lockflow `.wip-hero`, `.lockflow`, `.lf-*` |
| 1101–1187 | Case flow `.caseflow`, `.cf-*`, `.cft`, `.cfd-*` |
| 1189–1260 | **Legacy EY tour `.ey-hero`, `.tour`, `.stop`, `.tm-*`, `.sd-*`, `.sv-*`, `.stop-moment`, `.sm-k`** |
| 1262–1318 | Field learnings `.fieldcards`, `.fc-*` |
| 1320–1337 | EY cats `.sy-cats`, `.sc-*` |
| 1339–1365 | **Nav dropdown `.topnav`, `.submenu`** |
| 1367–1407 | Tradeoffs `.tradeoffs`, `.to`, modernization `.mod`, `.mod-col`, `.mod-arrow` |

*(Selectors inside `@media` repeat these bases — same scoping story.)*

---

## D. Unscoped roots — consumer / Tier A collision matrix

Legend:

- **Legacy HTML** = markup from `src/content/cases/*.html` served on `/case-studies/{autodesk,wipro}` or `/case-studies/synthetic-users`.
- **Tier A** = React under `case-centaur/`, `case-ey/`, shared `CaseHero.tsx`, `CaseShell.tsx`, `CasePicker.tsx`, `src/styles/tier-a/`.

| Root / cluster | Lines (approx) | Consumers | Tier A overlap | Preliminary class |
|----------------|----------------|-----------|----------------|-------------------|
| `.mast`, `.brief`, `.outcome`, `.metrics`, `.chapter`, `.stage`, `.chap-body`, `.callout`, `.trace`, `.artifact`, … | 11–317 | Legacy HTML (e.g. `autodesk.html` `<header class="mast">`) | No Tier A React markup uses `.mast` (grep TSX). Risk if reused later. | **SCOPE TO LEGACY** (or DELETE orphaned subsets — needs HTML grep per root). |
| `.cta` | 337–350 | **Home:** `HomePagePort.tsx` uses `<Link className="cta">` | BUILD-NOTES lists `.cta` as collision-prone; cases.css defines global `.cta` | **COLLISION** — legacy case “let’s talk” vs home CTA links |
| `.ribbon` + `.ribbon::before` | 813–865 | Legacy ladder markup | Centaur: `case-ai.css` **explicitly undoes** `cases.css` `.ribbon::before` under `.record__eyebrow .ribbon` | **COLLISION / mitigation exists** — still fragile |
| `.diff` (+ subtree) | 441–526 | **`ai.html` only** (not rendered on live `/case-studies/ai`) | **Centaur:** `RecordsCentaur.tsx` uses `<div className="diff">`; **`case-ai.css`** defines `.diff` ~1063 | **COLLISION** — dead prototype HTML vs live Tier A + duplicate stylesheet definitions |
| `.telemetry`, `.tel-*`, `.signal-strip`, `.sig-*` | 528–720 | Legacy **`ai.html`** + CaseShell DOM bindings reference `.tel-node`, `.signal-strip` in **`CaseShell.tsx` effects** | Tier A Centaur replaces markup — JS hooks may be **dead** if DOM absent | **Investigate:** Tier A path likely legacy-only behaviors stale |
| `.tour`, `.stop`, `.tm-*`, `.sd-*`, … | 1196–1260 | **`ey.html` legacy** (not loaded by Ey route) | **EY Tier A:** `EyCaseView.tsx` — `<section className="tour" id="tour">`, `<article className="stop">` inside `.poster__stops` | **COLLISION** — same names as legacy EY tour grid; scoped overrides in `ey-case.css` **partial** (may inherit display/grid/min-width from `cases.css`) |
| `.delta` | 274–284 | **`wipro.html`** `.delta` | EY renamed to `external-validation` | **SCOPE TO LEGACY** (Wipro); historically broke Tier A if reused |
| `.env`, `.envs` | 246–255 | Legacy QA strip classes | Generic token `.env` | **HIGH generic risk** if reused elsewhere |
| `.mini-ladder`, `.ladder`, `.blueprint`, `.lockflow`, `.caseflow`, `.fieldcards`, `.sy-cats`, `.opps`, `.tradeoffs`, `.mod` | various | Per-case HTML | Mostly Tier-A‑scoped differently — grep before DELETE | **SCOPE TO LEGACY** pending HTML verification |
| `.topnav`, `.submenu` | 1339–1365 | **No** hits in `src/content/cases/*.html` or TSX (rg `topnav`) | None observed | **DELETE** candidate — orphaned rules |
| `.tweaks-panel` | 353–367 | No TSX/HTML hits outside `cases.css` | None | **DELETE** candidate |
| `.next` prev/next strip | 319–334 | No `class="next"` found under `src/content/cases` | Low immediate consumer | **DELETE or SCOPE TO LEGACY** after confirming unused |

---

## E. COLLISION — explicit flag list (needs Matt / orchestrator before auto-fix)

1. **`.cta`** — Global legacy case footer styling vs **`HomePagePort` `<Link className="cta">`** under same global import chain.
2. **`.diff`** — **`cases.css`** artifact viewport styles vs **Tier A Centaur** `.diff` + **`case-ai.css`** `.diff` (order/specificity dependent).
3. **`.ribbon::before`** — Legacy hero ribbon pseudo-element vs Centaur eyebrow ribbon (**partial undo** in `case-ai.css` — brittle).
4. **`.tour` / `.stop`** — Legacy EY tour CSS vs **Tier A `EyCaseView`** `section.tour` / `article.stop`; **`ey-case.css`** adds scoped rules but may **not** reset all properties from `cases.css`.

---

## F. Recommended Phase 2 direction (preview — not executed)

| Classification bucket | Recommended handling |
|----------------------|----------------------|
| **SCOPE TO LEGACY** | **Option A** preferred: add **`case-legacy-root`** (or similar) on legacy-only wrapper inside `CaseShell` HTML path, then prefix rules — **`article[data-case="…"] .case-legacy-root …`** or `article[data-case="…"]:not(.tier-a-react-case)` sibling selector chain — tune when implementing. Renaming dozens of classes (Option B) is higher churn for marginal gain until Wipro Tier A deletes legacy HTML. |
| **DELETE** | `.topnav` block, `.tweaks-panel`, unused strips (`.next` if confirmed), after grep confirmation. |
| **COLLISION** | No auto-fix — resolve case-by-case (rename Tier A class vs scope legacy vs split stylesheet import). |
| **LEAVE GLOBAL** | Prefer **none** for layout primitives; only true resets/utilities if any remain after audit — document comment per rule. |

---

## G. Verification notes (Phase 3 preview — after Phase 2)

- `npm run build`, route 200s as in prompt.  
- Matt: three-state visual gate + legacy slug pages + Tier A Centaur/EY.

---

## H. Files referenced by this audit

- `src/app/globals.css` — imports `cases.css`  
- `src/app/cases.css` — subject file  
- `src/components/case-studies/CaseShell.tsx` — legacy vs Tier A wrapper behavior  
- `src/content/cases/*.html` — legacy markup  
- `src/components/case-studies/cases/case-centaur/RecordsCentaur.tsx` — `.diff`  
- `src/styles/case-centaur/case-ai.css` — `.diff`, `.ribbon::before` undo  
- `src/components/case-studies/cases/case-ey/EyCaseView.tsx` — `.tour`, `.stop`  
- `src/styles/case-ey/ey-case.css` — scoped overrides  
- `src/components/home-v2/HomePagePort.tsx` — `.cta`
