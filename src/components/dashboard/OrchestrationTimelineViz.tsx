"use client";

import { motion } from "framer-motion";

// Georgia outline (from GeoJSON) with metro nodes radiating like radar
// Metros: Atlanta, Athens, Savannah (Say YES Summer footprint)

// Georgia from US Census GeoJSON, equal x/y scale to preserve proportions
const georgiaPath =
  "M94.5 15 L87.7 21.8 L87.2 25.2 L97.8 32.1 L101.1 31.5 L106 38.6 L107 42.3 L112.1 49 L119.4 53 L123.5 59 L132.1 64.5 L131.7 68.2 L137.3 74.2 L145.8 79.1 L147.9 84.4 L148.3 91.3 L152.6 93.6 L157.7 102.2 L157.8 107.7 L165.1 110.5 L157.3 121.4 L155.9 127.1 L152.6 132 L152.3 137.1 L148.8 139.4 L147.4 153.2 L138.7 151.9 L131.4 149.3 L128.4 151.7 L129.6 157.7 L128.2 164.3 L124.4 164.4 L122.8 157.6 L82.1 155.1 L38.6 153 L34.3 143.6 L30.8 134.8 L33 126.4 L29.9 116.7 L32.7 111.2 L32.5 107.2 L37.9 103.1 L34.3 101.2 L35.6 98 L32.2 92.9 L28.5 83.9 L20.7 43.2 L15.1 15.5 L56 15.3 L78.3 15.5 L94.5 15 Z";

const metros = [
  { x: 53, y: 57, name: "Atlanta" },
  { x: 88, y: 48, name: "Athens" },
  { x: 158, y: 108, name: "Savannah" },
];

const accentFill = "#22d3c7";
const ease = [0.25, 0.46, 0.45, 0.94] as const;
const ringsPerMetro = 2;
const cycleDuration = 3;

export function OrchestrationTimelineViz({ isHovered = false }: { isHovered?: boolean } = {}) {
  return (
    <div className="relative flex h-32 w-full items-center justify-center">
      <svg
        viewBox="0 0 200 190"
        className="mx-auto h-full max-h-[132px] w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 1 — Landmass fill (below radar) */}
        <path d={georgiaPath} fill="currentColor" className="text-dashboard-ink-muted/15" />

        {/* 2 — Radar ripples (must paint above fill so rings aren't covered) */}
        {metros.map((metro, mi) =>
          Array.from({ length: ringsPerMetro }).map((_, ri) => (
            <motion.circle
              key={`${mi}-${ri}`}
              cx={metro.x}
              cy={metro.y}
              r={12 + ri * 14}
              fill="none"
              stroke={accentFill}
              strokeWidth={1}
              initial={false}
              animate={
                isHovered
                  ? {
                      r: [12 + ri * 14, 28 + ri * 16, 28 + ri * 16, 12 + ri * 14],
                      opacity: [0.45, 0.22, 0.06, 0.45],
                      strokeWidth: [1.2, 0.65, 0.45, 1.2],
                    }
                  : {
                      r: 12 + ri * 14,
                      opacity: 0.18,
                      strokeWidth: 0.8,
                    }
              }
              transition={
                isHovered
                  ? {
                      duration: cycleDuration,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeOut",
                      delay: mi * 0.55 + ri * 0.4,
                    }
                  : { duration: 0.3 }
              }
            />
          ))
        )}

        {/* 3 — State outline stroke */}
        <path
          d={georgiaPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="text-accent-signal"
          opacity={isHovered ? 0.85 : 0.55}
        />

        {/* 4 — Metro pins on top */}
        {metros.map((metro) => (
          <motion.circle
            key={metro.name}
            cx={metro.x}
            cy={metro.y}
            r={3}
            fill="currentColor"
            className="text-accent-signal"
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0.75,
              scale: isHovered ? 1.15 : 1,
              transition: { duration: 0.3, ease },
            }}
            style={{
              filter: isHovered ? "drop-shadow(0 0 5px rgb(34 211 199 / 0.5))" : undefined,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
