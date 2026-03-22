"use client";

import { motion } from "framer-motion";

const accent = "#22d3c7";
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Scattered origins — fragmented signals across the field
const scatterPositions: [number, number, number][] = [
  [28, 16, 1.2],
  [72, 48, 1.5],
  [42, 44, 1.1],
  [95, 18, 1.4],
  [115, 42, 1.3],
  [148, 24, 1.6],
  [178, 48, 1.2],
  [205, 32, 1.4],
  [55, 58, 1.0],
  [135, 12, 1.3],
  [165, 56, 1.2],
  [218, 48, 1.1],
];

// Flow path — organic journey arc (no literal line in final design)
const flowPath = "M 12 38 Q 70 22, 120 36 T 228 34";

// Sample points along path for dot targets
function samplePath(t: number): [number, number] {
  const segs = 12;
  const i = Math.min(Math.floor(t * segs), segs - 1);
  const local = (t * segs) % 1;
  const pts: [number, number][] = [
    [18, 36],
    [38, 32],
    [62, 30],
    [88, 33],
    [112, 35],
    [136, 36],
    [158, 35],
    [180, 34],
    [198, 33],
    [212, 33],
    [222, 33],
    [228, 34],
  ];
  const [x0, y0] = pts[i];
  const [x1, y1] = pts[Math.min(i + 1, pts.length - 1)];
  return [x0 + (x1 - x0) * local, y0 + (y1 - y0) * local];
}

export function JourneyFlowViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  const connectDuration = 3.2;
  const settleDuration = 2;
  const pathRevealDuration = 2.4;

  return (
    <div className="relative h-32 w-full overflow-hidden">
      {/* Atmospheric gradient — depth, not decoration */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${accent}, transparent 70%)`,
        }}
      />
      <svg
        viewBox="0 0 240 70"
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="journeyFlowGlow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop offset="15%" stopColor={accent} stopOpacity="0.08" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="85%" stopColor={accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
          <filter id="journeyBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>

        {/* Flow channel — soft illuminated path, not a literal line */}
        <motion.path
          d={flowPath}
          fill="none"
          stroke="url(#journeyFlowGlow)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: { duration: pathRevealDuration, ease },
                    opacity: { duration: 1, delay: 0.3 },
                  },
                }
              : { pathLength: 0, opacity: 0, transition: { duration: 0.8, ease } }
          }
          style={{ filter: "url(#journeyBlur)" }}
        />

        {/* Signal dots — varied size for dimensionality */}
        {scatterPositions.map(([sx, sy, baseR], i) => {
          const [fx, fy] = samplePath((i + 0.5) / scatterPositions.length);
          const delay = i * 0.08;
          return (
            <g key={i}>
              <motion.circle
                r={baseR}
                fill={accent}
                initial={{ cx: sx, cy: sy, opacity: 0.4, scale: 1 }}
                animate={
                  isHovered
                    ? {
                        cx: [sx, fx],
                        cy: [sy, fy],
                        opacity: [0.4, 0.88],
                        scale: [1, 1.05],
                        transition: {
                          cx: {
                            duration: connectDuration,
                            delay,
                            ease,
                          },
                          cy: {
                            duration: connectDuration,
                            delay,
                            ease,
                          },
                          opacity: {
                            duration: connectDuration * 0.6,
                            delay,
                          },
                          scale: {
                            duration: settleDuration,
                            delay: delay + connectDuration * 0.7,
                            ease,
                          },
                        },
                      }
                    : {
                        cx: sx,
                        cy: sy,
                        opacity: 0.4,
                        scale: 1,
                        transition: { duration: 1.4, ease },
                      }
                }
                style={{
                  filter: "url(#dotGlow)",
                  transformOrigin: "center",
                }}
              />
            </g>
          );
        })}

        {/* Traveling luminescence — flow indication when system is active */}
        {isHovered && (
          <circle
            r={2}
            fill={accent}
            opacity={0.35}
            style={{ filter: "url(#journeyBlur)" }}
          >
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path={flowPath}
            />
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}
