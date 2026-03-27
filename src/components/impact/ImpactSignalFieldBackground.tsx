"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ImpactOutcomeMode } from "@/content/impact-page";

// Wave paths with increased amplitude — musical, flowing curves
const wavePaths = [
  "M 0 138 C 90 110, 190 168, 300 138 C 410 108, 520 168, 640 138 C 760 108, 870 168, 980 138 C 1085 114, 1180 164, 1280 140",
  "M 0 172 C 120 148, 220 204, 332 172 C 440 144, 548 208, 660 176 C 772 148, 884 208, 998 176 C 1108 152, 1196 206, 1280 180",
  "M 0 206 C 100 186, 206 232, 320 206 C 432 180, 540 234, 656 208 C 772 182, 880 236, 996 210 C 1112 184, 1208 230, 1280 214",
  // Deeper layer — lower, softer, for depth
  "M 0 248 C 110 222, 200 268, 310 244 C 420 220, 530 266, 640 242 C 750 218, 860 264, 970 240 C 1080 218, 1170 260, 1280 250",
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
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(700px 280px at 18% 18%, rgba(34,211,199,0.2), transparent 58%), radial-gradient(820px 320px at 84% 74%, rgba(34,211,199,0.14), transparent 62%)",
        }}
      />

      {/* Soft signal texture — subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(232,230,226,0.3) 0.6px, transparent 0.8px), radial-gradient(circle at 72% 58%, rgba(34,211,199,0.35) 0.6px, transparent 0.8px), radial-gradient(circle at 46% 76%, rgba(232,230,226,0.25) 0.5px, transparent 0.8px)",
          backgroundSize: "190px 190px, 220px 220px, 170px 170px",
        }}
      />

      {/* Primary wave layers — front to back for depth */}
      <svg viewBox="0 0 1280 360" className="absolute inset-x-0 top-[6%] h-[55%] w-full blur-[0.3px]">
        {wavePaths.slice(0, 3).map((d, i) => {
          const baseOpacity = (0.10 - i * 0.02) * strength;
          const strokeWidth = i === 0 ? 1.2 : i === 1 ? 1 : 0.85;
          const speed = i === 0 ? 7 : i === 1 ? 9 : 11;
          const yShift = i === 0 ? -6 : i === 1 ? 0 : 7;

          return (
            <motion.g
              key={`wave-${i}`}
              initial={false}
              animate={
                reducedMotion
                  ? { x: 0, y: yShift, opacity: baseOpacity }
                  : {
                      x: [-120, 0, -120],
                      y: [yShift - 2.5, yShift + 2.5, yShift - 2.5],
                      opacity: [baseOpacity * 0.85, baseOpacity * 1.15, baseOpacity * 0.85],
                      scaleY: [0.98, 1.04, 0.98],
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

      {/* Deep wave layer — back, softer, parallax depth */}
      <svg viewBox="0 0 1280 360" className="absolute inset-x-0 top-[18%] h-[48%] w-full blur-[0.8px]">
        {wavePaths.slice(3, 4).map((d) => (
          <motion.g
            key="wave-deep"
            initial={false}
            animate={
              reducedMotion
                ? { x: 0, y: 0, opacity: 0.055 * strength }
                : {
                    x: [-80, 40, -80],
                    y: [-1, 2, -1],
                    opacity: [0.05 * strength, 0.07 * strength, 0.05 * strength],
                    scaleY: [0.99, 1.02, 0.99],
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 13, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "50% 50%" }}
          >
            <path d={d} fill="none" stroke="rgba(34,211,199,0.9)" strokeWidth={0.7} />
            <path d={d} fill="none" stroke="rgba(232,230,226,0.35)" strokeWidth={0.4} />
          </motion.g>
        ))}
      </svg>

      {/* Slow baseline sweep — living signal floor */}
      <motion.div
        className="absolute inset-x-0 bottom-[18%] h-[1px] bg-gradient-to-r from-transparent via-accent-signal/45 to-transparent"
        initial={false}
        animate={
          reducedMotion
            ? { opacity: 0.26, x: 0 }
            : { opacity: [0.18, 0.35, 0.18], x: ["-8%", "8%", "-8%"] }
        }
        transition={reducedMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

