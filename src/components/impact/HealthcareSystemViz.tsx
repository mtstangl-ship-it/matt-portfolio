"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const accent = "#22d3c7";

// Simplified Georgia outline, minimal, not cartographically precise
// Rough shape: top diagonal (TN/NC border), right (SC), southeast coast, southwest corner
const georgiaOutline =
  "M 180 45 L 310 55 L 345 95 L 340 180 L 300 245 L 200 250 L 95 220 L 55 150 L 70 80 Z";

type MetroKey = "atlanta" | "savannah" | "augusta" | "macon";

const metroData: Record<
  MetroKey,
  { label: string; x: number; y: number; cx: number; cy: number }
> = {
  atlanta: { label: "Atlanta", x: 200, y: 95, cx: 200, cy: 95 },
  savannah: { label: "Savannah", x: 280, y: 195, cx: 280, cy: 195 },
  augusta: { label: "Augusta", x: 235, y: 130, cx: 235, cy: 130 },
  macon: { label: "Macon", x: 185, y: 165, cx: 185, cy: 165 },
};

// Connection lines between metros (faint)
const connections: [MetroKey, MetroKey][] = [
  ["atlanta", "augusta"],
  ["atlanta", "macon"],
  ["macon", "savannah"],
  ["augusta", "savannah"],
];

const sharedMetrics = [
  "715 vaccinations (targeted activation)",
  "4.57M public health engagements",
  "10+ healthcare & brand partnerships",
  "8-figure renewal impact",
];

export function HealthcareSystemViz() {
  const [hoveredMetro, setHoveredMetro] = useState<MetroKey | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-xl lg:h-full lg:max-w-none"
      style={{ aspectRatio: "400/280", minHeight: 260 }}
    >
      <svg
        viewBox="0 0 400 280"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Healthcare access, Georgia engagement map"
      >
        {/* Georgia outline */}
        <motion.path
          d={georgiaOutline}
          fill="none"
          stroke={accent}
          strokeWidth={1}
          strokeOpacity={0.25}
          strokeLinejoin="round"
          initial={false}
          animate={
            reducedMotion
              ? {}
              : { strokeOpacity: [0.2, 0.3, 0.2] }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Faint connecting lines between metros */}
        {connections.map(([a, b]) => {
          const ma = metroData[a];
          const mb = metroData[b];
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={ma.cx}
              y1={ma.cy}
              x2={mb.cx}
              y2={mb.cy}
              stroke={accent}
              strokeWidth={0.5}
              strokeOpacity={0.15}
              strokeDasharray="4 8"
              initial={false}
              animate={
                reducedMotion
                  ? {}
                  : {
                      strokeOpacity: [0.1, 0.2, 0.1],
                      strokeDashoffset: [0, -20, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}

        {/* Metro nodes */}
        {(Object.keys(metroData) as MetroKey[]).map((key) => {
          const metro = metroData[key];
          const isHovered = hoveredMetro === key;
          return (
            <g key={key}>
              <motion.circle
                cx={metro.cx}
                cy={metro.cy}
                r={10}
                fill="rgba(12,11,10,0.6)"
                stroke={accent}
                strokeWidth={isHovered ? 1.2 : 0.6}
                strokeOpacity={isHovered ? 0.8 : 0.4}
                onMouseEnter={() => setHoveredMetro(key)}
                onMouseLeave={() => setHoveredMetro(null)}
                initial={false}
                animate={
                  reducedMotion
                    ? {}
                    : {
                        scale: [1, 1.12, 1],
                        strokeOpacity: isHovered ? 0.8 : [0.4, 0.6, 0.4],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="cursor-pointer"
              />
              {/* Pulsing inner dot */}
              <motion.circle
                cx={metro.cx}
                cy={metro.cy}
                r={3}
                fill={accent}
                initial={false}
                animate={
                  reducedMotion
                    ? { opacity: 0.6 }
                    : {
                        opacity: [0.4, 0.9, 0.4],
                        scale: [1, 1.2, 1],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (["atlanta", "savannah", "augusta", "macon"].indexOf(key) * 0.3),
                }}
              />
              <text
                x={metro.cx}
                y={metro.cy + 20}
                textAnchor="middle"
                className=" text-[0.4375rem] font-semibold uppercase tracking-wider fill-dashboard-ink-muted"
              >
                {metro.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover overlay, shared metrics for any metro */}
      <AnimatePresence>
        {hoveredMetro && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded border border-accent-signal/30 bg-dashboard-bg/95 px-3 py-2"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <p className=" text-[0.625rem] font-bold uppercase tracking-wider text-accent-signal">
              {metroData[hoveredMetro].label} · Engagement
            </p>
            <ul className="mt-1 space-y-0.5">
              {sharedMetrics.map((m) => (
                <li
                  key={m}
                  className="font-mono text-[0.5625rem] text-dashboard-ink-light/90"
                >
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
