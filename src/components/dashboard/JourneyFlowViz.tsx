"use client";

import { motion } from "framer-motion";

// Scattered origins (fragmented service moments)
const scatterPositions: [number, number][] = [
  [32, 18],
  [78, 52],
  [48, 48],
  [92, 22],
  [120, 38],
  [158, 28],
  [185, 50],
  [210, 35],
];

// Flowing journey path (coordinated system) — soft, organic bezier
const flowPath =
  "M 16 38 C 50 28, 90 30, 130 36 S 175 40, 224 36";

// Dot targets along the journey path (left to right)
const flowPositions: [number, number][] = [
  [26, 36],
  [52, 31],
  [88, 33],
  [124, 36],
  [160, 38],
  [192, 37],
  [214, 36],
  [222, 36],
];

const accent = "#22d3c7";

export function JourneyFlowViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  const connectDuration = 2.4;
  const settleDuration = 1.5;

  return (
    <div className="relative h-32 w-full">
      <svg
        viewBox="0 0 240 70"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="journeyGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={accent} stopOpacity={0.15} />
            <stop offset="50%" stopColor={accent} stopOpacity={0.5} />
            <stop offset="100%" stopColor={accent} stopOpacity={0.15} />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>

        {/* Flow path — visible when coordinated */}
        <path
          d={flowPath}
          fill="none"
          stroke="url(#journeyGradient)"
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0}
          style={{
            opacity: isHovered ? 0.4 : 0,
            transition: "opacity 1.2s ease-out",
          }}
        />
        <motion.path
          d={flowPath}
          fill="none"
          stroke={accent}
          strokeWidth={0.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  pathLength: 1,
                  opacity: 0.6,
                  transition: {
                    pathLength: { duration: 1.8, ease: [0.22, 0.61, 0.36, 1] },
                    opacity: { duration: 0.8 },
                  },
                }
              : { pathLength: 0, opacity: 0 }
          }
          style={{ filter: "url(#softGlow)" }}
        />

        {/* Signal dots */}
        {scatterPositions.map(([sx, sy], i) => {
          const [fx, fy] = flowPositions[i];
          return (
            <g key={i}>
              <motion.circle
                r={1.8}
                fill={accent}
                initial={{ cx: sx, cy: sy, opacity: 0.5, scale: 1 }}
                animate={
                  isHovered
                    ? {
                        cx: [sx, fx],
                        cy: [sy, fy],
                        opacity: [0.5, 0.9],
                        scale: [1, 1.1],
                        transition: {
                          cx: {
                            duration: connectDuration,
                            delay: i * 0.06,
                            ease: [0.22, 0.61, 0.36, 1],
                          },
                          cy: {
                            duration: connectDuration,
                            delay: i * 0.06,
                            ease: [0.22, 0.61, 0.36, 1],
                          },
                          opacity: {
                            duration: connectDuration * 0.5,
                            delay: i * 0.06,
                          },
                          scale: {
                            duration: settleDuration,
                            delay: i * 0.06 + connectDuration * 0.5,
                            ease: [0.22, 0.61, 0.36, 1],
                          },
                        },
                      }
                    : {
                        cx: sx,
                        cy: sy,
                        opacity: 0.5,
                        scale: 1,
                        transition: {
                          duration: 1.2,
                          ease: [0.22, 0.61, 0.36, 1],
                        },
                      }
                }
                style={{
                  filter: "drop-shadow(0 0 4px rgba(34, 211, 199, 0.25))",
                }}
                className="text-accent-signal"
              />
            </g>
          );
        })}

        {/* Subtle traveling pulse along path when coordinated */}
        {isHovered && (
          <circle r={1.5} fill={accent} opacity={0.6} style={{ filter: "url(#softGlow)" }}>
            <animateMotion dur="5s" repeatCount="indefinite" path={flowPath} />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
    </div>
  );
}
