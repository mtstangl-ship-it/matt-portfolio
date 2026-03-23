"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type MetricSignal = {
  value: string;
  label: string;
  context?: string;
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
    const duration = 1000;
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
  const [focused, setFocused] = useState(0);

  useEffect(() => {
    setFocused(0);
  }, [mode]);

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative mt-3 min-h-[14.5rem]"
    >
      <div className="hidden sm:block">
        {metrics.map((m, i) => {
          const pos =
            i === 0
              ? "left-[4%] top-[10%]"
              : i === 1
                ? "left-[34%] top-[2%]"
                : "left-[62%] top-[16%]";
          const active = focused === i;
          return (
            <motion.button
              key={`${m.label}-${m.value}`}
              type="button"
              onMouseEnter={() => setFocused(i)}
              onFocus={() => setFocused(i)}
              onClick={() => setFocused(i)}
              className={`absolute ${pos} w-[34%] text-left`}
              initial={false}
              animate={{
                opacity: active ? 1 : 0.72,
                scale: active ? 1.03 : 1,
                y: active ? -2 : 0,
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="relative pl-4">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-accent-signal/75" />
                <p className="font-mono text-[1.55rem] font-bold leading-[1.05] tracking-[-0.03em] text-dashboard-ink-light">
                  <AnimatedMetricValue value={m.value} />
                </p>
                <p className="mt-1 font-body text-[0.625rem] font-semibold uppercase tracking-[0.11em] text-dashboard-ink-muted">
                  {m.label}
                </p>
              </div>
            </motion.button>
          );
        })}

        <motion.div
          key={`context-${mode}-${focused}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 rounded-sm border border-dashboard-border/65 bg-[#0e0d0c]/75 px-3 py-2"
        >
          <p className="font-body text-[0.75rem] font-bold leading-[1.55] text-dashboard-ink-muted">
            {metrics[focused]?.context ?? metrics[focused]?.label}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:hidden">
        {metrics.map((m, i) => (
          <button
            key={`${m.label}-${m.value}-mobile`}
            type="button"
            onClick={() => setFocused(i)}
            className={`rounded-sm border px-3 py-2 text-left ${
              focused === i ? "border-accent-signal/55 bg-accent-signal/10" : "border-dashboard-border/65 bg-[#0e0d0c]/72"
            }`}
          >
            <p className="font-mono text-[1.25rem] font-bold text-dashboard-ink-light">
              <AnimatedMetricValue value={m.value} />
            </p>
            <p className="mt-1 font-body text-[0.625rem] font-semibold uppercase tracking-[0.11em] text-dashboard-ink-muted">
              {m.label}
            </p>
            {focused === i ? (
              <p className="mt-1.5 font-body text-[0.75rem] font-bold leading-[1.5] text-dashboard-ink-muted">
                {m.context}
              </p>
            ) : null}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

