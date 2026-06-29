/**
 * Pointillism dot positions extracted from portrait.
 * Density follows luminance: highlights dense, shadows sparse.
 * Run: node scripts/extract-pointillism.mjs
 */

import pointillismData from "@/data/pointillism.json";

export type PointillismPoint = [number, number, number]; // x, y, luminance

export function getPointillismPoints(): PointillismPoint[] {
  try {
    const data = pointillismData as number[][];
    if (!Array.isArray(data)) return [];
    return data
      .filter((row) => Array.isArray(row) && typeof row[0] === "number" && typeof row[1] === "number")
      .map((row) => [row[0], row[1], (row[2] ?? 0.5) as number] as PointillismPoint);
  } catch {
    return [];
  }
}
