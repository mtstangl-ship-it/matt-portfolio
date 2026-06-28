# Design Notes — For Tuesday's Claude Design Session

These are visual, layout, responsive, and interaction issues — NOT copy. Paste relevant sections into each page-specific Claude Design brief Tuesday.

---

## CROSS-PAGE / GLOBAL ISSUES

### Responsive behavior
- Home page does not scale fluidly with browser zoom. At lower zoom levels, the credibility bar (logos) spans full width while content cards stay locked at fixed widths. Layout needs to be fluid: cards scale proportionally with viewport width. Test at 80%, 100%, 125% zoom.

### Theme
- Dark theme everywhere. No light-mode sections anywhere on the site (previously the Stanford credential card and "Experience isn't one moment" section broke this).

### Mobile nav
- Sticky on all pages
- Must work at 375px (iPhone SE) without wrapping
- Current nav truncates — needs treatment (drawer, bottom tab bar, or floating pill)

---

## CROSS-PAGE — CASE STUDY TEMPLATES

### Mobile margin violation on boxed visual elements
Some bordered/boxed visual elements (tier ladder cards on Autodesk, evidence ladder table on Synthetic Users, others) violate the safe margin when zoomed out on mobile. The boxes extend past the viewport edge instead of responding fluidly.

Fix: Apply max-width: 100% with explicit padding on bordered containers across all case study pages. Test at 320px, 375px, 390px, 414px viewports.

### Left-edge text tension across all case studies
Body copy and headlines on case study pages sit too close to the browser left edge — both on mobile and desktop. Creates visual tension and reduces readability.

Fix: Increase left padding/margin on all case study page templates. Verify against fiche grammar reference: leader lines and dimension marks should breathe within a clear gutter, not crowd the edge. Apply consistently across Centaur Practice, Synthetic Users, Autodesk, Wipro, EY.

---

## HOME PAGE

### Hero
- Hero scatter (teal pointillist portrait outline) — keep exactly as is
- Mobile: hero must end with role line + contact links visible without scroll
- Logos strip directly under hero — no dead dark panel between

### Problem Ledger (replaces "Experience isn't one moment")
- Two-column diptych with rotating type — see COPY-home.md for content
- Mobile: replace rotation with slow vertical scroll (NOT click/tap to advance)
- Rotation timing offset between columns so they don't flash in sync
- Hover pauses rotation on desktop for reading
- Portrait integration — design decision: halftone/engraved version between columns OR figure stamp in section corner labeled "M. STANGL · ENGINEER OF RECORD"

### Transformation Dashboard
- Autodesk card — must be responsive to zoom/width changes, revealing more or less copy progressively. Hold copy refinements until layout is fluid.
- Tier chips (currently teal-outlined pills) read as interactive filters but aren't. Replace with plain text separated by · dots.

### Stanford AI Credential
- Must restore as dark-themed card (was previously a light-mode break)
- Treat "in progress · est. May 2026" as a forward-looking signal, not a weakness
- If single credential feels defensive, consider grouping with 2-3 others into a strip

### Signal → Story
- Mobile: the short hover-preview loop (NOT the full video) must auto-play as each tile scrolls into view. No tap/click/touch required to start the preview. The full video still requires a tap to open in lightbox or YouTube.
- Desktop: hover plays the same preview loop (Move 06 from intrigue moves)

---

## IMPACT PAGE

### Healthcare / EY tab

#### Georgia map — three-city correction
The Georgia map and city list currently shows four cities (Atlanta, Augusta, Macon, Savannah). Correct configuration is three cities: Atlanta, Athens, Savannah.

Updated city rows:
```
01 · Atlanta  — Metro hub · anchor partner sites              — 2.41M engagements · 452 vaccines
02 · Athens   — Twilight Criterium · UGA Athletics partnership — 1.65M engagements · 175 vaccines
03 · Savannah — Coastal delivery · mobile teams                — 0.51M engagements ·  88 vaccines
```

Math reconciles: 452 + 175 + 88 = 715 vaccines · 2.41M + 1.65M + 0.51M = 4.57M engagements.

Updates required (apply all together in one pass):
- Map SVG pin locations
- City list / city rows in data table
- Per-city metrics breakdown
- Hero metric line ("Across 4 cities · 10+ partners" → "Across 3 cities · 10+ partners" or drop city count)
- Any animation that highlights cities
- Partner count is **24+** (Home is correct, Impact is wrong). Update every "10+ partners" reference on /impact to "24+ partners" — appears in the hero metric unit line, the metrics row, and the (about-to-be-removed) map summary strip.

#### Map summary strip — remove
Remove the bottom map summary strip ("715 vaccines administered · 4.57M engagements · 10+ partners"). It duplicates the per-city totals already shown above and creates visual redundancy.

#### Right-column footer gap
Right column has dead space below the metric summary block. Map fills the left column down to the boundary; right column ends early. Redesign right column with better vertical spacing so it ends balanced with the map, OR add a content block to fill the gap meaningfully.

#### Implementation note
All three EY/Healthcare fixes happen in one design pass — do not apply piecemeal. The three-city correction changes the SVG, which changes the spacing, which changes the footer gap. Solve together.

---

## ABOUT PAGE

### About page — visual direction (break from fiche-monotony)

The fiche grammar (leader lines, dimension rules, part numbers, figure stamps, revision callouts) is the unifying visual language across Home, Impact, Case Studies, and Signal → Story. About is the exception.

REQUIRED: About should feel like its own page — distinct from the rest of the site visually. The motorcycle/BMW metaphor is the editorial through-line and should be reflected in the visual treatment.

Visual direction for About:
- Lean into motorcycle/BMW airhead vocabulary as the personality of the page (Matt rides and services old BMWs — this hobby maps directly onto how he thinks about design leadership: hands-on, care, forethought, respect for what can go wrong)
- The Double Diamond visual stays, but moves from page-opener to mid-page (after hero, beliefs, and identity copy). The page opens with type.
- ONE photographic moment: B&W photo of Matt working on the bike — mid-page, the only photo on the entire site. Should feel candid, not posed.
- ONE hand-drawn or sketch-style illustration of an actual BMW airhead component (not a stock fiche diagram). This serves as a visual anchor or section divider. Style should feel human and slightly imperfect — the opposite of the precise technical illustrations elsewhere on the site.
- The card pattern after Double Diamond must vary (see card-rhythm fix entry). Don't use cards uniformly across "How I choose / What I do / Working Together / Career Arc."
- Section break treatments can use fiche elements (dimension rules, alignment marks) but sparingly — About earns its visual distinction by NOT looking like the rest of the site.

Why this matters: every page so far uses the same fiche vocabulary. About is the personality page — it should feel like it's set apart. Visitors should land here and feel a slight register shift from the rest of the site. That shift is the point.

---

## CASE STUDIES (HUB + INDIVIDUAL)

### Case Studies hub — build new index page at /case-studies

Currently /case-studies lands directly on the AI Workflow case study with an inline tab picker for the other four. We're keeping that picker (works well within the case study reading flow) but ADDING a true index page at /case-studies in front of it.

Required structure:
- /case-studies → new index page with hero copy, framing, and five preview cards
- /case-studies/[slug] → individual case studies retain the existing five-tab picker at top (no change to existing pattern)

Index page card requirements:
- Apply intrigue Move 07: case cards with figure stamps (FIG. 01-A through FIG. 05-A) and inline data glyphs (sparkline, pulse, or tier indicator per card)
- Each card links to its individual case study URL
- On card click, glyph animates into hero element of the next page
- Mobile: cards stack full-width with vertical breathing room
- Desktop: card grid layout with hub copy above

The existing tab picker on individual case studies stays as is — visitors don't need to return to the index to navigate. The index is for entry-point browsing only, not in-context navigation.

### Hub markdown vs case study markdown — content boundaries

The hub markdown (COPY-case-studies-hub.md) contains ONLY:
- Hub header copy (Eyebrow / Title / Subhead) shown above the picker on every case study page
- Case picker labels (the strip of 5 buttons)
- Per-card data for the homepage preview cards: panel label, title, teaser line

The hub markdown does NOT contain:
- One-line / hero subhead per case study (lives in individual case study markdown files)
- Meta strip fields per case study (lives in individual case study markdown files — and varies by case)
- Detailed case study body content

Each case study has its own meta strip structure customized to its subject:
- AI Build (Centaur Practice): Role / Timeline / Stack / Model
- Synthetic Users: Method / Personas / Artifact under test / Outcome
- Autodesk: Client / Role / Timeline / Scope
- Wipro: Client / Role / Scope / Outcome
- EY: Client / Partners / Program / Scope

Case study page copy lives in COPY-case-[slug].md files, one per case study. Do not duplicate or unify those structures — each is editorially correct for its subject matter.

---

## CASE STUDIES — STRUCTURAL REQUIREMENTS

### AI Build case study — Centaur framework requirement
The case study panel label is "CENTAUR PRACTICE" (replacing "AI WORKFLOW"). This commits the case study to delivering on the Centaur vs. Cyborg framework as a structural backbone, not a passing reference.

Required elements in the case study:
1. The Centaur vs. Cyborg distinction explicitly defined (Ethan Mollick's framework named, one sentence each)
2. Why I'm a Centaur, not a Cyborg — in my own words
3. At least one concrete example of the human/AI split in action (specific decision, AI's contribution, my override)
4. The practical implication: what this framework means for how I'd work with AI in a senior leadership role

Cross-references:
- Home page case 01 panel label updates to "CENTAUR PRACTICE"
- Case Studies hub card label updates to "CENTAUR PRACTICE"
- Home page case 01 teaser line should plant the framework: "Centaur practice — human in the saddle, AI as a serious collaborator"

---

## AI BUILD / CENTAUR PRACTICE CASE STUDY

### Deployment Diff service record — pending v2 screenshot
The Deployment Diff (Service Record 02) compares v1 (April 8 commit 4a3f2c) against v2 (April 21 commit 9e1ab7, post-Claude-Design pass).

Currently the v2 screenshot does not exist yet — Claude Design hasn't rebuilt the home page with fiche grammar. Sequence:

1. Tuesday: Claude Design rebuilds home page hero with fiche grammar applied
2. Wednesday: Review and approve v2
3. Thursday: Capture v2 screenshot and replace the placeholder in the Deployment Diff service record
4. Case study can ship live once v2 is in place

For now, use a placeholder state in the service record with the message: "v2 screenshot pending — post-design-review state." When v2 ships, swap in the real screenshot.

---

## SYNTHETIC USERS CASE STUDY

### Visual interest insufficient
The current page leans entirely on the EVIDENCE.LADDER table for visual structure. Table is informationally strong but visually flat. Page needs additional visual texture, especially for mobile readers.

Direction:
- Persona silhouettes built from thought-leader archetypes (Stickdorn, Young, Mollick, Maeda, Torres) — visual interest with conceptual payoff
- Vertical compositions for mobile (current visuals are horizontal table-driven)
- Consider: persona card sample (Teresa H. — Outcome Enforcer) could anchor visually, not just textually

---

## SIGNAL → STORY PAGE

### Film preview autoplay behavior
On mobile, video previews must play as a loop without requiring hover or touch interaction. Auto-play should trigger as user scrolls film into view. On desktop, hover-to-play behavior is acceptable (per intrigue Move 06).

---

## STANDING VISUAL CONVENTIONS

### Hero structure (case studies)

Tier A case studies share `CaseHero` (`section.hero`, `.hero__plate`, photo stack, picker zone, identity strip, meta strip). Shared layout and photo finishing layer live in `src/styles/tier-a/hero-chrome.css`. Case-specific typography, accents, and hero photo framing overrides load via each route's stylesheet bundle (e.g. `src/styles/case-centaur/index.css`, `src/styles/case-ey/index.css`).

### Hero photograph treatment

Each case study uses its own hero photograph. Photos are **pre-processed halftoned PNGs** committed to the repo. CSS in `src/styles/tier-a/hero-chrome.css` provides the finishing layer (filter, scrim, fade, grain) — not the halftone itself.

**Visual aesthetic for the halftoned photo:**
- Cool monochrome / desaturated
- Deep blacks, mid-tone falloff
- Visible dot pattern at native resolution
- Tonal range that lets the CSS finishing layer push the photo into the background as texture, not foreground

**Working examples:** `centaur-literal.png` (Case 01), `ey-core-halftone.png` (Case 05).

**Halftone processing:** ImageMagick can produce a serviceable halftone from a raw photo (`-ordered-dither h4x4a` is the working starting point). Photoshop with a saved action produces closer fidelity to Centaur's reference. The image processing pipeline is upstream of Claude Design — the halftoned source image is the input, not the output.

### Per-photo object-position tuning

Hero photos render with `object-fit: cover` on a viewport-wide plate. As the viewport gets wider, the plate's aspect ratio gets wider, and the photo gets cropped more aggressively from top and bottom. Without explicit `object-position`, the key visual content of the photo gets cropped away at extreme aspect ratios (ultra-wide displays).

Every case study's hero photo needs an `object-position` value tuned to where the key subject sits in the source image. The value lives in `src/styles/case-{slug}/index.css` (or per-case stylesheet that loads after the auto-generated CSS, to survive regeneration).

**How to choose the value:**

`object-position` takes two percentages — horizontal and vertical anchor points. The first percentage is left-to-right (0% = left edge, 100% = right edge, 50% = horizontal center). The second is top-to-bottom (0% = top edge, 100% = bottom edge).

When the plate gets cropped, the anchor stays visible. So if the key content is in the lower-third of the source image, anchor near the bottom (e.g. `50% 75%` or `50% 90%`). If the key content is upper-left, anchor toward upper-left (e.g. `30% 25%`).

**Working examples:**
- Case 01 · Centaur Practice: `object-position: 50% 90%` (motorcycle in lower third of source image; anchor near bottom keeps motorcycle visible at all viewport widths)
- Case 05 · EY Healthcare: `object-position: 38% 52%` (handshake center-horizontal, slightly below middle)

**Tuning process per case:**
1. Identify where the key visual content sits in the source image
2. Apply a starting `object-position` value
3. Verify at three viewport widths: ~1200px, ~1600px, ~2200px+
4. Tune until the key content is visible at every tested width

This is per-photo work. There is no universal `object-position` value that works across all case studies.

### Hero plate sizing

The hero plate uses `min-height: min(78vh, 820px)` in `src/styles/tier-a/hero-chrome.css`. This was tuned to give the hero proper vertical presence relative to the site nav. Don't change this without a specific design reason — it cascades into how every case study's hero photo crops and reads.

### Six-section case study structure

Tier A case studies follow the six-section narrative discipline (hero → telemetry/equivalent → method/pivot → records/artifacts → bulletin/reversal → handoff). Exact section labels vary by case; canonical reference: `BUILD-NOTES.md`.

---

## ACCESSIBILITY & MOBILE HEURISTICS (apply everywhere)
- 44px minimum tap target on all interactive elements
- No text below 14px (mono labels can be 11px if uppercase + tracked)
- Max 3 screens per section before a visible break or jump link
- No decorative element taller than 40vh on mobile
- Every ornamental flourish earns its place once per screen — not every block

