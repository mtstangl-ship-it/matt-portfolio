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

// Coordinates are in overlay viewBox space (1000x520), tuned to align with mission-control modules.
const paths: SignalPath[] = [
  // Metrics panel -> system map routes
  { id: "metrics-revenue", d: "M 105 120 C 190 90, 300 110, 420 145", systems: ["revenue"], baseOpacity: 0.12, weight: 0.9 },
  { id: "metrics-operations", d: "M 105 180 C 200 165, 300 185, 510 170", systems: ["operations"], baseOpacity: 0.12, weight: 0.9 },
  { id: "metrics-healthcare", d: "M 105 242 C 220 252, 320 242, 610 155", systems: ["healthcare"], baseOpacity: 0.12, weight: 0.9 },

  // System map -> active engine
  { id: "map-engine", d: "M 650 170 C 740 170, 810 155, 880 145", systems: ["revenue", "operations", "healthcare"], baseOpacity: 0.1, weight: 0.8 },

  // System map -> system narrative panel
  { id: "map-panel", d: "M 520 245 C 560 300, 640 350, 720 380", systems: ["revenue", "operations", "healthcare"], baseOpacity: 0.09, weight: 0.75 },

  // Cross-system relationship links (triangle, very subtle)
  { id: "rel-rev-ops", d: "M 725 412 C 770 386, 815 386, 860 412", systems: ["revenue", "operations"], baseOpacity: 0.08, weight: 0.6 },
  { id: "rel-ops-health", d: "M 860 412 C 875 440, 875 468, 860 496", systems: ["operations", "healthcare"], baseOpacity: 0.08, weight: 0.6 },
  { id: "rel-health-rev", d: "M 860 496 C 795 520, 760 470, 725 412", systems: ["healthcare", "revenue"], baseOpacity: 0.08, weight: 0.6 },
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
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
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
              strokeWidth={p.id.startsWith("rel-") ? 0.9 : 1}
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
                    ? { duration: 4.2, repeat: Infinity, ease: "linear" }
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

