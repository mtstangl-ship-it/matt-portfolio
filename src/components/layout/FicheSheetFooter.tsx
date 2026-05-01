/** Site-level sheet strip after Tier A case content (matches Home `footer.sheet` pattern). */
export function FicheSheetFooter() {
  return (
    <footer className="sheet" aria-label="Site sheet">
      <div className="sheet__cell">
        <span>SHEET</span>
        <b>SITE</b>
      </div>
      <div className="sheet__cell">
        <span>SCALE</span>
        <b>NOT TO SCALE</b>
      </div>
      <div className="sheet__cell">
        <span>DRAWN</span>
        <b>M. STANGL</b>
      </div>
      <div className="sheet__cell">
        <span>CONTEXT</span>
        <b>CASE STUDY</b>
      </div>
      <div className="sheet__cell">
        <span>DATE</span>
        <b>2026-04</b>
      </div>
      <div className="sheet__cell">
        <span>REV.</span>
        <b>TIER A</b>
      </div>
    </footer>
  );
}
