#!/usr/bin/env node
/**
 * Re-bake all five Tier-A hero halftone PNGs through one shared recipe.
 *
 * Run from repo root:
 *   node scripts/process-all-tier-a-hero-halftone.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { bakeTierAHeroHalftone } from "./lib/tier-a-hero-halftone.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(__dirname);

const CANVAS_REF = path.join(ROOT, "public/case-studies/centaur-literal.png");

const CASES = [
  {
    slug: "centaur",
    input: path.join(ROOT, "public/images/case-centaur/centaur-motorcycle-hero.png"),
    output: path.join(ROOT, "public/case-studies/centaur-literal.png"),
  },
  {
    slug: "synthetic",
    input: path.join(ROOT, "public/images/case-synthetic/synthetic-users-robot.png"),
    output: path.join(ROOT, "public/case-studies/synthetic-users-robot-halftone.png"),
  },
  {
    slug: "autodesk",
    input: path.join(ROOT, "public/case-studies/autodesk-design-manufacturing.jpg"),
    output: path.join(ROOT, "public/case-studies/autodesk-design-manufacturing-halftone.png"),
  },
  {
    slug: "wipro",
    input: path.join(ROOT, "public/images/case-wipro/elc-workshop.png"),
    output: path.join(ROOT, "public/case-studies/wipro-elc-workshop-halftone.png"),
  },
  {
    slug: "ey",
    input: path.join(ROOT, "public/images/case-ey/core-booth-hero.jpg"),
    output: path.join(ROOT, "public/case-studies/ey-core-halftone.png"),
  },
];

async function main() {
  const metaC = await sharp(CANVAS_REF).metadata();
  const targetW = metaC.width;
  const targetH = metaC.height;
  console.log("Target canvas:", targetW, "×", targetH);

  for (const c of CASES) {
    console.log(`\n— ${c.slug}`);
    const result = await bakeTierAHeroHalftone({
      input: c.input,
      output: c.output,
      targetW,
      targetH,
    });
    console.log(`  Wrote ${c.output} (${(result.bytes / 1024).toFixed(1)} KB)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
