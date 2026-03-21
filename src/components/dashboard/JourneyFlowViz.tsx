"use client";

import { motion } from "framer-motion";

const nodes = ["Onboard", "Adopt", "Support", "Renew"];
const lineLen = 55;

function ConnectorLine({ index }: { index: number }) {
  const x = 30 + index * lineLen + 20;
  return (
    <>
      <line
        x1={x}
        y1={34}
        x2={x + 15}
        y2={34}
        stroke="currentColor"
        strokeWidth={0.6}
        className="text-dashboard-ink-muted/50"
        strokeDasharray="4 3"
      />
      <motion.line
        x1={x}
        y1={34}
        x2={x + 15}
        y2={34}
        stroke="currentColor"
        strokeWidth={0.8}
        strokeDasharray="4 3"
        className="text-accent-signal"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -14 }}
        transition={{ duration: 1.85, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.9 }}
      />
      <circle
        cx={x + 8}
        cy={34}
        r={1.8}
        fill="currentColor"
        className="text-accent-signal"
        opacity={0.7}
      />
    </>
  );
}

export function JourneyFlowViz() {
  return (
    <div className="relative h-32 w-full">
      <svg
        viewBox="0 0 240 70"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Faint topology scaffolding (no extra labels) */}
        <g opacity="0.22" fill="none" stroke="currentColor" strokeWidth="1">
          <path
            d="M8 28 C 52 10, 86 18, 122 26 S 182 44, 232 34"
            strokeDasharray="6 12"
            className="text-dashboard-ink-muted/40"
          />
          <path
            d="M12 56 C 56 42, 92 50, 130 44 S 188 34, 228 46"
            strokeDasharray="10 14"
            className="text-accent-signal/30"
          />
        </g>
        {nodes.map((label, i) => {
          const x = 30 + i * lineLen;
          return (
            <g key={label}>
              <motion.rect
                x={x - 20}
                y={22}
                width={40}
                height={24}
                rx={3}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                className="text-dashboard-ink-muted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              />
              <motion.rect
                x={x - 20}
                y={22}
                width={40}
                height={24}
                rx={3}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.5}
                className="text-accent-signal/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 + i * 0.08, duration: 0.55 }}
                style={{
                  filter: "drop-shadow(0 0 10px rgb(34 211 199 / 0.3))",
                }}
              />
              <text
                x={x}
                y={37}
                textAnchor="middle"
                className="fill-dashboard-ink-light font-body text-[7px] font-semibold"
              >
                {label}
              </text>
              {i < nodes.length - 1 && <ConnectorLine index={i} />}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
