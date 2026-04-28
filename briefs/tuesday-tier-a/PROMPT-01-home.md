# TUESDAY PROMPT — HOME PAGE

**Run after Tuesday morning source-fix command lands cleanly.**
**Run as the FIRST Claude Design prompt of Tuesday — Home v2 is the dependency for Centaur Practice.**

---

## THE PROMPT TO PASTE INTO CLAUDE DESIGN

Copy everything between the triple-backticks below into Claude Design and run.

```
# TUESDAY BUILD — HOME PAGE

## CONTEXT

You are rebuilding the Home page for matt-portfolio. This is page 1 of 3 in Tuesday's Tier A primary block. Home is the portfolio's first impression and is COUPLED to Centaur Practice — Home's v2 state becomes the screenshot reference for Centaur Practice's Deployment Diff service record (captured Thursday). If Home doesn't ship Tuesday, Centaur Practice can't ship.

This is the most consequential single rebuild in the project. Build it correctly the first time.

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
2. /reference/intrigue-moves.md — locked moves catalog
3. /DESIGN-NOTES.md — accumulated design constraints; pay special attention to Home-specific section and global accessibility heuristics
4. /PROJECT-CONTEXT-HANDOFF.md — cliché kill list, persistent reminders. Pay special attention to:
   - Reminder 1 (V2 screenshot dependency)
   - Reminder 8 (31% MTTR defensibility framing)
   - The full cliché kill list

Page-specific (read after foundational):
5. /briefs/brief-home.md — your primary directive for this build
6. /COPY-home.md — locked copy. Build to this verbatim. Do NOT edit it.
7. /COPY-case-studies-hub.md — locked hub copy. The Case Studies preview section on Home pulls teasers for Wipro and EY from this file (per brief Section 07).
8. /reference/fiche-prototype-screenshots/ — apply this visual grammar with RESTRAINT (Home is synthesis page, not full fiche application — see brief Section 04)
9. /reference/current-state-screenshots/ — Mobile Homepage 1.PNG through 8.PNG (current state on mobile, what you are replacing) plus desktop equivalents if present

## THE BUILD

Apply the directive at /briefs/brief-home.md to rebuild the Home page.

The brief tells you:
- What sections appear on the page (Section 03 of brief)
- What copy lives where (Section 02 — points to /COPY-home.md)
- What visual moves to apply (Section 04 — Move 01 counter, Move 06 Signal → Story hover)
- What's already decided vs. what you decide during build (Sections 07 and 08)
- What "good" looks like (Section 10)

Touch ONLY Home page component files. Do not edit other pages. Do not edit /COPY-*.md files.

## CRITICAL CONSTRAINTS

1. **Home v2 must work as a screenshot reference for Centaur Practice.** When the prototype is approved and ported to Next.js, capture screenshots of the live preview deployment at 1280px and 390px for the Thursday Deployment Diff capture.

2. **Mobile hero must end with role line + contact links visible without scroll** at 390px viewport. This is the single most-tested mobile constraint.

3. **Problem Ledger pairs rotate SYNCHRONOUSLY.** Left and right items in the same pair advance together as a unit. The 6 pairings are LOCKED in the brief Section 07 — do not improvise. Pairing logic: pair 01 = Autodesk $50M ↔ Service tiers want, pair 02 = Wipro towers ↔ XD as operating model want, pair 03 = EY vaccination ↔ stigmatized care want, pair 04 = MTTR/lockouts ↔ ownership of operational signal want, pair 05 = built CX practice ↔ healthcare access want, pair 06 = synthetic users ↔ AI ceiling want. Offset timing exists only BETWEEN consecutive pairs, not within a pair. Mobile: pairs scroll vertically as a block.

4. **Stanford AI credential MUST render as dark-themed card.** It was previously a light-mode break — do not repeat that.

5. **Signal → Story film tiles autoplay on mobile via scroll-into-view, NOT tap/click/touch.** This is locked. **AUDIO IS ALWAYS OFF on Home tile previews.** These are SILENT preview clips — first 2s of film with `muted` attribute set on every video element. Never the full film with audio. The full audio version of any Signal → Story film plays only in a dedicated context where the user explicitly chooses to listen (e.g., separate page or modal). If a tile fires audio when scrolled into view, that is a build defect — fix it before reporting back.

6. **Tier chips on Autodesk card render as plain text with · separators, NOT pill UI.** Pill UI reads as interactive filter.

7. **31% MTTR figure in Problem Ledger item #4** appears as "Cut MTTR by 31% — 13K annual lockouts eliminated" — verbatim. Do NOT hedge to "approximately 31%" or "around a third." Per Reminder 8.

8. **TRANSFORMATION DASHBOARD: All three cards get counter animation on every number.** Autodesk ($50M, 106%, +27%, 0→1→2), Wipro (31%, 30+, 13%+, 13K), EY (4.57M, 715, 40+, 24+). Counters fire STAGGERED on scroll-into-view, not simultaneous — visual cacophony if all 12 numbers fire at once.

9. **ANIMATION DESIGNS ARE LOCKED. You change ONLY the cueing.**
   - Mobile: scroll-into-view trigger
   - Desktop: hover-invitation gesture (subtle pulse / dimension marks fading in / leader line drawing — pick specifics during build)
   - Animation timing, motion paths, and easing curves stay as currently designed
   - Do NOT redesign the animations themselves

10. **All three Dashboard cards must be responsive to zoom AND viewport width.** Current state is broken on Wipro and EY — copy gets cutoff at narrow widths or higher zoom. Make all three cards reveal/hide copy progressively. Test 80%, 100%, 125% browser zoom.

11. **Cliché kill list compliance.** Do not introduce: "Proof in flight," "Measured at altitude," "Exit velocity," "Operator" (allowed only on Impact ID Card), aerospace metaphors, "At the system level" (more than once), "Journey-led operating models" (more than once).

12. **CASE STUDIES PREVIEW SECTION** sits between Stanford and Signal → Story. Featured tier: 3 cards (Centaur Practice large + Synthetic Users + Autodesk supporting) — copy from /COPY-home.md. Secondary tier: 2-card row exposing Wipro + EY — pull teaser copy from /COPY-case-studies-hub.md Cards 04 and 05. Inherits Case Studies hub picker component. All 5 case studies must be exposed from Home.

13. **Apply fiche grammar with RESTRAINT.** Mono eyebrows yes. Dimension rule between Problem Ledger columns yes. Figure stamps where they earn placement (sparingly). Do NOT apply heavy fiche treatment — extensive leader lines on every metric, full technical-illustrator artifacts everywhere, REV stamps on every card. Home is the synthesis page; restrained grammar reads as confident, over-applied grammar reads as costume. Home should feel coherent with case studies but NOT like a case study itself.

## REPORT BACK

When the prototype is complete and ready for review, report:

1. **HTML prototype delivered** — provide the prototype (inline in chat, or as downloadable file structure)
2. **Decisions you made on the brief's Section 08 "Decisions Open" items** — list each open decision and what you chose
3. **Layout issues that required flagging** — anywhere copy didn't fit and you needed Matt's input
4. **Cross-page implications** — anything you noticed that affects other Tier A pages
5. **Handoff zip status** — once Matt approves the prototype, package as a handoff zip with component-organized files for Cursor port. Confirm zip structure when delivered.

## DO NOT PROCEED to Centaur Practice or any other page after this build. Stop after Home and report. Matt reviews before next build starts.
```

---

## WHAT TO EXPECT WHEN CLAUDE DESIGN RUNS THIS

- Reading time: ~5-10 min for foundational + page-specific docs
- Build time: ~60-90 min for full Home rebuild
- Total Claude Design session for Home: ~70-100 min

When Claude Design reports back:
- Review the "Decisions made" section first — push back on anything that drifts from locked decisions
- Review screenshots if you can see them
- Check the live preview deploy URL
- Lock or send revisions before pasting the Centaur Practice prompt

If you don't have time for full review and need to keep moving, accept the Home build as-is and proceed to Centaur Practice. You can revise Home Wednesday/Thursday before the screenshot capture.
