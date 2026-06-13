"use client";

import Link from "next/link";
import { CaseHero } from "../../CaseHero";
import { CasePicker } from "../../CasePicker";
import { SyntheticEvidenceLadder } from "./SyntheticEvidenceLadder";
import { SyntheticFindingsCards } from "./SyntheticFindingsCards";
import { SyntheticFunnel } from "./SyntheticFunnel";
import { SyntheticPersonaCard } from "./SyntheticPersonaCard";
import { SyntheticPipelineLanes } from "./SyntheticPipelineLanes";

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
 * Synthetic Users — Tier A case (Case 02).
 * Six content sections + DRAWING 07 handoff (COPY-case-synthetic-users.md).
 */
export function SyntheticCaseView() {
  return (
    <div className="case-synthetic-portfolio case-synthetic-body">
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <CaseHero
        heroImageSrc="/case-studies/synthetic-users-robot-halftone.png"
        picker={<CasePicker activeSlug="synthetic" />}
        caseNumber="02"
        totalCases={5}
        marginNote="DRAWING 01 · HERO"
        figStamp="FIG. 01 · COVER"
        tag="01 · SIMULATION · CASE 02 OF 05"
        basedLine="DEN · REMOTE"
        roleLine="DESIGN & BUILD"
        headline={
          <>
            Synthetic users as a <em>research method.</em>
          </>
        }
        subhead={
          <>
            Nine personas, four QA environments, three findings self-review missed — the methodology,
            documented by running it on this portfolio. Structured personas, modeled on real practitioner
            worldviews, surface blind spots self-review can&apos;t.{" "}
            <em>Only if you build them the right way.</em>
          </>
        }
        metaSlot={
          <>
            <div className="hero__meta-cell">
              <dt>Method</dt>
              <dd>Persona-driven QA</dd>
            </div>
            <div className="hero__meta-cell">
              <dt>Personas</dt>
              <dd>
                <b>9</b> across 4 environments
              </dd>
            </div>
            <div className="hero__meta-cell">
              <dt>Artifact under test</dt>
              <dd>This portfolio · v3 pre-ship</dd>
            </div>
            <div className="hero__meta-cell">
              <dt>Outcome</dt>
              <dd>
                <b>10-item</b> prioritized backlog · 3 shipped changes
              </dd>
            </div>
          </>
        }
      />

      <DimRibbon label="↓ OUTCOME · FUNNEL" />

      <section className="outcome" aria-label="Outcome funnel" data-screen-label="02 Outcome">
        <span className="margin-note">DRAWING 02 · OUTCOME</span>
        <span className="fig-stamp">FIG. 02 · FUNNEL</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>02 / 07</dd>
          <dt>CLAIM</dt>
          <dd>9×4 → 18 → 10 → 3 → 3</dd>
          <dt>BASELINE</dt>
          <dd>SELF-REVIEW GAP</dd>
          <dt>LAST REV.</dt>
          <dd>06/26</dd>
        </dl>

        <div className="case-section__inner">
          <header className="case-section-head">
            <p className="kicker">02 · OUTCOME · THREE FINDINGS, ALL SHIPPED</p>
            <h2>
              Three findings self-review missed — <em>all three shipped.</em>
            </h2>
          </header>

          <SyntheticFunnel />

          <div className="synth-outcome-quote">
            <p>
              <b>Traceability from synthetic persona → specific design decision</b> is what separates
              research from a feedback loop.
            </p>
          </div>
        </div>
      </section>

      <DimRibbon label="↓ EVIDENCE · WHERE THE METHOD HOLDS" />

      <section className="evidence" aria-label="Evidence ladder" data-screen-label="03 Evidence">
        <span className="margin-note">DRAWING 03 · EVIDENCE</span>
        <span className="fig-stamp">FIG. 03 · LADDER</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>03 / 07</dd>
          <dt>CLAIM</dt>
          <dd>REPLACE / AUGMENT</dd>
          <dt>BASELINE</dt>
          <dd>SELF-REVIEW</dd>
          <dt>LAST REV.</dt>
          <dd>06/26</dd>
        </dl>

        <div className="case-section__inner">
          <header className="case-section-head">
            <p className="kicker">03 · EVIDENCE · WHERE THE METHOD HOLDS</p>
            <h2>
              What synthetic research <em>replaces</em>, augments, or fails to reach.
            </h2>
          </header>

          <SyntheticEvidenceLadder />
        </div>
      </section>

      <DimRibbon label="↓ PIPELINE · PORTFOLIO AS A RELEASE" />

      <section className="pipeline" aria-label="Pipeline" data-screen-label="04 Pipeline">
        <span className="margin-note">DRAWING 04 · PIPELINE</span>
        <span className="fig-stamp">FIG. 04 · ENVIRONMENTS</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>04 / 07</dd>
          <dt>CLAIM</dt>
          <dd>4 ENV · 4 GATES</dd>
          <dt>BASELINE</dt>
          <dd>PRE-SESSION</dd>
          <dt>LAST REV.</dt>
          <dd>06/26</dd>
        </dl>

        <div className="case-section__inner">
          <header className="case-section-head">
            <p className="kicker">04 · PIPELINE · PORTFOLIO AS A RELEASE</p>
            <h2>Two synthetic runs, parallel methodologies.</h2>
            <p className="case-section-head__sub">
              The pipeline runs different persona classes against different artifacts. Run A stress-tests
              the work itself across four environments, each environment matched to a persona class with a
              defined critical frame. Run B audits the design system against a single domain-expert persona.
              Both runs feed the same prioritized backlog.
            </p>
          </header>

          <SyntheticPipelineLanes />

          <SyntheticPersonaCard />

          <p className="synth-persona-principle">
            Each persona was built from a published worldview, not an invented archetype. For each:{" "}
            <em>what would this person look for first, and what would make them stop reading?</em>
          </p>

          <div className="synth-runb-block">
            <div className="synth-runb-block__tag">RUN B · Design system audit (parallel run)</div>
            <p>
              Run B is a different methodology against the same portfolio. One persona, a design-system
              domain expert, auditing visual grammar, voice consistency, cadence, and the cliché ledger across
              all pages, line by line. Not a stress test. A specification audit.
            </p>
            <p className="synth-runb-block__detail">
              Output: structured BEFORE/AFTER recommendations across 8 sections of the site. Findings
              integrated into the Run A prioritized backlog where they overlap; held separately where they
              don&apos;t.
            </p>
          </div>

          <div className="synth-artifact-links">
            <Link className="synth-artifact-link" href="/case-studies/synthetic-users/qa-report">
              <div>
                <div className="synth-artifact-link__eyebrow">
                  OPEN · 9 PERSONAS / 4 ENVIRONMENTS / 18 FINDINGS
                </div>
                <div className="synth-artifact-link__title">FIG. 04-A · QA REPORT (Run A full audit trail)</div>
              </div>
              <span className="synth-artifact-link__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link className="synth-artifact-link" href="/case-studies/synthetic-users/design-critique">
              <div>
                <div className="synth-artifact-link__eyebrow">OPEN · LINE-BY-LINE / 53 FIXES / 8 SECTIONS</div>
                <div className="synth-artifact-link__title">
                  FIG. 04-B · DESIGN CRITIQUE (Run B full audit trail)
                </div>
              </div>
              <span className="synth-artifact-link__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <DimRibbon label="↓ FINDINGS · WHAT SELF-REVIEW MISSED" />

      <section className="findings" aria-label="Findings" data-screen-label="05 Findings">
        <span className="margin-note">DRAWING 05 · FINDINGS</span>
        <span className="fig-stamp">FIG. 05 · SIGNALS</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>05 / 07</dd>
          <dt>CLAIM</dt>
          <dd>3 SIGNALS</dd>
          <dt>BASELINE</dt>
          <dd>SELF-REVIEW MISS</dd>
          <dt>LAST REV.</dt>
          <dd>06/26</dd>
        </dl>

        <div className="case-section__inner">
          <header className="case-section-head">
            <p className="kicker">05 · FINDINGS · WHAT SELF-REVIEW MISSED</p>
            <h2>What self-review missed.</h2>
          </header>

          <SyntheticFindingsCards />

          <div className="synth-runb-findings">
            <div className="synth-runb-findings__tag">RUN B · SELECTED FIXES</div>
            <ul>
              <li>
                Hub title cliché resolved April 2026 — see <b>Hub-only copy</b> footnote below (inventory
                aligns <code>caseStudiesPage</code> with Selected work / Five builds subhead).
              </li>
              <li>
                Career arc voice: third person → first person (&quot;Matt&apos;s work spans...&quot; →
                &quot;I started in creative...&quot;)
              </li>
              <li>
                Cliché ledger: 12 verdicts logged. &quot;Outcomes that compound&quot; KEEP. &quot;Exit
                velocity&quot; CUT.
              </li>
            </ul>
            <p className="synth-runb-findings__see">See FIG. 04-B for full audit.</p>
          </div>
        </div>
      </section>

      <DimRibbon label="↓ LESSON · WHAT I'D DO DIFFERENTLY" />

      <section className="lesson" aria-label="Lesson" data-screen-label="06 Lesson">
        <span className="margin-note">DRAWING 06 · LESSON</span>
        <span className="fig-stamp">FIG. 06 · LIMITS</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>06 / 07</dd>
          <dt>CLAIM</dt>
          <dd>PRE-RESEARCH TOOL</dd>
          <dt>BASELINE</dt>
          <dd>UNDER-INVESTED</dd>
          <dt>LAST REV.</dt>
          <dd>06/26</dd>
        </dl>

        <div className="case-section__inner">
          <header className="case-section-head">
            <p className="kicker">06 · LESSON · WHAT I'D DO DIFFERENTLY</p>
            <h2>What I&apos;d do differently.</h2>
          </header>

          <div className="synth-lesson-quote">
            <p>
              Synthetic users cannot replace real ones. I <em>under-invested</em> in the ones I shipped.
            </p>
          </div>
          <p className="synth-lesson-coda">
            They surface hypotheses the designer could already form, not unknown unknowns. The
            quality of a session is bounded by the quality of the persona model. In this session,
            adversarial personas were the most productive; archetypes surfaced less.
          </p>
          <p className="synth-lesson-coda">
            The method is a pre-research sharpening tool. It doesn&apos;t replace observation.{" "}
            <em>It makes observation more targeted when you get there.</em>
          </p>
        </div>
      </section>

      <DimRibbon label="↓ HANDOFF · THE LARGER STORY" />

      <section className="handoff" aria-label="Handoff" data-screen-label="07 Handoff">
        <span className="margin-note">DRAWING 07 · HANDOFF</span>
        <span className="fig-stamp">FIG. 07 · HANDOFF</span>

        <div className="handoff__inner">
          <p className="handoff__eyebrow">07 · HANDOFF</p>
          <h2 className="handoff__h">
            A method, proven on my own work. The <em>enterprise design</em> it was built to sharpen — next.
          </h2>
          <Link className="handoff__cta" href="/case-studies/autodesk">
            Open next case · Autodesk
          </Link>
          <p className="handoff__alt">
            <Link className="handoff__back-all" href="/case-studies">
              BACK TO ALL CASE STUDIES
            </Link>
          </p>
        </div>
      </section>

      <footer className="sheet" aria-label="Sheet metadata">
        <div className="sheet__cell">
          <span>SHEET</span>
          <b>02 / 05</b>
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
          <b>v2026.06</b>
        </div>
        <div className="sheet__cell">
          <span>PAGE</span>
          <b>CASE 02 · SYNTHETIC</b>
        </div>
      </footer>
    </div>
  );
}
