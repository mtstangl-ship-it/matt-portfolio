"use client";

/**
 * Premium, subtle “fragmented signals → orchestrated flow” background.
 * Kept intentionally low-opacity so hero text stays readable.
 */
export function HeroAtmosphereBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 420"
        className="h-full w-full text-accent-signal/80"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient
            id="pulseGlow"
            cx="20%"
            cy="25%"
            r="55%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="45%" stopColor="currentColor" stopOpacity="0.16" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="pulseGlow2"
            cx="80%"
            cy="60%"
            r="50%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glows */}
        <rect x="0" y="0" width="1200" height="420" fill="url(#pulseGlow)" opacity="0.7" />
        <rect x="0" y="0" width="1200" height="420" fill="url(#pulseGlow2)" opacity="0.6" />

        {/* Fragmented signal field (left/middle) */}
        <g opacity="0.45">
          <path
            d="M120 170 C 210 90, 300 110, 360 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="8 12"
            className="animate-signal-flow"
            style={{ animationDuration: "2s" }}
          />
          <path
            d="M160 260 C 240 220, 310 235, 410 280"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="7 14"
            style={{ animationDelay: "0.55s", animationDuration: "2s" }}
            className="animate-signal-flow"
          />
          <path
            d="M310 120 L 420 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="5 12"
            style={{ animationDelay: "1.05s", animationDuration: "2.1s" }}
            className="animate-signal-flow"
          />
        </g>

        {/* Topology lines (dim + precise) */}
        <g opacity="0.22" stroke="currentColor" fill="none" strokeWidth="1">
          <path d="M80 310 L 220 260 L 360 300 L 520 240 L 690 275 L 840 220 L 1030 255" />
          <path d="M120 110 L 260 145 L 430 125 L 580 150 L 760 135 L 920 160 L 1100 140" />
        </g>

        {/* Nodes (glowing pulses) */}
        <g opacity="0.78">
          <circle cx="150" cy="200" r="5.2" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0s", animationDuration: "1.9s", filter: "drop-shadow(0 0 10px rgba(34, 211, 199, 0.35))" }} />
          <circle cx="225" cy="132" r="3.9" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.28s", animationDuration: "1.8s" }} />
          <circle cx="320" cy="165" r="3.4" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.62s", animationDuration: "1.8s" }} />
          <circle cx="260" cy="260" r="3.9" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.18s", animationDuration: "1.8s" }} />
          <circle cx="395" cy="290" r="3.4" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.5s", animationDuration: "1.9s" }} />
          <circle cx="520" cy="240" r="4.3" fill="currentColor" className="animate-node-pulse" style={{ animationDelay: "0.82s", animationDuration: "1.95s" }} />
        </g>

        {/* Orchestrated flow paths into the center (stronger + still restrained) */}
        <g opacity="0.85">
          <path
            d="M410 260 C 520 140, 660 140, 770 220 C 860 285, 960 275, 1060 230"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeDasharray="12 16"
            className="animate-signal-flow"
            style={{ animationDuration: "1.9s" }}
          />
          <path
            d="M410 260 C 520 140, 660 140, 770 220 C 860 285, 960 275, 1060 230"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="9 18"
            style={{ opacity: 0.85, animationDuration: "2.05s" }}
            className="animate-signal-flow"
          />
          <circle cx="520" cy="190" r="5.6" fill="currentColor" opacity="0.6" className="animate-node-pulse" style={{ animationDelay: "0.22s", animationDuration: "1.8s" }} />
          <circle cx="690" cy="195" r="4.2" fill="currentColor" opacity="0.48" className="animate-node-pulse" style={{ animationDelay: "0.48s", animationDuration: "1.85s" }} />
          <circle cx="900" cy="260" r="4.5" fill="currentColor" opacity="0.55" className="animate-node-pulse" style={{ animationDelay: "0.78s", animationDuration: "2s" }} />
        </g>
      </svg>

      {/* Slight editorial vignette to keep focus on content */}
      <div className="absolute inset-0 bg-gradient-to-r from-dashboard-bg/80 via-dashboard-bg/25 to-dashboard-bg/70" />
    </div>
  );
}

