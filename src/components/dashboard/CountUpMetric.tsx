"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpMetricProps {
  value: string;
  label: string;
  index: number;
}

function parseValue(val: string): { numeric: number; suffix: string; prefix: string } | null {
  if (val.includes("→") || val.includes("–") || val.includes("figure") || val.includes("yr")) return null;
  const cleaned = val.replace(/,/g, "");
  const prefixMatch = cleaned.match(/^([+\-])?/);
  const prefix = prefixMatch?.[1] ?? "";
  const numMatch = cleaned.match(/([\d.]+)/);
  if (!numMatch) return null;
  const num = parseFloat(numMatch[1]);
  const suffix = cleaned.replace(/^[+\-]?[\d.]+/, "").trim();
  return { numeric: num, suffix, prefix };
}

function formatDisplay(num: number, suffix: string, prefix: string): string {
  const plus = suffix.includes("+") ? "+" : "";
  if (suffix.includes("M")) {
    return `${prefix}${num >= 1 ? num.toFixed(2) : num}M${plus}`;
  }
  if (suffix.includes("K")) {
    return `${prefix}${Math.round(num)}K${plus}`;
  }
  if (suffix.includes("%")) {
    return `${prefix}${Math.round(num)}%`;
  }
  if (suffix === "+" || plus) {
    return `${prefix}${Math.round(num)}+`;
  }
  if (num % 1 !== 0) {
    return `${prefix}${num.toFixed(2)}`;
  }
  return `${prefix}${Math.round(num)}${suffix}`;
}

export function CountUpMetric({ value, label, index }: CountUpMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  const parsed = parseValue(value);

  useEffect(() => {
    if (!inView || hasAnimated || !parsed) {
      if (inView && !parsed) setDisplay(value);
      return;
    }

    const { numeric, suffix, prefix } = parsed;
    const duration = 1200;
    const steps = 30;
    const stepDuration = duration / steps;
    const stepValue = numeric / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= numeric) {
        current = numeric;
        clearInterval(timer);
        setHasAnimated(true);
      }
      setDisplay(formatDisplay(current, suffix, prefix));
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, hasAnimated, parsed, value]);

  if (!parsed) {
    return (
      <motion.div
        ref={ref}
        className="rounded-sm border border-ink-300/70 border-l-2 border-l-accent/60 bg-ink-100/90 px-5 py-4"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 + index * 0.05, duration: 0.35 }}
      >
        <p className="font-mono text-metric font-bold tabular-nums text-ink-950">{value}</p>
        <p className="font-body mt-1 text-metric-sm font-semibold text-ink-700">{label}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="rounded-sm border border-ink-300/70 border-l-2 border-l-accent/60 bg-ink-100/90 px-5 py-4"
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.35 }}
    >
      <p className="font-mono text-metric font-bold tabular-nums text-ink-950">{display}</p>
      <p className="font-body mt-1 text-metric-sm font-semibold text-ink-700">{label}</p>
    </motion.div>
  );
}
