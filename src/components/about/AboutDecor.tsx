/**
 * AboutDecor — per-section celestial accents.
 * Each piece is a compact line-art SVG that lives in the right margin of a
 * section, reinforcing the mission metaphor without competing with content.
 *
 * All use currentColor so tone follows the parent text color.
 */

const WRAP = "text-accent-signal/35";

/** Earth horizon curvature with pad gantry silhouette — section 00 (Pad). */
export function DecorPad() {
  return (
    <div className={WRAP}>
      <svg width="140" height="110" viewBox="0 0 140 110" aria-hidden>
        {/* Horizon arc */}
        <path
          d="M 6 86 Q 70 62 134 86"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 6 94 Q 70 72 134 94"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          opacity="0.55"
        />
        {/* Ground hatching */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1={14 + i * 12}
            y1="92"
            x2={8 + i * 12}
            y2="106"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.45"
          />
        ))}
        {/* Gantry tower */}
        <g transform="translate(62 34)">
          <line x1="8" y1="0" x2="8" y2="50" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="0.7" />
          <line x1="2" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="0.7" />
          <line x1="2" y1="22" x2="14" y2="22" stroke="currentColor" strokeWidth="0.7" />
          <line x1="2" y1="30" x2="14" y2="30" stroke="currentColor" strokeWidth="0.7" />
          <line x1="2" y1="38" x2="14" y2="38" stroke="currentColor" strokeWidth="0.7" />
          <line x1="2" y1="46" x2="14" y2="46" stroke="currentColor" strokeWidth="0.7" />
          {/* rocket on pad */}
          <path
            d="M 20 10 L 24 2 L 28 10 L 28 42 L 20 42 Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="24" cy="22" r="1.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
        </g>
        {/* Stars above horizon */}
        <circle cx="20" cy="18" r="1" fill="currentColor" opacity="0.8" />
        <circle cx="40" cy="10" r="0.8" fill="currentColor" opacity="0.7" />
        <circle cx="112" cy="22" r="1.2" fill="currentColor" opacity="0.8" />
        <circle cx="128" cy="12" r="0.9" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
}

/** Star tracker / compass rose — section 02 (Guidance). */
export function DecorGuidance() {
  return (
    <div className={WRAP}>
      <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
        {/* outer dashed ring */}
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 24;
          const r1 = 54;
          const r2 = i % 6 === 0 ? 44 : 49;
          const x1 = 60 + Math.cos(a) * r1;
          const y1 = 60 + Math.sin(a) * r1;
          const x2 = 60 + Math.cos(a) * r2;
          const y2 = 60 + Math.sin(a) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={i % 6 === 0 ? 1 : 0.5}
            />
          );
        })}
        {/* Cardinal letters */}
        <text x="60" y="16" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.85">
          N
        </text>
        <text x="60" y="112" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.6">
          S
        </text>
        <text x="108" y="63" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.6">
          E
        </text>
        <text x="12" y="63" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.6">
          W
        </text>
        {/* compass needle */}
        <polygon
          points="60,22 64,62 60,70 56,62"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          points="60,98 64,62 60,54 56,62"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          opacity="0.6"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="60" cy="60" r="2.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}

/** Satellite array — section 03 (Payload). */
export function DecorPayload() {
  return (
    <div className={WRAP}>
      <svg width="140" height="100" viewBox="0 0 140 100" aria-hidden>
        {/* orbital dashed line */}
        <path
          d="M 4 70 Q 70 16 136 70"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="2 3"
          fill="none"
          opacity="0.7"
        />
        {/* Three satellites */}
        {[
          { cx: 28, cy: 58 },
          { cx: 70, cy: 26 },
          { cx: 112, cy: 58 },
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.cx - 10} ${s.cy - 7})`}>
            <rect
              x="6"
              y="3"
              width="8"
              height="8"
              stroke="currentColor"
              strokeWidth="0.9"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="0"
              y="5"
              width="5"
              height="4"
              stroke="currentColor"
              strokeWidth="0.7"
              fill="none"
            />
            <rect
              x="15"
              y="5"
              width="5"
              height="4"
              stroke="currentColor"
              strokeWidth="0.7"
              fill="none"
            />
            <line x1="10" y1="3" x2="10" y2="0" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="10" cy="-1" r="0.7" fill="currentColor" />
          </g>
        ))}
        {/* Planet below — partial */}
        <circle
          cx="70"
          cy="130"
          r="62"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/** Receiving dish + signal waves — section 04 (Telemetry). */
export function DecorTelemetry() {
  return (
    <div className={WRAP}>
      <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden>
        {/* Dish */}
        <g transform="translate(50 58)">
          <path
            d="M 0 0 Q 15 -22 30 0"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <line x1="15" y1="-11" x2="15" y2="-2" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="15" cy="-14" r="1.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {/* mount + legs */}
          <line x1="15" y1="0" x2="15" y2="16" stroke="currentColor" strokeWidth="0.9" />
          <line x1="15" y1="16" x2="5" y2="32" stroke="currentColor" strokeWidth="0.7" />
          <line x1="15" y1="16" x2="25" y2="32" stroke="currentColor" strokeWidth="0.7" />
          <line x1="3" y1="32" x2="27" y2="32" stroke="currentColor" strokeWidth="0.7" />
        </g>
        {/* Signal arcs rising from dish top */}
        <g stroke="currentColor" fill="none" strokeWidth="0.8">
          <path
            d="M 52 36 Q 65 30 78 36"
            strokeDasharray="2 3"
            opacity="0.85"
          />
          <path
            d="M 46 26 Q 65 16 84 26"
            strokeDasharray="2 3"
            opacity="0.65"
          />
          <path
            d="M 40 14 Q 65 0 90 14"
            strokeDasharray="2 3"
            opacity="0.45"
          />
        </g>
        {/* Distant satellite being tracked */}
        <g transform="translate(100 6)">
          <rect
            x="0"
            y="2"
            width="6"
            height="6"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
          <rect x="-4" y="3" width="3" height="4" stroke="currentColor" strokeWidth="0.6" fill="none" />
          <rect x="7" y="3" width="3" height="4" stroke="currentColor" strokeWidth="0.6" fill="none" />
        </g>
      </svg>
    </div>
  );
}

/** Star chart with constellation — section 05 (Operator log). */
export function DecorOperatorLog() {
  return (
    <div className={WRAP}>
      <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden>
        {/* Frame */}
        <rect
          x="4"
          y="4"
          width="132"
          height="112"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="2 3"
        />
        {/* Grid */}
        {[1, 2, 3, 4].map((i) => (
          <line
            key={`h${i}`}
            x1="4"
            y1={4 + i * 22.4}
            x2="136"
            y2={4 + i * 22.4}
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.4"
          />
        ))}
        {[1, 2, 3, 4, 5].map((i) => (
          <line
            key={`v${i}`}
            x1={4 + i * 22}
            y1="4"
            x2={4 + i * 22}
            y2="116"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.4"
          />
        ))}
        {/* Constellation lines */}
        <g stroke="currentColor" strokeWidth="0.6" opacity="0.7">
          <line x1="22" y1="28" x2="48" y2="42" />
          <line x1="48" y1="42" x2="72" y2="30" />
          <line x1="72" y1="30" x2="94" y2="54" />
          <line x1="94" y1="54" x2="114" y2="40" />
          <line x1="94" y1="54" x2="82" y2="88" />
          <line x1="82" y1="88" x2="56" y2="92" />
          <line x1="48" y1="42" x2="56" y2="92" />
        </g>
        {/* Stars at constellation vertices */}
        {[
          { x: 22, y: 28, r: 1.4 },
          { x: 48, y: 42, r: 1.8 },
          { x: 72, y: 30, r: 1.2 },
          { x: 94, y: 54, r: 2 },
          { x: 114, y: 40, r: 1.5 },
          { x: 82, y: 88, r: 1.6 },
          { x: 56, y: 92, r: 1.3 },
        ].map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="currentColor" />
        ))}
        {/* Scattered stars */}
        <circle cx="28" cy="74" r="0.7" fill="currentColor" opacity="0.7" />
        <circle cx="110" cy="94" r="0.8" fill="currentColor" opacity="0.7" />
        <circle cx="128" cy="20" r="0.9" fill="currentColor" opacity="0.7" />
        <circle cx="16" cy="100" r="0.7" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
}

/** Small payload-bay icon — for Payload cards (section 03). */
export function IconSatBay() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden className="text-accent-signal/80">
      <rect x="8" y="4" width="6" height="6" stroke="currentColor" strokeWidth="0.9" fill="none" vectorEffect="non-scaling-stroke" />
      <rect x="1" y="5" width="6" height="4" stroke="currentColor" strokeWidth="0.8" fill="none" vectorEffect="non-scaling-stroke" />
      <rect x="15" y="5" width="6" height="4" stroke="currentColor" strokeWidth="0.8" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="11" y1="4" x2="11" y2="1" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="11" cy="0.5" r="0.7" fill="currentColor" />
    </svg>
  );
}

/** Small signal-wave icon — for Telemetry cards (section 04). */
export function IconTelemetryChannel() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden className="text-accent-signal/80">
      <circle cx="11" cy="10" r="1.2" fill="currentColor" />
      <path d="M 5 8 Q 11 3 17 8" stroke="currentColor" strokeWidth="0.9" fill="none" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
      <path d="M 2 7 Q 11 -1 20 7" stroke="currentColor" strokeWidth="0.8" fill="none" strokeDasharray="1.5 1.5" opacity="0.7" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
