/** Tapering SVG funnel vessel — Run A spine + Run B parallel companion. */
export function SyntheticFunnel() {
  return (
    <div className="synth-funnel-wrap">
      <div className="synth-funnel-head">
        <span className="synth-funnel-head__ttl">OUTCOME.FUNNEL</span>
        <span className="synth-funnel-head__seq">9×4 → 18 → 10 → 3 → 3</span>
      </div>

      <div className="synth-fnl-argument">
        <span className="synth-fnl-argument__frac">
          <span className="synth-fnl-argument__frac-a">3</span>
          <span className="synth-fnl-argument__frac-b">/ 10</span>
        </span>
        <span className="synth-fnl-argument__text">
          actionable findings would not have been caught by self-review —{" "}
          <b>all three became shipped changes.</b>
        </span>
      </div>

      <div className="synth-fnl-body">
        <div className="synth-fnl-svgwrap">
          <svg
            className="synth-fnl-funnelsvg"
            viewBox="0 0 560 400"
            role="img"
            aria-label="Funnel: 36 evaluations narrow to 18 findings, then a 10-item backlog of which 3 were self-review blind spots, all 3 shipped"
          >
            <defs>
              <linearGradient id="synth-funnel-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--synth-accent)" stopOpacity="0.05" />
                <stop offset="0.55" stopColor="var(--synth-accent)" stopOpacity="0.15" />
                <stop offset="1" stopColor="var(--synth-accent)" stopOpacity="0.46" />
              </linearGradient>
              <filter id="synth-f-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <pattern id="synth-bp-grid" width="22" height="22" patternUnits="userSpaceOnUse">
                <path
                  d="M22 0H0V22"
                  fill="none"
                  stroke="rgba(166,186,182,0.07)"
                  strokeWidth="1"
                />
              </pattern>
              <clipPath id="synth-f-clip">
                <path d="M20,18 L540,18 L540,78 L456,108 L456,168 L398,198 L398,268 L348,298 L348,378 L212,378 L212,298 L162,268 L162,198 L104,168 L104,108 L20,78 Z" />
              </clipPath>
            </defs>

            <ellipse
              className="synth-fnl-throat-glow"
              cx="280"
              cy="340"
              rx="86"
              ry="50"
              fill="var(--synth-accent)"
              filter="url(#synth-f-glow)"
            />

            <path
              d="M20,18 L540,18 L540,78 L456,108 L456,168 L398,198 L398,268 L348,298 L348,378 L212,378 L212,298 L162,268 L162,198 L104,168 L104,108 L20,78 Z"
              fill="url(#synth-funnel-fill)"
              stroke="var(--synth-accent-line)"
              strokeWidth="1.25"
            />
            <g clipPath="url(#synth-f-clip)">
              <rect x="0" y="0" width="560" height="400" fill="url(#synth-bp-grid)" />
            </g>
            <g stroke="rgba(166,186,182,0.18)" strokeWidth="1">
              <line x1="104" y1="108" x2="456" y2="108" />
              <line x1="162" y1="198" x2="398" y2="198" />
              <line x1="212" y1="298" x2="348" y2="298" />
            </g>

            <text
              x="280"
              y="54"
              textAnchor="middle"
              fontFamily="var(--font-inter, 'Inter Tight', sans-serif)"
              fontWeight="600"
              fontSize="34"
              letterSpacing="-1"
              fill="var(--synth-accent-2)"
            >
              36
            </text>
            <text
              x="280"
              y="71"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains, 'JetBrains Mono', monospace)"
              fontSize="9"
              letterSpacing="1.4"
              fill="var(--synth-ink-2)"
            >
              9×4 · EVALUATIONS RUN
            </text>

            <text
              x="280"
              y="139"
              textAnchor="middle"
              fontFamily="var(--font-inter, 'Inter Tight', sans-serif)"
              fontWeight="600"
              fontSize="30"
              letterSpacing="-1"
              fill="var(--synth-accent-2)"
            >
              18
            </text>
            <text
              x="280"
              y="156"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains, 'JetBrains Mono', monospace)"
              fontSize="9"
              letterSpacing="1.4"
              fill="var(--synth-ink-2)"
            >
              FINDINGS SURFACED
            </text>

            <text
              x="186"
              y="244"
              textAnchor="middle"
              fontFamily="var(--font-inter, 'Inter Tight', sans-serif)"
              fontWeight="600"
              fontSize="26"
              letterSpacing="-1"
              fill="var(--synth-accent-2)"
            >
              10
            </text>
            <g>
              <rect className="synth-fnl-cell-lit" x="214" y="227" width="13" height="18" rx="1.5" fill="var(--synth-accent)" />
              <rect className="synth-fnl-cell-lit" x="232" y="227" width="13" height="18" rx="1.5" fill="var(--synth-accent)" />
              <rect className="synth-fnl-cell-lit" x="250" y="227" width="13" height="18" rx="1.5" fill="var(--synth-accent)" />
              <rect x="268" y="227" width="13" height="18" rx="1.5" fill="#1d2624" />
              <rect x="286" y="227" width="13" height="18" rx="1.5" fill="#1d2624" />
              <rect x="304" y="227" width="13" height="18" rx="1.5" fill="#1d2624" />
              <rect x="322" y="227" width="13" height="18" rx="1.5" fill="#1d2624" />
              <rect x="358" y="227" width="13" height="18" rx="1.5" fill="#1d2624" />
              <rect x="340" y="227" width="13" height="18" rx="1.5" fill="#1d2624" />
              <rect x="376" y="227" width="13" height="18" rx="1.5" fill="#1d2624" />
            </g>
            <text
              x="280"
              y="262"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains, 'JetBrains Mono', monospace)"
              fontSize="8"
              letterSpacing="1.3"
              fill="var(--synth-accent)"
            >
              BACKLOG · 3 OF 10 BLIND SPOTS
            </text>

            <text
              x="280"
              y="350"
              textAnchor="middle"
              fontFamily="var(--font-inter, 'Inter Tight', sans-serif)"
              fontWeight="700"
              fontSize="48"
              letterSpacing="-1.5"
              fill="var(--synth-accent)"
            >
              3
            </text>
            <text
              x="280"
              y="371"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains, 'JetBrains Mono', monospace)"
              fontSize="9"
              letterSpacing="2"
              fill="#cdd2d0"
            >
              SHIPPED
            </text>
          </svg>
          <div className="synth-fnl-payoff">
            3 of 10 self-review had missed — <b>all 3 shipped</b>
          </div>
        </div>

        <div className="synth-fnl-runside">
          <span className="synth-fnl-runside__tag">Run B · companion · parallel</span>
          <div className="synth-fnl-runside__line">
            <b>1</b>
            <span>design-systems persona · full-site audit</span>
          </div>
          <div className="synth-fnl-runside__line">
            <b>53</b>
            <span>line-level fixes · across 8 sections</span>
          </div>
          <span className="synth-fnl-runside__merge">
            ↳ folds into Run A&apos;s prioritized backlog — parallel track, not a fifth stage
          </span>
        </div>
      </div>
    </div>
  );
}
