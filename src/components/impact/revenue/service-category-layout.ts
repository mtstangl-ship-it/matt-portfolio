import type { CategoryKind } from "./revenue-tier-config";

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

/** Professional / Included — visibly grouped 3×2 Innovated cluster. */
const SHELL_3X2_INNOVATED_GROUPED = [
  "grid w-full grid-cols-3 grid-rows-2 [grid-template-columns:repeat(3,minmax(0,1fr))] [grid-template-rows:repeat(2,minmax(0,1fr))]",
  "place-content-center place-items-center justify-items-center gap-[clamp(0.16rem,1.1vw,0.32rem)]",
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
 * Refined layout shell — **no gap in class**; `RefinedGrid` animates `gap` for hover tighten.
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

/**
 * Final resting layout: grid/flex only — no absolute positioning.
 */
export function serviceCategoryShell(kind: CategoryKind, count: number, tight = false): string {
  if (count <= 0) return "";

  if (kind === "refined") {
    return refinedContainerClass(count);
  }

  const gapX = tight
    ? "gap-x-[clamp(0.14rem,1.05vw,0.28rem)]"
    : "gap-x-[clamp(0.375rem,2.4vw,0.625rem)]";
  const gapY = tight
    ? "gap-y-[clamp(0.18rem,1.35vw,0.36rem)]"
    : "gap-y-[clamp(0.375rem,2.4vw,0.625rem)]";

  switch (count) {
    case 1:
      return `grid min-h-[clamp(2.5rem,11vw,3.5rem)] w-full place-items-center px-1`;
    case 2:
      return `grid w-full grid-cols-2 place-content-center place-items-center justify-items-center ${gapX} ${gapY} px-0.5`;
    case 3:
      return `grid w-full grid-cols-3 place-content-center place-items-center justify-items-center ${gapX} ${gapY} px-0.5`;
    case 4:
      if (kind === "optimized") {
        return SHELL_2X2_OPTIMIZED_OUTER;
      }
      return tight
        ? SHELL_2X2_INNOVATED.replace(
            "gap-[clamp(0.28rem,1.85vw,0.52rem)]",
            "gap-[clamp(0.12rem,0.85vw,0.24rem)]"
          )
        : SHELL_2X2_INNOVATED;
    case 6:
      if (kind === "innovated") {
        return tight ? SHELL_3X2_INNOVATED_GROUPED : SHELL_3X2_INNOVATED;
      }
      return `grid w-full grid-cols-3 place-content-center place-items-center justify-items-center ${gapX} ${gapY} px-0.5`;
    default:
      return `grid w-full grid-cols-3 place-content-center place-items-center justify-items-center ${gapX} ${gapY} px-0.5`;
  }
}

/** Same footprint for every category — pass `kind` only for API stability. */
export function pillClassFor(_kind: CategoryKind): string {
  return PILL_SERVICE_BLOCK;
}
