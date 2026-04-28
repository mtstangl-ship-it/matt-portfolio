# TUESDAY PROMPT — IMPACT PAGE

**Run after Centaur Practice build is complete and reviewed.**
**Run as the THIRD Claude Design prompt of Tuesday.**

---

## THE PROMPT TO PASTE INTO CLAUDE DESIGN

Copy everything between the triple-backticks below into Claude Design and run.

```
# TUESDAY BUILD — IMPACT PAGE

## CONTEXT

You are rebuilding the Impact page for matt-portfolio. This is page 3 of 3 in Tuesday's Tier A primary block. Impact is the portfolio's quantified-evidence layer — every shipped result, every operational metric, every signal that work moved a number. It aggregates outcomes that also appear on case study pages and the Home Transformation Dashboard.

CRITICAL FRAMING: Impact already exists in functional form on the live site. Your work is **enhancement, not redesign from zero.** The page has working artifacts (Georgia map, three-tab navigation, ID Card, per-tab deep dives, tier ladder) that earn their place. You preserve the structure, refine the grammar with restraint, fix accuracy issues, and add visual punch on the Wipro and Autodesk tabs where the current state is text-and-strip-heavy. Do NOT redesign EY's Georgia map — it's working.

Audience: Marc S. (systems purist) and John M. (metrics skeptic). Both will scan for unsupported claims and inconsistent numbers across surfaces.

## WORKFLOW — DELIVERABLE FORMAT

Your deliverable is a self-contained HTML/CSS prototype that Matt reviews iteratively, NOT direct commits to the matt-portfolio repo.

Workflow:
1. You produce the rebuilt page as a self-contained HTML/CSS prototype (single file with embedded styles is fine, or organized files if structure helps)
2. Matt reviews the prototype in our chat — we iterate together until it's right
3. When approved, you package the final result as a handoff zip with component-organized files (clear class naming, separable sections) so Cursor can port to the Next.js stack on the tier-a-rebuild branch

You have GitHub READ access to the matt-portfolio repo on branch tier-a-rebuild. You can read all referenced files. You do NOT commit directly to the repo. The handoff zip is the bridge between your design output and Cursor's implementation.

## REQUIRED READING — READ IN THIS ORDER, FULLY, BEFORE TOUCHING ANY CODE

Foundational (read before any page-specific work):
1. /reference/visual-grammar.md — fiche grammar canonical doc
2. /reference/intrigue-moves.md — locked moves catalog (capability menu — apply where they earn placement, not by mandate)
3. /DESIGN-NOTES.md — accumulated design constraints; pay special attention to Impact section
4. /PROJECT-CONTEXT-HANDOFF.md — cliché kill list, persistent reminders. Pay special attention to:
   - Reminder 8 (31% MTTR defensibility framing)
   - The cliché kill list (note: "operator" is allowed ONLY on Impact ID Card and nowhere else on the site; "Live Impact Briefing" / "End of briefing" / "Measured at altitude" are all kill list violations)

Page-specific (read after foundational):
5. /briefs/brief-impact.md — your primary directive for this build
6. /COPY-impact.md — locked copy. Build to this verbatim. Do NOT edit it. (Updated April 27 with new subhead and handoff headline.)
7. /reference/fiche-prototype-screenshots/ — apply this visual grammar with RESTRAINT
8. Live site at deploy URL — current state of Impact page after Tuesday morning source-fix command runs

Cross-reference (for metric alignment — Impact aggregates these):
9. /COPY-case-wipro.md — Wipro metrics source of truth (locked April 27)
10. /COPY-home.md — Home Transformation Dashboard cards share metrics with Impact tabs

## TAB POSTURE — LOCKED

Per Matt's April 27 direction:

**EY tab — PRESERVATION POSTURE.**
The Georgia map artifact is working. Three city pins (Atlanta, Athens, Savannah). Hover-to-reveal city detail panel. Cartographic treatment. Per-city metrics. This artifact stays. Refine fiche grammar lightly: mono labels on city rows, dimension rules between cities if rhythm earns it, provenance line under hero metric. Add counter animation to 4.57M, 715, 24+ where cadence works. DO NOT redesign the map. DO NOT replace it. The map is already doing the spatial work.

**Wipro tab — OPPORTUNITY POSTURE.**
Currently text-and-strip-heavy. Visual punch is welcome. Latitude options you can pursue (none required, none locked):
- Six-to-three structural collapse on scroll
- Tier ladder exploded-axonometric treatment for T1/T2/T3
- Before/After delta visualization (currently text)
- Counter animations with staggered firing
Constraint: copy is locked. Do NOT duplicate or contradict the LOCKOUT.ECONOMICS hero band from Wipro case study — Impact's Wipro tab is summary-density, case study is breakdown-density.

**Autodesk tab — OPPORTUNITY POSTURE.**
Tier ladder is the primary visual but currently flat. Latitude options you can pursue:
- Three-tier ladder with progressive depth/load treatment
- Innovated/optimized/refined chips with visual differentiation
- Revenue motion arc visualization
- Counter animations on $50M+, +27%, 106%, 75%+
- Service-card stack with hover-to-reveal services list
Constraint: copy is locked. Tier ladder structure is locked. Visual treatment of the ladder is open.

**Hero / ID Card / breadcrumb / three-tab nav — PRESERVE structure.** Apply fiche grammar.

## THE BUILD

Apply the directive at /briefs/brief-impact.md to enhance the Impact page.

The brief tells you:
- Page structure verbatim from COPY-impact.md (Section 03)
- Capability menu and tab-specific posture (Section 04)
- What's already decided vs. what you decide during build (Sections 07 and 08)
- What "good" looks like (Section 10)

Touch ONLY Impact page component files. Do not edit other pages. Do not edit /COPY-*.md files.

## CRITICAL CONSTRAINTS

1. **The page is an instrument panel, not a poster.** Numbers earn visual weight through specificity (denominators, time windows, source attribution), not through font size alone. If a number is rendered large, it must have an even more specific source/method line below it.

2. **Counters fire on scroll-into-view, NOT on page load.** Multiple simultaneous counters create visual noise. Stagger by section.

3. **Apply fiche grammar with RESTRAINT.** Mono eyebrows, dimension rules, figure stamps where they earn placement. Do NOT apply heavy treatment everywhere — Impact is enhancement, not redesign. Same light-touch principle as Home.

4. **EY Georgia map is preserved.** Refine grammar and add counter animations only. DO NOT redesign or replace. The map is the page's strongest preserved artifact.

5. **ID Card "operator" reference appears only on ID Card** — locked. Render as engineer-of-record stamp aesthetic: mono header "ID · M. STANGL · ENGINEER OF RECORD", monospace data table, no decorative flourishes. Do NOT replicate "operator" framing anywhere else on the page.

6. **Window field REMOVED from ID Card** per April 27 cleanup. The ID Card has 4 fields only: Operator / Role / Engagements / Scope. Do NOT restore "Window" field with "0→1 practice builds" content.

7. **Per-engagement metrics MUST align with case study source-of-truth files (verify after Tuesday morning source-fix lands):**
   - Wipro: +13% NPS goal exceeded (NOT +15%) / 30+ outcomes / 3 tiers / 13K lockouts
     (Verify: NO "+15%", NO "16,000+ Cases routed", NO "Eight-figure renewal", NO "Takeda")
   - EY: 4.57M engagements / 715 vaccinations / 24+ partners
     (Verify: NO "10+ partners", three cities only — Atlanta 452 / Athens 175 / Savannah 88, math reconciles to 715, NO Augusta or Macon, NO 412 vaccines for Atlanta)
   - Autodesk: $50M+ / +27% / 106% / 75%+ — match COPY-impact.md verbatim

8. **Source attribution per metric block.** Every metric needs a provenance line in mono register where defensibility is non-trivial: "source · SPLUNK + ServiceNow" / "source · CDC partnership reporting" / etc. Don't let metrics float without provenance.

9. **31% MTTR defensibility (Reminder 8).** Number stands. Do NOT hedge to "approximately 31%" or "around a third." The methodology footnote at page bottom is the appropriate place to acknowledge defensibility tiers (sourced vs. internal-tracking vs. directional).

10. **Wipro tab metrics strip is 3 metrics, NOT 4.** The "16,000+ Cases routed" metric was REMOVED April 27. Strip is now: 30+ outcomes / 3 handoff tiers / 13K lockouts. Do NOT restore the 16,000 metric.

11. **Wipro tab Delta line says "Delta across all routed cases"** (NOT "Delta across 16k cases"). Number-of-cases denominator is removed.

12. **Hero headline + subhead locked April 27:**
    - Headline: "Three enterprise transformations. In numbers."
    - Subhead: "What shipped, what moved, what carried."
    Do NOT restore "Three enterprise transformations. One leader." or "Enterprise design, measured at altitude."

13. **Closing handoff headline locked April 27:**
    "The work behind the numbers, in case study form."
    Do NOT restore "The work that made these numbers, and others, possible."

14. **Cliché kill list compliance.** Do not introduce: "Proof in flight," "Measured at altitude," "Live Impact Briefing," "End of briefing," "Plausible scenarios and edge cases," aerospace metaphors. "Operator" ONLY on ID Card. "At the system level" once max. "Journey-led operating models" once max.

## REPORT BACK

When the prototype is complete and ready for review, report:

1. **HTML prototype delivered** — provide the prototype (inline in chat, or as downloadable file structure)

2. **Decisions you made on the brief's Section 08 "Decisions Open" items** — list each open decision and what you chose:
   - Wipro tab visual treatments chosen (any of: six-to-three collapse, tier ladder exploded-axonometric, Before/After diagram, counter staggering pattern)
   - Autodesk tab visual treatments chosen (any of: progressive tier depth, chip differentiation, revenue motion arc, service-card hover-to-reveal)
   - Methodology footnote treatment (kicker + paragraph vs. kicker + bullets vs. expandable)
   - Per-tab transition animation
   - Mobile ID Card behavior (drop entirely vs. compress)
   - Counter staggering pattern (per-tab vs. per-page)

3. **Metric alignment verification:** Confirm every per-engagement metric matches its source-of-truth case study file. List any discrepancies you encountered and how you resolved them. Specifically verify:
   - Wipro: no +15%, no 16,000, no eight-figure, no Takeda
   - EY: 24+ partners not 10+, 3 cities (Atlanta 452 / Athens 175 / Savannah 88), 4.57M engagements
   - Autodesk: $50M+ / +27% / 106% / 75%+

4. **Preservation verification:** Confirm EY Georgia map is intact and refined (not redesigned)

5. **Layout issues that required flagging** — anywhere copy didn't fit and you needed Matt's input

6. **Cross-page implications** — anything you noticed that affects other Tier A pages or Wipro, EY, or Autodesk case studies (those build later in the week)

7. **Handoff zip status** — once Matt approves the prototype, package as a handoff zip with component-organized files for Cursor port. Confirm zip structure when delivered.

8. **Build sequence:** Impact is page 3 of 3 in Tier A. Tuesday primary block complete. Report final prototype state.

## TUESDAY TIER A IS COMPLETE AFTER THIS BUILD.

If you have remaining Tuesday capacity after Impact, do NOT proceed to Tier B (About, Case Studies hub) without Matt's explicit go-ahead. Matt may want to review all three Tier A pages before authorizing further work. Report and wait for instruction.
```

---

## WHAT TO EXPECT WHEN CLAUDE DESIGN RUNS THIS

- Reading time: ~15-20 min (most cross-references of the three Tier A builds)
- Build time: ~75-105 min for Impact enhancement (preservation on EY, latitude on Wipro/Autodesk)
- Total Claude Design session for Impact: ~90-125 min

When Claude Design reports back:
- **Verify metric alignment FIRST** — any drift from source-of-truth files is the most important thing to catch
- **Verify the EY Georgia map is intact** — not replaced, not redesigned
- **Verify the 16,000+ Cases routed metric is GONE** from Wipro tab
- **Verify "operator" appears once (ID Card) and nowhere else**
- **Verify hero headline/subhead is the locked April 27 version**
- **Verify methodology footnote at page bottom acknowledges defensibility tiers**
- **Verify no cliché kill list violations**

If metric alignment drift is detected (e.g., Impact shows +15% NPS while Wipro case study shows +13%), this is a critical fix — push back immediately.

If Claude Design redesigns the Georgia map or removes its functionality, this violates the preservation posture — push back immediately.

If Claude Design's Wipro or Autodesk tab work is too literal an interpretation of the brief's "latitude options" (e.g., builds exactly the six-to-three collapse without considering whether it serves the page), push back if needed — the latitude was meant to invite invention, not menu-selection.

After Impact, Tuesday Tier A is complete. You have three rebuilt pages ready to ship. The remaining pages (Tier B and Tier C) build Wednesday-Thursday.
