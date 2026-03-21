#!/usr/bin/env node
/**
 * Extracts face outline from portrait by ray-casting from center.
 * Finds where each ray exits the "subject" (face) into background.
 * Run: node scripts/extract-face-outline.mjs
 */
import { writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
// Black-background portrait for mapping (pure #000 bg = clean extraction)
const portraitPath = join(root, "public", "images", "portraits", "matt-portrait-mapping.png");
const outputPath = join(root, "src", "data", "face-outline.json");

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("Run: npm install sharp");
    process.exit(1);
  }

  if (!existsSync(portraitPath)) {
    console.error("Portrait not found:", portraitPath);
    process.exit(1);
  }

  const img = sharp(portraitPath);
  const meta = await img.metadata();
  const w = meta.width || 1024;
  const h = meta.height || 1024;
  const scale = Math.min(400 / w, 400 / h, 1);
  const sw = Math.round(w * scale);
  const sh = Math.round(h * scale);

  const { data } = await img
    .resize(sw, sh)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lum = (x, y) => {
    const ix = Math.round(x);
    const iy = Math.round(y);
    if (ix < 0 || ix >= sw || iy < 0 || iy >= sh) return 0;
    return data[iy * sw + ix] / 255;
  };

  const cx = sw / 2;
  const cy = sh / 2;
  // Pure black background: subject = anything above threshold
  const BLACK_THRESHOLD = 0.05;
  const isSubject = (l) => l > BLACK_THRESHOLD;

  const maxR = Math.hypot(cx, cy);
  const numRays = 360;
  const outline = [];

  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * Math.PI * 2 - Math.PI / 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    let lastSubject = true;
    let boundaryX = cx;
    let boundaryY = cy;
    for (let r = 1; r < maxR; r += 0.5) {
      const x = cx + dx * r;
      const y = cy + dy * r;
      const l = lum(x, y);
      const subj = isSubject(l);
      if (lastSubject && !subj) {
        boundaryX = x;
        boundaryY = y;
        break;
      }
      lastSubject = subj;
      boundaryX = x;
      boundaryY = y;
    }
    outline.push([boundaryX, boundaryY]);
  }

  const numPoints = 200;
  const sampled = [];
  const step = outline.length / numPoints;
  for (let i = 0; i < numPoints; i++) {
    const idx = (i * step) % outline.length;
    const i0 = Math.floor(idx);
    const i1 = (i0 + 1) % outline.length;
    const frac = idx - i0;
    const [x1, y1] = outline[i0];
    const [x2, y2] = outline[i1];
    sampled.push([x1 + (x2 - x1) * frac, y1 + (y2 - y1) * frac]);
  }

  const minX = Math.min(...sampled.map((p) => p[0]));
  const maxX = Math.max(...sampled.map((p) => p[0]));
  const minY = Math.min(...sampled.map((p) => p[1]));
  const maxY = Math.max(...sampled.map((p) => p[1]));
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const originX = 600;
  const originY = 210;
  const scaleOut = Math.min(180 / rangeX, 200 / rangeY);

  const scaled = sampled.map(([x, y]) => [
    Math.round(originX + (x - midX) * scaleOut),
    Math.round(originY + (y - midY) * scaleOut),
  ]);

  const outDir = dirname(outputPath);
  if (!existsSync(outDir)) {
    await import("fs").then((fs) => fs.promises.mkdir(outDir, { recursive: true }));
  }
  writeFileSync(outputPath, JSON.stringify(scaled), "utf8");
  console.log("Wrote", outputPath, "with", scaled.length, "points (range:", rangeX.toFixed(0), "x", rangeY.toFixed(0), ")");
}

main().catch(console.error);
