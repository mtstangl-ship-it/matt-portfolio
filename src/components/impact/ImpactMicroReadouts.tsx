"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { impactMissionControl } from "@/content/impact-mission-control";

const { telemetryReadouts } = impactMissionControl;

/** Pulsing telemetry line - mimics live data */
function TelemetryLine({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const activeIndex = tick % items.length;

  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-0 font-mono text-[0.4375rem] font-medium tabular-nums text-dashboard-ink-muted ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={item}
          animate={{
            opacity: i === activeIndex ? 0.85 : 0.35,
          }}
          transition={{ duration: 0.3 }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

export function ImpactMicroReadouts() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
      {/* Top-left corner only — clear of metrics panel (10rem) */}
      <div
        className="absolute left-[0.5rem] top-[0.4rem]"
        style={{ opacity: 0.12 }}
      >
        <TelemetryLine items={telemetryReadouts.metrics} />
      </div>

      {/* Top-right corner — near engine */}
      <div
        className="absolute right-[0.5rem] top-[0.4rem]"
        style={{ opacity: 0.12 }}
      >
        <TelemetryLine items={telemetryReadouts.engine} />
      </div>

      {/* Bottom center — above readout strip, out of narrative flow */}
      <div
        className="absolute bottom-[3rem] left-[50%] -translate-x-1/2"
        style={{ opacity: 0.1 }}
      >
        <TelemetryLine items={telemetryReadouts.narrative} />
      </div>
    </div>
  );
}
