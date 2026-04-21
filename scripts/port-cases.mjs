// One-shot extraction from reference/Case Study.html.
// Line-based, O(n). Writes:
//   src/app/cases.css             — the case-specific CSS, unchanged
//   src/content/cases/<slug>.html — each article body, raw
//
// Usage: node scripts/port-cases.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC =
  process.argv[2] ||
  "/Users/tron/Downloads/handoff 2/reference/Case Study.html";

const raw = await readFile(SRC, "utf8");
const lines = raw.split("\n");

// ----- CSS: take everything between `<style>` and `</style>`, then drop the
//       site-chrome / :root / body / topnav / shell / picker / article rules
//       that we don't need. The remainder are all case-unique selectors. -----
const styleStart = lines.findIndex((l) => l.trim() === "<style>");
const styleEnd = lines.findIndex((l) => l.trim() === "</style>");
if (styleStart === -1 || styleEnd === -1) throw new Error("no <style> block");

const cssAll = lines.slice(styleStart + 1, styleEnd).join("\n");

// Find the masthead anchor — everything before it is global chrome we don't want.
const mastAnchor = "/* ---------- masthead ---------- */";
const mastIdx = cssAll.indexOf(mastAnchor);
if (mastIdx === -1) throw new Error("masthead anchor not found");
let css = cssAll.slice(mastIdx);

// Route-based rendering means we don't need the display-toggle rules.
css = css.replace(/article\[data-case\]\s*\{display:none\}\s*/g, "");
css = css.replace(/article\[data-case\]\.active\s*\{display:block\}\s*/g, "");

const header = `/* ============================================================
   Case Study layouts, ported verbatim from reference/Case Study.html.
   All selectors here are case-unique (.mast, .brief, .outcome, .metrics,
   .chapter, .adsk-hero, .bp-rail, .cf-flow, .sy-cats, .lf-leak, etc.)
   so they don't leak into the rest of the site. Per-case accent colors
   (--ey-red, --wip-green, --bp-accent) live in globals.css on the
   article[data-case="..."] root so interior lists pick them up.
   ============================================================ */

`;

await writeFile(join(ROOT, "src/app/cases.css"), header + css);
console.log(`wrote src/app/cases.css (${css.length} chars)`);

// ----- per-case bodies -----
const CASES = ["ai", "synth", "autodesk", "wipro", "ey"];
await mkdir(join(ROOT, "src/content/cases"), { recursive: true });

for (const id of CASES) {
  const marker = `<article data-case="${id}"`;
  const start = raw.indexOf(marker);
  if (start === -1) throw new Error(`article not found: ${id}`);
  const openEnd = raw.indexOf(">", start) + 1;
  const end = raw.indexOf("</article>", openEnd);
  if (end === -1) throw new Error(`article end not found: ${id}`);
  const body = raw.slice(openEnd, end).trim();
  await writeFile(join(ROOT, `src/content/cases/${id}.html`), body + "\n");
  console.log(`wrote src/content/cases/${id}.html (${body.length} chars)`);
}

console.log("done");
