"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CaseHero } from "../../CaseHero";
import { CasePicker } from "../../CasePicker";
import { DeclarationCentaur } from "./DeclarationCentaur";
import { DeploymentDiffCentaur, ReviewTerminalCentaur, SignalTelemetryCentaur } from "./RecordsCentaur";
import { TelemetryCentaur } from "./TelemetryCentaur";

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

export function CentaurCaseView() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!("IntersectionObserver" in window)) {
      root.querySelectorAll(".case-section, .telemetry, .centaur, .records, .bulletin, .handoff, .hero, .record").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      root.querySelectorAll(".case-section, .telemetry, .centaur, .records, .bulletin, .handoff, .hero, .record").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }
    const nodes = root.querySelectorAll(".case-section, .telemetry, .centaur, .records, .bulletin, .handoff, .hero, .record");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="case-centaur-portfolio case-ai-body">
      <a href="#hero" className="skip">
        Skip to content
      </a>

      <CaseHero
        picker={<CasePicker activeSlug="ai" />}
        caseNumber="01"
        totalCases={5}
        marginNote="DRAWING 01 · HERO"
        figStamp="FIG. 01 · HERO"
        tag="01 · BUILD · CASE 01 OF 05"
        headline={
          <>
            I built this portfolio with AI, and kept the decisions <em>human.</em>
          </>
        }
        subhead={
          <>
            Six weeks. Four tools. One lesson I&apos;ll use for the rest of my career.
            <br />
            <b>AI raises the floor. Taste raises the ceiling.</b>
          </>
        }
        meta={{
          role: "Design & build lead",
          timeline: "Mar 6 — Apr 21, 2026",
          stack: (
            <>
              Cursor <b>·</b> Claude <b>·</b> Claude Design <b>·</b> Vercel
            </>
          ),
          model: (
            <>
              Centaur — <b>human-steered</b>
            </>
          ),
        }}
      />

      <TelemetryCentaur />

      <DimBetween label="↓ METHOD · HOW THE WORK SPLIT" />

      <DeclarationCentaur />

      <section className="records" id="records" aria-label="Service Records" data-screen-label="04 Service Records">
        <DimBetween label="↓ ARTIFACTS · PROOF FOLLOWS" compact />

        <span className="margin-note">DRAWING 04 · ARTIFACTS</span>
        <span className="fig-stamp">FIG. 04 · ARTIFACTS</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>04 / 06</dd>
          <dt>RECORDS</dt>
          <dd>03 · TAP / DRAG / TAP</dd>
          <dt>STATUS</dt>
          <dd>03 LIVE</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="records__inner">
          <header className="case-section-head">
            <div>
              <p className="kicker">04 · SERVICE RECORDS</p>
              <h2>
                Three artifacts. <em>Three interactions.</em>
              </h2>
            </div>
            <p className="case-section-head__sub">
              A service record is what a mechanic logs when work is done — what changed, who did it, when, and why. Tap, drag, tap.
            </p>
          </header>

          <ReviewTerminalCentaur />
          <DeploymentDiffCentaur />
          <SignalTelemetryCentaur />
        </div>
      </section>

      <DimBetween label="↓ BULLETIN · WHERE I PAID" />

      <section className="bulletin" id="bulletin" aria-label="Service Bulletin" data-screen-label="05 Service Bulletin">
        <span className="margin-note">DRAWING 05 · BULLETIN</span>
        <span className="fig-stamp">FIG. 05 · BULLETIN</span>

        <dl className="section-stamp" aria-label="Section metadata">
          <dt>DRAWING NO.</dt>
          <dd>05 / 06</dd>
          <dt>BULLETIN NO.</dt>
          <dd>SB-2026-04</dd>
          <dt>SEVERITY</dt>
          <dd>FIELD ADVISORY</dd>
          <dt>LAST REV.</dt>
          <dd>04/26</dd>
        </dl>

        <div className="bulletin__inner">
          <div className="bulletin__head">
            <div>
              <p className="kicker" style={{ color: "#e86c54" }}>
                05 · SERVICE BULLETIN · WHAT I GOT WRONG
              </p>
              <h2 className="bulletin__h2">
                I skipped the brief twice. <em>I paid for it twice.</em>
              </h2>
            </div>
            <svg className="bulletin__badge" viewBox="0 0 110 110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <circle cx="55" cy="55" r="50" fill="none" stroke="#e86c54" strokeWidth="1.5" />
              <circle cx="55" cy="55" r="42" fill="none" stroke="#e86c54" strokeWidth="0.6" strokeDasharray="3 3" />
              <text x="55" y="48" fontFamily="ui-monospace, monospace" fontSize="9" fill="#e86c54" letterSpacing="2" textAnchor="middle">
                SERVICE
              </text>
              <text x="55" y="62" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="14" fill="#e86c54" textAnchor="middle">
                BULLETIN
              </text>
              <text x="55" y="76" fontFamily="ui-monospace, monospace" fontSize="8" fill="#e86c54" letterSpacing="2" textAnchor="middle">
                SB-2026-04
              </text>
            </svg>
          </div>

          <div className="bulletin__body">
            <p>
              I skipped the brief twice. Both times the failure mode was the same: <b>asking for output without specifying what mattered most.</b>
            </p>
          </div>

          <div className="bulletin__entries">
            <article className="bulletin__entry">
              <header className="bulletin__entry-head">
                <span className="bulletin__entry-ref">REF · 05-A</span>
                <span>ONCE · IMPACT DASHBOARD</span>
              </header>
              <h3 className="bulletin__entry-title">Asked Cursor to &quot;design the impact dashboard.&quot;</h3>
              <p className="bulletin__entry-body">
                No hierarchy, no metric priority, no interaction logic. Output was <b>technically correct and visually incoherent</b> — every element
                equally weighted because I hadn&apos;t said what mattered most. <b>Two hours fixing what a 15-minute brief would have prevented.</b>
              </p>
            </article>
            <article className="bulletin__entry">
              <header className="bulletin__entry-head">
                <span className="bulletin__entry-ref">REF · 05-B</span>
                <span>TWICE · CASE STUDIES</span>
              </header>
              <h3 className="bulletin__entry-title">Let AI write three case studies end to end.</h3>
              <p className="bulletin__entry-body">
                Same root cause as above. Fluent, professional, completely generic. <b>The fix was never less AI. It was more specificity.</b> The
                version you&apos;re reading is the rebuild.
              </p>
            </article>
          </div>

          <aside className="tell" role="note">
            <span className="tell__eyebrow">THE TELL</span>
            <p>
              The ratio of <em>presentation quality to case study depth</em> is the AI red flag — not the AI use itself. Experienced reviewers catch it in 30
              seconds.
            </p>
          </aside>
        </div>
      </section>

      <DimBetween label="↓ HANDOFF · THE LARGER STORY" />

      <section className="handoff" aria-label="Handoff" data-screen-label="06 Handoff">
        <span className="margin-note">DRAWING 06 · HANDOFF</span>
        <span className="fig-stamp">FIG. 06 · HANDOFF</span>

        <div className="handoff__inner">
          <p className="handoff__eyebrow">06 · HANDOFF</p>
          <h2 className="handoff__h">
            The work that made these decisions <em>possible.</em>
          </h2>
          <Link className="handoff__cta" href="/case-studies/synthetic-users">
            Open next case · Synthetic Users
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
          <b>01 / 05</b>
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
          <b>CASE 01 · CENTAUR</b>
        </div>
      </footer>
    </div>
  );
}
