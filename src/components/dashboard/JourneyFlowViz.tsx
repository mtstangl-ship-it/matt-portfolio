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
        className="text-ink-400/60"
        strokeDasharray="4 3"
      />
      <motion.line
        x1={x}
        y1={34}
        x2={x + 15}
        y2={34}
        stroke="#2c5f6f"
        strokeWidth={0.8}
        strokeDasharray="4 3"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -14 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.9 }}
      />
      <motion.circle
        cx={x + 8}
        cy={34}
        r={2}
        fill="#2c5f6f"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
        style={{ filter: "drop-shadow(0 0 4px rgb(44 95 111 / 0.4))" }}
      />
    </>
  );
}

export function JourneyFlowViz() {
  return (
    <div className="relative h-28 w-full">
      <svg
        viewBox="0 0 240 70"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
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
                className="text-ink-600"
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
                className="text-accent/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                style={{
                  filter: "drop-shadow(0 0 6px rgb(44 95 111 / 0.15))",
                }}
              />
              <text
                x={x}
                y={37}
                textAnchor="middle"
                className="fill-ink-800 font-body text-[7px] font-semibold"
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
