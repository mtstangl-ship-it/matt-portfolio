"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { problemLedger } from "@/content/home";

const INTERVAL_MS = 3800;
const OFFSET_MS = 1900; // right column starts mid-cycle so they never flash in sync

function useRotatingIndex(count: number, intervalMs: number, delayMs = 0) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (prefersReduced) return;
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % count);
          setVisible(true);
        }, 300);
      }, intervalMs);
      return () => clearInterval(tick);
    }, delayMs);
    return () => clearTimeout(start);
  }, [count, intervalMs, delayMs, prefersReduced]);

  return { index, visible };
}

function Column({
  eyebrow,
  items,
  intervalMs,
  delayMs,
  side,
}: {
  eyebrow: string;
  items: readonly string[];
  intervalMs: number;
  delayMs: number;
  side: "left" | "right";
}) {
  const { index, visible } = useRotatingIndex(items.length, intervalMs, delayMs);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className={`flex flex-col gap-4 ${side === "right" ? "md:text-right" : ""}`}>
      {/* eyebrow */}
      <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-[var(--teal-dim,#1dcfaa99)] uppercase">
        {eyebrow}
      </span>

      {/* rotating item */}
      <div className="relative min-h-[5rem] sm:min-h-[4rem]">
        <p
          className={[
            "text-[1.0625rem] font-medium leading-[1.5] text-ink-900 transition-opacity duration-300",
            visible ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <span className="mr-2 font-mono text-[0.6875rem] tracking-widest text-ink-400">
            {num} ·
          </span>
          {items[index]}
        </p>
      </div>

      {/* dot strip — shows all items as small indicators */}
      <div className={`flex gap-1.5 ${side === "right" ? "md:justify-end" : ""}`}>
        {items.map((_, i) => (
          <span
            key={i}
            className={[
              "block h-[3px] w-4 rounded-full transition-colors duration-300",
              i === index
                ? "bg-[var(--teal,#1dcfaa)]"
                : "bg-ink-300/30",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

export function ProblemLedger() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/55 bg-base-100 py-section">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 0% 50%, rgba(34,211,199,0.06), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(13,148,136,0.05), transparent 50%)",
        }}
      />

      <div className="relative z-10 grid gap-10 md:grid-cols-[1fr,auto,1fr] md:items-start md:gap-6">
        {/* Left column — PROBLEMS SOLVED */}
        <Column
          eyebrow={problemLedger.solved.eyebrow}
          items={problemLedger.solved.items}
          intervalMs={INTERVAL_MS}
          delayMs={0}
          side="left"
        />

        {/* Fiche dimension rule — hidden on mobile */}
        <div className="hidden md:flex md:flex-col md:items-center md:gap-2 md:pt-7">
          {/* top tick */}
          <span className="block h-3 w-px bg-ink-300/40" />
          {/* vertical rule */}
          <span className="block w-px flex-1 bg-ink-300/30" />
          {/* label */}
          <span
            className="font-mono text-[0.5625rem] tracking-[0.16em] text-ink-400/60 uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {problemLedger.dimensionLabel}
          </span>
          {/* vertical rule */}
          <span className="block w-px flex-1 bg-ink-300/30" />
          {/* bottom tick */}
          <span className="block h-3 w-px bg-ink-300/40" />
        </div>

        {/* Mobile dimension rule */}
        <div className="flex items-center gap-3 md:hidden">
          <span className="h-px flex-1 bg-ink-300/30" />
          <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-ink-400/60 uppercase">
            {problemLedger.dimensionLabel}
          </span>
          <span className="h-px flex-1 bg-ink-300/30" />
        </div>

        {/* Right column — PROBLEMS I WANT TO SOLVE */}
        <Column
          eyebrow={problemLedger.intent.eyebrow}
          items={problemLedger.intent.items}
          intervalMs={INTERVAL_MS}
          delayMs={OFFSET_MS}
          side="right"
        />
      </div>
    </Section>
  );
}
