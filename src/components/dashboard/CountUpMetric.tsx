"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface CountUpMetricProps {
  value: string;
  label: string;
  index: number;
  variant?: "default" | "dashboard";
}

/**
 * Parses a metric value into numeric + formatting parts.
 * Returns null for non-numeric values (0→1, 8-figure, 3–5 yr, etc.)
 */
function parseValue(
  val: string
): { numeric: number; suffix: string; prefix: string } | null {
  const trimmed = val.trim();
  if (
    trimmed.includes("→") ||
    trimmed.includes("–") ||
    trimmed.includes("figure") ||
    trimmed.includes("yr") ||
    /^[a-zA-Z\s-]+$/.test(trimmed)
  ) {
    return null;
  }
  const cleaned = trimmed.replace(/,/g, "");
  const prefixMatch = cleaned.match(/^([+\-])?/);
  const prefix = prefixMatch?.[1] ?? "";
  const numMatch = cleaned.match(/([\d.]+)/);
  if (!numMatch) return null;
  const num = parseFloat(numMatch[1]);
  if (isNaN(num)) return null;
  const suffix = cleaned.replace(/^[+\-]?[\d.]+/, "").trim();
  return { numeric: num, suffix, prefix };
}

/**
 * Formats a numeric value with prefix/suffix.
 * Handles %, M, M+, K, K+, and plain numbers.
 */
function formatDisplay(
  num: number,
  suffix: string,
  prefix: string,
  isFinal: boolean
): string {
  if (isFinal) {
    num = Math.abs(num); // Use exact target; prefix handled separately
  }
  const plus = suffix.includes("+") ? "+" : "";
  const suffixBase = suffix.replace(/\+/g, "");

  if (suffixBase.includes("M")) {
    const formatted =
      num >= 1
        ? isFinal
          ? num.toFixed(2).replace(/\.?0+$/, "")
          : num.toFixed(2)
        : isFinal
          ? num.toString()
          : num.toFixed(2);
    return `${prefix}${formatted}M${plus}`;
  }
  if (suffixBase.includes("K")) {
    return `${prefix}${Math.round(num)}K${plus}`;
  }
  if (suffixBase.includes("%")) {
    return `${prefix}${Math.round(num)}%${plus}`;
  }
  if (plus || suffix === "+") {
    return `${prefix}${Math.round(num)}+`;
  }
  if (num % 1 !== 0) {
    return `${prefix}${num.toFixed(2)}`;
  }
  return `${prefix}${Math.round(num)}${suffixBase}`;
}

export function CountUpMetric({ value, label, index, variant = "default" }: CountUpMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const startTimeRef = useRef<number>(0);
  const parsed = parseValue(value);
  const lastFormattedRef = useRef<string>(value);

  useEffect(() => {
    const parsedVal = parseValue(value);
    if (!parsedVal) {
      setDisplay(value);
      lastFormattedRef.current = value;
      return;
    }
    if (reducedMotion) {
      const snapped = formatDisplay(
        parsedVal.numeric,
        parsedVal.suffix,
        parsedVal.prefix,
        true
      );
      setDisplay(snapped);
      lastFormattedRef.current = snapped;
      setHasAnimated(true);
      return;
    }
    if (!inView || hasAnimated) return;

    const { numeric: targetValue, suffix, prefix } = parsedVal;
    const durationMs = 1200;

    const startFormatted = formatDisplay(0, suffix, prefix, false);
    setDisplay(startFormatted);
    lastFormattedRef.current = startFormatted;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = targetValue * eased;
      const isFinal = progress >= 1;
      const nextFormatted = formatDisplay(current, suffix, prefix, isFinal);
      // Throttle renders: update only when the string changes.
      if (lastFormattedRef.current !== nextFormatted) {
        setDisplay(nextFormatted);
        lastFormattedRef.current = nextFormatted;
      }
      if (isFinal) {
        setHasAnimated(true);
        const finalFormatted = formatDisplay(
          targetValue,
          suffix,
          prefix,
          true
        );
        setDisplay(finalFormatted);
        lastFormattedRef.current = finalFormatted;
        return;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    startTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView, hasAnimated, value]);

  const showAnimated = parsed !== null && (inView || hasAnimated);
  const finalDisplay = parsed
    ? formatDisplay(parsed.numeric, parsed.suffix, parsed.prefix, true)
    : value;

  const isDashboard = variant === "dashboard";
  return (
    <motion.div
      ref={ref}
      className={`flex flex-col justify-start gap-1.5 rounded-sm border px-3 py-2.5 sm:px-4 sm:py-3 ${
        isDashboard
          ? "h-[5.5rem] border-dashboard-border border-l-[3px] border-l-accent-signal bg-dashboard-muted/80 sm:h-[5.75rem]"
          : "h-[4rem] border-ink-300/70 border-l-[3px] border-l-accent bg-ink-100/90 sm:h-[4.25rem]"
      }`}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
    >
      <p className={`shrink-0 font-mono text-[1rem] font-bold tabular-nums leading-tight sm:text-[1.25rem] ${isDashboard ? "text-dashboard-ink-light" : "text-ink-950"}`}>
        {showAnimated ? display : finalDisplay}
      </p>
      <p
        className={`min-w-0 font-body text-[0.625rem] font-medium leading-[1.35] tracking-[0.01em] sm:text-[0.6875rem] ${isDashboard ? "line-clamp-2 text-dashboard-ink-muted/95" : "line-clamp-2 text-ink-700"}`}
      >
        {label}
      </p>
    </motion.div>
  );
}
