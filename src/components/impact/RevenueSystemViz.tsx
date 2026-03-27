"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

const accent = "#22d3c7";

type TierKey = "business" | "professional" | "included";

/** Top → bottom: Business, Professional, Included */
const tierOrder: TierKey[] = ["business", "professional", "included"];

const tierData: Record<
  TierKey,
  {
    planLabel: string;
    /** Full strategic line for tooltips / aria */
    executiveSummary: string;
    /** Two lines for compact SVG band */
    summaryLines: [string, string];
    /** Always-visible micro readouts (horizontal strip) */
    microMetrics: readonly string[];
    metrics: string[];
    /** Cluster boxes: x, y, w, h, then node offsets inside cluster (local 0–1) */
    clusters: { x: number; y: number; w: number; h: number; nodes: { ox: number; oy: number }[] }[];
  }
> = {
  business: {
    planLabel: "Business Plan",
    executiveSummary:
      "High-touch success services designed to accelerate adoption, expand value, and drive premium post-purchase revenue.",
    summaryLines: [
      "Premium service layer",
      "expansion + retention",
    ],
    microMetrics: ["15 services", "6 innovated", "4 optimized", "5 refined"],
    metrics: [
      "Role: Premium service layer driving expansion and retention",
      "→ Strategic success planning",
      "→ +60% coaching engagement",
      "→ Faster time to value (-22%)",
      "Why it matters: Transforms support into revenue drivers",
      "→ 50M+ AOV",
      "→ 106% NRR path",
    ],
    clusters: [
      {
        x: 28,
        y: 56,
        w: 100,
        h: 30,
        nodes: [
          { ox: 12, oy: 15 },
          { ox: 26, oy: 15 },
          { ox: 40, oy: 15 },
          { ox: 54, oy: 15 },
          { ox: 68, oy: 15 },
          { ox: 82, oy: 15 },
        ],
      },
      {
        x: 150,
        y: 56,
        w: 100,
        h: 30,
        nodes: [
          { ox: 18, oy: 15 },
          { ox: 36, oy: 15 },
          { ox: 54, oy: 15 },
          { ox: 72, oy: 15 },
        ],
      },
      {
        x: 272,
        y: 56,
        w: 100,
        h: 30,
        nodes: [
          { ox: 10, oy: 15 },
          { ox: 26, oy: 15 },
          { ox: 42, oy: 15 },
          { ox: 58, oy: 15 },
          { ox: 74, oy: 15 },
        ],
      },
    ],
  },
  professional: {
    planLabel: "Professional Plan",
    executiveSummary:
      "Scaled success services built to increase utilization, improve feature adoption, and bridge self-service with guided support.",
    summaryLines: [
      "Scaled success services",
      "utilization + feature adoption",
    ],
    microMetrics: ["10 services", "4 innovated", "3 optimized", "3 refined"],
    metrics: [
      "Scaled success services for utilization growth",
      "Improved feature adoption across segments",
      "Bridged self-service with guided support",
    ],
    clusters: [
      {
        x: 52,
        y: 160,
        w: 132,
        h: 28,
        nodes: [
          { ox: 28, oy: 11 },
          { ox: 52, oy: 11 },
          { ox: 76, oy: 11 },
          { ox: 100, oy: 11 },
        ],
      },
      {
        x: 216,
        y: 160,
        w: 132,
        h: 28,
        nodes: [
          { ox: 22, oy: 11 },
          { ox: 46, oy: 11 },
          { ox: 70, oy: 11 },
          { ox: 94, oy: 11 },
        ],
      },
    ],
  },
  included: {
    planLabel: "Included Plan",
    executiveSummary:
      "Foundational self-service experiences designed to accelerate onboarding, reduce dependency, and improve early value realization.",
    summaryLines: [
      "Foundational self-service",
      "onboarding + early value",
    ],
    microMetrics: ["5 services", "2 innovated", "2 optimized", "1 refined"],
    metrics: ["Foundational self-service onboarding", "Reduced support dependency", "Improved early value realization"],
    clusters: [
      {
        x: 96,
        y: 258,
        w: 96,
        h: 24,
        nodes: [
          { ox: 22, oy: 10 },
          { ox: 46, oy: 10 },
          { ox: 70, oy: 10 },
        ],
      },
      {
        x: 208,
        y: 258,
        w: 96,
        h: 24,
        nodes: [
          { ox: 22, oy: 10 },
          { ox: 46, oy: 10 },
        ],
      },
    ],
  },
};

const HUB = { cx: 200, cy: 306, r: 28 };
const NODE_W = 10;
const NODE_H = 8;

/** Band geometry: premium = larger footprint; base = narrower, lighter frame */
function tierBandRect(tier: TierKey): { x: number; y: number; w: number; h: number } {
  switch (tier) {
    case "business":
      return { x: 8, y: 10, w: 384, h: 84 };
    case "professional":
      return { x: 16, y: 118, w: 368, h: 74 };
    case "included":
      return { x: 24, y: 222, w: 352, h: 66 };
    default:
      return { x: 16, y: 14, w: 368, h: 76 };
  }
}

function tierVisual(tier: TierKey) {
  switch (tier) {
    case "business":
      return {
        fillIdle: "rgba(18,22,22,0.82)",
        fillHover: "rgba(34,211,199,0.14)",
        strokeIdleW: 1.05,
        strokeHoverW: 1.35,
        strokeIdleOpacity: 0.52,
        strokeHoverOpacity: 0.72,
        titleSize: 11,
        titleFill: "rgba(248,246,242,0.98)",
        summaryFill: "rgba(232,230,226,0.88)",
        microFill: "rgba(200,230,226,0.62)",
        clusterFill: "rgba(0,0,0,0.32)",
        clusterStrokeOpacity: 0.48,
        clusterStrokeW: 0.65,
        nodeIdleOpacity: 0.62,
        nodeHoverOpacity: 0.95,
        lineStrokeW: 0.56,
        lineOpacityScale: 0.5,
        rx: 5,
        titleWeight: 800,
        glow: true,
      };
    case "professional":
      return {
        fillIdle: "rgba(14,13,12,0.58)",
        fillHover: "rgba(34,211,199,0.1)",
        strokeIdleW: 0.72,
        strokeHoverW: 1.05,
        strokeIdleOpacity: 0.32,
        strokeHoverOpacity: 0.5,
        titleSize: 10,
        titleFill: "rgba(238,236,232,0.94)",
        summaryFill: "rgba(220,218,212,0.78)",
        microFill: "rgba(188,184,176,0.52)",
        clusterFill: "rgba(0,0,0,0.26)",
        clusterStrokeOpacity: 0.38,
        clusterStrokeW: 0.52,
        nodeIdleOpacity: 0.52,
        nodeHoverOpacity: 0.82,
        lineStrokeW: 0.44,
        lineOpacityScale: 0.41,
        rx: 4,
        titleWeight: 700,
        glow: false,
      };
    case "included":
      return {
        fillIdle: "rgba(12,11,10,0.42)",
        fillHover: "rgba(34,211,199,0.06)",
        strokeIdleW: 0.55,
        strokeHoverW: 0.82,
        strokeIdleOpacity: 0.14,
        strokeHoverOpacity: 0.28,
        titleSize: 9.5,
        titleFill: "rgba(200,196,188,0.72)",
        summaryFill: "rgba(168,164,156,0.58)",
        microFill: "rgba(140,136,128,0.38)",
        clusterFill: "rgba(0,0,0,0.18)",
        clusterStrokeOpacity: 0.22,
        clusterStrokeW: 0.42,
        nodeIdleOpacity: 0.38,
        nodeHoverOpacity: 0.65,
        lineStrokeW: 0.31,
        lineOpacityScale: 0.27,
        rx: 3,
        titleWeight: 600,
        glow: false,
      };
  }
}

export function RevenueSystemViz({
  onTierHover,
}: {
  onTierHover?: (tier: TierKey | null) => void;
}) {
  const [hoveredTier, setHoveredTier] = useState<TierKey | null>(null);
  const reducedMotion = useReducedMotion();

  const nodeCenters = useMemo(() => {
    const out: { tier: TierKey; cx: number; cy: number; i: number }[] = [];
    tierOrder.forEach((tier) => {
      const { clusters } = tierData[tier];
      let i = 0;
      clusters.forEach((cl) => {
        cl.nodes.forEach((n) => {
          out.push({
            tier,
            cx: cl.x + n.ox,
            cy: cl.y + n.oy,
            i: i++,
          });
        });
      });
    });
    return out;
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-xl lg:h-full lg:max-w-none"
      style={{ aspectRatio: "400/330", minHeight: 290 }}
    >
      <svg
        viewBox="0 0 400 330"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Revenue — tiered service plans feeding central outcome"
      >
        <defs>
          <linearGradient id="revenue-core-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
            <stop offset="100%" stopColor={accent} stopOpacity={0.08} />
          </linearGradient>
          <linearGradient id="revenue-business-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent} stopOpacity={0} />
            <stop offset="50%" stopColor={accent} stopOpacity={0.12} />
            <stop offset="100%" stopColor={accent} stopOpacity={0} />
          </linearGradient>
          <filter id="revenue-business-tier-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines first — no pointer capture */}
        {nodeCenters.map(({ tier, cx, cy, i }) => {
          const v = tierVisual(tier);
          const s = v.lineOpacityScale;
          const oLo = Math.min(0.1, 0.08 * s);
          const oHi = Math.min(0.28, 0.22 * s);
          const oDim = Math.min(0.07, 0.05 * s);
          const oStill = Math.min(0.16, 0.12 * s);
          return (
            <motion.line
              key={`line-${tier}-${i}-${cx}-${cy}`}
              x1={cx}
              y1={cy + NODE_H / 2}
              x2={HUB.cx}
              y2={HUB.cy - HUB.r}
              stroke={accent}
              strokeWidth={v.lineStrokeW}
              strokeLinecap="round"
              pointerEvents="none"
              initial={false}
              animate={
                reducedMotion
                  ? { opacity: oStill }
                  : {
                      opacity:
                        hoveredTier === tier || hoveredTier === null ? [oLo, oHi, oLo] : oDim,
                      strokeDashoffset: [0, -18, 0],
                    }
              }
              transition={{
                duration: 2.4 + (i % 4) * 0.25,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.06,
              }}
              style={{ strokeDasharray: "5 7" }}
            />
          );
        })}

        {/* Tier bands — horizontal structure */}
        {tierOrder.map((tier) => {
          const band = tierBandRect(tier);
          const v = tierVisual(tier);
          const isHovered = hoveredTier === tier;
          const anyHovered = hoveredTier !== null;
          return (
            <g key={tier} opacity={anyHovered ? (isHovered ? 1 : 0.72) : 1}>
              {v.glow ? (
                <motion.rect
                  x={band.x - 5}
                  y={band.y - 5}
                  width={band.w + 10}
                  height={band.h + 10}
                  rx={v.rx + 3}
                  fill="none"
                  stroke={accent}
                  strokeWidth={1.05}
                  filter="url(#revenue-business-tier-glow)"
                  pointerEvents="none"
                  initial={false}
                  animate={
                    reducedMotion
                      ? { strokeOpacity: isHovered ? 0.38 : 0.22 }
                      : {
                          strokeOpacity: isHovered
                            ? [0.32, 0.5, 0.32]
                            : [0.18, 0.28, 0.18],
                        }
                  }
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
              <rect
                x={band.x}
                y={band.y}
                width={band.w}
                height={band.h}
                rx={v.rx}
                fill={isHovered ? v.fillHover : v.fillIdle}
                stroke={accent}
                strokeWidth={isHovered ? v.strokeHoverW : v.strokeIdleW}
                strokeOpacity={isHovered ? v.strokeHoverOpacity : v.strokeIdleOpacity}
                onMouseEnter={() => {
                  setHoveredTier(tier);
                  onTierHover?.(tier);
                }}
                onMouseLeave={() => {
                  setHoveredTier(null);
                  onTierHover?.(null);
                }}
                className="cursor-pointer"
              />
              {tier === "business" ? (
                <motion.rect
                  x={band.x - 90}
                  y={band.y + 2}
                  width={90}
                  height={band.h - 4}
                  rx={v.rx}
                  fill="url(#revenue-business-sheen)"
                  pointerEvents="none"
                  initial={false}
                  animate={reducedMotion ? { opacity: 0.22 } : { x: [band.x - 90, band.x + band.w], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
              <text
                x={band.x + 12}
                y={band.y + 16}
                fill={v.titleFill}
                pointerEvents="none"
                style={{
                  fontSize: `${v.titleSize}px`,
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontWeight: v.titleWeight,
                  letterSpacing: "0.06em",
                }}
              >
                {tierData[tier].planLabel}
              </text>
              <text
                x={band.x + 12}
                y={band.y + 30}
                fill={v.summaryFill}
                pointerEvents="none"
                style={{
                  fontSize: tier === "included" ? "6.25px" : "6.5px",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                <tspan x={band.x + 12} dy="0">
                  {tierData[tier].summaryLines[0]}
                </tspan>
                <tspan x={band.x + 12} dy="9">
                  {tierData[tier].summaryLines[1]}
                </tspan>
              </text>
              <text
                x={band.x + band.w - 12}
                y={tier === "business" ? band.y + 76 : tier === "professional" ? band.y + 66 : band.y + 56}
                textAnchor="end"
                fill={tier === "business" ? "rgba(210,242,238,0.78)" : "rgba(196,206,202,0.66)"}
                pointerEvents="none"
                style={{
                  fontSize: tier === "included" ? "4.5px" : "4.8px",
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontWeight: 600,
                  letterSpacing: "0.015em",
                }}
              >
                {tierData[tier].microMetrics.join("  ·  ")}
              </text>
            </g>
          );
        })}

        {/* Cluster outlines + service nodes (packaged blocks) */}
        {tierOrder.map((tier) => {
          const { clusters } = tierData[tier];
          const v = tierVisual(tier);
          const isHovered = hoveredTier === tier;
          const nodeRx = tier === "business" ? 1.5 : tier === "professional" ? 1.25 : 1;
          const anyHovered = hoveredTier !== null;
          return (
            <g key={`clusters-${tier}`} opacity={anyHovered ? (isHovered ? 1 : 0.7) : 1}>
              {clusters.map((cl, ci) => (
                <g key={`${tier}-c-${ci}`}>
                  {tier === "business" ? (
                    <text
                      x={cl.x + cl.w / 2}
                      y={cl.y - 3}
                      textAnchor="middle"
                      fill="rgba(208,236,232,0.7)"
                      pointerEvents="none"
                      style={{
                        fontSize: "4.6px",
                        fontFamily: "var(--font-mono), ui-monospace, monospace",
                        fontWeight: 600,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {ci === 0 ? "INNOVATED" : ci === 1 ? "OPTIMIZED" : "REFINED"}
                    </text>
                  ) : null}
                  <motion.rect
                    x={cl.x}
                    y={cl.y}
                    width={cl.w}
                    height={cl.h}
                    rx={tier === "business" ? 3 : 2}
                    fill={v.clusterFill}
                    stroke={accent}
                    strokeWidth={v.clusterStrokeW}
                    strokeOpacity={v.clusterStrokeOpacity}
                    pointerEvents="none"
                    initial={false}
                    animate={
                      reducedMotion
                        ? { strokeOpacity: v.clusterStrokeOpacity }
                        : {
                            strokeOpacity: isHovered
                              ? [v.clusterStrokeOpacity * 0.95, Math.min(1, v.clusterStrokeOpacity + 0.24), v.clusterStrokeOpacity * 0.95]
                              : [v.clusterStrokeOpacity * 0.75, v.clusterStrokeOpacity, v.clusterStrokeOpacity * 0.75],
                          }
                    }
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: ci * 0.1 }}
                  />
                  {cl.nodes.map((n, ni) => {
                    const isBusinessInnovated = tier === "business" && ci === 0;
                    const isBusinessOptimized = tier === "business" && ci === 1;
                    const isBusinessRefined = tier === "business" && ci === 2;
                    const nodeW = isBusinessOptimized ? 8.4 : isBusinessRefined ? 8.2 : 8.2;
                    const nodeH = isBusinessOptimized ? 8.4 : isBusinessRefined ? 5 : 8.2;
                    const nx = cl.x + n.ox - nodeW / 2;
                    const ny = cl.y + n.oy - nodeH / 2;
                    const baseOp = isHovered ? v.nodeHoverOpacity : v.nodeIdleOpacity;
                    const hoverRaise = isHovered ? (isBusinessInnovated ? 2.1 : 1.4) : 0.6;
                    return (
                      <motion.rect
                        key={`${tier}-${ci}-${ni}`}
                        x={nx}
                        y={ny}
                        width={nodeW}
                        height={nodeH}
                        rx={nodeRx}
                        fill={accent}
                        pointerEvents="none"
                        fillOpacity={baseOp}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth={tier === "business" ? 0.45 : 0.4}
                        initial={false}
                        animate={
                          reducedMotion
                            ? {}
                            : isBusinessInnovated && isHovered
                              ? {
                                  y: [ny + 3, ny - 2, ny],
                                  x: [nx - 2.8, nx + 1.2, nx],
                                  fillOpacity: [0.18, 0.96, baseOp],
                                  strokeWidth: [0.1, 0.95, 0.45],
                                }
                              : isBusinessOptimized && isHovered
                                ? {
                                    y: [ny, ny - hoverRaise, ny],
                                    width: [11.8, 7.0, nodeW],
                                    height: [6.0, 10.8, nodeH],
                                    fillOpacity: [baseOp * 0.9, Math.min(1, baseOp * 1.2), baseOp],
                                    strokeWidth: [0.42, 0.82, 0.42],
                                  }
                                : isBusinessRefined && isHovered
                                  ? {
                                      y: [ny, ny - hoverRaise, ny],
                                      width: [10.2, 7.6, nodeW],
                                      height: [6.2, 4.2, nodeH],
                                      fillOpacity: [baseOp * 0.88, Math.min(1, baseOp * 1.14), baseOp],
                                      strokeWidth: [0.42, 0.7, 0.42],
                                    }
                                  : {
                                      y: [ny, ny - hoverRaise, ny],
                                      fillOpacity: [
                                        baseOp * (isHovered ? 0.95 : 0.82),
                                        Math.min(1, baseOp * (isHovered ? 1.28 : 1.04)),
                                        baseOp * (isHovered ? 0.95 : 0.82),
                                      ],
                                      strokeWidth: isHovered ? [0.42, 0.82, 0.42] : [0.35, 0.46, 0.35],
                                    }
                        }
                        transition={{
                          duration: (isHovered ? 1.3 : 2.2) + (ni % 3) * 0.28,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: ni * 0.08,
                        }}
                      />
                    );
                  })}
                </g>
              ))}
            </g>
          );
        })}

        {/* Central revenue outcome — aggregated system output */}
        <g pointerEvents="none">
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`outcome-ring-${i}`}
              cx={HUB.cx}
              cy={HUB.cy}
              r={HUB.r + 4}
              fill="none"
              stroke={accent}
              strokeWidth={0.5}
              strokeLinecap="round"
              initial={false}
              animate={
                reducedMotion
                  ? { r: HUB.r + 14, opacity: 0.07 }
                  : {
                      r: [HUB.r + 4, HUB.r + 40],
                      opacity: [0.2, 0],
                    }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 2.85,
                      repeat: Infinity,
                      ease: [0.2, 0.8, 0.2, 1],
                      delay: i * 0.95,
                    }
              }
            />
          ))}
          <motion.circle
            cx={HUB.cx}
            cy={HUB.cy}
            r={HUB.r + 8}
            fill="url(#revenue-core-glow)"
            initial={false}
            animate={
              reducedMotion
                ? { opacity: 0.34 }
                : { opacity: [0.18, 0.46, 0.18], r: [HUB.r + 7, HUB.r + 10, HUB.r + 7] }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx={HUB.cx}
            cy={HUB.cy}
            r={HUB.r}
            fill="rgba(12,11,10,0.96)"
            stroke={accent}
            strokeWidth={1.2}
            initial={false}
            animate={
              reducedMotion
                ? { strokeOpacity: 0.52 }
                : {
                    strokeOpacity: [0.42, 0.72, 0.42],
                    strokeWidth: [1.05, 1.35, 1.05],
                  }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.text
            x={HUB.cx}
            y={HUB.cy + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            initial={false}
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: [0.88, 1, 0.88] }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: "15px",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontWeight: 700,
            }}
          >
            50M+
          </motion.text>
          <text
            x={HUB.cx}
            y={HUB.cy + 21}
            textAnchor="middle"
            fill="rgba(34,211,199,0.55)"
            style={{
              fontSize: "5.5px",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Projected AOV Impact
          </text>
        </g>
      </svg>
    </div>
  );
}
