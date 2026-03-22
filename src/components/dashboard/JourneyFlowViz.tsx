"use client";

import { motion } from "framer-motion";

// Revenue through productized services: fragmentation → productization → growth
// Signals (scattered) → Offering (packaged blocks) → Growth (expand)

const accent = "#22d3c7";
const cycleDuration = 4.5;

// Phase 1: Scattered signal dots (scaled to fit graphic area)
const signalDots: [number, number][] = [
  [30, 10],
  [95, 6],
  [55, 26],
  [170, 12],
  [120, 30],
  [200, 22],
  [75, 32],
  [145, 8],
];

// Phase 2: Network formation — dots converge toward these positions
const networkPositions: [number, number][] = [
  [55, 16],
  [95, 14],
  [75, 22],
  [165, 16],
  [120, 22],
  [185, 20],
  [85, 26],
  [135, 17],
];

// Phase 3: Packaging — 3 rigid blocks with gaps between
const blockW = 52;
const gap = 26;
const blocks = [
  { x: 24, y: 6, w: blockW, h: 26 },
  { x: 24 + blockW + gap, y: 6, w: blockW, h: 26 },
  { x: 24 + (blockW + gap) * 2, y: 6, w: blockW, h: 26 },
];

// Block centers for interstitial clustering
const blockCenters: [number, number][] = blocks.map(
  (b) => [b.x + b.w / 2, b.y + b.h / 2] as [number, number]
);

// Assign each dot to nearest block (for clustering phase)
function nearestBlockCenter(i: number): [number, number] {
  const [nx, ny] = networkPositions[i] ?? [120, 19];
  let best = blockCenters[0];
  let bestD = Infinity;
  for (const [cx, cy] of blockCenters) {
    const d = (nx - cx) ** 2 + (ny - cy) ** 2;
    if (d < bestD) {
      bestD = d;
      best = [cx, cy];
    }
  }
  return best;
}

// Slight offset per dot so they don't all overlap — forms a tight cluster
const clusterOffsets: [number, number][] = [
  [-1.5, 0], [1, -0.5], [-1, 0.5], [1.5, 0], [-0.5, 0.5], [0, 0], [1, 0.5], [-0.5, -0.5],
];
const clusterTargets = signalDots.map((_, i) => {
  const [cx, cy] = nearestBlockCenter(i);
  const [ox, oy] = clusterOffsets[i];
  return [cx + ox, cy + oy] as [number, number];
});

// Labels — x as % to align with block centers
const labels = [
  { x: (24 + blockW / 2) / 240, label: "Signals" },
  { x: (24 + blockW + gap + blockW / 2) / 240, label: "Offering" },
  { x: (24 + (blockW + gap) * 2 + blockW / 2) / 240, label: "Growth" },
];

export function JourneyFlowViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  return (
    <div className="relative flex h-full w-full flex-col">
      <svg
        viewBox="0 0 240 42"
        className="min-h-0 flex-1"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Phase 1–2: Connecting lines — form network, fade as dots cluster */}
        {[
          [0, 2], [1, 2], [2, 4], [3, 4], [4, 5], [4, 6], [5, 7], [2, 7],
        ].map(([a, b], i) => {
          const [ax, ay] = networkPositions[a];
          const [bx, by] = networkPositions[b];
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={ax}
              y1={ay}
              x2={bx}
              y2={by}
              stroke={accent}
              strokeWidth={0.6}
              strokeLinecap="round"
              initial={false}
              animate={
                isHovered
                  ? {
                      opacity: [0, 0, 0.35, 0.38, 0],
                      transition: {
                        duration: cycleDuration,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.2, 0.36, 0.42, 0.44],
                      },
                    }
                  : { opacity: 0 }
              }
            />
          );
        })}

        {/* Phase 3–4: Blocks — fade in as dots cluster, then growth */}
        {blocks.map((block, i) => (
          <motion.rect
            key={i}
            x={block.x}
            y={block.y}
            width={block.w}
            height={block.h}
            style={{ transformOrigin: `${block.x + block.w / 2}px ${block.y + block.h / 2}px` }}
            rx={1}
            ry={1}
            fill={accent}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={0.6}
            initial={false}
            animate={
              isHovered
                ? {
                    opacity: [0, 0, 0, 0, 1, 1, 1],
                    scale: [1, 1, 1, 1, 1, 1.12, 1.12],
                    y: [block.y, block.y, block.y, block.y, block.y, block.y - 4, block.y - 4],
                    transition: {
                      duration: cycleDuration,
                      repeat: Infinity,
                      ease: "linear",
                      times: [0, 0.42, 0.44, 0.48, 0.52, 0.62, 1],
                    },
                  }
                : { opacity: 0, scale: 1 }
            }
          />
        ))}

        {/* Phase 1–3: Signal dots — scattered → network → cluster → crossfade to blocks */}
        {signalDots.map(([sx, sy], i) => {
          const [nx, ny] = networkPositions[i] ?? [sx, sy];
          const [tx, ty] = clusterTargets[i];
          return (
            <motion.circle
              key={i}
              r={2.2}
              fill={accent}
              initial={false}
              animate={
                isHovered
                  ? {
                      cx: [sx, nx, nx, tx, tx],
                      cy: [sy, ny, ny, ty, ty],
                      opacity: [0.55, 0.85, 0.85, 0.9, 0],
                      scale: [1, 1.05, 1.05, 0.9, 0.9],
                      transition: {
                        duration: cycleDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.32, 0.38, 0.5, 0.54],
                      },
                    }
                  : {
                      cx: sx,
                      cy: sy,
                      opacity: 0.5,
                      scale: 1,
                    }
              }
            />
          );
        })}

      </svg>
      <div className="relative shrink-0 pt-1.5 min-h-[0.875rem]">
        {labels.map(({ x, label }) => (
          <span
            key={label}
            className="absolute font-body text-[0.5rem] font-semibold uppercase tracking-wider text-dashboard-ink-light"
            style={{ left: `${x * 100}%`, transform: "translateX(-50%)" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
