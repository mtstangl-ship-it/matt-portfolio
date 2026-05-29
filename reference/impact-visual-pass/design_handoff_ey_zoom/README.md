# Handoff: EY Tab — Zoom-Into-City (VAR 2 · Draw-In Overlay)

## Decision

We are building **VAR 2 · Draw-In Overlay** from the SR-03 zoom-into-city sketch round.
The other two SR-03 variations (VAR 1 split-zoom, VAR 3 tab-stack) are **not** being built —
they remain in the sketch file for context only.

## What this component is

The EY tab's Georgia delivery footprint. In the **default state** the visitor sees a
state-level Georgia map with three city pins (Atlanta, Athens, Savannah). **Tapping a pin
zooms into that city**: state-level Georgia fades back while a stylized representation of
the city's local geography *draws itself in* stroke-by-stroke, and a card with that city's
stats overlays the lower portion of the view. The visitor returns to Georgia via a
persistent "zoom out" stamp.

The defining mechanic is the **draw-in**: the city topology plots itself like a schematic
being drawn. This was chosen deliberately because it is the only zoom mechanic native to
the page's visual grammar — see `reference/visual-grammar.md`, the **"The schematic drawing
itself as you read"** motion principle. This is not a camera move or a UI crossfade; it is
a technical illustration plotting itself onto the sheet.

> ⚠️ **The single most important pre-build question** (see Open Questions): the draw-in only
> works if the production city SVGs are **stroked paths**, not filled shapes. If they're
> fills, the signature mechanic degrades to a fade and the whole rationale for VAR 2
> collapses. **Confirm SVG construction before writing animation code.**

## About the design files

These files are a **lo-fi annotated sketch**, not production code. `EY Tab -
Zoom-Into-City Sketches.html` contains all three SR-03 variations plus written analysis;
**only the VAR 2 sections are in scope**. The sketch uses placeholder topology (CSS grid
patterns) standing in for the real city SVGs, and it shows static "default" and "active"
states side by side rather than the live transition. Your job is to **recreate VAR 2 in
the target codebase** (the Impact page's existing stack) as a working, animated component —
using the codebase's conventions, the real Georgia SVG, and real city SVGs.

The sketch's two stylesheets (`ey-sketch.css` shared chrome + tokens, `ey-sr03.css`
zoom-specific) are **reference for visual values only** (colors, spacing, type, the
`.citymap` / `.citycard` / `.breadcrumb` / `.zoomout-stamp` treatments). Don't ship them
verbatim; lift the values into the codebase's styling system.

## Fidelity

**Lo-fi sketch → hifi build.** The layout intent, copy, states, and interaction model are
specified. The *exact* city stylization and the live transition curves are to be developed
against the real SVGs during the build. Match the fiche register precisely (it is locked
across the whole Impact page); treat the placeholder topology as "TBD art", not final.

---

## Preservation posture (important constraint)

Per the locked Impact brief, the EY tab is **preservation posture**: the **Georgia map SVG
is preserved from production and must NOT be redrawn**. Port the existing path; do not
freehand a new Georgia. The *city* SVGs are new art being sourced separately. This handoff
covers the new zoom interaction layered onto the preserved Georgia artifact.

---

## States

### State 1 · Default (Georgia)

- **Section break header** (matches the rest of the Impact page):
  - Left: `↓ GEORGIA DELIVERY FOOTPRINT · TAP TO INSPECT EACH HUB`
  - Right: `FIG. 03-A · DELIVERY · 3 HUBS · SEQUENCED`
- **Georgia map** — the preserved production SVG, full width.
- **Three pins**, hollow disc with `--ink-2` border in default:
  - **ATL** — upper-NW interior
  - **ATH** — slightly east of ATL
  - **SAV** — SE coast
  - (Sketch placeholder positions: ATL ≈ left 30% / top 42%, ATH ≈ 43% / 39%,
    SAV ≈ 78% / 76% — these are approximate; use the real Georgia SVG's true city
    locations.)
- **Fiche chrome:** `FIG. 03` stamp (corner), compass rose, scale bar `0 — 100 MI`.

### State 2 · Active (city, e.g. ATL)

- The state-level Georgia has faded back (~8% opacity); the **city topology has drawn in**
  (stylized — grid/arterials for metro ATL; see City Stylization).
- **Fiche chrome rescaled:** `FIG. 03-B` stamp, scale bar now `0 — 10 MI`.
- **Card overlay** docked to the lower portion of the city view (see Card).
- **Breadcrumb** bottom-right: `1/3 · ATL` + a 3-dot track (first dot lit). The track dots
  are tappable to jump directly between cities.
- **Zoom-out stamp** top-right: `↺ FIG. 03 · ZOOM OUT`.
- **Drawing-in hint** (transient, during animation): `▱ TOPOLOGY DRAWING IN · STROKE-DASH`.
- **Other cities (ATH, SAV) are NOT drawn** in this view — only the active city's topology
  exists at this scale. The breadcrumb track is how the visitor knows others are
  inspectable.

### State 3 (4th state) · Program summary

- After all three cities have been inspected (breadcrumb track fills to 3/3), a
  **`PROGRAM TOTAL`** plate draws in — all three city glyphs ghosted behind the totals.
- Totals: **4.57M ENGAGEMENTS · 715 VACCINATIONS · 3 HUBS**.
- This is its own ceremonial state (rewards completion), reachable also via... (decide with
  Matt — a dedicated affordance vs. only-after-3/3). The sketch treats it as
  draw-in-after-completion.

---

## The draw-in transition (the signature mechanic)

- **Motion:** State-level Georgia fades to ~8% opacity. Simultaneously the city grid
  **strokes in via `stroke-dashoffset` animation** — minor streets first, major arterials
  last. Then the card fades up (~150ms) once the topology has substantially drawn.
- **Timing:** ~600ms draw + ~150ms card fade. **Single-fire — no looping.** (Honors the
  visual-grammar motion principle.)
- **Camera:** **Fixed.** Every city lands in the *same centered viewport* — there is **no
  per-city camera framing** to author (this is the deliberate simplicity advantage over
  VAR 1's split-zoom). The illusion of "going somewhere" comes from the draw-in, not a pan.
- **Return:** The `↺ ZOOM OUT` stamp reverses the animation — the city **un-draws**
  (reverse `stroke-dashoffset`) and Georgia fades back up. `Esc` also returns. This
  un-draw reversal preserves the "I traveled and came back" feeling. **Scroll does NOT
  auto-return** (avoids accidental loss of place).

### Implementation sketch for the draw-in

```
// each city SVG path needs a measurable length
path.style.strokeDasharray  = length;
path.style.strokeDashoffset = length;       // start hidden
// on activate: animate offset → 0 (draw in), staggered by path class (minor → arterial)
// on return:   animate offset → length (un-draw)
```

Use the codebase's animation approach (CSS transition on `stroke-dashoffset`, Web Animations
API, or whatever's idiomatic). Stagger via per-path delay or path grouping (minor-street
group, arterial group). Respect `prefers-reduced-motion` — fall back to a cross-fade.

---

## Card

Overlaid, docked to the **bottom of the city view**, full width minus ~14px side margins,
on a near-opaque plate (`rgba(10,15,14,0.94)`) with a 1px `--teal` border. City topology
remains visible **above** the card. Consistent position for all three cities.

**ATL card content (verbatim — do not rewrite):**

```
HUB-01 · ATLANTA                    01 / 03
Metro hub · anchor partner sites
REACH & DEPTH
Anchor partner sites across metro Atlanta carried the bulk of program
awareness. The hub paired large-venue activation with neighborhood-level
partner clinics.
2.41M  ENGAGEMENTS
452    VACCINATIONS
```

Card structure (classes from the sketch): `.pn` (part-no row: `HUB-01 · ATLANTA` left,
`01 / 03` right) · `h5` (subtitle `Metro hub · anchor partner sites`) · `.frame` (teal mono
eyebrow `REACH & DEPTH`) · `p` (body) · `.stats` (two cells: value + mono label).

### All three cities (verbatim data — from COPY-impact.md, locked & reconciled)

| Pos | City     | Subtitle                                       | Engagements | Vaccinations |
|-----|----------|------------------------------------------------|-------------|--------------|
| 01  | Atlanta  | Metro hub · anchor partner sites               | 2.41M       | 452          |
| 02  | Athens   | Twilight Criterium · UGA Athletics partnership | 1.65M       | 175          |
| 03  | Savannah | Coastal delivery · mobile teams                | 0.51M       | 88           |

Program total: **4.57M engagements · 715 vaccinations · 3 hubs** (452 + 175 + 88 = 715).

> **Eyebrow + body copy for ATH and SAV cards is not yet written.** Only ATL has a verbatim
> body paragraph (above). The subtitles + stats for ATH/SAV are locked (table); the
> `REACH & DEPTH`-style eyebrow and the body paragraph for Athens and Savannah need to come
> from Matt before ship. Do not invent them.

---

## City stylization (placeholder → real SVG)

The sketch proposes a **distinct stylization per city** so each *feels* like the place
without literal cartographic accuracy:

- **ATL** — metro **street grid** + a couple of diagonal arterials
- **SAV** — **coastline + grid** (water mass hatched, lower-right)
- **ATH** — **arterials only** (sparse, abstract)

In the sketch these are CSS background patterns (`.citymap--grid`, `.citymap--coast`,
`.citymap--hatch`) labeled `[CITY-GRID PLACEHOLDER · STYLIZED TOPOLOGY · PROD SVG TBD]`.
**Replace with the real production city SVGs.** Whether to keep per-city stylization or use
one uniform abstract treatment is an open question for Matt (per-city is more specific but
invites "that doesn't look like Athens" nitpicks).

---

## Design tokens (fiche register — lift into the codebase)

```
/* Color */
--bg:        #0a0f0e   /* dark plate */
--bg-soft:   #0d1413
--plate-2:   #11201d
--ink-0:     #e8efec   /* primary text */
--ink-1:     #b6c2bd   /* secondary */
--ink-2:     #6f7d78   /* labels */
--ink-3:     #3a4744   /* faint / construction */
--ink-4:     #1d2624   /* hairlines */
--rule:      #1a2422
--teal:      #2dd4b2   /* THE accent — one per viewport */
--teal-dim:  #1d8c75   /* arterials, unlit */
--rev:       #c47155   /* revision red-orange — stamps / summary only */

/* Type */
--sans: "Helvetica Neue", Helvetica, system-ui, sans-serif;   /* body, headings */
--mono: "IBM Plex Mono", ui-monospace, monospace;             /* labels, stamps, part-nos */
/* Weights 400 + 500 ONLY. Never 700. */

/* Note: the brief's color spec wrote teal as #1dcfaa; the built sketch uses #2dd4b2.
   Confirm the canonical teal with the production Impact page and match it. */
```

**Fiche grammar to preserve:** FIG stamps in corners, scale bar with tick ruler, compass
rose, mono part-numbers on every callout (`HUB-01`, `FIG. 03-B`), leader ticks (no
arrowheads), 1px hairline borders, single-fire motion only, **one teal accent per
viewport**. No emoji, no rounded cards, no gradients, no aerospace/mission-control language.

---

## State management

- `view: 'georgia' | 'ATL' | 'ATH' | 'SAV' | 'summary'` — default `'georgia'`.
- `inspected: Set<city>` — tracks which cities have been viewed (drives the breadcrumb
  track fill and unlocks the summary state at 3/3).
- Transient: whether the draw-in animation is mid-flight (to gate the card fade and block
  double-triggers).

Triggers: tap a pin (georgia → city), tap a breadcrumb track dot (city → city, direct),
tap `↺ ZOOM OUT` or `Esc` (city → georgia). Everything else derives from `view` +
`inspected`.

---

## Assets

- **Georgia SVG** — preserved production artifact, ported from `tier-a-rebuild`. Do not
  redraw.
- **City SVGs (ATL, ATH, SAV)** — new art, sourced separately. **Must be stroked paths**
  for the draw-in (see Open Questions). Not in this bundle.
- **Fonts** — IBM Plex Mono (mono) + Helvetica Neue / system sans. No raster images; all
  chrome is CSS/SVG.

---

## Files in this bundle

- **`EY Tab - Zoom-Into-City Sketches.html`** — the SR-03 sketch. **VAR 2 sections are in
  scope**; VAR 1 and VAR 3 are context only. Also contains the full written analysis
  (composition read, zoom mechanics, card-placement, risks, return comparison, summary
  state, open questions) — read §2, §4, §5, §6 for VAR 2 rationale and risks.
- **`ey-sketch.css`** — shared fiche chrome + tokens (reference values).
- **`ey-sr03.css`** — zoom-specific styles: `.citymap` stylizations, `.citycard`,
  `.breadcrumb`, `.zoomout-stamp`, `.back-aff`, `.drawin-hint`, `.overlay-stage`
  (reference values).
- **`reference/visual-grammar.md`** — the fiche vocabulary. The motion principle here is
  the explicit justification for VAR 2's draw-in. Honor it.

---

## Open questions for Matt (resolve before / during build)

1. **Are the production city SVGs strokes or fills?** Decisive. Draw-in needs strokes. If
   fills, VAR 2 degrades to a fade — escalate before building the animation.
2. **Per-city stylization vs. uniform abstract?** Grid/coast/arterials per city is specific
   but invites "doesn't look like Athens"; a uniform treatment is safer.
3. **ATH + SAV card copy.** Eyebrow + body paragraphs aren't written yet. Need verbatim
   copy (stats are locked).
4. **Summary state reachability.** Only-after-3/3 (ceremonial) or also a persistent
   affordance? Sketch assumes draw-in after completion.
5. **Canonical teal** — `#1dcfaa` (brief) vs `#2dd4b2` (sketch). Match the production page.
6. **Mobile gesture** — tap-only confirmed (no pinch)? Sketch assumes tap.
```
```

## Implementation notes

- **Recreate, don't transplant.** Rebuild in the Impact page's stack using its conventions.
  The sketch CSS is a value reference, not a drop-in.
- **The draw-in is the product.** If you find yourself shipping a plain fade, stop — that's
  the failure mode flagged in Open Question #1.
- **Fixed camera is a feature.** Resist adding per-city pan/zoom framing; the simplicity is
  intentional.
- **One teal per viewport.** `--rev` red-orange is reserved for stamps / the summary state.
- **Respect `prefers-reduced-motion`** — draw-in falls back to a cross-fade; return is
  instant.
- **Mobile (380px):** city draws in full-bleed, card overlays the bottom third, `↺ OUT`
  stamp top-right always thumb-reachable. No layout exception from desktop — just narrower.
  See the VAR 2 mobile sketch in the HTML.
