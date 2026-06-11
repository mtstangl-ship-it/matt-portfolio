"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CaseHero } from "../../CaseHero";
import { CasePicker } from "../../CasePicker";
import { EyCaseTallyFigure } from "./EyCaseTally";

const DIM_TICKS = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800];

function DimRibbon({ label }: { label: string }) {
  return (
    <div className="dim-with-scale">
      <p className="dim">{label}</p>
      <svg className="dim-scale" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
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

export function EyCaseView() {
  const tallyRef = useRef<HTMLElement | null>(null);
  const monumentUnderlineRef = useRef<SVGSVGElement | null>(null);
  const [monumentUnderlineDrawn, setMonumentUnderlineDrawn] = useState(false);

  useEffect(() => {
    const tally = tallyRef.current;
    if (!tally) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      tally.classList.add("is-counting");
      return;
    }
    if (!("IntersectionObserver" in window)) {
      tally.classList.add("is-counting");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tally.classList.add("is-counting");
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(tally);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const svg = monumentUnderlineRef.current;
    if (!svg || monumentUnderlineDrawn) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setMonumentUnderlineDrawn(true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setMonumentUnderlineDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMonumentUnderlineDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [monumentUnderlineDrawn]);

  return (
    <div className="case-ey-portfolio case-ey-body">
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <CaseHero
        heroImageSrc="/case-studies/ey-core-halftone.png"
        picker={<CasePicker activeSlug="ey" />}
        caseNumber="05"
        totalCases={5}
        marginNote="DRAWING 01 · HERO"
        figStamp="FIG. 01 · HERO"
        tag="01 · BRIEF · CASE 05 OF 05"
        basedLine="ATL · GA DPH"
        roleLine="EXPERIENCE DESIGN"
        headline={
          <>
            Vaccine hesitancy isn&apos;t a comms problem. It&apos;s a <em>showing-up</em> problem.
          </>
        }
        subhead={
          <>
            <b>Say YES Summer:</b> three cities, ten events — <b>715 vaccinations</b> where mass media couldn&apos;t land.
          </>
        }
        metaSlot={
          <>
            <div className="hero__meta-cell">
              <dt>WINDOW</dt>
              <dd>Aug 2021 · 10-event series · 40 live hours</dd>
            </div>
            <div className="hero__meta-cell">
              <dt>CLIENT</dt>
              <dd>EY · Georgia DPH</dd>
            </div>
            <div className="hero__meta-cell">
              <dt>PROGRAM</dt>
              <dd>Say YES Summer · Pop-up art + vaccination</dd>
            </div>
            <div className="hero__meta-cell">
              <dt>SCOPE</dt>
              <dd>
                3 cities · 10 events · <b>24+ partners</b>
              </dd>
            </div>
          </>
        }
      />

      <DimRibbon label="↓ proof · 16px clearance" />

      <section className="diagnosis" id="diagnosis" aria-label="Diagnosis" data-screen-label="02 Diagnosis">
        <span className="margin-note">DRAWING 02 · DIAGNOSIS</span>
        <span className="fig-stamp">FIG. 02 · DIAGNOSIS</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>02 / 06</dd>
          <dt>TOPIC</dt>
          <dd>WHERE TRUST LIVES</dd>
          <dt>RUNTIME</dt>
          <dd>AUG 2021</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="diagnosis__inner">
          <header className="case-section-head">
            <p className="kicker">02 · DIAGNOSIS · WHERE THE WORK ACTUALLY LIVED</p>
            <h2>
              The brief said vaccination rates. The real problem was <em>trust</em> — and where trust lives.
            </h2>
          </header>

          <div className="diagnosis__body">
            <p>
              By August 2021, the audiences that hadn&apos;t converted weren&apos;t ignorant of the vaccine; they were saturated by competing voices about it.{" "}
              <b>Mass-channel marketing was hitting its ceiling</b> — in some segments, amplifying resistance.
            </p>
          </div>

          <aside className="diagnosis__pull">
            <span className="diagnosis__pull-eyebrow">THE REFRAME</span>
            The institutional voice was the wrong voice. The design call was <em>structural</em>, not communicational — where the vaccine showed up, who delivered it, what
            the booth was next to.
          </aside>
        </div>
      </section>

      <DimRibbon label="↘ pivot · diagnosis → field" />

      <section className="approach" id="approach" aria-label="Approach" data-screen-label="03 Approach">
        <span className="margin-note">DRAWING 03 · APPROACH</span>
        <span className="fig-stamp">FIG. 03 · APPROACH</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>03 / 06</dd>
          <dt>FRAMEWORK</dt>
          <dd>CONFIDENCE → AWARENESS → ACCESS</dd>
          <dt>PARTNERS</dt>
          <dd>24+ · 3 CATEGORIES</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="approach__inner">
          <header className="case-section-head">
            <p className="kicker">03 · APPROACH · CONFIDENCE BEFORE AWARENESS BEFORE ACCESS</p>
            <h2>
              Confidence. Awareness. Access. <em>In that order.</em>
            </h2>
          </header>

          <div className="approach__body">
            <p>
              Say YES Summer was framed against three goals — <b>sequenced, not stacked</b>. Confidence had to come before awareness. Awareness had to come before
              access. A person who didn&apos;t trust the vaccine wouldn&apos;t convert no matter how visible the booth was.
            </p>
            <p>
              The structural design call: <em>make the vaccine available — don&apos;t make it the reason people show up.</em> People came for the Savannah Bananas home game.{" "}
              They came for the Twilight Criterium festival in Athens. They came for the Georgia Aquarium in Atlanta. The vaccine was on the same block. The vaccine was always
              available. <b>The vaccine was never the first thing asked of you.</b>
            </p>
            <p>Three partner categories carried different trust currencies:</p>
          </div>

          <div className="partners" role="list" aria-label="Three partner categories">
            <div className="partners__cell" role="listitem">
              <div className="partners__head">
                <span className="partners__num">CAT 01</span>
                <span className="partners__label">VACCINATION</span>
              </div>
              <p className="partners__body">
                CORE Georgia and local Health Districts handled clinical delivery. <b>Pfizer and Johnson &amp; Johnson on offer.</b> Choice preserved.
              </p>
            </div>
            <div className="partners__cell" role="listitem">
              <div className="partners__head">
                <span className="partners__num">CAT 02</span>
                <span className="partners__label">COMMUNITY</span>
              </div>
              <p className="partners__body">
                Living Walls, local artists, local musicians. <b>Murals being painted.</b> Live bluegrass. Bystanders had reasons to stay that weren&apos;t the vaccine.
              </p>
            </div>
            <div className="partners__cell" role="listitem">
              <div className="partners__head">
                <span className="partners__num">CAT 03</span>
                <span className="partners__label">PUBLIC HEALTH</span>
              </div>
              <p className="partners__body">
                Georgia DPH and CORE personnel on-site for <b>conversation, not pitch</b>. Questions answered with facts when asked. <b>The booth replaced the algorithm.</b>
              </p>
            </div>
          </div>

          <EyCaseTallyFigure ref={tallyRef} />

          <p className="approach__close">
            40 live hours. 24+ partners. <b>Three currencies, one program.</b>
          </p>
        </div>
      </section>

      <DimRibbon label="↓ field · the three-city tour" />

      <section className="tour" id="tour" aria-label="Design — three-city tour" data-screen-label="04 Design">
        <span className="margin-note">DRAWING 04 · TOUR</span>
        <span className="fig-stamp">FIG. 04 · TOUR</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>04 / 06</dd>
          <dt>ARTIFACT</dt>
          <dd>SAY YES SUMMER POSTER</dd>
          <dt>STOPS</dt>
          <dd>03 · ATL · ATH · SAV</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="tour__inner">
          <header className="case-section-head">
            <p className="kicker">04 · DESIGN · THE THREE-CITY TOUR</p>
            <h2>
              Three cities. Three trust currencies. <em>One program.</em>
            </h2>
          </header>

          <div className="tour__body">
            <p>Three cities anchored Say YES Summer — chosen because each represented a different way trust mediates public health in Georgia.</p>
          </div>

          <figure className="poster" aria-label="Say YES Summer tour poster">
            <header className="poster__head">
              <span>
                <b>FIG. 04-A</b> · SAY YES SUMMER · TOUR POSTER
              </span>
              <span>3 STOPS · 10 EVENTS · 40 LIVE HOURS</span>
              <span className="accent">AUG 2021</span>
            </header>

            <div className="poster__stops">
              <article className="stop">
                <p className="stop__date">
                  <span className="stop__num">AUG&nbsp;7</span>
                  <b>SAT · COASTAL</b>
                </p>
                <h3 className="stop__city">Savannah</h3>
                <p className="stop__region">CHATHAM CO. · COASTAL GEORGIA</p>
                <p className="stop__venue">
                  <b>Forsyth Farmers&apos; Market</b> · The largest and oldest public park in Savannah.
                </p>
                <p className="stop__crowd">
                  <b>Savannah Bananas</b> home game · 150 sell-outs since 2016
                </p>
                <p className="stop__moment">
                  <b>Mayor Van Johnson visited the site;</b> local press picked it up. Vaccination stopped being a government program and started being a Saturday in August.
                </p>
              </article>

              <article className="stop">
                <p className="stop__date">
                  <span className="stop__num">AUG&nbsp;14</span>
                  <b>SAT · CAMPUS</b>
                </p>
                <h3 className="stop__city">Athens</h3>
                <p className="stop__region">CLARKE CO. · BACK-TO-SCHOOL</p>
                <p className="stop__venue">
                  <b>UGA Vaccine Ambassadors</b> led the campus campaign.
                </p>
                <p className="stop__crowd">
                  <b>Twilight Criterium festival</b> · 20K spectators · downtown streets
                </p>
                <p className="stop__moment">
                  Local <b>bluegrass played</b>. Students queuing for bands found they could get a shot at the same booth. Multiple levels of engagement became the operating{" "}
                  principle.
                </p>
              </article>

              <article className="stop">
                <p className="stop__date">
                  <span className="stop__num">AUG&nbsp;28</span>
                  <b>SAT · METRO</b>
                </p>
                <h3 className="stop__city">Atlanta</h3>
                <p className="stop__region">FULTON CO. · METRO ANCHOR</p>
                <p className="stop__venue">
                  <b>Georgia Aquarium</b> · the largest in the U.S.
                </p>
                <p className="stop__crowd">
                  2.4M annual visitors · adjacent to <b>Pemberton Place</b> &amp; World of Coca-Cola
                </p>
                <p className="stop__moment">
                  Public art display anchored the program&apos;s final weekend. <b>Vaccinations ran in front of civil rights iconography</b> at the National Center for Civil
                  {" "}
                  &amp; Human Rights — the last geography of American public health contested on moral grounds.
                </p>
              </article>
            </div>

            <footer className="poster__foot">
              <span>
                POSTER · v2026.04 · <b>SHEET 04-A</b>
              </span>
              <span>SOURCE · M. STANGL · EY · GA DPH</span>
              <span>PROGRAM · SAY YES SUMMER</span>
            </footer>
          </figure>

          <p className="tour__close">
            Per-city: <b>Atlanta 452</b> · <b>Athens 175</b> · <b>Savannah 88</b> = 715 vaccinations program-attributed across the series.
          </p>
        </div>
      </section>

      <DimRibbon label="↓ EXTERNAL VALIDATION · WHAT 715 ACTUALLY MEANS" />

      <section
        className="external-validation"
        id="external-validation"
        aria-label="External validation — what 715 means"
        data-screen-label="05 External Validation"
      >
        <span className="margin-note">DRAWING 05 · EXTERNAL VALIDATION</span>
        <span className="fig-stamp">FIG. 05 · EXTERNAL VALIDATION</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>05 / 06</dd>
          <dt>CLAIM</dt>
          <dd>715 · PROGRAM-ATTRIBUTED</dd>
          <dt>BASELINE</dt>
          <dd>HESITANCY · NOT POPULATION</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="external-validation__inner">
          <div className="external-validation__main">
            <header className="case-section-head">
              <p className="kicker">05 · EXTERNAL VALIDATION · WHAT 715 ACTUALLY MEANS</p>
              <h2>
                715 is small on a dashboard. <em>Enormous</em> against a hesitancy baseline.
              </h2>
            </header>
            <p className="external-validation__subhead">
              ↗{" "}
              <strong className="external-validation__subhead-kicker">CDC NATIONAL BEST PRACTICE</strong>
              {" "}
              · GA DPH adopted the four field-learning takeaways as operating principles for every regional expansion that followed.
            </p>
          </div>

          <aside className="external-validation__aside" aria-label="715 landmark">
            <div className="monument monument--external-validation" aria-label="715 vaccinations">
              <p className="monument__label">VACCINATIONS · IN ARMS</p>
              <div className="monument__stack">
                <p className="monument__num" aria-label="715">
                  715
                </p>
                <svg
                  ref={monumentUnderlineRef}
                  className={`monument__underline${monumentUnderlineDrawn ? " monument__underline--drawn" : ""}`}
                  viewBox="0 0 600 22"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="monument__underline-curve"
                    pathLength="100"
                    d="M 4 14 Q 100 4, 200 11 T 400 9 T 596 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <line
                    className="monument__underline-cap monument__underline-cap--l"
                    x1="4"
                    y1="18"
                    x2="4"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    className="monument__underline-cap monument__underline-cap--r"
                    x1="596"
                    y1="18"
                    x2="596"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <ul className="monument__marg" aria-label="Context">
                <li className="monument__marg-item monument__marg-item--tl">40 live hours</li>
                <li className="monument__marg-item monument__marg-item--tr">3 cities</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <DimRibbon label="↓ lesson · four mechanisms a dashboard couldn't have produced" />

      <section className="lesson" id="lesson" aria-label="Lesson — field learnings" data-screen-label="06 Lesson">
        <span className="margin-note">DRAWING 06 · LESSON</span>
        <span className="fig-stamp">FIG. 06 · LESSON</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>06 / 06</dd>
          <dt>LEARNINGS</dt>
          <dd>04 · FIELD-OBSERVED</dd>
          <dt>SOURCE</dt>
          <dd>ON-SITE · 10 EVENTS</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="lesson__inner">
          <header className="case-section-head">
            <p className="kicker">06 · LESSON · WHAT THE BOOTH MADE VISIBLE</p>
            <h2>
              Four mechanisms a dashboard <em>couldn&apos;t have produced.</em>
            </h2>
          </header>

          <div className="learnings" role="list" aria-label="Four field learnings">
            <article className="learning" role="listitem">
              <header className="learning__head">
                <span className="learning__num">01</span>
                <span className="learning__cat">WHO PEOPLE TRUSTED</span>
              </header>
              <h3 className="learning__title">Loved ones were the deciders.</h3>
              <p className="learning__body">
                Attendees arrived <b>brought by someone who had already decided for them.</b> Never design for the hesitant individual in isolation.
              </p>
            </article>

            <article className="learning" role="listitem">
              <header className="learning__head">
                <span className="learning__num">02</span>
                <span className="learning__cat">WHY PEOPLE STALLED</span>
              </header>
              <h3 className="learning__title">Information noise wasn&apos;t pro- or anti-.{" "}It was paralyzing.</h3>
              <p className="learning__body">
                Hesitancy was overload, not conviction — <em>&quot;too much information from both sides.&quot;</em> The booth replaced the algorithm.
              </p>
            </article>

            <article className="learning" role="listitem">
              <header className="learning__head">
                <span className="learning__num">03</span>
                <span className="learning__cat">WHAT AGENCY PRODUCED</span>
              </header>
              <h3 className="learning__title">Choice was reassurance.</h3>
              <p className="learning__body">
                Offering Pfizer or J&amp;J converted people a single option wouldn&apos;t. <b>Optionality read as respect</b> — &quot;the vaccine&quot; stopped being monolithic.
              </p>
            </article>

            <article className="learning" role="listitem">
              <header className="learning__head">
                <span className="learning__num">04</span>
                <span className="learning__cat">WHY THE ART MATTERED</span>
              </header>
              <h3 className="learning__title">Multiple engagement levels let people reconsider.</h3>
              <p className="learning__body">
                Live art, music, murals — <b>not decoration.</b> They gave bystanders distance to reconsider without having to commit. Reconsideration led to more shots in arms.
              </p>
            </article>
          </div>

          <aside className="lesson__close">
            <span className="lesson__close-eyebrow">CLOSING</span>
            Public health works <em>where the public lives.</em> The vaccine was always available. <b>The vaccine was never the point.</b>
          </aside>
        </div>
      </section>

      <DimRibbon label="↘ handoff · the larger story" />

      <section className="handoff" aria-label="Handoff" data-screen-label="07 Handoff">
        <div className="handoff__inner">
          <p className="handoff__eyebrow">Handoff · the larger story</p>
          <h2 className="handoff__h">
            Trust-mediated work here. <em>Operations transformation</em> elsewhere.
          </h2>
          <Link className="handoff__cta" href="/case-studies/wipro">
            Open Wipro case
          </Link>
          <p className="handoff__alt">
            Or —{" "}
            <Link className="handoff__back-all" href="/impact">
              view Impact dashboard
            </Link>
          </p>
        </div>
      </section>

      <footer className="sheet" aria-label="Sheet metadata">
        <div className="sheet__cell">
          <span>SHEET</span>
          <b>05 / 05</b>
        </div>
        <div className="sheet__cell">
          <span>DRAWN</span>
          <b>M. STANGL</b>
        </div>
        <div className="sheet__cell">
          <span>BASED</span>
          <b>ATL · REMOTE</b>
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
          <b>CASE 05 · EY HEALTHCARE</b>
        </div>
      </footer>

      <p className="signature-line">Matt Stangl · CX, Service Design &amp; AI Experience · Atlanta, GA</p>
    </div>
  );
}
