"use client";

import { motion, useReducedMotion } from "framer-motion";

const accent = "#22d3c7";

/** Full-width lead: $50M with “Incremental AOV” descriptor at top of the revenue stage. */
export function RevenueLeadMetric() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full shrink-0 overflow-visible pb-2">
      <div className="relative mx-auto w-full max-w-4xl">
        <div
          className="pointer-events-none absolute left-1/2 top-[38%] -z-0 h-[min(220px,58vw)] w-[min(220px,58vw)] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-signal/40"
              style={{
                width: 56 + i * 36,
                height: 56 + i * 36,
              }}
              initial={false}
              animate={
                reducedMotion
                  ? { opacity: 0.07 }
                  : {
                      opacity: [0.12, 0],
                      scale: [1, 1.5],
                    }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 2.85,
                      repeat: Infinity,
                      ease: [0.2, 0.8, 0.2, 1],
                      delay: i * 0.95,
                    }
              }
            />
          ))}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 110,
              height: 110,
              background: `radial-gradient(circle at 50% 40%, ${accent}28, transparent 68%)`,
            }}
            initial={false}
            animate={
              reducedMotion
                ? { opacity: 0.28 }
                : { opacity: [0.12, 0.38, 0.12], scale: [1, 1.08, 1] }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={false}
            animate={reducedMotion ? { opacity: 1 } : { opacity: [0.94, 1, 0.94] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="block font-[family-name:var(--font-mono)] font-bold tracking-[-0.04em] text-white"
              style={{
                fontSize: "clamp(3rem, calc(1.5rem + 7vw), 5.25rem)",
                lineHeight: 0.9,
                textShadow: "0 0 56px rgba(34,211,199,0.3), 0 2px 28px rgba(0,0,0,0.4)",
              }}
              aria-label="50 million dollars incremental average order value"
            >
              $50M
            </span>
          </motion.div>

          <p
            className="mt-2 font-[family-name:var(--font-body)] font-semibold uppercase leading-snug tracking-[0.08em] text-accent-signal/75 [font-size:clamp(0.65625rem,calc(0.4rem+1vw),0.875rem)] sm:mt-2.5"
            style={{ letterSpacing: "0.06em" }}
          >
            Incremental AOV
          </p>
        </div>
      </div>
    </div>
  );
}
