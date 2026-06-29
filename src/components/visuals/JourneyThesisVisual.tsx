"use client";

/**
 * Visual storytelling: "Experience isn't one moment. It's the whole journey."
 * Layered transformation rail: fragmented touchpoints → unified flow.
 */
export function JourneyThesisVisual({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 140"
      className={`w-full ${className}`.trim()}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="railGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
          <stop offset="25%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="75%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="railStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Layer 1: Fragmented touchpoints (left) */}
      <g className="text-ink-400" stroke="currentColor" fill="none" strokeWidth="0.8">
        <circle cx="40" cy="35" r="6" strokeOpacity="0.5" fill="currentColor" fillOpacity="0.03" />
        <circle cx="60" cy="55" r="5" strokeOpacity="0.45" />
        <circle cx="45" cy="80" r="5" strokeOpacity="0.4" />
        <circle cx="75" cy="65" r="4" strokeOpacity="0.35" />
        <circle cx="70" cy="95" r="4" strokeOpacity="0.3" />
        <line x1="40" y1="35" x2="60" y2="55" strokeOpacity="0.2" strokeDasharray="2 2" />
        <line x1="60" y1="55" x2="45" y2="80" strokeOpacity="0.15" strokeDasharray="2 2" />
      </g>

      {/* Transformation rail (center spine) */}
      <path
        d="M100 70 Q200 35, 300 70 L360 70"
        fill="none"
        stroke="url(#railStroke)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M100 70 Q200 35, 300 70 L360 70"
        fill="none"
        stroke="url(#railGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rail nodes along journey */}
      <circle cx="120" cy="58" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" className="text-accent" />
      <circle cx="200" cy="38" r="5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" className="text-accent" />
      <circle cx="280" cy="58" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" className="text-accent" />
      <circle cx="360" cy="70" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" className="text-accent" />

      {/* Layer 2: Unified flow (right) – connected system */}
      <g className="text-accent" stroke="currentColor" fill="none" strokeWidth="0.9">
        <path d="M300 70 L320 45 L355 50" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M300 70 L320 95 L355 90" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="320" cy="45" r="3" fill="currentColor" fillOpacity="0.2" strokeOpacity="0.6" />
        <circle cx="320" cy="95" r="3" fill="currentColor" fillOpacity="0.2" strokeOpacity="0.6" />
        <circle cx="355" cy="50" r="2.5" fill="currentColor" fillOpacity="0.15" strokeOpacity="0.5" />
        <circle cx="355" cy="90" r="2.5" fill="currentColor" fillOpacity="0.15" strokeOpacity="0.5" />
      </g>
    </svg>
  );
}
