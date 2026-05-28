# Handoff · Impact Page

`portfolio.m-stangl.com/impact` — the numbers-led counterpart to the case studies. Three enterprise transformations (Autodesk · Wipro · EY) told as instruments, not slide decks.

---

## About the design files

Everything in `prototype/` is a **design reference written as a working HTML page**, not production code to copy verbatim. The build is a single self-contained file (inline `<style>`, vanilla JS, inline SVG) so it can be opened, inspected, and screenshotted directly — but the task is to **recreate the design in the target codebase's stack** (React / Next.js / Astro / whatever the portfolio sits in), using its component patterns, type system, and bundler conventions.

The HTML is fluent in *what* the page is supposed to do and look like. It is not a recommendation about *how* to build it.

`source-of-truth/` holds the locked content + design rules. `reference/about-page.html` is the visual register benchmark — the Impact page must feel like it lives on the same sheet of paper as About.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, and interaction models are all locked. Recreate pixel-perfect.

Two exceptions explicitly flagged as deferred:

1. **The Georgia SVG path** in Tab 03 is a placeholder polygon, marked `SVG · PLACEHOLDER · TBD` in the corner. Source the real state outline at port time. Annotate the placeholder area in any interim builds.
2. **The leader-line geometry** in Tab 01 is computed in JS against `getBoundingClientRect()`. The target framework should re-implement this using a ref + ResizeObserver pattern; the math itself is correct in the prototype.

## Source of truth — read first, in order

1. `source-of-truth/COPY-impact.md` — every string on the page. **Do not paraphrase. Do not invent metric values.** Service counts (6/4/5), the `+$50M+`, the `13%+ NPS goal exceeded`, the per-city splits — all locked.
2. `source-of-truth/DESIGN-NOTES.md` — the fiche register rules and what they're for.
3. `source-of-truth/visual-grammar.md` — type, color, spacing, sheet-furniture conventions.
4. `source-of-truth/intrigue-moves.md` — why each tab uses a different metaphor and animation discipline.
5. `reference/about-page.html` — the visual register benchmark.

## The page in one sentence

A console-style impact ledger with three tabs, each carrying one transformation and one metaphor: **Autodesk = exploded mechanical assembly**, **Wipro = test-bench stress profile**, **EY = scroll-driven pin sequence**.

---

## Screens / Views

The page is one route with three tabs. URL: `/impact` with hash `#tab-01`, `#tab-02`, `#tab-03` syncing the active tab.

### 0. Page chrome (persistent across tabs)

| Element | Notes |
|---|---|
| Brand bar | Sticky top. `+M · STANGL` mark left; nav links right (About / **Impact** / Case Studies / Signal · Story). Mono caps, 11px, letter-spacing 0.08em. Active link has a teal 1px underbar. Background `rgba(10,15,14,0.92)` with `backdrop-filter: blur(8px)`. |
| Breadcrumb | `● CONSOLE / Impact / [active tab]` on the left; operator sig `Matt Stangl · CX, Product & Service Design Leader` on the right. Mono 11px caps. The active segment is `var(--ink-0)`; separators are `var(--ink-3)`. Hides the sig on ≤640px. |
| Title block | Two columns at ≥880px, collapses to one below. Left: kicker `IMPACT · 2020–2026` (teal, mono caps), h1 `Three enterprise transformations. In numbers.` (sans 500, clamp 34–60px, max-width 18ch, text-wrap balance), sub `What shipped, what moved, what carried.` Right: 4-row ID strip (Operator / Role / Engagements / Scope) — bordered, mono caps, corner ticks at top-left and bottom-right via pseudo-elements. |
| Tab nav | Sticky below brand bar (top: 46px). 3 equal columns, border between. Each tab: `01 / Revenue` (mono, teal when active), `Service as revenue motion` (sans 500, hidden on ≤640px), `AUTODESK` (mono, ink-2). Selected tab has a faint teal background tint and a 2px teal underbar at the bottom. Keyboard: left/right arrows cycle. |
| Closing CTA | Persists across tabs. `↘ CASE STUDIES` ruler, eyebrow `Handoff · the larger story`, h3 `The work behind the numbers, in case study form.`, CTA box `Open case studies → /case-studies/autodesk` with the URL faintly visible to the right of the arrow. |
| Sheet footer | 6-col grid: Sheet / Scale / Drawn / Approved / Date / Rev. Mono caps. Always at page bottom. |

### 1. Tab 01 · Autodesk · Assembly (default)

**Purpose:** Communicate the post-purchase service ladder — three tiers × 15 total services — with classification of which services were innovated vs. optimized vs. refined.

**Layout, top to bottom:**

1. **Category badge:** `01 · ASSEMBLY · AUTODESK` (boxed, mono caps; `01` and `ASSEMBLY` highlighted, separators dim).
2. **Hero:** two columns at ≥880px.
   - Left: h2 `My team designed Autodesk's new Post-Purchase Model.` (sans 500, clamp 26–40px, max-width 22ch). The phrase `Post-Purchase Model` is `<em>` styled italic + teal. Below, role line `I led strategy, design direction, and experience reviews on the new post-purchase service model.`
   - Right: hero metric `+$50M+` (sans 500, clamp 44–76px; `+$` rendered in teal as `.accent`, `M+` rendered as `.unit` at 0.45em ink-2). Label `Projected incremental revenue · YoY after 2 quarters` (mono caps, right-aligned).
3. **3-cell metric strip:** `+27% Revenue lift · Q1 post-launch` / `106% NRR path` / `75%+ Business Plan renewal · Q1`. Bordered, divided by 1px rules. Number is 24px sans 500; `%` `M` `+` are mono ink-2 at 13px.
4. **Section break:** `↓ The three-tier service ladder · Tap a tier to open` left; `FIG. 01-A · Assembly` / `Exploded view` right.
5. **Assembly stage** (`.assembly`):
   - Container has a faint 48px grid (linear-gradient) and a soft radial teal glow at center. Corner stamp `SHEET 01-A · 1 : 1` top-right.
   - Stack of three tiers, each row is `1fr | min 360px max 520px | 1fr` (left chips · tier deck · right chips). At ≤880px collapses to a single column with chips in a 2-col grid below the deck and leader lines removed entirely.
   - **Tier deck** (the center strip): three-column grid (`auto 1fr auto`), border, padded, has part-number `T01` (mono, teal when active), name `Business Plan · Premium` (sans 500, 16–18px), lift line `950 customers · 6 services · coaching`, and a `›` chevron on the right edge (hidden when active).
   - **Active state:** padding increases from 14px → 22px, border becomes teal, background gains a vertical teal gradient and a 4px low-opacity teal box-shadow halo. Description paragraph appears below.
   - **Stowed state:** full opacity (deliberately *not* dimmed — the spec calls this "available, not disabled"). Border is `var(--teal-low)` at low saturation. Chips for stowed tiers have `opacity:0` and are not interactive.
   - Animation: 600ms `cubic-bezier(.2,.7,.2,1)` on padding + transform; 280ms on color/opacity.
   - **Leader lines:** an absolute SVG overlay (`#leaders`) draws polyline leaders from each visible chip's inner edge to the tier deck's near edge, with a small teal disc at the deck attach point. Recomputed via `requestAnimationFrame` after every tier change and on resize. Stroke is `var(--teal-low)`.
6. **Classification legend:** three swatches (`Innovated` full teal disc / `Optimized` half teal / `Refined` outlined). Mono caps.

**Chips (the 15 services):**

| Tier | Side | Position | Service | Class |
|---|---|---|---|---|
| T01 | L | 01-A | Strategic success planning | innovated |
| T01 | L | 01-B | Executive business review | innovated |
| T01 | L | 01-C | Adoption roadmap | innovated |
| T01 | R | 01-D | Named success manager | optimized |
| T01 | R | 01-E | Quarterly health score | optimized |
| T01 | R | 01-F | Priority escalation | refined |
| T02 | L | 02-A | Deployment accelerators | innovated |
| T02 | L | 02-B | Capability workshops | optimized |
| T02 | R | 02-C | Integration advisory | optimized |
| T02 | R | 02-D | On-demand expert hours | refined |
| T03 | L | 03-A | Guided onboarding | innovated |
| T03 | L | 03-B | Self-serve learning paths | innovated |
| T03 | L | 03-C | Community access | optimized |
| T03 | R | 03-D | Knowledge base | refined |
| T03 | R | 03-E | Product telemetry nudges | refined |

Service counts per tier: **6 / 4 / 5** — verify this; previous drafts had `8/?/?`.

### 2. Tab 02 · Wipro · Profile

**Purpose:** Communicate a before/after stress reduction in case lifecycle, plus a 3-tier resolved-at-lowest-tier handoff model.

**Layout, top to bottom:**

1. **Category badge** `02 · PROFILE · WIPRO`.
2. **Hero.** Left: h2 `I unified six service towers into one operating model.` (`<em>operating model</em>` is italic teal). Role line: `At Wipro, I led transformation across six ITIL service towers for Estée Lauder, building the frameworks, metrics, and delivery model that improved NPS past goal.` Right metric: `13%+` (NOT −31% — that's the MTTR figure inside the curve). Label `NPS goal exceeded`.
3. **3-cell metric strip:** `30+ Outcomes shipped` / `3 Handoff tiers` / `13K Annual reduction in lockout cases`.
4. **Section break** `↓ Before vs. after, unified service delivery · Normalized across ticket classes` / `FIG. 02-A · Test bench` / `RUN 01 → RUN 02`.
5. **Stress-profile graph** — Option 2 from the brief: **shared canvas, strong framing.** Both curves overlaid on one SVG. See "Stress curve geometry" below for details.
6. **Section break** `↓ The redesigned handoff, tier by tier · Flow → speed` / `FIG. 02-B · Lifecycle` / `Resolve at lowest tier`.
7. **Handoff timeline** — 3 horizontal nodes (T1 · Triage & resolve / T2 · Specialist engage / T3 · Product & engineering) with arrow connectors. Each node has a number-in-square `T1/T2/T3` mark, a 17px label, body copy, and a bottom SLA target. SLA targets: `< 4h`, `< 2d`, `< 5d`. Collapses to a vertical column with down arrows at ≤880px.

**Stress curve geometry (the load-bearing visual):**

- SVG injected by JS into `#profileGraph`. Two viewBoxes available:
  - Horizontal `0 0 1000 460` for ≥640px
  - Vertical `0 0 460 1000` for ≤640px (true re-draw, not CSS rotation)
- The render is gated by `graphHost.querySelector('svg')` (not `innerHTML.trim()` — a previous bug let an HTML comment defeat the guard).
- Lane shading: faint `var(--rev)` (#c47155) full-canvas behind the before zone, faint `var(--teal)` (#2dd4b2) narrower behind the after zone.
- **Before curve:** crashes 3 times to the distressed lane at D2.1, D3.5, D5.4 (the `⚠ RESTART · CONTEXT LOST · Dx.x` annotations). Resolves at D6.8 (top of canvas, calm).
- **After curve:** monotonic descent from calm at D0 to calm at D4.7. Visually sits *above* the before-curve at every comparable point.
- Annotations: `✓ NAMED OWNER · D0`, `✓ CONTEXT PRESERVED · D2`, `✓ RESOLVED · D4.7` (mono teal, dashed leaders).
- Stamps: `RUN 01 · LEGACY` (rev, dashed border) at the before-curve endpoint; `RUN 02 · REDESIGN` (teal, dashed border) anchored to the after-curve's mid-arc.
- Delta callout above the after-curve endpoint: `6.8 D → 4.7 D · −31% MTTR` with `≈ 2.1 days returned per case` as a sub-line. Two dimension arrows brackets the D4.7–D6.8 range.

**Animation discipline (Wipro):** fire-once on scroll-into-view via `IntersectionObserver` at threshold 0.18.
- Before-curve stroke-draws over 1400ms (cubic-bezier .55,.05,.5,.95) starting at 80ms.
- Before-curve shade fades in at 1300ms (600ms).
- Restart annotations + before-stamp + before-endpoint fade in at 900ms (400ms).
- After-curve stroke-draws over 1200ms starting at 1700ms.
- Preserve annotations + after-stamp + after-endpoint fade in at 2500ms (400ms).
- Delta callout fades in at 3000ms (500ms).
- **Reduced motion:** all opacity:1, all `stroke-dasharray:none`, no animation. Final state immediate.

### 3. Tab 03 · EY · Footprint

**Purpose:** Communicate Georgia's 3-hub COVID engagement program — awareness at scale, activation through partners.

**Layout, top to bottom:**

1. **Category badge** `03 · FOOTPRINT · EY`.
2. **Hero.** Left: h2 `A national-best-practice COVID engagement program.` (`COVID engagement program` is italic teal). Role line: `At EY, I led the experience design for Georgia's two-stage COVID-19 engagement program — awareness at scale, activation through partners. CDC-recognized national best practice.` Right metric: `4.57M → 715` (the `→` is ink-2, smaller; `715` is teal accent). Label `Engagements → vaccinations · gap by design`.
3. **3-cell metric strip:** `4.57M Engagements (program-attributed)` / `715 Vaccinations (program-attributed)` / `8M+ Statewide vaccinations during comms leadership`. (Note: previous drafts had a 4th `3 City hubs` cell — that's now dropped.)
4. **Section break** `↓ Georgia delivery footprint · Scroll the cities` / `FIG. 03-A · Delivery` / `3 hubs · sequenced`.
5. **Footprint** — two-column grid at ≥880px: left sticky map, right scroll panels. Collapses to one column at ≤880px; map becomes non-sticky at ≤480px.

**Sticky map (left column):**
- `position: sticky; top: 140px` at ≥880px; reduces to ~50vh tall at tablet; non-pinned at ≤480px.
- SVG viewBox `0 0 600 600`. Contains:
  - Faint grid (`var(--ink-4)`, stroke-dasharray 2 5)
  - Georgia outline (**placeholder polygon** — `class="outline"`, the `d=""` path is hand-drawn approx and must be replaced at port time)
  - Three routes between hubs (`#route-atl-ath`, `#route-atl-sav`, `#route-ath-sav`) — dashed ink-3 by default, transition to solid teal when `.lit`
  - Compass rose bottom-right, scale bar bottom-left
  - Stamps: `FIG. 03 · DELIVERY FOOTPRINT` top-left, `SVG · PLACEHOLDER · TBD` top-right
- **Pin markers** (HTML overlays positioned with `%` from container, not SVG coordinates — keeps them legible at any size). Each marker has a 14px dot + a labeled chip (`ATL · Hub-01` etc.). Active state turns dot teal with a 5px low-opacity ring and the label border + color goes teal.
- **Map progress pill** bottom-left: 3 pips + `You are here · 1 / 3 · Atlanta`. Pips fill teal as cities activate.
- **End-of-program stamp** top-center: dashed teal border, `End of program · 3 hubs lit`. Hidden until the summary card is in view.

**Scroll panels (right column):**
- Four `.city-panel` articles stacked. The first three are `ATL`, `ATH`, `SAV`; the fourth (`#panel-sum`) is the summary card.
- Each city panel: part number (`HUB-01 · Atlanta`), h4 (`Metro hub · anchor partner sites`), frame label (mono caps), body paragraph, 2-cell stats grid (`Engagements` / `Vaccinations`).
- Active panel border turns teal, gains a vertical teal gradient background.
- Summary panel: dashed teal `End of program · footprint complete` stamp, h4 `Three hubs. One program.`, 3-cell totals grid `4.57M Aware / 715 Vaccines / 3 Hubs` with teal borders.

**Per-city data (locked):**

| ID | City | Frame | Engagements | Vaccinations |
|---|---|---|---|---|
| atl | Atlanta | Metro hub · anchor partner sites · Reach & depth | 2.41M | 452 |
| ath | Athens | Twilight Criterium · UGA Athletics partnership · Cultural anchor | 1.65M | 175 |
| sav | Savannah | Coastal delivery · mobile teams · Last-mile reach | 0.51M | 88 |

(Sum: 4.57M engagements, 715 vaccines — math reconciles.)

**Animation discipline (EY):** scroll-continuous via `IntersectionObserver`.
- `rootMargin: '-25% 0px -50% 0px'` with thresholds `[0, 0.2, 0.5, 1]`.
- Each frame, score visible panels by `-Math.abs(rect.top - vh*0.25)`, pick the highest score, call `setActiveCity(city)`.
- `setActiveCity` lights *cumulative* pins (all hubs up to and including the current one stay lit) and lights routes only when both endpoints are lit.
- When `panel-sum` is active: end-stamp shows, progress label reads `3 / 3 · Complete`, all 3 routes solid.

---

## Interactions & behavior

### Tab switching
- Click any `.tab-btn` to switch; the corresponding `.tab-panel` reveals (others get `hidden` attribute).
- ←/→ on a focused tab cycles between tabs.
- Switching to tab 02 triggers `startProfileIfNeeded()` (fires the curve animation if not already fired).
- Switching to tab 03 triggers `refreshCityActive()` to re-evaluate which city panel is in view.
- Breadcrumb's last segment updates to the active engagement name.
- `location.hash` syncs to `#tab-01|02|03` via `history.replaceState` (no scroll jump).
- On switch (only if scrolled past 320px), the page scrolls back up to the tab nav so the user lands on the fresh hero.

### Autodesk tier interaction
- Click any tier deck (the center strip) → that tier becomes `data-state="active"`, others become `stowed`.
- Animation is ~600ms, eased. Fire-once per click.
- Leader lines redraw via `requestAnimationFrame(requestAnimationFrame(drawLeaders))` after state change.
- On window resize, leaders redraw with a 120ms debounce.

### Wipro stress curve
- Fires once when `IntersectionObserver` reports `isIntersecting && !profile.hidden`.
- Sets `.is-anim` class on `.profile`; all CSS animations are children of that class.
- `prefers-reduced-motion: reduce` short-circuits to final state.

### EY scroll-pin
- Continuous, as described above.
- Capped at ~80vh on desktop via `.map-stage { max-height:80vh }` — the "no infinite scroll-jail" mitigation.
- Final state explicitly unpins via the summary card displacing the sequence.

### Reduced motion (respected everywhere)
- Global CSS rule sets all animation / transition durations to 0.001ms.
- Curves get `stroke-dasharray: none` and `stroke-dashoffset: 0`.
- All `.is-anim` descendants get `opacity: 1`.

---

## State management

Single-page state, no backend.

| State | Type | Where it lives | Triggered by |
|---|---|---|---|
| Active tab | `'01' \| '02' \| '03'` | DOM (`aria-selected` on `.tab-btn`, `hidden` on `.tab-panel`), mirrored to `location.hash` | Tab click, ←/→ on focused tab, initial hash read on load |
| Active tier (Autodesk) | `'01' \| '02' \| '03'` | DOM (`data-state` on `.tier`) | Tier deck click |
| Profile animation fired | `boolean` (`profileFired`) | Module-scope JS | First `IntersectionObserver` intersection of `#profile`, or tab switch to 02 |
| Active city (EY) | `'atl' \| 'ath' \| 'sav' \| 'sum'` | DOM (`.is-active` on `.city-panel` + pin markers + pips) | `IntersectionObserver` on `.city-panel` |
| Profile graph orientation | `'horizontal' \| 'vertical'` | `data-orient` on `#profileGraph` | Mount + window resize (debounced 140ms) |

No fetch / no API. The page is pure presentational.

---

## Design tokens

All declared as CSS custom properties on `:root` in `prototype/Impact (Build).html`. Copy these verbatim into the target codebase's token system.

### Color

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0f0e` | Page background |
| `--bg-soft` | `#0d1413` | Secondary surfaces |
| `--plate` | `#0e1716` | Cards / instrument plates |
| `--plate-2` | `#11201d` | Raised plates |
| `--ink-0` | `#e8efec` | Primary text |
| `--ink-1` | `#b6c2bd` | Body text |
| `--ink-2` | `#6f7d78` | Muted text, mono caps |
| `--ink-3` | `#3a4744` | Hairlines, dim labels |
| `--ink-4` | `#1d2624` | Grid lines |
| `--rule` | `#1a2422` | Dividers, borders |
| `--teal` | `#2dd4b2` | Primary accent |
| `--teal-dim` | `#1d8c75` | Hover/depth |
| `--teal-low` | `rgba(45,212,178,0.22)` | Leader lines, faint shading |
| `--rev` | `#c47155` | "Reverse" / before-state color (typewriter red-orange) |

**Discipline rule from the brief: one teal accent per viewport.** Don't multiply hot colors.

### Type

| Token | Value | Use |
|---|---|---|
| `--sans` | `"Helvetica Neue", "Helvetica", system-ui, -apple-system, sans-serif` | All running text |
| `--mono` | `"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace` | All caps labels, part numbers, stamps |

IBM Plex Mono is loaded from Google Fonts (`weights 400, 500`). If the target codebase has a mono font already, prefer that.

**Type ramp:**

| Use | Family | Weight | Size | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| h1 (title) | sans | 500 | `clamp(34px, 4.6vw, 60px)` | −0.024em | 1.04 |
| h2 (hero) | sans | 500 | `clamp(26px, 3.1vw, 40px)` | −0.018em | 1.1 |
| Hero metric value | sans | 500 | `clamp(44px, 5.8vw, 76px)` | −0.028em | 0.95 |
| Hero metric label | mono | 400 | 11px | 0.16em | — |
| Metric-strip value | sans | 500 | 24px | −0.015em | 1 |
| Metric-strip label | mono | 400 | 10px | 0.14em | — |
| Body | sans | 400 | 15px | −0.005em | 1.55 |
| Sub / role line | sans | 400 | 15px | — | 1.55 |
| Mono caps (general) | mono | 400 | 11px | 0.14–0.18em | — |
| Tier deck name (active) | sans | 500 | 18px | −0.005em | — |
| Tier deck name (stowed) | sans | 500 | 16px | −0.005em | — |
| Chip name | sans | 400 | 12px | −0.005em | — |
| Chip pn | mono | 400 | 10px | 0.08em | — |

### Spacing

| Token | Value | Use |
|---|---|---|
| `--gutter` | `clamp(20px, 4vw, 64px)` | Page horizontal padding |
| `--maxw` | `1280px` | Page max-width |

No formal scale; spacing values used inline. Common ones: 8, 14, 16, 18, 24, 32, 40, 48 px.

### Borders / radii / shadows

- **No border radii.** The fiche register is right-angled throughout. If you find yourself reaching for `border-radius`, you're off-register. Exception: pin marker dots (50% circles), the breadcrumb dot, the brand-bar `+` mark inner square (also right-angled).
- **Borders** are always 1px solid, color one of `--rule` / `--ink-3` / `--teal-low` / `--teal`.
- **Shadows** are restricted to the active-tier teal halo: `0 0 0 4px rgba(45,212,178,0.06)`. Nothing else casts a shadow.

### Breakpoints

| Width | Effect |
|---|---|
| ≤ 880px | Title block → 1 column; hero → 1 column; metric strip → 2-col grid; assembly chips → 2-col grid below deck, leader lines removed; handoff timeline → vertical with down arrows; footprint → 1 column, map non-sticky reduces |
| ≤ 640px | Tab labels hide their middle line; profile graph swaps to vertical viewBox |
| ≤ 480px | ID strip + sub copy hide; metric strip → 1 column; assembly chips → 1 column; map non-pinned; sheet footer → 2-col |
| ≤ 390px | Tab num font shrinks |

---

## Assets

| Asset | Source | Treatment |
|---|---|---|
| IBM Plex Mono | Google Fonts CDN | Loaded via `<link rel="stylesheet">`. Bundled inline in the standalone build. |
| Georgia outline (Tab 03) | **placeholder** — replace at port time | Inline SVG path. Real polygon TBD. |
| Compass rose, scale bar | inline SVG, hand-drawn primitives | OK to keep as-is. |
| All other illustration | inline SVG | OK. No raster anywhere. |
| Icons | none | The fiche register avoids icons; communicate via type + glyph (`+`, `↓`, `›`, `→`, `↘`, `↑`, `⚠`, `✓`). |

---

## Vocabulary firewall

The brief calls these out as forbidden — do not introduce them at port time either.

- ❌ No aerospace / mission-control language. No "Live Briefing", no "Telemetry feed", no "Mission Control".
- ❌ No emoji.
- ❌ No "card with rounded corners and a colored left border."
- ❌ No horizontal `←——→` dimension-rule grammar except in the Autodesk hero (if used) and the EY hero (`4.57M → 715`).
- ❌ No new FIG stamps, datum letters, GD&T frames added beyond what's in the prototype. The fiche grammar is locked at three FIG-marked sections (`FIG. 01-A`, `FIG. 02-A`, `FIG. 02-B`, `FIG. 03-A`) plus sheet stamps. Don't multiply.

---

## Files in this package

| Path | Purpose |
|---|---|
| `prototype/Impact (Build).html` | Single-file working prototype. Open in a browser. All interactions live. |
| `source-of-truth/COPY-impact.md` | Locked copy for every string on the page. |
| `source-of-truth/DESIGN-NOTES.md` | Fiche register rules. |
| `source-of-truth/visual-grammar.md` | Type / color / spacing / sheet-furniture conventions. |
| `source-of-truth/intrigue-moves.md` | Why each tab uses a different metaphor and animation discipline. |
| `reference/about-page.html` | Visual register benchmark — the Impact page must feel like it lives on the same sheet as About. |

---

## Confidence tags (carried forward from the build pass)

- **LOAD-BEARING** — page chrome (title block, ID strip, breadcrumb, sheet footer, tab nav), Autodesk hero metric, Wipro hero metric, EY hero metric, EY per-city stats. Don't move them.
- **STRONG** — Wipro stress-curve geometry + Option-2 framing (shared canvas, lane shading, stamps anchored to endpoints, dimension callout). Don't redesign at port time.
- **EXPLORATORY** — leader-line geometry in Tab 01 (works in JS, may benefit from a different implementation strategy in the target framework); EY map polygon (placeholder, replace).

---

## Three failure modes the brief explicitly named

1. **Decorating instead of executing.** If a feature isn't landing in the target stack, fix the feature. Don't add fiche grammar to compensate.
2. **Service inventory pretending to be a service inventory.** The 15 chips must use the exact service names above. "SSO" / "Login" / generic placeholders are not acceptable.
3. **"Mobile is the page minus its features."** Every move works at 380 / 640 / 1024. The mobile presentation is a real redraw, not omission.
