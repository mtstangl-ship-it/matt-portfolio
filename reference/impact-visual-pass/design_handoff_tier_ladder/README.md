# Handoff: Tier Ladder — Cumulative Inheritance Diagram (Autodesk · Impact page)

## Overview

The **Tier Ladder** is an interactive visualization for the Autodesk section of the
Impact portfolio page. It communicates a three-tier customer-service model where each
higher tier *cumulatively inherits* the services of the tiers below it, then adds its own:

```
T03 (5 services)  →  T02 (T03's 5 + 4 added = 9)  →  T01 (T02's 9 + 6 added = 15)
```

The hero visual is a **concentric-ring diagram**: three nested rings, one per tier, with
one dot per service placed on its native ring. Tapping a tier (or any dot) lights that
tier's full inherited set — so the *lit area is the math*. Above the rings sits a
subordinate **launch strip** (a thin 12-month timeline) carrying the phased-rollout story
as scenography without competing with the hero.

This component is the outcome of two sketch rounds. The decision record lives in
`reference/Tier Ladder SR-02 Diverge.html` (the diagnosis + the three explored directions
+ the recommendation that produced this build). Read it if you want the "why".

## About the design files

The files in this bundle are **design references created in HTML** — a working prototype
showing the intended look and behavior. They are **not** production code to copy
verbatim. The task is to **recreate this design in the target codebase's existing
environment** (React, Vue, Svelte, etc.), using its established component patterns,
styling approach, and conventions. If no front-end environment exists yet, pick the most
appropriate framework for the project and implement it there.

The prototype is plain HTML + one inline vanilla-JS IIFE + inline SVG. It has no build
step and no dependencies beyond a Google Fonts stylesheet. You can open
`Tier Ladder Build.html` directly in a browser to interact with the real thing — that is
the source of truth for behavior.

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, geometry, and interactions
are all specified here and present in the prototype. Recreate the UI pixel-accurately
using the codebase's libraries and patterns. The exact hex values, ring radii, dot
counts, and copy below are authoritative.

---

## Screens / Views

There is one view — the Tier Ladder section — composed of three stacked blocks inside a
centered page column (`max-width: 1280px`, horizontal gutter `clamp(20px, 4vw, 56px)`).

### Block 1 · Section break (header)

- **Purpose:** Section divider matching the rest of the Impact page's "fiche" register.
- **Layout:** Full-width flex row, space-between, baseline-aligned. Top + bottom 1px rules
  (`--rule`). Vertical padding 14px.
- **Left:** `↓ The three-tier service ladder · Tap a tier to light its set`
  — monospace, 11px, letter-spacing 0.18em, uppercase, color `--ink-1`. The `↓` arrow is
  `--teal`.
- **Right:** `FIG. 02 · TIER LADDER · CUMULATIVE INHERITANCE` — monospace, same scale,
  color `--ink-2`; the words `CUMULATIVE INHERITANCE` are `--ink-0`.

### Block 2 · Launch strip (subordinate timeline)

- **Purpose:** Carries the phased-rollout story (JAN → DEC 2025) as scenography. It is
  deliberately *subordinate* to the ring diagram — small, quiet, one accent.
- **Layout:** `margin-top: 28px`. 1px border `--ink-4`, background `--bg-soft`, padding
  `22px 28px 26px`. Two-column grid: `168px` eyebrow column + `1fr` axis column,
  `gap: 32px`, vertically centered. Collapses to a single column below 980px.
- **Eyebrow column** (left), stacked monospace uppercase:
  - Kicker `↓ 12-MO ROLLOUT` — 10px, letter-spacing 0.22em, `--ink-2`
  - Title `JAN → DEC 2025` — 13px, letter-spacing 0.16em, `--ink-1`; the `→` is `--ink-0`
  - Fig stamp `FIG. 02-A · TIMELINE · SCENOGRAPHY` — 9px, `--ink-3`, with a 1px top border
- **Axis column** (right): a `position: relative` band, height 84px, padding `14px 12px 18px`.
  - **Time rule:** 1px horizontal line `--ink-3`, vertically centered, inset 12px left/right.
  - **Always-on bar:** 2px `--teal-dim` line, 8px below the rule, full inset width — represents
    T03 being in market the whole period.
  - **T01 in-market range:** 2px `--teal` line, 10px above the rule, spanning 50%→100%
    (JUL→DEC).
  - **Ticks:** three 1px `--ink-2` vertical ticks (10px tall) at 0%, 50%, 100%.
  - **Events** (3): absolutely positioned at `left: 0 / 50% / 100%`, each a centered stack of
    {label above, dot, when-label below}.
    - Dots are 9px circles. T03 dot uses `--teal-dim` + dim glow; T01 dot `--teal` + teal glow;
      T02/NOW dot `--rev` (#c47155) + warm glow.
    - **Edge handling (important):** the first event (`.start`, JAN) anchors its labels
      `left: 0` so they extend *rightward* and don't overflow the axis; the last event
      (`.end`, DEC) anchors `right: 0` so labels extend *leftward*. The middle event centers
      with `translateX(-50%)`.
    - Event copy:
      - JAN — label `T03 · IN MARKET · ALWAYS-ON`, when `JAN`
      - JUL — label `T01 · LAUNCH`, when `JUL` (teal)
      - DEC — label `T02 · LAUNCH · ALL THREE LIVE`, when `DEC · NOW` (rev/red-orange)

### Block 3 · Ring panel (the hero)

- **Purpose:** The cumulative-inheritance visualization. This is the load-bearing element.
- **Outer container:** `margin-top: 28px`, 1px border `--ink-4`, background `--bg-soft`.
- **Panel head** — 3-column grid (`auto 1fr auto`), gap 24px, padding `14px 22px`, 1px
  bottom border `--ink-4`. Collapses to a single column below 980px.
  - **Left — fig title:** `FIG. 02-B · CUMULATIVE INHERITANCE · 5 → 9 → 15` (monospace,
    11px, 0.22em, `--ink-2`; `FIG. 02-B` em is `--teal`, `5 → 9 → 15` bold is `--ink-0`).
  - **Center — math callout** (`#math`): a bordered pill, 1px `--teal`, background `--bg`,
    `min-width: 520px`, centered text. **Its contents swap on active-tier change** (see
    Interactions). Default (T01): `T01 · OWNS 15 · ADDS 6 · INHERITS 9 FROM T02 · T03`.
  - **Right — classification legend:** three inline swatches, each a 14px SVG glyph +
    monospace label:
    - `INNOVATED` = filled teal circle (●)
    - `OPTIMIZED` = half-filled teal circle (◐) — outline + right semicircle filled
    - `REFINED`   = hollow teal circle (○) — outline only
- **Panel body** — 2-column grid (`1fr 280px`), `min-height: 620px`. Collapses to single
  column below 980px (stamps move below, gain a top border).
  - **Left — ring stage:** a centered SVG (see Geometry). `position: relative` so the
    service-name tooltip can be absolutely positioned over it.
  - **Right — tier stamps:** three stacked buttons (see Components).
- **Panel foot** — flex row, space-between, padding `12px 22px`, 1px top border `--ink-4`,
  monospace 10px `--ink-3` uppercase.
  - Left hint: `↳ Tap a tier or any dot to light its inheritance set · Hover a dot for service detail`
  - Right: `SHEET · IMPACT · TIER LADDER · BUILD · v2026.05`

---

## Ring geometry (exact — reproduce precisely)

SVG `viewBox="-280 -280 560 560"`, `preserveAspectRatio="xMidYMid meet"`, rendered at
`max-width: 560px` and scaled responsively. Origin (0,0) is the center.

- **Rings** (dashed `stroke-dasharray: 3 4`, 1px):
  - T01 outer: `r = 210`
  - T02 middle: `r = 140`
  - T03 inner: `r = 70`
  - Unlit ring stroke `--teal-dim` at opacity 0.55; lit ring stroke `--teal` at opacity 0.85.
- **Construction crosshair:** full-width + full-height 1px lines at `rgba(180,200,195,0.06)`.
- **Dimension rule** above the diagram (fiche grammar): a horizontal rule at `y = -258`
  spanning x −210→210 with end + center ticks, mono label `Ø 420 · 15 SERVICES` centered
  above it (`--ink-3`).
- **Dots:** one per service, placed by polar coordinates on the tier's ring radius.
  - Count per ring: **T03 = 5, T02 = 4, T01 = 6** (total 15).
  - Angular step = `360 / count`, starting at a per-ring offset to avoid overlaps and to
    keep the top-center clear for the ring label:
    `RING_START = { T01: 30°, T02: 45°, T03: 36° }`.
  - Angle→point: `rad = (startDeg + i*step − 90) * π/180`, `x = r·cos(rad)`, `y = r·sin(rad)`.
    (The −90 puts index 0 near the top and proceeds clockwise.)
  - Each dot is a `<g>` containing: a 7px outline circle (`.out`), a 6px full-fill circle
    (`.fill`, shown only for `INNOVATED`), a right-semicircle path
    (`.half`, `d="M 0,-6 A 6,6 0 0,1 0,6 Z"`, shown only for `OPTIMIZED`), and an invisible
    18px-radius hit circle for easy tapping.
  - A small part-number text label sits radially **outward** from each dot at
    `r + 18`, text-anchor chosen by sign of x (end / start / middle). Only shown
    (`--teal`-tinted, then dimmed to `--ink-2`) when the dot is in the lit set.
- **Ring labels** (monospace, 10px, 1.8px tracking, uppercase), centered above each ring:
  - `T01 · OUTER · +6 ADDED` at `y = -220`
  - `T02 · MIDDLE · +4 ADDED` at `y = -150`
  - `T03 · INNER · +5 CORE` at `y = -80`
  - Plus a center stamp `CORE` at `y = 6` (`--ink-3`).

---

## Components

### Tier stamp (×3, right column)

A `<button>` with `data-tier="T01|T02|T03"`. Grid of stacked rows, gap 6px, 1px border
`--ink-3`, background `--bg`, padding `14px 16px`, left-aligned, `cursor: pointer`.

- **`.pn`** — monospace 10px 0.22em uppercase `--ink-2`; the tier code bold is `--ink-0`
  (or `--teal` when active).
- **`.name`** — sans 15px weight 500 `--ink-1` (`--ink-0` when active).
- **`.meta`** — monospace 10px 0.14em uppercase `--ink-3`, 1px top border.
- **`.count`** — sans 26px weight 500 `--ink-0` (`--teal` when active) + a monospace
  `.u` unit `SERV` (10px, `--ink-2`).
- **`.corner`** — a small registration corner-mark, hidden until active (then teal).
- **States:** hover → border `--ink-2`. Active → border `--teal`, background `--plate-2`,
  a 3px teal left edge (`::before`), corner mark visible, count + tier code go teal.
  `:focus-visible` → 1px teal outline, 2px offset.

Stamp content (verbatim):

| Tier | `.pn`                              | `.name`        | `.meta`                          | count |
|------|------------------------------------|----------------|----------------------------------|-------|
| T01  | `T01 · BUSINESS · PREMIUM`         | `Premium`      | `LAUNCHED JUL 2025 · 950 ACCTS`  | 15    |
| T02  | `T02 · PROFESSIONAL`               | `Professional` | `LAUNCHED DEC 2025 · 25K+ ACCTS` | 9     |
| T03  | `T03 · INCLUDED · FOUNDATION`      | `Foundation`   | `ALWAYS-ON · 1M+ ACCTS`          | 5     |

### Service-name leader (tooltip)

Absolutely positioned over the ring stage; appears on dot hover/focus. 1px `--teal`
border, background `--bg`, padding `8px 12px`, min-width 240px, monospace. A 1px teal
"leader tick" (`::before`) connects it back toward the dot. Contents:

- **`.pn`** — `[PART-NO]` (e.g. `01-A`), teal, 10px 0.22em.
- **`.nm`** — service name, sans 13px `--ink-0`.
- **`.cls`** — `CLASSIFICATION · <b>[INNOVATED|OPTIMIZED|REFINED]</b>`, monospace 9px
  `--ink-2`, 1px top border.

Positioning logic: default to the right of the dot; flip left if it would overflow the
stage right edge; clamp vertically within the stage. Recompute on window resize.

---

## Service inventory (the 15 dots — verbatim data)

Each entry: `{ tier, pn, nm, cls }` where `cls ∈ { inn, opt, rfn }`.

**T03 · inner (5):**
- `03-A` Guided onboarding · INNOVATED
- `03-B` Self-serve learning · INNOVATED
- `03-C` Community · OPTIMIZED
- `03-D` Knowledge base · REFINED
- `03-E` Telemetry · REFINED

**T02 · middle (4):**
- `02-A` Deployment accelerators · INNOVATED
- `02-B` Capability workshops · OPTIMIZED
- `02-C` Integration advisory · OPTIMIZED
- `02-D` On-demand expert hours · REFINED

**T01 · outer (6):**
- `01-A` Strategic success planning · INNOVATED
- `01-B` Executive business review · INNOVATED
- `01-C` Adoption roadmap · INNOVATED
- `01-D` Named success manager · OPTIMIZED
- `01-E` Quarterly health score · OPTIMIZED
- `01-F` Priority escalation · REFINED

> **Verify with Matt:** these service names are plausible placeholders consistent with the
> SR-01 chip set. Confirm the real Autodesk service names + classifications before ship.
> The counts (5 / 4 / 6 → 5 / 9 / 15) and the strict cumulative model **are** locked.

---

## Interactions & behavior

### Active-tier model

State: a single `activeTier` (default `'T01'`). A containment map drives everything:

```
OWNS = {
  T01: {T01, T02, T03},   // lights all 15
  T02: {T02, T03},        // lights 9
  T03: {T03}              // lights 5
}
```

**Triggers** (all set `activeTier`):
- Click a tier stamp.
- Click any dot (sets active to that dot's tier).
- Keyboard: tier stamps are focusable; Enter/Space activates; ArrowUp/ArrowDown move
  between stamps *and* activate. Dots are focusable (`tabindex=0`, `role=button`);
  Enter/Space activates.

**On active change, apply in one pass:**
1. **Dots:** add `.lit` (full opacity) to dots whose tier ∈ OWNS[active]; `.dim`
   (opacity 0.35) to the rest. Toggle their part-number labels to match.
2. **Rings + ring labels:** lit tiers' ring + label get `.lit` (teal, higher opacity).
3. **Tier stamps:** toggle `.active` on the matching stamp.
4. **Math callout** (`#math`) innerHTML swaps:
   - T01 → `T01 · OWNS 15 · ADDS 6 · INHERITS 9 FROM T02 · T03`
   - T02 → `T02 · OWNS 9 · ADDS 4 · INHERITS 5 FROM T03`
   - T03 → `T03 · OWNS 5 · CORE TIER · INHERITS NOTHING`

### Tooltip

- Dot `mouseenter`/`focus` → show leader with that service's pn/nm/cls, positioned near the
  dot (with edge-flip + clamp). `mouseleave`/`blur` → hide. Global `Escape` → hide.

### Transitions

All single-fire, in keeping with the "schematic drawing itself" motion principle — **no
looping ambient motion**. Use ~180–200ms ease on: dot opacity, ring stroke/opacity,
ring-label fill, stamp border/background, math-callout border/background. Tooltip
fades ~140–150ms.

### Responsive

- ≤980px: launch strip and panel head collapse to single column; math pill drops its
  min-width and goes full-width; panel body stacks (rings above, stamps below with a top
  border).
- ≤640px: math pill wraps; launch event labels shrink.
- The ring SVG scales fluidly via `viewBox` + `max-width` — **no layout exception at any
  width** (this was a hard requirement; the concentric geometry is identical at every size,
  which is why this direction was chosen over the Gantt/dashboard alternatives).

---

## State management

Minimal. One piece of UI state:

- `activeTier: 'T01' | 'T02' | 'T03'` — default `'T01'`.

Everything else is derived: lit set = `OWNS[activeTier]`; math copy = lookup by tier;
stamp/ring/dot classes = membership test. The service inventory is static data. No data
fetching. Tooltip open/closed is transient (not worth hoisting to app state).

In a component framework, model this as a single `activeTier` state value with derived
selectors; the dot list and tier metadata are constants.

---

## Design tokens

```
/* Color */
--bg:        #0a0f0e   /* page background (dark) */
--bg-soft:   #0d1413   /* panel / strip background */
--plate:     #0e1716
--plate-2:   #11201d   /* active stamp background */
--ink-0:     #e8efec   /* primary text */
--ink-1:     #b6c2bd   /* secondary text */
--ink-2:     #6f7d78   /* tertiary / labels */
--ink-3:     #3a4744   /* faint labels, construction */
--ink-4:     #1d2624   /* hairline borders */
--rule:      #1a2422   /* section rules */
--teal:      #2dd4b2   /* the one accent — lit/active */
--teal-dim:  #1d8c75   /* always-on, unlit rings */
--teal-low:  rgba(45,212,178,0.22)
--teal-vlow: rgba(45,212,178,0.08)
--rev:       #c47155   /* revision red-orange — stamps / NOW marker only */

/* Type */
--sans: "Helvetica Neue", Helvetica, system-ui, -apple-system, sans-serif;
--mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace;
/* Weights: 400 and 500 ONLY. Never 700. */

/* Layout */
--gutter: clamp(20px, 4vw, 56px);
--maxw:   1280px;

/* Type scale used (px) */
mono labels:        9, 10, 11, 13
sans body/name:     13, 15
stamp count:        26
/* Letter-spacing on mono uppercase: 0.14–0.22em depending on size */

/* Geometry */
ring radii:         210 / 140 / 70   (outer / middle / inner)
dot radius:         6 (fill) / 7 (outline) / 18 (hit area)
dot label offset:   ring r + 18
borders:            1px (--ink-4 hairlines, --rule section rules, --teal active)
active stamp edge:  3px --teal left bar

/* Motion */
state transitions:  ~180–200ms ease
tooltip fade:       ~140–150ms
principle:          single-fire only, no looping ambient motion
```

### Classification glyph encoding

Color **encodes meaning, never decorates** (per the visual grammar). The three glyphs:
- `inn` INNOVATED → filled circle
- `opt` OPTIMIZED → half-filled circle (right semicircle)
- `rfn` REFINED → hollow circle (outline only)

All in `--teal` when lit; outline `--ink-3` / fills hidden when dim.

---

## Assets

**None.** There are no raster images or icon files. Every visual is inline SVG generated
in code (rings, dots, glyphs, dimension rules) or pure CSS. The only external dependency is
the **IBM Plex Mono** webfont (weights 400 & 500) from Google Fonts — substitute your
codebase's existing mono face if you have one, otherwise load IBM Plex Mono. Body/sans is
Helvetica Neue / system sans.

---

## Files in this bundle

- **`Tier Ladder Build.html`** — the hifi interactive prototype. Source of truth for
  geometry and behavior. Open in a browser to interact. The `<script>` IIFE at the bottom
  contains the `SERVICES` data array, `RING_R` / `RING_START` / `TIER_META` / `OWNS`
  constants, the dot-rendering loop, the `applyActive()` / `renderMath()` logic, and all
  event wiring — read it for any detail not captured above.
- **`reference/Tier Ladder SR-02 Diverge.html`** — the decision record: the concept-level
  diagnosis of the earlier dashboard approach, the three explored directions
  (D sequence-hero, E hierarchy-hero/rings, F inheritance-hero/cells), and the
  recommendation that selected this rings + launch-strip build. Read for the "why".
- **`reference/visual-grammar.md`** — the "fiche" visual vocabulary this component lives
  inside (title blocks, leader lines, part numbers, color-encodes-meaning, motion
  principle). Honor it so the component matches the rest of the Impact page.

---

## Implementation notes

- **Recreate, don't transplant.** Rebuild in your app's framework using its component and
  styling conventions. The HTML/CSS here is a faithful spec, not a drop-in.
- **The geometry is the data.** Resist re-introducing a chip list or duplicated counts —
  the whole point of this direction is that the lit dots *are* the inheritance math. Each
  service exists in exactly one place (its native ring).
- **One accent per viewport.** Teal is the only accent; `--rev` red-orange is reserved for
  the NOW marker / revision stamps. Don't add colors.
- **Accessibility is already wired** in the prototype (focusable dots + stamps, ARIA roles,
  keyboard activation, `aria-live` on the math callout). Preserve it.
