#!/usr/bin/env node
/**
 * Extracts pointillism dot positions from portrait.
 * Dots are placed with density proportional to luminance:
 * - Highlights (forehead, nose, cheekbones) = dense
 * - Shadows (eye sockets, under jaw) = sparse
 * - Background = none (face carved from darkness)
 *
 * Run: node scripts/extract-pointillism.mjs
 */
import { writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
// Black-background portrait for mapping (pure #000 bg = clean extraction)
const portraitPath = join(root, "public", "images", "portraits", "matt-portrait-mapping.png");
const outputPath = join(root, "src", "data", "pointillism.json");

const NUM_DOTS = 950;
const JITTER = 0.85; // Tighter for editorial precision
const LUM_POWER = 1.35; // Balanced: highlights dense, shadows still define contours

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

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
  const scale = Math.min(440 / w, 440 / h, 1);
  const sw = Math.round(w * scale);
  const sh = Math.round(h * scale);

  const { data } = await img
    .resize(sw, sh)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lum = (x, y) => {
    const ix = Math.max(0, Math.min(sw - 1, Math.round(x)));
    const iy = Math.max(0, Math.min(sh - 1, Math.round(y)));
    return data[iy * sw + ix] / 255;
  };

  // Pure black background: subject = anything above threshold
  const BLACK_THRESHOLD = 0.05;
  const isSubject = (l) => l > BLACK_THRESHOLD;

  const points = [];
  const cellSize = 4;
  let attempts = 0;
  const maxAttempts = NUM_DOTS * 50;

  while (points.length < NUM_DOTS && attempts < maxAttempts) {
    attempts++;
    const px = (seededRandom(attempts * 7) * (sw - 2) + 1) | 0;
    const py = (seededRandom(attempts * 13) * (sh - 2) + 1) | 0;
    const l = lum(px, py);
    if (!isSubject(l)) continue;
    const p = Math.pow(Math.max(0, l), LUM_POWER);
    if (seededRandom(attempts * 31) > p) continue;
    const jx = (seededRandom(attempts * 17) - 0.5) * 2 * JITTER;
    const jy = (seededRandom(attempts * 23) - 0.5) * 2 * JITTER;
    points.push([px + jx, py + jy, Math.round(l * 100) / 100]);
  }

  const filled = points.length;
  if (filled < NUM_DOTS) {
    const pad = NUM_DOTS - filled;
    for (let i = 0; i < pad; i++) {
      const idx = i % points.length;
      const [px, py, l] = points[idx];
      const jx = (seededRandom(i * 41) - 0.5) * 4;
      const jy = (seededRandom(i * 43) - 0.5) * 4;
      points.push([px + jx, py + jy, l]);
    }
  }

  const pts = points.slice(0, NUM_DOTS);
  const minX = Math.min(...pts.map((p) => p[0]));
  const maxX = Math.max(...pts.map((p) => p[0]));
  const minY = Math.min(...pts.map((p) => p[1]));
  const maxY = Math.max(...pts.map((p) => p[1]));
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const viewW = 1200;
  const viewH = 420;
  const originX = viewW / 2;
  const originY = viewH / 2;
  const scaleOut = Math.min(240 / rangeX, 260 / rangeY);

  const scaled = pts.map(([x, y, l]) => [
    Math.round(originX + (x - midX) * scaleOut),
    Math.round(originY + (y - midY) * scaleOut),
    l,
  ]);

  const outDir = dirname(outputPath);
  if (!existsSync(outDir)) {
    await import("fs").then((fs) => fs.promises.mkdir(outDir, { recursive: true }));
  }
  writeFileSync(outputPath, JSON.stringify(scaled), "utf8");
  console.log("Wrote", outputPath, "with", scaled.length, "points (luminance-weighted density)");
}

main().catch(console.error);
