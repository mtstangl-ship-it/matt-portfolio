const LANES = [
  {
    env: "DEV",
    step: "#1",
    layer: "Structural",
    chip: "Archetype users",
    question: (
      <>
        Can any user find what they need in <b>60 seconds?</b>
      </>
    ),
    criteria: "IA integrity",
  },
  {
    env: "QA",
    step: "#2",
    layer: "Content",
    chip: "Thought-leader personas",
    question: (
      <>
        Does the copy communicate leadership? Five practitioner worldviews stress-test method and metrics.
      </>
    ),
    criteria: "method + metrics hold",
  },
  {
    env: "UAT",
    step: "#3",
    layer: "Audience",
    chip: "LinkedIn-modeled personas",
    question: (
      <>
        Would <b>the specific person</b> I&apos;m targeting respond?
      </>
    ),
    criteria: "pre-outreach sharpening",
  },
  {
    env: "PROD",
    step: "#4",
    layer: "Adversarial",
    chip: "Adversarial users",
    question: (
      <>
        Does it survive a skeptical reviewer with <b>300 portfolios</b> this month?
      </>
    ),
    criteria: "ship only if it does",
  },
] as const;

function PipelineLane({ lane }: { lane: (typeof LANES)[number] }) {
  return (
    <div className="synth-pl-lane">
      <div className="synth-pl-top">
        <span className="synth-pl-env">{lane.env}</span>
        <span className="synth-pl-step">{lane.step}</span>
      </div>
      <span className="synth-pl-layer">{lane.layer}</span>
      <span className="synth-pl-chip">{lane.chip}</span>
      <span className="synth-pl-diaglab">Diagnostic</span>
      <p className="synth-pl-q">{lane.question}</p>
      <p className="synth-pl-crit">
        Pass criteria · <b>{lane.criteria}</b>
      </p>
    </div>
  );
}

function PassGate() {
  return (
    <div className="synth-pl-gate" aria-hidden="true">
      <span className="synth-pl-gate__ar">→</span>
      <span className="synth-pl-gate__gl">PASS</span>
    </div>
  );
}

/** Horizontal gated CI/CD rail — SHIP is terminal gate, not a fifth environment. */
export function SyntheticPipelineLanes() {
  return (
    <div className="synth-pipeline">
      <div className="synth-pipe-rail">
        <PipelineLane lane={LANES[0]} />
        <PassGate />
        <PipelineLane lane={LANES[1]} />
        <PassGate />
        <PipelineLane lane={LANES[2]} />
        <PassGate />
        <PipelineLane lane={LANES[3]} />
        <PassGate />
        <div className="synth-pl-ship">
          <span className="synth-pl-ship__chev" aria-hidden="true">
            ▸
          </span>
          <span className="synth-pl-ship__gl">SHIP</span>
          <span className="synth-pl-ship__sub">
            survives all
            <br />
            four gates
          </span>
        </div>
      </div>

      <div className="synth-pipe-runb">
        <span className="synth-pipe-runb__tag">Run B · companion</span>
        <span className="synth-pipe-runb__txt">
          <b>One design-systems persona</b> running a full-site audit — runs{" "}
          <em>parallel to the pipeline</em>, not as a fifth lane.
        </span>
        <span className="synth-pipe-runb__fold">↳ folds into the prioritized backlog</span>
      </div>
    </div>
  );
}
