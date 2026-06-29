# TUESDAY PROMPT — CENTAUR PRACTICE CASE STUDY

**Run after Home page build is complete and reviewed.**
**Run as the SECOND Claude Design prompt of Tuesday.**

---

## THE PROMPT TO PASTE INTO CLAUDE DESIGN

Copy everything between the triple-backticks below into Claude Design and run.

```
# TUESDAY BUILD — CENTAUR PRACTICE CASE STUDY

## CONTEXT

You are rebuilding the Centaur Practice case study for matt-portfolio. This is page 2 of 3 in Tuesday's Tier A primary block. Centaur Practice is COUPLED to Home — it contains a "Deployment Diff" service record showing v1 (current state) vs v2 (Home page rebuild from earlier today). The v2 screenshot is captured Thursday; for Tuesday, the Deployment Diff renders with a placeholder labeled REV. 01 · CAPTURE PENDING THU 4/30.

Centaur Practice is the portfolio's methodology proof — how Matt works, framed as instrumented partnership (Matt at controls, AI as engine, telemetry visible). It must withstand scrutiny from Marc S. (systems purist) and John M. (metrics skeptic) personas — readers who will scan for whether the methodology is rigorous or just decorated.

This is a meta-case-study: the portfolio is evidence of itself. Build with that frame.

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
2. /reference/intrigue-moves.md — locked moves catalog. Pay special attention to Move 03 (Service Records) and Move 06 (interactivity prompts).
3. /DESIGN-NOTES.md — accumulated design constraints; pay special attention to Centaur Practice section
4. /PROJECT-CONTEXT-HANDOFF.md — cliché kill list, persistent reminders. Pay special attention to:
   - Reminder 1 (V2 screenshot dependency for Deployment Diff)
   - The full cliché kill list

Page-specific (read after foundational):
5. /briefs/brief-centaur-practice.md — your primary directive for this build
6. /COPY-case-ai-build-revised.md — locked copy. Build to this verbatim. Do NOT edit it.
   (Or /COPY-case-ai-build.md if -revised version doesn't exist — verify which is canonical.)
7. /reference/fiche-prototype-screenshots/ — apply this visual grammar
8. /reference/current-state-screenshots/ — Centaur Practice / AI Workflow specific screenshots if present
9. /site-content/_artifacts/synthetic-users/qa-report/index.html — referenced from the Synthetic Users service record on Centaur Practice
10. /site-content/_artifacts/synthetic-users/design-critique/index.html — also referenced

## NOTE ON SLUG

The URL slug for this page is "ai" (e.g., /case-studies/ai). The slug stays as "ai" — do not migrate to "/case-studies/centaur" or similar. Slug migration is deferred to post-launch.

The DISPLAY STRINGS (shortName, tag, panelLabel) were updated this morning in the source-fix command from "AI Workflow" to "Centaur Practice." Verify those updates landed before you start.

Throughout the page, the display name is "Centaur Practice" — never "AI Workflow," never "AI Build," never "Human-AI Collaboration."

## THE BUILD

Apply the directive at /briefs/brief-centaur-practice.md to rebuild the Centaur Practice case study page.

The brief tells you:
- Six-section structure (Brief / Methodology / Service Records / Lesson / Links — with Service Records as the load-bearing section)
- What copy lives where (Section 02 — points to /COPY-case-ai-build-revised.md)
- What visual moves to apply (Move 03 Service Records, Move 06 interactivity prompts)
- What's already decided vs. what you decide during build
- What "good" looks like

Touch ONLY Centaur Practice case study component files. Do not edit other pages. Do not edit /COPY-*.md files.

## CRITICAL CONSTRAINTS

1. **Display name is "Centaur Practice" everywhere on this page** — verify no "AI Workflow" residue remains. Source-fix command this morning updated case-studies.ts; verify component renders the new strings.

2. **Service Records cluster together** — they are the case study's load-bearing artifact. Do NOT intersperse exposition between records. Records read as a set.

3. **Eyebrow prompts must signal interactivity** — TAP / DRAG / SEE language for tabs and toggles, not generic UI labels.

4. **Deployment Diff service record is the case study's strongest single beat.** For Tuesday, render it with a placeholder labeled "REV. 01 · CAPTURE PENDING THU 4/30." On Thursday, the placeholder gets replaced with side-by-side v1/v2 screenshots of Home (which you built earlier today).

5. **Decision Ledger is required** — show at least 3 specific moments where Matt overrode AI (or AI proposed something Matt changed) with one-line reasoning per moment. Honesty over polish.

6. **Synthetic Users service record links to /case-studies/synthetic-users** without duplicating its methodology. Centaur is methodology; Synthetic is the demonstrated example. Don't repeat Synthetic's Run A / Run B explanation — link to it.

7. **Methodology section must NOT read as a tools brag.** Frame each tool by the role it plays (build engine, strategy, visual layer, deploy), not by feature lists.

8. **Cliché kill list compliance.** Do not introduce: "Proof in flight," "Measured at altitude," "Plausible scenarios and edge cases," "Human-centered methodologies," "Centaur" used metaphorically beyond the practice name itself, motorcycle terms (those live on About only).

9. **Native register: methodology vocabulary.** Run A / Run B / service record / decision ledger / deployment diff / instrumented / telemetry. NOT product UI vocabulary, NOT consultant vocabulary, NOT AI hype vocabulary.

10. **Apply fiche grammar throughout.** Service records get figure stamps (FIG. 03-A, FIG. 03-B, etc.) with rev marks (REV. 02 · DEPLOYED for completed records, REV. 01 · IN REVIEW for in-progress, REV. 01 · CAPTURE PENDING for the Deployment Diff placeholder).

## REPORT BACK

When the prototype is complete and ready for review, report:

1. **HTML prototype delivered** — provide the prototype (inline in chat, or as downloadable file structure)
2. **Decisions you made on the brief's Section 08 "Decisions Open" items** — list each open decision and what you chose
3. **Layout issues that required flagging** — anywhere copy didn't fit and you needed Matt's input
4. **Verification:** Confirm display name "Centaur Practice" appears throughout the prototype — no "AI Workflow" residue. Confirm service records cluster together (not interspersed with prose). Confirm Decision Ledger shows at least 3 specific override moments (not vague platitudes).
5. **Cross-page implications** — anything you noticed that affects other Tier A pages
6. **Handoff zip status** — once Matt approves the prototype, package as a handoff zip with component-organized files for Cursor port. Confirm zip structure when delivered.

## DO NOT PROCEED to Impact or any other page after this build. Stop after Centaur Practice and report. Matt reviews before next build starts.
```

---

## WHAT TO EXPECT WHEN CLAUDE DESIGN RUNS THIS

- Reading time: ~10-15 min (more docs to read, including the Synthetic Users HTML artifacts referenced)
- Build time: ~60-90 min for full Centaur Practice rebuild
- Total Claude Design session for Centaur Practice: ~75-105 min

When Claude Design reports back:
- Verify "Centaur Practice" appears everywhere — no "AI Workflow" leakage
- Verify service records are clustered, not interspersed with prose
- Verify Deployment Diff has the placeholder with REV. 01 · CAPTURE PENDING THU 4/30
- Verify Decision Ledger shows at least 3 specific override moments
- Lock or send revisions before pasting the Impact prompt

If Decision Ledger shows generic AI-collaboration platitudes instead of specific override moments, push back hard. The Decision Ledger is the case study's honesty test — if it's vague, the methodology is decorated, not rigorous.
