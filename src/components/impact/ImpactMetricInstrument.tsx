"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type MetricSignal = {
  value: string;
  label: string;
};

function parseValue(val: string): { numeric: number; prefix: string; suffix: string } | null {
  const trimmed = val.trim();
  if (trimmed.includes("figure")) return null;
  const cleaned = trimmed.replace(/,/g, "");
  const prefix = cleaned.match(/^([+\-])?/)?.[1] ?? "";
  const numMatch = cleaned.match(/([\d.]+)/);
  if (!numMatch) return null;
  const numeric = parseFloat(numMatch[1]);
  if (Number.isNaN(numeric)) return null;
  const suffix = cleaned.replace(/^[+\-]?[\d.]+/, "");
  return { numeric, prefix, suffix };
}

function formatValue(num: number, parsed: NonNullable<ReturnType<typeof parseValue>>, isFinal: boolean) {
  const suffix = parsed.suffix;
  if (suffix.includes("%")) return `${parsed.prefix}${Math.round(num)}%`;
  if (suffix.toLowerCase().includes("k")) return `${parsed.prefix}${Math.round(num)}k`;
  if (suffix.toLowerCase().includes("m")) {
    const fixed = isFinal ? num.toFixed(2).replace(/\.?0+$/, "") : num.toFixed(2);
    return `${parsed.prefix}${fixed}M${suffix.includes("+") ? "+" : ""}`;
  }
  if (suffix.includes("+")) return `${parsed.prefix}${Math.round(num)}+`;
  return `${parsed.prefix}${Math.round(num)}${suffix}`;
}

function AnimatedMetricValue({ value }: { value: string }) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 800;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      const current = parsed.numeric * eased;
      setDisplay(formatValue(current, parsed, t >= 1));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [parsed, value]);

  return <>{display}</>;
}

export function ImpactMetricInstrument({ mode, metrics }: { mode: string; metrics: readonly MetricSignal[] }) {
  return (
    <motion.div
      key={mode}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="mt-2 flex flex-col gap-6"
    >
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-1">
          <p className="font-mono text-[1.2rem] font-bold tabular-nums leading-none text-dashboard-ink-light">
            <AnimatedMetricValue value={m.value} />
          </p>
          <p className=" text-[0.5625rem] font-semibold leading-tight text-dashboard-ink-muted/90">
            {m.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
