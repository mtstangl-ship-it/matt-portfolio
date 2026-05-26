import {
  isRenewalStage,
  RENEWAL,
  RENEWAL_OUTCOMES,
  RENEWAL_STAGE_INDEX,
  REVENUE_ENGINE_STAGES,
  type RevenueEngineTier,
} from "./content/revenue-engine-data";
import { BackstageRows } from "./BackstageRows";
import { FrontstageActs } from "./FrontstageActs";
import { RenewalOutcomesRow } from "./RenewalOutcomes";

type RevenueEngineInspectPanelProps = {
  stageIndex: number;
  tier: RevenueEngineTier;
};

export function RevenueEngineInspectPanel({ stageIndex, tier }: RevenueEngineInspectPanelProps) {
  if (isRenewalStage(stageIndex)) {
    return (
      <div className="re-inspect re-inspect--r" aria-live="polite">
        <div className="re-r-id">
          {RENEWAL.n}
          <span className="re-r-id-sub">{RENEWAL.subtitle}</span>
        </div>
        <div>
          <div className="re-col-h">OUTCOMES</div>
          <RenewalOutcomesRow outcomes={RENEWAL_OUTCOMES} variant="inspect" />
        </div>
      </div>
    );
  }

  const stage = REVENUE_ENGINE_STAGES[stageIndex];
  if (!stage) return null;

  const tierContent = stage.tiers[tier];

  return (
    <div className="re-inspect" aria-live="polite">
      <div>
        <div className="re-col-h">
          {stage.n} · JOURNEY
        </div>
        <div className="re-stage-copy">
          <div className="re-stage-name">{stage.name}</div>
          <div className="re-stage-intent">{stage.intent}</div>
        </div>
      </div>
      <div>
        <div className="re-col-h">FRONTSTAGE</div>
        <div className="re-col-sub">{tierContent.deliveryMode.join(" · ")}</div>
        <FrontstageActs acts={tierContent.frontstage} />
      </div>
      <div>
        <div className="re-col-h">BACKSTAGE</div>
        <div className="re-col-sub">PEOPLE · PROCESS · PLATFORM</div>
        <BackstageRows backstage={stage.backstage} />
      </div>
    </div>
  );
}

export function getStageFigureKey(stageIndex: number): string {
  return stageIndex === RENEWAL_STAGE_INDEX ? "r" : String(stageIndex);
}

export function parseStageFigureKey(key: string): number {
  return key === "r" ? RENEWAL_STAGE_INDEX : parseInt(key, 10);
}

export function getStageFigureLabel(stageIndex: number): string {
  if (isRenewalStage(stageIndex)) return "Inspect renewal";
  const stage = REVENUE_ENGINE_STAGES[stageIndex];
  return stage ? `Inspect stage ${stage.n} ${stage.name}` : "Inspect stage";
}
