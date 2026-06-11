#!/usr/bin/env node
/**
 * Bake halftone into Synthetic Users hero PNG (Tier-A parity with Wipro/EY/Autodesk).
 *
 * Same Bayer 8×8 ordered dither pipeline — DO NOT retune. Source/output paths only.
 *
 * Run from repo root:
 *   node scripts/process-synthetic-hero-halftone.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(__dirname);

const INPUT = path.join(ROOT, "public/images/case-synthetic/synthetic-users-robot.png");
const OUTPUT = path.join(ROOT, "public/case-studies/synthetic-users-robot-halftone.png");

/** Classic 8×8 Bayer matrix (0–63). */
const BAYER8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

function orderedDitherGrey(buf, width, height, levels = 8) {
  const out = Buffer.alloc(buf.length);
  const step = 255 / (levels - 1);
  const strength = step * 0.95;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      let v = buf[i];
      const t = (BAYER8[y & 7][x & 7] + 0.5) / 64 - 0.5;
      v = Math.min(255, Math.max(0, v + t * strength));
      const q = Math.round(v / step) * step;
      out[i] = Math.round(Math.min(255, Math.max(0, q)));
    }
  }
  return out;
}

async function main() {
  const metaIn = await sharp(INPUT).metadata();
  const metaC = await sharp(path.join(ROOT, "public/case-studies/centaur-literal.png")).metadata();

  console.log("Input:", INPUT, metaIn.width, "×", metaIn.height, metaIn.channels, "ch");
  console.log("Target canvas (match Centaur literal):", metaC.width, "×", metaC.height);

  const targetW = metaC.width;
  const targetH = metaC.height;

  const { data, info } = await sharp(INPUT)
    .resize(targetW, targetH, { fit: "cover", position: "centre" })
    .greyscale()
    .linear(0.52, 6)
    .gamma(1.4)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const grey = orderedDitherGrey(data, info.width, info.height, 8);

  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < grey.length; i++) {
    const v = grey[i];
    const o = i * 4;
    rgba[o] = v;
    rgba[o + 1] = v;
    rgba[o + 2] = v;
    rgba[o + 3] = 255;
  }

  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(OUTPUT);

  const st = fs.statSync(OUTPUT);
  console.log("Wrote", OUTPUT, `(${(st.size / 1024).toFixed(1)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
