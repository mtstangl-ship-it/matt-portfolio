"use client";

import { motion } from "framer-motion";

export function SignalMiniViz({
  variant,
  isHovered = false,
}: {
  variant: "autodesk" | "wipro" | "ey";
  isHovered?: boolean;
}) {
  const ambientPulse = isHovered
    ? {
        opacity: [0.25, 1, 0.25],
        scale: [0.98, 1.25, 0.98],
        duration: 1.05,
        glow: "drop-shadow(0 0 14px rgb(34 211 199 / 0.65))",
      }
    : {
        opacity: [0.18, 0.6, 0.18],
        scale: [0.98, 1.06, 0.98],
        duration: 2.45,
        glow: "drop-shadow(0 0 8px rgb(34 211 199 / 0.35))",
      };

  // No new labels: purely ornamental “instrumentation” shapes.
  if (variant === "autodesk") {
    return (
      <svg
        viewBox="0 0 220 70"
        className="h-14 w-full text-accent-signal/70"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          {/* Cool “dotted sweep”: animate dash offset (not blinking dots). */}
          <motion.path
            d="M10 50 C 50 30, 90 40, 120 26 S 170 20, 210 26"
            strokeWidth="1.2"
            strokeDasharray="8 10"
            initial={{ strokeDashoffset: 0, opacity: 0.75 }}
            animate={{
              strokeDashoffset: isHovered ? -44 : -22,
              opacity: isHovered ? 1 : 0.72,
            }}
            transition={{
              duration: isHovered ? 1.55 : 3.25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ filter: ambientPulse.glow }}
          />
          <motion.path
            d="M10 58 C 60 46, 92 52, 125 42 S 175 38, 210 42"
            strokeWidth="0.8"
            strokeDasharray="6 14"
            initial={{ strokeDashoffset: 0, opacity: 0.35 }}
            animate={{
              strokeDashoffset: isHovered ? -34 : -18,
              opacity: isHovered ? 0.65 : 0.38,
            }}
            transition={{
              duration: isHovered ? 2.0 : 3.75,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </g>

        {/* Dots: keep them stable (no blinking in lower card area). */}
        <g opacity="0.34">
          {[14, 60, 98, 138, 180].map((x, i) => (
            <circle key={x} cx={x} cy={45 + (i % 2) * 6} r="3" fill="currentColor" />
          ))}
        </g>

        {/* Single steady beacon near the mid arc. */}
        <circle
          cx="40"
          cy="46"
          r="2.6"
          fill="currentColor"
          opacity={0.55}
          style={{ filter: ambientPulse.glow }}
        />
      </svg>
    );
  }

  if (variant === "wipro") {
    return (
      <svg
        viewBox="0 0 220 70"
        className="h-14 w-full text-accent-signal/70"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${20 + i * 34} ${20} C ${70 + i * 16} ${52}, 120 ${18 + i * 2}, 200 36`}
              strokeWidth={i === 1 ? 1.2 : 0.8}
              strokeDasharray={i === 1 ? "10 12" : "6 14"}
              opacity={i === 1 ? 0.95 : 0.55}
            />
          ))}
        </g>
        <g opacity="0.4" fill="currentColor">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={30 + i * 34} y={26 + (i % 2) * 6} width="18" height={18 - (i % 2) * 4} rx="4" />
          ))}
        </g>
        <motion.circle
          cx="150"
          cy="36"
          r="3"
          fill="currentColor"
          initial={{ opacity: 0.15, scale: 0.92 }}
          animate={{ opacity: ambientPulse.opacity, scale: ambientPulse.scale }}
          transition={{
            duration: ambientPulse.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: ambientPulse.glow }}
        />
        <motion.circle
          cx="118"
          cy="44"
          r="2.4"
          fill="currentColor"
          initial={{ opacity: 0.1, scale: 0.9 }}
          animate={
            isHovered
              ? {
                  opacity: [0.16, 0.9, 0.16],
                  scale: [0.98, 1.22, 0.98],
                  // Vector-ish motion: up/down with a slight diagonal drift.
                  cy: [47, 41, 47],
                  cx: [116, 120, 116],
                }
              : {
                  opacity: [0.14, 0.55, 0.14],
                  scale: [0.98, 1.06, 0.98],
                  cx: 118,
                  cy: 44,
                }
          }
          transition={
            isHovered
              ? {
                  duration: 1.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {
                  duration: 0,
                }
          }
          style={{ filter: isHovered ? "drop-shadow(0 0 12px rgb(34 211 199 / 0.7))" : ambientPulse.glow }}
        />
      </svg>
    );
  }

  if (variant === "ey") {
    // For the EY card, keep this mini instrumentation extremely restrained:
    // the “slider dot + word bumps” already live in `OrchestrationTimelineViz`.
    // This removes the secondary dashed “bar” feel under the dot line.
    return (
      <svg
        viewBox="0 0 220 70"
        className="h-14 w-full text-accent-signal/60"
        aria-hidden
      >
        <circle
          cx="180"
          cy="42"
          r="3"
          fill="currentColor"
          opacity={isHovered ? 0.6 : 0.22}
          className="transition-opacity duration-300"
          style={{ filter: "drop-shadow(0 0 14px rgb(34 211 199 / 0.5))" }}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 220 70"
      className="h-14 w-full text-accent-signal/70"
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M10 50 L 210 50" strokeWidth="1" strokeDasharray="6 10" opacity="0.55" />
        <path d="M10 42 L 210 42" strokeWidth="1.2" strokeDasharray="10 14" opacity="0.9" />
      </g>
      {/* Removed bar row to prevent anything looking like “bars under the dot line”. */}
      <motion.circle
        cx="180"
        cy="42"
        r="2.8"
        fill="currentColor"
        initial={{ opacity: 0.1, scale: 0.95 }}
        animate={
          isHovered
            ? {
                opacity: ambientPulse.opacity,
                scale: ambientPulse.scale,
                // Slow left-to-right slider feel.
                cx: [168, 198],
              }
            : {
                opacity: ambientPulse.opacity,
                scale: ambientPulse.scale,
                cx: 180,
              }
        }
        transition={{
          duration: isHovered ? 2.9 : ambientPulse.duration,
          repeat: Infinity,
          ease: isHovered ? "linear" : "easeInOut",
        }}
        style={{ filter: isHovered ? "drop-shadow(0 0 14px rgb(34 211 199 / 0.7))" : ambientPulse.glow }}
      />
      <motion.circle
        cx="142"
        cy="34"
        r="2.1"
        fill="currentColor"
        initial={{ opacity: 0.08, scale: 0.92 }}
        animate={{
          opacity: isHovered ? [0.15, 0.78, 0.15] : [0.12, 0.45, 0.12],
          scale: isHovered ? [0.95, 1.12, 0.95] : [0.98, 1.06, 0.98],
        }}
        transition={{
          duration: isHovered ? 1.35 : 2.75,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ filter: ambientPulse.glow }}
      />
    </svg>
  );
}

