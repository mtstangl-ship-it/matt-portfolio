/**
 * One-shot helper: prefix legacy case selectors in cases.css under .case-legacy-root.
 * Excludes the .tour/.stop block (Step 2). See Phase 2 hygiene prompt.
 */
import fs from "node:fs";
import postcss from "postcss";

const PATH = new URL("../src/app/cases.css", import.meta.url);
const PHASE2_COMMENT = `/* Phase 2 hygiene pass — see reference/cases-css-phase1-audit.md and BUILD-NOTES.md Tier A Debt section.
 * Removed dead rules: .topnav, .submenu, .tweaks-panel, .next
 * Scoped legacy-only rules under .case-legacy-root
 * .tour / .stop deliberately left unscoped in this round; handled separately in Step 2.
 */

`;

const TOUR_START = ".tour{display:flex;flex-direction:column;gap:0;min-width:720px}";
const TOUR_END_COMMENT = "/* ============ /EY TOUR ============ */";

function stripLegacyDead(css) {
  let out = css;

  out = out.replace(
    /\n\/\* next \/ prev strip \*\/\n[\s\S]*?\.next a\.nx\{text-align:right\}\n/,
    "\n",
  );

  out = out.replace(
    /\n\/\* tweaks panel \*\/\n\.tweaks-panel\{[\s\S]*?\.tweaks-panel select\{[\s\S]*?\}\n/,
    "\n",
  );

  out = out.replace(
    /\n\/\* ============ NAV DROPDOWN ============ \*\/\n[\s\S]*?\/\* ============ \/NAV DROPDOWN ============ \*\/\n/,
    "\n",
  );

  return out;
}

function prefixChunk(cssChunk) {
  const root = postcss.parse(cssChunk);
  root.walkRules((rule) => {
    let node = rule.parent;
    while (node) {
      if (node.type === "atrule" && node.name === "keyframes") return;
      node = node.parent;
    }

    rule.selector = rule.selector
      .split(",")
      .map((part) => {
        const p = part.trim();
        if (!p) return part;
        if (p.startsWith(".case-legacy-root")) return p;
        if (/^article\[data-case="(autodesk|wipro|ey)"\]$/.test(p)) return p;
        const m = p.match(/^(article\[data-case="(?:autodesk|wipro|ey)"\])\s+(.+)$/);
        if (m) return `${m[1]} .case-legacy-root ${m[2]}`;
        return `.case-legacy-root ${p}`;
      })
      .join(", ");
  });
  return root.toString();
}

function replaceBanner(css) {
  return css.replace(
    /^\/\* ={5,}\r?\n[\s\S]*?={5,} \*\/\s*\r?\n/m,
    PHASE2_COMMENT,
  );
}

let css = fs.readFileSync(PATH, "utf8");
css = replaceBanner(css);
css = stripLegacyDead(css);

const iTour = css.indexOf(TOUR_START);
const iTourComment = css.indexOf(TOUR_END_COMMENT, iTour);
if (iTour === -1 || iTourComment === -1) {
  console.error("Could not find tour exclusion markers.");
  process.exit(1);
}

const head = css.slice(0, iTour);
const excluded = css.slice(iTour, iTourComment);
const tail = css.slice(iTourComment);

const out = `${prefixChunk(head)}${excluded}${prefixChunk(tail)}`;
fs.writeFileSync(PATH, out);
console.log("Wrote scoped cases.css");
