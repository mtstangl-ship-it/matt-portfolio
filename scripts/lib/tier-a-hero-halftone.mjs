/**
 * Shared Tier-A hero halftone bake — one recipe for all five case studies.
 * Dark reference envelope (Centaur / Synthetic tonal family).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/** Classic 8×8 Bayer matrix (0–63). */
export const BAYER8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

export function orderedDitherGrey(buf, width, height, levels = 8) {
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

/** Unified tonal bake — crush shadows, cap highlights (dark teal reference). */
export const BAKE_LINEAR = { a: 0.44, b: 2 };
export const BAKE_GAMMA = 1.52;
export const BAKE_LEVELS = 8;

/**
 * @param {object} opts
 * @param {string} opts.input
 * @param {string} opts.output
 * @param {number} [opts.targetW]
 * @param {number} [opts.targetH]
 */
export async function bakeTierAHeroHalftone({ input, output, targetW, targetH }) {
  const metaIn = await sharp(input).metadata();
  const w = targetW ?? metaIn.width;
  const h = targetH ?? metaIn.height;

  const { data, info } = await sharp(input)
    .resize(w, h, { fit: "cover", position: "centre" })
    .greyscale()
    .linear(BAKE_LINEAR.a, BAKE_LINEAR.b)
    .gamma(BAKE_GAMMA)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const grey = orderedDitherGrey(data, info.width, info.height, BAKE_LEVELS);

  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < grey.length; i++) {
    const v = grey[i];
    const o = i * 4;
    rgba[o] = v;
    rgba[o + 1] = v;
    rgba[o + 2] = v;
    rgba[o + 3] = 255;
  }

  fs.mkdirSync(path.dirname(output), { recursive: true });

  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(output);

  const st = fs.statSync(output);
  return { width: info.width, height: info.height, bytes: st.size };
}
