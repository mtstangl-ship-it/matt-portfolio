"use client";

import { motion } from "framer-motion";

const phases = [
  { x: 12, w: 32, label: "Fragmented" },
  { x: 50, w: 38, label: "Mapped" },
  { x: 94, w: 42, label: "Aligned" },
  { x: 142, w: 38, label: "Flow" },
];

const barBaselineY = 22;
const lineY = 44;
const wordsY = 58;
const lineStartX = 14;
const lineEndX = 186;
const mutedFill = "#9e9a94";
const accentFill = "#22d3c7";

// Dot passes bar i on L→R at t = (center - lineStart) / (lineEnd - lineStart) * 0.5
// Dot passes bar i on R→L at t = 0.5 + (lineEnd - center) / (lineEnd - lineStart) * 0.5
const centers = phases.map((p) => p.x + p.w / 2);
const lineLen = lineEndX - lineStartX;

function getGrowTime(i: number) {
  return ((centers[i] - lineStartX) / lineLen) * 0.5;
}
function getShrinkTime(i: number) {
  return 0.5 + ((lineEndX - centers[i]) / lineLen) * 0.5;
}

export function OrchestrationTimelineViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  // Dot path: left → right → left (infinite loop)
  const dotPath = [lineStartX, lineEndX, lineStartX];
  const cycleDuration = 5;

  return (
    <div className="relative h-32 w-full">
      <svg
        viewBox="0 0 200 65"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 1. BARS – grow as dot passes L→R (stick), shrink as dot passes R→L */}
        {phases.map((phase, i) => {
          const baseHeight = 8 + i * 2;
          const litHeight = 14 + i * 2;
          const growT = getGrowTime(i);
          const shrinkT = getShrinkTime(i);

          return (
            <motion.rect
              key={phase.label}
              x={phase.x}
              width={phase.w}
              rx={3}
              ry={3}
              fill={mutedFill}
              initial={{ y: barBaselineY - baseHeight, height: baseHeight }}
              animate={
                isHovered
                  ? {
                      height: [baseHeight, baseHeight, litHeight, litHeight, baseHeight, baseHeight],
                      y: [
                        barBaselineY - baseHeight,
                        barBaselineY - baseHeight,
                        barBaselineY - litHeight,
                        barBaselineY - litHeight,
                        barBaselineY - baseHeight,
                        barBaselineY - baseHeight,
                      ],
                      fill: [mutedFill, mutedFill, accentFill, accentFill, mutedFill, mutedFill],
                    }
                  : {
                      height: baseHeight,
                      y: barBaselineY - baseHeight,
                      fill: i === phases.length - 1 ? accentFill : mutedFill,
                    }
              }
              transition={
                isHovered
                  ? {
                      duration: cycleDuration,
                      repeat: Infinity,
                      ease: "linear",
                      times: [0, Math.max(0.01, growT - 0.04), growT + 0.04, shrinkT - 0.04, Math.min(0.99, shrinkT + 0.04), 1],
                    }
                  : { duration: 0.3 }
              }
              style={{
                opacity: isHovered ? 1 : i === phases.length - 1 ? 0.85 : 0.5,
              }}
            />
          );
        })}

        {/* 2. LINE – full length */}
        <line
          x1={lineStartX}
          y1={lineY}
          x2={lineEndX}
          y2={lineY}
          stroke="currentColor"
          strokeWidth={0.8}
          className="text-dashboard-ink-muted/50"
        />
        <line
          x1={lineStartX}
          y1={lineY}
          x2={lineEndX}
          y2={lineY}
          stroke="currentColor"
          strokeWidth={0.5}
          strokeDasharray="6 4"
          className="text-accent-signal/70"
        />

        {/* 3. DOT – full length, then backwards */}
        {isHovered ? (
          <motion.circle
            r={4}
            cy={lineY}
            fill="currentColor"
            className="text-accent-signal"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: 1,
              scale: 1.05,
              cx: dotPath,
            }}
            transition={{
              duration: cycleDuration,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.5, 1],
            }}
            style={{ filter: "drop-shadow(0 0 10px rgb(34 211 199 / 0.6))" }}
          />
        ) : (
          <circle
            cx={lineEndX}
            cy={lineY}
            r={4}
            fill="currentColor"
            className="text-accent-signal"
            opacity={0.9}
            style={{ filter: "drop-shadow(0 0 8px rgb(34 211 199 / 0.5))" }}
          />
        )}

        {/* 4. WORDS */}
        {phases.map((phase) => (
          <text
            key={phase.label}
            x={phase.x + phase.w / 2}
            y={wordsY}
            textAnchor="middle"
            fill="#eae8e4"
            fontFamily="system-ui, sans-serif"
            fontSize="7"
            fontWeight="600"
          >
            {phase.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
