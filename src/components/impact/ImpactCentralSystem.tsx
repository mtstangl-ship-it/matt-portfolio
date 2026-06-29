"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { RevenueSystemViz } from "./RevenueSystemViz";
import { OperationsSystemViz } from "./OperationsSystemViz";
import { HealthcareSystemViz } from "./HealthcareSystemViz";

export type SystemKey = "revenue" | "operations" | "healthcare";
export type RevenueTierKey = "business" | "professional" | "included";

const systemToViz: Record<SystemKey, ComponentType> = {
  revenue: RevenueSystemViz,
  operations: OperationsSystemViz,
  healthcare: HealthcareSystemViz,
};

export function ImpactCentralSystem({
  activeSystem,
  onRevenueTierHover,
}: {
  activeSystem: SystemKey;
  onRevenueTierHover?: (tier: RevenueTierKey | null) => void;
}) {
  const Viz = systemToViz[activeSystem];

  return (
    <div
      className={`relative w-full lg:min-h-0 lg:h-full ${
        activeSystem === "revenue"
          ? "flex min-h-0 flex-col max-lg:min-h-[min(36rem,82svh)]"
          : "min-h-[280px]"
      }`}
    >
      <motion.div
        key={activeSystem}
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className={`relative w-full lg:absolute lg:inset-0 lg:min-h-0 ${
          activeSystem === "revenue"
            ? "flex min-h-0 flex-1 flex-col lg:h-full"
            : "min-h-[280px]"
        }`}
      >
        {activeSystem === "revenue" ? (
          <RevenueSystemViz onTierHover={onRevenueTierHover} />
        ) : (
          <Viz />
        )}
      </motion.div>
    </div>
  );
}
