"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ImpactOutcomeMode } from "@/content/impact-page";

type SystemKey = "revenue" | "operations" | "healthcare";

type SignalPath = {
  id: string;
  d: string;
  systems: SystemKey[];
  baseOpacity: number;
  weight: number;
};

const accent = "#22d3c7";

// Coordinates in overlay viewBox 1000x520 — connect metrics → graph → engine → readout
const paths: SignalPath[] = [
  // Metrics → central graph
  { id: "metrics-revenue", d: "M 100 130 C 200 100, 350 120, 450 150", systems: ["revenue"], baseOpacity: 0.12, weight: 0.9 },
  { id: "metrics-operations", d: "M 100 200 C 220 180, 380 190, 500 170", systems: ["operations"], baseOpacity: 0.12, weight: 0.9 },
  { id: "metrics-healthcare", d: "M 100 270 C 240 260, 400 250, 520 190", systems: ["healthcare"], baseOpacity: 0.12, weight: 0.9 },

  // Central graph → engine (primary connection)
  { id: "map-engine-1", d: "M 620 140 C 720 135, 820 130, 920 135", systems: ["revenue", "operations", "healthcare"], baseOpacity: 0.16, weight: 0.95 },
  { id: "map-engine-2", d: "M 640 180 C 750 175, 850 170, 940 175", systems: ["revenue", "operations", "healthcare"], baseOpacity: 0.14, weight: 0.9 },

  // Graph → narrative/readout
  { id: "map-panel", d: "M 500 230 C 600 320, 700 380, 850 450", systems: ["revenue", "operations", "healthcare"], baseOpacity: 0.09, weight: 0.75 },

  // Cross-system links
  { id: "rel-rev-ops", d: "M 720 420 C 780 400, 840 400, 900 420", systems: ["revenue", "operations"], baseOpacity: 0.07, weight: 0.6 },
  { id: "rel-ops-health", d: "M 900 420 C 920 460, 920 500, 900 540", systems: ["operations", "healthcare"], baseOpacity: 0.07, weight: 0.6 },
  { id: "rel-health-rev", d: "M 900 540 C 780 580, 720 520, 720 420", systems: ["healthcare", "revenue"], baseOpacity: 0.07, weight: 0.6 },
];

function intensityForPath(mode: ImpactOutcomeMode, systems: SystemKey[], base: number, weight: number) {
  if (mode === "all") return base + weight * 0.25;
  return systems.includes(mode) ? base + weight * 0.38 : base * 0.45;
}

function shouldAnimate(mode: ImpactOutcomeMode, systems: SystemKey[]) {
  if (mode === "all") return true;
  return systems.includes(mode);
}

export function ImpactInterconnectSignals({ mode }: { mode: ImpactOutcomeMode }) {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg viewBox="0 0 1000 520" className="h-full w-full">
        {paths.map((p) => {
          const opacity = intensityForPath(mode, p.systems, p.baseOpacity, p.weight);
          const active = shouldAnimate(mode, p.systems);
          return (
            <motion.path
              key={p.id}
              d={p.d}
              fill="none"
              stroke={accent}
              strokeWidth={p.id.startsWith("rel-") ? 1 : p.id.startsWith("map-engine") ? 1.2 : 1}
              strokeLinecap="round"
              strokeDasharray={p.id.startsWith("rel-") ? "4 10" : "7 12"}
              initial={false}
              animate={
                reducedMotion
                  ? { opacity, strokeDashoffset: 0 }
                  : active
                    ? { opacity: [opacity * 0.75, opacity * 1.2, opacity * 0.75], strokeDashoffset: [0, -36] }
                    : { opacity, strokeDashoffset: 0 }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : active
                    ? { duration: 2.5, repeat: Infinity, ease: "linear" }
                    : { duration: 0.28 }
              }
            />
          );
        })}

        {/* Flowing signal dots */}
        {!reducedMotion &&
          paths.map((p, i) => {
            const active = shouldAnimate(mode, p.systems);
            if (!active) return null;
            const opacity = intensityForPath(mode, p.systems, p.baseOpacity, p.weight);
            return (
              <motion.circle
                key={`dot-${p.id}`}
                r={1.9}
                fill={accent}
                initial={false}
                animate={{ offsetDistance: ["0%", "100%"], opacity: [0, opacity * 3.2, 0] }}
                transition={{
                  duration: 3.1 + (i % 3) * 0.9,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.18,
                }}
                style={{
                  offsetPath: `path("${p.d}")`,
                  filter: "drop-shadow(0 0 6px rgba(34,211,199,0.45))",
                }}
              />
            );
          })}
      </svg>
    </div>
  );
}

