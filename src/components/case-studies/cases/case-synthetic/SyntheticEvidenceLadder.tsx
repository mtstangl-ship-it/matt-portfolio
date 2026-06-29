import type { ReactNode } from "react";

function LadderMark({ level }: { level: "high" | "mid" }) {
  return (
    <span className="synth-ladder-mark" data-level={level} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function GateMark() {
  return <span className="synth-gate-mark" aria-hidden="true" />;
}

function StackedCell({
  env,
  signal,
  verdict,
  mark,
}: {
  env: string;
  signal: string;
  verdict: string;
  mark: ReactNode;
}) {
  return (
    <div className="synth-scell">
      <span className="synth-scell__env">{env}</span>
      <div>
        <div className="synth-scell__signal">{signal}</div>
        <div className="synth-scell__verdict">{verdict}</div>
      </div>
      <span className="synth-scell__mk">{mark}</span>
    </div>
  );
}

/** Evidence Ladder — confidence rungs + SHIP gate marks; single accent only. */
export function SyntheticEvidenceLadder() {
  return (
    <div className="synth-artifact">
      <div className="synth-artifact-head">
        <span className="synth-artifact-head__title">EVIDENCE.LADDER</span>
        <span className="synth-artifact-head__desc">
          Where synthetic research replaces, augments, or fails real research
        </span>
        <span className="synth-artifact-head__n">N=9 personas · 4 QA envs</span>
      </div>

      <div className="synth-ladder">
        <div className="synth-ladder-grid">
          <div className="synth-l-corner">
            <span className="synth-l-corner__axis">Signal × Method</span>
          </div>
          <div className="synth-l-colhead">
            <div className="synth-l-colhead__env">DEV</div>
            <div className="synth-l-colhead__layer">Structural</div>
          </div>
          <div className="synth-l-colhead">
            <div className="synth-l-colhead__env">QA</div>
            <div className="synth-l-colhead__layer">Content</div>
          </div>
          <div className="synth-l-colhead">
            <div className="synth-l-colhead__env">UAT</div>
            <div className="synth-l-colhead__layer">Audience</div>
          </div>
          <div className="synth-l-colhead">
            <div className="synth-l-colhead__env">PROD</div>
            <div className="synth-l-colhead__layer">Adversarial</div>
          </div>

          <div className="synth-l-rowhead real">
            <span className="synth-l-rowhead__who">REAL USERS</span>
            <span className="synth-l-rowhead__meta">
              Recruited practitioners
              <br />
              N=12 · 6 wk · $8k
            </span>
          </div>
          <div className="synth-cell real high">
            <span className="synth-cell__signal">IA clarity</span>
            <div className="synth-conf-row">
              <LadderMark level="high" />
              <span className="synth-conf-label">High · ground truth</span>
            </div>
          </div>
          <div className="synth-cell real ship">
            <span className="synth-cell__signal">Copy resonance</span>
            <div className="synth-conf-row">
              <GateMark />
              <span className="synth-conf-label">Ship · observational</span>
            </div>
          </div>
          <div className="synth-cell real ship required">
            <span className="synth-cell__signal">Target-fit signal</span>
            <div className="synth-conf-row">
              <GateMark />
              <span className="synth-conf-label">Ship · highest confidence</span>
            </div>
          </div>
          <div className="synth-cell real mid">
            <span className="synth-cell__signal">Edge stress</span>
            <div className="synth-conf-row">
              <LadderMark level="mid" />
              <span className="synth-conf-label">Mid · access-limited</span>
            </div>
          </div>

          <div className="synth-l-rowhead synth">
            <span className="synth-l-rowhead__who">SYNTHETIC</span>
            <span className="synth-l-rowhead__meta">
              Persona-driven QA
              <br />
              N=9 · 2 hr · $0
            </span>
          </div>
          <div className="synth-cell synth high replaces">
            <span className="synth-cell__signal">Structural gaps</span>
            <div className="synth-conf-row">
              <LadderMark level="high" />
              <span className="synth-conf-label">High · replaces real</span>
            </div>
          </div>
          <div className="synth-cell synth high replaces">
            <span className="synth-cell__signal">Positioning drift</span>
            <div className="synth-conf-row">
              <LadderMark level="high" />
              <span className="synth-conf-label">High · replaces real</span>
            </div>
          </div>
          <div className="synth-cell synth mid">
            <span className="synth-cell__signal">Audience targeting</span>
            <div className="synth-conf-row">
              <LadderMark level="mid" />
              <span className="synth-conf-label">Mid · augments real</span>
            </div>
          </div>
          <div className="synth-cell synth ship">
            <span className="synth-cell__signal">Adversarial review</span>
            <div className="synth-conf-row">
              <GateMark />
              <span className="synth-conf-label">Ship · pre-flight stress</span>
            </div>
          </div>

          <div className="synth-l-verdlabel">
            <span>Synthetic vs real</span>
          </div>
          <div className="synth-l-verdcell">
            <span className="v">Replaces</span>
          </div>
          <div className="synth-l-verdcell">
            <span className="v">Replaces</span>
          </div>
          <div className="synth-l-verdcell">
            <span className="v aug">
              Augments
              <small>real still required</small>
            </span>
          </div>
          <div className="synth-l-verdcell">
            <span className="v">Replaces</span>
          </div>
        </div>

        <div className="synth-ladder-stacked">
          <div className="synth-lane-block real">
            <div className="synth-lane-block__who">
              <div className="synth-lane-block__who-title">REAL USERS</div>
              <div className="synth-lane-block__who-meta">Recruited practitioners · N=12 · 6 wk · $8k</div>
            </div>
            <StackedCell env="DEV" signal="IA clarity" verdict="High · ground truth" mark={<LadderMark level="high" />} />
            <StackedCell env="QA" signal="Copy resonance" verdict="Ship · observational" mark={<GateMark />} />
            <StackedCell env="UAT" signal="Target-fit signal" verdict="Ship · highest confidence" mark={<GateMark />} />
            <StackedCell env="PROD" signal="Edge stress" verdict="Mid · access-limited" mark={<LadderMark level="mid" />} />
          </div>
          <div className="synth-lane-block synth">
            <div className="synth-lane-block__who">
              <div className="synth-lane-block__who-title">SYNTHETIC</div>
              <div className="synth-lane-block__who-meta">Persona-driven QA · N=9 · 2 hr · $0</div>
            </div>
            <StackedCell env="DEV" signal="Structural gaps" verdict="High · replaces real" mark={<LadderMark level="high" />} />
            <StackedCell env="QA" signal="Positioning drift" verdict="High · replaces real" mark={<LadderMark level="high" />} />
            <StackedCell env="UAT" signal="Audience targeting" verdict="Mid · augments real" mark={<LadderMark level="mid" />} />
            <StackedCell env="PROD" signal="Adversarial review" verdict="Ship · pre-flight stress" mark={<GateMark />} />
          </div>
        </div>

        <div className="synth-ladder-verdict">
          <div>
            <div className="synth-ladder-verdict__big accent">3</div>
            <div className="synth-ladder-verdict__lab">
              decision types where synthetic <b>replaced</b> real research
            </div>
          </div>
          <div>
            <div className="synth-ladder-verdict__big">1</div>
            <div className="synth-ladder-verdict__lab">
              decision type where real research is <b>still required</b>
            </div>
          </div>
          <div>
            <div className="synth-ladder-verdict__big">$8K → $0</div>
            <div className="synth-ladder-verdict__lab">pre-flight cost · self-review baseline</div>
          </div>
        </div>
      </div>
    </div>
  );
}
