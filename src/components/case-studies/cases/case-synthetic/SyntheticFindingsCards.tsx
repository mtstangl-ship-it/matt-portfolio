const FINDINGS = [
  {
    num: "F·01",
    tag: "The tell",
    tagClass: "tell",
    title: "PRESENTATION-TO-DEPTH RATIO",
    finding: (
      <>
        The ratio of presentation quality to case study depth reads as an AI-generation signal to
        experienced reviewers — <em>not the AI use itself.</em>
      </>
    ),
    decision: (
      <>
        The fix wasn&apos;t less AI. It was <b>more depth.</b>
      </>
    ),
    outcome: "Centaur Practice case study expanded from stub to full Service Records cluster.",
  },
  {
    num: "F·02",
    tag: "Metric class",
    tagClass: "",
    title: "METRIC CATEGORY MIXING",
    finding: (
      <>
        <b>&ldquo;$50M YOY AOV&rdquo;</b> and <b>&ldquo;15 services shipped&rdquo;</b> belong to different
        metric categories — outcome vs output. Their coexistence undermines the more defensible numbers.
      </>
    ),
    decision: (
      <>
        A recruiter wouldn&apos;t notice. <b>A hiring design leader will.</b>
      </>
    ),
    outcome:
      "\u201c15 services shipped\u201d replaced with \u201cBusiness plan renewal rate exceeded 75% goal in Q1 post-launch\u201d — a behavior-change metric, not an activity count.",
  },
  {
    num: "F·03",
    tag: "Meta",
    tagClass: "meta",
    title: "META-IRONY",
    finding: (
      <>
        The Synthetic Users case study — the very methodology being documented here — had no methodology
        shown. Meta-irony surfaced only by running the session.
      </>
    ),
    decision: (
      <>
        The fix: show the persona card, show the hypothesis, show the finding.{" "}
        <b>Which is what this case study now does.</b>
      </>
    ),
    outcome:
      "This page. Restructured from 3-section stub to six-section documented methodology with two artifact links.",
  },
] as const;

/** Service Records F-card grammar — inherited from Centaur pattern, not redesigned. */
export function SyntheticFindingsCards() {
  return (
    <>
      <div className="synth-fcards-head">SERVICE RECORD · 03 FINDINGS · ALL SHIPPED</div>
      <div className="synth-fcards">
        {FINDINGS.map((f) => (
          <article key={f.num} className="synth-fcard">
            <div className="synth-fcard__fid">
              <span className="synth-fcard__num">{f.num}</span>
              <span className={`synth-fcard__tag${f.tagClass ? ` ${f.tagClass}` : ""}`}>{f.tag}</span>
            </div>
            <div className="synth-fcard__body">
              <div className="synth-fcard__title">{f.title}</div>
              <p className="synth-fcard__finding">{f.finding}</p>
              <div className="synth-fcard__decision">
                <span className="synth-fcard__decision-arrow" aria-hidden="true">
                  →
                </span>
                <span>{f.decision}</span>
              </div>
              <div className="synth-fcard__outcome">BECAME SHIPPED CHANGE · {f.outcome}</div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
