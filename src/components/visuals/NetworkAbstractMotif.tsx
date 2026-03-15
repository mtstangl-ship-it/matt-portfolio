"use client";

export function NetworkAbstractMotif({ className = "" }: { className?: string }) {
  const nodes = [
    [20, 40], [60, 20], [100, 40], [140, 60], [100, 80], [60, 60],
  ];
  return (
    <svg viewBox="0 0 160 100" className={`w-full ${className}`.trim()} aria-hidden preserveAspectRatio="xMidYMid meet">
      <path
        d={`M${nodes[0][0]} ${nodes[0][1]} L${nodes[1][0]} ${nodes[1][1]} L${nodes[2][0]} ${nodes[2][1]} L${nodes[3][0]} ${nodes[3][1]} L${nodes[4][0]} ${nodes[4][1]} L${nodes[5][0]} ${nodes[5][1]} Z`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.2"
        strokeLinejoin="round"
      />
      <path d={`M${nodes[1][0]} ${nodes[1][1]} L${nodes[5][0]} ${nodes[5][1]}`} fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.25" />
      <path d={`M${nodes[2][0]} ${nodes[2][1]} L${nodes[4][0]} ${nodes[4][1]}`} fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.25" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 5 : 3} fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" />
      ))}
    </svg>
  );
}
