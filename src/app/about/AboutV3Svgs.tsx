/** Inline SVG illustrations ported verbatim from About.html v3 */

export function HeroBmwSilhouette() {
  return (
    <svg className="hero-bmw-silhouette" viewBox="0 0 800 400" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--ink-2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <line x1="40" y1="310" x2="760" y2="310" strokeDasharray="4 6" strokeWidth="0.5" />
        <circle cx="180" cy="260" r="60" />
        <circle cx="180" cy="260" r="22" strokeWidth="0.5" />
        <circle cx="180" cy="260" r="3" fill="var(--ink-2)" />
        <line x1="180" y1="200" x2="180" y2="320" strokeWidth="0.4" />
        <line x1="120" y1="260" x2="240" y2="260" strokeWidth="0.4" />
        <line x1="137" y1="217" x2="223" y2="303" strokeWidth="0.4" />
        <line x1="137" y1="303" x2="223" y2="217" strokeWidth="0.4" />
        <circle cx="620" cy="260" r="60" />
        <circle cx="620" cy="260" r="22" strokeWidth="0.5" />
        <circle cx="620" cy="260" r="3" fill="var(--ink-2)" />
        <line x1="620" y1="200" x2="620" y2="320" strokeWidth="0.4" />
        <line x1="560" y1="260" x2="680" y2="260" strokeWidth="0.4" />
        <line x1="577" y1="217" x2="663" y2="303" strokeWidth="0.4" />
        <line x1="577" y1="303" x2="663" y2="217" strokeWidth="0.4" />
        <path d="M 220 240 L 320 175 L 480 175 L 600 215" />
        <path d="M 320 175 Q 360 145 420 145 Q 470 145 480 175 L 470 195 L 330 195 Z" />
        <path d="M 250 195 L 320 175 L 320 192 L 270 215 Z" />
        <rect x="260" y="230" width="80" height="40" rx="3" />
        <line x1="272" y1="230" x2="272" y2="270" strokeWidth="0.4" />
        <line x1="284" y1="230" x2="284" y2="270" strokeWidth="0.4" />
        <line x1="296" y1="230" x2="296" y2="270" strokeWidth="0.4" />
        <line x1="308" y1="230" x2="308" y2="270" strokeWidth="0.4" />
        <line x1="320" y1="230" x2="320" y2="270" strokeWidth="0.4" />
        <rect x="360" y="235" width="80" height="35" rx="3" strokeWidth="0.5" />
        <ellipse cx="400" cy="250" rx="36" ry="30" strokeWidth="0.6" />
        <line x1="600" y1="215" x2="620" y2="260" strokeWidth="1.2" />
        <line x1="612" y1="215" x2="632" y2="260" strokeWidth="1.2" />
        <line x1="595" y1="160" x2="640" y2="160" />
        <line x1="600" y1="215" x2="610" y2="165" />
        <circle cx="595" cy="185" r="18" />
        <circle cx="595" cy="185" r="10" strokeWidth="0.4" />
        <path d="M 430 270 L 240 305" strokeWidth="1.5" />
        <path d="M 240 305 L 230 308 L 235 312" strokeWidth="0.6" />
        <text
          x="40"
          y="380"
          fontFamily="ui-monospace, var(--font-jetbrains), monospace"
          fontSize="11"
          letterSpacing="2"
          fill="var(--ink-2)"
        >
          BMW · R-SERIES · AIRHEAD
        </text>
        <line x1="120" y1="335" x2="680" y2="335" strokeWidth="0.4" />
        <line x1="120" y1="330" x2="120" y2="340" strokeWidth="0.4" />
        <line x1="680" y1="330" x2="680" y2="340" strokeWidth="0.4" />
        <text
          x="395"
          y="352"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="1.5"
          fill="var(--ink-2)"
          textAnchor="middle"
        >
          WHEELBASE
        </text>
      </g>
    </svg>
  );
}

export function DecisionDiagram() {
  return (
    <svg className="decision-diagram" viewBox="0 0 240 120" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--ink-3)" strokeWidth="0.8">
        <path d="M 30 60 Q 80 30 140 30" strokeDasharray="3 3" />
        <circle cx="148" cy="30" r="5" />
        <path d="M 30 60 Q 80 90 140 90" stroke="var(--accent)" strokeWidth="1" />
        <circle cx="148" cy="90" r="5" fill="var(--accent)" stroke="var(--accent)" />
      </g>
      <circle cx="30" cy="60" r="4" fill="var(--ink-2)" />
      <text
        x="30"
        y="78"
        fontFamily="ui-monospace, monospace"
        fontSize="8"
        letterSpacing="1"
        fill="var(--ink-3)"
        textAnchor="middle"
      >
        DECISION
      </text>
      <text x="160" y="33" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.5" fill="var(--ink-3)">
        COMFORT
      </text>
      <text x="160" y="93" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.5" fill="var(--accent)">
        CLARITY
      </text>
    </svg>
  );
}

export function CompassRose() {
  return (
    <svg className="compass-rose" viewBox="0 0 160 160" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--ink-3)" strokeWidth="0.8">
        <circle cx="80" cy="80" r="70" />
        <circle cx="80" cy="80" r="40" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>
      <g stroke="var(--accent)" strokeWidth="1">
        <line x1="80" y1="80" x2="80" y2="15" />
        <line x1="80" y1="80" x2="145" y2="80" />
        <line x1="80" y1="80" x2="80" y2="145" />
        <line x1="80" y1="80" x2="15" y2="80" />
      </g>
      <g fill="var(--accent)">
        <circle cx="80" cy="15" r="3" />
        <circle cx="145" cy="80" r="3" />
        <circle cx="80" cy="145" r="3" />
        <circle cx="15" cy="80" r="3" />
        <circle cx="80" cy="80" r="3.5" />
      </g>
      <g fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1.5" fill="var(--ink-2)" textAnchor="middle">
        <text x="80" y="10">
          CALM
        </text>
        <text x="153" y="83" textAnchor="start">
          TRANSL.
        </text>
        <text x="80" y="158">
          ADOPTION
        </text>
        <text x="7" y="83" textAnchor="end">
          CRAFT
        </text>
      </g>
    </svg>
  );
}

export function InstrumentCluster() {
  return (
    <svg
      className="instrument-cluster"
      viewBox="0 0 720 220"
      aria-label="Career instrument cluster: years on the bike, enterprise clients, home base"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="var(--ink-line)" strokeWidth="1">
        <rect x="4" y="4" width="712" height="212" rx="2" />
        <line x1="244" y1="4" x2="244" y2="216" />
        <line x1="484" y1="4" x2="484" y2="216" />
      </g>

      <g transform="translate(124 122)">
        <path d="M -75 0 A 75 75 0 0 1 75 0" fill="none" stroke="var(--ink-line)" strokeWidth="1" />
        <path d="M -65 0 A 65 65 0 0 1 65 0" fill="none" stroke="var(--ink-line)" strokeWidth="0.5" strokeDasharray="2 4" />
        <g stroke="var(--ink-3)" strokeWidth="1">
          <line x1="-75" y1="0" x2="-82" y2="0" />
          <line x1="-69.3" y1="-28.7" x2="-75.8" y2="-31.4" />
          <line x1="-53" y1="-53" x2="-58" y2="-58" />
          <line x1="-28.7" y1="-69.3" x2="-31.4" y2="-75.8" />
          <line x1="0" y1="-75" x2="0" y2="-82" />
          <line x1="28.7" y1="-69.3" x2="31.4" y2="-75.8" />
          <line x1="53" y1="-53" x2="58" y2="-58" />
          <line x1="69.3" y1="-28.7" x2="75.8" y2="-31.4" />
          <line x1="75" y1="0" x2="82" y2="0" />
        </g>
        <line x1="0" y1="0" x2="45" y2="-55" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="0" r="5" fill="var(--accent)" />
        <text
          x="0"
          y="30"
          fontFamily="ui-monospace, monospace"
          fontSize="24"
          fontWeight="500"
          letterSpacing="2"
          fill="var(--ink)"
          textAnchor="middle"
        >
          15+ YR
        </text>
        <text x="0" y="55" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="var(--ink-3)" textAnchor="middle">
          YEARS ON THE BIKE
        </text>
      </g>

      <g transform="translate(364 60)">
        <rect x="-90" y="0" width="180" height="68" fill="none" stroke="var(--ink-line)" strokeWidth="0.6" />
        <text x="0" y="48" fontFamily="ui-monospace, monospace" fontSize="40" fontWeight="500" letterSpacing="4" fill="var(--accent)" textAnchor="middle">
          06
        </text>
        <g fill="var(--accent)">
          <rect x="-72" y="82" width="18" height="4" />
          <rect x="-48" y="82" width="18" height="4" />
          <rect x="-24" y="82" width="18" height="4" />
          <rect x="0" y="82" width="18" height="4" />
          <rect x="24" y="82" width="18" height="4" />
          <rect x="48" y="82" width="18" height="4" />
        </g>
        <text x="0" y="108" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="var(--ink-3)" textAnchor="middle">
          ENTERPRISE CLIENTS
        </text>
        <text x="0" y="126" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1.5" fill="var(--ink-3)" textAnchor="middle" opacity="0.7">
          AUTODESK · WIPRO · EY · +3
        </text>
      </g>

      <g transform="translate(604 110)">
        <circle cx="0" cy="0" r="58" fill="none" stroke="var(--ink-line)" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="40" fill="none" stroke="var(--ink-line)" strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1="0" y1="-58" x2="0" y2="-65" stroke="var(--ink-3)" strokeWidth="1" />
        <text x="0" y="-72" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.5" fill="var(--ink-3)" textAnchor="middle">
          N
        </text>
        <g stroke="var(--accent)" strokeWidth="1.4" fill="var(--accent)">
          <line x1="0" y1="0" x2="42" y2="-15" />
          <polygon points="42,-15 36,-18 38,-11" />
          <line x1="0" y1="0" x2="-38" y2="-22" />
          <polygon points="-38,-22 -32,-25 -34,-17" />
          <line x1="0" y1="0" x2="30" y2="35" />
          <polygon points="30,35 26,29 22,35" />
        </g>
        <circle cx="0" cy="0" r="4" fill="var(--ink)" />
        <text x="0" y="82" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="500" letterSpacing="2" fill="var(--ink)" textAnchor="middle">
          DEN → REMOTE
        </text>
        <text x="0" y="98" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="var(--ink-3)" textAnchor="middle">
          HOME BASE
        </text>
      </g>
    </svg>
  );
}

export const DIM_SCALE_MAJOR_X = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800] as const;

export const DIM_SCALE_MINOR_X = [
  16, 32, 48, 64, 96, 112, 128, 144, 176, 192, 208, 224, 256, 272, 288, 304, 336, 352, 368, 384, 416, 432,
  448, 464, 496, 512, 528, 544, 576, 592, 608, 624, 656, 672, 688, 704, 736, 752, 768, 784,
] as const;
