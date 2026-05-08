# BUILD NOTES

Standing notes for ongoing Tier A portfolio rebuild. These rules apply to all future case study work and any other Tier A page extensions. Read before starting new work.

---

## Architectural Contract — Case Studies

The Centaur Practice case study (`/case-studies/ai`) is the locked architectural reference for all Tier A case studies. New case studies extend this pattern; they do not redesign it.

### Locked architecture (does not change per case)

- **Three-zone hero:** site nav at top, case picker tabs below nav, hero copy at bottom (with generous breathing room between zones)

> **Per-case hero imagery** — each case study uses its own hero photograph. The shared element across cases is the treatment pipeline (halftone + duotone + scrim + fade), applied identically to every case study's hero photo. This was originally locked as a shared motorcycle photo across all 5 cases but was revised during EY V3 review to allow per-case imagery as long as the treatment pipeline matches Centaur's exactly.
>
> Examples:
> - Case 01 · Centaur Practice — `centaur-literal.png` (motorcycle photo)
> - Case 05 · EY Healthcare — CORE booth photo
> - Cases 02–04 — TBD when those case studies are briefed
>
> The treatment pipeline is the binding contract, not the photo. Any case can use any photo as long as the halftone density, scrim opacity, duotone color anchor, and fade match Centaur's reference implementation.

- **Six-section structure:** Hero → Telemetry/equivalent → Method/Pivot → Records/Artifacts → Bulletin/Reversal → Handoff
- **Affordance pattern:** opacity box only (no companion divider lines, no competing accent strokes)
- **Visual grammar:** fiche kickers, FIG stamps, dimension callouts, marginalia, metadata stamps per section, sheet footer
- **Wrapper class:** `.tier-a-case-root` on all case study pages (shared across all 5)

### Per-case variation (changes per case study)

- `caseNumber`, `totalCases`
- Hero plate photograph / asset (unique per case; shared treatment pipeline — see Locked architecture above)
- `headline`, `subhead`
- `tag` (eyebrow text), `marginNote`, `figStamp`
- `meta` strip values (Role, Timeline, Stack, Model)
- `picker` (active tab varies)
- ID strip `ROLE` (other ID strip values stay constant)
- All section content
- Specific interactive artifacts (each case can have unique components)

### Reference file

The locked Centaur HTML is at `reference/tier-a-artifacts/case-studies/centaur-locked.html` (or wherever Matt has it saved). Use this as the architectural source of truth when briefing Claude Design or porting new case studies.

---

## CSS Scoping Rules — Required

All case-study-specific CSS must be parent-scoped to prevent soft-navigation cascade conflicts with home-v2 styles. This was a hard-won lesson — see commit `65869cc` for the fix that resolved soft-navigation layout bugs caused by class name collisions between case study CSS and home page CSS.

### The rule

Every case-study CSS rule must be scoped under TWO parent classes:

1. `.tier-a-case-root` — shared across all 5 case studies
2. `.case-{slug}-portfolio` — unique per case (e.g., `.case-centaur-portfolio`, `.case-ey-portfolio`, `.case-wipro-portfolio`)

### Example

```css
/* WRONG — unscoped, will collide with home-v2 .hero */
.hero {
  display: grid;
  grid-template-columns: 1fr;
}

/* RIGHT — scoped, won't collide */
.tier-a-case-root .case-ey-portfolio .hero {
  display: grid;
  grid-template-columns: 1fr;
}
```

### Class names that MUST be scoped

These class names are used by both home-v2 and case studies. They MUST be scoped on the case-study side or layouts will conflict on soft navigation:

- `.hero`, `.hero__inner`, `.hero__h1`, `.hero__sub`, `.hero__plate`
- `.section-head`, `.section-head--split`, `.section-head__sub`
- `.kicker`, `.cta`, `.cta--quiet`
- `.sheet`, `.sheet__cell`
- `.dim`, `.fig-stamp`, `.margin-note`
- `.cred`, `.case`, `.tile`
- `.xhair` and all variants

### Class names that are safe global

Some class names are unique to either home-v2 or case studies and don't need scoping:

- Centaur-only: `.hero__preserve*` subtree, `.case-centaur-portfolio` itself
- Home-only: `.home-v2-root`, `.problem-ledger-*`, `.dash__*`

When in doubt, scope it. Over-scoping is safe; under-scoping reintroduces the soft-nav bug.

---

## Verification Discipline — Required

Cursor cannot run a real browser. It can build, lint, run dev server, curl, and use Chrome headless to dump DOM, but it cannot watch a layout shift happen, inspect a hover state, or verify visual fidelity.

### What Cursor CAN verify

- Build passes (`npm run build`)
- Type errors caught (`tsc`)
- Lint passes
- Dev server starts and routes return 200
- HTML structure via curl
- DOM structure via headless dump

### What Cursor CANNOT verify

- Visual rendering correctness
- Animation timing
- Hover/focus states
- Layout shifts on interaction
- Cross-browser behavior
- Performance characteristics

### The discipline

When Cursor finishes work that requires visual verification, it must:

1. Explicitly state which verifications were done (code-only vs visual)
2. Flag what remains unverified
3. Identify what Matt needs to check on Vercel preview before declaring done

Default to flagging when visual verification is needed but not possible from Cursor's environment. Don't say "fixed and verified" if only build verification was done.

---

## Branch Strategy

### Stable branches
- `main` — production. Touched only by consolidated end-of-build merges. Never push directly.
- `tier-a-rebuild` — active development branch. All verified work lands here. Stable. Vercel preview is treated as the canonical "current state."

### Working branches
- Sub-branches off `tier-a-rebuild` for any new work or risky fix
  - Naming: `{purpose}-{descriptor}` (e.g., `centaur-port-from-prototype`, `soft-nav-css-fix`, `hero-image-perf`)
- Sub-branches merge to `tier-a-rebuild` with `--no-ff` to preserve waypoints
- Verified on Vercel preview before merge

### Rules
- Never push directly to `main` or `tier-a-rebuild` without verification
- High-blast-radius changes (root layout, shared CSS, font config, build config) ALWAYS go on a sub-branch first
- If a sub-branch experiment fails, delete it without merging — `tier-a-rebuild` stays clean

---

## Em-Dash Sweep — Deferred

Em-dashes throughout COPY files and rendered components are deferred to a single end-of-build sweep before the consolidated merge to `main`. Replacing em-dashes with periods, commas, or colons (whichever fits the sentence) is the agreed approach. Site-wide scope. Cursor decides per-instance replacement.

Trigger: after all Tier A work is complete and ready for final merge.

---

## Tooling Notes

### Claude Design (prototype generation)
- Used for HTML prototype design. Does not have repo access.
- Briefs include: locked Centaur HTML reference, locked COPY-{slug}.md, what's unique to this case
- Sequential per case (not parallel) — first case lands lessons that propagate forward
- Iteration via redirect briefs if v1 misses

### Cursor (Next.js port + commits)
- Used for porting Claude Design HTML prototypes into the Next.js codebase
- Auto-run enabled — can execute end-to-end without manual confirmation gates
- Limitations: no real browser. Code-only verification. See "Verification Discipline" above.

### Case EY bundled CSS (`npm run build:ey-css`)
- Generator: `scripts/build-ey-v4-css.mjs` merges `.v4-extract/case-ey/v4-handoff/styles/case-ey*.css` into scoped `src/styles/case-ey/ey-case.css`.
- The handoff source intentionally omits legacy standalone `.case-picker` rules and duplicate CaseHero chrome (identity strip, `.hero__inner` layout); the script strips the NAV block through the start of the HERO section so old picker markup cannot creep back in.
- After editing handoff CSS or the generator, run `npm run build:ey-css` and commit the regenerated file so output stays deterministic.

### Claude (orchestration)
- Used for project orchestration, brief writing, code review, planning
- Reads Vercel preview HTML via web_fetch when URLs provided by Matt
- Cannot directly drive Cursor — Matt is the bridge
- Cannot see images Cursor produces unless Matt screenshots and shares

---

## Standing Decisions

These are locked design decisions from earlier project conversations. They do not change without explicit reconsideration.

- **Site is dark theme.** Tokens: `--bg #0a0f0e`, `--bg-2 #0d1413`, `--ink #e8efed`, `--ink-2 #aab5b3`, `--ink-3 #6b7773`, `--ink-line #1a2422`, `--accent #1dcfaa` (teal)
- **Sans body, mono labels** (mono in uppercase, letter-spacing 0.14-0.18em, 9-11px)
- **Motorcycle as cross-page through-line.** About has the heavy treatment (full motorcycle metaphor in copy and structure). Other pages have light visual references. Vocabulary firewall stays About-only — no "Service Manual" / "Trade-offs at Speed" / "Mileage Log" framing on other pages.
- **Mission control / aerospace / T-minus / Pre-flight / Operator** vocabulary is **Impact ONLY**. Do not use on other pages.
- **"Selected work."** is the locked title for the Case Studies hub.
- **Matt is in Denver (DEN), not Atlanta.** Personal pages use DEN. Case studies that are factually about Atlanta-based work (EY Healthcare for Georgia DPH) keep ATL where factually accurate.
- **Em-dash sweep deferred** to end-of-build (see above).

---

## Tier B / C — Future Polish

Items deferred to future polish passes. Not blocking shipping Tier A.

- Hero image optimization to `next/image` component (currently a CSS background; works fine but could be faster)
- `text-wrap: balance` font-swap optimization with `size-adjust` overrides
- Hub-level multi-state slider for Centaur (parked post-Tier-A)
- Deeper Signal Telemetry scrub interaction (currently click-to-expand only)

---

## Last Updated

This file should be updated when:
- A new architectural decision is locked
- A standing rule changes
- A new tooling pattern is established
- A new lesson is learned that should propagate to future work

Maintained alongside the work. Read first when starting new sessions.
