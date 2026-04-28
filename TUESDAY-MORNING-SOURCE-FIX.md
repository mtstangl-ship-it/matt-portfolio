# TUESDAY MORNING SOURCE-FIX CURSOR COMMAND

**Run this at 6:45am Tuesday April 28, 2026.**

This command applies the 9 cross-page source fixes Cursor audited Monday evening. It also adds the new "13K annual lockouts eliminated" metric to the Wipro outcome strip.

After Cursor runs this, Vercel will auto-redeploy with corrected text. Verify the live site at the Vercel URL before Claude Design starts at 9am.

---

## THE COMMAND TO PASTE INTO CURSOR

Copy everything between the triple-backticks below into Cursor and run.

```
Apply 9 cross-page source fixes for Tuesday Claude Design pre-flight.

These fixes were audited Monday evening (April 27). All target strings and line numbers are confirmed present. Apply each fix verbatim. Do NOT rewrite or "improve" anything beyond what is specified.

After all fixes are applied, run a final verify-and-report step.

═══════════════════════════════════════════════════════════════
WIPRO FIXES — src/content/cases/wipro.html
═══════════════════════════════════════════════════════════════

FIX W-1: Outcome brief field
File: src/content/cases/wipro.html
Line 12

FIND (verbatim):
      <div class="c"><span class="k">Outcome</span><span class="v">Eight-figure renewal · NPS past goal</span></div>

REPLACE WITH:
      <div class="c"><span class="k">Outcome</span><span class="v">31% MTTR reduction · 13K annual lockouts · 13%+ NPS over goal</span></div>

═══════════════════════════════════════════════════════════════

FIX W-2: NPS metric in outcome strip
File: src/content/cases/wipro.html
Line 111

FIND (verbatim):
    <div class="m"><span class="v">+15<small>%</small></span><span class="k">NPS over goal</span></div>

REPLACE WITH:
    <div class="m"><span class="v">+13<small>%</small></span><span class="k">NPS over goal</span></div>

═══════════════════════════════════════════════════════════════

FIX W-3: Hero unit line — drop 16K denominator
File: src/content/cases/wipro.html
Line 106

FIND (verbatim):
      <span class="cap">MTTR reduction · 16,000+ annual cases</span>

REPLACE WITH:
      <span class="cap">MTTR reduction · process behavior change, not throughput</span>

NOTE: This consolidates the .cap and .unit content. After this change, verify the .unit span on line 107 is still present:
      <span class="unit">Process behavior change, not throughput</span>

If the .unit span on line 107 now duplicates the new .cap content, REMOVE line 107's .unit span entirely so it doesn't render the same text twice.

═══════════════════════════════════════════════════════════════

FIX W-4: Add 13K annual lockouts metric to outcome strip (NEW INSERTION)
File: src/content/cases/wipro.html
After line 114 (the existing "Cases resolved at T1" .m row), INSERT a new .m row:

INSERT after line 114:
    <div class="m"><span class="v">13K</span><span class="k">Annual lockouts eliminated</span></div>

The .metrics container should now contain 5 .m rows (NPS, Outcomes, Tiers, T1, Lockouts) instead of the previous 4.

═══════════════════════════════════════════════════════════════

FIX W-5: Tag spacing — Companies · Case 04
File: src/content/cases/wipro.html
Line 2

FIND (verbatim):
    <div class="tag"><span class="bar"></span><span>Operations · ITIL Transformation · Estée Lauder Companies</span><span class="series">· Case 04 of 05</span></div>

REPLACE WITH:
    <div class="tag"><span class="bar"></span><span>Operations · ITIL Transformation · Estée Lauder Companies </span><span class="series">· Case 04 of 05</span></div>

NOTE: The change is adding a single space character before the closing </span> of the first text span (after "Companies"). This produces the correct rendered output of "Companies · Case 04" with proper spacing.

═══════════════════════════════════════════════════════════════

FIX W-6 + W-7: Remove Section 02 Pivot chapter entirely
File: src/content/cases/wipro.html
Lines 137-158 (inclusive of <section class="chapter"> opening and </section> closing for chapter 02)

FIND (the entire <section class="chapter"> block for chapter 02 starting at line 137 and ending at the matching </section>):

The block begins:
  <section class="chapter">
    <div class="stage"><span class="lab">02 · Pivot</span><span class="ttl">The engagement-defining call</span></div>

And ends with </section> at line 158.

REMOVE the entire block (lines 137-158 inclusive).

NOTE: After removal, chapter numbering in the file does NOT need to be renumbered. The visible chapter labels (01 · Brief, 03 · Diagnosis, 04 · Case Flow, etc.) are display strings — keeping the gap between 01 and 03 is acceptable since the locked Wipro copy treats Section 01 (Brief) as absorbing the pivot logic.

VERIFY after removal: The next <section class="chapter"> in the file should be the Diagnosis chapter (originally lines 160-184).

═══════════════════════════════════════════════════════════════

FIX W-8: Section 03 / Case Flow chapter headline
File: src/content/cases/wipro.html
Line 190

FIND (verbatim):
      <h2>Follow one lockout ticket through both models.</h2>

REPLACE WITH:
      <h2>One ticket. Two models. Same Monday morning.</h2>

═══════════════════════════════════════════════════════════════
CROSS-PAGE FIXES — src/content/case-studies.ts
═══════════════════════════════════════════════════════════════

FIX C-1: Centaur Practice display strings (slug stays as "ai")
File: src/content/case-studies.ts
Lines 47-55 (the slug "ai" entry)

CHANGES (three string replacements within this entry):

a) Line 52: tag string
   FIND: tag: "AI WORKFLOW",
   REPLACE: tag: "CENTAUR PRACTICE",

b) Line 54: shortName string
   FIND: shortName: "AI Workflow",
   REPLACE: shortName: "Centaur Practice",

c) Line 55: panelLabel string
   FIND: panelLabel: "AI WORKFLOW",
   REPLACE: panelLabel: "CENTAUR PRACTICE",

Also fix the comment on line 5 (or wherever the "1. AI Workflow, 2. Synthetic Users, ..." comment lives):

FIND any comment containing: AI Workflow
REPLACE: Centaur Practice

DO NOT change the slug itself. The line "slug: "ai"," stays as "ai". URL slug migration is deferred to post-launch.

═══════════════════════════════════════════════════════════════

FIX C-2: Case Studies hub title
File: src/content/case-studies.ts
Line 15

FIND (verbatim):
  title: "Proof in flight.",

REPLACE WITH:
  title: "Selected work.",

═══════════════════════════════════════════════════════════════
CROSS-PAGE FIX — src/content/home.html (or equivalent Home component)
═══════════════════════════════════════════════════════════════

FIX H-1: Home Problem Ledger item #4
File: Search for the Home Problem Ledger Solved column. The exact file path is one of:
- src/content/home.html
- src/components/Home/...
- src/pages/index.tsx or similar

Search for: "Cut MTTR by 31% across 16,000 annual cases"

If found:
FIND: Cut MTTR by 31% across 16,000 annual cases
REPLACE WITH: Cut MTTR by 31% — 13K annual lockouts eliminated

NOTE: The em-dash character is "—" (U+2014), not a hyphen "-".

If the string is not found in the expected locations, search the entire src/ directory for "16,000 annual cases" and apply the replacement wherever found. Report all files touched.

═══════════════════════════════════════════════════════════════

FIX H-2: COPY-home.md (canonical Home copy file) Problem Ledger item #4
File: /COPY-home.md (at repo root)

Search for: "04 · Cut MTTR by 31% across 16,000 annual cases"

FIND (verbatim, in the Problem Ledger Solved rotating items list):
04 · Cut MTTR by 31% across 16,000 annual cases

REPLACE WITH:
04 · Cut MTTR by 31% — 13K annual lockouts eliminated

NOTE: This keeps COPY-home.md aligned with the live source after FIX H-1. Both files must show the corrected wording so the canonical copy file matches what renders on the live page.

NOTE: The em-dash character is "—" (U+2014), not a hyphen "-".

═══════════════════════════════════════════════════════════════
IMPACT PAGE FIXES — bringing live source into alignment with COPY-impact.md
═══════════════════════════════════════════════════════════════

NOTE: COPY-impact.md was updated April 27 with new headline/subhead, removed metric, and updated handoff. Live source has not been brought into alignment yet. These fixes complete that work.

The Impact page source file path is one of:
- src/content/impact.html
- src/components/Impact/...
- src/pages/impact.tsx

For each fix below: search the entire src/ directory if the expected path doesn't yield results. Report all files touched.

FIX I-1: Eyebrow
FIND: "LIVE IMPACT BRIEFING · Q1 2026"
REPLACE WITH: "IMPACT · 2020–2026"

NOTE: The en-dash character is "–" (U+2013), not a hyphen "-".

FIX I-2: Hero headline
FIND: "Enterprise design, measured at altitude."
REPLACE WITH: "Three enterprise transformations. In numbers."

FIX I-3: Hero subhead — verify and replace if found
Search for either of:
- "Three enterprise transformations. One leader."
- "One leader. This is what the work returned"

If found, REPLACE WITH: "What shipped, what moved, what carried."

If neither is found (because COPY-impact.md updates haven't been applied to live source yet), the subhead may not exist in current live source — INSERT the new subhead immediately below the hero headline in standard subhead markup.

FIX I-4: ID Card — remove Window field
Search for: "Window" or "0→1 practice builds"
The current ID Card has 5 fields: Operator / Role / Engagements / Scope / Window. The Window field with content "0→1 practice builds · 1→2 experience delivery" must be REMOVED entirely.
After removal, ID Card has 4 fields: Operator / Role / Engagements / Scope.

FIX I-5: Wipro tab body — remove Takeda
FIND: "Estée Lauder and Takeda"
REPLACE WITH: "Estée Lauder"

NOTE: The exact phrasing in current source may include surrounding context. Verify the replacement preserves grammar — if the source reads "...for Estée Lauder and Takeda, building..." the replacement is "...for Estée Lauder, building..."

FIX I-6: Wipro tab — remove eight-figure renewal claim
Search for: "Eight-figure renewal" or "eight-figure renewal" (case insensitive)
REMOVE this phrase and any associated visual element (hero metric chip, pull-quote, etc.) from the Wipro tab.
The Wipro tab hero metric should now be: "13%+ · NPS goal exceeded" (matches COPY-impact.md).
If the eight-figure renewal was the hero metric, REPLACE the hero metric with: "13%+ · NPS goal exceeded"

FIX I-7: Wipro tab NPS metric
FIND: "+15%" in Wipro tab context (within metrics strip, near "NPS over goal" label)
REPLACE WITH: "+13%"

OR if format is different:
FIND: "15% NPS" or "15%+ NPS"
REPLACE WITH: "13%+ NPS"

Verify final rendering reads "+13% NPS over goal" or "13%+ NPS goal exceeded" depending on existing markup pattern.

FIX I-8: Wipro tab metrics strip — remove 16,000+ Cases routed
The Wipro tab currently has a 4-metric strip:
- 16,000+ Cases routed
- 30+ Outcomes shipped
- 3 Handoff tiers
- 13k Annual reduction in lockout cases

REMOVE the "16,000+ Cases routed" metric entirely. Strip is now 3 metrics.

NOTE: The reasoning is documented in COPY-impact.md ACCURACY NOTES — number wasn't load-bearing for the page; case volume during Matt's tenure was significantly larger but the metric isn't compelling.

FIX I-9: Wipro tab Delta line
FIND: "Delta across 16k cases"
REPLACE WITH: "Delta across all routed cases"

FIX I-10: EY tab — three cities (not four)
The current EY tab references 4 cities: Atlanta, Augusta, Macon, Savannah.
The corrected EY tab references 3 cities only: Atlanta, Athens, Savannah.

This requires:
a) REMOVE all references to "Augusta" and "Macon" — including map pin SVG elements, animation triggers, per-city data rows, and any descriptive text.
b) ADD references to "Athens" — map pin SVG element with appropriate coordinates, per-city data row, and descriptive text.
c) UPDATE per-city data rows to:
   - Atlanta: 2.41M engagements · 452 vaccines · "Metro hub · anchor partner sites"
   - Athens: 1.65M engagements · 175 vaccines · "Twilight Criterium · UGA Athletics partnership"
   - Savannah: 0.51M engagements · 88 vaccines · "Coastal delivery · mobile teams"

Math reconciles: 452 + 175 + 88 = 715 total vaccines.

NOTE: This is the single most complex fix in the source-fix command. If the SVG map structure or animation system is non-trivial to modify, FLAG this for manual review rather than attempting partial fixes. Map updates must apply consistently across SVG, animation, and per-city data — partial fixes introduce inconsistency.

FIX I-11: EY tab — partner count
FIND: "10+ partners" or "10+ Partners" (case insensitive)
REPLACE WITH: "24+ partners" or "24+ Partners" (preserving original capitalization pattern)

Search for all instances — the partner count likely appears in:
- Hero metric line ("715 vaccinations · 4.57M engagements · 10+ partners")
- Metrics strip ("10+ Partners" with subheading)
- Possibly in role line copy

FIX I-12: EY tab Atlanta vaccines
FIND: "412 vaccines" in Atlanta context
REPLACE WITH: "452 vaccines"

NOTE: The 412 → 452 correction reconciles math to 715 total (452 + 175 + 88).

FIX I-13: EY tab — remove map summary strip
COPY-impact.md notes the map summary strip was REMOVED (was redundant with city rows above). Look for a summary strip below the Georgia map that aggregates the per-city numbers. If present, REMOVE it.
NOTE: Removing it may leave a layout gap — flag this for Tuesday Claude Design to address during the build pass.

FIX I-14: Closing handoff headline
FIND: "The work that made these numbers, and others, possible."
REPLACE WITH: "The work behind the numbers, in case study form."

═══════════════════════════════════════════════════════════════

After all fixes are applied, run these verifications and report findings:

1. Search the entire repo for these strings — none should be found:
   - "Eight-figure renewal" / "eight-figure renewal"
   - "+15%" in NPS context (specifically the +15<small>%</small> with NPS over goal label)
   - "16,000+ annual cases"
   - "16,000 annual cases"
   - "16,000+ Cases routed" (Impact tab)
   - "Delta across 16k cases" (Impact Wipro tab)
   - "Four weeks in, we killed the original plan"
   - "Follow one lockout ticket through both models"
   - "AI Workflow" (in display strings, not in slug)
   - "Proof in flight"
   - "Measured at altitude"
   - "Live Impact Briefing" / "LIVE IMPACT BRIEFING"
   - "End of briefing"
   - "Estée Lauder and Takeda"
   - "Augusta" / "Macon" (in EY context)
   - "10+ partners" / "10+ Partners"
   - "412 vaccines" (in Atlanta context)
   - "0→1 practice builds" / "Window" field in Impact ID Card
   - "Three enterprise transformations. One leader." (Impact subhead)
   - "The work that made these numbers, and others, possible." (Impact handoff)

2. Search the entire repo for these strings — all should be found:
   - "31% MTTR reduction · 13K annual lockouts · 13%+ NPS over goal" (in Wipro Outcome brief)
   - "+13<small>%</small>" with NPS over goal label
   - "MTTR reduction · process behavior change, not throughput"
   - "13K" with "Annual lockouts eliminated" label
   - "Estée Lauder Companies " (with trailing space) in Wipro tag
   - "One ticket. Two models. Same Monday morning."
   - "CENTAUR PRACTICE" (tag/panelLabel) and "Centaur Practice" (shortName)
   - "Selected work." (case studies hub title)
   - "IMPACT · 2020–2026" (Impact eyebrow)
   - "Three enterprise transformations. In numbers." (Impact headline)
   - "What shipped, what moved, what carried." (Impact subhead)
   - "Athens" (in EY tab — map and per-city data)
   - "452 vaccines" (in Atlanta context)
   - "24+ partners" or "24+ Partners"
   - "Delta across all routed cases" (Impact Wipro tab)
   - "The work behind the numbers, in case study form." (Impact handoff)
   - "13%+ NPS goal exceeded" or "+13% NPS over goal" (Impact Wipro tab hero metric)

3. Verify Section 02 Pivot chapter is GONE from src/content/cases/wipro.html

4. Verify Wipro outcome strip now has 5 .m rows (was 4)

5. Verify the URL slug "ai" is UNCHANGED in case-studies.ts

6. Verify Impact ID Card has 4 fields only (Operator / Role / Engagements / Scope) — Window field removed

7. Verify Impact Wipro tab metrics strip has 3 metrics (was 4) — 16,000+ Cases routed removed

8. Verify EY tab map shows 3 city pins (Atlanta, Athens, Savannah) — Augusta and Macon removed, Athens added

9. Verify EY tab math reconciles: 452 + 175 + 88 = 715 total vaccinations

10. Run the local build to ensure no JSX/HTML errors:
    - npm run build (or yarn build)
    - Report any errors

11. Confirm Vercel will auto-deploy. Report deploy URL and timestamp.

═══════════════════════════════════════════════════════════════
ROLLBACK
═══════════════════════════════════════════════════════════════

If anything breaks the build or renders incorrectly:
- Do NOT push to main / trigger Vercel deploy
- Report the specific error
- Wait for Matt's call before proceeding

If the build is clean and Vercel deploys without errors but the rendered page looks wrong:
- Capture the rendered URL and a screenshot
- Report what looks wrong
- Wait for Matt's call before any further changes

═══════════════════════════════════════════════════════════════
END OF FIX COMMAND
═══════════════════════════════════════════════════════════════

Report back when all fixes are applied, all verifications pass, and Vercel has deployed. Include:
- List of files touched
- Confirmation each fix landed
- Any errors encountered
- Final Vercel deploy URL
```

---

## WHAT THIS COMMAND DOES IN PLAIN ENGLISH

1. Replaces "Eight-figure renewal" in Wipro Outcome with three real metrics
2. Changes Wipro NPS from +15% to +13%
3. Drops the "16,000+ annual cases" denominator from Wipro hero metric
4. Adds a new "13K annual lockouts eliminated" line to Wipro outcome strip
5. Fixes the missing space in Wipro's tag ("Companies · Case 04")
6. Removes the entire Section 02 (Pivot) chapter from Wipro
7. Updates Wipro Section 03 headline from "Follow one lockout ticket" to "One ticket. Two models. Same Monday morning."
8. Updates display strings for Centaur Practice (shortName/tag/panelLabel) — slug stays as "ai"
9. Changes case studies hub title from "Proof in flight." to "Selected work."
10. Updates Home Problem Ledger item #4 to match Wipro case study lock

After this runs cleanly, the live site reflects all the locked decisions from Monday's lock pass. Tuesday Claude Design then builds against accurate copy.

---

## WHAT TO DO IF SOMETHING GOES WRONG

If Cursor reports any failed fix:
- Don't push to main
- Send me the error
- I'll write a focused recovery command

If the build fails after fixes:
- Don't push to main
- Send me the error
- I'll diagnose and write a recovery

If Vercel deploys but the live site looks broken:
- Send me the URL and a screenshot
- I'll diagnose

The fixes are surgical and target verbatim strings. Risk of breakage is low. But always verify before Claude Design starts at 9am.
