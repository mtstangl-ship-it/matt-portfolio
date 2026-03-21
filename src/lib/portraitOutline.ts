/**
 * Portrait outline for hero dots animation.
 * Uses extracted face-outline.json (run: node scripts/extract-face-outline.mjs)
 * when available; otherwise falls back to hand-crafted keypoints.
 */

import extractedOutline from "@/data/face-outline.json";

const numDots = 200;

// Fallback: hand-crafted outline (bald dome, ears, jaw, collar)
const originX = 830;
const originY = 208;
const scaleX = 58;
const scaleY = 72;
const keyPoints: [number, number][] = [
  [0, -1], [0.16, -0.9], [0.34, -0.74], [0.44, -0.52], [0.5, -0.26],
  [0.48, 0.02], [0.44, 0.28], [0.36, 0.5], [0.22, 0.68], [0.06, 0.78],
  [-0.1, 0.76], [-0.26, 0.68], [-0.38, 0.52], [-0.44, 0.28], [-0.48, 0.02],
  [-0.5, -0.24], [-0.44, -0.5], [-0.34, -0.72], [-0.16, -0.9],
];

function interpolate(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function getFallbackOutline(): [number, number][] {
  const path: [number, number][] = [];
  for (let i = 0; i < keyPoints.length; i++) {
    const next = (i + 1) % keyPoints.length;
    for (let j = 0; j < 10; j++) {
      path.push(interpolate(keyPoints[i], keyPoints[next], j / 10));
    }
  }
  return Array.from({ length: numDots }, (_, i) => {
    const t = (i / numDots) * (path.length - 1);
    const idx = Math.min(Math.floor(t), path.length - 2);
    const frac = t - idx;
    const [nx, ny] = interpolate(path[idx], path[idx + 1], frac);
    return [originX + nx * scaleX, originY + ny * scaleY] as [number, number];
  });
}

export function getPortraitOutline(): [number, number][] {
  const data = extractedOutline as number[][];
  if (Array.isArray(data) && data.length >= numDots) {
    return data.slice(0, numDots).map(([x, y]) => [x, y] as [number, number]);
  }
  return getFallbackOutline();
}
