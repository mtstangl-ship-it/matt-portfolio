"use client";

export function CaseStudyMotif({ variant = "journey" }: { variant?: "journey" | "converge" | "flow" | "default" }) {
  if (variant === "journey") {
    return (
      <svg viewBox="0 0 64 48" className="w-full h-full text-accent/40" aria-hidden preserveAspectRatio="xMidYMid meet">
        <path d="M8 24h12l4-8 4 16 4-8h12" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "converge") {
    return (
      <svg viewBox="0 0 64 48" className="w-full h-full text-accent/40" aria-hidden preserveAspectRatio="xMidYMid meet">
        <line x1="8" y1="12" x2="32" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="8" y1="36" x2="32" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="56" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="32" cy="24" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (variant === "flow") {
    return (
      <svg viewBox="0 0 64 48" className="w-full h-full text-accent/40" aria-hidden preserveAspectRatio="xMidYMid meet">
        <path d="M12 24h8M24 24h8M36 24h8M44 24h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
        <circle cx="20" cy="24" r="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="32" cy="24" r="2" fill="currentColor" fillOpacity="0.5" />
        <circle cx="44" cy="24" r="2" fill="currentColor" fillOpacity="0.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 48" className="w-full h-full text-accent/40" aria-hidden preserveAspectRatio="xMidYMid meet">
      <rect x="8" y="8" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.5" />
      <rect x="42" y="8" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.5" />
      <path d="M22 15h20M32 15v18M22 33h20" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );
}
