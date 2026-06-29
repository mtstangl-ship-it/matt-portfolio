import type { BackstageContent } from "./content/revenue-engine-data";

export function BackstageRows({ backstage }: { backstage: BackstageContent }) {
  return (
    <div className="re-back-rows">
      <div className="re-b-row">
        <span className="re-b-row-k">PEOPLE</span>
        {backstage.people}
      </div>
      <div className="re-b-row">
        <span className="re-b-row-k">PROCESS</span>
        {backstage.process}
      </div>
      <div className="re-b-row">
        <span className="re-b-row-k">PLATFORM</span>
        {backstage.platform}
      </div>
    </div>
  );
}
