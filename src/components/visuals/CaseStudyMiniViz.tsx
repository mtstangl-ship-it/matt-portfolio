"use client";

export function CaseStudyMiniViz({
  motif,
  className = "",
}: {
  motif: "journey" | "converge" | "flow" | "default";
  className?: string;
}) {
  if (motif === "converge") {
    return (
      <svg
        viewBox="0 0 120 70"
        className={`h-full w-full ${className}`.trim()}
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M20 55 L 60 35 L 100 55" strokeWidth="1.2" opacity="0.75" />
          <path d="M30 55 L 60 45 L 90 55" strokeWidth="0.9" opacity="0.55" />
          <line x1="60" y1="10" x2="60" y2="35" strokeWidth="1" opacity="0.85" strokeDasharray="6 6" />
          <circle cx="60" cy="10" r="3" fill="currentColor" opacity="0.55" />
          <circle cx="60" cy="35" r="2.5" fill="currentColor" opacity="0.35" />
        </g>
        <g opacity="0.3" fill="currentColor">
          <rect x="28" y="40" width="10" height="20" rx="3" />
          <rect x="40" y="34" width="10" height="26" rx="3" />
          <rect x="52" y="30" width="10" height="30" rx="3" />
          <rect x="64" y="34" width="10" height="26" rx="3" />
          <rect x="76" y="40" width="10" height="20" rx="3" />
        </g>
      </svg>
    );
  }

  if (motif === "flow") {
    return (
      <svg
        viewBox="0 0 120 70"
        className={`h-full w-full ${className}`.trim()}
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" opacity="0.75">
          <path d="M18 46 C 30 30, 44 30, 56 46 S 82 62, 102 42" strokeDasharray="10 16" className="animate-signal-flow" />
        </g>
        <g fill="currentColor" opacity="0.45">
          <circle cx="18" cy="46" r="3" />
          <circle cx="56" cy="46" r="2.5" />
          <circle cx="102" cy="42" r="2.7" />
        </g>
        <g fill="none" stroke="currentColor" opacity="0.35" strokeWidth="0.9">
          <path d="M28 56 L 46 52 L 62 56 L 84 52" />
        </g>
      </svg>
    );
  }

  if (motif === "journey") {
    return (
      <svg
        viewBox="0 0 120 70"
        className={`h-full w-full ${className}`.trim()}
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M18 46 H 56" strokeWidth="1.2" opacity="0.75" strokeDasharray="6 8" className="animate-signal-flow" />
          <path d="M56 46 C 62 30, 74 30, 82 40 S 100 56, 104 44" strokeWidth="1.2" opacity="0.85" />
          <circle cx="18" cy="46" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="56" cy="46" r="2.6" fill="currentColor" opacity="0.35" />
          <circle cx="82" cy="40" r="2.8" fill="currentColor" opacity="0.42" />
        </g>
        <g opacity="0.3" fill="currentColor">
          <rect x="26" y="28" width="10" height="12" rx="3" />
          <rect x="46" y="22" width="12" height="18" rx="3" />
          <rect x="70" y="24" width="14" height="16" rx="3" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 120 70"
      className={`h-full w-full ${className}`.trim()}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" opacity="0.7">
        <path d="M18 50 C 32 34, 50 34, 64 44 S 92 60, 104 36" strokeDasharray="10 18" className="animate-signal-flow" />
      </g>
      <g fill="currentColor" opacity="0.35">
        <circle cx="18" cy="50" r="3" />
        <circle cx="64" cy="44" r="2.6" />
        <circle cx="104" cy="36" r="2.8" />
      </g>
      <g opacity="0.28" fill="currentColor">
        <rect x="26" y="40" width="12" height="18" rx="3" />
        <rect x="44" y="34" width="12" height="24" rx="3" />
        <rect x="62" y="30" width="12" height="28" rx="3" />
        <rect x="80" y="34" width="12" height="24" rx="3" />
      </g>
    </svg>
  );
}

