"use client";

import Link from "next/link";
import { DimScale } from "../../DimScale";
import { CaseHero } from "../../CaseHero";
import { CasePicker } from "../../CasePicker";
import { RevenueEnginePatentPlate } from "./revenue-engine/RevenueEnginePatentPlate";
import { AutodeskOpportunitiesMatrix } from "./AutodeskOpportunitiesMatrix";

/**
 * Tier-A port of the Autodesk case study (v3).
 *
 * Section order is deliberately argument-led, not canonical Tier A:
 *   01 BRIEF (hero)          — context, NRR claim
 *   02 DESIGN (artifact)     — the load-bearing visual, immediately after hero
 *   03 DIAGNOSIS             — what the artifact solved
 *   04 APPROACH              — how the artifact was built (compressed)
 *   05 DELTA                 — what the design pulled into motion
 *   06 LESSON                — three notes from the design rationale
 *
 * Every fiche stamp (FIG.) and section-stamp DRAWING NO. follows this order,
 * /06 total. Sheet footer "03 / 05" refers to the case study's picker position
 * (case 3 of 5), not the section count, so it stays.
 */
export function AutodeskCaseView() {
  return (
    <div className="case-autodesk-portfolio case-autodesk-body">
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <CaseHero
        heroImageSrc="/case-studies/autodesk-design-manufacturing-halftone.png"
        picker={<CasePicker activeSlug="autodesk" />}
        caseNumber="03"
        totalCases={5}
        marginNote="DRAWING 01 · HERO"
        figStamp="FIG. 01 · HERO"
        tag="01 · BRIEF · CASE 03 OF 05"
        basedLine="DEN · REMOTE"
        roleLine="SERVICE DESIGN · REVENUE"
        headline={<>Autodesk&apos;s <em>106% NRR</em> design.</>}
        subhead={
          <>
            The customer value journey behind Autodesk&apos;s 106% NRR path. I <em>led the design</em> that
            tied post-purchase outcomes to revenue.
          </>
        }
        metaSlot={
          <>
            <div className="hero__meta-cell">
              <dt>WINDOW</dt>
              <dd>
                FY22 – FY24 <small>post-purchase model launch</small>
              </dd>
            </div>
            <div className="hero__meta-cell">
              <dt>CLIENT</dt>
              <dd>
                Autodesk <small>Customer Success org</small>
              </dd>
            </div>
            <div className="hero__meta-cell">
              <dt>SCOPE</dt>
              <dd>
                <b>Customer planning · 5-phase journey</b>
                <small>Outcome &amp; value selling</small>
              </dd>
            </div>
            <div className="hero__meta-cell">
              <dt>POPULATION</dt>
              <dd>
                <b>~1,400 enterprise accounts</b>
                <small>Growth+ &amp; Nurture+ tiers</small>
              </dd>
            </div>
          </>
        }
      />

      <DimScale label="↓ design · five-phase service assembly" />

      {/* Section 02 · DESIGN — load-bearing artifact, lifted to top */}
      <section className="design" aria-label="Design" data-screen-label="02 Design">
        <span className="margin-note">DRAWING 02 · DESIGN</span>
        <span className="fig-stamp">FIG. 02 · SERVICE ASSEMBLY</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>02 / 06</dd>
          <dt>CLAIM</dt>
          <dd>5 PHASES · 2 TIERS · 1 JOURNEY</dd>
          <dt>BASELINE</dt>
          <dd>FRONTSTAGE / BACKSTAGE SPLIT</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="design__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">02 · DESIGN · THE FIVE-PHASE SERVICE ASSEMBLY</p>
            <h2>
              Five phases. Two tiers. <em>One journey.</em>
            </h2>
            <p className="case-section-head__sub">
              Five phases of customer planning: identify outcomes, evaluate solutions, create a
              plan, execute, assess value. Each exploded into frontstage and backstage. Customers see
              workshops, check-ins, QBRs. The design lived in the backstage system that made those
              run: enabled people, standard processes, shared platform.
            </p>
          </header>
        </div>

        <div className="autodesk-blueprint-wrap">
          <RevenueEnginePatentPlate />
        </div>
      </section>

      <DimScale label="↓ diagnosis · what the NRR target asked for" />

      {/* Section 03 · DIAGNOSIS — what the artifact solved */}
      <section className="diagnosis" aria-label="Diagnosis" data-screen-label="03 Diagnosis">
        <span className="margin-note">DRAWING 03 · DIAGNOSIS</span>
        <span className="fig-stamp">FIG. 03 · SALES-SUCCESS FULCRUM</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>03 / 06</dd>
          <dt>CLAIM</dt>
          <dd>SALES-SUCCESS FULCRUM</dd>
          <dt>BASELINE</dt>
          <dd>PRE-FY22 FUNNEL SPLIT</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="diagnosis__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">03 · DIAGNOSIS · WHAT THE NRR TARGET ACTUALLY ASKED FOR</p>
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

      <DimScale label="↓ approach · design as directional clarity" />

      {/* Section 04 · APPROACH — compressed: 2 sentences + 4-cell CSXD mono row */}
      <section className="approach" aria-label="Approach" data-screen-label="04 Approach">
        <span className="margin-note">DRAWING 04 · APPROACH</span>
        <span className="fig-stamp">FIG. 04 · CSXD SPRINT</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>04 / 06</dd>
          <dt>CLAIM</dt>
          <dd>DIRECTIONAL DOCUMENT</dd>
          <dt>BASELINE</dt>
          <dd>4-PHASE SPRINT · 2 TIERS</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="approach__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">04 · APPROACH · DESIGN AS OP MODEL EVOLUTION</p>
            <h2>
              We didn&apos;t design a desire. We designed <em>the future.</em>
            </h2>
          </header>

          <p className="autodesk-prose">
            A CSXD{" "}
            <span className="autodesk-prose-paren">(Customer Strategy &amp; Experience Design)</span>{" "}
            design sprint produced the journey above. The research surfaced{" "}
            <b>five opportunity areas</b>, prioritized by CX/EX value to Autodesk&apos;s
            customers, that the journey design had to deliver against.
          </p>
        </div>

        <div className="autodesk-opps-wrap">
          <AutodeskOpportunitiesMatrix />
        </div>
      </section>

      <DimScale label="↓ delta · what the design set in motion" />

      {/* Section 05 · Delta — load-bearing sentence */}
      <section className="delta-autodesk" aria-label="Delta" data-screen-label="05 Delta">
        <span className="margin-note">DRAWING 05 · DELTA</span>
        <span className="fig-stamp">FIG. 05 · GRAVITATIONAL PULL</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>05 / 06</dd>
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

      <DimScale label="↓ lesson · notes from the design rationale" />

      {/* Section 06 · Lesson — closes on the third rationale note, no closing aphorism */}
      <section className="lesson-autodesk" aria-label="Lesson" data-screen-label="06 Lesson">
        <span className="margin-note">DRAWING 06 · LESSON</span>
        <span className="fig-stamp">FIG. 06 · DESIGN RATIONALE</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>06 / 06</dd>
          <dt>CLAIM</dt>
          <dd>THREE DESIGN-RATIONALE NOTES</dd>
          <dt>BASELINE</dt>
          <dd>TRADEOFF · SYSTEM · OUTCOME</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="lesson-autodesk__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">06 · LESSON · WHAT THE DESIGN TAUGHT THE ORG</p>
            <h2>
              Three notes from the <em>design rationale.</em>
            </h2>
          </header>

          <ol className="autodesk-marginalia" aria-label="Design rationale notes">
            <li className="autodesk-marginalia-note">
              <div className="autodesk-marginalia-body">
                <span className="autodesk-marginalia-k">
                  <em>Note 01</em> · TRADEOFF
                </span>
                <h3 className="autodesk-marginalia-h">
                  Differentiated experience vs. scalable delivery.
                </h3>
                <p>
                  Two tiers share one journey. Growth Plus runs 1:few, high-touch. Nurture Plus
                  runs 1:many, digital-guided. Same phases &mdash; different delivery assembly.
                </p>
              </div>
              <dl className="autodesk-marginalia-stamp" aria-label="Note metadata">
                <dt>NOTE NO.</dt>
                <dd>01 / 03</dd>
                <dt>CLAIM</dt>
                <dd>ONE JOURNEY · TWO TIERS</dd>
                <dt>RATIO</dt>
                <dd>
                  GROWTH+ : NURTURE+
                  <small>700–1000 : 400–600</small>
                </dd>
                <dt>DELIVERY</dt>
                <dd>1:FEW / 1:MANY</dd>
              </dl>
            </li>
            <li className="autodesk-marginalia-note">
              <div className="autodesk-marginalia-body">
                <span className="autodesk-marginalia-k">
                  <em>Note 02</em> · SYSTEM
                </span>
                <h3 className="autodesk-marginalia-h">Backstage did the work.</h3>
                <p>
                  Customers saw five phases. The design lived in the backstage &mdash; enabled
                  people, shared process, platform telemetry across Gainsight and SFDC.
                </p>
              </div>
              <dl className="autodesk-marginalia-stamp" aria-label="Note metadata">
                <dt>NOTE NO.</dt>
                <dd>02 / 03</dd>
                <dt>CLAIM</dt>
                <dd>DESIGN LIVED IN BACKSTAGE</dd>
                <dt>LAYERS</dt>
                <dd>PEOPLE · PROCESS · PLATFORM</dd>
                <dt>SURFACES</dt>
                <dd>GAINSIGHT · SFDC</dd>
              </dl>
            </li>
            <li className="autodesk-marginalia-note">
              <div className="autodesk-marginalia-body">
                <span className="autodesk-marginalia-k">
                  <em>Note 03</em> · OUTCOME
                </span>
                <h3 className="autodesk-marginalia-h">The investment was the validation.</h3>
                <p>
                  The org&apos;s response was the proof the design worked: <b>100+ outcomes</b> prioritized,{" "}
                  <b>8-figure tech modernization</b> initiated, <b>5 program areas</b> mobilized.
                  The 106% NRR path now has the
                  infrastructure to be delivered against.
                </p>
              </div>
              <dl className="autodesk-marginalia-stamp" aria-label="Note metadata">
                <dt>NOTE NO.</dt>
                <dd>03 / 03</dd>
                <dt>CLAIM</dt>
                <dd>ORG MOBILIZATION AS PROOF</dd>
                <dt>PRIORITIZED</dt>
                <dd>100+ CX/EX OUTCOMES</dd>
                <dt>INITIATED</dt>
                <dd>8-FIGURE MODERNIZATION</dd>
                <dt>MOBILIZED</dt>
                <dd>5 PROGRAM AREAS</dd>
              </dl>
            </li>
          </ol>
        </div>
      </section>

      <DimScale label="↘ Next case" />

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
