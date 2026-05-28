# Intrigue Moves — Fiche Grammar Reference

The unifying principle: every intrigue move is expressed through the vocabulary of a technical illustrator — leader lines, dimension rules, construction marks, figure stamps, revision callouts. Motion is "the schematic drawing itself as you read."

## Move 01 — Counter animation ($50M from 0)
Where it applies: Impact page, Autodesk hero metric
How it manifests: Number animates up as a dial on a torque spec — counter rises with a thin sweep arc tracing around it like a gauge marker. Prior-year baseline renders as a dotted reference line underneath, stamped REF. PRIOR FY.

## Move 02 — Tier ladder morphs / breathes
Where it applies: Impact page, Autodesk three-tier service ladder
How it manifests: Tiers render as an exploded assembly — on scroll, construction lines draw themselves connecting the three tiers. Part numbers appear one by one.

## Move 03 — Review Terminal lives / types
Where it applies: AI Build case study, QA research log
How it manifests: Technical log readout — FIG. 03 · QA TRACE header, findings stamp in one by one with pass/fail marks in the margin (✓ / ✗). Looks like a service bulletin being written in real time.

## Move 04 — EY 4.57M → 715 spatial gap
Where it applies: Impact page, EY healthcare metrics
How it manifests: Two specs at opposite ends of a dimensional rule — literal measurement line with a tick mark labeled GAP BY DESIGN in mono. Whitespace IS the dimension call-out.

## Move 05 — Wipro six-to-one collapse
Where it applies: Impact page, Wipro operations
How it manifests: Six labeled columns redraw themselves into three tiers on scroll, with projection lines from old to new positions. Small stamp: REV. 02 · REDRAWN.

## Move 06 — Signal → Story hover plays film
Where it applies: Signal → Story film grid
How it manifests: Each film tile gets a fiche-style corner crop mark (⌐) that animates into crosshairs on hover. First 2s of film plays in the frame. Holds still on mouseout.

## Move 07 — Case cards with live data glyph
Where it applies: Case Studies hub, each card
How it manifests: Each card gets a figure stamp (FIG. 01-A) with a tiny inline sparkline, pulse, or tier indicator. On tap, the glyph animates into the hero element of the next page.

## Technical pattern for scroll-triggered moves

Several of the seven moves are scroll-triggered (counter rises on entry, tier ladder draws construction lines on scroll, six-column collapse animates on scroll, case card glyph animates on click-through). The technical pattern is shared across all of them:

- **Trigger:** IntersectionObserver. Fire once when the element first enters the viewport.
- **No re-trigger:** scrolling up and back down does not replay the animation. The element renders in its final state once triggered.
- **Reduced motion:** if the user has `prefers-reduced-motion: reduce`, render the final state immediately. Skip the animation, do not hide the content.
- **Single-fire principle:** no looping ambient motion. Every move runs once and stops at its end state. (Hover-triggered moves like Move 06 film preview are the exception — they replay on hover.)

Working reference implementation: EY Section 5 underline (`monument__underline--drawn` class toggled by an IntersectionObserver after the monument enters viewport, paired with CSS `stroke-dasharray` animation respecting `prefers-reduced-motion`).

Apply this pattern to every new scroll-triggered move unless a brief explicitly calls for different behavior.

---

## How to use this file
When writing each brief, pull ONLY the moves relevant to that page. Don't paste all seven into every brief.
