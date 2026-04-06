"use client";

const iconClass = "stroke-current stroke-[1.5] fill-none";
const viewBox = "0 0 24 24";
/** Intrinsic size if Tailwind/CSS fails to load (e.g. embedded browsers) — classes still scale when CSS applies. */
const svgSize = { width: 24, height: 24 } as const;

export function JourneyArchitectureIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={viewBox} {...svgSize} className={`${iconClass} ${className}`.trim()} aria-hidden>
      <path d="M4 12h16M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" strokeWidth={1.5} />
    </svg>
  );
}

export function ServiceModernizationIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={viewBox} {...svgSize} className={`${iconClass} ${className}`.trim()} aria-hidden>
      <path d="M12 2v4M12 18v4M4 12H2M22 12h-2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OperatingModelIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={viewBox} {...svgSize} className={`${iconClass} ${className}`.trim()} aria-hidden>
      <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth={1.5} />
      <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth={1.5} />
      <rect x="4" y="14" width="6" height="6" rx="1" strokeWidth={1.5} />
      <rect x="14" y="14" width="6" height="6" rx="1" strokeWidth={1.5} />
      <path d="M10 7h4M10 17h4M7 10v4M17 10v4" strokeLinecap="round" strokeWidth={1} opacity={0.6} />
    </svg>
  );
}

export function WorkflowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={viewBox} {...svgSize} className={`${iconClass} ${className}`.trim()} aria-hidden>
      <path d="M4 12h4l2-4 2 8 2-4h4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AutomationIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={viewBox} {...svgSize} className={`${iconClass} ${className}`.trim()} aria-hidden>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinejoin="round" />
      <circle cx="12" cy="18" r="2.5" strokeWidth={1.5} />
    </svg>
  );
}

export function SignalIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={viewBox} {...svgSize} className={`${iconClass} ${className}`.trim()} aria-hidden>
      <path d="M4 14v-4M8 16V8M12 18V6M16 16V8M20 14v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AlignmentIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={viewBox} {...svgSize} className={`${iconClass} ${className}`.trim()} aria-hidden>
      <circle cx="6" cy="8" r="2.5" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="2.5" strokeWidth={1.5} />
      <circle cx="18" cy="16" r="2.5" strokeWidth={1.5} />
      <path d="M8.5 8.5l2.5 2.5 2.5-2.5M11 11l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} opacity={0.8} />
    </svg>
  );
}

export function TransformationIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={viewBox} {...svgSize} className={`${iconClass} ${className}`.trim()} aria-hidden>
      <path d="M4 12h16M12 4l4 4-4 4M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
