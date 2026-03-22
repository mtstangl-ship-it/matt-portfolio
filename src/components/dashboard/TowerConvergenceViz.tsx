"use client";

import { motion } from "framer-motion";

const streams = 6;
const centerX = 100;
const centerY = 38;
// Stronger “tractor beam” pull: push the convergence further down/right.
// We'll also shorten the *line* endpoints so beams don't visually clutter the box.
const endX = centerX + 48; // 148
const endY = centerY + 22; // 60

// How much to shorten beam lines so they stop just shy of the align box.
// Beam *dots* still travel all the way to the box anchor.
const lineStopT = 0.16;

// Box centered on the convergence anchor (bigger + further down/right).
const boxCenterX = endX;
const boxCenterY = endY;
const boxW = 82;
const boxH = 32;
const boxX = boxCenterX - boxW / 2;
const boxY = boxCenterY - boxH / 2;

function getStreamCoords(i: number) {
  const cols = 3;
  const col = i % cols;
  const row = Math.floor(i / cols);
  const startX = 25 + col * 45;
  const startY = 12 + row * 22;
  return { startX, startY };
}

export function TowerConvergenceViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  return (
    <div className="relative h-32 w-full">
      <svg
        viewBox="0 0 200 76"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: streams }).map((_, i) => {
          const { startX, startY } = getStreamCoords(i);
          const dx = endX - startX;
          const dy = endY - startY;
          const lineEndX = startX + dx * (1 - lineStopT);
          const lineEndY = startY + dy * (1 - lineStopT);

          const midX = (startX + lineEndX) / 2;
          const midY = (startY + lineEndY) / 2;
          return (
            <g key={i}>
              <line
                x1={startX}
                y1={startY}
                x2={lineEndX}
                y2={lineEndY}
                stroke="currentColor"
                strokeWidth={0.6}
                strokeDasharray="3 2"
                className="text-dashboard-ink-muted/60"
              />
              <motion.line
                x1={startX}
                y1={startY}
                x2={lineEndX}
                y2={lineEndY}
                stroke="currentColor"
                strokeWidth={0.7}
                strokeDasharray="4 4"
                className="text-accent-signal"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              />

              {/* Beam dot: on hover, move outward -> inward (tractor beam). */}
              {isHovered ? (
                <motion.circle
                  r={2.4}
                  fill="currentColor"
                  className="text-accent-signal"
                  initial={{ opacity: 0.2, scale: 0.95, cx: startX, cy: startY }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.98, 1.28, 0.98],
                    // Travel outward -> inward toward the align box anchor.
                    cx: [startX, endX, endX, startX],
                    cy: [startY, endY, endY, startY],
                  }}
                  transition={{
                    duration: 3.0,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08,
                    // Pause a beat at the “end” of the tractor beam before reversing.
                    times: [0, 0.45, 0.55, 1],
                  }}
                  style={{
                    filter: "drop-shadow(0 0 14px rgb(34 211 199 / 0.65))",
                  }}
                />
              ) : (
                <circle
                  cx={midX}
                  cy={midY}
                  r={1.5}
                  fill="currentColor"
                  className="text-accent-signal"
                  opacity={0.6}
                />
              )}

              <circle
                cx={startX}
                cy={startY}
                r={3}
                fill="currentColor"
                className="text-dashboard-ink-muted"
                opacity={isHovered ? 0.35 : 0.8}
              />
            </g>
          );
        })}
        {/* Faint topology scaffolding (no labels) */}
        <g opacity="0.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1">
          <path d="M18 20 C 55 12, 86 22, 110 28 S 160 42, 190 30" strokeDasharray="8 14" className="text-dashboard-ink-muted/40" />
          <path d="M20 56 C 70 42, 98 48, 125 44 S 180 38, 205 46" strokeDasharray="10 18" className="text-accent-signal/30" />
        </g>

        <motion.rect
          x={boxX}
          y={boxY}
          width={boxW}
          height={boxH}
          rx={2}
          fill="currentColor"
          className="text-accent-signal/25"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.35 }}
        />
        <motion.rect
          x={boxX}
          y={boxY}
          width={boxW}
          height={boxH}
          rx={2}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="text-accent-signal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          style={{ filter: "drop-shadow(0 0 12px rgb(34 211 199 / 0.45))" }}
        />
        <text
          x={boxCenterX}
          y={boxCenterY + 9}
          textAnchor="middle"
          className="fill-dashboard-ink-light font-body text-[5.5px] font-semibold tracking-wide"
          style={{ letterSpacing: "0.08em" }}
        >
          Aligned
        </text>
      </svg>
    </div>
  );
}
