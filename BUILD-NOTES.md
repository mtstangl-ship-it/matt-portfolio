# BUILD NOTES

Standing notes for ongoing Tier A portfolio rebuild. These rules apply to all future case study work and any other Tier A page extensions. Read before starting new work.

---

## Architectural Contract — Case Studies

The Centaur Practice case study (`/case-studies/ai`) is the locked architectural reference for all Tier A case studies. New case studies extend this pattern; they do not redesign it.

### Locked architecture (does not change per case)

- **Three-zone hero:** site nav at top, case picker tabs below nav, hero copy at bottom (with generous breathing room between zones)

- **Per-case hero imagery:** each case uses its own hero photograph, pre-processed as a halftoned PNG. The treatment pipeline is the binding contract across cases. See `DESIGN-NOTES.md` for the visual standard.

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
- `.case-section`, `.case-section__inner`, `.case-section-head`, `.case-section-head__sub`
- Any class name generic enough to plausibly be reused on another page (e.g. `.delta`, `.split`, `.timeline`, `.outcomes`, `.ribbon`)

### Class names that are safe global

Some class names are unique to either home-v2 or case studies and don't need scoping:

- Centaur-only: `.hero__preserve*` subtree, `.case-centaur-portfolio` itself
- Home-only: `.home-v2-root`, `.problem-ledger-*`, `.dash__*`

When in doubt, scope it. Over-scoping is safe; under-scoping reintroduces the soft-nav bug.

### Generic-named class collision risk

`src/app/cases.css` and Centaur's `case-ai.css` (instrument classes like `.gauge*`, `.timeline*`, `.split*`, `.review-console*`, `.diff*`, `.signal-log*`, `.tell*`, `.ribbon`) contain unscoped or under-scoped rules that will bleed into any case study using overlapping class names.

The Section 5 of EY case study originally used `section.delta`, which collided with an unscoped `.delta { display: grid; background: var(--line); ... }` rule in `cases.css` (Wipro UI work). The collision rendered the section as a grid of gray cells instead of a normal block-flow section. Diagnosed only after a full evidence-gathering round.

The rule: any case-specific class name that's likely to be reused (`.delta`, `.split`, `.timeline`, etc.) must be **case-prefixed in its name**, not just dual-scoped in CSS. For example, `.ey-external-validation` instead of `.delta`. This eliminates the collision risk entirely rather than relying on cascade specificity.

When introducing a new section or component class:
- If the class name is generic enough that another page could plausibly use it, prefix it with the case slug
- Search `src/app/cases.css` and `src/styles/case-centaur/case-ai.css` for the proposed class name before committing
- If found unscoped, either rename your class or scope the existing rule before proceeding

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

### Three-state visual verification gate

Before declaring a case study round done, the affected page must be verified on Vercel preview in three states. Cursor cannot perform these checks; they're Matt's responsibility before merge:

1. **Direct load** — paste the URL fresh into a browser tab. The page renders correctly without prior context.
2. **Soft navigation** — arrive at the page from another route within the site (Home → Case Studies → target case). The page renders correctly with previously-loaded CSS chunks in memory.
3. **Hard refresh** — Cmd+Shift+R (or Ctrl+Shift+R) on the page. The page renders correctly after cache invalidation.

If any of the three states differs from the others, there's a CSS scoping or chunk-loading bug. The fix is to scope the offending rule, not to debug rendering order.

Plus a regression check: open the OTHER currently-shipped case study in any state. Confirm no unintended changes from the work just done.

### Multi-viewport-width hero verification

Hero photos use `object-fit: cover` on a viewport-wide plate. The same CSS produces different visual results at different viewport widths. Code-level verification (build passes, route returns 200) does not catch hero composition issues that only manifest at extreme viewport widths.

For every case study build round that touches hero CSS or hero photo files:

1. Open the affected page on Vercel preview at three viewport widths: ~1200px, ~1600px, ~2200px+
2. At every width, verify the photo's key subject (motorcycle, handshake, etc.) remains visible
3. If the key subject crops away at any width, the `object-position` value needs tuning per the standard in DESIGN-NOTES.md

This check is in addition to the three-state navigation gate (direct, soft-nav, hard refresh). Both must pass before declaring a hero round done.

**Lesson:** the EY/Centaur hero `object-position` regression was missed for multiple Cursor rounds because verification was done at a single viewport width. The fix was simple (per-photo `object-position` tuning), but it cost two days to find. Multi-viewport check would have caught it in the first round.

### Diagnostic-first when fixes don't land

When a Cursor round reports "done" but the rendered output doesn't reflect the fix, do not send another speculative fix. Send a diagnostic prompt that gathers evidence:

- What file did the edit land in?
- Is that file actually in the import chain of the route?
- Is the edited rule winning the cascade?
- Does the rule the prompt described actually exist in source?

The Centaur saga (10+ rounds in March 2026) and the EY Section 5 redo demonstrated that speculative fixes compound interpretation errors. Evidence-first rounds converge faster.

This applies whenever:
- A Cursor "done" report doesn't match visual output on Vercel
- Two consecutive fixes don't resolve the same symptom
- A fix produces unexpected new symptoms

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

## Tier A Debt

Deferred work tracked here. Cleared as items ship. Distinct from Tier B/C polish — these items are foundation issues that will eventually need addressing, just not in the current build round.

### CSS hygiene
- Audit and dual-scope `src/app/cases.css`. Known collision: `.delta` (resolved by renaming EY section). Likely other unscoped generic-named rules.
- Audit and dual-scope Centaur instrument classes in `case-ai.css`: `.gauge*`, `.timeline*`, `.split*`, `.review-console*`, `.diff*`, `.signal-log*`, `.tell*`, `.ribbon`
- Remove orphaned EY CSS (unused class definitions surfaced in pre-merge audit): `outcomes*`, `trust-diagram*`, `sheet-footer*`, `learning__*`, `hero__bgphoto-img--flip`, `hero__h1-line2`, `tally__total-plus`
- The `ey-case.css` file is auto-generated by `scripts/build-ey-v4-css.mjs`. Hand-edits to that file are blown away on regeneration. Several rounds have worked around this by putting EY-specific overrides in `src/styles/case-ey/index.css` (which loads after the generated file). The right long-term move: extend the generator to include hand-maintained additions, OR retire the generator and treat `ey-case.css` as fully hand-maintained. Until then, every hand-edit to anything in `case-ey/` should land in `index.css`, not `ey-case.css`.

### Visual parity
- EY hero plate height vs Centaur (slight difference, defer until both photos are in final state)
- EY hero photo treatment doesn't fully match Centaur (ImageMagick halftone approximation; Photoshop pass with saved action would produce closer parity)

### Code identifier consistency
- Confirm Section 5 of EY received code-identifier rename across all references (component file names, CSS selectors, anchor IDs, data attributes, type definitions if any). The visible labels and primary class name were renamed during Section 5 cleanup. If any code identifier still says `delta` (e.g. `EYDelta` component, `delta__main` class, `#delta` anchor, `data-screen-label="05 Delta"`), complete the rename. Verify with `grep -ri "delta" src/components/case-studies/cases/case-ey/ src/styles/case-ey/` — any remaining matches should be evaluated and renamed if they refer to the section.

### End of build
- Em-dash sweep across entire repo (already documented above)
- Consolidated merge `tier-a-rebuild` → `main`

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
