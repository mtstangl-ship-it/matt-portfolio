const DIM_TICKS = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800];

/** Shared dimension ribbon between Tier-A case sections. */
export function DimScale({ label, compact }: { label: string; compact?: boolean }) {
  return (
    <div className={compact ? "dim-with-scale dim-with-scale--compact" : "dim-with-scale"}>
      <p className="dim">{label}</p>
      <svg
        className="dim-scale"
        viewBox="0 0 800 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="4" x2="800" y2="4" stroke="var(--ink-line)" strokeWidth="1" />
        <g stroke="var(--ink-3)" strokeWidth="1">
          {DIM_TICKS.map((x) => (
            <line key={x} x1={x} y1="4" x2={x} y2="14" />
          ))}
        </g>
      </svg>
    </div>
  );
}
