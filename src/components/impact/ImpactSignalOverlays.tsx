"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ImpactOutcomeMode } from "@/content/impact-page";

const accent = "#22d3c7";

/** Short paths for micro signal dots - connecting metrics → canvas → engine */
const microPaths: { d: string; systems: ("revenue" | "operations" | "healthcare")[] }[] = [
  { d: "M 90 140 L 180 140", systems: ["revenue"] },
  { d: "M 90 200 L 200 180", systems: ["operations"] },
  { d: "M 90 260 L 220 200", systems: ["healthcare"] },
  { d: "M 500 160 L 620 150", systems: ["revenue", "operations", "healthcare"] },
  { d: "M 480 200 L 600 180", systems: ["revenue", "operations", "healthcare"] },
  { d: "M 680 120 L 780 120", systems: ["revenue", "operations", "healthcare"] },
];

/** Floating dot positions (x%, y%) — margins only, clear of metrics/viz/engine */
const floatingDots: { x: number; y: number; size: number; delay: number }[] = [
  { x: 3, y: 20, size: 1, delay: 0 },
  { x: 97, y: 25, size: 1.2, delay: 0.8 },
  { x: 97, y: 60, size: 1, delay: 1.2 },
  { x: 3, y: 82, size: 1, delay: 0.4 },
  { x: 97, y: 88, size: 1.2, delay: 1.6 },
];

function shouldShow(mode: ImpactOutcomeMode, systems: ("revenue" | "operations" | "healthcare")[]) {
  if (mode === "all") return true;
  return systems.includes(mode);
}

export function ImpactSignalOverlays({ mode }: { mode: ImpactOutcomeMode }) {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block" style={{ opacity: 0.2 }}>
      <svg viewBox="0 0 1000 520" className="h-full w-full" style={{ opacity: 0.4 }}>
        {/* Micro paths - very thin, subtle dash animation */}
        {microPaths.map((p, i) => {
          if (!shouldShow(mode, p.systems)) return null;
          return (
            <motion.path
              key={`micro-${i}`}
              d={p.d}
              fill="none"
              stroke={accent}
              strokeWidth={0.5}
              strokeLinecap="round"
              strokeDasharray="3 8"
              initial={false}
              animate={
                reducedMotion
                  ? { opacity: 0.2, strokeDashoffset: 0 }
                  : { opacity: [0.15, 0.3, 0.15], strokeDashoffset: [0, -22] }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 3 + i * 0.3, repeat: Infinity, ease: "linear", delay: i * 0.2 }
              }
            />
          );
        })}

        {/* Tiny flowing dots along micro paths */}
        {!reducedMotion &&
          microPaths.map((p, i) => {
            if (!shouldShow(mode, p.systems)) return null;
            return (
              <motion.circle
                key={`dot-micro-${i}`}
                r={0.8}
                fill={accent}
                initial={false}
                animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 2.5 + (i % 2),
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
                style={{
                  offsetPath: `path("${p.d}")`,
                  filter: "drop-shadow(0 0 3px rgba(34,211,199,0.3))",
                }}
              />
            );
          })}
      </svg>

      {/* Floating dots - positioned in % of container */}
      <div className="absolute inset-0">
        {floatingDots.map((dot, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute rounded-full bg-accent-signal"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              transform: "translate(-50%, -50%)",
              opacity: 0.2,
              boxShadow: "0 0 4px rgba(34,211,199,0.2)",
            }}
            initial={false}
            animate={
              reducedMotion
                ? {}
                : {
                    opacity: [0.12, 0.28, 0.12],
                    scale: [0.9, 1.1, 0.9],
                  }
            }
            transition={{
              duration: 4 + (i % 2) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
