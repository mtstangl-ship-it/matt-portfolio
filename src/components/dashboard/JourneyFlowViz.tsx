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

// Phase 3: Packaging — 3 clean blocks (productized offering)
const blocks = [
  { x: 32, y: 8, w: 56, h: 28 },
  { x: 92, y: 8, w: 56, h: 28 },
  { x: 152, y: 8, w: 56, h: 28 },
];

// Labels
const labels = [
  { x: 50, label: "Signals" },
  { x: 120, label: "Offering" },
  { x: 190, label: "Growth" },
];

export function JourneyFlowViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  return (
    <div className="relative flex h-full w-full flex-col">
      <svg
        viewBox="0 0 240 42"
        className="min-h-0 flex-1"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Phase 1–2: Connecting lines — form network, fade before packaging */}
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
                      opacity: [0, 0, 0.3, 0.3, 0.05, 0],
                      transition: {
                        duration: cycleDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.38, 0.46, 0.5, 0.54],
                      },
                    }
                  : { opacity: 0 }
              }
            />
          );
        })}

        {/* Phase 3–4: Packaged blocks — snap in (crisp), then grow */}
        {blocks.map((block, i) => (
          <motion.rect
            key={i}
            x={block.x}
            y={block.y}
            width={block.w}
            height={block.h}
            style={{ transformOrigin: `${block.x + block.w / 2}px ${block.y + block.h / 2}px` }}
            rx={2}
            ry={2}
            fill={accent}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={0.5}
            initial={false}
            animate={
              isHovered
                ? {
                    opacity: [0, 0, 1, 1, 1],
                    scale: [0.5, 0.5, 1, 1, 1.1],
                    y: [block.y + 8, block.y + 8, block.y, block.y, block.y - 2],
                    transition: {
                      duration: cycleDuration,
                      repeat: Infinity,
                      ease: [0.33, 1, 0.68, 1],
                      times: [0, 0.48, 0.52, 0.65, 1],
                      delay: i * 0.015,
                    },
                  }
                : { opacity: 0, scale: 0.8 }
            }
          />
        ))}

        {/* Phase 1–2: Signal dots — scattered → network → fade as blocks appear */}
        {signalDots.map(([sx, sy], i) => {
          const [nx, ny] = networkPositions[i] ?? [sx, sy];
          return (
            <motion.circle
              key={i}
              r={2.2}
              fill={accent}
              initial={false}
              animate={
                isHovered
                  ? {
                      cx: [sx, nx, nx, nx],
                      cy: [sy, ny, ny, ny],
                      opacity: [0.55, 0.8, 0.8, 0],
                      scale: [1, 1.1, 1.1, 0.5],
                      transition: {
                        duration: cycleDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.48, 0.55],
                        delay: i * 0.025,
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
      <div className="flex shrink-0 justify-between px-2 pt-3">
        {labels.map(({ label }) => (
          <span
            key={label}
            className="font-body text-[0.5rem] font-semibold uppercase tracking-wider text-dashboard-ink-light"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
