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

const optSpring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.82 };

/** Innovated: crisp ease-out — reads like drafting / CAD, not organic motion. */
const easeDraft = [0.2, 0, 0, 1] as const;
const easeLinearish = [0.25, 0.1, 0.25, 1] as const;

/** Innovated construction: total sequence length (s); stagger per index. */
const INNO_BUILD_DURATION = 1.12;
const INNO_STAGGER = 0.052;
const easeBuild = [0.33, 1, 0.68, 1] as const;
const D_OPT_FILTER = 0.22;
const D_OPT_GAP = 0.38;
/** Refined: precision polish only — geometry/edge, no spatial compression. */
const REF_GAP_STATIC = "0.42rem";

/** Optimized 2×2: rest = slightly loose (for hover-in); hover = tight cluster. */
const OPT_2X2_GAP_LOOSE = "0.56rem";
/** Professional / Included — rest state already reads as one grouped block. */
const OPT_2X2_GAP_LOOSE_GROUPED = "0.3rem";
const OPT_2X2_GAP_TIGHT = "0.06rem";
const OPT_2X2_GAP_TIGHT_GROUPED = "0.045rem";

/** Optimized rest offsets — a touch more legible so the spring snap reads clearly. */
function subtleRestRaw(i: number): { x: number; y: number; rotate: number } {
  const seeds = [
    { x: -1, y: 0.6, rotate: -0.28 },
    { x: 1.1, y: -0.55, rotate: 0.22 },
    { x: -0.55, y: -0.72, rotate: 0.16 },
    { x: 0.9, y: 0.72, rotate: -0.18 },
    { x: -1.1, y: -0.16, rotate: 0.26 },
    { x: 0.55, y: 0.9, rotate: -0.14 },
    { x: -0.4, y: -0.55, rotate: 0.14 },
    { x: 0.72, y: 0.36, rotate: -0.22 },
    { x: -0.72, y: -0.9, rotate: 0.18 },
    { x: 0.95, y: -0.36, rotate: -0.16 },
    { x: -0.65, y: 0.72, rotate: 0.16 },
    { x: 1.1, y: 0.16, rotate: -0.2 },
    { x: -0.95, y: -0.32, rotate: 0.15 },
    { x: 0.4, y: -0.72, rotate: -0.11 },
    { x: -1.1, y: 0.4, rotate: 0.2 },
  ];
  return seeds[i % seeds.length];
}

/** Optimized rest offsets — scaled up slightly so the spring snap reads clearly. */
function subtleRest(i: number): { x: number; y: number; rotate: number } {
  const base = subtleRestRaw(i);
  return {
    x: base.x * 1.22,
    y: base.y * 1.22,
    rotate: base.rotate * 1.22,
  };
}

export function ServiceCategoryContent({ kind, tier, count, hovered }: Props) {
  const reduceMotion = useReducedMotion();
  const tightenForTier = tier !== "business" && (kind === "innovated" || kind === "optimized");

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
      <InnovatedGrid items={items} hovered={hovered} reduceMotion={!!reduceMotion} tight={tightenForTier} />
    );
  }
  if (kind === "optimized") {
    return (
      <OptimizedGrid items={items} hovered={hovered} reduceMotion={!!reduceMotion} tight={tightenForTier} />
    );
  }
  return <RefinedGrid items={items} hovered={hovered} reduceMotion={!!reduceMotion} />;
}

/**
 * Innovated — construction sequence (in place): ① faint sketch frame ② stroke draws ③ fills solid.
 * Same logic every block; stagger for readability only.
 */
function InnovatedGrid({
  items,
  hovered,
  reduceMotion,
  tight,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
  tight: boolean;
}) {
  const shell = serviceCategoryShell("innovated", items.length, tight);
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

/** SVG unit box matches 4px radius service block; scales with pill size. */
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
      {/* ③ Solid fill — ramps in after stroke is mostly drawn */}
      <motion.div
        className="absolute inset-0 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        initial={false}
        animate={{
          opacity: hovered ? [0.07, 0.1, 0.42, 1] : 0.08,
          backgroundColor: hovered
            ? [
                "rgba(34, 211, 199, 0.15)",
                "rgba(34, 211, 199, 0.22)",
                "rgba(34, 211, 199, 0.55)",
                "rgba(34, 211, 199, 0.96)",
              ]
            : "rgba(34, 211, 199, 0.12)",
          boxShadow: hovered
            ? [
                "inset 0 0 0 1px rgba(255,255,255,0.04)",
                "inset 0 0 0 1px rgba(255,255,255,0.05)",
                "inset 0 0 0 1px rgba(255,255,255,0.08)",
                "inset 0 0 0 1px rgba(255,255,255,0.11)",
              ]
            : "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        transition={{
          ...t,
          times: hovered ? [0, 0.12, 0.38, 1] : [0],
        }}
      />

      {/* ① Faint sketch frame (dashed) — visible at rest; yields to drawn stroke */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[4px] border border-dashed border-accent-signal"
        aria-hidden
        initial={false}
        animate={{
          opacity: hovered ? [0.42, 0.55, 0.15, 0] : 0.48,
        }}
        transition={{
          ...t,
          times: hovered ? [0, 0.1, 0.22, 0.32] : [0],
        }}
      />

      {/* ② Vector stroke “draw” — pathLength-normalized dash reveal */}
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
          strokeWidth={1.35}
          pathLength={100}
          strokeDasharray={100}
          vectorEffect="nonScalingStroke"
          initial={false}
          animate={{
            strokeOpacity: hovered ? [0.15, 0.45, 0.92, 0] : 0.22,
            strokeDashoffset: hovered ? [100, 88, 0, 0] : 100,
          }}
          transition={{
            ...t,
            times: hovered ? [0, 0.14, 0.48, 0.72] : [0],
          }}
        />
      </svg>
    </div>
  );
}

/** Optimized — “loose grid → snap”: spring on x/y/rotate; 2×2 also animates gap looser → tighter on hover. */
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
                "inset 0 0 0 1px rgba(255,255,255,0.11), 0 0 0 1px rgba(34,211,199,0.12)",
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
  tight,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
  tight: boolean;
}) {
  const shell = serviceCategoryShell("optimized", items.length, tight);
  const pill = pillClassFor("optimized");
  const gapLoose = tight ? OPT_2X2_GAP_LOOSE_GROUPED : OPT_2X2_GAP_LOOSE;
  const gapTight = tight ? OPT_2X2_GAP_TIGHT_GROUPED : OPT_2X2_GAP_TIGHT;
  const gapEnd = hovered ? gapTight : gapLoose;

  const optGapTransition = reduceMotion
    ? "none"
    : `gap ${D_OPT_GAP}s cubic-bezier(0.25, 0.1, 0.25, 1)`;

  if (items.length === 4) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${shell}`}>
        <div
          className={`mx-auto inline-grid grid-cols-2 grid-rows-2 justify-items-center place-content-center rounded-[6px] ring-1 transition-[padding,box-shadow] duration-300 ease-out ${
            hovered
              ? "p-[1px] ring-white/[0.14] shadow-[inset_0_0_0_1px_rgba(34,211,199,0.16)]"
              : "p-[3px] ring-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
          }`}
          style={{
            gap: gapEnd,
            transition: `${optGapTransition}, padding 0.3s ease-out, box-shadow 0.3s ease-out`,
          }}
        >
          {items.map((i) => (
            <OptimizedPill
              key={i}
              i={i}
              pill={pill}
              hovered={hovered}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${shell}`}>
      {items.map((i) => (
        <OptimizedPill key={i} i={i} pill={pill} hovered={hovered} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}

/**
 * Refined — polish, not reorganization: no positional motion; geometry + edge precision only.
 */
function RefinedGrid({
  items,
  hovered,
  reduceMotion,
}: {
  items: number[];
  hovered: boolean;
  reduceMotion: boolean;
}) {
  const shell = refinedContainerClass(items.length);
  const pill = pillClassFor("refined");
  const t = {
    duration: reduceMotion ? 0 : 0.34,
    ease: [0.2, 0, 0, 1] as const,
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${shell}`}
      style={{
        gap: REF_GAP_STATIC,
      }}
    >
      {items.map((i) => (
        <motion.div
          key={i}
          className={`${pill} relative overflow-hidden`}
          initial={false}
          animate={{
            borderRadius: hovered ? 2 : 6,
            boxShadow: hovered
              ? "inset 0 0 0 1px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.08)"
              : "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0)",
          }}
          transition={{ ...t, delay: reduceMotion ? 0 : i * 0.018 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ borderRadius: "inherit" }}
            initial={false}
            animate={{
              backgroundColor: hovered
                ? "rgba(34, 211, 199, 0.74)"
                : "rgba(34, 211, 199, 0.88)",
            }}
            transition={{ ...t, delay: reduceMotion ? 0 : i * 0.018 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
