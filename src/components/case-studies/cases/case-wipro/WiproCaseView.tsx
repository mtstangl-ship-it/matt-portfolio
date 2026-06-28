"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DimScale } from "../../DimScale";
import { CaseHero } from "../../CaseHero";
import { CasePicker } from "../../CasePicker";

/** Tier-A port of the Claude-Design Wipro V5 — case-specific artifacts only.
 * Production primitives (SiteNav via FicheNav, CaseHero, CasePicker, sheet footer, fiche stamps)
 * are reused; V5's site nav, case picker, gutter-mark marginalia, and stamp row are NOT ported. */
export function WiproCaseView() {
  const monumentUnderlineRef = useRef<HTMLDivElement | null>(null);
  const [monumentDrawn, setMonumentDrawn] = useState(false);

  const ladderRef = useRef<HTMLElement | null>(null);
  const [ladderRedrawn, setLadderRedrawn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const fireOnce = (
      el: Element | null,
      apply: () => void,
      threshold = 0.35,
    ) => {
      if (!el) return;
      if (reduced || !("IntersectionObserver" in window)) {
        apply();
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              apply();
              io.disconnect();
            }
          });
        },
        { threshold },
      );
      io.observe(el);
      return () => io.disconnect();
    };

    const cleanA = fireOnce(monumentUnderlineRef.current, () => setMonumentDrawn(true), 0.4);
    const cleanB = fireOnce(ladderRef.current, () => setLadderRedrawn(true), 0.35);
    return () => {
      cleanA?.();
      cleanB?.();
    };
  }, []);

  return (
    <div className="case-wipro-portfolio case-wipro-body">
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <CaseHero
        heroImageSrc="/case-studies/wipro-elc-workshop-halftone.png"
        picker={<CasePicker activeSlug="wipro" />}
        caseNumber="04"
        totalCases={5}
        marginNote="DRAWING 01 · HERO"
        figStamp="FIG. 01 · HERO"
        tag="01 · BRIEF · CASE 04 OF 05"
        basedLine="DEN · REMOTE"
        roleLine="CX & EX TRANSFORMATION"
        headline={
          <>
            Lockouts: From 27 Hour MTTR to <em>22 minutes</em>
          </>
        }
        subhead={
          <>
            Estée Lauder&apos;s desk was taking 3,515 password-reset tickets a month, escalating 42.6%. I{" "}
            <em>unified six ITIL towers</em> into one operating model.
          </>
        }
        metaSlot={
          <>
            <div className="hero__meta-cell">
              <dt>WINDOW</dt>
              <dd>
                ~6 weeks <small>90-day SPLUNK analysis</small>
              </dd>
            </div>
            <div className="hero__meta-cell">
              <dt>CLIENT</dt>
              <dd>
                Wipro Digital <small>Estée Lauder Companies (ELC)</small>
              </dd>
            </div>
            <div className="hero__meta-cell">
              <dt>SCOPE</dt>
              <dd>
                <b>6 ITIL towers · 3 unified tiers</b>
                <small>~40K employees</small>
              </dd>
            </div>
            <div className="hero__meta-cell">
              <dt>INTAKE</dt>
              <dd>
                <b>3,515 password-reset INCs/mo</b>
                <small>42.6% escalating</small>
              </dd>
            </div>
          </>
        }
      />

      <DimScale label="↓ delta · MTTR reduction for lockouts" />

      {/* Section 01 · Delta · MONUMENT */}
      <section className="delta" aria-label="Delta" data-screen-label="01 Delta">
        <span className="margin-note">DRAWING 01 · DELTA</span>
        <span className="fig-stamp">FIG. 01 · MTTR REDUCTION FOR LOCKOUTS</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>01 / 05</dd>
          <dt>CLAIM</dt>
          <dd>98.64% MTTR REDUCTION</dd>
          <dt>BASELINE</dt>
          <dd>27H → 22 MIN LOCKOUTS</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="delta__inner case-section__inner">
          <p className="delta__kicker">01 · DELTA</p>

          <figure
            className="monument-card monument-card--decimal-pct"
            aria-label="98.64% MTTR reduction for lockouts"
          >
            <p className="monument-card__label monument-card__label--sentence">
              <span className="accent">MTTR Reduction for Lockouts</span>
            </p>

            <div className="monument-card__big" aria-hidden="true">
              <span className="num">98.64</span>
              <span className="pct">%</span>
            </div>

            <div
              ref={monumentUnderlineRef}
              className={`monument-card__underline${monumentDrawn ? " is-drawn" : ""}`}
              aria-hidden="true"
            />

            <figcaption className="monument-card__source">
              <span>
                SOURCE · <span className="accent">SERVICENOW + SPLUNK</span>
              </span>
              <span>90-DAY ANALYSIS</span>
            </figcaption>
          </figure>

          <div className="monument-strip" aria-label="Supporting outcomes">
            <div className="monument-strip__cell">
              <span className="v">
                <span className="accent">13K</span>
              </span>
              <span className="l">Annual lockouts eliminated</span>
            </div>
            <div className="monument-strip__cell">
              <span className="v">
                <span className="accent">+13%</span>
              </span>
              <span className="l">NPS over goal · post-redesign</span>
            </div>
            <div className="monument-strip__cell">
              <span className="v">
                <span className="accent">30+</span>
              </span>
              <span className="l">Operational outcomes shipped</span>
            </div>
          </div>
        </div>
      </section>

      <DimScale label="↓ diagnosis · where lockouts actually came from" />

      {/* Section 02 · Diagnosis · LOCKOUT ECONOMICS */}
      <section className="diagnosis" aria-label="Diagnosis" data-screen-label="02 Diagnosis">
        <span className="margin-note">DRAWING 02 · DIAGNOSIS</span>
        <span className="fig-stamp">FIG. 02 · LOCKOUT ECONOMICS</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>02 / 05</dd>
          <dt>CLAIM</dt>
          <dd>43% · BROWSER-CACHE ORIGIN</dd>
          <dt>BASELINE</dt>
          <dd>3,515 INC/MO · 42.6% ESC.</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="diagnosis__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">02 · DIAGNOSIS · WHERE LOCKOUTS ACTUALLY CAME FROM</p>
          </header>

          <div className="economics" aria-label="Lockout Economics">
            <header className="economics__header">
              <div className="economics__title">
                LOCKOUT.ECONOMICS
                <small>Password reset &amp; lockout INCs · 90-day SPLUNK analysis · ELC Service Desk</small>
              </div>
              <div className="economics__source">SOURCE · SPLUNK + ServiceNow</div>
            </header>

            <div className="economics__cards">
              <article className="ec-card ec-card--vol">
                <div className="ec-card__stamp">
                  <span className="figid">FIG. 02-A</span>
                  <span className="role">Intake</span>
                </div>
                <div className="ec-card__num">3,515</div>
                <div className="ec-card__lbl">
                  Password reset &amp; lockout INCs
                  <br />
                  <strong>per month · Service Desk intake</strong>
                  <br />
                  <span className="muted">100% incoming</span>
                </div>
              </article>

              <article className="ec-card ec-card--leak">
                <div className="ec-card__stamp">
                  <span className="figid">FIG. 02-B</span>
                  <span className="role">Escalation</span>
                </div>
                <div className="ec-card__num">
                  42.6<small>%</small>
                </div>
                <div className="ec-card__lbl">
                  Escalated beyond Service Desk
                  <br />
                  <strong>~1,498 INCs leaking to higher tiers</strong>
                </div>
                <div className="ec-card__notes">
                  <span>— SD agents could not localize complex lockouts</span>
                  <span>— No cross-tool telemetry · AD, Cisco ISE, endpoint all separate</span>
                  <span>— Inaccurate routing · repeated customer restarts</span>
                </div>
              </article>

              <article className="ec-card ec-card--cost">
                <div className="ec-card__stamp">
                  <span className="figid">FIG. 02-C</span>
                  <span className="role">Latency</span>
                </div>
                <div className="ec-card__num">4×</div>
                <div className="ec-card__lbl">
                  Time-to-resolve when escalated
                  <br />
                  <strong>vs. cases closed at the Service Desk</strong>
                </div>
                <div className="ec-card__notes">
                  <span>
                    <b>ROOT CAUSE · 43%</b> of lockouts traced to browser-cached passwords, not AD policy and not user error in the usual sense. Invisible to legacy routing.
                  </span>
                </div>
              </article>

              <article className="ec-card ec-card--target">
                <div className="ec-card__stamp">
                  <span className="figid">FIG. 02-D</span>
                  <span className="role">Target</span>
                </div>
                <div className="ec-card__num">
                  10<small>%</small>
                </div>
                <div className="ec-card__lbl">
                  Reduction target
                  <br />
                  <strong>Redesign + SPLUNK-driven routing</strong>
                </div>
                <div className="ec-card__sub">
                  <span>$62K</span>
                  <span>SD cost / yr saved</span>
                  <span>2,283 h</span>
                  <span>Employee time / yr</span>
                  <span>15K+ h</span>
                  <span>Resolver-group time</span>
                </div>
              </article>
            </div>

            <div className="diagnostic" aria-label="The query that made lockouts legible">
              <header className="diagnostic__head">
                <span className="ttl">The query that made lockouts legible</span>
                <span className="stamp">FIG. 02-E · Diagnostic</span>
              </header>
              <div className="diagnostic__body">
                <p>
                  A single SPLUNK query — written by Wipro&apos;s CAS team, surfaced to 10 of 80+ SD agents — correlated AD lockout
                  events (EventCode 4740) with source host, caller, and signature. <b>Before:</b> lockouts were anonymous. <b>After:</b>{" "}
                  every lockout had a traceable origin — device, browser, session, repeat-offender pattern.
                </p>
                <code>
                  <span className="kw">source</span>=WinEventLog:Security <span className="kw">EventCode</span>=4740 <span className="pipe">|</span>{" "}
                  <span className="kw">dedup</span> _time user EventCode <span className="pipe">|</span> <span className="kw">eval</span>{" "}
                  host=coalesce(Caller_Computer_Name, host) <span className="pipe">|</span> <span className="kw">eval</span>{" "}
                  signature=COALESCE(signature, failure_reason)
                </code>
                <p>
                  <em>You can&apos;t redesign what you can&apos;t see.</em>
                </p>
              </div>
            </div>

            <div className="diag-foot" aria-label="Diagnostic footnotes">
              <div className="diag-foot__cell">
                <span className="v">
                  <span className="accent">35%</span> · by phone
                </span>
                <span className="l">Lockouts handled · pre-redesign</span>
              </div>
              <div className="diag-foot__cell">
                <span className="v">
                  <span className="accent">50+ · 200+</span>
                </span>
                <span className="l">Repeat users · INCs · reviewed via SPLUNK</span>
              </div>
              <div className="diag-foot__cell">
                <span className="v">
                  <span className="accent">10 / 80+</span>
                </span>
                <span className="l">Agents with SPLUNK access · day-one gap</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DimScale label="↓ flow · one ticket, two models" />

      {/* Section 03 · Flow · BEFORE / AFTER */}
      <section className="flow-section" aria-label="Flow" data-screen-label="03 Flow">
        <span className="margin-note">DRAWING 03 · FLOW</span>
        <span className="fig-stamp">FIG. 03 · SERVICE RECORD</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>03 / 05</dd>
          <dt>CLAIM</dt>
          <dd>27H → 22MIN · SAME TICKET</dd>
          <dt>BASELINE</dt>
          <dd>4 HANDOFFS · 3 RESTARTS</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="flow-section__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">04 · FLOW · ONE TICKET, TWO MODELS</p>
            <h2>
              One ticket. Two models. <em>Same Monday morning.</em>
            </h2>
            <p className="case-section-head__sub flow-prose">
              Same employee, same problem, same Monday morning. <b>Before:</b> they restart the story at every handoff. <b>After:</b> the
              context travels with the case and the Service Desk closes it before coffee gets cold.
            </p>
          </header>

          <div className="flow" aria-label="Before vs after service records">
            <div className="flow__lane flow__lane--before" aria-label="Before · legacy lane">
              <header className="flow__lane-head">
                <span className="ttl">
                  <span className="accent">BEFORE</span> · Legacy
                </span>
                <span className="meta">FIG. 03-A · Service record</span>
              </header>
              <p className="flow__sub">Context lost at every handoff · 6 towers · manual routing · customer restarts</p>

              <article className="flow-step">
                <span className="flow-step__time">09:12</span>
                <span className="flow-step__dot flow-step__dot--bad" />
                <span className="flow-step__body">
                  <span className="flow-step__role">Claudia</span> Can&apos;t sign in. Calls Service Desk.
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">09:18</span>
                <span className="flow-step__dot flow-step__dot--bad" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--bad">SD Agent · T1</span>
                  AD lockout assumed. Resets password. Hangs up.
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">10:47</span>
                <span className="flow-step__dot flow-step__dot--bad" />
                <span className="flow-step__body">
                  <span className="flow-step__role">Claudia</span>
                  Locked out again. Different agent.
                  <span className="flow-step__exception">Restarts the story.</span>
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">11:02</span>
                <span className="flow-step__dot flow-step__dot--bad" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--bad">SD Agent · T1</span>
                  Routes to AD Engineering — suspected policy issue.
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">Hour 8</span>
                <span className="flow-step__dot flow-step__dot--bad" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--bad">AD Tower · T2</span>
                  No AD issue. Bounces to Endpoint.
                  <span className="flow-step__exception">No context payload.</span>
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">Hour 19</span>
                <span className="flow-step__dot flow-step__dot--bad" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--bad">Endpoint Tower</span>
                  Requests Claudia&apos;s asset ID.
                  <span className="flow-step__exception">Third restart.</span>
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">Hour 25</span>
                <span className="flow-step__dot flow-step__dot--bad" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--bad">Network Tower</span>
                  Routed again. Cisco ISE logs requested.
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">Hour 27</span>
                <span className="flow-step__dot flow-step__dot--ok" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--ok">Resolved</span>
                  Root cause: browser-cached password.
                  <span className="flow-step__exception">Nobody writes that down.</span>
                </span>
              </article>

              <div className="flow__totals" aria-label="Before totals">
                <div className="cell">
                  <span className="v">27 hours</span>
                  <span className="l">MTTR</span>
                </div>
                <div className="cell">
                  <span className="v">4</span>
                  <span className="l">Tower handoffs</span>
                </div>
                <div className="cell">
                  <span className="v">3</span>
                  <span className="l">Customer restarts</span>
                </div>
              </div>
            </div>

            <div className="flow__divider" aria-hidden="true">
              <p className="flow__divider-inner">
                <span>vs.</span>
                <span>Same ticket</span>
                <span className="accent">New model</span>
              </p>
            </div>

            <div className="flow__lane flow__lane--after" aria-label="After · redesigned lane">
              <header className="flow__lane-head">
                <span className="ttl">
                  <span className="accent">AFTER</span> · Redesigned
                </span>
                <span className="meta">FIG. 03-B · Service record</span>
              </header>
              <p className="flow__sub">Context travels with the case · 3 tiers · SPLUNK-aware routing · structured intake</p>

              <article className="flow-step">
                <span className="flow-step__time">
                  <span className="accent">09:12</span>
                </span>
                <span className="flow-step__dot flow-step__dot--ai" />
                <span className="flow-step__body">
                  <span className="flow-step__role">Claudia</span>
                  Can&apos;t sign in. Opens intake via self-service.
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">
                  <span className="accent">09:12</span>
                </span>
                <span className="flow-step__dot flow-step__dot--ai" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--ai">Intake · SPLUNK</span>
                  Correlates AD event 4740 + source host + signature.
                  <span className="flow-step__exception flow-step__exception--ok">Flags browser-cache pattern.</span>
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">
                  <span className="accent">09:17</span>
                </span>
                <span className="flow-step__dot flow-step__dot--ai" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--ai">SD Agent · T1</span>
                  Ticket opens with full payload: user, host, signature, 2 prior lockouts. Agent runs the browser-cache playbook.
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">
                  <span className="accent">09:34</span>
                </span>
                <span className="flow-step__dot flow-step__dot--ok" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--ok">Resolved · T1</span>
                  Cleared Chrome credential cache. Guided re-auth. Closed at Service Desk.
                </span>
              </article>
              <article className="flow-step">
                <span className="flow-step__time">
                  <span className="accent">09:34</span>
                </span>
                <span className="flow-step__dot flow-step__dot--ai" />
                <span className="flow-step__body">
                  <span className="flow-step__role flow-step__role--ai">Feedback loop</span>
                  Resolution pattern logged. If the same signature fires 3× for a user, it routes direct-to-playbook next time.
                </span>
              </article>

              <div className="flow__totals" aria-label="After totals">
                <div className="cell">
                  <span className="v">22 min</span>
                  <span className="l">MTTR</span>
                </div>
                <div className="cell">
                  <span className="v">0</span>
                  <span className="l">Tower handoffs</span>
                </div>
                <div className="cell">
                  <span className="v">0</span>
                  <span className="l">Customer restarts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DimScale label="↓ design · six towers, three tiers" />

      {/* Section 04 · Design · Tier ladder + Move 02 */}
      <section className="design" aria-label="Design" data-screen-label="04 Design">
        <span className="margin-note">DRAWING 04 · DESIGN</span>
        <span className="fig-stamp">FIG. 04 · OPERATING MODEL</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>04 / 05</dd>
          <dt>CLAIM</dt>
          <dd>6 TOWERS → 3 TIERS</dd>
          <dt>BASELINE</dt>
          <dd>OPS STAFFING · ENFORCED CEILING</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="design__inner case-section__inner">
          <header className="case-section-head">
            <p className="kicker">04 · DESIGN · SIX TOWERS, THREE TIERS</p>
            <h2>
              Ops said three tiers was the ceiling. <em>They were right.</em>
            </h2>
          </header>

          <p className="design-prose">
            My first design was four tiers. Operations pushed back — given current staffing, they&apos;d be stuck running two of them
            understaffed. We rebuilt around three. It performed better because every team could actually own their lane without
            ambiguity.
          </p>

          <figure
            ref={ladderRef}
            className={`ladder${ladderRedrawn ? " is-redrawn" : ""}`}
            aria-label="Six towers redraw into three tiers"
          >
            <span className="ladder__stamp">REV. 02 · Redrawn</span>

            <header className="ladder__title-row">
              <span className="ladder__title">FIG. 04 · Operating-model assembly</span>
              <span className="ladder__scale">
                <span className="accent">SCALE</span> · 1 : 1
              </span>
            </header>

            <p className="ladder__sixmeta">
              <span>BEFORE · 6 towers</span>
              <span className="accent">No shared metrics · no common escalation</span>
            </p>

            <div className="ladder__six" aria-label="Six legacy ITIL towers">
              <div className="tower">
                <p className="tower__id">A·1</p>
                <p className="tower__label">
                  AD<br />Engineering
                </p>
              </div>
              <div className="tower">
                <p className="tower__id">A·2</p>
                <p className="tower__label">
                  Endpoint<br />Compute
                </p>
              </div>
              <div className="tower">
                <p className="tower__id">A·3</p>
                <p className="tower__label">
                  Network<br />Cisco ISE
                </p>
              </div>
              <div className="tower">
                <p className="tower__id">A·4</p>
                <p className="tower__label">
                  App &amp;<br />Identity
                </p>
              </div>
              <div className="tower">
                <p className="tower__id">A·5</p>
                <p className="tower__label">
                  Service<br />Desk
                </p>
              </div>
              <div className="tower">
                <p className="tower__id">A·6</p>
                <p className="tower__label">
                  Operations<br />&amp; Eng
                </p>
              </div>
            </div>

            <div className="ladder__lines" aria-hidden="true">
              <svg viewBox="0 0 600 86" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,0 C 50,40 100,40 100,86" />
                <path d="M142,0 C 142,40 100,40 100,86" />
                <path d="M234,0 C 234,40 300,40 300,86" />
                <path d="M325,0 C 325,40 300,40 300,86" />
                <path d="M416,0 C 416,40 500,40 500,86" />
                <path d="M508,0 C 508,40 500,40 500,86" />
              </svg>
            </div>

            <div className="ladder__three" aria-label="Three unified tiers">
              <article className="tier tier--t1">
                <header className="tier__head">
                  <span className="tier__id">T01</span>
                  <span className="tier__target">&lt; 4h target</span>
                </header>
                <p className="tier__title">Triage &amp; Resolve</p>
                <p className="tier__body">
                  Structured intake with SPLUNK-driven payload. Browser-cache playbook lives here. Most cases never need to leave this
                  tier.
                </p>
                <p className="tier__pull">72% close here</p>
              </article>
              <article className="tier tier--t2">
                <header className="tier__head">
                  <span className="tier__id">T02</span>
                  <span className="tier__target">&lt; 2d target</span>
                </header>
                <p className="tier__title">Specialist Engage</p>
                <p className="tier__body">
                  Domain engineers pick up a full context payload. No customer restart. Signature + source host + prior history attached.
                </p>
                <p className="tier__pull">Full payload · zero restarts</p>
              </article>
              <article className="tier tier--t3">
                <header className="tier__head">
                  <span className="tier__id">T03</span>
                  <span className="tier__target">&lt; 5d target</span>
                </header>
                <p className="tier__title">Product &amp; Engineering</p>
                <p className="tier__body">
                  Reserved for defects and architectural fixes. Repeat signatures trigger here, feed the roadmap directly.
                </p>
                <p className="tier__pull">Repeat signatures → roadmap</p>
              </article>
            </div>

            <figcaption className="ladder__caption">
              <span>
                <span className="accent">PROJECTION</span> · six labeled columns redraw into three tiers · construction lines on scroll
              </span>
              <span>SHEET 05 / 06</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <DimScale label="↘ closing · the larger story" />

      {/* Closing strip — aphorism + handoff CTAs */}
      <section className="closing" aria-label="Closing" data-screen-label="05 Closing">
        <span className="margin-note">DRAWING 05 · CLOSING</span>
        <span className="fig-stamp">FIG. 05 · APHORISM</span>

        <div className="closing__inner">
          <p className="closing__aphorism">
            Signals the org can&apos;t see are the signals the org is <em>paying for.</em>
          </p>

          <div className="handoff-pair" aria-label="Handoff CTAs">
            <Link href="/case-studies/ey">
              <span>
                <span className="handoff-pair__lbl">Next case · 05 of 05</span>
                <span className="handoff-pair__ttl">
                  EY Healthcare · <span className="accent">Say YES Summer</span>
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
          <b>04 / 05</b>
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
          <b>CASE 04 · WIPRO</b>
        </div>
      </footer>
    </div>
  );
}
