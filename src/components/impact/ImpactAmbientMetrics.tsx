"use client";

import { motion, useReducedMotion } from "framer-motion";
import { impactMissionControl } from "@/content/impact-mission-control";
import type { ImpactOutcomeMode } from "@/content/impact-page";

// Exclusion zones: left 0–22% (metrics), center 28–72% (system map). Place ambient in margins/corners only.
const positions: { left: string; top: string; size: number; drift: number; duration: number }[] = [
  { left: "3%", top: "22%", size: 0.4, drift: 2, duration: 6 },
  { left: "5%", top: "58%", size: 0.35, drift: 2.5, duration: 5 },
  { left: "96%", top: "18%", size: 0.4, drift: 2, duration: 6 },
  { left: "94%", top: "42%", size: 0.35, drift: 2.5, duration: 5 },
  { left: "96%", top: "66%", size: 0.4, drift: 2, duration: 6 },
  { left: "24%", top: "4%", size: 0.35, drift: 2, duration: 5 },
  { left: "76%", top: "6%", size: 0.35, drift: 2.5, duration: 6 },
  { left: "24%", top: "88%", size: 0.35, drift: 2, duration: 5 },
  { left: "76%", top: "86%", size: 0.35, drift: 2.5, duration: 6 },
];

export function ImpactAmbientMetrics({ mode }: { mode: ImpactOutcomeMode }) {
  const reducedMotion = useReducedMotion();
  const metrics = impactMissionControl.ambientMetricsByMode[mode];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: 0.035 }}
    >
      {positions.map((pos, i) => {
        const value = metrics[i % metrics.length];
        const drift = reducedMotion ? 0 : pos.drift;

        return (
          <motion.div
            key={`ambient-${i}-${value}`}
            className="absolute font-mono font-bold tabular-nums text-dashboard-ink-muted"
            style={{
              left: pos.left,
              top: pos.top,
              fontSize: `${pos.size}rem`,
              transform: "translate(-50%, -50%)",
            }}
            initial={false}
            animate={
              reducedMotion
                ? {}
                : {
                    x: [-drift, drift, -drift],
                    y: [drift * 0.6, -drift * 0.6, drift * 0.6],
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 4) * 0.5,
            }}
          >
            {value}
          </motion.div>
        );
      })}
    </div>
  );
}
