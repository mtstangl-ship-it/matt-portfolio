"use client";

import { useEffect, useState } from "react";

const NUM_POINTS = 180;
const SILHOUETTE_ORIGIN_X = 830;
const SILHOUETTE_ORIGIN_Y = 210;
const SILHOUETTE_SCALE = 2.2;

/**
 * Extracts outline from portrait using ray-casting: from center, find
 * where each ray hits the subject boundary. Produces a clean face outline.
 */
export function usePortraitSilhouette(src: string): [number, number][] | null {
  const [points, setPoints] = useState<[number, number][] | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const outline = extractOutlineByRaycast(img);
        if (outline.length > 0) {
          const scaled = scaleToViewBox(outline);
          setPoints(scaled);
        }
      } catch {
        setPoints(null);
      }
    };

    img.onerror = () => setPoints(null);
    img.src = src;
  }, [src]);

  return points;
}

function extractOutlineByRaycast(img: HTMLImageElement): [number, number][] {
  const canvas = document.createElement("canvas");
  const maxDim = 180;
  const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imageData;

  const { threshold, subjectIsLighter } = getThreshold(data, width, height);
  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.max(width, height);

  const isSubject = (x: number, y: number): boolean => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    if (xi < 0 || xi >= width || yi < 0 || yi >= height) return false;
    const i = (yi * width + xi) * 4;
    const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
    return subjectIsLighter ? lum > threshold : lum < threshold;
  };

  const points: [number, number][] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const angle = (i / NUM_POINTS) * Math.PI * 2 - Math.PI / 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    let lastX = cx;
    let lastY = cy;
    let found = false;

    for (let r = 1; r < maxR; r += 0.5) {
      const x = cx + r * dx;
      const y = cy + r * dy;
      const inSubject = isSubject(x, y);

      if (r === 1) {
        if (!inSubject) break;
      } else {
        if (!inSubject) {
          points.push([lastX, lastY]);
          found = true;
          break;
        }
      }
      lastX = x;
      lastY = y;
    }
    if (!found) points.push([lastX, lastY]);
  }

  return points;
}

function getThreshold(
  data: Uint8ClampedArray,
  width: number,
  height: number
): { threshold: number; subjectIsLighter: boolean } {
  const margin = Math.min(width, height) * 0.12;
  let centerSum = 0,
    centerN = 0;
  let edgeSum = 0,
    edgeN = 0;

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const i = (y * width + x) * 4;
      const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
      const inCenter = x > margin && x < width - margin && y > margin && y < height - margin;
      const onEdge = x < margin || x > width - margin || y < margin || y > height - margin;

      if (inCenter) {
        centerSum += lum;
        centerN++;
      } else if (onEdge) {
        edgeSum += lum;
        edgeN++;
      }
    }
  }

  const centerAvg = centerN ? centerSum / centerN : 0.5;
  const edgeAvg = edgeN ? edgeSum / edgeN : 0.5;
  const subjectIsLighter = centerAvg > edgeAvg;
  const threshold = (centerAvg + edgeAvg) / 2;

  return {
    threshold: Math.max(0.2, Math.min(0.8, threshold)),
    subjectIsLighter,
  };
}

function scaleToViewBox(points: [number, number][]): [number, number][] {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  const scale = Math.min((SILHOUETTE_SCALE * 70) / rangeX, (SILHOUETTE_SCALE * 90) / rangeY);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  return points.map(([x, y]) => [
    SILHOUETTE_ORIGIN_X + (x - cx) * scale,
    SILHOUETTE_ORIGIN_Y + (y - cy) * scale,
  ] as [number, number]);
}
