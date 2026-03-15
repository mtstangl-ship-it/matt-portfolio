"use client";

import { motion } from "framer-motion";

const streams = 6;
const centerX = 100;
const centerY = 38;

function getStreamCoords(i: number) {
  const cols = 3;
  const col = i % cols;
  const row = Math.floor(i / cols);
  const startX = 25 + col * 45;
  const startY = 12 + row * 22;
  return { startX, startY };
}

export function TowerConvergenceViz() {
  return (
    <div className="relative h-28 w-full">
      <svg
        viewBox="0 0 200 76"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: streams }).map((_, i) => {
          const { startX, startY } = getStreamCoords(i);
          const midX = (startX + centerX) / 2;
          const midY = (startY + centerY) / 2;
          return (
            <g key={i}>
              <line
                x1={startX}
                y1={startY}
                x2={centerX}
                y2={centerY}
                stroke="currentColor"
                strokeWidth={0.6}
                strokeDasharray="3 2"
                className="text-dashboard-ink-muted/60"
              />
              <motion.line
                x1={startX}
                y1={startY}
                x2={centerX}
                y2={centerY}
                stroke="currentColor"
                strokeWidth={0.7}
                strokeDasharray="4 4"
                className="text-accent-signal"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              />
              <motion.circle
                cx={midX}
                cy={midY}
                r={1.5}
                fill="currentColor"
                className="text-accent-signal"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.4, 0.9, 0.4], scale: 1 }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  scale: { delay: i * 0.06, duration: 0.25 },
                }}
                style={{ filter: "drop-shadow(0 0 3px rgb(34 211 199 / 0.5))" }}
              />
              <motion.circle
                cx={startX}
                cy={startY}
                r={3.5}
                fill="currentColor"
                className="text-dashboard-ink-muted"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
              />
              <motion.circle
                cx={startX}
                cy={startY}
                r={2}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.5}
                className="text-accent-signal/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ opacity: { duration: 2.5, repeat: Infinity, delay: i * 0.15 } }}
              />
            </g>
          );
        })}
        <motion.rect
          x={centerX - 14}
          y={centerY - 10}
          width={28}
          height={20}
          rx={2}
          fill="currentColor"
          className="text-accent-signal/15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.35 }}
        />
        <motion.rect
          x={centerX - 14}
          y={centerY - 10}
          width={28}
          height={20}
          rx={2}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="text-accent-signal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          style={{ filter: "drop-shadow(0 0 8px rgb(34 211 199 / 0.4))" }}
        />
        <text
          x={centerX}
          y={centerY + 4}
          textAnchor="middle"
          className="fill-dashboard-ink-light font-body text-[5px] font-bold"
        >
          Aligned
        </text>
      </svg>
    </div>
  );
}
