"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ImpactOutcomeMode } from "@/content/impact-page";

type NodeKey =
  | "autodesk"
  | "wipro"
  | "ey"
  | "revenue"
  | "operations"
  | "healthcare";

const accent = "#22d3c7";

const baseNodes: Record<NodeKey, { x: number; y: number; glow?: number }> = {
  autodesk: { x: 110, y: 62, glow: 0.95 },
  wipro: { x: 300, y: 62, glow: 0.85 },
  ey: { x: 500, y: 62, glow: 0.95 },
  revenue: { x: 190, y: 170, glow: 1 },
  operations: { x: 350, y: 170, glow: 1 },
  healthcare: { x: 560, y: 170, glow: 1 },
};

const outcomeKeys = ["revenue", "operations", "healthcare"] as const;
const moduleKeys = ["autodesk", "wipro", "ey"] as const;

// How strongly each module maps to each outcome (used for line intensity).
const moduleToOutcomeWeight: Record<
  (typeof moduleKeys)[number],
  Record<(typeof outcomeKeys)[number], number>
> = {
  autodesk: { revenue: 0.95, operations: 0.35, healthcare: 0.15 },
  wipro: { revenue: 0.35, operations: 0.95, healthcare: 0.25 },
  ey: { revenue: 0.2, operations: 0.35, healthcare: 0.95 },
};

function getModeWeight({
  mode,
  endpointOutcome,
  base,
}: {
  mode: ImpactOutcomeMode;
  endpointOutcome: (typeof outcomeKeys)[number];
  base: number;
}): number {
  if (mode === "all") return 0.35 + base * 0.65;
  if (mode === endpointOutcome) return 0.5 + base * 0.5;
  // Dim the non-selected outcomes, but keep some “system context”.
  return 0.12 + base * 0.2;
}

export function ImpactSystemMapViz({ mode }: { mode: ImpactOutcomeMode }) {
  const reducedMotion = useReducedMotion();
  const nodes = getNodesForMode(mode);

  const lines = moduleKeys.flatMap((mk) =>
    outcomeKeys.map((ok) => {
      const a = nodes[mk];
      const b = nodes[ok];
      const base = moduleToOutcomeWeight[mk][ok];
      const intensity = getModeWeight({ mode, endpointOutcome: ok, base });
      const isActive = mode === "all" ? intensity > 0.55 : ok === mode && intensity > 0.4;
      const d = getPath(a.x, a.y, b.x, b.y, mk, ok);
      return { key: `${mk}-${ok}`, mk, ok, a, b, d, intensity, isActive };
    }),
  );

  return (
    <div className="relative h-full min-h-[14rem] w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(34,211,199,0.12) 0%, transparent 55%), radial-gradient(ellipse at 22% 24%, rgba(34,211,199,0.2), transparent 40%), radial-gradient(ellipse at 78% 72%, rgba(34,211,199,0.15), transparent 42%)",
        }}
      />
      <svg viewBox="0 0 680 240" className="h-full w-full" aria-hidden>
        <g opacity="0.4">
          {moduleKeys.map((mk) => {
            const x = nodes[mk].x;
            const y = nodes[mk].y;
            return <circle key={`halo-${mk}`} cx={x} cy={y} r={24} fill="none" stroke="rgba(34,211,199,0.25)" strokeWidth={1} />;
          })}
        </g>
        {/* Connections, thicker, higher contrast */}
        <g>
          {lines.map((l) => (
            <motion.path
              key={l.key}
              d={l.d}
              stroke={accent}
              strokeWidth={l.isActive ? 2.2 : 1.4}
              strokeLinecap="round"
              fill="none"
              opacity={l.intensity}
              initial={false}
              animate={
                reducedMotion
                  ? { strokeDashoffset: 0, opacity: l.intensity, pathLength: 1 }
                  : l.isActive
                    ? {
                        strokeDashoffset: [0, -90],
                        opacity: [l.intensity * 0.85, 1, l.intensity * 0.85],
                        pathLength: [0.88, 1, 0.96],
                      }
                    : { strokeDashoffset: 0, opacity: l.intensity, pathLength: 1 }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : l.isActive
                    ? {
                        duration: 1.65,
                        repeat: Infinity,
                        ease: "linear",
                      }
                    : { duration: 0.35, ease: "easeOut" }
              }
              strokeDasharray="6 10"
              style={{ filter: l.isActive ? "drop-shadow(0 0 12px rgba(34,211,199,0.5))" : undefined }}
            />
          ))}
        </g>

        {/* Active signal packets */}
        {!reducedMotion &&
          lines
            .filter((l) => l.isActive)
            .map((l, i) => (
              <motion.circle
                key={`packet-${l.key}`}
                r={2.8}
                fill={accent}
                initial={false}
                animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 0.95, 0] }}
                transition={{
                  duration: 1.35 + i * 0.12,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.08,
                }}
                style={{
                  offsetPath: `path("${l.d}")`,
                  filter: "drop-shadow(0 0 8px rgba(34,211,199,0.55))",
                }}
              />
            ))}

        {/* Nodes */}
        <g>
          {moduleKeys.map((mk) => {
            const x = nodes[mk].x;
            const y = nodes[mk].y;
            const moduleIntensity = outcomeKeys.reduce((acc, ok) => {
              const base = moduleToOutcomeWeight[mk][ok];
              return acc + getModeWeight({ mode, endpointOutcome: ok, base });
            }, 0);
            const isPulsing =
              mode === "all" ? moduleIntensity / outcomeKeys.length > 0.45 : mk !== "ey" ? mode === "revenue" || mode === "operations" : mode === "healthcare";
            return (
              <motion.circle
                key={mk}
                cx={x}
                cy={y}
                r={mk === "wipro" ? 5 : 6}
                fill={accent}
                opacity={mode === "all" ? 0.95 : 0.7}
                initial={false}
                animate={
                  reducedMotion
                    ? { scale: 1, opacity: mode === "all" ? 0.85 : 0.55 }
                    : isPulsing
                      ? {
                          opacity: [0.5, 0.95, 0.55],
                          scale: [0.98, 1.18, 0.98],
                        }
                      : { scale: 1, opacity: mode === "all" ? 0.7 : 0.42 }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : isPulsing
                      ? { duration: 1.35, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.35 }
                }
              />
            );
          })}

          {outcomeKeys.map((ok) => {
            const x = nodes[ok].x;
            const y = nodes[ok].y;
            const active = mode === "all" ? true : mode === ok;
            return (
              <motion.g key={ok}>
                <circle
                  cx={x}
                  cy={y}
                  r={active ? 9 : 6.5}
                  fill="rgba(34,211,199,0.12)"
                  opacity={active ? 1 : 0.5}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r={active ? 5.5 : 4}
                  fill={accent}
                  initial={false}
                  animate={
                    reducedMotion
                      ? { opacity: active ? 0.95 : 0.55, scale: 1 }
                      : active
                        ? {
                            opacity: [0.55, 1, 0.55],
                            scale: [0.98, 1.22, 0.98],
                          }
                        : { opacity: 0.55, scale: 1 }
                  }
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : active
                        ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.35 }
                  }
                />
                {active && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={10}
                    fill="none"
                    stroke={accent}
                    strokeWidth={1}
                    initial={false}
                    animate={
                      reducedMotion
                        ? { opacity: 0.45, scale: 1 }
                        : { opacity: [0.55, 0.1, 0], scale: [0.95, 1.4, 1.6] }
                    }
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 1.2, repeat: Infinity, ease: "easeOut" }
                    }
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                )}
              </motion.g>
            );
          })}
        </g>
      </svg>

      {/* Subtle “instrumentation” outline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sm border border-accent-signal/25"
      />
    </div>
  );
}

function getNodesForMode(mode: ImpactOutcomeMode): Record<NodeKey, { x: number; y: number; glow?: number }> {
  const n = structuredClone(baseNodes);
  if (mode === "all") return n;

  if (mode === "revenue") {
    n.revenue.y = 146;
    n.operations.y = 182;
    n.healthcare.y = 186;
  } else if (mode === "operations") {
    n.operations.y = 146;
    n.revenue.y = 184;
    n.healthcare.y = 184;
  } else if (mode === "healthcare") {
    n.healthcare.y = 146;
    n.revenue.y = 186;
    n.operations.y = 182;
  }
  return n;
}

function getPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  mk: (typeof moduleKeys)[number],
  ok: (typeof outcomeKeys)[number],
): string {
  const curveSeed = (mk.charCodeAt(0) + ok.charCodeAt(0)) % 2 === 0 ? 1 : -1;
  const c1x = x1 + (x2 - x1) * 0.32;
  const c1y = y1 + 38 * curveSeed;
  const c2x = x1 + (x2 - x1) * 0.72;
  const c2y = y2 - 26 * curveSeed;
  return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
}

