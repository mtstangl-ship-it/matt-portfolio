"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CategoryKind } from "./revenue-tier-config";
import { pillClassFor, serviceCategoryShell } from "./service-category-layout";

type Props = {
  kind: CategoryKind;
  count: number;
  hovered: boolean;
};

/** Subtle messy offsets — stays inside the card. */
function messyOffset(i: number): { x: number; y: number; rotate: number } {
  const seeds = [
    { x: -2.5, y: 1.5, rotate: -0.75 },
    { x: 2.8, y: -1.4, rotate: 0.55 },
    { x: -1.4, y: -1.8, rotate: 0.4 },
    { x: 2.2, y: 1.8, rotate: -0.45 },
    { x: -2.8, y: -0.4, rotate: 0.65 },
    { x: 1.4, y: 2.2, rotate: -0.35 },
    { x: -1, y: -1.4, rotate: 0.35 },
    { x: 1.8, y: 0.9, rotate: -0.55 },
    { x: -1.8, y: -2.2, rotate: 0.45 },
    { x: 2.4, y: -0.9, rotate: -0.4 },
    { x: -1.6, y: 1.8, rotate: 0.4 },
    { x: 2.8, y: 0.4, rotate: -0.5 },
    { x: -2.4, y: -0.8, rotate: 0.38 },
    { x: 1, y: -1.8, rotate: -0.28 },
    { x: -2.8, y: 1, rotate: 0.5 },
  ];
  return seeds[i % seeds.length];
}

const easeSmooth = [0.33, 0, 0.2, 1] as const;

/** Shared solid fill — matches Optimized legibility at rest. */
const fillClass =
  "absolute inset-0 rounded-[4px] bg-accent-signal/[0.92] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]";

export function ServiceCategoryContent({ kind, count, hovered }: Props) {
  const reduceMotion = useReducedMotion();

  if (count <= 0) {
    return (
      <div className="flex min-h-[3rem] w-full items-center justify-center text-[length:clamp(0.5625rem,1.5vw,0.6875rem)] uppercase tracking-[0.18em] text-white/25">
        —
      </div>
    );
  }

  const items = Array.from({ length: count }, (_, i) => i);

  if (kind === "innovated") {
    return (
      <InnovatedGrid items={items} hovered={hovered} reduceMotion={!!reduceMotion} />
    );
  }
  if (kind === "optimized") {
    return (
      <OptimizedGrid items={items} hovered={hovered} reduceMotion={!!reduceMotion} />
    );
  }
  return <RefinedGrid items={items} hovered={hovered} reduceMotion={!!reduceMotion} />;
}

const T_INNO_OVERLAY = 0.95;
const T_INNO_TICK = 0.55;
const STAGGER = 0.055;
const T_OPT = 1.05;
const T_REF = 0.88;

/**
 * Innovated: solid blocks always visible. Hover adds construction accents only
 * (stroke pulse, ticks, soft inner gleam) — fill never dims toward “reveal.”
 */
function InnovatedGrid({
  items,
  hovered,
  reduceMotion,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
}) {
  const shell = serviceCategoryShell("innovated", items.length);
  const pill = pillClassFor("innovated");
  const accent = hovered && !reduceMotion;

  return (
    <div className={`relative w-full overflow-hidden ${shell}`}>
      {items.map((i) => (
        <div key={i} className={`relative ${pill}`}>
          {/* Solid core — always on; not animated for opacity */}
          <div className={fillClass} />

          {accent ? (
            <>
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[4px] border border-accent-signal"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0.5, 0.15] }}
                transition={{
                  duration: T_INNO_OVERLAY,
                  delay: i * STAGGER,
                  times: [0, 0.22, 0.55, 1],
                  ease: easeSmooth,
                }}
              />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[4px]"
                style={{
                  boxShadow: "inset 0 0 12px rgba(34,211,199,0.35)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0] }}
                transition={{
                  duration: T_INNO_OVERLAY,
                  delay: i * STAGGER + 0.08,
                  times: [0, 0.35, 1],
                  ease: easeSmooth,
                }}
              />
              <motion.div
                className="pointer-events-none absolute left-0 top-1/2 h-px w-[38%] origin-left -translate-y-1/2 bg-accent-signal/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 1] }}
                transition={{
                  duration: T_INNO_TICK,
                  delay: i * STAGGER + 0.12,
                  ease: easeSmooth,
                }}
              />
              <motion.div
                className="pointer-events-none absolute right-0 top-1/2 h-px w-[38%] origin-right -translate-y-1/2 bg-accent-signal/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 1] }}
                transition={{
                  duration: T_INNO_TICK,
                  delay: i * STAGGER + 0.2,
                  ease: easeSmooth,
                }}
              />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[4px] ring-1 ring-accent-signal/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{
                  duration: T_INNO_OVERLAY,
                  delay: i * STAGGER,
                  times: [0, 0.4, 1],
                  ease: easeSmooth,
                }}
              />
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Optimized: solid at rest; hover nudges off-grid then settles — slower. */
function OptimizedGrid({
  items,
  hovered,
  reduceMotion,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
}) {
  const shell = serviceCategoryShell("optimized", items.length);
  const pill = pillClassFor("optimized");

  return (
    <div className={`relative w-full overflow-hidden ${shell}`}>
      {items.map((i) => {
        const m = messyOffset(i);
        return (
          <motion.div
            key={i}
            className={`${pill} relative overflow-hidden rounded-[4px]`}
            initial={false}
            animate={
              reduceMotion
                ? { x: 0, y: 0, rotate: 0 }
                : hovered
                  ? { x: [0, m.x, 0], y: [0, m.y, 0], rotate: [0, m.rotate, 0] }
                  : { x: 0, y: 0, rotate: 0 }
            }
            transition={{
              duration: hovered && !reduceMotion ? T_OPT : 0.4,
              times: hovered && !reduceMotion ? [0, 0.42, 1] : [0, 1],
              delay: i * STAGGER,
              ease: easeSmooth,
            }}
          >
            <div className={fillClass} />
          </motion.div>
        );
      })}
    </div>
  );
}

/** Refined: solid at rest (soft radius); hover sharpens — fill stays opaque throughout. */
function RefinedGrid({
  items,
  hovered,
  reduceMotion,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
}) {
  const shell = serviceCategoryShell("refined", items.length);
  const pill = pillClassFor("refined");
  const blunt = "16px";
  const sharp = "5px";

  return (
    <div className={`relative w-full overflow-hidden ${shell}`}>
      {items.map((i) => (
        <motion.div
          key={i}
          className={`${pill} relative overflow-hidden`}
          initial={false}
          animate={
            reduceMotion
              ? { borderRadius: sharp }
              : hovered
                ? { borderRadius: sharp }
                : { borderRadius: blunt }
          }
          transition={{
            duration: reduceMotion ? 0 : T_REF,
            delay: reduceMotion ? 0 : i * STAGGER,
            ease: easeSmooth,
          }}
        >
          <div
            className="absolute inset-0 bg-accent-signal/[0.92] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
            style={{ borderRadius: "inherit" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
