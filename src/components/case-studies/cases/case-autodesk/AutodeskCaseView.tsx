"use client";

import Link from "next/link";
import { CaseHero } from "../../CaseHero";
import { CasePicker } from "../../CasePicker";
import { AutodeskJourneyArtifact } from "./AutodeskJourneyArtifact";

const DIM_TICKS = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800];

function DimRibbon({ label }: { label: string }) {
  return (
    <div className="dim-with-scale">
      <p className="dim">{label}</p>
      <svg
        className="dim-scale"
        viewBox="0 0 800 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="4" x2="800" y2="4" stroke="var(--ink-line)" strokeWidth="1" />
        <g stroke="var(--ink-3)" strokeWidth="1">
          {DIM_TICKS.map((x) => (
            <line key={x} x1={x} y1="4" x2={x} y2="14" />
          ))}
        </g>
      </svg>
    </div>
  );
}

/**
 * Tier-A port of the Autodesk case study.
 * Mirrors `WiproCaseView` structure: margin-note + fig-stamp + (optional)
 * section-stamp per section, kicker + h2 + case-section__inner, sheet footer.
 * Furniture density matches Wipro (single short marginalia per section).
 * Body copy renders the "Tier 2 — Tight version" blocks from
 * COPY-case-autodesk.md; locked stage labels and headlines render as written.
 */
export function AutodeskCaseView() {
  return (
    <div className="case-autodesk-portfolio case-autodesk-body">
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <CaseHero
        picker={<CasePicker activeSlug="autodesk" />}
        caseNumber="03"
        totalCases={5}
        marginNote="DRAWING 01 · HERO"
        figStamp="FIG. 03 · AUTODESK / CUSTOMER VALUE JOURNEY"
        tag="01 · BRIEF · CASE 03 OF 05"
        basedLine="DEN · REMOTE"
        roleLine="SERVICE DESIGN · REVENUE"
        headline={
          <>
            Autodesk&apos;s <em>106% NRR</em> design.
            <span className="autodesk-hero-h1-line2">The customer value journey behind it.</span>
          </>
        }
        subhead={
          <>
            I <em>led the design</em>. I earned the modernization. The design demanded it.
          </>
        }
        heroBrief={
          <p>
            Autodesk put a <b>$10B revenue target</b> on the wall. Outcome-and-value-led customer
            planning became top-priority modernization. The <b>106% NRR projection</b> inside that
            target meant customer outcomes and Autodesk&apos;s revenue had to be the same line. The
            work was to design that line.
          </p>
        }
        heroBgphotoSlot={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- Tier-A shared hero pipeline (hero-chrome.css) */}
            <img
              className="hero__bgphoto-img"
              src="/case-studies/autodesk-journey-mapping-halftone.png"
              alt=""
              decoding="async"
              fetchPriority="high"
            />
            <div className="hero__bgphoto-halftone" aria-hidden="true" />
            <div className="hero__bgphoto-grain" aria-hidden="true" />
            <div className="hero__bgphoto-scrim" aria-hidden="true" />
            <div className="hero__bgphoto-fadebottom" aria-hidden="true" />
          </>
        }
        metaSlot={
          <>
            <div className="hero__meta-cell">
              <dt>PART NO.</dt>
              <dd>ADSK-SVC-01</dd>
            </div>
            <div className="hero__meta-cell">
              <dt>WINDOW</dt>
              <dd>FY22 – FY24</dd>
            </div>
            <div className="hero__meta-cell">
              <dt>PRIORITY</dt>
              <dd>
                <b>$10B</b> revenue strategic priority
              </dd>
            </div>
            <div className="hero__meta-cell">
              <dt>SCOPE</dt>
              <dd>Customer Planning · Outcome &amp; Value Selling</dd>
            </div>
            <div className="hero__meta-cell">
              <dt>REV.</dt>
              <dd>02 · CURRENT</dd>
            </div>
          </>
        }
      />

      <DimRibbon label="↓ diagnosis · what the NRR target asked for" />

      {/* Section 02 · Diagnosis */}
      <section className="diagnosis" aria-label="Diagnosis" data-screen-label="02 Diagnosis">
        <span className="margin-note">DRAWING 02 · DIAGNOSIS</span>
        <span className="fig-stamp">FIG. 02 · SALES-SUCCESS FULCRUM</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>02 / 05</dd>
          <dt>CLAIM</dt>
          <dd>SALES-SUCCESS FULCRUM</dd>
          <dt>BASELINE</dt>
          <dd>PRE-FY22 FUNNEL SPLIT</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="diagnosis__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">02 · DIAGNOSIS · WHAT THE NRR TARGET ACTUALLY ASKED FOR</p>
            <h2>
              Growing legacy VIPs means breaking down the <em>sales-success fulcrum.</em>
            </h2>
          </header>

          <p className="autodesk-prose">
            Sales owned acquisition. Success owned adoption. Each segment optimized; none optimized
            for the journey. The diagnosis: a customer planning experience designed end-to-end
            across the lifecycle &mdash; naming customer business outcomes, aligning solutions,
            planning delivery, tracking value over time.
          </p>

          <blockquote className="autodesk-pull">
            <p>
              &ldquo;The higher the investment and/or change, the higher the required trust. But
              trust is something personal. That is the reason people buy from people they
              understand.&rdquo;
            </p>
            <footer>ADSK Field Rep &middot; customer interview &middot; FY24 prototype testing</footer>
          </blockquote>
        </div>
      </section>

      <DimRibbon label="↓ approach · design as directional clarity" />

      {/* Section 03 · Approach */}
      <section className="approach" aria-label="Approach" data-screen-label="03 Approach">
        <span className="margin-note">DRAWING 03 · APPROACH</span>
        <span className="fig-stamp">FIG. 03 · CSXD SPRINT</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>03 / 05</dd>
          <dt>CLAIM</dt>
          <dd>DIRECTIONAL DOCUMENT</dd>
          <dt>BASELINE</dt>
          <dd>4-PHASE SPRINT · 2 TIERS</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="approach__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">03 · APPROACH · DESIGN AS DIRECTIONAL CLARITY</p>
            <h2>
              We didn&apos;t design a workflow. We designed the <em>directional document.</em>
            </h2>
          </header>

          <p className="autodesk-prose">
            CSXD <span className="autodesk-prose-paren">(Customer Strategy &amp; Experience Design)</span>{" "}
            design sprint: Understand, Define, Develop, Deliver. Interviewed 37 GTM employees,
            prototyped with 34 customers, surveyed 288 employees. Output: an end-to-end journey
            across five phases &mdash; identify outcomes, evaluate solutions, create a plan, execute,
            assess value. Two service tiers (Growth Plus 700&ndash;1,000 accounts, Nurture Plus
            400&ndash;600) split delivery without splitting the journey.
          </p>
        </div>
      </section>

      <DimRibbon label="↓ design · five-phase service assembly" />

      {/* Section 04 · Design — load-bearing artifact */}
      <section className="design" aria-label="Design" data-screen-label="04 Design">
        <span className="margin-note">DRAWING 04 · DESIGN</span>
        <span className="fig-stamp">FIG. 04 · SERVICE ASSEMBLY</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>04 / 05</dd>
          <dt>CLAIM</dt>
          <dd>5 PHASES · 2 TIERS · 1 JOURNEY</dd>
          <dt>BASELINE</dt>
          <dd>FRONTSTAGE / BACKSTAGE SPLIT</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="design__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">04 · DESIGN · THE FIVE-PHASE SERVICE ASSEMBLY</p>
            <h2>
              Five phases. Two tiers. <em>One journey.</em>
            </h2>
            <p className="case-section-head__sub">
              Five phases of customer planning &mdash; identify outcomes, evaluate solutions, create a
              plan, execute, assess value &mdash; exploded into frontstage and backstage. Customers see
              workshops, check-ins, QBRs. The design lived in the backstage system that made those
              run: enabled people, standard processes, shared platform.
            </p>
          </header>
        </div>

        {/* Lifted artifact (legacy `.adsk-hero` block, scoped + React-toggled) */}
        <div className="autodesk-blueprint-wrap">
          <AutodeskJourneyArtifact />
        </div>
      </section>

      <DimRibbon label="↓ delta · what the design set in motion" />

      {/* Section 05 · Delta — load-bearing sentence */}
      <section className="delta-autodesk" aria-label="Delta" data-screen-label="05 Delta">
        <span className="margin-note">DRAWING 05 · DELTA</span>
        <span className="fig-stamp">FIG. 05 · GRAVITATIONAL PULL</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>05 / 05</dd>
          <dt>CLAIM</dt>
          <dd>DESIGN PULLED MODERNIZATION</dd>
          <dt>BASELINE</dt>
          <dd>106% NRR · 8-FIG TECH</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="delta-autodesk__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">05 · DELTA · WHAT THE DESIGN SET IN MOTION</p>
            <h2>
              The design&apos;s downstream consequences were{" "}
              <em>larger than the design itself.</em>
            </h2>
          </header>

          <div className="autodesk-prose autodesk-prose--delta">
            <p>
              The <b>106% NRR projection</b> required a journey the existing tech couldn&apos;t
              deliver. The design made the gap visible. Once visible, it had to be closed.{" "}
              <b>100+ CX &amp; EX outcomes</b> surfaced. <b>8-figure tech modernization</b>{" "}
              initiated. <b>5 program areas</b> mobilized.
            </p>
            <p className="autodesk-load-bearing">
              I led the design. I earned the modernization work for my larger org. The design
              demanded it.
            </p>
          </div>

          <div className="autodesk-outcomes" aria-label="Delta outcomes">
            <div className="autodesk-outcomes-cell">
              <span className="v">
                <span className="accent">100+</span>
              </span>
              <span className="k">CX &amp; EX outcomes surfaced</span>
            </div>
            <div className="autodesk-outcomes-cell">
              <span className="v">
                <span className="accent">8-fig</span>
              </span>
              <span className="k">Tech modernization initiated</span>
            </div>
            <div className="autodesk-outcomes-cell">
              <span className="v">
                <span className="accent">5</span>
              </span>
              <span className="k">Program areas mobilized</span>
            </div>
            <div className="autodesk-outcomes-cell">
              <span className="v">
                <span className="accent">106%</span>
              </span>
              <span className="k">NRR path · journey design as instrument</span>
            </div>
          </div>
        </div>
      </section>

      <DimRibbon label="↓ lesson · notes from the design rationale" />

      {/* Section 06 · Lesson — closes on the third rationale note, no closing aphorism */}
      <section className="lesson-autodesk" aria-label="Lesson" data-screen-label="06 Lesson">
        <span className="margin-note">DRAWING 06 · LESSON</span>
        <span className="fig-stamp">FIG. 06 · DESIGN RATIONALE</span>

        <div className="lesson-autodesk__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">06 · LESSON · WHAT THE DESIGN TAUGHT THE ORG</p>
            <h2>
              Three notes from the <em>design rationale.</em>
            </h2>
          </header>

          <ol className="autodesk-rationale" aria-label="Design rationale notes">
            <li className="autodesk-rationale-note">
              <span className="autodesk-rationale-k">
                01 · TRADEOFF · Differentiated experience vs. scalable delivery.
              </span>
              <p>
                Two tiers share one journey. Growth Plus runs 1:few, high-touch. Nurture Plus runs
                1:many, digital-guided. Same phases &mdash; different delivery assembly.
              </p>
            </li>
            <li className="autodesk-rationale-note">
              <span className="autodesk-rationale-k">02 · SYSTEM · Backstage did the work.</span>
              <p>
                Customers saw five phases. The design lived in the backstage &mdash; enabled people,
                shared process, platform telemetry across Gainsight and SFDC.
              </p>
            </li>
            <li className="autodesk-rationale-note">
              <span className="autodesk-rationale-k">
                03 · OUTCOME · The investment was the validation.
              </span>
              <p>
                The org&apos;s response to the design &mdash; <b>100+ outcomes</b> prioritized,{" "}
                <b>8-figure tech modernization</b> initiated, <b>5 program areas</b> mobilized
                &mdash; was the proof the design worked. The 106% NRR path now has the
                infrastructure to be delivered against.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <DimRibbon label="↘ Next case" />

      {/* Closing — handoff CTA (no aphorism per spec) */}
      <section className="closing" aria-label="Closing" data-screen-label="07 Handoff">
        <span className="margin-note">DRAWING 07 · HANDOFF</span>
        <span className="fig-stamp">FIG. 07 · HANDOFF</span>

        <div className="closing__inner">
          <p className="autodesk-handoff-kicker">Handoff · the larger story</p>
          <h3 className="autodesk-handoff-headline">
            The journey design here. The transformation that delivered it elsewhere.
          </h3>

          <div className="handoff-pair" aria-label="Handoff CTAs">
            <Link href="/case-studies/wipro">
              <span>
                <span className="handoff-pair__lbl">Next case · 04 of 05</span>
                <span className="handoff-pair__ttl">
                  Open Wipro case · <span className="accent">Lockouts redesigned</span>
                </span>
              </span>
              <span className="handoff-pair__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/case-studies" className="handoff-pair--back">
              <span>
                <span className="handoff-pair__lbl">Back to all</span>
                <span className="handoff-pair__ttl">Selected work · five builds</span>
              </span>
              <span className="handoff-pair__arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="sheet" aria-label="Sheet metadata">
        <div className="sheet__cell">
          <span>SHEET</span>
          <b>03 / 05</b>
        </div>
        <div className="sheet__cell">
          <span>DRAWN</span>
          <b>M. STANGL</b>
        </div>
        <div className="sheet__cell">
          <span>BASED</span>
          <b>DEN · REMOTE</b>
        </div>
        <div className="sheet__cell">
          <span>SCALE</span>
          <b>1 : 1</b>
        </div>
        <div className="sheet__cell">
          <span>REV.</span>
          <b>v2026.04</b>
        </div>
        <div className="sheet__cell">
          <span>PAGE</span>
          <b>CASE 03 · AUTODESK</b>
        </div>
      </footer>
    </div>
  );
}
