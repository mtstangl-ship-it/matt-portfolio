"use client";

import { useId } from "react";

/** Trust-currency schematic: three partner categories converging on EVENT (Say YES Summer). */
export function TrustCurrencyDiagram() {
  const id = useId().replace(/:/g, "");
  const vacc = `${id}-hatch-vacc`;
  const comm = `${id}-hatch-comm`;
  const ph = `${id}-hatch-ph`;

  return (
    <figure className="trust-diagram" aria-label="Trust-currency convergence diagram">
      <figcaption className="trust-diagram__head">
        <span>
          <b>FIG. 03-A</b> · TRUST-CURRENCY CONVERGENCE · 3 CATEGORIES → 1 EVENT
        </span>
        <span>SCHEMATIC · NOT TO SCALE</span>
      </figcaption>
      <svg className="trust-diagram__svg" viewBox="0 0 880 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g stroke="var(--ink-line)" strokeWidth="0.5" opacity="0.6">
          <line x1="0" y1="40" x2="880" y2="40" />
          <line x1="0" y1="80" x2="880" y2="80" />
          <line x1="0" y1="120" x2="880" y2="120" />
          <line x1="0" y1="160" x2="880" y2="160" />
          <line x1="0" y1="200" x2="880" y2="200" />
          <line x1="0" y1="240" x2="880" y2="240" />
          <line x1="0" y1="280" x2="880" y2="280" />
        </g>

        <defs>
          <pattern id={vacc} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--accent)" strokeWidth="0.5" opacity="0.35" />
          </pattern>
          <pattern id={comm} patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="2" cy="2" r="0.7" fill="var(--accent)" opacity="0.35" />
          </pattern>
          <pattern id={ph} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="6" y2="0" stroke="var(--accent)" strokeWidth="0.5" opacity="0.35" />
          </pattern>
        </defs>

        <g transform="translate(40 90)">
          <rect width="180" height="120" fill={`url(#${vacc})`} stroke="var(--accent)" strokeWidth="1" />
          <text x="14" y="22" fontFamily="ui-monospace, monospace" fontSize="9" fill="var(--accent)" letterSpacing="2.5">
            CAT 01
          </text>
          <text x="14" y="42" fontFamily="ui-monospace, monospace" fontSize="11" fill="#e6ebe9" letterSpacing="2" fontWeight="500">
            VACCINATION
          </text>
          <line x1="14" y1="52" x2="166" y2="52" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5" />
          <text x="14" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="#aab5b3" letterSpacing="1.2">
            CORE Georgia
          </text>
          <text x="14" y="86" fontFamily="ui-monospace, monospace" fontSize="9" fill="#aab5b3" letterSpacing="1.2">
            Local Health Districts
          </text>
          <text x="14" y="100" fontFamily="ui-monospace, monospace" fontSize="9" fill="#aab5b3" letterSpacing="1.2">
            Pfizer · J &amp; J
          </text>
          <g stroke="var(--accent)" strokeWidth="1" fill="none">
            <path d="M 0 8 L 0 0 L 8 0" />
            <path d="M 172 0 L 180 0 L 180 8" />
            <path d="M 180 112 L 180 120 L 172 120" />
            <path d="M 8 120 L 0 120 L 0 112" />
          </g>
        </g>

        <g transform="translate(350 20)">
          <rect width="180" height="100" fill={`url(#${comm})`} stroke="var(--accent)" strokeWidth="1" />
          <text x="14" y="22" fontFamily="ui-monospace, monospace" fontSize="9" fill="var(--accent)" letterSpacing="2.5">
            CAT 02
          </text>
          <text x="14" y="42" fontFamily="ui-monospace, monospace" fontSize="11" fill="#e6ebe9" letterSpacing="2" fontWeight="500">
            COMMUNITY
          </text>
          <line x1="14" y1="52" x2="166" y2="52" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5" />
          <text x="14" y="68" fontFamily="ui-monospace, monospace" fontSize="9" fill="#aab5b3" letterSpacing="1.2">
            Living Walls · artists
          </text>
          <text x="14" y="82" fontFamily="ui-monospace, monospace" fontSize="9" fill="#aab5b3" letterSpacing="1.2">
            Musicians · murals
          </text>
          <g stroke="var(--accent)" strokeWidth="1" fill="none">
            <path d="M 0 8 L 0 0 L 8 0" />
            <path d="M 172 0 L 180 0 L 180 8" />
            <path d="M 180 92 L 180 100 L 172 100" />
            <path d="M 8 100 L 0 100 L 0 92" />
          </g>
        </g>

        <g transform="translate(660 90)">
          <rect width="180" height="120" fill={`url(#${ph})`} stroke="var(--accent)" strokeWidth="1" />
          <text x="14" y="22" fontFamily="ui-monospace, monospace" fontSize="9" fill="var(--accent)" letterSpacing="2.5">
            CAT 03
          </text>
          <text x="14" y="42" fontFamily="ui-monospace, monospace" fontSize="11" fill="#e6ebe9" letterSpacing="2" fontWeight="500">
            PUBLIC HEALTH
          </text>
          <line x1="14" y1="52" x2="166" y2="52" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5" />
          <text x="14" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="#aab5b3" letterSpacing="1.2">
            Georgia DPH
          </text>
          <text x="14" y="86" fontFamily="ui-monospace, monospace" fontSize="9" fill="#aab5b3" letterSpacing="1.2">
            CORE personnel
          </text>
          <text x="14" y="100" fontFamily="ui-monospace, monospace" fontSize="9" fill="#aab5b3" letterSpacing="1.2">
            Conversation · not pitch
          </text>
          <g stroke="var(--accent)" strokeWidth="1" fill="none">
            <path d="M 0 8 L 0 0 L 8 0" />
            <path d="M 172 0 L 180 0 L 180 8" />
            <path d="M 180 112 L 180 120 L 172 120" />
            <path d="M 8 120 L 0 120 L 0 112" />
          </g>
        </g>

        <g className="trust-diagram__event" transform="translate(440 230)">
          <circle r="44" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="1.5" />
          <circle className="trust-diagram__event-ring" r="36" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 3" />
          <text x="0" y="-4" fontFamily="ui-monospace, monospace" fontSize="9" fill="var(--accent)" letterSpacing="2.5" textAnchor="middle">
            CONVERGENCE
          </text>
          <text x="0" y="14" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fontSize="13" fill="#e6ebe9" letterSpacing="1.5" textAnchor="middle" fontWeight="500">
            EVENT
          </text>
          <text x="0" y="28" fontFamily="ui-monospace, monospace" fontSize="8" fill="#aab5b3" letterSpacing="1.2" textAnchor="middle">
            on the same block
          </text>
        </g>

        <g stroke="var(--accent)" strokeWidth="1.2" fill="var(--accent)">
          <line x1="220" y1="170" x2="392" y2="222" />
          <polygon points="392,222 384,217 384,229" />
          <line x1="440" y1="120" x2="440" y2="184" />
          <polygon points="440,184 435,176 445,176" />
          <line x1="660" y1="170" x2="488" y2="222" />
          <polygon points="488,222 496,217 496,229" />
        </g>

        <g fontFamily="ui-monospace, monospace" fontSize="8" fill="#aab5b3" letterSpacing="1.5">
          <text x="290" y="190" textAnchor="middle">
            CLINICAL
          </text>
          <text x="290" y="202" textAnchor="middle">
            DELIVERY
          </text>
          <text x="455" y="158">
            REASON TO STAY
          </text>
          <text x="590" y="190" textAnchor="middle">
            CONVERSATION
          </text>
          <text x="590" y="202" textAnchor="middle">
            NOT PITCH
          </text>
        </g>

        <g transform="translate(40 300)" stroke="var(--ink-3)" strokeWidth="0.8">
          <line x1="0" y1="0" x2="800" y2="0" />
          <line x1="0" y1="0" x2="0" y2="6" />
          <line x1="200" y1="0" x2="200" y2="6" />
          <line x1="400" y1="0" x2="400" y2="6" />
          <line x1="600" y1="0" x2="600" y2="6" />
          <line x1="800" y1="0" x2="800" y2="6" />
          <text x="400" y="16" fontFamily="ui-monospace, monospace" fontSize="7" fill="var(--ink-3)" letterSpacing="2" textAnchor="middle">
            DIM · 3 INPUTS · 1 CONVERGENCE
          </text>
        </g>
      </svg>
      <p className="trust-diagram__cap">
        <b>24+ partners</b> across 3 categories · 10 events · every event had at least 3 things to do besides vaccinate
      </p>
    </figure>
  );
}
