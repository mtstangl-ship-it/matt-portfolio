export function TelemetryCentaur() {
  return (
    <section className="telemetry" aria-label="Build Telemetry" data-screen-label="02 Build Telemetry">
      <span className="margin-note">DRAWING 02 · TELEMETRY</span>
      <span className="fig-stamp">FIG. 02 · TELEMETRY</span>

      <dl className="section-stamp" aria-label="Section metadata">
        <dt>DRAWING NO.</dt>
        <dd>02 / 06</dd>
        <dt>RUNTIME</dt>
        <dd>06 WK</dd>
        <dt>SHIPPED</dt>
        <dd>APR 21, 2026</dd>
        <dt>LAST REV.</dt>
        <dd>04/26</dd>
      </dl>

      <div className="telemetry__inner">
        <p className="telemetry__eyebrow">
          <span className="telemetry__eyebrow__meta">
            BUILD.TELEMETRY · MAR 6 — APR 21, 2026 · 6 WEEKS · COMMIT LOG DISTILLED
          </span>
          <span className="live">LIVE · NOW</span>
        </p>

        <div className="gauge-cluster" role="list" aria-label="Build telemetry readouts">
          <div className="gauge gauge--hero" role="listitem">
            <p className="gauge__label">Hero readout</p>
            <p className="gauge__value">
              6<span className="gauge__value-unit">wks</span>
            </p>
            <p className="gauge__caption">Brief to shipped</p>
            <p className="gauge__tol">Five case studies · three interactive artifacts</p>
          </div>
          <div className="gauge" role="listitem">
            <p className="gauge__label">Commits</p>
            <p className="gauge__value">130</p>
            <p className="gauge__caption">Cumulative</p>
            <svg className="gauge__sparkline" viewBox="0 0 200 28" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                points="0,22 28,18 56,16 84,10 112,8 140,6 168,4 200,3"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              <g fill="var(--accent)">
                <circle cx="0" cy="22" r="2" />
                <circle cx="28" cy="18" r="2" />
                <circle cx="56" cy="16" r="2" />
                <circle cx="84" cy="10" r="2" />
                <circle cx="112" cy="8" r="2" />
                <circle cx="140" cy="6" r="2" />
                <circle cx="168" cy="4" r="2" />
                <circle cx="200" cy="3" r="2.4" />
              </g>
            </svg>
          </div>
          <div className="gauge" role="listitem">
            <p className="gauge__label">Deploys</p>
            <p className="gauge__value">34</p>
            <p className="gauge__caption">Instant preview every push</p>
            <svg className="gauge__sparkline" viewBox="0 0 200 28" preserveAspectRatio="none" aria-hidden="true">
              <g stroke="var(--accent)" strokeWidth="1">
                <line x1="14" y1="28" x2="14" y2="22" />
                <line x1="42" y1="28" x2="42" y2="14" />
                <line x1="70" y1="28" x2="70" y2="10" />
                <line x1="98" y1="28" x2="98" y2="6" />
                <line x1="126" y1="28" x2="126" y2="12" />
                <line x1="154" y1="28" x2="154" y2="8" />
                <line x1="182" y1="28" x2="182" y2="4" />
              </g>
            </svg>
          </div>
          <div className="gauge" role="listitem">
            <p className="gauge__label">Case studies</p>
            <p className="gauge__value">5</p>
            <p className="gauge__caption">Each with a hero artifact</p>
            <svg className="gauge__sparkline" viewBox="0 0 200 30" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => {
                const x = 12 + i * 37;
                return (
                  <g key={i}>
                    <rect x={x} y="5" width="24" height="14" rx="1" fill="var(--accent)" opacity="0.92" />
                    <text
                      x={x + 12}
                      y="26"
                      textAnchor="middle"
                      fill="var(--ink-3)"
                      fontSize="7"
                      fontFamily="ui-monospace, monospace"
                      letterSpacing="0.08em"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="timeline" aria-label="Six-week timeline">
          <div className="timeline__head">
            <span>W1 — NOW · TICK SCALE</span>
            <span>BAR INTERVAL · 1 WK</span>
          </div>
          <div className="timeline__rail">
            {(["W1", "W2", "W3", "W4", "W5", "W6", "NOW"] as const).map((wk) => (
              <div
                key={wk}
                className={`timeline__node timeline__node--filled${wk === "NOW" ? " timeline__node--live" : ""}`}
              >
                <span className="timeline__wk">
                  <b>{wk}</b>
                </span>
                <span className="timeline__dot" />
              </div>
            ))}
          </div>
          <div className="timeline__captions">
            <span className="timeline__caption">
              <b>W1</b>
              IA in Cursor
              <br />
              no design
            </span>
            <span className="timeline__caption">
              <b>W2</b>
              Tokens + grid
              <br />
              stand up
            </span>
            <span className="timeline__caption">
              <b>W3</b>
              Hero scatter
              <br />
              added
            </span>
            <span className="timeline__caption">
              <b>W4</b>
              Impact console
              <br />
              ships
            </span>
            <span className="timeline__caption">
              <b>W5</b>
              Claude Design
              <br />
              arrives
            </span>
            <span className="timeline__caption">
              <b>W6</b>
              Critique
              <br />+ case studies
            </span>
            <span className="timeline__caption">
              <b>NOW</b>
              Shipped
              <br />
              Apr 21
            </span>
          </div>
          <svg className="timeline__scale" viewBox="0 0 800 18" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="2" x2="800" y2="2" stroke="var(--ink-line)" strokeWidth="1" />
            <g stroke="var(--ink-3)" strokeWidth="1">
              <line x1="0" y1="2" x2="0" y2="12" />
              <line x1="133" y1="2" x2="133" y2="12" />
              <line x1="266" y1="2" x2="266" y2="12" />
              <line x1="400" y1="2" x2="400" y2="12" />
              <line x1="533" y1="2" x2="533" y2="12" />
              <line x1="666" y1="2" x2="666" y2="12" />
              <line x1="800" y1="2" x2="800" y2="12" />
            </g>
            <g stroke="var(--ink-line)" strokeWidth="0.5">
              <line x1="33" y1="2" x2="33" y2="8" />
              <line x1="66" y1="2" x2="66" y2="8" />
              <line x1="100" y1="2" x2="100" y2="8" />
              <line x1="166" y1="2" x2="166" y2="8" />
              <line x1="200" y1="2" x2="200" y2="8" />
              <line x1="233" y1="2" x2="233" y2="8" />
              <line x1="300" y1="2" x2="300" y2="8" />
              <line x1="333" y1="2" x2="333" y2="8" />
              <line x1="366" y1="2" x2="366" y2="8" />
              <line x1="433" y1="2" x2="433" y2="8" />
              <line x1="466" y1="2" x2="466" y2="8" />
              <line x1="500" y1="2" x2="500" y2="8" />
              <line x1="566" y1="2" x2="566" y2="8" />
              <line x1="600" y1="2" x2="600" y2="8" />
              <line x1="633" y1="2" x2="633" y2="8" />
              <line x1="700" y1="2" x2="700" y2="8" />
              <line x1="733" y1="2" x2="733" y2="8" />
              <line x1="766" y1="2" x2="766" y2="8" />
            </g>
          </svg>
        </div>

        <p className="telemetry__outcome">
          A <b>production-grade portfolio</b>, two reusable workflows, and one clear boundary between AI generation and human judgment.
        </p>
      </div>
    </section>
  );
}
