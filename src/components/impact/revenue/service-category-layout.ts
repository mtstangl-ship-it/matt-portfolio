import type { CategoryKind } from "./revenue-tier-config";

/** Responsive pill sizes: two variants — dense (innovated/optimized) and open (refined). */
export const PILL = {
  dense:
    "aspect-square w-[clamp(26px,calc(10px+5.5vw),34px)] max-w-full shrink-0 flex-none justify-self-center",
  refined:
    "aspect-square w-[clamp(28px,calc(10px+6vw),38px)] max-w-full shrink-0 flex-none",
} as const;

/**
 * Final resting layout: grid/flex only — no absolute positioning.
 * Count-aware columns keep rows balanced and legible on phone → desktop.
 */
export function serviceCategoryShell(kind: CategoryKind, count: number): string {
  if (count <= 0) return "";

  if (kind === "refined") {
    return [
      "flex min-h-[clamp(3rem,12vw,5.5rem)] w-full flex-wrap content-center items-center justify-center",
      "gap-x-[clamp(0.5rem,3.5vw,0.875rem)] gap-y-[clamp(0.5rem,3.5vw,0.875rem)]",
      "px-0.5 py-1",
    ].join(" ");
  }

  const gapX = "gap-x-[clamp(0.375rem,2.4vw,0.625rem)]";
  const gapY = "gap-y-[clamp(0.375rem,2.4vw,0.625rem)]";

  switch (count) {
    case 1:
      return `grid min-h-[clamp(2.5rem,11vw,3.5rem)] w-full place-items-center px-1`;
    case 2:
      return `grid w-full grid-cols-2 place-content-center place-items-center justify-items-center ${gapX} ${gapY} px-0.5`;
    case 3:
      return `grid w-full grid-cols-3 place-content-center place-items-center justify-items-center ${gapX} ${gapY} px-0.5`;
    case 4:
      return `grid w-full grid-cols-2 place-content-center place-items-center justify-items-center ${gapX} ${gapY} px-0.5`;
    case 6:
    default:
      return `grid w-full grid-cols-3 place-content-center place-items-center justify-items-center ${gapX} ${gapY} px-0.5`;
  }
}

export function pillClassFor(kind: CategoryKind): string {
  return kind === "refined" ? PILL.refined : PILL.dense;
}
