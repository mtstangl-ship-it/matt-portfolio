"use client";

/**
 * Abstract “human presence” motif (vector, not stock).
 * Designed to feel premium: thin lines + low-opacity use.
 */
export function HumanPortraitMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`h-full w-full ${className}`.trim()}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Outer frame */}
      <circle
        cx="60"
        cy="60"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />

      {/* Head */}
      <path
        d="M60 35c-10 0-18 8.5-18 18.8 0 9.2 7 16.7 18 16.7s18-7.5 18-16.7C78 43.5 70 35 60 35z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Shoulders */}
      <path
        d="M30 100c6-18 18-28 30-28s24 10 30 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* “Signals” bridging human + system */}
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <path d="M60 53 L 60 70" />
        <path d="M47 58 C 52 62, 56 66, 60 70" opacity="0.6" />
        <path d="M73 58 C 68 62, 64 66, 60 70" opacity="0.6" />
        <path d="M38 88 L 52 78" opacity="0.55" />
        <path d="M82 88 L 68 78" opacity="0.55" />
      </g>
    </svg>
  );
}

