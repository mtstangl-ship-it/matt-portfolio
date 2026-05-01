import type { ReactNode } from "react";

export type CaseHeroMeta = {
  role: string;
  timeline: string;
  stack: ReactNode;
  model: ReactNode;
};

export type CaseHeroProps = {
  caseNumber: string;
  totalCases: number;
  marginNote: string;
  figStamp: string;
  tag: string;
  headline: ReactNode;
  subhead: ReactNode;
  meta: CaseHeroMeta;
};

/** Shared halftone hero shell for Tier A case studies (Cases 01–05). Photo plate is fixed. */
export function CaseHero({
  caseNumber,
  totalCases,
  marginNote,
  figStamp,
  tag,
  headline,
  subhead,
  meta,
}: CaseHeroProps) {
  const idStripCase = `${caseNumber} / ${String(totalCases).padStart(2, "0")}`;

  return (
    <section className="hero" id="hero" aria-label="Hero" data-screen-label="01 Hero">
      <span className="margin-note">{marginNote}</span>
      <span className="fig-stamp">{figStamp}</span>

      <div className="hero__plate">
        <div className="hero__bgphoto" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- hero plate matches prototype filter pipeline */}
          <img
            className="hero__bgphoto-img"
            src="/case-studies/centaur-literal.png"
            alt=""
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero__bgphoto-halftone" aria-hidden="true" />
          <div className="hero__bgphoto-grain" aria-hidden="true" />
          <div className="hero__bgphoto-scrim" aria-hidden="true" />
          <div className="hero__bgphoto-fadebottom" aria-hidden="true" />
        </div>

        <div className="hero__watermark" aria-hidden="true" hidden>
          {/* Fallback watermark SVG omitted — prototype ships hidden */}
        </div>

        <dl className="hero__id-strip" aria-label="Identity">
          <dt>CASE NO.</dt>
          <dd>{idStripCase}</dd>
          <dt>BASED</dt>
          <dd>DEN · REMOTE</dd>
          <dt>ROLE</dt>
          <dd>DESIGN &amp; BUILD</dd>
          <dt>REV.</dt>
          <dd>v2026.04</dd>
        </dl>

        <div className="hero__inner">
          <p className="hero__tag">{tag}</p>
          <h1 className="hero__h1">{headline}</h1>
          <p className="hero__sub">{subhead}</p>
        </div>
      </div>

      <dl className="hero__meta">
        <div className="hero__meta-cell">
          <dt>Role</dt>
          <dd>{meta.role}</dd>
        </div>
        <div className="hero__meta-cell">
          <dt>Timeline</dt>
          <dd>{meta.timeline}</dd>
        </div>
        <div className="hero__meta-cell">
          <dt>Stack</dt>
          <dd>{meta.stack}</dd>
        </div>
        <div className="hero__meta-cell">
          <dt>Model</dt>
          <dd>{meta.model}</dd>
        </div>
      </dl>
    </section>
  );
}
