import type { FrontstageActivity } from "./content/revenue-engine-data";

export function FrontstageActs({ acts }: { acts: FrontstageActivity[] }) {
  return (
    <div className="re-acts">
      {acts.map((act) => (
        <div
          key={act.text}
          className={`re-act${act.active ? " re-act--active" : ""}${act.muted ? " re-act--muted" : ""}`}
        >
          <span className="re-act-marker" aria-hidden="true" />
          <span>
            {act.text}
            {act.footnote ? <span className="re-act-footnote">{act.footnote}</span> : null}
          </span>
        </div>
      ))}
    </div>
  );
}
