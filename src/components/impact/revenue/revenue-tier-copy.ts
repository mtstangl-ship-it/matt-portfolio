import type { TierKey } from "./revenue-tier-config";

/** Compact tier blurbs, paired with `whyThisMatters` + metrics in the descriptor panel. */
export const revenueTierCopy: Record<
  TierKey,
  {
    planLabel: string;
    executiveSummary: string;
    /** Optional second line; omit redundancy with executiveSummary. */
    summaryLines: [string, string];
    microMetrics: readonly string[];
  }
> = {
  business: {
    planLabel: "Business Plan",
    executiveSummary:
      "Premium success: strategic planning and coaching-heavy delivery to expand accounts and run post-purchase as a revenue motion.",
    summaryLines: [
      "Guided adoption · deeper engagement · expansion plays",
      "",
    ],
    microMetrics: ["15 services", "6 innovated", "4 optimized", "5 refined"],
  },
  professional: {
    planLabel: "Professional Plan",
    executiveSummary:
      "Mid-market scale: guided plays plus self-service to lift utilization and adoption without full premium coverage.",
    summaryLines: ["Balanced cost-to-serve · guided + self-serve", ""],
    microMetrics: ["10 services", "4 innovated", "3 optimized", "3 refined"],
  },
  included: {
    planLabel: "Included Plan",
    executiveSummary:
      "Onboarding and self-service paths to first value faster, with less reactive support load.",
    summaryLines: ["Retention at the base · feeds upsell into higher tiers", ""],
    microMetrics: ["5 services", "2 innovated", "1 optimized", "2 refined"],
  },
};
