"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CaseHero } from "../../CaseHero";
import { CasePicker } from "../../CasePicker";
import { TrustCurrencyDiagram } from "./TrustCurrencyDiagram";

function DimBetween({ label, compact }: { label: string; compact?: boolean }) {
  return (
    <div className={compact ? "dim-with-scale dim-with-scale--compact" : "dim-with-scale"}>
      <p className="dim">{label}</p>
      <svg className="dim-scale" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="4" x2="800" y2="4" stroke="var(--ink-line)" strokeWidth="1" />
        <g stroke="var(--ink-3)" strokeWidth="1">
          {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800].map((x) => (
            <line key={x} x1={x} y1="4" x2={x} y2="14" />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function EyCaseView() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll(".case-ey-reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -10% 0px" },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="case-ey-portfolio case-ey-body">
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <CaseHero
        picker={<CasePicker activeSlug="ey" />}
        caseNumber="05"
        totalCases={5}
        marginNote="CASE 05 · EY · GEORGIA DPH"
        figStamp="FIG. 01 · HERO"
        basedLine="ATL · GA DPH"
        roleLine="EXPERIENCE DESIGN"
        tag="01 · BRIEF · CASE 05 OF 05"
        headline={
          <>
            Vaccine hesitancy isn&apos;t a comms problem.
            <span className="hero__h1-line2">
              It&apos;s a <em>showing-up</em> problem.
            </span>
          </>
        }
        subhead={
          <>
            <strong>Say YES Summer:</strong> 3 cities, 10 events, 24+ partners — <strong>715 vaccinations</strong> where mass media couldn&apos;t land.
          </>
        }
        heroBrief={
          <p>
            EY recruited me to lead experience design on Georgia DPH&apos;s COVID-19 engagement. Mass marketing wasn&apos;t converting — in some audiences it
            was amplifying resistance. The design question: where does trust live, and how does a public-health program show up inside it without colonizing it?
          </p>
        }
        meta={{
          role: "Experience design lead",
          timeline: "Aug 2021 · 10-event series · 40 live hours",
          stack: (
            <>
              EY <b>·</b> Georgia DPH <b>·</b> CORE <b>·</b> Living Walls
            </>
          ),
          model: <>Field activation · Say YES Summer</>,
        }}
      />

      <DimBetween label="↓ proof · 16px clearance" />

      <section className="diagnosis case-ey-reveal" id="diagnosis" aria-label="Diagnosis" data-screen-label="02 Diagnosis">
        <span className="margin-note">DRAWING 02 · DIAGNOSIS</span>
        <span className="fig-stamp">FIG. 02 · DIAGNOSIS</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>02 / 06</dd>
          <dt>RUNTIME</dt>
          <dd>~3 MIN</dd>
          <dt>REVISION</dt>
          <dd>v2026.04</dd>
          <dt>STATUS</dt>
          <dd>CURRENT</dd>
        </dl>

        <div className="diagnosis__inner">
          <header className="case-section-head">
            <p className="kicker">02 · DIAGNOSIS · WHERE THE WORK ACTUALLY LIVED</p>
            <h2>
              The brief said vaccination rates. The real problem was <em>trust</em>.
            </h2>
          </header>
          <div className="diagnosis__body ey-prose">
            <p>
              Mass marketing was hitting its ceiling — in some audiences, amplifying resistance. The reframe: not how to communicate the vaccine better.
              Where does trust live, and how does a public-health program show up inside it without colonizing it?
            </p>
          </div>
        </div>
      </section>

      <DimBetween label="↘ pivot · diagnosis → field" compact />

      <section className="approach case-ey-reveal" id="approach" aria-label="Approach" data-screen-label="03 Approach">
        <span className="margin-note">DRAWING 03 · APPROACH</span>
        <span className="fig-stamp">FIG. 03 · APPROACH</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>03 / 06</dd>
          <dt>RUNTIME</dt>
          <dd>~4 MIN</dd>
          <dt>REVISION</dt>
          <dd>v2026.04</dd>
          <dt>STATUS</dt>
          <dd>CURRENT</dd>
        </dl>

        <div className="approach__inner">
          <header className="case-section-head">
            <p className="kicker">03 · APPROACH · CONFIDENCE BEFORE AWARENESS BEFORE ACCESS</p>
            <h2>
              Confidence. Awareness. Access. <em>In that order.</em>
            </h2>
          </header>

          <div className="approach__body ey-prose">
            <p>
              Three goals sequenced, not stacked. Make the vaccine available — don&apos;t make it the reason people show up. People came for the Bananas, the
              Twilight festival, the Aquarium. The vaccine was on the same block. Three partner categories: vaccination delivery, community presence, public health
              conversation. <strong>24+ partners</strong>. <strong>10 events</strong>. Every event had at least three things to do besides vaccinate.
            </p>
          </div>

          <ul className="approach__cats">
            <li>
              <span className="approach__cat-k">VACCINATION</span>
              <span className="approach__cat-v">CORE Georgia · local Health Districts</span>
              <span className="approach__cat-sub">On-site clinical delivery · Pfizer + J&amp;J, choice preserved</span>
            </li>
            <li>
              <span className="approach__cat-k">COMMUNITY</span>
              <span className="approach__cat-v">Living Walls · local artists · musicians</span>
              <span className="approach__cat-sub">Murals, live art, bluegrass — reasons to stay</span>
            </li>
            <li>
              <span className="approach__cat-k">PUBLIC HEALTH</span>
              <span className="approach__cat-v">Georgia DPH · CORE personnel on-site</span>
              <span className="approach__cat-sub">Conversations, not campaigns · facts on request</span>
            </li>
          </ul>

          <TrustCurrencyDiagram />
        </div>
      </section>

      <DimBetween label="↓ field · the three-city tour" />

      <section className="tour case-ey-reveal" id="tour" aria-label="Design — three-city tour" data-screen-label="04 Design">
        <span className="margin-note">DRAWING 04-A</span>
        <span className="fig-stamp">FIG. 04 · TOUR</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>04 / 06</dd>
          <dt>ARTIFACT</dt>
          <dd>TOUR POSTER</dd>
          <dt>REVISION</dt>
          <dd>v2026.04</dd>
          <dt>STATUS</dt>
          <dd>CURRENT</dd>
        </dl>

        <div className="tour__inner">
          <header className="case-section-head">
            <p className="kicker">04 · DESIGN · THE THREE-CITY TOUR</p>
            <h2>
              Three cities. Three trust currencies. <em>One program.</em>
            </h2>
          </header>

          <div className="tour__intro ey-prose">
            <p>
              Savannah · Forsyth Market, Bananas home game. Mayor Van Johnson visits — vaccination becomes a Saturday in August. Athens · UGA campus, Twilight
              Criterium (20K spectators). Bluegrass plays; students queuing for bands get shots at the same booth. Atlanta · Georgia Aquarium, Pemberton Place.
              Civil rights iconography anchors the final weekend.
            </p>
          </div>

          <figure className="poster" aria-label="Say YES Summer tour poster">
            <header className="poster__head">
              <span>
                <b>FIG. 04-A</b> · SAY YES SUMMER · TOUR POSTER
              </span>
              <span>3 STOPS · 10 EVENTS · 40 LIVE HOURS</span>
              <span className="poster__head-accent">AUG 2021</span>
            </header>

            <div className="poster__stops">
              <article className="poster-stop">
                <div className="poster-stop__rule" aria-hidden="true">
                  <span>01</span>
                </div>
                <p className="poster-stop__date">
                  <span className="poster-stop__num">01 / 03</span>
                  <b>AUG 14</b>
                  <span className="poster-stop__wk">SAT</span>
                </p>
                <h3 className="poster-stop__city">Savannah</h3>
                <p className="poster-stop__meta">Coastal Georgia</p>
                <p className="poster-stop__venue">
                  <b>Forsyth Farmers&apos; Market</b> · largest public park in Savannah
                </p>
                <p className="poster-stop__crowd">
                  <b>Bananas</b> home game · <strong>150 sell-outs</strong> since 2016
                </p>
                <p className="poster-stop__moment">
                  <span className="poster-stop__moment-k">MOMENT</span>
                  Mayor Van Johnson visits the site; local press picks it up. Vaccination stops being a government program and starts being a{" "}
                  <em>Saturday in August</em>.
                </p>
              </article>

              <article className="poster-stop">
                <div className="poster-stop__rule" aria-hidden="true">
                  <span>02</span>
                </div>
                <p className="poster-stop__date">
                  <span className="poster-stop__num">02 / 03</span>
                  <b>
                    AUG 19<small>–21</small>
                  </b>
                  <span className="poster-stop__wk">THU–SAT</span>
                </p>
                <h3 className="poster-stop__city">Athens</h3>
                <p className="poster-stop__meta">Back-to-school</p>
                <p className="poster-stop__venue">
                  <b>UGA Vaccine Ambassadors</b> · campus campaign
                </p>
                <p className="poster-stop__crowd">
                  <b>Twilight Criterium</b> · <strong>20K spectators</strong> · downtown
                </p>
                <p className="poster-stop__moment">
                  <span className="poster-stop__moment-k">MOMENT</span>
                  Local <em>bluegrass</em>. Students queue for bands, get a shot at the same booth. <em>Multiple levels of engagement</em> become the operating
                  principle.
                </p>
              </article>

              <article className="poster-stop">
                <div className="poster-stop__rule" aria-hidden="true">
                  <span>03</span>
                </div>
                <p className="poster-stop__date">
                  <span className="poster-stop__num">03 / 03</span>
                  <b>
                    AUG 28<small>–29</small>
                  </b>
                  <span className="poster-stop__wk">SAT–SUN</span>
                </p>
                <h3 className="poster-stop__city">Atlanta</h3>
                <p className="poster-stop__meta">Metro anchor</p>
                <p className="poster-stop__venue">
                  <b>Georgia Aquarium</b> · largest in the U.S.
                </p>
                <p className="poster-stop__crowd">
                  <strong>2.4M</strong> visitors/yr · <b>Pemberton Place</b> · Civil &amp; Human Rights adjacent
                </p>
                <p className="poster-stop__moment">
                  <span className="poster-stop__moment-k">MOMENT</span>
                  Final weekend anchored on public art. Vaccinations in front of <em>civil rights iconography</em> — American public health contested on moral
                  grounds.
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

          <p className="tour__reconcile">
            Per-city: <b>Atlanta 452</b> · <b>Athens 175</b> · <b>Savannah 88</b> = <strong>715</strong> program-attributed.
          </p>
        </div>
      </section>

      <DimBetween label="↓ delta · what 715 actually means" compact />

      <section className="delta case-ey-reveal" id="delta" aria-label="Delta" data-screen-label="05 Delta">
        <span className="margin-note">DRAWING 05 · DELTA</span>
        <span className="fig-stamp">FIG. 05 · DELTA</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>05 / 06</dd>
          <dt>CLAIM</dt>
          <dd>715 · PROGRAM</dd>
          <dt>REVISION</dt>
          <dd>v2026.04</dd>
          <dt>STATUS</dt>
          <dd>CURRENT</dd>
        </dl>

        <div className="delta__inner">
          <header className="case-section-head">
            <p className="kicker">05 · DELTA · WHAT 715 ACTUALLY MEANS</p>
            <h2>
              715 is small on a dashboard. <em>Enormous</em> against a hesitancy baseline.
            </h2>
          </header>

          <div className="delta__body ey-prose">
            <p>
              The number that mattered didn&apos;t exist yet: what does it cost to convert a vaccine-hesitant person through mass channels? Most estimates: we
              couldn&apos;t. Say YES Summer produced <strong>715 conversions</strong> in 40 live hours — each in the presence of music, art, a mayor, or a campus.
              None in front of a screen. <strong>CDC named the program a national best practice.</strong>
            </p>
          </div>

          <figure className="outcomes" aria-label="Program outcomes">
            <figcaption className="outcomes__head">
              <span>
                <b>FIG. 05-A</b> · OUTCOMES · MEASURED SEPARATELY
              </span>
              <span>6 METRICS · 2 LAYERS</span>
            </figcaption>
            <div className="outcomes__grid">
              <div className="outcome outcome--hero">
                <p className="outcome__label">Vaccinations</p>
                <p className="outcome__value">715</p>
                <svg className="outcome__value-underline" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 2 8 Q 50 2, 100 7 T 198 6" stroke="var(--accent)" strokeWidth="1.2" fill="none" />
                  <line x1="2" y1="11" x2="2" y2="6" stroke="var(--accent)" strokeWidth="0.8" />
                  <line x1="198" y1="11" x2="198" y2="6" stroke="var(--accent)" strokeWidth="0.8" />
                </svg>
                <p className="outcome__caption">40 live hours · 3 cities</p>
                <p className="outcome__claim">↑ load-bearing claim · hesitancy baseline</p>
              </div>
              <div className="outcome">
                <p className="outcome__label">Impressions</p>
                <p className="outcome__value">4.57M</p>
                <p className="outcome__caption">Social · scaffolding</p>
              </div>
              <div className="outcome">
                <p className="outcome__label">Site visits</p>
                <p className="outcome__value">350K</p>
                <p className="outcome__caption">sayyessummer.com</p>
              </div>
              <div className="outcome">
                <p className="outcome__label">Partners</p>
                <p className="outcome__value">24+</p>
                <p className="outcome__caption">3 categories</p>
              </div>
              <div className="outcome">
                <p className="outcome__label">Events</p>
                <p className="outcome__value">10</p>
                <p className="outcome__caption">Across the series</p>
              </div>
              <div className="outcome">
                <p className="outcome__label">Recognition</p>
                <p className="outcome__value">1</p>
                <p className="outcome__caption">CDC best practice</p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <DimBetween label="↓ lesson · four mechanisms" />

      <section className="lesson case-ey-reveal" id="lesson" aria-label="Lesson" data-screen-label="06 Lesson">
        <span className="margin-note">DRAWING 06 · LESSON</span>
        <span className="fig-stamp">FIG. 06 · LESSON</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>06 / 06</dd>
          <dt>RUNTIME</dt>
          <dd>~5 MIN</dd>
          <dt>REVISION</dt>
          <dd>v2026.04</dd>
          <dt>STATUS</dt>
          <dd>CURRENT</dd>
        </dl>

        <div className="lesson__inner">
          <header className="case-section-head">
            <p className="kicker">06 · LESSON · WHAT THE BOOTH MADE VISIBLE</p>
            <h2>
              Four mechanisms a dashboard <em>couldn&apos;t have produced.</em>
            </h2>
          </header>

          <div className="learnings">
            <article className="learning">
              <header className="learning__head">
                <span className="learning__num">01</span>
                <span className="learning__cat">WHO PEOPLE TRUSTED</span>
                <span className="learning__fig">FIG. 06-A</span>
              </header>
              <h3 className="learning__title">Loved ones were the deciders.</h3>
              <p className="learning__body">
                Many attendees arrived with a <strong>family member or friend</strong> — the loved one had decided before they got there.
              </p>
              <p className="learning__impl">
                <span className="learning__impl-eyebrow">DESIGN IMPLICATION</span>
                Make it easy to bring someone — never design for the hesitant alone.
              </p>
            </article>

            <article className="learning">
              <header className="learning__head">
                <span className="learning__num">02</span>
                <span className="learning__cat">WHY PEOPLE STALLED</span>
                <span className="learning__fig">FIG. 06-B</span>
              </header>
              <h3 className="learning__title">Information noise wasn&apos;t pro- or anti-. It was paralyzing.</h3>
              <p className="learning__body">
                Hesitant attendees cited <em>&quot;a lot of information from both sides&quot;</em> — overload, not conviction.
              </p>
              <p className="learning__impl">
                <span className="learning__impl-eyebrow">DESIGN IMPLICATION</span>
                On-site conversation, not pitch — booth replaced the algorithm.
              </p>
            </article>

            <article className="learning">
              <header className="learning__head">
                <span className="learning__num">03</span>
                <span className="learning__cat">WHAT AGENCY PRODUCED</span>
                <span className="learning__fig">FIG. 06-C</span>
              </header>
              <h3 className="learning__title">Choice was reassurance.</h3>
              <p className="learning__body">
                Pfizer <strong>and</strong> J&amp;J — their pick — converted people who wouldn&apos;t budge on a single option.
              </p>
              <p className="learning__impl">
                <span className="learning__impl-eyebrow">DESIGN IMPLICATION</span>
                Multiple manufacturers on every field event — optionality as respect.
              </p>
            </article>

            <article className="learning">
              <header className="learning__head">
                <span className="learning__num">04</span>
                <span className="learning__cat">WHY THE ART MATTERED</span>
                <span className="learning__fig">FIG. 06-D</span>
              </header>
              <h3 className="learning__title">Multiple engagement levels let people reconsider.</h3>
              <p className="learning__body">
                Murals, live art, music — <strong>time and distance</strong> to reconsider without committing upfront.
              </p>
              <p className="learning__impl">
                <span className="learning__impl-eyebrow">DESIGN IMPLICATION</span>
                At least three non-vaccine reasons to stay at every event.
              </p>
            </article>
          </div>

          <aside className="lesson__close">
            <span className="lesson__close-eyebrow">CLOSING</span>
            Public health works <em>where the public lives.</em> The vaccine was always available. <strong>The vaccine was never the point.</strong>
          </aside>
        </div>
      </section>

      <DimBetween label="↘ handoff · operations sibling" compact />

      <section className="handoff case-ey-reveal" aria-label="Handoff" data-screen-label="07 Handoff">
        <span className="margin-note">DRAWING 07</span>
        <span className="fig-stamp">FIG. 07 · HANDOFF</span>
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
              View Impact dashboard
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
          <b>CASE 05 · EY HEALTHCARE</b>
        </div>
      </footer>

      <p className="signature-line">Matt Stangl · CX, Product &amp; Service Design · Denver, CO</p>
    </div>
  );
}
