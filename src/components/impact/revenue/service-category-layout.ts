import type { CategoryKind, TierKey } from "./revenue-tier-config";

/**
 * Shared service block — one geometry for Innovated, Optimized, and Refined.
 * Category differences are behavior (construction / density / edge), not shape.
 */
export const PILL_SERVICE_BLOCK =
  "box-border size-[clamp(26px,calc(10px+5.5vw),34px)] max-w-full shrink-0 flex-none justify-self-center rounded-[4px]";

/** @deprecated Use PILL_SERVICE_BLOCK — kept for any external imports. */
export const PILL_INNOVATED = PILL_SERVICE_BLOCK;

/**
 * 2×2 — equal gap in class (Innovated default; Optimized count≠4 uses same grid).
 */
const SHELL_2X2_INNOVATED = [
  "grid w-full grid-cols-2 grid-rows-2 [grid-template-columns:repeat(2,minmax(0,1fr))] [grid-template-rows:repeat(2,minmax(0,1fr))]",
  "place-content-center place-items-center justify-items-center gap-[clamp(0.28rem,1.85vw,0.52rem)]",
  "px-0.5 py-0.5 min-h-[clamp(4rem,13vw,5.75rem)]",
].join(" ");

/** Innovated 3×2 (six pills) — equal gap + aligned tracks. */
const SHELL_3X2_INNOVATED = [
  "grid w-full grid-cols-3 grid-rows-2 [grid-template-columns:repeat(3,minmax(0,1fr))] [grid-template-rows:repeat(2,minmax(0,1fr))]",
  "place-content-center place-items-center justify-items-center gap-[clamp(0.375rem,2.4vw,0.625rem)]",
  "px-0.5",
].join(" ");

/** Professional — tightest grouping (benchmark tightness). */
const SHELL_3X2_INNOVATED_PRO = [
  "grid w-full grid-cols-3 grid-rows-2 [grid-template-columns:repeat(3,minmax(0,1fr))] [grid-template-rows:repeat(2,minmax(0,1fr))]",
  "place-content-center place-items-center justify-items-center gap-[clamp(0.12rem,0.85vw,0.22rem)]",
  "px-0.5",
].join(" ");

/** Included — grouped, slightly more air than Professional. */
const SHELL_3X2_INNOVATED_INC = [
  "grid w-full grid-cols-3 grid-rows-2 [grid-template-columns:repeat(3,minmax(0,1fr))] [grid-template-rows:repeat(2,minmax(0,1fr))]",
  "place-content-center place-items-center justify-items-center gap-[clamp(0.15rem,0.95vw,0.28rem)]",
  "px-0.5",
].join(" ");

/**
 * Optimized 2×2 — outer frame only; inner gap is animated in OptimizedGrid.
 */
const SHELL_2X2_OPTIMIZED_OUTER = [
  "flex min-h-[clamp(3.75rem,12vw,5.5rem)] w-full items-center justify-center overflow-hidden",
  "px-0.5 py-0.5",
].join(" ");

/**
 * Refined layout shell — **no gap in class**; `RefinedGrid` sets `gap` for static rhythm.
 */
export function refinedContainerClass(count: number): string {
  if (count <= 0) return "";

  if (count === 4) {
    return [
      "grid w-full grid-cols-2 grid-rows-2 [grid-template-columns:repeat(2,minmax(0,1fr))] [grid-template-rows:repeat(2,minmax(0,1fr))]",
      "place-content-center place-items-center justify-items-center",
      "px-0.5 py-0.5 min-h-[clamp(4rem,13vw,5.75rem)]",
    ].join(" ");
  }

  return [
    "flex min-h-[clamp(3rem,12vw,5.5rem)] w-full flex-wrap content-center items-center justify-center",
    "px-0.5 py-1",
  ].join(" ");
}

function innovated2x2Gap(tier: TierKey): string {
  if (tier === "business") return "gap-[clamp(0.28rem,1.85vw,0.52rem)]";
  if (tier === "professional") return "gap-[clamp(0.07rem,0.55vw,0.16rem)]";
  return "gap-[clamp(0.1rem,0.72vw,0.2rem)]";
}

function gridGapXY(tier: TierKey): { gx: string; gy: string } {
  if (tier === "business") {
    return {
      gx: "gap-x-[clamp(0.375rem,2.4vw,0.625rem)]",
      gy: "gap-y-[clamp(0.375rem,2.4vw,0.625rem)]",
    };
  }
  if (tier === "professional") {
    return {
      gx: "gap-x-[clamp(0.1rem,0.85vw,0.22rem)]",
      gy: "gap-y-[clamp(0.12rem,0.95vw,0.26rem)]",
    };
  }
  return {
    gx: "gap-x-[clamp(0.13rem,1vw,0.26rem)]",
    gy: "gap-y-[clamp(0.15rem,1.1vw,0.3rem)]",
  };
}

/**
 * Final resting layout: grid/flex only — no absolute positioning.
 * Tier controls internal gaps: Business = open; Professional = tightest; Included = grouped, slightly lighter.
 */
export function serviceCategoryShell(kind: CategoryKind, count: number, tier: TierKey): string {
  if (count <= 0) return "";

  if (kind === "refined") {
    return refinedContainerClass(count);
  }

  const { gx, gy } = gridGapXY(tier);

  switch (count) {
    case 1:
      return `grid min-h-[clamp(2.5rem,11vw,3.5rem)] w-full place-items-center px-1`;
    case 2:
      return `grid w-full grid-cols-2 place-content-center place-items-center justify-items-center ${gx} ${gy} px-0.5`;
    case 3:
      return `grid w-full grid-cols-3 place-content-center place-items-center justify-items-center ${gx} ${gy} px-0.5`;
    case 4:
      if (kind === "optimized") {
        return SHELL_2X2_OPTIMIZED_OUTER;
      }
      return SHELL_2X2_INNOVATED.replace(
        "gap-[clamp(0.28rem,1.85vw,0.52rem)]",
        innovated2x2Gap(tier)
      );
    case 6:
      if (kind === "innovated") {
        if (tier === "professional") return SHELL_3X2_INNOVATED_PRO;
        if (tier === "included") return SHELL_3X2_INNOVATED_INC;
        return SHELL_3X2_INNOVATED;
      }
      return `grid w-full grid-cols-3 place-content-center place-items-center justify-items-center ${gx} ${gy} px-0.5`;
    default:
      return `grid w-full grid-cols-3 place-content-center place-items-center justify-items-center ${gx} ${gy} px-0.5`;
  }
}

/** Same footprint for every category — pass `kind` only for API stability. */
export function pillClassFor(_kind: CategoryKind): string {
  return PILL_SERVICE_BLOCK;
}
