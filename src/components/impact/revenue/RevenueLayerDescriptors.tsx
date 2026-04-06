"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TierKey } from "./revenue-tier-config";
import { revenueTierCopy } from "./revenue-tier-copy";
import { impactMissionControl } from "@/content/impact-mission-control";

type Props = {
  tier: TierKey;
  /**
   * `stack` — copy block under $50M lead only (Business default).
   * `inline` — same module, tighter rhythm when visually paired with Professional / Included rows.
   */
  pairing?: "stack" | "inline";
};

/** Plan copy under $50M / Incremental AOV lead — tight spacing; proof points span horizontally on wider viewports. */
export function RevenueLayerDescriptors({ tier, pairing = "stack" }: Props) {
  const tierMeta = impactMissionControl.revenueTierExplanation[tier];
  const copy = revenueTierCopy[tier];
  if (!tierMeta || !copy) {
    return null;
  }
  const tagline = copy.summaryLines[0]?.trim();
  const inline = pairing === "inline";

  return (
    <div
      className={`relative z-20 w-full max-w-full rounded-sm border border-white/[0.06] bg-[rgba(8,9,9,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
        inline
          ? "px-1.5 py-1.5 sm:px-2 sm:py-2"
          : "px-2 py-2 sm:px-2.5"
      }`}
      aria-live="polite"
    >
      {/* Fixed slot: tier copy swaps in place (opacity only) — no flex reorder, minimal vertical jump */}
      <div className="relative min-h-[min(28vh,13.5rem)] sm:min-h-[12.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tier}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`flex flex-col ${inline ? "gap-1 sm:gap-1.5" : "gap-1.5"}`}
          >
          <p className="font-[family-name:var(--font-body)] text-[length:clamp(0.625rem,0.32rem+0.95vw,0.8125rem)] font-semibold leading-snug text-[rgba(248,246,242,0.96)]">
            {copy.executiveSummary}
          </p>
          <p className="font-[family-name:var(--font-body)] text-[length:clamp(0.5625rem,0.28rem+0.85vw,0.6875rem)] font-medium leading-snug text-accent-signal">
            {tierMeta.whyThisMatters}
          </p>
          {tagline ? (
            <p className="font-[family-name:var(--font-body)] text-[length:clamp(0.53125rem,0.24rem+0.78vw,0.65625rem)] leading-snug text-[rgba(200,206,202,0.85)]">
              {tagline}
            </p>
          ) : null}
          <p
            className="font-[family-name:var(--font-mono)] text-[length:clamp(0.5rem,0.22rem+0.72vw,0.625rem)] font-semibold tabular-nums text-accent-signal/90"
            style={{ letterSpacing: "0.02em" }}
          >
            {copy.microMetrics.join("  ·  ")}
          </p>

          <div
            className={`grid grid-cols-1 border-t border-white/[0.06] pt-1.5 min-[360px]:grid-cols-3 ${
              inline ? "gap-1 min-[360px]:gap-1.5" : "gap-1.5 min-[360px]:gap-2"
            }`}
          >
            {tierMeta.enabled.slice(0, 3).map((line) => (
              <p
                key={line}
                className="min-w-0 text-center font-[family-name:var(--font-body)] text-[length:clamp(0.5rem,0.22rem+0.72vw,0.625rem)] leading-tight text-[rgba(228,226,222,0.88)] min-[360px]:text-left"
              >
                {line}
              </p>
            ))}
          </div>
        </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
