"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useRef } from "react";
import {
  DashboardFineGridOverlay,
  JourneyFlowViz,
  OrchestrationTimelineViz,
  TowerConvergenceViz,
} from "@/components/dashboard";
import { HeroCanvasLazy } from "@/components/home-sections/HeroCanvasLazy";
import { YouTubeInline } from "@/components/home-sections/YouTubeInline";
import { logoPaths } from "@/content/logos";
import {
  homeV2CentaurArtifacts,
  homeV2CentaurMeta,
  homeV2Contact,
  homeV2Dashboard,
  homeV2Hero,
  homeV2LedgerIntent,
  homeV2LedgerSolved,
  homeV2SignalFilms,
  homeV2SignalIntro,
  homeV2TickerClients,
} from "@/content/homeV2Copy";
import { attachHomeV2Animations } from "@/lib/home-v2/effects";
import { FicheNav } from "@/components/layout/FicheNav";

function TickerTrack() {
  const pool = [...homeV2TickerClients, ...homeV2TickerClients];
  return (
    <div className="ticker__track" id="ticker-track">
      {pool.map((name, i) => (
        <Fragment key={`${name}-${i}`}>
          <span>{name}</span>
          <span className="ticker__sep">+</span>
        </Fragment>
      ))}
    </div>
  );
}

export function HomePagePort() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  /** Viz components gate motion on `isHovered`; port passed false, so animations never ran. */
  const vizAnimOn = reducedMotion !== true;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return attachHomeV2Animations(root);
  }, []);

  return (
    <div ref={rootRef} className="home-v2-root">
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <FicheNav />

      {/* ============ 01 · HERO ============ */}
      <header id="hero" className="hero hero--pointillism" data-screen-label="01 Hero">
        <span className="margin-note">DRAWING 01</span>
        <span className="fig-stamp">DRAWING 01</span>

        <div className="hero__canvas" aria-hidden="true">
          <HeroCanvasLazy />
        </div>

        <div className="hero__overlay">
          <div className="hero__copy">
            <p className="kicker">{homeV2Hero.kicker}</p>
            <h1 className="hero__h1">
              I turn fragmented CX into <em>flow</em>.
            </h1>
            <p className="hero__sub">{homeV2Hero.subhead}</p>

            <div className="hero__avail">
              <span className="dot" aria-hidden="true" />
              {homeV2Hero.availability}
            </div>

            <ul className="hero__contacts">
              {homeV2Hero.contacts.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {c.label} <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="hero__identity" aria-label="Drawing identification">
          <div className="hero__identity-row">
            <span>PART NO.</span>
            <b>01</b>
          </div>
          <div className="hero__identity-row">
            <span>BASED</span>
            <b>DEN · REMOTE</b>
          </div>
          <div className="hero__identity-row">
            <span>ROLE</span>
            <b>EXPERIENCE DESIGN</b>
          </div>
          <div className="hero__identity-row">
            <span>REV.</span>
            <b>02 · TIER A</b>
          </div>
        </aside>

        <div className="proof">
          <span className="proof__label">SELECTED CLIENTS &amp; CREDENTIALS</span>
          <ul className="proof__list">
            {homeV2Hero.proofStrip.map((name, i) => (
              <Fragment key={`${name}-${i}`}>
                {i > 0 ? (
                  <li aria-hidden="true" className="proof__sep">
                    ·
                  </li>
                ) : null}
                <li className={name.includes("Stanford") ? "proof__stanford" : undefined}>{name}</li>
              </Fragment>
            ))}
          </ul>
        </div>
      </header>

      <p className="dim">↓ proof · 16px clearance</p>

      {/* ANIMATION SPEC 3D — CLIENT TICKER — CSS home.css ticker-slide 60s / 40sm */}
      <section className="ticker" aria-label="Client ticker">
        <TickerTrack />
      </section>

      {/* ANIMATION SPEC 3A — LEDGER — 3500ms hold · ledger.js */}
      <section id="ledger" className="ledger" aria-label="Problem Ledger">
        <span className="margin-note">FIG. 02 · UPDATED 04/26</span>
        <span className="fig-stamp">FIG. 02</span>

        <header className="section-head">
          <p className="kicker">FIG. 02 · LEDGER</p>
          <h2>Problem ledger.</h2>
          <p className="section-head__sub">
            Six pairs. What&apos;s been solved. What I want to solve next.
          </p>
        </header>

        <div className="ledger__diptych">
          <div className="ledger__col" data-side="solved">
            <p className="kicker">PROBLEMS SOLVED</p>
            <ol className="ledger__items" id="ledger-solved" aria-live="polite">
              {homeV2LedgerSolved.map((text, idx) => (
                <li key={text} className={idx === 0 ? "is-active" : undefined}>
                  {text}
                </li>
              ))}
            </ol>
          </div>

          <div className="ledger__rule" aria-hidden="true">
            <div className="ledger__rule-line" />
            <div className="ledger__rule-label">TRACK&nbsp;RECORD&nbsp;→&nbsp;INTENT</div>
            <div className="ledger__rule-line" />
            <div className="ledger__counter">
              <span id="pair-current">01</span>
              <span className="ledger__counter-sep">/</span>
              <span>06</span>
            </div>
            <figure className="ledger__stamp">
              <svg viewBox="0 0 80 80" width={80} height={80}>
                <title>M. Stangl portrait stamp</title>
                <image
                  href="/portrait-matt-stangl.png"
                  x={0}
                  y={0}
                  width={80}
                  height={80}
                  preserveAspectRatio="xMidYMid slice"
                />
                <rect
                  x={0.5}
                  y={0.5}
                  width={79}
                  height={79}
                  fill="none"
                  stroke="var(--ink-2)"
                  strokeWidth={0.6}
                />
              </svg>
              <figcaption>
                M. STANGL
                <br />
                ENGINEER OF RECORD
              </figcaption>
            </figure>
          </div>

          <div className="ledger__col" data-side="intent">
            <p className="kicker">PROBLEMS I WANT TO SOLVE</p>
            <ol className="ledger__items" id="ledger-intent" aria-live="polite">
              {homeV2LedgerIntent.map((text, idx) => (
                <li key={text} className={idx === 0 ? "is-active" : undefined}>
                  {text}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="ledger__progress" aria-hidden="true">
          <span className="ledger__progress-bar" id="ledger-progress" />
        </div>
      </section>

      <p className="dim">↘ pivot · intent → receipts</p>

      {/* ANIMATION SPEC 3B/3C — DASHBOARD KPI + CROSSHAIRS — counters.js · nav.js observer */}
      <section id="impact" className="dash" aria-label="Transformation Dashboard">
        <span className="margin-note">FIG. 03 · CF. IMPACT TAB 01</span>

        <header className="section-head section-head--split">
          <div>
            <p className="kicker">{homeV2Dashboard.kicker}</p>
            <h2>{homeV2Dashboard.headline}</h2>
            <p className="section-head__sub">{homeV2Dashboard.subhead}</p>
          </div>
          <Link className="cta" href={homeV2Dashboard.ctaHref}>
            {homeV2Dashboard.ctaLabel} <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="dash__grid">
          {/* AUTODESK */}
          <article className="card" data-card="autodesk">
            <span className="xhair xhair-tl" aria-hidden="true" />
            <span className="xhair xhair-tr" aria-hidden="true" />
            <span className="xhair xhair-bl" aria-hidden="true" />
            <span className="xhair xhair-br" aria-hidden="true" />

            <div className="card__head">
              <div className="card__logo">
                <Image
                  src={logoPaths.Autodesk!}
                  alt="Autodesk"
                  width={120}
                  height={28}
                  className="h-7 w-auto object-contain object-left"
                />
              </div>
              <p className="kicker">FIG. 03-A</p>
              <span className="card__rev" aria-hidden="true">
                REV. 02
              </span>
            </div>
            <h3 className="card__h">Built CX practice into revenue driver.</h3>
            <p className="card__narr">
              Connected Design, Product, Support, and Engineering through journey architecture and
              experience design. Delivered post-purchase service innovation, new offering models, and
              a 3–5 year CX vision that shaped Sales and Success modernization.
            </p>

            <div className="card__viz card__viz--live relative !block min-h-[180px] !p-2">
              <DashboardFineGridOverlay />
              <div className="relative z-[1] flex min-h-[140px] w-full items-center justify-center">
                <JourneyFlowViz isHovered={vizAnimOn} />
              </div>
            </div>

            <ul className="kpi-grid">
              <li
                className="kpi kpi--span2"
                data-kpi
                data-target="50"
                data-prefix="$"
                data-suffix="M+"
                data-decimals="0"
              >
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix" />
                </span>
                <span className="kpi__label">Incremental AOV · 12-mo post-launch · prior-year flat</span>
                <svg className="kpi__arc" viewBox="0 0 100 60" aria-hidden="true">
                  <path
                    d="M 8 52 A 42 42 0 0 1 92 52"
                    fill="none"
                    stroke="var(--ink-3)"
                    strokeWidth="0.8"
                    strokeDasharray="2 3"
                  />
                  <path
                    className="kpi__arc-fill"
                    d="M 8 52 A 42 42 0 0 1 92 52"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.2"
                    pathLength={100}
                    strokeDasharray="0 100"
                  />
                </svg>
              </li>
              <li className="kpi" data-kpi data-target="106" data-suffix="%" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix">%</span>
                </span>
                <span className="kpi__label">NRR vision designed</span>
              </li>
              <li className="kpi" data-kpi data-target="27" data-prefix="+" data-suffix="%" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix">%</span>
                </span>
                <span className="kpi__label">RR · Q1 post-launch of new offering model</span>
              </li>
              <li className="kpi kpi--text kpi--span2" data-kpi data-text="0→1→2">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                </span>
                <span className="kpi__label">Practice build → experience reviews</span>
              </li>
            </ul>

            <p className="card__tags">
              Service Design · Customer Co-Creation · Research Leadership · Prototype Builds
            </p>
          </article>

          {/* WIPRO */}
          <article className="card" data-card="wipro">
            <span className="xhair xhair-tl" aria-hidden="true" />
            <span className="xhair xhair-tr" aria-hidden="true" />
            <span className="xhair xhair-bl" aria-hidden="true" />
            <span className="xhair xhair-br" aria-hidden="true" />

            <div className="card__head">
              <div className="card__logo">
                <Image
                  src={logoPaths.Wipro!}
                  alt="Wipro"
                  width={120}
                  height={28}
                  className="h-7 w-auto object-contain object-left"
                />
              </div>
              <p className="kicker">FIG. 03-B</p>
              <span className="card__rev" aria-hidden="true">
                REV. 02
              </span>
            </div>
            <h3 className="card__h">Led CX/EX transformation across support.</h3>
            <p className="card__narr">
              Led an EX transformation across onboarding and support operations, aligning leaders across
              product, IT, and operations through executive workshops, journey architecture, and
              experience design.
            </p>

            <div className="card__viz card__viz--live relative !block min-h-[180px] !p-2">
              <DashboardFineGridOverlay />
              <div className="relative z-[1] flex min-h-[140px] w-full items-center justify-center">
                <TowerConvergenceViz isHovered={vizAnimOn} />
              </div>
            </div>

            <ul className="kpi-grid">
              <li className="kpi" data-kpi data-target="31" data-suffix="%" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix">%</span>
                </span>
                <span className="kpi__label">MTTR reduction across support operations</span>
              </li>
              <li className="kpi" data-kpi data-target="30" data-suffix="+" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix">+</span>
                </span>
                <span className="kpi__label">CX &amp; EX outcomes delivered</span>
              </li>
              <li className="kpi" data-kpi data-target="13" data-suffix="%+" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix">%+</span>
                </span>
                <span className="kpi__label">NPS improvement across EX</span>
              </li>
              <li className="kpi" data-kpi data-target="13" data-suffix="K" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix">K</span>
                </span>
                <span className="kpi__label">Annual lockouts eliminated</span>
              </li>
            </ul>

            <p className="card__tags">
              CX Transformation · Service Design · Operational Alignment · Executive Facilitation
            </p>
          </article>

          {/* EY */}
          <article className="card" data-card="ey">
            <span className="xhair xhair-tl" aria-hidden="true" />
            <span className="xhair xhair-tr" aria-hidden="true" />
            <span className="xhair xhair-bl" aria-hidden="true" />
            <span className="xhair xhair-br" aria-hidden="true" />

            <div className="card__head">
              <div className="card__logo">
                <Image src={logoPaths.EY!} alt="EY" width={120} height={28} className="h-7 w-auto object-contain object-left" />
              </div>
              <p className="kicker">FIG. 03-C</p>
              <span className="card__rev" aria-hidden="true">
                REV. 02
              </span>
            </div>
            <h3 className="card__h">Drove COVID-19 vaccination engagement across the Southeast.</h3>
            <p className="card__narr">
              Led public health experience strategy for Georgia DPH and multi-state initiatives,
              designing engagement models that increased vaccine uptake across diverse populations.
            </p>

            <div className="card__viz card__viz--live relative !block min-h-[180px] !p-2">
              <DashboardFineGridOverlay />
              <div className="relative z-[1] flex min-h-[140px] w-full items-center justify-center">
                <OrchestrationTimelineViz isHovered={vizAnimOn} />
              </div>
            </div>

            <ul className="kpi-grid">
              <li className="kpi" data-kpi data-target="4.57" data-suffix="M" data-decimals="2">
                <span className="kpi__num">
                  <span className="kpi__val">0.00</span>
                  <span className="kpi__suffix">M</span>
                </span>
                <span className="kpi__label">Engagements via social media</span>
              </li>
              <li className="kpi" data-kpi data-target="715" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                </span>
                <span className="kpi__label">Vaccinations delivered</span>
              </li>
              <li className="kpi" data-kpi data-target="40" data-suffix="+" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix">+</span>
                </span>
                <span className="kpi__label">Live vaccination hours</span>
              </li>
              <li className="kpi" data-kpi data-target="24" data-suffix="+" data-decimals="0">
                <span className="kpi__num">
                  <span className="kpi__val">0</span>
                  <span className="kpi__suffix">+</span>
                </span>
                <span className="kpi__label">Local partners</span>
              </li>
            </ul>

            <p className="card__tags">
              Public Health Strategy · Healthcare Experience · Patient Engagement · Ecosystem Orchestration
            </p>
          </article>
        </div>
      </section>

      <p className="dim">→ credential · in progress</p>

      {/* ANIMATION SPEC 3E — STANFORD — CSS pulse */}
      <section className="cred" aria-label="Stanford AI credential">
        <span className="margin-note">FIG. 04 · SEE TRANSCRIPT</span>
        <article className="cred__card">
          <span className="xhair xhair-tl" aria-hidden="true" />
          <span className="xhair xhair-tr" aria-hidden="true" />
          <span className="xhair xhair-bl" aria-hidden="true" />
          <span className="xhair xhair-br" aria-hidden="true" />

          <div className="cred__head">
            <p className="kicker">FIG. 04 · CREDENTIAL · IN PROGRESS</p>
            <span className="cred__pulse" aria-hidden="true" />
          </div>
          <div className="cred__body">
            <div className="cred__lockup">
              <span className="cred__badge">STANFORD</span>
              <div className="cred__lock">
                <h3>AI for Product Strategy</h3>
                <p>
                  Professional Certificate · In progress · Est. completion <b>May 2026</b>
                </p>
              </div>
            </div>
            <p className="cred__desc">
              AI for product and experience strategy. Forward-looking — by the time the program ends,
              the work in this portfolio will already reflect it.
            </p>
          </div>
          <div className="cred__foot">
            <a
              className="cta cta--quiet"
              href="https://programs.stanfordonline.global-alumni.com/ai-driven-leadership?utm_source=Google&utm_medium=c&utm_term=stanford%20ai%20certificate&utm_location=9028841&utm_network=g&utm_campaign=b-365d_US_GG_SE_STF-DLA_Brand&utm_content=AI_Generic_Course&gad_source=1&gad_campaignid=21487178073&gbraid=0AAAAAC-ids2opJ-GsShjjgpDbM7pvg5pI&gclid=Cj0KCQjwr4jSBhCSARIsAOX1E-Kp9AYxo1KRiA_ADIhOV7yfF6bg898AzubhRs_hi_cQfr1ZemndPCQaAnXmEALw_wcB"
              target="_blank"
              rel="noopener noreferrer"
            >
              View program <span aria-hidden="true">→</span>
            </a>
            <span className="cred__meta">SHEET 04 / 04 · SCALE NOT TO SCALE · DRAWN M. STANGL · DATE 2026-04</span>
          </div>
        </article>
      </section>

      <p className="dim">↘ documented work</p>

      {/* Case studies preview — links to live routes */}
      <section id="cases" className="cases" aria-label="Case Studies preview">
        <span className="margin-note">FIG. 05 · SEE APPENDIX</span>
        <span className="fig-stamp">FIG. 05</span>

        <header className="section-head section-head--split">
          <div>
            <p className="kicker">FIG. 05 · CASES</p>
            <h2>Case studies.</h2>
            <p className="section-head__sub">Five studies. Three enterprise, two methodology.</p>
          </div>
          <Link className="cta" href="/case-studies">
            View all <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="cases__featured">
          <Link className="case case--featured" href="/case-studies/ai">
            <span className="xhair xhair-tl" aria-hidden="true" />
            <span className="xhair xhair-tr" aria-hidden="true" />
            <span className="xhair xhair-bl" aria-hidden="true" />
            <span className="xhair xhair-br" aria-hidden="true" />
            <div className="case__head">
              <p className="kicker">FIG. 05-A · CENTAUR PRACTICE</p>
              <svg className="case__glyph" viewBox="0 0 60 18" aria-hidden="true">
                <polyline
                  points="0,14 8,10 16,12 24,6 32,8 40,3 48,5 60,2"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <h3 className="case__h">I built this portfolio with AI, and kept the decisions human.</h3>
            <p className="case__teaser">
              Six weeks, four tools, one portfolio. Centaur practice — human in the saddle, AI as a
              serious collaborator.
            </p>
            <dl className="case__meta">
              {homeV2CentaurMeta.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="case__artifacts">
              <p className="kicker case__artifacts-eyebrow">Artifacts</p>
              <ul className="case__artifacts-list">
                {homeV2CentaurArtifacts.map((item) => (
                  <li key={item.num}>
                    <span className="case__artifacts-num">{item.num}</span>
                    <span className="case__artifacts-sep" aria-hidden="true">
                      ·
                    </span>
                    <span className="case__artifacts-text">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="case__open">
              Open case <span aria-hidden="true">→</span>
            </span>
          </Link>

          <div className="cases__support">
            <Link className="case" href="/case-studies/synthetic-users">
              <span className="xhair xhair-tl" aria-hidden="true" />
              <span className="xhair xhair-tr" aria-hidden="true" />
              <span className="xhair xhair-bl" aria-hidden="true" />
              <span className="xhair xhair-br" aria-hidden="true" />
              <div className="case__head">
                <p className="kicker">FIG. 05-B · SIMULATION · RESEARCH</p>
                <svg className="case__glyph" viewBox="0 0 60 18" aria-hidden="true">
                  <circle cx="6" cy="9" r="2" fill="var(--accent)" />
                  <circle cx="20" cy="9" r="2" fill="var(--accent)" />
                  <circle cx="34" cy="9" r="2" fill="var(--accent)" />
                  <circle cx="48" cy="9" r="2.4" fill="var(--accent)" />
                </svg>
              </div>
              <h3 className="case__h">Synthetic users as a research method.</h3>
              <p className="case__teaser">
                Nine synthetic reviewers stress-tested this portfolio before launch.
              </p>
              <p className="case__sub">COMPLEMENT · Research · Hypothesis · Pre-launch</p>
              <span className="case__open">
                Open case <span aria-hidden="true">→</span>
              </span>
            </Link>

            <Link className="case" href="/case-studies/autodesk">
              <span className="xhair xhair-tl" aria-hidden="true" />
              <span className="xhair xhair-tr" aria-hidden="true" />
              <span className="xhair xhair-bl" aria-hidden="true" />
              <span className="xhair xhair-br" aria-hidden="true" />
              <div className="case__head">
                <p className="kicker">FIG. 05-C · SERVICE DESIGN · REVENUE</p>
                <svg className="case__glyph" viewBox="0 0 60 18" aria-hidden="true">
                  <rect x="2" y="12" width="6" height="4" fill="var(--accent)" />
                  <rect x="14" y="8" width="6" height="8" fill="var(--accent)" />
                  <rect x="26" y="4" width="6" height="12" fill="var(--accent)" />
                </svg>
              </div>
              <h3 className="case__h">
                Autodesk&apos;s 106% NRR design. The customer value journey behind it.
              </h3>
              <p className="case__teaser">
                From consideration to renewal: the customer value journey that put Autodesk on a 106%
                NRR path.
              </p>
              <p className="case__sub">SCOPE · Service model · Org alignment · Revenue</p>
              <span className="case__open">
                Open case <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="cases__secondary">
          <p className="cases__secondary-label">ALSO ON FILE</p>
          <div className="cases__secondary-grid">
            <Link className="case case--compact" href="/case-studies/wipro">
              <span className="xhair xhair-tl" aria-hidden="true" />
              <span className="xhair xhair-tr" aria-hidden="true" />
              <span className="xhair xhair-bl" aria-hidden="true" />
              <span className="xhair xhair-br" aria-hidden="true" />
              <p className="kicker">04 · WIPRO</p>
              <h3 className="case__h">Lockouts: From 27 Hour MTTR to 22 minutes</h3>
              <p className="case__teaser">
                Estée Lauder&apos;s service desk was taking 3,515 password-reset tickets a month.
              </p>
              <span className="case__open">
                Open case <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link className="case case--compact" href="/case-studies/ey">
              <span className="xhair xhair-tl" aria-hidden="true" />
              <span className="xhair xhair-tr" aria-hidden="true" />
              <span className="xhair xhair-bl" aria-hidden="true" />
              <span className="xhair xhair-br" aria-hidden="true" />
              <p className="kicker">05 · EY HEALTHCARE</p>
              <h3 className="case__h">Vaccine hesitancy isn&apos;t a comms problem. It&apos;s a showing-up problem.</h3>
              <p className="case__teaser">
                Say YES Summer: three cities, ten events — 715 vaccinations delivered where mass media
                couldn&apos;t land.
              </p>
              <span className="case__open">
                Open case <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <p className="dim">→ ongoing archive</p>

      {/* ANIMATION SPEC 3F — SIGNAL — wired via existing YouTubeInline + tile chrome */}
      <section id="signal" className="signal" aria-label="Signal to Story">
        <span className="margin-note">FIG. 06 · SEE FILM ARCHIVE</span>

        <header className="section-head">
          <p className="kicker">{homeV2SignalIntro.kicker}</p>
          <h2>
            {homeV2SignalIntro.headlineLead} <em>{homeV2SignalIntro.headlineEm}</em>
          </h2>
          <p className="section-head__sub">{homeV2SignalIntro.subhead}</p>
        </header>

        <div className="signal__grid">
          {homeV2SignalFilms.map((film) => (
            <figure key={film.yt} className="tile" data-tile data-yt={film.yt}>
              <span className="xhair xhair-tl" aria-hidden="true" />
              <span className="xhair xhair-tr" aria-hidden="true" />
              <span className="xhair xhair-bl" aria-hidden="true" />
              <span className="xhair xhair-br" aria-hidden="true" />
              <div className="tile__media signal-tile-embed">
                <YouTubeInline
                  youtubeId={film.yt}
                  title={film.title}
                  label={film.filmKicker}
                  variant="default"
                  previewStartSeconds={film.previewStartSeconds}
                  previewDurationSeconds={3.5}
                  className="h-full min-h-0 !aspect-auto max-sm:!min-h-0"
                />
              </div>
              <figcaption className="tile__cap">
                <p className="kicker">{film.filmKicker}</p>
                <h4>{film.title}</h4>
                <p>{film.subtitle}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="signal__note kicker">
          Tiles are silent previews. Full films open in their own context with audio.
        </p>
      </section>

      <p className="dim">↓ handoff</p>

      <section className="contact" aria-label="Contact">
        <p className="kicker">FIG. 07 · CONTACT</p>
        <h2 className="contact__h">Let&apos;s talk.</h2>
        <p className="contact__sub">{homeV2Contact.subhead}</p>
        <a className="contact__cta" href="mailto:mtstangl@gmail.com">
          <span>Get in touch</span>
          <b>mtstangl@gmail.com</b>
          <span aria-hidden="true" className="contact__arrow">
            →
          </span>
        </a>
        <ul className="contact__alt">
          <li>
            <a href="https://www.linkedin.com/in/matthewtstangl/" target="_blank" rel="noopener noreferrer">
              LinkedIn →
            </a>
          </li>
          <li>
            <Link href="/about">About →</Link>
          </li>
        </ul>
      </section>

      <footer className="sheet">
        <div className="sheet__cell">
          <span>SHEET</span>
          <b>01 / 10</b>
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
          <span>APPROVED</span>
          <b>SELF</b>
        </div>
        <div className="sheet__cell">
          <span>DATE</span>
          <b>2026-04</b>
        </div>
        <div className="sheet__cell">
          <span>REV.</span>
          <b>02 · TIER A · v2</b>
        </div>
      </footer>

      {/* HANDOFF MANIFEST — preserved as HTML comment for reviewers */}
      {/* NEW: Hero shell + ticker + ledger + dashboard structure + Stanford + cases + signal layout + contact + sheet + dimension notes + preserved viz slots mapped to JourneyFlowViz / TowerConvergenceViz / OrchestrationTimelineViz + logos via /images/logos. WIRED: YouTube IDs via YouTubeInline + signal-story timing hooks. */}
    </div>
  );
}
