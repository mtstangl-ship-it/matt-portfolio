"use client";

export function JourneyFlowMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={`w-full ${className}`.trim()} aria-hidden preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="journeyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M20 40 Q50 20, 80 40 T140 40 L180 40"
        fill="none"
        stroke="url(#journeyGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="40" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="80" cy="40" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
      <circle cx="140" cy="40" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
      <circle cx="180" cy="40" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  );
}
