"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CategoryKind, TierKey } from "./revenue-tier-config";
import { pillClassFor, refinedContainerClass, serviceCategoryShell } from "./service-category-layout";

type Props = {
  kind: CategoryKind;
  tier: TierKey;
  count: number;
  hovered: boolean;
};

const optSpring = { type: "spring" as const, stiffness: 440, damping: 36, mass: 0.78 };

const easeLinearish = [0.25, 0.1, 0.25, 1] as const;
const easeBuild = [0.33, 1, 0.68, 1] as const;

/** Innovated construction: total sequence length (s); stagger per index. */
const INNO_BUILD_DURATION = 1.05;
const INNO_STAGGER = 0.048;
const D_OPT_FILTER = 0.24;
const D_OPT_GAP = 0.42;

function optimized2x2Gaps(tier: TierKey): { loose: string; tight: string } {
  if (tier === "business") return { loose: "0.56rem", tight: "0.06rem" };
  if (tier === "professional") return { loose: "0.22rem", tight: "0.035rem" };
  return { loose: "0.3rem", tight: "0.045rem" };
}

function optimizedRowGaps(tier: TierKey): { loose: string; tight: string } {
  if (tier === "business") return { loose: "0.52rem", tight: "0.14rem" };
  if (tier === "professional") return { loose: "0.26rem", tight: "0.08rem" };
  return { loose: "0.32rem", tight: "0.1rem" };
}

function refinedGap(tier: TierKey): string {
  if (tier === "professional") return "0.34rem";
  if (tier === "included") return "0.38rem";
  return "0.44rem";
}

/** Optimized rest offsets — looser at rest so compression reads clearly. */
function subtleRestRaw(i: number): { x: number; y: number; rotate: number } {
  const seeds = [
    { x: -1.15, y: 0.72, rotate: -0.32 },
    { x: 1.2, y: -0.62, rotate: 0.26 },
    { x: -0.62, y: -0.78, rotate: 0.18 },
    { x: 0.95, y: 0.78, rotate: -0.2 },
    { x: -1.15, y: -0.2, rotate: 0.28 },
    { x: 0.58, y: 0.95, rotate: -0.16 },
    { x: -0.45, y: -0.58, rotate: 0.16 },
    { x: 0.78, y: 0.42, rotate: -0.24 },
    { x: -0.82, y: -0.95, rotate: 0.2 },
    { x: 1, y: -0.42, rotate: -0.18 },
    { x: -0.72, y: 0.78, rotate: 0.18 },
    { x: 1.05, y: 0.22, rotate: -0.22 },
    { x: -1, y: -0.38, rotate: 0.16 },
    { x: 0.48, y: -0.78, rotate: -0.12 },
    { x: -1.12, y: 0.45, rotate: 0.22 },
  ];
  return seeds[i % seeds.length];
}

function subtleRest(i: number): { x: number; y: number; rotate: number } {
  const base = subtleRestRaw(i);
  const s = 1.28;
  return { x: base.x * s, y: base.y * s, rotate: base.rotate * s };
}

export function ServiceCategoryContent({ kind, tier, count, hovered }: Props) {
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
      <InnovatedGrid
        items={items}
        hovered={hovered}
        reduceMotion={!!reduceMotion}
        tier={tier}
      />
    );
  }
  if (kind === "optimized") {
    return (
      <OptimizedGrid
        items={items}
        hovered={hovered}
        reduceMotion={!!reduceMotion}
        tier={tier}
      />
    );
  }
  return (
    <RefinedGrid items={items} hovered={hovered} reduceMotion={!!reduceMotion} tier={tier} />
  );
}

function InnovatedGrid({
  items,
  hovered,
  reduceMotion,
  tier,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
  tier: TierKey;
}) {
  const shell = serviceCategoryShell("innovated", items.length, tier);
  const pill = pillClassFor("innovated");

  return (
    <div className={`relative h-full w-full overflow-hidden ${shell}`}>
      {items.map((i) => (
        <InnovatedBlock
          key={i}
          pill={pill}
          index={i}
          hovered={hovered}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}

const INNO_VB = 34;
const INNO_RX = 4;

function InnovatedBlock({
  pill,
  index,
  hovered,
  reduceMotion,
}: {
  pill: string;
  index: number;
  hovered: boolean;
  reduceMotion: boolean;
}) {
  const stagger = reduceMotion ? 0 : index * INNO_STAGGER;
  const t = { duration: reduceMotion ? 0 : INNO_BUILD_DURATION, delay: stagger, ease: easeBuild };

  if (reduceMotion) {
    return (
      <div className={`relative overflow-hidden ${pill}`}>
        <div
          className={`absolute inset-0 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] ${
            hovered ? "bg-accent-signal/[0.94]" : "bg-accent-signal/[0.12]"
          }`}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${pill}`}>
      {/* Solid fill — builds in after stroke draws */}
      <motion.div
        className="absolute inset-0 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        initial={false}
        animate={{
          opacity: hovered ? [0.04, 0.12, 0.5, 1] : 0.05,
          backgroundColor: hovered
            ? [
                "rgba(34, 211, 199, 0.1)",
                "rgba(34, 211, 199, 0.2)",
                "rgba(34, 211, 199, 0.62)",
                "rgba(34, 211, 199, 0.97)",
              ]
            : "rgba(34, 211, 199, 0.08)",
          boxShadow: hovered
            ? [
                "inset 0 0 0 1px rgba(255,255,255,0.05)",
                "inset 0 0 0 1px rgba(255,255,255,0.07)",
                "inset 0 0 0 1px rgba(255,255,255,0.1)",
                "inset 0 0 0 1px rgba(255,255,255,0.12)",
              ]
            : "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        transition={{
          ...t,
          times: hovered ? [0, 0.18, 0.45, 1] : [0],
        }}
      />

      {/* Draft / outline — strong at rest; clears as build completes */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[4px] border border-dashed border-accent-signal"
        aria-hidden
        initial={false}
        animate={{
          opacity: hovered ? [0.62, 0.72, 0.2, 0] : 0.58,
        }}
        transition={{
          ...t,
          times: hovered ? [0, 0.08, 0.28, 0.42] : [0],
        }}
      />

      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox={`0 0 ${INNO_VB} ${INNO_VB}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.rect
          x={0.5}
          y={0.5}
          width={INNO_VB - 1}
          height={INNO_VB - 1}
          rx={INNO_RX}
          fill="none"
          stroke="rgb(34, 211, 199)"
          strokeWidth={1.45}
          pathLength={100}
          strokeDasharray={100}
          vectorEffect="nonScalingStroke"
          initial={false}
          animate={{
            strokeOpacity: hovered ? [0.35, 0.75, 0.95, 0] : 0.28,
            strokeDashoffset: hovered ? [100, 55, 0, 0] : 100,
          }}
          transition={{
            ...t,
            times: hovered ? [0, 0.12, 0.42, 0.68] : [0],
          }}
        />
      </svg>
    </div>
  );
}

function OptimizedPill({
  i,
  pill,
  hovered,
  reduceMotion,
}: {
  i: number;
  pill: string;
  hovered: boolean;
  reduceMotion: boolean;
}) {
  const r = subtleRest(i);
  const aligned = reduceMotion || hovered;
  return (
    <motion.div
      className={`${pill} relative origin-center overflow-hidden rounded-[4px] will-change-transform`}
      initial={false}
      animate={
        aligned
          ? {
              x: 0,
              y: 0,
              rotate: 0,
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 0 1px rgba(34,211,199,0.14)",
            }
          : {
              x: r.x,
              y: r.y,
              rotate: r.rotate,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              x: optSpring,
              y: optSpring,
              rotate: optSpring,
              boxShadow: { duration: D_OPT_FILTER, ease: easeLinearish },
            }
      }
    >
      <div className="absolute inset-0 rounded-[4px] bg-accent-signal/[0.92] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
    </motion.div>
  );
}

function OptimizedGrid({
  items,
  hovered,
  reduceMotion,
  tier,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
  tier: TierKey;
}) {
  const shell = serviceCategoryShell("optimized", items.length, tier);
  const pill = pillClassFor("optimized");
  const g2 = optimized2x2Gaps(tier);
  const gRow = optimizedRowGaps(tier);
  const gapEnd2 = hovered ? g2.tight : g2.loose;
  const gapEndRow = hovered ? gRow.tight : gRow.loose;

  const optGapTransition = reduceMotion
    ? "none"
    : `gap ${D_OPT_GAP}s cubic-bezier(0.25, 0.1, 0.25, 1)`;

  if (items.length === 4) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${shell}`}>
        <div
          className={`mx-auto inline-grid grid-cols-2 grid-rows-2 justify-items-center place-content-center rounded-[6px] ring-1 transition-[padding,box-shadow] duration-300 ease-out ${
            hovered
              ? "p-[1px] ring-white/[0.16] shadow-[inset_0_0_0_1px_rgba(34,211,199,0.18)]"
              : "p-[4px] ring-white/[0.07] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          }`}
          style={{
            gap: gapEnd2,
            transition: `${optGapTransition}, padding 0.3s ease-out, box-shadow 0.3s ease-out`,
          }}
        >
          {items.map((i) => (
            <OptimizedPill key={i} i={i} pill={pill} hovered={hovered} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${shell}`}
      style={{
        gap: gapEndRow,
        transition: reduceMotion ? undefined : optGapTransition,
      }}
    >
      {items.map((i) => (
        <OptimizedPill key={i} i={i} pill={pill} hovered={hovered} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}

function RefinedGrid({
  items,
  hovered,
  reduceMotion,
  tier,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
  tier: TierKey;
}) {
  const shell = refinedContainerClass(items.length);
  const pill = pillClassFor("refined");
  const gap = refinedGap(tier);
  const t = {
    duration: reduceMotion ? 0 : 0.36,
    ease: [0.2, 0, 0, 1] as const,
  };

  const restRadius = items.length === 4 ? 5 : 5;
  const hoverRadius = 1.5;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${shell}`}
      style={{
        gap,
        transition: reduceMotion ? undefined : `gap 0.35s ease`,
      }}
    >
      {items.map((i) => (
        <motion.div
          key={i}
          className={`${pill} relative overflow-hidden`}
          initial={false}
          animate={{
            borderRadius: hovered ? hoverRadius : restRadius,
            boxShadow: hovered
              ? "inset 0 0 0 1.5px rgba(255,255,255,0.26), 0 0 0 1px rgba(255,255,255,0.1)"
              : "inset 0 0 0 1px rgba(255,255,255,0.07), 0 0 0 0 rgba(255,255,255,0)",
          }}
          transition={{ ...t, delay: reduceMotion ? 0 : i * 0.015 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ borderRadius: "inherit" }}
            initial={false}
            animate={{
              backgroundColor: hovered
                ? "rgba(34, 211, 199, 0.78)"
                : "rgba(34, 211, 199, 0.86)",
              filter: hovered ? "brightness(1.05)" : "brightness(1)",
            }}
            transition={{ ...t, delay: reduceMotion ? 0 : i * 0.015 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
