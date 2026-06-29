"use client";

import { motion } from "framer-motion";

// System alignment: fragmented inputs → converging paths
const inputs = 6;
const cols = 3;

// Input nodes, scattered, suggesting distinct sources
function getInputCoords(i: number) {
  const col = i % cols;
  const row = Math.floor(i / cols);
  const startX = 20 + col * 70;
  const startY = 10 + row * 35;
  return { startX, startY };
}

// Convergence point
const centerX = 115;
const centerY = 42;

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function TowerConvergenceViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  return (
    <div className="relative flex h-32 w-full items-center justify-center">
      <svg
        viewBox="10 2 180 72"
        className="mx-auto h-full max-h-[132px] w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Input nodes and convergence paths */}
        {Array.from({ length: inputs }).map((_, i) => {
          const { startX, startY } = getInputCoords(i);
          const dx = centerX - startX;
          const dy = centerY - startY;
          const lineEndX = centerX;
          const lineEndY = centerY;

          return (
            <g key={i}>
              {/* Path line */}
              <line
                x1={startX}
                y1={startY}
                x2={lineEndX}
                y2={lineEndY}
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                className="text-dashboard-ink-muted/50"
              />
              <motion.line
                x1={startX}
                y1={startY}
                x2={lineEndX}
                y2={lineEndY}
                stroke="currentColor"
                strokeWidth={1.1}
                strokeLinecap="round"
                className="text-accent-signal"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isHovered
                    ? {
                        pathLength: [0, 1, 1, 0],
                        opacity: [0.35, 0.92, 0.92, 0.35],
                      }
                    : { pathLength: 0.6, opacity: 0.5 }
                }
                transition={
                  isHovered
                    ? {
                        duration: 2.8,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease,
                        delay: i * 0.12,
                        times: [0, 0.38, 0.62, 1],
                      }
                    : { duration: 0.35, ease }
                }
              />

              {/* Flow indicator, only when hovered */}
              {isHovered && (
                <motion.circle
                  r={2.8}
                  fill="currentColor"
                  className="text-accent-signal"
                  animate={{
                    cx: [startX, centerX, centerX, startX],
                    cy: [startY, centerY, centerY, startY],
                    opacity: [0.7, 1, 1, 0.7],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                    times: [0, 0.4, 0.5, 1],
                  }}
                  style={{
                    filter: "drop-shadow(0 0 10px rgb(34 211 199 / 0.5))",
                  }}
                />
              )}

              {/* Input node */}
              <circle
                cx={startX}
                cy={startY}
                r={3.2}
                fill="currentColor"
                className="text-dashboard-ink-muted"
                opacity={isHovered ? 0.4 : 0.75}
              />
            </g>
          );
        })}

        {/* Convergence node */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={5}
          fill="currentColor"
          className="text-accent-signal"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.35, ease }}
          style={{
            filter: isHovered ? "drop-shadow(0 0 12px rgb(34 211 199 / 0.5))" : undefined,
          }}
        />
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={2.5}
          fill="currentColor"
          className="text-dashboard-muted"
          animate={{ opacity: isHovered ? 0.3 : 0.5 }}
        />
      </svg>
    </div>
  );
}
