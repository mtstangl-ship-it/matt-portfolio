const ARCHETYPES = [
  { no: "01", role: "Systems Purist", name: "Marc S." },
  { no: "02", role: "Outcome Enforcer", name: "Indi Y." },
  { no: "03", role: "AI Pragmatist", name: "Ethan M." },
  { no: "04", role: "Simplicity Thinker", name: "John M." },
  { no: "05", role: "Discovery Lead", name: "Teresa H." },
] as const;

/** Research spec-sheet persona — 5-archetype register is non-interactive legend. */
export function SyntheticPersonaCard() {
  return (
    <div className="synth-persona-wrap">
      <div className="synth-persona-register" role="list" aria-label="Five thought-leader archetypes (index)">
        {ARCHETYPES.map((a) => (
          <div key={a.no} className="synth-persona-register__item" role="listitem">
            <div className="synth-persona-register__no">{a.no}</div>
            <div className="synth-persona-register__role">{a.role}</div>
            <div className="synth-persona-register__name">{a.name}</div>
          </div>
        ))}
      </div>

      <article className="synth-persona-card">
        <div className="synth-persona-top">
          <div className="synth-persona-sil" aria-hidden="true" />
          <div>
            <div className="synth-persona-top__lab">Persona card · sample · PC-01 / 05 · QA · content</div>
            <div className="synth-persona-top__name">
              Marc S. — <span>Systems Purist</span>
            </div>
          </div>
        </div>
        <dl className="synth-persona-rows">
          <div className="synth-prow">
            <dt>Worldview anchor</dt>
            <dd>
              Service systems thinking. Backstage architecture as the test of whether work is service
              design or product redesign with a service label.
            </dd>
          </div>
          <div className="synth-prow first-q">
            <dt>First question</dt>
            <dd>
              <span className="synth-qmark">&ldquo;</span>
              Where&apos;s the backstage? Who delivers this internally, and what changed in their work to
              make it real?
              <span className="synth-qmark">&rdquo;</span>
            </dd>
          </div>
          <div className="synth-prow">
            <dt>Pass criteria</dt>
            <dd>
              At least one artifact per service-design engagement shows internal capability change — not
              just customer-facing model.
            </dd>
          </div>
          <div className="synth-prow">
            <dt>Failure mode</dt>
            <dd>
              Sees a tier structure with no organizational change behind it and stops trusting the
              service-design framing.
            </dd>
          </div>
          <div className="synth-prow finding">
            <dt>Finding</dt>
            <dd>
              <div className="synth-fail-verdict">
                <span className="synth-fail-verdict__stamp">FAIL · Autodesk</span>
                <span className="synth-fail-verdict__txt">
                  Three-tier model legible from the front, backstage architecture invisible.
                </span>
                <span className="synth-fail-verdict__rec">
                  <b>Recommendation logged:</b> service blueprint excerpt or org-behavior narrative required
                  in Autodesk case study.
                </span>
              </div>
            </dd>
          </div>
        </dl>
      </article>

      <p className="synth-persona-register-note">Card 01 of a 5-archetype system · QA · content lane</p>
    </div>
  );
}
