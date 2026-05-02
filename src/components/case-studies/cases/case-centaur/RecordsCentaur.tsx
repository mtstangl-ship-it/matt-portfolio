"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type SevFilter = "all" | "critical" | "major" | "minor" | "reversed";

function sevMatches(filter: SevFilter, dataSev: string | undefined): boolean {
  if (!dataSev) return filter === "all";
  const sevs = dataSev.split(/\s+/);
  if (filter === "all") return true;
  if (filter === "critical") return sevs.includes("critical");
  if (filter === "major") return sevs.includes("major");
  if (filter === "minor") return sevs.includes("minor");
  if (filter === "reversed") return sevs.includes("reversed");
  return false;
}

const FINDINGS: { ref: string; sev: string; tag: string; body: ReactNode }[] = [
  {
    ref: "F·01",
    sev: "critical",
    tag: "cri",
    body: (
      <>
        Hero scatter dominates the page; impact metrics buried below fold. <b>→ promoted Impact Console above scatter (W4).</b>
      </>
    ),
  },
  {
    ref: "F·02",
    sev: "critical reversed",
    tag: "rev",
    body: (
      <>
        Wanted to remove fiche grammar as &quot;too dense.&quot; <b>Reversed: density is the differentiator.</b> Doubled down instead.
      </>
    ),
  },
  {
    ref: "F·03",
    sev: "major",
    tag: "maj",
    body: (
      <>
        Case study sections didn&apos;t earn their length; reading dropped at section 03. <b>→ cut three sections, restructured to 6.</b>
      </>
    ),
  },
  {
    ref: "F·04",
    sev: "major",
    tag: "maj",
    body: (
      <>
        Tone in About slipped to corporate. <b>→ rewrote in first person, motorcycle metaphor stayed.</b>
      </>
    ),
  },
  {
    ref: "F·05",
    sev: "critical",
    tag: "cri",
    body: (
      <>
        Mobile nav broke at 480px; CTA collided with brand. <b>→ collapsed to icon menu under 880px.</b>
      </>
    ),
  },
  {
    ref: "F·06",
    sev: "major",
    tag: "maj",
    body: (
      <>
        Color contrast on .ink-3 below WCAG AA on dim callouts. <b>→ darkened var(--ink-3) by 6%.</b>
      </>
    ),
  },
  {
    ref: "F·07",
    sev: "minor",
    tag: "min",
    body: (
      <>
        FIG stamp positioning drifted between hero and ledger. <b>→ standardized to absolute · top:1rem · right:1rem.</b>
      </>
    ),
  },
  {
    ref: "F·08",
    sev: "major reversed",
    tag: "rev",
    body: (
      <>
        AI suggested removing the section dimension callouts. <b>Reversed: they&apos;re the page rhythm.</b> Kept all five.
      </>
    ),
  },
  {
    ref: "F·09",
    sev: "major",
    tag: "maj",
    body: (
      <>
        Crosshair fade timing felt mechanical. <b>→ added 400ms transition-delay after IO trigger.</b>
      </>
    ),
  },
  {
    ref: "F·10",
    sev: "critical",
    tag: "cri",
    body: (
      <>
        Impact Console tabs not keyboard accessible. <b>→ added arrow-key + roving tabindex.</b>
      </>
    ),
  },
  {
    ref: "F·11",
    sev: "major reversed",
    tag: "rev",
    body: (
      <>
        Weekly build log felt redundant next to Build Telemetry. <b>Reversed: vertical log, different scale from Build Telemetry.</b>
      </>
    ),
  },
  {
    ref: "F·12",
    sev: "minor",
    tag: "min",
    body: (
      <>
        Sheet footer cells wrapped at 720px on Safari. <b>→ explicit grid-template-columns + media query.</b>
      </>
    ),
  },
  {
    ref: "F·13",
    sev: "minor",
    tag: "min",
    body: (
      <>
        Inter-Italic loaded 600 weight unused. <b>→ trimmed to 400/500/600 regular only.</b>
      </>
    ),
  },
];

export function ReviewTerminalCentaur() {
  const [filter, setFilter] = useState<SevFilter>("all");

  return (
    <article className="record record--terminal" id="record-review">
      <header className="record__head">
        <h3 className="record__title">Design Review Terminal</h3>
        <p className="record__lede">
          Two critique passes, thirteen findings — <b>tap a pill</b> to narrow the log.
        </p>
      </header>

      <p className="record__eyebrow">
        <span className="ribbon">CLICK PILLS TO FILTER</span>
      </p>

      <div className="review-console" id="review-console">
        <header className="review-console__head">
          <span className="review-console__path">
            <b>~/critique</b> · v2 · post-desktop
          </span>
        </header>

        <div className="review-console__filters" role="tablist" aria-label="Filter findings by severity">
          {(
            [
              ["all", "ALL · ", "13"],
              ["critical", "CRITICAL · ", "4"],
              ["major", "MAJOR · ", "7"],
              ["minor", "MINOR · ", "4"],
              ["reversed", "REVERSED · ", "3"],
            ] as const
          ).map(([key, label, count]) => (
            <button
              key={key}
              type="button"
              className="filter-pill"
              data-filter={key}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
              <b>{count}</b>
            </button>
          ))}
        </div>

        <div className="review-console__body" id="findings-list">
          {FINDINGS.map((f) => (
            <div key={f.ref} className="finding" data-sev={f.sev} hidden={!sevMatches(filter, f.sev)}>
              <span className="finding__ref">{f.ref}</span>
              <span className="finding__sev" data-sev={f.tag}>
                {f.tag.toUpperCase()}
              </span>
              <span className="finding__body">{f.body}</span>
            </div>
          ))}
        </div>

        <footer className="review-console__foot" id="critique-log">
          <span>RUNTIME · 6 WEEKS · PASSES · 2 · SELF-AUTHORED</span>
          <a href="#critique-log">OPEN FULL REVIEW LOG →</a>
        </footer>
      </div>

      <p className="record__note record__note--column">
        Each finding is a <b>real critique</b> I made of my own work, with the decision and reversal logged.{" "}
        <b>Reversals</b> are when AI was right and I was wrong, or vice versa.
      </p>
    </article>
  );
}

export function DeploymentDiffCentaur() {
  const [pos, setPos] = useState(50);
  const posRef = useRef(pos);
  posRef.current = pos;
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const apply = useCallback((p: number) => {
    const next = Math.max(0, Math.min(100, p));
    setPos(next);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const fromEvent = (clientX: number) => {
      const rect = viewport.getBoundingClientRect();
      const x = clientX - rect.left;
      apply((x / rect.width) * 100);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true;
      viewport.setPointerCapture(e.pointerId);
      fromEvent(e.clientX);
      e.preventDefault();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      fromEvent(e.clientX);
    };
    const onPointerUp = () => {
      dragging.current = false;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      let p = posRef.current;
      if (e.key === "ArrowLeft") {
        p -= 4;
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        p += 4;
        e.preventDefault();
      } else if (e.key === "Home") {
        p = 0;
        e.preventDefault();
      } else if (e.key === "End") {
        p = 100;
        e.preventDefault();
      } else return;
      apply(p);
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("keydown", onKeyDown);
    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("keydown", onKeyDown);
    };
  }, [apply]);

  return (
    <article className="record" id="record-diff">
      <header className="record__head">
        <h3 className="record__title">Deployment Diff — Home Hero</h3>
        <p className="record__caption">
          Commit{" "}
          <code style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>4a3f2c</code> →{" "}
          <code style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>9e1ab7</code> · two weeks apart
        </p>
      </header>

      <p className="record__eyebrow">
        <span className="ribbon">DRAG SLIDER</span>
        <span>COMPARE V1 → V2 · TWO WEEKS APART</span>
      </p>

      <div className="diff" id="diff-slider" style={{ "--diff-pos": `${pos}%` } as CSSProperties}>
        <header className="diff__head">
          <span className="commit">
            <b>4a3f2c</b> · APR 08 · v1
          </span>
          <span className="commit">
            v2 · APR 21 · <b>9e1ab7</b>
          </span>
        </header>

        <div
          ref={viewportRef}
          className="diff__viewport"
          id="diff-viewport"
          tabIndex={0}
          role="slider"
          aria-label="Compare v1 and v2 of home hero"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
        >
          <div className="diff__pane diff__pane--v1">
            <span className="diff__pane-stamp">v1 · PRE-DESIGN</span>
            <div className="diff__pane-card">
              <span className="diff__pane-label">v1 · COMMIT 4a3f2c</span>
              <span className="diff__pane-name">Home hero capture · reference archive</span>
              <span className="diff__pane-caption">desktop-1.png — current-state hero composition.</span>
              <span className="diff__pane-tag">SCREENSHOT · 1280×720 · APR 08, 2026</span>
            </div>
          </div>
          <div className="diff__pane diff__pane--v2">
            <span className="diff__pane-stamp">v2 · POST-DESIGN · CAPTURED</span>
            <div className="diff__pane-card">
              <span className="diff__pane-label">v2 · COMMIT 9e1ab7</span>
              <span className="diff__pane-name">Home hero capture · Tier A v2</span>
              <span className="diff__pane-caption">Tier A Home Page 1.png — Claude Design rebuild composition.</span>
              <span className="diff__pane-tag">SCREENSHOT · CAPTURED · APR 21, 2026</span>
            </div>
          </div>

          <div className="diff__markers">
            <span
              className="diff__marker diff__marker--finding"
              data-side="v1"
              style={{ left: "22%", top: "28%" }}
              title="F·01 · Hero scatter dominates"
            />
            <span
              className="diff__marker diff__marker--finding"
              data-side="v1"
              style={{ left: "68%", top: "62%" }}
              title="F·06 · Contrast below AA"
            />
            <span
              className="diff__marker diff__marker--finding"
              data-side="v1"
              style={{ left: "38%", top: "78%" }}
              title="F·09 · Mechanical fade timing"
            />
            <span
              className="diff__marker diff__marker--decision"
              data-side="v2"
              style={{ ["--marker-x" as string]: "22%", left: "22%", top: "28%" }}
              title="D·01 · Promoted impact console"
            />
            <span
              className="diff__marker diff__marker--decision"
              data-side="v2"
              style={{ ["--marker-x" as string]: "68%", left: "68%", top: "62%" }}
              title="D·02 · Darkened ink-3"
            />
            <span
              className="diff__marker diff__marker--decision"
              data-side="v2"
              style={{ ["--marker-x" as string]: "38%", left: "38%", top: "78%" }}
              title="D·03 · Added 400ms IO delay"
            />
          </div>

          <div className="diff__handle" aria-hidden="true" />
        </div>

        <footer className="diff__foot">
          <span className="legend">
            <span>
              <i className="f" />
              v1 findings · <b>3</b>
            </span>
            <span>
              <i className="d" />
              v2 decisions · <b>3</b>
            </span>
          </span>
          <span className="hint">← → arrow keys</span>
        </footer>
      </div>

      <p className="record__note">
        v1 was my best work without Claude Design. v2 is what happens when{" "}
        <b>AI extends the design system rather than just executes the spec.</b>
      </p>
    </article>
  );
}

const SIGNAL_ENTRIES = [
  {
    date: "MAR 06",
    wk: "WK 01",
    node: "W1",
    title: "IA · No design",
    quote: '"What pages, what hierarchy, what each section has to say."',
    commits: "06",
    deploys: "0",
    detail:
      "Cursor as structural partner. No visual decisions yet. **4 prompts** to a confirmed sitemap. The site exists as a folder of empty HTML files with semantic structure and zero opinions about how it looks.",
  },
  {
    date: "MAR 13",
    wk: "WK 02",
    node: "W2",
    title: "Tokens + grid",
    quote: "Dark theme. Teal accent. Monospace labels.",
    commits: "14",
    deploys: "3",
    detail:
      "Token pass in Claude, implemented in Cursor. **First time the site feels like itself.** The dark/teal/mono triad becomes the visual DNA every later page inherits.",
  },
  {
    date: "MAR 20",
    wk: "WK 03",
    node: "W3",
    title: "Hero scatter added",
    quote: "Particle bloom lands on the hero.",
    commits: "19",
    deploys: "5",
    detail:
      "First moment the site has a strong first impression. **Accident that became a decision** — a Claude experiment I almost didn't keep. The fiche grammar reframed it later as a deliberate signal element.",
  },
  {
    date: "MAR 27",
    wk: "WK 04",
    node: "W4",
    title: "Impact Console ships",
    quote: "The strongest page on the site ships.",
    commits: "23",
    deploys: "8",
    detail:
      "Three tabs, three engagements, per-tier revenue attribution. **Two days of focused build.** The week the portfolio went from \"promising\" to \"shippable\" — and the week I let AI write three case study pages I'd later tear down.",
  },
  {
    date: "APR 03",
    wk: "WK 05",
    node: "W5",
    title: "Claude Design arrives",
    quote: "Apr 17. The tool I needed six weeks ago, six weeks later.",
    commits: "18",
    deploys: "6",
    detail:
      'Cursor becomes the implementer. **The double-diamond on About is designed here, shipped in a day.** The boundary between "design" and "build" gets clearer because each tool now has a lane.',
  },
  {
    date: "APR 10",
    wk: "WK 06 · NOW",
    node: "W6",
    title: "Critique + case studies",
    quote: "Two critique passes. Five case studies. One lesson.",
    commits: "25",
    deploys: "7",
    detail:
      'The site looks done. **The case studies make it true.** This is week six — the week the portfolio earns the right to exist by documenting the work behind the work. Shipped Apr 21.',
  },
] as const;

function SignalDetail({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <p>
      {parts.map((chunk, i) =>
        i % 2 === 1 ? (
          <b key={`b-${i}`}>{chunk}</b>
        ) : (
          <span key={`t-${i}`}>{chunk}</span>
        ),
      )}
    </p>
  );
}

export function SignalTelemetryCentaur() {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    setOpen((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <article className="record record--signal" id="record-signal">
      <header className="record__head record__head--signal">
        <h3 className="record__title">Signal Telemetry</h3>
      </header>

      <p className="record__eyebrow">
        <span className="ribbon">TAP A ROW</span>
      </p>

      <div className="signal-log" id="signal-log">
        <header className="signal-log__head">
          <span>6 weeks · MAR 06 → APR 21</span>
          <span>
            <b>105</b> commits · <b>29</b> deploys
          </span>
        </header>

        {SIGNAL_ENTRIES.map((entry, i) => {
          const expanded = !!open[i];
          const isLive = i === SIGNAL_ENTRIES.length - 1;
          return (
            <article
              key={entry.date}
              className={`signal-entry signal-entry--filled${isLive ? " signal-entry--live" : ""}`}
              aria-expanded={expanded}
              role="button"
              tabIndex={0}
              onClick={() => toggle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
            >
              <div className="signal-entry__date">
                <span>
                  <b>{entry.date}</b>
                </span>
                <span>{entry.wk}</span>
              </div>
              <div className="signal-entry__node">
                <span className="signal-entry__dot" />
                <span className="signal-entry__wk">{entry.node}</span>
              </div>
              <div className="signal-entry__main">
                <h4 className="signal-entry__title">{entry.title}</h4>
                <p className="signal-entry__quote">{entry.quote}</p>
                <p className="signal-entry__meta">
                  <span>
                    <b>{entry.commits}</b> commits
                  </span>
                  <span>
                    <b>{entry.deploys}</b> deploys
                  </span>
                  <span className="signal-entry__expand">{expanded ? "[–]" : "[+]"}</span>
                </p>
                <div className="signal-entry__detail">
                  <SignalDetail text={entry.detail} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </article>
  );
}
