export function DeclarationCentaur() {
  return (
    <section className="centaur" id="centaur" aria-label="Centaur Declaration" data-screen-label="03 Centaur Declaration">
      <span className="margin-note">DRAWING 03 · METHOD</span>
      <span className="fig-stamp">FIG. 03 · METHOD</span>

      <dl className="section-stamp" aria-label="Section metadata">
        <dt>DRAWING NO.</dt>
        <dd>03 / 06</dd>
        <dt>FRAMEWORK</dt>
        <dd>CENTAUR (MOLLICK)</dd>
        <dt>SPLIT</dt>
        <dd>HUMAN ↔ AI</dd>
        <dt>LAST REV.</dt>
        <dd>04/26</dd>
      </dl>

      <div className="centaur__inner">
        <div className="centaur__head">
          <div>
            <p className="kicker">03 · METHOD · CENTAUR, NOT CYBORG</p>
            <h2 className="centaur__h2">
              Human in the saddle. <em>Always.</em>
            </h2>
          </div>
          <svg className="case-schematic" viewBox="0 0 320 172" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            {/* Saddle baseline */}
            <g fill="none" stroke="var(--ink-3)" strokeWidth="0.8">
              <line x1="28" y1="128" x2="292" y2="128" />
              <line x1="28" y1="128" x2="28" y2="134" />
              <line x1="292" y1="128" x2="292" y2="134" />
            </g>
            {/* Human / drafts */}
            <g transform="translate(96 58)">
              <circle cx="0" cy="0" r="32" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="22" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 3" />
              <circle cx="0" cy="0" r="3" fill="var(--accent)" />
            </g>
            {/* AI / grid */}
            <g transform="translate(224 58)">
              <rect x="-32" y="-32" width="64" height="64" fill="none" stroke="var(--ink-3)" strokeWidth="1" />
              <g stroke="var(--ink-3)" strokeWidth="0.4">
                <line x1="-32" y1="-16" x2="32" y2="-16" />
                <line x1="-32" y1="0" x2="32" y2="0" />
                <line x1="-32" y1="16" x2="32" y2="16" />
                <line x1="-16" y1="-32" x2="-16" y2="32" />
                <line x1="0" y1="-32" x2="0" y2="32" />
                <line x1="16" y1="-32" x2="16" y2="32" />
              </g>
            </g>
            {/* Arrows + labels (more vertical room than horizontal crowding) */}
            <g stroke="var(--accent)" strokeWidth="1.2" fill="var(--accent)">
              <line x1="188" y1="52" x2="136" y2="52" />
              <polygon points="136,52 142,49 142,55" />
            </g>
            <text x="162" y="46" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1.4" fill="var(--accent)" textAnchor="middle">
              DRAFTS
            </text>
            <g stroke="var(--ink-2)" strokeWidth="1" fill="var(--ink-2)">
              <line x1="136" y1="72" x2="188" y2="72" />
              <polygon points="188,72 182,69 182,75" />
            </g>
            <text x="162" y="86" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1.4" fill="var(--ink-3)" textAnchor="middle">
              STEERING
            </text>
            {/* Axis labels — stagger rows so nothing collides */}
            <text x="96" y="118" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="var(--ink-2)" textAnchor="middle">
              HUMAN
            </text>
            <text x="224" y="118" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="var(--ink-2)" textAnchor="middle">
              AI
            </text>
            <text x="52" y="148" fontFamily="ui-monospace, monospace" fontSize="7.5" letterSpacing="1.4" fill="var(--ink-3)" textAnchor="start">
              DECISIONS
            </text>
            <text x="268" y="148" fontFamily="ui-monospace, monospace" fontSize="7.5" letterSpacing="1.4" fill="var(--ink-3)" textAnchor="end">
              GENERATION
            </text>
            <text x="160" y="162" fontFamily="ui-monospace, monospace" fontSize="8.5" letterSpacing="2" fill="var(--ink-3)" textAnchor="middle">
              SADDLE LINE
            </text>
          </svg>
        </div>

        <div className="centaur__framing">
          <p>
            Ethan Mollick&apos;s framework draws a line between <b>Centaurs</b> and <b>Cyborgs</b>. A Centaur divides tasks with AI and keeps
            steering. A Cyborg fuses with it completely.
          </p>
          <p>
            I&apos;m a Centaur. The structure of every page, the positioning decisions, the copy that sounds like me — those were mine. AI produced
            faster drafts, better variations, sharper critique than I could generate alone. <em>The decisions were mine.</em>
          </p>
        </div>

        <div className="split" role="figure" aria-label="One concrete example of human / AI split">
          <div className="split__cell split__cell--ai">
            <p className="split__eyebrow split__eyebrow--ai">
              <span>AI GENERATED</span>
              <span className="split__ref">REF · 03-A</span>
            </p>
            <p className="split__quote">
              &quot;Matt Stangl is a strategic design leader who transforms complex enterprise challenges into measurable business outcomes through
              human-centered methodologies and systems thinking.&quot;
            </p>
            <p className="precision-tag" style={{ marginTop: "auto" }}>
              SOURCE · LLM DRAFT · COMPREHENSIVE PRESET
            </p>
          </div>
          <div className="split__cell split__cell--human">
            <p className="split__eyebrow split__eyebrow--human">
              <span>I CHANGED IT TO</span>
              <span className="split__ref">REF · 03-B</span>
            </p>
            <p className="split__quote">&quot;I rebuild fragmented enterprise experience as one operating model that actually ships.&quot;</p>
            <p className="precision-tag" style={{ marginTop: "auto" }}>
              SOURCE · MATT · POSITIONING PASS · 04/12
            </p>
          </div>
        </div>

        <div className="split__why">
          <span className="split__why-eyebrow">WHY · CAPTION</span>
          The AI version is <b>a job description</b>. Mine is <em>a positioning statement</em>. AI defaults to comprehensiveness; I default to
          specificity. <b>That pattern repeated across every piece of copy on this site.</b>
        </div>

        <div className="centaur__pivot">
          <p>
            The hardest version of this lesson came in <b>week four</b>. I let AI write three case study pages end to end. The output was fluent,
            professional, and completely generic — the same portfolio language on a hundred other sites.{" "}
            <b>I tore it down and rebuilt from what actually happened: the real pivots, the real numbers.</b> That version is what you&apos;re reading now.
          </p>
          <span className="centaur__pivot-marg" aria-hidden="true">
            <b>PIVOT · WK 04</b>
            <span>FAILURE · LOGGED</span>
            <span>FIG. 03 · ANNOT.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
