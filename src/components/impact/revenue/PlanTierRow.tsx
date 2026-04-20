"use client";

import type { CSSProperties } from "react";
import type { TierKey } from "./revenue-tier-config";
import { tierKinds, tierServiceCounts } from "./revenue-tier-config";
import { revenueTierCopy } from "./revenue-tier-copy";
import { CategoryServiceBox } from "./CategoryServiceBox";

const tierSurface: Record<
  TierKey,
  {
    row: string;
    title: string;
    rx: string;
    businessGlow?: boolean;
  }
> = {
  business: {
    row: "border-accent-signal/[0.58] bg-[rgba(18,23,23,0.9)] shadow-[0_0_0_1px_rgba(34,211,199,0.18),0_0_20px_-6px_rgba(34,211,199,0.12)]",
    title: "font-extrabold tracking-wide text-[rgba(248,246,242,0.99)]",
    rx: "rounded-[5px]",
    businessGlow: true,
  },
  professional: {
    row: "border-accent-signal/35 bg-[rgba(14,13,12,0.58)]",
    title: "font-bold tracking-wide text-[rgba(238,236,232,0.94)]",
    rx: "rounded-[4px]",
  },
  included: {
    row: "border-accent-signal/22 bg-[rgba(12,11,10,0.42)]",
    title: "font-semibold tracking-wide text-[rgba(210,206,198,0.88)]",
    rx: "rounded-[3px]",
  },
};

const tierTypeScale: Record<TierKey, CSSProperties> = {
  business: {
    ["--tier-title" as string]: "clamp(0.78125rem, 0.38rem + 1.5vw, 0.90625rem)",
  },
  professional: {
    ["--tier-title" as string]: "clamp(0.75rem, 0.36rem + 1.4vw, 0.875rem)",
  },
  included: {
    ["--tier-title" as string]: "clamp(0.71875rem, 0.34rem + 1.3vw, 0.84375rem)",
  },
};

type Props = {
  tier: TierKey;
  isActive: boolean;
  onSelect: () => void;
};

export function PlanTierRow({ tier, isActive, onSelect }: Props) {
  const surface = tierSurface[tier];
  const copy = revenueTierCopy[tier];
  const counts = tierServiceCounts[tier];

  return (
    <div
      style={tierTypeScale[tier]}
      className={`relative flex min-h-0 flex-col overflow-hidden border duration-200 ease-out ${surface.row} ${
        surface.rx
      } ${
        isActive
          ? "min-h-0 max-lg:flex-1 max-lg:basis-0 lg:flex-none"
          : "h-11 max-h-11 shrink-0 sm:h-12 sm:max-h-12"
      } ${!isActive ? "opacity-[0.58]" : "opacity-100"} ${
        surface.businessGlow && isActive ? "shadow-[0_0_28px_rgba(34,211,199,0.14)]" : ""
      } ${isActive ? "ring-1 ring-accent-signal/45" : ""} ${
        tier === "business" && !isActive ? "ring-1 ring-accent-signal/15" : ""
      } transition-opacity`}
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) onSelect();
      }}
    >
      <button
        type="button"
        aria-expanded={isActive}
        className={`flex w-full shrink-0 cursor-pointer items-center justify-between gap-2 border-b border-white/[0.07] bg-transparent px-2.5 py-2 text-left sm:px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-signal/45 ${
          isActive ? "bg-white/[0.03]" : ""
        }`}
        onClick={onSelect}
      >
        <span
          className={`truncate font-[family-name:var(--font-body)] [font-size:var(--tier-title)] ${surface.title}`}
        >
          {copy.planLabel}
        </span>
        <span className="shrink-0 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/45 max-lg:hidden">
          {isActive ? "Scroll" : "Open"}
        </span>
        <span className="hidden shrink-0 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/55 lg:hidden">
          {isActive ? "Details" : "Tap"}
        </span>
      </button>

      {isActive ? (
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-1 py-2 min-[380px]:px-1.5 sm:px-2 sm:py-2.5 max-lg:[scrollbar-gutter:stable] lg:flex-none lg:overflow-visible">
          <div className="grid min-h-0 w-full min-w-0 grid-cols-1 gap-3 lg:grid-cols-3 lg:items-stretch lg:gap-2.5">
            {tierKinds.map((kind, idx) => (
              <CategoryServiceBox
                key={kind}
                kind={kind}
                tier={tier}
                count={counts[idx]}
                labelIndex={idx as 0 | 1 | 2}
                compact={tier === "included"}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
