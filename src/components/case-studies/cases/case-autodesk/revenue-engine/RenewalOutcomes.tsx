import type { RenewalOutcome } from "./content/revenue-engine-data";

type RenewalOutcomeItemProps = {
  outcome: RenewalOutcome;
  variant?: "inspect" | "banner";
};

export function RenewalOutcomeItem({ outcome, variant = "inspect" }: RenewalOutcomeItemProps) {
  const isBanner = variant === "banner";

  return (
    <div className={`re-outcome ${isBanner ? "re-outcome--banner" : "re-outcome--inspect"}`}>
      <span className="re-outcome-caption" aria-hidden={!outcome.caption}>
        {outcome.caption || "\u00A0"}
      </span>
      <div className="re-outcome-fig">{outcome.fig}</div>
      <div className="re-outcome-lbl">{outcome.lbl}</div>
    </div>
  );
}

type RenewalOutcomesRowProps = {
  outcomes: RenewalOutcome[];
  variant?: "inspect" | "banner";
};

export function RenewalOutcomesRow({ outcomes, variant = "inspect" }: RenewalOutcomesRowProps) {
  const rowClass =
    variant === "banner" ? "re-r-out-row" : "re-inspect-o-grid";

  return (
    <div className={rowClass}>
      {outcomes.map((outcome) => (
        <RenewalOutcomeItem key={`${outcome.fig}-${outcome.lbl}`} outcome={outcome} variant={variant} />
      ))}
    </div>
  );
}
