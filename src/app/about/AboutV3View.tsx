import type { ReactNode } from "react";
import { AboutNav } from "./AboutNav";
import {
  CompassRose,
  DecisionDiagram,
  DIM_SCALE_MAJOR_X,
  DIM_SCALE_MINOR_X,
  GarageLayout,
  HeroBmwSilhouette,
  InstrumentCluster,
} from "./AboutV3Svgs";

function DimScale({ label, minors = true }: { label: string; minors?: boolean }) {
  return (
    <div className="dim-with-scale">
      <p className="dim">{label}</p>
      <svg className="dim-scale" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="4" x2="800" y2="4" stroke="var(--ink-line)" strokeWidth="1" />
        <g stroke="var(--ink-3)" strokeWidth="1">
          {DIM_SCALE_MAJOR_X.map((x) => (
            <line key={x} x1={x} y1="4" x2={x} y2="14" />
          ))}
        </g>
        {minors ? (
          <g stroke="var(--ink-line)" strokeWidth="0.6">
            {DIM_SCALE_MINOR_X.map((x) => (
              <line key={x} x1={x} y1="4" x2={x} y2="9" />
            ))}
          </g>
        ) : null}
      </svg>
    </div>
  );
}

function HalftonePhoto({
  src,
  alt,
  treatment,
  aspectRatio,
  subject,
  cap,
}: {
  src: string;
  alt: string;
  treatment: string;
  aspectRatio?: string;
  subject: ReactNode;
  cap: ReactNode;
}) {
  return (
    <div
      className="photo-halftone-placeholder photo-halftone-placeholder--live"
      data-treatment={treatment}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- halftone CSS filter pipeline */}
      <img className="photo-halftone-placeholder__img" src={src} alt={alt} />
      <div className="photo-halftone-mesh" aria-hidden />
      <span className="ph-subject">{subject}</span>
      <span className="ph-cap">{cap}</span>
    </div>
  );
}

export function AboutV3View() {
  return (
    <div id="about-v3">
      <AboutNav />
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <header id="hero" className="about-hero" data-screen-label="01 Hero">
        <span className="margin-note">DRAWING 04 · ABOUT</span>
        <span className="fig-stamp">FIG. 01 · HERO</span>

        <HeroBmwSilhouette />

        <dl className="id-strip" aria-label="Identity">
          <dt>PART NO.</dt>
          <dd>04 / 06</dd>
          <dt>BASED</dt>
          <dd>DEN → REMOTE</dd>
          <dt>ROLE</dt>
          <dd>CX · PRODUCT · SERVICE</dd>
          <dt>REV.</dt>
          <dd>02 · TIER A</dd>
        </dl>

        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <p className="kicker">ABOUT · MATT STANGL · CX, PRODUCT &amp; SERVICE DESIGN LEADER</p>
            <h1 className="about-hero__h1">
              I work on old BMWs in my <em>garage.</em>
            </h1>
            <p className="about-hero__sub">
              <b>Alice</b> is a 1978 R100/7. <b>Ayda</b> is a 1977 R75/7. They&apos;ve taught me more about leadership than most
              management books — care and forethought, respect for what can go wrong, and the discipline of designing for systems
              people can actually service. The same instincts show up in how I lead design.
            </p>
          </div>

          <div className="about-hero__photo">
            <HalftonePhoto
              src="/about/photos/ayda-and-asylum.jpg"
              alt="Ayda parked in front of abandoned brick asylum"
              treatment="HALFTONE · TEAL"
              subject="Ayda + asylum"
              cap={
                <>
                  <b>AYDA</b> · 1977 R75/7 · ASYLUM
                </>
              }
            />
            <p className="photo-caption">
              FIG · <b>AYDA</b> · ASYLUM
            </p>
          </div>
        </div>
      </header>

      <DimScale label="↓ posture · what I optimize for" />

      <section className="tradeoffs" aria-label="Trade-offs at Speed" data-screen-label="02 Trade-offs at Speed">
        <span className="margin-note">FIG. 02 · POSTURE</span>
        <span className="fig-stamp">FIG. 02 · POSTURE</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>02 / 06</dd>
          <dt>ITEMS</dt>
          <dd>01 → 05</dd>
          <dt>PILLAR</dt>
          <dd>POSTURE</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <header className="about-section-head">
          <div>
            <p className="kicker">FIG. 02 · TRADE-OFFS</p>
            <h2>
              Trade-offs at <em>Speed.</em>
            </h2>
            <DecisionDiagram />
          </div>
          <p className="about-section-head__sub">What I optimize for when there&apos;s no time to negotiate.</p>
        </header>

        <div className="tradeoffs__inner">
          <div className="anchor-statement">
            <h3 className="anchor-statement__h">
              Clarity even over <em>comfort.</em> <span className="ref-code">REF · 02-A</span>
            </h3>
            <p className="anchor-statement__body">
              I&apos;ll surface the awkward trade-off in the room so we can align, rather than letting ambiguity linger to preserve
              politeness.
            </p>
          </div>

          <figure className="photo-break">
            <HalftonePhoto
              src="/about/photos/matt-shadow-ayda.jpg"
              alt="Shadow shot from saddle of Ayda — POV from the rider"
              treatment="HALFTONE · TEAL"
              aspectRatio="16/9"
              subject="Shadow from the saddle"
              cap={
                <>
                  POV · <b>AYDA</b> · ROAD
                </>
              }
            />
            <figcaption className="photo-caption">
              POV · <b>AYDA</b> · ROAD
            </figcaption>
          </figure>

          <div className="statement-list">
            <article className="statement">
              <p className="statement__num">
                EVEN-OVER · <b>02</b>
              </p>
              <h3 className="statement__h">
                Progress even over <em>perfection.</em> <span className="ref-code">REF · 02-B · CF. WIPRO</span>
              </h3>
              <p className="statement__body">
                I&apos;d rather ship a testable slice that moves adoption than polish a narrative nobody can execute against.
              </p>
            </article>

            <article className="statement">
              <p className="statement__num">
                EVEN-OVER · <b>03</b>
              </p>
              <h3 className="statement__h">
                Innovation even over <em>optimization.</em> <span className="ref-code">REF · 02-C · CF. AUTODESK</span>
              </h3>
              <p className="statement__body">
                When the model is wrong, tuning the old journey won&apos;t save it. I&apos;ll push for a new hypothesis worth validating.
              </p>
            </article>

            <article className="statement">
              <p className="statement__num">
                EVEN-OVER · <b>04</b>
              </p>
              <h3 className="statement__h">
                Curiosity even over <em>certainty.</em> <span className="ref-code">REF · 02-D</span>
              </h3>
              <p className="statement__body">
                I hold strong opinions loosely. Discovery can overturn my favorite idea if the evidence says so.
              </p>
            </article>

            <article className="statement">
              <p className="statement__num">
                EVEN-OVER · <b>05</b>
              </p>
              <h3 className="statement__h">
                Empowering others even over <em>personal recognition.</em>{" "}
                <span className="ref-code">REF · 02-E · CF. CENTAUR</span>
              </h3>
              <p className="statement__body">
                I care that teams own the system after I leave. Shared language, artifacts, and rituals beat hero moments.
              </p>
            </article>
          </div>
        </div>
      </section>

      <DimScale label="↘ method · how the work gets done" />

      <section className="service-manual" aria-label="Service Manual" data-screen-label="03 Service Manual">
        <span className="margin-note">FIG. 03 · METHOD · DOUBLE DIAMOND</span>
        <span className="fig-stamp">FIG. 03 · METHOD</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>03 / 06</dd>
          <dt>DIAGRAM</dt>
          <dd>DOUBLE DIAMOND</dd>
          <dt>PHASES</dt>
          <dd>DISCOVER → DELIVER</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="service-manual__bg" aria-hidden>
          <div
            className="factory-diagram-placeholder factory-diagram-placeholder--live"
            data-tafel="TAFEL 3 · ENGINE · BMW AIRHEAD"
            style={{ aspectRatio: "16/10", height: "100%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="factory-diagram-placeholder__img"
              src="/about/diagrams/engine-fiche.jpg"
              alt=""
              width={1600}
              height={1000}
            />
            <span className="ph-cap">TAFEL 3 · ENGINE · BMW AIRHEAD</span>
          </div>
        </div>

        <div className="service-manual__inner">
          <header className="about-section-head">
            <div>
              <p className="kicker">FIG. 03 · SERVICE MANUAL</p>
              <h2>
                Service <em>Manual.</em>
              </h2>
            </div>
            <p className="about-section-head__sub">
              How the work gets done — discovery and delivery, with every inner move on the table.
            </p>
          </header>

          <div className="journey-span">
            <span className="journey-span__bookend">
              FROM &nbsp;·&nbsp; <b>Don&apos;t know / could be</b>
            </span>
            <span className="journey-span__bookend journey-span__bookend--right">
              <b>Do know / should be</b> &nbsp;·&nbsp; TO
            </span>
          </div>

          <div className="dd">
            <div className="dd__diamonds">
              <div className="dd__diamond">
                <span className="dd__mode-tag dd__mode-tag--left">↤ DIVERGING</span>
                <span className="dd__mode-tag dd__mode-tag--right">CONVERGING ↦</span>

                <svg className="dd__diamond-svg" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
                  <polygon points="0,50 100,2 200,50 100,98" fill="none" stroke="rgba(232,239,238,0.18)" strokeWidth="0.6" strokeDasharray="2 2" />
                  <line x1="100" y1="2" x2="100" y2="98" stroke="rgba(29,207,170,0.35)" strokeWidth="0.6" strokeDasharray="1 2" />
                </svg>

                <div className="dd__phase dd__phase--diverging">
                  <p className="dd__phase-mode">Diverging</p>
                  <h3 className="dd__phase-label">Discover</h3>
                  <p className="dd__phase-note">Research phase · TAFEL D1</p>
                  <p className="dd__phase-pillar">Pillar · Open the brief</p>
                  <ol className="dd__phase-list">
                    <li>Conduct primary research</li>
                    <li>Define research areas and methods</li>
                    <li>Conduct secondary research</li>
                  </ol>
                </div>

                <div className="dd__phase">
                  <p className="dd__phase-mode">Converging</p>
                  <h3 className="dd__phase-label">Define</h3>
                  <p className="dd__phase-note">Synthesis phase · TAFEL D2</p>
                  <ol className="dd__phase-list">
                    <li>Build themes &amp; clusters</li>
                    <li>Find insights</li>
                    <li>Deduce opportunity areas</li>
                    <li>Form HMW questions</li>
                  </ol>
                </div>
              </div>

              <div className="dd__bridge" role="note">
                <p className="dd__bridge-label">BRIDGE · REF 03-X</p>
                <div className="dd__bridge-list">
                  <span>
                    <b>Final brief</b>
                  </span>
                  <span>·</span>
                  <span>
                    <b>HMW question</b>
                  </span>
                  <span>·</span>
                  <span>
                    <b>Strategy</b>
                  </span>
                </div>
              </div>

              <div className="dd__diamond">
                <span className="dd__mode-tag dd__mode-tag--left">↤ DIVERGING</span>
                <span className="dd__mode-tag dd__mode-tag--right">CONVERGING ↦</span>

                <svg className="dd__diamond-svg" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
                  <polygon points="0,50 100,2 200,50 100,98" fill="none" stroke="rgba(232,239,238,0.18)" strokeWidth="0.6" strokeDasharray="2 2" />
                  <line x1="100" y1="2" x2="100" y2="98" stroke="rgba(29,207,170,0.35)" strokeWidth="0.6" strokeDasharray="1 2" />
                </svg>

                <div className="dd__phase dd__phase--diverging">
                  <p className="dd__phase-mode">Diverging</p>
                  <h3 className="dd__phase-label">Develop</h3>
                  <p className="dd__phase-note">Ideation phase · TAFEL D3</p>
                  <p className="dd__phase-pillar">Pillar · Ideate</p>
                  <ol className="dd__phase-list">
                    <li>Set ideas, design vision &amp; hypotheses</li>
                    <li>Evaluate first ideas</li>
                  </ol>
                </div>

                <div className="dd__phase">
                  <p className="dd__phase-mode">Converging</p>
                  <h3 className="dd__phase-label">Deliver</h3>
                  <p className="dd__phase-note">Implementation phase · TAFEL D4</p>
                  <ol className="dd__phase-list">
                    <li>Prototype, test &amp; analyze</li>
                    <li>Learn, iterate &amp; repeat</li>
                    <li>Build, iterate &amp; repeat</li>
                    <li>Ship and observe</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="dd__diamond-labels">
              <span>
                <b>Doing the right things</b>
              </span>
              <span>·</span>
              <span>
                <b>Doing things right</b>
              </span>
            </div>
          </div>

          <div className="sm-photos">
            <figure className="sm-photos__anchor" style={{ margin: 0 }}>
              <HalftonePhoto
                src="/about/photos/cylinder-head.png"
                alt="Cylinder head detail · Alice"
                treatment="HALFTONE · TEAL"
                aspectRatio="4/3"
                subject="Cylinder head detail"
                cap={
                  <>
                    FIG · <b>CYLINDER HEAD</b> · ALICE · 1978 R100/7
                  </>
                }
              />
              <figcaption className="photo-caption">
                FIG · <b>CYLINDER HEAD</b> · ALICE
              </figcaption>
            </figure>

            <figure className="sm-photos__support" style={{ margin: 0 }}>
              <HalftonePhoto
                src="/about/photos/matt-handling-electronics.jpg"
                alt="Matt handling ignition electronics on Alice"
                treatment="HALFTONE · TEAL"
                aspectRatio="4/3"
                subject="Matt handling electronics"
                cap={
                  <>
                    MATT · <b>IGNITION ELECTRONICS</b> · ALICE
                  </>
                }
              />
              <figcaption className="photo-caption">
                MATT · <b>IGNITION ELECTRONICS</b> · ALICE
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <DimScale label="→ feel · what working together is like" minors={false} />

      <section className="riding" aria-label="Riding Conditions" data-screen-label="04 Riding Conditions">
        <span className="margin-note">FIG. 04 · FEEL</span>
        <span className="fig-stamp">FIG. 04 · FEEL</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>04 / 06</dd>
          <dt>ITEMS</dt>
          <dd>01 → 04</dd>
          <dt>TOLERANCE</dt>
          <dd>±0.05</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <header className="about-section-head">
          <div>
            <p className="kicker">FIG. 04 · RIDING CONDITIONS</p>
            <h2>
              Riding <em>Conditions.</em>
            </h2>
            <CompassRose />
          </div>
          <p className="about-section-head__sub">What working with me actually feels like.</p>
        </header>

        <div className="riding__inner">
          {/* Editorial: About.html intro (“Four conditions…”) omitted — not present in COPY-about.md */}
          <div className="riding__header-row riding__header-row--photo-only">
            <div className="riding__photo">
              <HalftonePhoto
                src="/about/photos/matt-in-window-with-alice.jpg"
                alt="Matt in shop window reflection with Alice"
                treatment="HALFTONE · TEAL"
                subject="Matt in window with Alice"
                cap={
                  <>
                    MATT + <b>ALICE</b> · 1978 R100/7 · SHOP WINDOW
                  </>
                }
              />
              <p className="photo-caption">
                MATT + <b>ALICE</b> · SHOP WINDOW
              </p>
            </div>
          </div>

          <div className="riding__grid">
            <article className="riding__item">
              <p className="kicker">01 · N · 0°</p>
              <h3 className="riding__item-h">
                Calm in <em>ambiguity.</em>
              </h3>
              <p className="riding__item-body">I make messy situations feel solvable. Structure without shutting people down.</p>
              <p className="precision-tag">
                TOL. <b>±0.05</b> · BEARING <b>0°</b>
              </p>
            </article>

            <article className="riding__item">
              <p className="kicker">02 · E · 90°</p>
              <h3 className="riding__item-h">
                Translation, not <em>jargon.</em>
              </h3>
              <p className="riding__item-body">
                Execs, practitioners, and customers can leave the same room with shared language they&apos;ll actually use.
              </p>
              <p className="precision-tag">
                TOL. <b>±0.05</b> · BEARING <b>90°</b>
              </p>
            </article>

            <article className="riding__item">
              <p className="kicker">03 · S · 180°</p>
              <h3 className="riding__item-h">
                Adoption in the same breath as <em>idea.</em>
              </h3>
              <p className="riding__item-body">I design for what happens Monday, not just the workshop Friday.</p>
              <p className="precision-tag">
                TOL. <b>±0.05</b> · BEARING <b>180°</b>
              </p>
            </article>

            <article className="riding__item">
              <p className="kicker">04 · W · 270°</p>
              <h3 className="riding__item-h">
                Craft with <em>accountability.</em>
              </h3>
              <p className="riding__item-body">
                Narrative, service, and system design stay tied to outcomes. Beauty that doesn&apos;t ship doesn&apos;t count.
              </p>
              <p className="precision-tag">
                TOL. <b>±0.05</b> · BEARING <b>270°</b>
              </p>
            </article>
          </div>
        </div>
      </section>

      <DimScale label="↘ history · the road so far" />

      <section className="mileage" aria-label="Mileage Log" data-screen-label="05 Mileage Log">
        <span className="margin-note">FIG. 05 · HISTORY</span>
        <span className="fig-stamp">FIG. 05 · HISTORY</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>05 / 06</dd>
          <dt>RANGE</dt>
          <dd>15+ YR</dd>
          <dt>PHASES</dt>
          <dd>I → III</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <header className="about-section-head">
          <div>
            <p className="kicker">FIG. 05 · MILEAGE LOG</p>
            <h2>
              Mileage <em>Log.</em>
            </h2>
          </div>
          {/* Subhead from About.html omitted — not specified in COPY-about.md body fields */}
        </header>

        <div className="mileage__inner">
          <InstrumentCluster />

          <div className="mileage__prose">
            <p className="mileage__para">
              <span className="phase-label">PHASE I · CREATIVE</span>
              I started in creative — narrative, craft, audience. Brand stories were the work, and learning to <b>watch closely</b>{" "}
              was the discipline. That instinct never left.
            </p>
            <p className="mileage__para">
              <span className="phase-label">PHASE II · ENTERPRISE</span>
              From creative I moved into consulting and enterprise transformation. Service models, experience systems, organizational
              alignment for clients including <b>Autodesk</b>, <b>Wipro (Estée Lauder)</b>, and <b>EY (Georgia DPH, Humana, Citi)</b>.
              The through-line was always the same: take fragmented experiences and rebuild them as structured, scalable systems.
            </p>
            <p className="mileage__para">
              <span className="phase-label">PHASE III · SHIPPED</span>
              What defines the work isn&apos;t just strategy. It&apos;s <b>translating strategy into systems, teams, and execution that ship</b>{" "}
              — and keep running after I&apos;m gone.
            </p>
          </div>

          <figure className="mileage__photo" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <HalftonePhoto
              src="/about/photos/mounting-head.png"
              alt="Mounting cylinder head on Alice — engine reassembly mid-process"
              treatment="HALFTONE · TEAL"
              subject="Mounting the head"
              cap={
                <>
                  FIG · <b>ENGINE REASSEMBLY</b> · ALICE · 1978 R100/7
                </>
              }
            />
            <figcaption className="photo-caption" style={{ textAlign: "center" }}>
              FIG · <b>ENGINE REASSEMBLY</b> · ALICE
            </figcaption>
          </figure>
        </div>
      </section>

      <DimScale label="↓ off-shift · day&apos;s done" />

      <section className="off-shift" aria-label="Off-Shift" data-screen-label="06 Off-Shift">
        <span className="margin-note">FIG. 06 · OFF-SHIFT</span>
        <span className="fig-stamp">FIG. 06 · OFF-SHIFT</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>06 / 06</dd>
          <dt>STATUS</dt>
          <dd>OFF-SHIFT</dd>
          <dt>BAYS</dt>
          <dd>02 · ALICE · AYDA</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="off-shift__inner">
          <div className="off-shift__copy">
            <p className="kicker">
              FIG. 06 · OFF-SHIFT <span className="ref-code">CF. SECTIONS 02-05 · APPLIED</span>
            </p>
            <h2 className="off-shift__h">
              Off-<em>Shift.</em>
            </h2>
            <p className="off-shift__body">
              Off the clock: I write, ride Alice and Ayda, and stay close to people who matter. The work matters to me — but
              it&apos;s not the only thing. That balance shows up in how I think, how I lead, and what I build.
            </p>

            <GarageLayout />
          </div>

          <figure className="off-shift__photo" style={{ margin: 0 }}>
            <HalftonePhoto
              src="/about/photos/garage.jpg"
              alt="Alice and Ayda parked in the garage, day done"
              treatment="HALFTONE · TEAL"
              subject="The garage, day done"
              cap={
                <>
                  <b>ALICE &amp; AYDA</b> · GARAGE · OFF-SHIFT
                </>
              }
            />
            <figcaption className="photo-caption">
              <b>ALICE &amp; AYDA</b> · GARAGE
            </figcaption>
          </figure>
        </div>
      </section>

      <footer className="sheet">
        <div className="sheet__cell">
          <span>SHEET</span>
          <b>04 / 06</b>
        </div>
        <div className="sheet__cell">
          <span>SCALE</span>
          <b>NOT TO SCALE</b>
        </div>
        <div className="sheet__cell">
          <span>DRAWN</span>
          <b>M. STANGL</b>
        </div>
        <div className="sheet__cell">
          <span>DATE</span>
          <b>2026-04</b>
        </div>
        <div className="sheet__cell">
          <span>REV.</span>
          <b>02 · TIER A</b>
        </div>
        <div className="sheet__cell">
          <span>PAGE</span>
          <b>ABOUT</b>
        </div>
      </footer>
    </div>
  );
}
