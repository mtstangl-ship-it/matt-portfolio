# Site Chrome & Texture Audit

**Branch:** `tier-a-rebuild` (commit `b1724c4`)  
**Date:** 2026-05-26  
**Scope:** Read-only architectural audit of page chrome, shared layout, token drift, and `/impact` implementation gaps.  
**Note:** The visual port on branch `impact-visual-pass` (`365518b`) is **not merged** into `tier-a-rebuild` at audit time. Section 6 bug locations reference that branch where the bugs exist; `tier-a-rebuild` Impact is the older console implementation.

---

## Section 1 — Layout architecture

### Root layout

| File | Role |
|---|---|
| `src/app/layout.tsx` | Root HTML shell. Loads Inter, Inter Tight, JetBrains Mono via `next/font`. Wraps all routes in `<ConditionalSiteChrome>`. Imports `globals.css`. |

Every route passes through `ConditionalSiteChrome` → `ConditionalSiteChromeClient`.

### Conditional chrome gate

| File | Behavior |
|---|---|
| `src/components/layout/ConditionalSiteChrome.tsx` | Server component. Reads `x-matt-pathname` from middleware headers for SSR/CSR match. |
| `src/components/layout/ConditionalSiteChromeClient.tsx` | Client gate. **Omits** legacy `<Nav />` + `<Footer />` for: `/`, `/about`, `/case-studies/ai`, `/case-studies/ey`, `/case-studies/wipro`, `/case-studies/autodesk`. All other routes get legacy chrome wrapped in `<main className="flex-1">`. |

This is the primary architectural split: **Tier A fiche routes self-ship nav**, everything else gets the cream editorial shell.

### Nested layouts

| File | Routes wrapped | What it does |
|---|---|---|
| `src/app/about/layout.tsx` | `/about` | Imports `about-v3/index.css`, mounts `AboutBodyClass` (sets `body.about-v3-active`) and `AboutCrosshairObserver`. No nav markup. |
| `src/app/case-studies/autodesk/layout.tsx` | `/case-studies/autodesk` | CSS import only: `@/styles/case-autodesk/index.css` |
| `src/app/case-studies/ai/layout.tsx` | `/case-studies/ai` | CSS import only: `@/styles/case-centaur/index.css` |
| `src/app/case-studies/ey/layout.tsx` | `/case-studies/ey` | CSS import only: `@/styles/case-ey/index.css` |
| `src/app/case-studies/wipro/layout.tsx` | `/case-studies/wipro` | CSS import only: `@/styles/case-wipro/index.css` |

No nested layout exists for `/impact` or `/signal-story`.

### Route → layout → page entry map

| Route | Layout chain | Page entry | In-page chrome owner |
|---|---|---|---|
| `/` | root | `src/app/page.tsx` → `HomePagePort` | `FicheNav` inside `HomePagePort` |
| `/about` | root → about | `src/app/about/page.tsx` → `AboutV3View` | `FicheNav` inside `AboutV3View` |
| `/impact` | root only | `src/app/impact/page.tsx` → `ImpactPage` → `ImpactShell` | Legacy `Nav`/`Footer` from root + inline console chrome in `ImpactShell` |
| `/case-studies/autodesk` | root → autodesk | `src/app/case-studies/autodesk/page.tsx` → `AutodeskCase` | `CaseShell` → `FicheNav` + `AutodeskCaseView` |
| `/case-studies/wipro` | root → wipro | `src/app/case-studies/wipro/page.tsx` → `WiproCase` | `CaseShell` → `FicheNav` + `WiproCaseView` |
| `/case-studies/ai` | root → ai | `src/app/case-studies/ai/page.tsx` → `AiCase` (title: Centaur Practice) | `CaseShell` → `FicheNav` + `CentaurCaseView` |
| `/case-studies/ey` | root → ey | `src/app/case-studies/ey/page.tsx` → `EyCase` | `CaseShell` → `FicheNav` + `EyCaseView` |
| `/signal-story` | root only | `src/app/signal-story/page.tsx` | Legacy `Nav`/`Footer`; inline `PageHero` + `SiteGrid` |

`/case-studies` redirects to `/case-studies/ai` (`src/app/case-studies/page.tsx`).

---

## Section 2 — Shared components

### Nav / Header / BrandBar

| Component | Path | Used by |
|---|---|---|
| **`FicheNav`** | `src/components/layout/FicheNav.tsx` | `/` (`HomePagePort`), `/about` (`AboutV3View`), all Tier A case routes via `CaseShell` |
| **`Nav`** (legacy) | `src/components/layout/Nav.tsx` | `/impact`, `/signal-story`, `/contact`, and any route not in the Tier A whitelist |
| **`impact-brand-bar`** (CSS only, visual-pass) | `src/styles/impact-visual-pass.css` (`.impact-brand-bar*`) | **Not wired** in any component on `impact-visual-pass`; dead stylesheet |

**FicheNav implementation:** Fixed pill nav (`+M · STANGL` mark, mono links, Contact mailto CTA, mobile drawer). Styled by `src/styles/tier-a/fiche-nav.css`.

**Legacy Nav implementation:** Tailwind editorial bar — "Matt Stangl" wordmark + `navLinks` from `src/content/nav.ts` (Home, Impact, Signal → Story, Case Studies, About). No Contact pill.

**Drift:** `/impact` is the only major dark fiche-adjacent page still on legacy Nav. It links to Impact in FicheNav on other pages but does not render FicheNav itself.

### Footer / SheetFooter

| Component | Path | Used by |
|---|---|---|
| **`Footer`** (legacy) | `src/components/layout/Footer.tsx` | Same routes as legacy Nav |
| **`.sheet` footer pattern** | CSS in `src/styles/home-v2/grammar.css`, `src/app/about/about-v3/grammar.css`, `src/styles/case-*/grammar.css` | `/`, `/about`, all Tier A case studies |
| **`.impact-shell .foot`** | `src/app/impact.css` | `/impact` on `tier-a-rebuild` only |
| **`.impact-sheet-footer`** | `src/styles/impact-visual-pass.css` | `/impact` on `impact-visual-pass` only |

No shared React `SheetFooter` component exists. The six-cell sheet grid (`SHEET / SCALE / DRAWN / DATE / REV. / PAGE`) is duplicated as markup + CSS class conventions per route family.

### IDStrip / PartNoStrip

| Pattern | Path | Used by |
|---|---|---|
| **`.id-strip`** (About hero) | Markup in `AboutV3View.tsx`; CSS in `src/app/about/about-v3/about.css` | `/about` |
| **`.hero__id-strip`** (Case hero) | `CaseHero.tsx`; CSS in `src/styles/tier-a/hero-chrome.css` | All Tier A case studies |
| **`.hero__identity`** (Home hero) | `HomePagePort.tsx`; CSS in `src/styles/home-v2/v2.css` | `/` — same role, different class name |
| **`.impact-id-strip`** | `impact-visual-pass` only, in `ImpactShell.tsx` | Not on `tier-a-rebuild` |
| **`.id-card`** | `ImpactShell.tsx` + `impact.css` | `/impact` on `tier-a-rebuild` |

No shared React component. Three parallel implementations for the same visual job.

### SectionTitleBlock / FigCard / DrawingHeader

No shared React components with these names.

| Pattern | Where defined | Used by |
|---|---|---|
| **`.margin-note`** (left vertical label) | `home-v2/v2.css`, `about-v3/grammar.css`, case `grammar.css` files | `/`, `/about`, Tier A cases |
| **`.fig-stamp`** (corner stamp) | Same grammar files | `/`, `/about`, Tier A cases via `CaseHero` + section markup |
| **`.section-stamp`** (`<dl>` metadata block) | Case view TSX + grammar CSS | Tier A cases (not Home/About) |
| **`DimRibbon`** | **Duplicated inline function** in `AutodeskCaseView.tsx`, `WiproCaseView.tsx`, `EyCaseView.tsx` | Tier A cases — dimension ribbon + tick SVG between sections |
| **`SectionBreak`** | `src/components/impact/impact-shared.tsx` | `impact-visual-pass` Impact tabs only |
| **`CatBadge`** | `impact-shared.tsx` | `impact-visual-pass` Impact tabs only |
| **`.section-head`** | `impact.css` | `tier-a-rebuild` Impact section dividers (plain H3 + hint, no FIG numbering) |

### CornerStamp / DrawingStamp

Implemented as CSS classes, not components:

- `.fig-stamp` — absolute corner stamp on sections/heroes
- `.margin-note` — vertical side-margin label (desktop only; hidden on mobile in most grammars)

**Routes without stamps:** `/impact` (both branches), `/signal-story`.

### SideMarginLabel / VerticalLabel

Same as `.margin-note`. No separate component.

### Other shared infrastructure

| Component | Path | Notes |
|---|---|---|
| **`SiteGrid`** | `src/components/ui/SiteGrid.tsx` | Technical graph-paper overlay. Used by `/impact` (`ImpactPage`) and `/signal-story`. Not used by Home/About/Tier A cases (they use scoped `--bg-grid` or hero canvases). |
| **`CaseShell`** | `src/components/case-studies/CaseShell.tsx` | Wraps Tier A React case views with `FicheNav` + `article.impact-console` |
| **`CaseHero`** | `src/components/case-studies/CaseHero.tsx` | Shared halftone hero: margin-note, fig-stamp, id-strip, CasePicker slot |
| **`CasePicker`** | `src/components/case-studies/CasePicker.tsx` | Inter-case navigation pill inside case heroes |

---

## Section 3 — Chrome treatment per route

Audited on **`tier-a-rebuild`** unless noted.

| Route | Nav style | Corner stamps in margins | Side-margin vertical labels | Right-margin ID strip | Section-level title blocks (FIG.NN) | Sheet footer | Atmospheric SVG / ghost drawings |
|---|---|---|---|---|---|---|---|
| `/` (Home) | `FicheNav`: `+M · STANGL` + mono links + Contact pill | yes — `.fig-stamp` per major section (e.g. DRAWING 01, FIG. 02) | yes — `.margin-note` on hero + sections | partial — `.hero__identity` rows (DRAWN / DATE / REV / PAGE), not the case-style `id-strip` | partial — margin notes reference FIG numbers; no `.section-stamp` dl blocks | yes — `.sheet` 6-cell footer | yes — `HeroCanvasLazy` pointillism, dashboard viz components, logo grid, radial bg gradient |
| `/about` | `FicheNav` | yes — `.fig-stamp` per section | yes — `.margin-note` (e.g. FIG. 02 · POSTURE) | yes — `.id-strip` dl in hero | partial — kicker/H2 blocks; stamps carry FIG numbers | yes — `.sheet` footer (SHEET 04/06 … PAGE ABOUT) | yes — `HalftonePhoto`, crosshair fade observer, radial bg |
| `/impact` | **Legacy `Nav`**: "Matt Stangl" wordmark + link list, no Contact pill. Inline `.topbar` breadcrumb (CONSOLE / Impact / tab) + operator sig | no | no | partial — `.id-card` aside (Operator / Role / Engagements / Scope), not right-margin strip | no — `.section-head` only (H3 + hint); no FIG.NN blocks | partial — custom `.foot` 3-column footer ("Impact Console · v2026.04"), not `.sheet` grid | yes — `SiteGrid` overlay; inline Georgia SVG on Healthcare tab; no stress-curve SVG on Wipro tab |
| `/case-studies/autodesk` | `FicheNav` via `CaseShell` | yes — `CaseHero` + per-section `.fig-stamp` | yes — `.margin-note` per section | yes — `.hero__id-strip` in `CaseHero` | yes — `.section-stamp` dl + `DimRibbon` between sections | yes — `.sheet` footer | yes — halftone hero plate, Revenue Engine patent plate SVG, opportunities matrix |
| `/case-studies/wipro` | `FicheNav` via `CaseShell` | yes | yes | yes | yes | yes | yes — halftone hero, monument underline animation, tier ladder SVG |
| `/case-studies/ai` (Centaur Practice) | `FicheNav` via `CaseShell` | yes | yes | yes | yes | yes | yes — halftone hero, telemetry/declaration artifact sections |
| `/case-studies/ey` | `FicheNav` via `CaseShell` | yes | yes | yes | yes | yes | yes — custom hero booth photo slot, tour/validation sections |
| `/signal-story` | Legacy `Nav` | no | no | no | no — `PageHero` eyebrow only | no — legacy `Footer` only | partial — `SiteGrid` + dark `#070605` field; YouTube embeds, no drawing register |

### `impact-visual-pass` delta (unmerged)

When merged, `/impact` would change to:

- Nav: still **legacy `Nav`** (FicheNav not added; `impact-brand-bar` CSS exists but is unused)
- ID strip: `.impact-id-strip` (matches About pattern)
- Section breaks: `SectionBreak` with FIG meta (e.g. FIG. 02-A · Delivery)
- Sheet footer: `.impact-sheet-footer` (6-cell, matches case studies)
- Wipro tab: stress-profile SVG via `WiproProfile` (buggy — see Section 6)
- EY tab: scroll-pinned map via `EYFootprint` (buggy — see Section 6)
- Tokens: `#0a0f0e` / `#2dd4b2` fiche register in `impact-visual-pass.css`, overriding OKLCH `tokens-impact.css` on `.impact-console`

---

## Section 4 — Token drift

### Where tokens live

| Layer | File | Scope |
|---|---|---|
| Global typography | `src/app/tokens-type.css` | `:root` — `--sans`, `--mono`, type scale |
| Global color (cream default) | `src/app/globals.css` `:root` | Light editorial body |
| Impact console (OKLCH) | `src/app/tokens-impact.css` | `.impact-console { --bg: oklch(...); --teal: oklch(...); }` |
| Impact layout rules | `src/app/impact.css` | `.impact-shell *` chrome (topbar, id-card, tabs, foot) |
| Home v2 fiche register | `src/styles/home-v2/tokens.css` | `.home-v2-root { --bg: #0a0f0e; --accent: #1dcfaa; }` |
| About v3 fiche register | `src/app/about/about-v3/about-v3-tokens.css` | `body.about-v3-active { --bg: #0a0f0e; --accent: #1dcfaa; }` |
| Tier A cases | Per-case `index.css` bundles + `tier-a-case-shell.css` | `.tier-a-case-root` mirrors Home/About dark tokens |
| Tailwind theme | `tailwind.config.ts` | Editorial ink/paper/accent palette; `impact.*` maps to CSS vars; `accent.signal: #22d3c7` |
| Visual-pass Impact (unmerged) | `src/styles/impact-visual-pass.css` | Re-declares `.impact-console` with hex tokens including `--teal: #2dd4b2` |

### Are tokens defined once and reused?

**No.** There are three dark-register families:

1. **Fiche register** (Home, About, Tier A cases): `#0a0f0e` bg, `#1dcfaa` accent, scoped CSS variables
2. **Impact console** (`tier-a-rebuild`): OKLCH variables in `tokens-impact.css` — visually similar but numerically different
3. **Visual-pass Impact** (unmerged): hex fiche tokens in `impact-visual-pass.css` — closest to Home/About, including `#2dd4b2` teal

The cream editorial shell (`globals.css` body) applies to legacy routes but is overridden by scoped dark roots on fiche pages.

### Dark palette `#0a0f0e`

| Location | Defined as |
|---|---|
| `src/styles/home-v2/tokens.css` | `.home-v2-root { --bg: #0a0f0e; }` |
| `src/app/about/about-v3/about-v3-tokens.css` | `body.about-v3-active { --bg: #0a0f0e; }` |
| Tier A case shells | Mirrored via `tier-a-case-shell.css` |
| `tailwind.config.ts` | **Not** defined — no `#0a0f0e` Tailwind color key |
| `tokens-impact.css` | Uses OKLCH `oklch(0.17 0.015 220)` instead |
| `impact-visual-pass.css` | `.impact-console { --bg: #0a0f0e; }` (unmerged) |

### Page-specific overrides

- Home: `.home-v2-root` resets `--sans`/`--mono` to `"Inter"` / `"JetBrains Mono"` strings (ignores next/font vars in tokens file)
- About: `body.about-v3-active` uses next/font vars correctly
- Impact: `.impact-console` in `tokens-impact.css` re-exposes `--sans`/`--mono`; visual-pass adds a second override block
- Case studies: `article[data-case="…"]` accent overrides in `globals.css` (Autodesk green/purple, Wipro red/amber, etc.)
- Signal story: inline `bg-[#070605]` on page wrapper

### Teal accent `#2dd4b2`

| Location | Value |
|---|---|
| `impact-visual-pass.css` (unmerged) | `--teal: #2dd4b2` on `.impact-console` |
| Home / About fiche register | `--accent: #1dcfaa` (not `#2dd4b2`) |
| `tailwind.config.ts` | `accent.signal: #22d3c7`, `accent.DEFAULT: #0d9488` |
| `tokens-impact.css` | `--teal: oklch(0.82 0.13 190)` (~mint, not hex `#2dd4b2`) |

**`#2dd4b2` appears only in the unmerged visual-pass stylesheet**, not in Tailwind theme or fiche register.

### Fonts (Helvetica Neue + IBM Plex Mono)

| Intended (design handoff) | Actual in codebase |
|---|---|
| Helvetica Neue sans | `--sans: var(--font-inter-tight), 'Helvetica Neue', Helvetica, Arial, sans-serif` in `tokens-type.css` — **Inter Tight loaded via next/font**, Helvetica Neue is fallback only |
| IBM Plex Mono | **Not loaded.** Site mono is JetBrains Mono via `next/font` in `layout.tsx`. Visual-pass CSS hardcodes `"IBM Plex Mono"` in SVG label rules (`impact-visual-pass.css` ~lines 537–580) but the font is never imported — falls back to system monospace |

Root font loading: `src/app/layout.tsx` lines 7–26 (Inter, Inter Tight, JetBrains Mono).

---

## Section 5 — Current Impact page implementation

### File paths (`tier-a-rebuild`)

```
src/app/impact/page.tsx          → wraps ImpactPage in .impact-console
src/components/impact/ImpactPage.tsx   → SiteGrid + ImpactShell
src/components/impact/ImpactShell.tsx  → entire page (~809 lines, monolithic)
src/app/tokens-impact.css        → OKLCH color tokens
src/app/impact.css               → layout/chrome styles
src/content/impact-dashboard-briefing.ts → (if referenced; shell is mostly inline copy)
```

### Shared library imports

| Import | From | Purpose |
|---|---|---|
| `SiteGrid` | `@/components/ui` | Graph overlay (`ImpactPage` only) |

**Does not import:** `FicheNav`, `CaseHero`, `CaseShell`, `PageHero`, or any case-study primitives.

### Locally defined / inline (candidates for sharing if porting continues)

All in `ImpactShell.tsx`:

- `.topbar` breadcrumb header (CONSOLE / Impact / tab + operator signature)
- `.identity` block + `.id-card` operator metadata
- Tab list + three tab panels (Revenue / Operations / Healthcare)
- `TierRow` sub-component (ladder accordion)
- `.compare` before/after columns (Wipro — no SVG curve)
- `.geo` hover map + city list (EY — hover/click, not scroll-pin)
- `.ruler` + `.handoff-cta` + `.foot` footer

On **`impact-visual-pass`** (unmerged), extracted to:

- `AutodeskAssembly.tsx`, `WiproProfile.tsx`, `EYFootprint.tsx`, `impact-shared.tsx` (`CatBadge`, `MetricStrip`, `SectionBreak`, `MetricCell`), `wipro-profile-svg.ts`

Still not shared with About/cases: breadcrumb, id-strip, sheet footer (parallel CSS classes instead).

### Gap vs `/about`

| Chrome element | About | Impact (`tier-a-rebuild`) | Impact (`impact-visual-pass`) |
|---|---|---|---|
| Primary nav | `FicheNav` | Legacy `Nav` | Legacy `Nav` |
| Dark fiche tokens | `#0a0f0e` / `#1dcfaa` on body | OKLCH `tokens-impact.css` | Hex fiche tokens in visual-pass CSS |
| Side margin labels | `.margin-note` | none | none |
| Corner stamps | `.fig-stamp` | none | partial — sheet corner spans on Wipro profile/handoff |
| ID strip | `.id-strip` | `.id-card` (different layout) | `.impact-id-strip` (closer match) |
| Section FIG blocks | kicker + stamp | plain `.section-head` | `SectionBreak` + FIG meta |
| Sheet footer | `.sheet` 6-cell | `.foot` 3-column | `.impact-sheet-footer` 6-cell |
| DimRibbon / dimension grammar | yes | no | no |
| Body class scoping | `about-v3-active` | `.impact-console` wrapper only | `.impact-console.impact-shell` |

About and Impact are **different chrome families** on `tier-a-rebuild`. Visual-pass moves Impact toward the fiche register (sheet footer, id-strip, FIG section breaks) but still skips FicheNav and margin-note grammar.

---

## Section 6 — Known bugs on Impact

### Branch context

| Bug | `tier-a-rebuild` | `impact-visual-pass` |
|---|---|---|
| Wipro stress curve black rectangle | N/A — tab uses `.compare` text columns, no SVG curve | **Present** |
| EY scroll flicker | N/A — hover/click city activation (`ImpactShell.tsx` ~46, ~670–698) | **Present** (partial fixes in place) |
| Wipro `+13%+` | **Present** — `13%+` without leading plus | **Present** — same copy bug |

---

### 1. Wipro stress curve renders as black empty rectangle

**Branch:** `impact-visual-pass`  
**Symptom:** Graph axis labels render; lane fills and curves missing or appear as solid black block.

**Root cause:** CSS selector / className mismatch.

- Host element class: `impact-profile p2` (`WiproProfile.tsx` line **142**)
- SVG styling selectors: `.impact-p2 .curve-before`, `.impact-p2 .lane-before`, etc. (`impact-visual-pass.css` lines **534–580**)

The wrapper uses class `p2` but all SVG element styles require ancestor `.impact-p2`. Unstyled SVG `<rect class="lane-before">` elements default to `fill: black`, producing the empty black rectangle. Curve paths get no stroke styling and remain invisible.

**Fix prompt size:** ~1 line — change `p2` → `impact-p2` on the host div (or rename CSS selectors to match `.p2`).

---

### 2. EY scroll behavior — end-of-program flash + rapid city toggling

**Branch:** `impact-visual-pass`  
**File:** `src/components/impact/EYFootprint.tsx`

**Tab activation reset (lines 74–86):** On `tabActive`, sets Atlanta and disables IO for 200ms. Intended to prevent stale city on tab switch.

**Remaining flash to "end of program":** `CITY_ORDER` includes `"sum"` (summary / complete panel) at line **22**. The map end-stamp (`.map-endstamp`, line **245**) lights when `activeCity === "sum"`. On tab activation, if scroll position leaves the summary panel closest to the 25% evaluation line before the reset completes, or if the summary panel intersects the IO band, `evaluate()` (lines **93–114**) can select `sum` briefly.

**Rapid toggling during scroll:** `IntersectionObserver` (lines **117–125**) uses `rootMargin: "-25% 0px -50% 0px"` and `threshold: [0, 0.2, 0.5, 1]`. Every threshold crossing fires `evaluate()`, which picks whichever panel top is closest to `vh * 0.25`. With four panels + summary, small scroll movements swap the "winner" — no hysteresis beyond `setActiveCityStable`'s equality check (lines **65–68**).

**Fix prompt hints:** Exclude `sum` from IO evaluation until user scrolls past last city panel; increase IO delay; add scroll-direction hysteresis or sticky snap; narrow rootMargin.

**`tier-a-rebuild` equivalent:** No IO — `activeCity` state with hover/click handlers in `ImpactShell.tsx` (lines **46**, **670–698**). Different bug class.

---

### 3. Wipro hero metric reads `13%+` — needs `+13%+`

**Branch:** both (copy bug)

| Branch | File | Line | Current markup |
|---|---|---|---|
| `tier-a-rebuild` | `src/components/impact/ImpactShell.tsx` | **367** | `<em>13</em>%+` |
| `impact-visual-pass` | `src/components/impact/ImpactShell.tsx` | **235** | `13<span className="unit">%+</span>` |

Autodesk hero on same pages correctly uses leading plus: `$<em>50</em>M+` (tier-a-rebuild line **244**) / `<span className="accent">+$</span>50…` (visual-pass line **~189**).

**Fix:** Add `+` before `13` in Wipro hero metric markup.

---

## Section 7 — Recommendations (read-only assessment)

### Canonical chrome treatment

**Home v2 + About v3 + Tier A case studies** share a clear canonical stack:

1. `ConditionalSiteChromeClient` hides legacy Nav/Footer
2. `FicheNav` (pill nav, Contact CTA)
3. Dark fiche tokens (`#0a0f0e`, `#1dcfaa`)
4. `.margin-note` + `.fig-stamp` + `.sheet` footer grammar
5. Case routes add `CaseHero` id-strip and `DimRibbon` dimension breaks

This is the register Impact should align with for the visual port prompt.

### Refactor path (documentation only — not proposing implementation)

Two viable paths observed in the codebase:

1. **Extract shared primitives** from the canonical stack (`FicheNav` already shared; add shared `SheetFooter`, `MarginNote`, `FigStamp`, `IdStrip`, `DimRibbon` components; unify token file for `.fiche-root`)
2. **Per-route CSS bundles** (current state) — works but duplicates grammar CSS across `home-v2/`, `about-v3/`, and five case bundles

Impact visual-pass took a hybrid: new React helpers (`SectionBreak`, `CatBadge`) but parallel CSS (`impact-visual-pass.css`) instead of importing `grammar.css`.

**Lowest-friction port alignment:** Wire `FicheNav` on Impact, import fiche grammar CSS, map existing visual-pass classes to shared patterns, fix the `p2`/`impact-p2` typo before QA.

### Components that should clearly be shared but aren't

| Pattern | Copies today |
|---|---|
| `DimRibbon` | 3 identical inline functions (Autodesk, Wipro, EY case views) |
| Sheet footer markup | Home, About, 4 case views, Impact (3 different implementations) |
| ID strip | Home (`hero__identity`), About (`id-strip`), CaseHero (`hero__id-strip`), Impact (`id-card` / `impact-id-strip`) |
| Dark fiche tokens | 4+ CSS files with near-identical variable blocks |
| Section stamp triple (margin-note + fig-stamp + section-stamp) | Per-case copy-paste |

### Surprising / flag before Impact visual port

1. **`impact-visual-pass` not on `tier-a-rebuild`** — audit of live preview branch differs from default branch; merge decision pending.
2. **Dual CSS on visual-pass** — `globals.css` imports both `impact.css` and `impact-visual-pass.css`; overlapping `.impact-console` token blocks may fight.
3. **`impact-brand-bar` CSS is dead code** on visual-pass — prototype sticky bar never wired; page still uses legacy Nav.
4. **Font mismatch** — visual-pass spec calls for Helvetica Neue + IBM Plex Mono; production loads Inter Tight + JetBrains Mono. SVG labels reference IBM Plex Mono without `@font-face`.
5. **Teal mismatch** — fiche register uses `#1dcfaa`; visual-pass uses `#2dd4b2`. Impact will look slightly different from Home/About even after port unless tokens are reconciled.
6. **Wipro curve bug is a one-character-class typo** — not an SVG data or animation problem.
7. **`ConditionalSiteChromeClient` whitelist** — adding Impact to fiche chrome requires either adding `/impact` to `hideLegacyChrome` and rendering `FicheNav` inside Impact, or accepting double-nav if FicheNav is added without updating the whitelist.

---

## Appendix — Key file index

```
src/app/layout.tsx
src/components/layout/ConditionalSiteChromeClient.tsx
src/components/layout/FicheNav.tsx
src/components/layout/Nav.tsx
src/components/layout/Footer.tsx
src/components/home-v2/HomePagePort.tsx
src/app/about/AboutV3View.tsx
src/components/case-studies/CaseShell.tsx
src/components/case-studies/CaseHero.tsx
src/components/impact/ImpactPage.tsx
src/components/impact/ImpactShell.tsx
src/app/tokens-impact.css
src/app/impact.css
src/styles/tier-a/fiche-nav.css
src/styles/home-v2/tokens.css
src/app/about/about-v3/about-v3-tokens.css
```

**Visual-pass branch (unmerged):**

```
src/components/impact/WiproProfile.tsx
src/components/impact/wipro-profile-svg.ts
src/components/impact/EYFootprint.tsx
src/components/impact/impact-shared.tsx
src/styles/impact-visual-pass.css
```
