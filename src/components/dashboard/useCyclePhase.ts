"use client";

import { useEffect, useRef, useState } from "react";

/** 0 → 1 linear phase over `periodMs`, paused when inactive. RAF-driven (no Framer quirks on SVG). */
export function useCyclePhase(active: boolean, periodMs: number): number {
  const [phase, setPhase] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) % periodMs;
      setPhase(elapsed / periodMs);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, periodMs]);

  return phase;
}

/** Linear interpolation between keyframes with arbitrary segment times (length K), phase in [0,1]. */
export function sampleKeyframes(values: number[], times: number[], phase: number): number {
  if (phase <= times[0]) return values[0];
  if (phase >= times[times.length - 1]) return values[values.length - 1];
  for (let i = 0; i < times.length - 1; i++) {
    const t0 = times[i];
    const t1 = times[i + 1];
    if (phase <= t1) {
      const u = (phase - t0) / (t1 - t0);
      return values[i] + (values[i + 1] - values[i]) * u;
    }
  }
  return values[values.length - 1];
}
