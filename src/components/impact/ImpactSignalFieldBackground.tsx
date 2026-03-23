"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ImpactOutcomeMode } from "@/content/impact-page";

const wavePaths = [
  "M 0 140 C 90 118, 190 166, 300 142 C 410 118, 520 164, 640 140 C 760 116, 870 164, 980 142 C 1085 122, 1180 160, 1280 144",
  "M 0 174 C 120 154, 220 198, 332 178 C 440 160, 548 206, 660 182 C 772 160, 884 206, 998 182 C 1108 162, 1196 204, 1280 184",
  "M 0 210 C 100 194, 206 232, 320 214 C 432 196, 540 232, 656 214 C 772 196, 880 232, 996 214 C 1112 196, 1208 228, 1280 216",
];

function modeStrength(mode: ImpactOutcomeMode) {
  if (mode === "all") return 0.9;
  if (mode === "revenue") return 1;
  if (mode === "operations") return 0.95;
  return 0.98;
}

export function ImpactSignalFieldBackground({ mode }: { mode: ImpactOutcomeMode }) {
  const reducedMotion = useReducedMotion();
  const strength = modeStrength(mode);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(700px 280px at 18% 18%, rgba(34,211,199,0.18), transparent 58%), radial-gradient(820px 320px at 84% 74%, rgba(34,211,199,0.12), transparent 62%)",
        }}
      />

      {/* Soft signal texture */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(232,230,226,0.3) 0.6px, transparent 0.8px), radial-gradient(circle at 72% 58%, rgba(34,211,199,0.35) 0.6px, transparent 0.8px), radial-gradient(circle at 46% 76%, rgba(232,230,226,0.25) 0.5px, transparent 0.8px)",
          backgroundSize: "190px 190px, 220px 220px, 170px 170px",
        }}
      />

      <svg viewBox="0 0 1280 320" className="absolute inset-x-0 top-[12%] h-[42%] w-full blur-[0.4px]">
        {wavePaths.map((d, i) => {
          const baseOpacity = (0.12 - i * 0.02) * strength;
          const strokeWidth = i === 0 ? 1.15 : i === 1 ? 0.95 : 0.8;
          const speed = i === 0 ? 24 : i === 1 ? 32 : 41;
          const yShift = i === 0 ? -6 : i === 1 ? 0 : 7;

          return (
            <motion.g
              key={d}
              initial={false}
              animate={
                reducedMotion
                  ? { x: 0, y: yShift, opacity: baseOpacity }
                  : {
                      x: [-120, 0, -120],
                      y: [yShift - 1.5, yShift + 1.5, yShift - 1.5],
                      opacity: [baseOpacity * 0.8, baseOpacity * 1.1, baseOpacity * 0.8],
                      scaleY: [0.99, 1.015, 0.99],
                    }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: speed,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              style={{ transformOrigin: "50% 50%" }}
            >
              <path d={d} fill="none" stroke="rgba(34,211,199,0.95)" strokeWidth={strokeWidth} />
              <path d={d} fill="none" stroke="rgba(232,230,226,0.42)" strokeWidth={Math.max(0.55, strokeWidth - 0.35)} />
            </motion.g>
          );
        })}
      </svg>

      {/* Slow baseline sweep to mimic living signal floor */}
      <motion.div
        className="absolute inset-x-0 bottom-[18%] h-[1px] bg-gradient-to-r from-transparent via-accent-signal/40 to-transparent"
        initial={false}
        animate={
          reducedMotion
            ? { opacity: 0.22, x: 0 }
            : { opacity: [0.14, 0.3, 0.14], x: ["-8%", "8%", "-8%"] }
        }
        transition={reducedMotion ? { duration: 0 } : { duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

