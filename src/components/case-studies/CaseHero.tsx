import type { ReactNode } from "react";

export type CaseHeroMeta = {
  role: string;
  timeline: string;
  stack: ReactNode;
  model: ReactNode;
};

type CaseHeroPropsBase = {
  caseNumber: string;
  totalCases: number;
  marginNote: string;
  figStamp: string;
  tag: string;
  headline: ReactNode;
  subhead: ReactNode;
  /** Baked halftone hero image (public path). */
  heroImageSrc: string;
  /** Case study picker (Tier-A) — rendered on the photo plate below site nav. */
  picker?: ReactNode;
  /** Override identity strip (default DEN · REMOTE). */
  basedLine?: string;
  /** Override identity strip role line (default DESIGN & BUILD). */
  roleLine?: string;
  /** Optional brief paragraph below subhead inside the hero plate (e.g. Autodesk). */
  heroBrief?: ReactNode;
};

export type CaseHeroProps = CaseHeroPropsBase &
  ({ meta: CaseHeroMeta; metaSlot?: undefined } | { meta?: undefined; metaSlot: ReactNode });

/** Shared halftone hero shell for Tier A case studies (Cases 01–05). Layout + image recipe are fixed. */
export function CaseHero({
  caseNumber,
  totalCases,
  marginNote,
  figStamp,
  tag,
  headline,
  subhead,
  heroImageSrc,
  meta,
  metaSlot,
  picker,
  basedLine = "DEN · REMOTE",
  roleLine = "DESIGN & BUILD",
  heroBrief,
}: CaseHeroProps) {
  const idStripCase = `${caseNumber} / ${String(totalCases).padStart(2, "0")}`;

  const metaDl =
    metaSlot ??
    (meta ? (
      <>
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
      </>
    ) : null);

  return (
    <section className="hero" id="hero" aria-label="Hero" data-screen-label="01 Hero">
      <span className="margin-note">{marginNote}</span>

      <div className="hero__plate">
        <div className="hero__bgphoto" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- hero plate uses shared CSS filter pipeline */}
          <img
            className="hero__bgphoto-img"
            src={heroImageSrc}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero__bgphoto-duotone" aria-hidden="true" />
          <div className="hero__bgphoto-halftone" aria-hidden="true" />
          <div className="hero__bgphoto-grain" aria-hidden="true" />
          <div className="hero__bgphoto-scrim" aria-hidden="true" />
          <div className="hero__bgphoto-fadebottom" aria-hidden="true" />
        </div>

        {picker ? (
          <div className="hero__plate-picker" data-zone="case-picker">
            {picker}
          </div>
        ) : null}

        <div className="hero__stamp-stack" aria-label="Sheet metadata">
          <span className="fig-stamp hero__fig-stamp">{figStamp}</span>
          <dl className="hero__id-strip">
            <dt>CASE NO.</dt>
            <dd>{idStripCase}</dd>
            <dt>BASED</dt>
            <dd>{basedLine}</dd>
            <dt>ROLE</dt>
            <dd>{roleLine}</dd>
            <dt>REV.</dt>
            <dd>v2026.04</dd>
          </dl>
        </div>

        <div className="hero__watermark" aria-hidden="true" hidden>
          {/* Fallback watermark SVG omitted — prototype ships hidden */}
        </div>

        <div className="hero__inner">
          <p className="hero__tag">{tag}</p>
          <h1 className="hero__h1">{headline}</h1>
          <p className="hero__sub">{subhead}</p>
          {heroBrief ? <div className="hero__brief">{heroBrief}</div> : null}
        </div>
      </div>

      <dl className="hero__meta">{metaDl}</dl>
    </section>
  );
}
