"use client";

import { motion, useReducedMotion } from "framer-motion";
import { impactMissionControl } from "@/content/impact-mission-control";
import type { ImpactOutcomeMode } from "@/content/impact-page";

// Exclusion zones: left 0–22% (metrics), center 30–70% (system map). Noise only in margins.
const positions: { left: string; top: string; size: number; delay: number; drift: number }[] = [
  { left: "2%", top: "30%", size: 0.3, delay: 0, drift: 3 },
  { left: "4%", top: "70%", size: 0.28, delay: 0.8, drift: 2 },
  { left: "98%", top: "12%", size: 0.3, delay: 1.2, drift: 3 },
  { left: "96%", top: "38%", size: 0.28, delay: 0.4, drift: 2 },
  { left: "98%", top: "72%", size: 0.3, delay: 1.6, drift: 3 },
  { left: "24%", top: "2%", size: 0.28, delay: 0.2, drift: 2 },
  { left: "76%", top: "2%", size: 0.28, delay: 1, drift: 3 },
  { left: "24%", top: "94%", size: 0.28, delay: 0.6, drift: 2 },
  { left: "76%", top: "94%", size: 0.28, delay: 1.4, drift: 3 },
];

/** Faint grid lines, edges only, avoid content areas */
const lines = [
  { type: "h" as const, top: "4%", left: "0%", width: "100%", delay: 0 },
  { type: "h" as const, top: "92%", left: "0%", width: "100%", delay: 2 },
  { type: "v" as const, left: "2%", top: "0%", height: "100%", delay: 0.5 },
  { type: "v" as const, left: "98%", top: "0%", height: "100%", delay: 1 },
];

export function ImpactDataNoiseBackground({ mode }: { mode: ImpactOutcomeMode }) {
  const reducedMotion = useReducedMotion();
  const numbers = impactMissionControl.dataNoiseByMode[mode];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: 0.028 }}
    >
      {/* Faint numbers and symbols with drift */}
      {positions.map((pos, i) => {
        const value = numbers[i % numbers.length];
        const duration = 6 + (i % 3) * 2;
        const drift = reducedMotion ? 0 : pos.drift;

        return (
          <motion.div
            key={`noise-${i}-${value}`}
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
                    y: [drift * 0.5, -drift * 0.5, drift * 0.5],
                    opacity: [0.6, 1, 0.6],
                  }
            }
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pos.delay,
            }}
          >
            {value}
          </motion.div>
        );
      })}

      {/* Faint grid lines */}
      {lines.map((line, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute bg-dashboard-ink-muted"
          style={{
            ...(line.type === "h"
              ? {
                  left: line.left,
                  top: line.top,
                  width: line.width,
                  height: "1px",
                }
              : {
                  left: line.left,
                  top: line.top,
                  width: "1px",
                  height: line.height,
                }),
            opacity: 0.25,
          }}
          initial={false}
          animate={
            reducedMotion
              ? {}
              : {
                  opacity: [0.15, 0.35, 0.15],
                }
          }
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: line.delay,
          }}
        />
      ))}
    </div>
  );
}
