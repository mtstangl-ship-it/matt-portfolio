"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const accent = "#22d3c7";

type NodeKey = "intake" | "routing" | "resolution" | "optimization";

const nodeData: Record<
  NodeKey,
  { label: string; x: number; y: number; metrics: string[] }
> = {
  intake: {
    label: "Intake",
    x: 200,
    y: 50,
    metrics: ["Onboarding improvements", "Volume normalization"],
  },
  routing: {
    label: "Routing",
    x: 330,
    y: 140,
    metrics: ["Improved cross-team alignment", "Reduced handoffs"],
  },
  resolution: {
    label: "Resolution",
    x: 200,
    y: 230,
    metrics: ["31% MTTR reduction"],
  },
  optimization: {
    label: "Optimization",
    x: 70,
    y: 140,
    metrics: ["16k reduction in lockout cases QoQ"],
  },
};

const nodeOrder: NodeKey[] = ["intake", "routing", "resolution", "optimization"];

// Rounded loop through: Intake(top) → Routing(right) → Resolution(bottom) → Optimization(left)
const loopPath =
  "M 200 50 C 280 50, 330 90, 330 140 C 330 190, 280 230, 200 230 C 120 230, 70 190, 70 140 C 70 90, 120 50, 200 50 Z";

export function OperationsSystemViz() {
  const [hoveredNode, setHoveredNode] = useState<NodeKey | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-xl lg:h-full lg:max-w-none"
      style={{ aspectRatio: "400/280", minHeight: 260 }}
    >
      <svg
        viewBox="0 0 400 280"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Operations system — continuous flow loop"
      >
        {/* Loop connection path — faint */}
        <motion.path
          d={loopPath}
          fill="none"
          stroke={accent}
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeDasharray="8 12"
          initial={false}
          animate={
            reducedMotion
              ? { opacity: 0.15 }
              : {
                  opacity: [0.1, 0.22, 0.1],
                  strokeDashoffset: [0, -40, 0],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Flowing markers — discrete positions (avoids offset-path browser gaps) */}
        {!reducedMotion &&
          [
            { cx: 200, cy: 50, d: 0 },
            { cx: 330, cy: 140, d: 1.2 },
            { cx: 200, cy: 230, d: 2.4 },
          ].map((pt, i) => (
            <motion.circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r={2}
              fill={accent}
              initial={false}
              animate={{
                opacity: [0.25, 0.9, 0.25],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pt.d + i * 0.2,
              }}
            />
          ))}

        {/* Node circles and labels */}
        {nodeOrder.map((key) => {
          const node = nodeData[key];
          const isHovered = hoveredNode === key;
          return (
            <g key={key}>
              <motion.line
                x1={node.x}
                y1={node.y}
                x2={200}
                y2={140}
                stroke={accent}
                strokeWidth={0.5}
                strokeOpacity={isHovered ? 0.4 : 0.12}
                strokeDasharray="4 8"
                initial={false}
                animate={
                  reducedMotion
                    ? {}
                    : {
                        strokeDashoffset: [0, -24, 0],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={14}
                fill="rgba(12,11,10,0.85)"
                stroke={accent}
                strokeWidth={isHovered ? 1.5 : 0.8}
                strokeOpacity={isHovered ? 0.8 : 0.4}
                onMouseEnter={() => setHoveredNode(key)}
                onMouseLeave={() => setHoveredNode(null)}
                initial={false}
                animate={
                  reducedMotion
                    ? {}
                    : {
                        scale: [1, 1.05, 1],
                        strokeOpacity: isHovered ? 0.8 : [0.4, 0.6, 0.4],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="cursor-pointer"
              />
              <text
                x={node.x}
                y={
                  node.y < 100
                    ? node.y + 22
                    : node.y > 180
                      ? node.y - 22
                      : node.x > 250
                        ? node.y - 18
                        : node.y + 18
                }
                textAnchor="middle"
                className="font-body text-[0.5rem] font-semibold uppercase tracking-wider fill-dashboard-ink-light/90"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Center dot — flow convergence */}
        <motion.circle
          cx={200}
          cy={140}
          r={8}
          fill={accent}
          fillOpacity={0.3}
          stroke={accent}
          strokeWidth={0.5}
          strokeOpacity={0.5}
          initial={false}
          animate={
            reducedMotion
              ? {}
              : { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Hover overlay */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded border border-accent-signal/30 bg-dashboard-bg/95 px-3 py-2"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <p className="font-body text-[0.625rem] font-bold uppercase tracking-wider text-accent-signal">
              {nodeData[hoveredNode].label}
            </p>
            <ul className="mt-1 space-y-0.5">
              {nodeData[hoveredNode].metrics.map((m) => (
                <li
                  key={m}
                  className="font-mono text-[0.5625rem] text-dashboard-ink-light/90"
                >
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
