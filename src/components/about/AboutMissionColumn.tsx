import type { ReactNode } from "react";
import { aboutPage } from "@/content/about";

/* ============================================================================
 * AboutMissionColumn
 *
 * Vertical mission diagram: IGNITION → Stage I Booster (Discover/Define) →
 * Staging coupling → Stage II Orbit insertion (Develop/Deliver) → Payload
 * deploy. A celestial cast lives in the margins, Hubble, planets, astronaut,
 * constellations, mission patch, launching rocket, all line-art, low-opacity.
 * Phase headers and pillars carry inline mission icons so every move in the
 * diamond is pinned to something you can see.
 * ========================================================================== */

/* ----------------------------------------------------------------------------
 * Inline icons, ~18–22px, same stroke vocabulary as the column outlines.
 * All use currentColor so text color drives them.
 * ------------------------------------------------------------------------- */

const iconCls = "inline-block h-[18px] w-auto shrink-0 text-accent-signal/85";
const iconSmClass = "inline-block h-4 w-auto shrink-0 text-accent-signal/85";

/** Shared read width for diamond headers, chambers, and mission stack alignment. */
const DIAMOND_READ_WIDTH =
  "max-w-[min(42rem,calc(100vw-1.75rem))] sm:max-w-[44rem] lg:max-w-[min(46rem,calc(100vw-2.5rem))]";

function IconIgnition() {
  return (
    <svg viewBox="0 0 20 24" className={iconCls} aria-hidden>
      <path d="M7 3 L13 3 L14 11 L6 11 Z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <line x1="7.5" y1="13" x2="6.5" y2="22" stroke="currentColor" strokeWidth="0.9" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
      <line x1="10" y1="13" x2="10" y2="22" stroke="currentColor" strokeWidth="0.9" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
      <line x1="12.5" y1="13" x2="13.5" y2="22" stroke="currentColor" strokeWidth="0.9" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
      <line x1="3" y1="2" x2="5" y2="4" stroke="currentColor" strokeWidth="0.7" />
      <line x1="17" y1="2" x2="15" y2="4" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

function IconTelescope() {
  return (
    <svg viewBox="0 0 28 22" className={iconCls} style={{ height: "20px" }} aria-hidden>
      <path d="M4 6 L22 13" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M5 10 L23 17" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M4 6 L5 10 L23 17 L22 13 Z" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <circle cx="3.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <ellipse cx="23" cy="15" rx="2.2" ry="1.4" stroke="currentColor" strokeWidth="0.8" fill="none" transform="rotate(20 23 15)" />
      <line x1="13" y1="11" x2="9" y2="20" stroke="currentColor" strokeWidth="0.8" />
      <line x1="14" y1="11" x2="14" y2="21" stroke="currentColor" strokeWidth="0.8" />
      <line x1="15" y1="12" x2="19" y2="21" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function IconRipBrief() {
  return (
    <svg viewBox="0 0 22 24" className={iconCls} aria-hidden>
      <path d="M4 2 L14 2 L18 6 L18 22 L4 22 Z" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <path d="M14 2 L14 6 L18 6" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <path d="M6 8 L11 12 L8 15 L14 22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="miter" vectorEffect="non-scaling-stroke" />
      <polygon
        points="15.5,4.5 16.2,5.8 17.7,5.8 16.5,6.7 17,8.2 15.5,7.4 14,8.2 14.5,6.7 13.3,5.8 14.8,5.8"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
      <circle cx="17" cy="16" r="0.6" fill="currentColor" />
    </svg>
  );
}

function IconReticle() {
  return (
    <svg viewBox="0 0 22 22" className={iconCls} aria-hidden>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <line x1="11" y1="1" x2="11" y2="5" stroke="currentColor" strokeWidth="1" />
      <line x1="11" y1="17" x2="11" y2="21" stroke="currentColor" strokeWidth="1" />
      <line x1="1" y1="11" x2="5" y2="11" stroke="currentColor" strokeWidth="1" />
      <line x1="17" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconDock() {
  return (
    <svg viewBox="0 0 26 18" className={iconCls} style={{ height: "16px" }} aria-hidden>
      <rect x="2" y="5" width="9" height="8" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <rect x="15" y="5" width="9" height="8" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="11" y1="3" x2="11" y2="15" stroke="currentColor" strokeWidth="0.7" />
      <line x1="15" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="0.7" />
      <line x1="11" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1" />
      <circle cx="6.5" cy="9" r="1" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <circle cx="19.5" cy="9" r="1" stroke="currentColor" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function IconSatellite() {
  return (
    <svg viewBox="0 0 26 20" className={iconCls} aria-hidden>
      <rect x="11" y="7" width="6" height="7" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <rect x="1" y="8" width="9" height="5" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <rect x="17" y="8" width="8" height="5" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="3" y1="8" x2="3" y2="13" stroke="currentColor" strokeWidth="0.5" />
      <line x1="5.5" y1="8" x2="5.5" y2="13" stroke="currentColor" strokeWidth="0.5" />
      <line x1="8" y1="8" x2="8" y2="13" stroke="currentColor" strokeWidth="0.5" />
      <line x1="19.5" y1="8" x2="19.5" y2="13" stroke="currentColor" strokeWidth="0.5" />
      <line x1="22" y1="8" x2="22" y2="13" stroke="currentColor" strokeWidth="0.5" />
      <line x1="14" y1="7" x2="14" y2="3" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="14" cy="2.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function IconBurst() {
  return (
    <svg viewBox="0 0 22 22" className={iconCls} aria-hidden>
      <line x1="11" y1="1" x2="11" y2="5" stroke="currentColor" strokeWidth="1" />
      <line x1="11" y1="17" x2="11" y2="21" stroke="currentColor" strokeWidth="1" />
      <line x1="1" y1="11" x2="5" y2="11" stroke="currentColor" strokeWidth="1" />
      <line x1="17" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1" />
      <line x1="4" y1="4" x2="6.5" y2="6.5" stroke="currentColor" strokeWidth="0.9" />
      <line x1="15.5" y1="15.5" x2="18" y2="18" stroke="currentColor" strokeWidth="0.9" />
      <line x1="18" y1="4" x2="15.5" y2="6.5" stroke="currentColor" strokeWidth="0.9" />
      <line x1="6.5" y1="15.5" x2="4" y2="18" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function IconLander() {
  return (
    <svg viewBox="0 0 26 22" className={iconCls} aria-hidden>
      <path d="M8 4 L18 4 L21 11 L5 11 Z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx="13" cy="7.5" r="1.2" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <line x1="6" y1="11" x2="2" y2="20" stroke="currentColor" strokeWidth="0.9" />
      <line x1="10" y1="11" x2="9" y2="20" stroke="currentColor" strokeWidth="0.9" />
      <line x1="16" y1="11" x2="17" y2="20" stroke="currentColor" strokeWidth="0.9" />
      <line x1="20" y1="11" x2="24" y2="20" stroke="currentColor" strokeWidth="0.9" />
      <line x1="1" y1="20" x2="4" y2="20" stroke="currentColor" strokeWidth="0.9" />
      <line x1="7.5" y1="20" x2="10.5" y2="20" stroke="currentColor" strokeWidth="0.9" />
      <line x1="15.5" y1="20" x2="18.5" y2="20" stroke="currentColor" strokeWidth="0.9" />
      <line x1="22" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

function IconOrbit() {
  return (
    <svg viewBox="0 0 22 22" className={iconSmClass} aria-hidden>
      <path
        d="M17.5 11 A 6.5 6.5 0 1 1 11 4.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M13.5 2 L11 4.5 L13 8"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="11" cy="11" r="1.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

/* ----------------------------------------------------------------------------
 * Celestial scatter, margin-resident, line-art decoration.
 * ------------------------------------------------------------------------- */

function PlanetWithRing() {
  return (
    <svg width="78" height="78" viewBox="0 0 80 80" className="text-accent-signal/35" aria-hidden>
      <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <ellipse cx="40" cy="40" rx="34" ry="8" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(-18 40 40)" vectorEffect="non-scaling-stroke" />
      <path d="M24 42 Q40 39 56 42" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" />
    </svg>
  );
}

function PlanetWithMoons() {
  return (
    <svg width="94" height="94" viewBox="0 0 100 100" className="text-accent-signal/30" aria-hidden>
      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <path d="M32 47 Q50 43 68 47" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.75" />
      <path d="M32 55 Q50 59 68 55" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.75" />
      <circle cx="50" cy="50" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" transform="translate(-6 -8)" />
      <ellipse cx="50" cy="50" rx="38" ry="38" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" fill="none" opacity="0.45" />
      <circle cx="86" cy="42" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="14" cy="66" r="2" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <circle cx="70" cy="82" r="1.6" stroke="currentColor" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function Hubble() {
  return (
    <svg width="128" height="70" viewBox="0 0 140 78" className="text-accent-signal/30" aria-hidden>
      {/* Main body tube */}
      <rect x="18" y="28" width="78" height="26" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="22" y1="28" x2="22" y2="54" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="92" y1="28" x2="92" y2="54" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      {/* Aperture hood */}
      <rect x="96" y="22" width="14" height="38" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="110" y1="22" x2="110" y2="60" stroke="currentColor" strokeWidth="0.6" />
      {/* Aft cap */}
      <line x1="18" y1="32" x2="14" y2="34" stroke="currentColor" strokeWidth="0.6" />
      <line x1="18" y1="50" x2="14" y2="48" stroke="currentColor" strokeWidth="0.6" />
      {/* Solar panels, top */}
      <rect x="30" y="8" width="54" height="14" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="41" y1="8" x2="41" y2="22" stroke="currentColor" strokeWidth="0.5" />
      <line x1="52" y1="8" x2="52" y2="22" stroke="currentColor" strokeWidth="0.5" />
      <line x1="63" y1="8" x2="63" y2="22" stroke="currentColor" strokeWidth="0.5" />
      <line x1="74" y1="8" x2="74" y2="22" stroke="currentColor" strokeWidth="0.5" />
      <line x1="57" y1="22" x2="57" y2="28" stroke="currentColor" strokeWidth="0.7" />
      {/* Solar panels, bottom */}
      <rect x="30" y="60" width="54" height="14" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="41" y1="60" x2="41" y2="74" stroke="currentColor" strokeWidth="0.5" />
      <line x1="52" y1="60" x2="52" y2="74" stroke="currentColor" strokeWidth="0.5" />
      <line x1="63" y1="60" x2="63" y2="74" stroke="currentColor" strokeWidth="0.5" />
      <line x1="74" y1="60" x2="74" y2="74" stroke="currentColor" strokeWidth="0.5" />
      <line x1="57" y1="54" x2="57" y2="60" stroke="currentColor" strokeWidth="0.7" />
      {/* Antenna */}
      <circle cx="57" cy="41" r="3" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <line x1="57" y1="38" x2="57" y2="32" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

function Astronaut() {
  return (
    <svg width="60" height="86" viewBox="0 0 60 90" className="text-accent-signal/30" aria-hidden>
      <circle cx="30" cy="22" r="11" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <path d="M24 20 Q30 26 36 20" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <rect x="19" y="34" width="22" height="20" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <rect x="25" y="38" width="10" height="5" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <path d="M19 38 L9 48 L12 58" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <path d="M41 38 L51 48 L48 58" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <path d="M24 54 L22 76" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <path d="M36 54 L38 76" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <line x1="20" y1="76" x2="26" y2="76" stroke="currentColor" strokeWidth="0.9" />
      <line x1="35" y1="76" x2="41" y2="76" stroke="currentColor" strokeWidth="0.9" />
      <path d="M30 14 Q 18 6 6 8" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
    </svg>
  );
}

function MissionPatch() {
  return (
    <svg width="72" height="72" viewBox="0 0 80 80" className="text-accent-signal/30" aria-hidden>
      <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.25" fill="none" vectorEffect="non-scaling-stroke" />
      <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" fill="none" />
      <path d="M14 44 Q40 22 66 44" stroke="currentColor" strokeWidth="1" fill="none" />
      <polygon
        points="40,30 42.5,36 48.5,36 43.5,40 45.5,46.5 40,42.5 34.5,46.5 36.5,40 31.5,36 37.5,36"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
      <path d="M22 56 Q40 64 58 56" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
    </svg>
  );
}

function MiniRocket() {
  return (
    <svg width="42" height="100" viewBox="0 0 40 96" className="text-accent-signal/55" aria-hidden>
      <path d="M20 4 L26 22 L14 22 Z" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <rect x="14" y="22" width="12" height="36" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <circle cx="20" cy="32" r="2.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <path d="M14 50 L6 64 L14 58" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <path d="M26 50 L34 64 L26 58" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <path d="M14 58 L12 66 L28 66 L26 58" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <line x1="20" y1="68" x2="20" y2="92" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 3" />
      <line x1="15" y1="70" x2="13" y2="86" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
      <line x1="25" y1="70" x2="27" y2="86" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
    </svg>
  );
}

function Moon() {
  return (
    <svg width="58" height="58" viewBox="0 0 60 60" className="text-accent-signal/28" aria-hidden>
      <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <circle cx="22" cy="24" r="2.6" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="36" cy="34" r="1.8" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="30" cy="40" r="1.2" stroke="currentColor" strokeWidth="0.4" fill="none" />
      <circle cx="18" cy="36" r="1" stroke="currentColor" strokeWidth="0.4" fill="none" />
    </svg>
  );
}

function Constellation() {
  return (
    <svg width="150" height="90" viewBox="0 0 150 90" className="text-accent-signal/45" aria-hidden>
      <line x1="20" y1="30" x2="55" y2="14" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.45" />
      <line x1="55" y1="14" x2="90" y2="36" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.45" />
      <line x1="90" y1="36" x2="125" y2="58" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.45" />
      <line x1="90" y1="36" x2="75" y2="72" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.45" />
      <circle cx="20" cy="30" r="1.6" fill="currentColor" />
      <circle cx="55" cy="14" r="2" fill="currentColor" />
      <circle cx="90" cy="36" r="1.6" fill="currentColor" />
      <circle cx="125" cy="58" r="2" fill="currentColor" />
      <circle cx="75" cy="72" r="1.4" fill="currentColor" />
    </svg>
  );
}

const STARS: Array<{ left: string; top: string; size: number; opacity: number; twinkle: number }> = [
  { left: "6%", top: "5%", size: 2, opacity: 0.55, twinkle: 3.4 },
  { left: "12%", top: "18%", size: 1.5, opacity: 0.45, twinkle: 5.1 },
  { left: "4%", top: "44%", size: 2, opacity: 0.5, twinkle: 4.2 },
  { left: "16%", top: "66%", size: 1.5, opacity: 0.4, twinkle: 6.3 },
  { left: "8%", top: "82%", size: 2, opacity: 0.5, twinkle: 3.9 },
  { left: "14%", top: "92%", size: 1.3, opacity: 0.4, twinkle: 5.6 },
  { left: "86%", top: "4%", size: 2, opacity: 0.55, twinkle: 4.7 },
  { left: "94%", top: "16%", size: 1.5, opacity: 0.4, twinkle: 3.1 },
  { left: "82%", top: "28%", size: 2.5, opacity: 0.6, twinkle: 5.8 },
  { left: "92%", top: "48%", size: 1.5, opacity: 0.4, twinkle: 4.4 },
  { left: "84%", top: "76%", size: 2, opacity: 0.5, twinkle: 6.1 },
  { left: "96%", top: "88%", size: 1.5, opacity: 0.45, twinkle: 3.7 },
  { left: "50%", top: "2%", size: 1.5, opacity: 0.35, twinkle: 5.3 },
  { left: "40%", top: "98%", size: 1.3, opacity: 0.3, twinkle: 4.9 },
  { left: "25%", top: "37%", size: 1.2, opacity: 0.35, twinkle: 6.4 },
  { left: "72%", top: "62%", size: 1.2, opacity: 0.35, twinkle: 5.5 },
  { left: "65%", top: "9%", size: 1.1, opacity: 0.3, twinkle: 4.1 },
  { left: "30%", top: "72%", size: 1.1, opacity: 0.3, twinkle: 6.8 },
];

/**
 * Mission animations, all keyframes in one place.
 * Respects prefers-reduced-motion.
 */
const MISSION_KEYFRAMES = `
@keyframes mission-twinkle {
  0%, 100% { opacity: var(--tw-min, 0.3); }
  50% { opacity: var(--tw-max, 0.9); }
}
@keyframes mission-shoot-1 {
  0% { transform: translate3d(-15%, 6%, 0) rotate(22deg); opacity: 0; }
  3% { opacity: 1; }
  11% { opacity: 1; }
  14% { transform: translate3d(118%, 48%, 0) rotate(22deg); opacity: 0; }
  100% { transform: translate3d(-15%, 6%, 0) rotate(22deg); opacity: 0; }
}
@keyframes mission-shoot-2 {
  0% { transform: translate3d(118%, 4%, 0) rotate(155deg); opacity: 0; }
  3% { opacity: 1; }
  10% { opacity: 1; }
  13% { transform: translate3d(-15%, 42%, 0) rotate(155deg); opacity: 0; }
  100% { transform: translate3d(118%, 4%, 0) rotate(155deg); opacity: 0; }
}
@keyframes mission-asteroid {
  0% { transform: translate3d(-8%, -10%, 0); opacity: 0; }
  2% { opacity: 0.75; }
  16% { opacity: 0.75; }
  19% { transform: translate3d(118%, 30%, 0); opacity: 0; }
  100% { transform: translate3d(-8%, -10%, 0); opacity: 0; }
}
@keyframes mission-orbit {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes mission-bob {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}
@keyframes mission-drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-4px, -6px); }
}
@keyframes mission-exhaust {
  0%, 100% { opacity: 0.3; transform: scaleY(0.9); }
  40% { opacity: 1; transform: scaleY(1.15); }
  70% { opacity: 0.6; transform: scaleY(1); }
}
@keyframes mission-pulse {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.85; }
}
@keyframes mission-rocket-lift {
  0% { transform: translateY(20px); opacity: 0; }
  10% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(-140px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .mission-anim,
  .mission-anim * {
    animation: none !important;
  }
}
`;

function ShootingStar({
  animation,
  duration,
  delay,
  top,
  tailLength = 130,
}: {
  animation: "mission-shoot-1" | "mission-shoot-2";
  duration: string;
  delay: string;
  top: string;
  tailLength?: number;
}) {
  return (
    <div
      className="absolute left-0"
      style={{
        top,
        width: `${tailLength}px`,
        height: "1.25px",
        background:
          "linear-gradient(to right, rgba(34,211,199,0) 0%, rgba(34,211,199,0.55) 55%, rgba(178,255,245,1) 100%)",
        filter: "drop-shadow(0 0 4px rgba(34,211,199,0.75))",
        animation: `${animation} ${duration} linear ${delay} infinite`,
        willChange: "transform, opacity",
      }}
    />
  );
}

function AsteroidShower() {
  const rocks = [
    { size: 3, topOffset: 0, delay: "0s", duration: "26s", opacity: 0.6 },
    { size: 2, topOffset: 18, delay: "0.7s", duration: "26s", opacity: 0.5 },
    { size: 4, topOffset: 34, delay: "1.1s", duration: "26s", opacity: 0.65 },
    { size: 2.2, topOffset: 56, delay: "1.8s", duration: "26s", opacity: 0.45 },
    { size: 1.8, topOffset: 72, delay: "2.3s", duration: "26s", opacity: 0.4 },
  ];
  return (
    <>
      {rocks.map((r, i) => (
        <div
          key={i}
          className="absolute left-0"
          style={{
            top: `${12 + r.topOffset}px`,
            width: "46px",
            height: "1px",
            background:
              "linear-gradient(to right, rgba(34,211,199,0) 0%, rgba(34,211,199,0.45) 80%, rgba(255,255,255,0.9) 100%)",
            animation: `mission-asteroid ${r.duration} linear ${r.delay} infinite`,
            opacity: r.opacity,
            willChange: "transform, opacity",
          }}
        >
          <span
            className="absolute right-0 -translate-y-1/2 rounded-full bg-white"
            style={{
              top: "50%",
              width: `${r.size}px`,
              height: `${r.size}px`,
              boxShadow: "0 0 6px rgba(34,211,199,0.8)",
            }}
          />
        </div>
      ))}
    </>
  );
}

function OrbitRing({
  size,
  duration = "120s",
  reverse = false,
  opacity = 0.22,
  dashed = true,
}: {
  size: number;
  duration?: string;
  reverse?: boolean;
  opacity?: number;
  dashed?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: `${size}px`,
        border: `1px ${dashed ? "dashed" : "solid"} rgba(34,211,199,${opacity})`,
        animation: `mission-orbit ${duration} linear ${reverse ? "reverse" : "normal"} infinite`,
        willChange: "transform",
      }}
    >
      <span
        className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-signal"
        style={{ boxShadow: "0 0 8px rgba(34,211,199,0.8)" }}
      />
    </div>
  );
}

function CelestialScatter() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden mission-anim">
      {/* Long trajectory arcs, lg+ */}
      <svg
        className="absolute inset-0 hidden h-full w-full text-accent-signal/15 lg:block"
        viewBox="0 0 1000 1600"
        preserveAspectRatio="none"
      >
        <path
          d="M 930 1220 Q 1040 700 940 160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 60 180 Q -20 620 70 1040"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 7"
          vectorEffect="non-scaling-stroke"
          opacity="0.7"
        />
      </svg>

      {/* Twinkling stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-accent-signal"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            ["--tw-min" as string]: String(Math.max(0.15, s.opacity - 0.25)),
            ["--tw-max" as string]: String(Math.min(0.95, s.opacity + 0.3)),
            animation: `mission-twinkle ${s.twinkle}s ease-in-out ${(i * 0.37).toFixed(2)}s infinite`,
            willChange: "opacity",
          }}
        />
      ))}

      {/* Shooting stars, staggered across full canvas */}
      <div className="absolute inset-0 hidden overflow-hidden md:block">
        <ShootingStar animation="mission-shoot-1" duration="14s" delay="2s" top="12%" tailLength={140} />
        <ShootingStar animation="mission-shoot-2" duration="19s" delay="8s" top="58%" tailLength={120} />
        <ShootingStar animation="mission-shoot-1" duration="22s" delay="14s" top="78%" tailLength={100} />
      </div>

      {/* Asteroid shower, periodic burst near the top quarter */}
      <div className="absolute left-0 top-[6%] hidden h-[140px] w-full lg:block">
        <AsteroidShower />
      </div>

      {/* Secondary asteroid shower, lower region */}
      <div className="absolute left-0 top-[62%] hidden h-[140px] w-full lg:block" style={{ transform: "scaleX(-1)" }}>
        <AsteroidShower />
      </div>

      <div className="absolute left-[2%] top-[4%] hidden lg:block" style={{ animation: "mission-drift 11s ease-in-out infinite" }}>
        <PlanetWithRing />
      </div>
      <div className="absolute left-[1%] top-[22%] hidden xl:block" style={{ animation: "mission-drift 13s ease-in-out 0.5s infinite" }}>
        <Hubble />
      </div>
      <div
        className="absolute right-[2%] top-[6%] hidden lg:block"
        style={{ animation: "mission-pulse 8s ease-in-out infinite" }}
      >
        <Constellation />
      </div>
      <div
        className="absolute right-[3%] top-[32%] hidden lg:block"
        style={{ animation: "mission-bob 5.5s ease-in-out infinite", transformOrigin: "center" }}
      >
        <Astronaut />
      </div>
      <div className="absolute left-[2%] top-[56%] hidden lg:block" style={{ animation: "mission-drift 14s ease-in-out 1.5s infinite" }}>
        <MissionPatch />
      </div>
      <div className="absolute right-[1.5%] top-[60%] hidden lg:block" style={{ animation: "mission-drift 12s ease-in-out 0.8s infinite" }}>
        <PlanetWithMoons />
      </div>
      <div
        className="absolute right-[3%] bottom-[12%] hidden lg:block"
        style={{ animation: "mission-rocket-lift 9s ease-in 1s infinite" }}
      >
        <MiniRocket />
      </div>
      <div className="absolute left-[3.5%] bottom-[4%] hidden lg:block" style={{ animation: "mission-drift 16s ease-in-out infinite" }}>
        <Moon />
      </div>
    </div>
  );
}

/**
 * MissionFrame, blueprint bounding box with corner brackets, diagram ID,
 * project/sheet chrome. Wraps the entire mission column.
 */
function MissionFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[72rem] px-4 sm:px-6 md:px-10 lg:px-14">
      {/* Dashed bounding box, lg+ only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-2 inset-y-0 hidden border border-dashed border-accent-signal/25 lg:block"
      />

      {/* Corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Top-left diagram ID */}
      <div className="pointer-events-none absolute left-6 top-4 hidden items-center gap-3 lg:flex">
        <span className="font-mono text-[0.55rem] font-semibold tracking-[0.28em] text-accent-signal">
          DD-02
        </span>
        <span className="h-px w-5 bg-accent-signal/40" aria-hidden />
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dashboard-ink-muted">
          Mission column · Double diamond
        </span>
      </div>

      {/* Top-right revision */}
      <div className="pointer-events-none absolute right-6 top-4 hidden items-center gap-3 lg:flex">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dashboard-ink-muted">
          Rev 2.0 · T/M signal
        </span>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-signal" aria-hidden />
      </div>

      {/* Bottom-left operator */}
      <div className="pointer-events-none absolute bottom-4 left-6 hidden lg:block">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dashboard-ink-muted">
          Operator · Matt Stangl
        </span>
      </div>

      {/* Bottom-right sheet */}
      <div className="pointer-events-none absolute bottom-4 right-6 hidden lg:block">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dashboard-ink-muted">
          Sheet 01 / 01
        </span>
      </div>

      {/* Left-edge altitude ticks */}
      <div className="pointer-events-none absolute bottom-16 left-2 top-16 hidden flex-col justify-between lg:flex">
        {["PAD · 0", "10 km", "KÁRMÁN · 100 km", "LEO", "GEO"].map((tick) => (
          <div key={tick} className="flex items-center gap-2">
            <span className="h-px w-2.5 bg-accent-signal/40" aria-hidden />
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dashboard-ink-muted/80">
              {tick}
            </span>
          </div>
        ))}
      </div>

      {/* Right-edge phase ticks */}
      <div className="pointer-events-none absolute bottom-16 right-2 top-16 hidden flex-col items-end justify-between lg:flex">
        {["IGN", "DISC", "DEF", "STG", "DEV", "DEL", "DPL"].map((tick) => (
          <div key={tick} className="flex items-center gap-2">
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dashboard-ink-muted/80">
              {tick}
            </span>
            <span className="h-px w-2.5 bg-accent-signal/40" aria-hidden />
          </div>
        ))}
      </div>

      <div className="relative py-10 lg:py-16">{children}</div>
    </div>
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute h-4 w-4 border-accent-signal/70 hidden lg:block";
  const pos = {
    tl: "top-0 left-2 border-t-2 border-l-2",
    tr: "top-0 right-2 border-t-2 border-r-2",
    bl: "bottom-0 left-2 border-b-2 border-l-2",
    br: "bottom-0 right-2 border-b-2 border-r-2",
  }[position];
  return <span aria-hidden className={`${base} ${pos}`} />;
}

/* ----------------------------------------------------------------------------
 * Primitives
 * ------------------------------------------------------------------------- */

function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dashboard-ink-muted ${className}`}>
      {children}
    </span>
  );
}

function LevelCode({ code, className = "" }: { code: string; className?: string }) {
  return (
    <span className={`font-mono text-[0.55rem] font-semibold tracking-[0.22em] text-accent-signal ${className}`}>
      {code}
    </span>
  );
}

function FlowConnector({ accent = false }: { accent?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 56"
      className={`mx-auto block h-14 w-4 ${accent ? "text-accent-signal/80" : "text-accent-signal/50"}`}
    >
      <line x1="8" y1="0" x2="8" y2="6" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      <circle cx="8" cy="10" r="1.6" fill="currentColor" opacity="0.7" />
      <line
        x1="8"
        y1="14"
        x2="8"
        y2="44"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="2.5 3"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M3 42 L8 47 L13 42"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
    </svg>
  );
}

/* ----------------------------------------------------------------------------
 * Blocks
 * ------------------------------------------------------------------------- */

/**
 * DiamondHeader, the diamond's identity.
 * Full-width banner that crowns its diamond. The headline ("Don't know · could
 * be" / "Do know · should be") is the diamond's name, not a side caption.
 * A double accent rule underlines the full width to signal "this label owns
 * the entire diamond below."
 */
function DiamondHeader({
  stage,
  stageRole,
  burn,
  label,
  sub,
  tone = "cool",
}: {
  stage: string;
  stageRole: string;
  burn: string;
  label: string;
  sub: string;
  tone?: "cool" | "warm";
}) {
  const warm = tone === "warm";
  return (
    <div className={`relative mx-auto w-full ${DIAMOND_READ_WIDTH}`}>
      {/* Metadata bar */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={`h-1.5 w-1.5 shrink-0 rounded-full border ${
            warm ? "border-accent-signal bg-accent-signal/40" : "border-accent-signal/60 bg-dashboard-bg"
          }`}
        />
        <span className="font-mono text-[0.55rem] font-semibold tracking-[0.26em] text-accent-signal">
          STAGE {stage} · {stageRole.toUpperCase()}
        </span>
        <span aria-hidden className="h-px flex-1 bg-accent-signal/35" />
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-dashboard-ink-muted/90">
          {burn}
        </span>
      </div>

      {/* Headline + sub, the diamond's name */}
      <div
        className={`mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 pb-3 ${
          warm ? "border-accent-signal/70" : "border-accent-signal/45"
        }`}
      >
        <h3 className="font-display text-[clamp(1.05rem,2.8vw+0.4rem,2rem)] font-semibold uppercase leading-[1.05] tracking-[-0.02em] text-white">
          {label}
        </h3>
        <span className="shrink-0 pb-1 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-dashboard-ink-muted">
          {sub}
        </span>
      </div>

      {/* Tick corner accents to emphasize span */}
      <span
        aria-hidden
        className={`absolute -bottom-0.5 left-0 h-1.5 w-1.5 border-l-2 border-b-2 ${
          warm ? "border-accent-signal" : "border-accent-signal/70"
        }`}
      />
      <span
        aria-hidden
        className={`absolute -bottom-0.5 right-0 h-1.5 w-1.5 border-r-2 border-b-2 ${
          warm ? "border-accent-signal" : "border-accent-signal/70"
        }`}
      />
    </div>
  );
}

function IgnitionBlock() {
  return (
    <div className="mx-auto w-full max-w-xl border border-white/[0.1] bg-dashboard-card/55 px-4 py-4 sm:px-5">
      <div className="flex items-center gap-3">
        <IconIgnition />
        <LevelCode code="L-0" />
        <span className="font-mono text-[0.55rem] font-semibold tracking-[0.24em] text-accent-signal">
          IGNITION
        </span>
        <span className="h-px flex-1 bg-white/[0.08]" />
        <Mono>Pre-launch check</Mono>
      </div>
      <p className="mt-2 font-body text-[0.8125rem] leading-snug text-dashboard-ink-light/92">
        Mission inputs stacked on the pad, unknowns, goals, constraints, user signals,
        organizational pressure. Engines spooling.
      </p>
    </div>
  );
}

function StagingDrum({ body }: { body: string }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <svg
        viewBox="0 0 400 120"
        className="h-auto w-full text-accent-signal/50"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect x="40" y="14" width="320" height="92" fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <line x1="40" y1="30" x2="360" y2="30" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
        <line x1="40" y1="90" x2="360" y2="90" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
        <line
          x1="40"
          y1="60"
          x2="360"
          y2="60"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.35"
          strokeDasharray="3 5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="flex items-center gap-2">
          <IconDock />
          <LevelCode code="L-3" />
          <span className="font-mono text-[0.55rem] font-semibold tracking-[0.24em] text-accent-signal">
            STAGING
          </span>
        </div>
        <p className="mt-1 font-display text-[0.875rem] font-semibold leading-snug text-white sm:text-[0.9375rem]">
          {body}
        </p>
      </div>
    </div>
  );
}

function PayloadDeployBlock() {
  return (
    <div className="mx-auto w-full max-w-xl border border-accent-signal/30 bg-dashboard-card/55 px-4 py-4 sm:px-5">
      <div className="flex items-center gap-3">
        <IconSatellite />
        <LevelCode code="L-6" />
        <span className="font-mono text-[0.55rem] font-semibold tracking-[0.24em] text-accent-signal">
          PAYLOAD DEPLOY
        </span>
        <span className="h-px flex-1 bg-accent-signal/25" />
        <span className="inline-flex items-center gap-1 font-mono text-[0.55rem] font-semibold tracking-[0.24em] text-accent-signal">
          MISSION LIVE
          <svg viewBox="0 0 14 10" className="h-2.5 w-3.5" fill="none" aria-hidden>
            <path
              d="M0 5 H11 M8 2 L11 5 L8 8"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="square"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
      </div>
      <p className="mt-2 font-body text-[0.8125rem] leading-snug text-dashboard-ink-light/92">
        Lander separates from the vehicle on target orbit, a shipped product, service, or
        strategic decision the organization can actually operate against.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Phase helpers
 * ------------------------------------------------------------------------- */

function PhaseRow({
  level,
  label,
  note,
  mode,
  icon,
}: {
  level: string;
  label: string;
  note: string;
  mode: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-white/[0.08] pb-3">
      <LevelCode code={level} />
      {icon ? <span className="inline-flex items-center">{icon}</span> : null}
      <h3 className="font-display text-[clamp(0.98rem,2.2vw+0.55rem,1.125rem)] font-semibold leading-tight text-white">
        {label}
      </h3>
      <Mono>{note}</Mono>
      <span className="ml-auto shrink-0 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-accent-signal/90">
        {mode}
      </span>
    </div>
  );
}

function Pillar({
  kicker,
  body,
  icon,
}: {
  kicker: string;
  body: string;
  icon?: ReactNode;
}) {
  return (
    <div className="border border-accent-signal/25 bg-black/30 px-3 py-3">
      <div className="flex items-center gap-2">
        {icon ? <span className="inline-flex items-center">{icon}</span> : null}
        <Mono>{kicker}</Mono>
      </div>
      <p className="mt-1.5 font-body text-[clamp(0.75rem,1.6vw+0.55rem,0.875rem)] font-semibold leading-snug text-white">
        {body}
      </p>
    </div>
  );
}

function ParallelList({ items }: { items: readonly string[] }) {
  return (
    <div>
      <Mono>In parallel</Mono>
      <ul className="mt-2 space-y-1.5">
        {items.map((line) => (
          <li
            key={line}
            className="border-l border-accent-signal/45 pl-3 font-body text-[clamp(0.75rem,1.5vw+0.55rem,0.875rem)] leading-snug text-dashboard-ink-light/92"
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepList({ items, loop = false }: { items: readonly string[]; loop?: boolean }) {
  return (
    <div>
      {loop ? (
        <div className="mb-2 flex items-center gap-2 border border-dashed border-accent-signal/30 bg-black/20 px-2.5 py-2">
          <IconOrbit />
          <Mono className="text-accent-signal/85">Orbit cycle</Mono>
          <span className="font-mono text-[0.6rem] leading-snug text-dashboard-ink-muted">
            Iterate in flight, prototype, learn, build, release.
          </span>
        </div>
      ) : null}
      <ol className="space-y-1.5">
        {items.map((step, i) => (
          <li
            key={step}
            className="flex items-start gap-3 border border-white/[0.06] bg-black/25 px-3 py-2 font-body text-[clamp(0.75rem,1.5vw+0.55rem,0.875rem)] leading-snug text-dashboard-ink-light/90"
          >
            <span className="mt-0.5 shrink-0 font-mono text-[0.55rem] tracking-[0.16em] text-accent-signal/80">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DiamondChamber({
  diverge,
  converge,
  orbit = false,
}: {
  diverge: ReactNode;
  converge: ReactNode;
  orbit?: boolean;
}) {
  return (
    <div className={`relative mx-auto w-full ${DIAMOND_READ_WIDTH} mission-anim`}>
      {/* Rotating orbital rings, behind diamond */}
      {orbit ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
          <OrbitRing size={460} duration="140s" opacity={0.18} />
          <OrbitRing size={580} duration="220s" reverse opacity={0.12} />
        </div>
      ) : null}

      {/*
        Wider viewBox + uniform scaling: the frame "houses" content without
        anamorphic stretch (preserveAspectRatio none was stretching the rhombus).
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-stretch justify-center px-1 sm:px-2"
      >
        <svg
          className="h-full w-full max-w-[min(94%,38rem)] text-accent-signal/[0.42] sm:max-w-[min(96%,42rem)] lg:max-w-[min(96%,44rem)]"
          viewBox="0 0 520 1000"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          role="presentation"
        >
          <polygon
            points="260,14 508,500 260,986 12,500"
            stroke="currentColor"
            strokeWidth="1.35"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="12"
            y1="500"
            x2="508"
            y2="500"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="0.85"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-[min(92%,36rem)] px-0.5 py-14 sm:w-[min(90%,38rem)] sm:py-20 lg:w-[min(88%,40rem)] lg:py-24">
        <div className="space-y-4 pt-5 sm:pt-8 lg:pt-10">{diverge}</div>

        <div className="my-8 flex items-center gap-3 sm:my-10">
          <span className="h-px flex-1 bg-accent-signal/30" />
          <span className="shrink-0 px-1 text-center font-mono text-[0.48rem] uppercase leading-tight tracking-[0.2em] text-accent-signal/85 sm:text-[0.5rem] sm:tracking-[0.24em]">
            Apogee · stage separation
          </span>
          <span className="h-px flex-1 bg-accent-signal/30" />
        </div>

        <div className="space-y-4 pb-5 sm:pb-8 lg:pb-10">{converge}</div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Composition
 * ------------------------------------------------------------------------- */

export function AboutMissionColumn() {
  const m = aboutPage.operatingModel;
  const d1 = m.diamond1;
  const d2 = m.diamond2;

  return (
    <div className="relative isolate py-10 sm:py-16 lg:py-24">
      <style dangerouslySetInnerHTML={{ __html: MISSION_KEYFRAMES }} />
      <CelestialScatter />

      <MissionFrame>
        <div className={`relative mx-auto w-full ${DIAMOND_READ_WIDTH}`}>
          <div className="flex flex-col gap-5 lg:gap-7">
            <IgnitionBlock />
            <FlowConnector />

            {/* Diamond I, the "Don't know · could be" diamond */}
            <div className="flex flex-col gap-1">
              <DiamondHeader
                stage="I"
                stageRole="Booster"
                burn="Discovery burn"
                label={m.journey.from}
                sub={m.leftDiamondTitle}
              />
              <DiamondChamber
                orbit
                diverge={
                  <>
                    <PhaseRow
                      level="L-1"
                      label={d1.discover.label}
                      note={d1.discover.phaseNote}
                      mode={d1.discover.mode}
                      icon={<IconTelescope />}
                    />
                    <Pillar kicker="Start with" body={d1.discover.pillar} icon={<IconRipBrief />} />
                    <ParallelList items={d1.discover.branches} />
                  </>
                }
                converge={
                  <>
                    <PhaseRow
                      level="L-2"
                      label={d1.define.label}
                      note={d1.define.phaseNote}
                      mode={d1.define.mode}
                      icon={<IconReticle />}
                    />
                    <StepList items={d1.define.steps} />
                  </>
                }
              />
            </div>

            <FlowConnector />
            <StagingDrum body={m.bridge} />
            <FlowConnector />

            {/* Diamond II, the "Do know · should be" diamond */}
            <div className="flex flex-col gap-1">
              <DiamondHeader
                stage="II"
                stageRole="Orbit insertion"
                burn="Delivery burn"
                label={m.journey.to}
                sub={m.rightDiamondTitle}
                tone="warm"
              />
              <DiamondChamber
                orbit
                diverge={
                  <>
                    <PhaseRow
                      level="L-4"
                      label={d2.develop.label}
                      note={d2.develop.phaseNote}
                      mode={d2.develop.mode}
                      icon={<IconSatellite />}
                    />
                    <Pillar kicker="Lead with" body={d2.develop.pillar} icon={<IconBurst />} />
                    <ParallelList items={d2.develop.branches} />
                  </>
                }
                converge={
                  <>
                    <PhaseRow
                      level="L-5"
                      label={d2.deliver.label}
                      note={d2.deliver.phaseNote}
                      mode={d2.deliver.mode}
                      icon={<IconLander />}
                    />
                    <StepList items={d2.deliver.steps} loop />
                  </>
                }
              />
            </div>

            <FlowConnector accent />
            <PayloadDeployBlock />
          </div>
        </div>
      </MissionFrame>
    </div>
  );
}
