"use client";

import { motion } from "framer-motion";

const phases = [
  { x: 12, w: 32, label: "Complex", fill: "text-ink-400" },
  { x: 50, w: 38, label: "Align", fill: "text-ink-500" },
  { x: 94, w: 42, label: "Coordinate", fill: "text-ink-600" },
  { x: 142, w: 38, label: "Flow", fill: "text-accent" },
];

export function OrchestrationTimelineViz() {
  return (
    <div className="relative h-28 w-full">
      <svg
        viewBox="0 0 200 65"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.line
          x1={10}
          y1={36}
          x2={190}
          y2={36}
          stroke="currentColor"
          strokeWidth={0.8}
          className="text-ink-400/60"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.line
          x1={10}
          y1={36}
          x2={190}
          y2={36}
          stroke="currentColor"
          strokeWidth={0.5}
          strokeDasharray="6 4"
          className="text-accent/50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        {phases.map((phase, i) => (
          <g key={phase.label}>
            <motion.rect
              x={phase.x}
              y={26}
              width={phase.w}
              height={20}
              rx={2}
              fill="currentColor"
              className={phase.fill}
              initial={{ width: 0, opacity: 0.3 }}
              animate={{ width: phase.w, opacity: 0.12 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            />
            <motion.rect
              x={phase.x}
              y={32}
              width={phase.w}
              height={6}
              rx={1}
              fill="currentColor"
              className={phase.fill}
              initial={{ width: 0 }}
              animate={{ width: phase.w }}
              transition={{ delay: i * 0.1 + 0.08, duration: 0.35 }}
              style={{ opacity: i === phases.length - 1 ? 0.8 : 0.45 }}
            />
            {i === phases.length - 1 && (
              <motion.rect
                x={phase.x}
                y={32}
                width={phase.w}
                height={6}
                rx={1}
                fill="currentColor"
                className="text-accent"
                initial={{ width: 0 }}
                animate={{ width: phase.w }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                  opacity: 0.4,
                  filter: "drop-shadow(0 0 6px rgb(44 95 111 / 0.35))",
                }}
              />
            )}
            <text
              x={phase.x + phase.w / 2}
              y={44}
              textAnchor="middle"
              className="fill-ink-800 font-body text-[6px] font-semibold"
            >
              {phase.label}
            </text>
          </g>
        ))}
        <motion.circle
          cx={188}
          cy={36}
          r={4}
          fill="currentColor"
          className="text-accent"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.7, 1, 0.7], scale: 1 }}
          transition={{
            opacity: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.3, delay: 0.7 },
          }}
          style={{ filter: "drop-shadow(0 0 8px rgb(44 95 111 / 0.4))" }}
        />
      </svg>
    </div>
  );
}
