type PartsCalloutProps = {
  px: number;
  py: number;
  lx: number;
  ly: number;
  refLabel: string;
  name?: string | null;
  accent: string;
};

export function PartsCallout({ px, py, lx, ly, refLabel, name, accent }: PartsCalloutProps) {
  const anchor = lx > 200 ? "end" : "start";
  const dx = anchor === "end" ? -4 : 4;

  return (
    <g>
      <line x1={px} y1={py} x2={lx} y2={ly} stroke={accent} strokeWidth={0.7} strokeLinecap="round" />
      <circle cx={px} cy={py} r={1.6} fill={accent} stroke={accent} strokeWidth={0.5} />
      <text
        x={lx + dx}
        y={ly - 2}
        fill={accent}
        fontFamily="var(--mono)"
        fontSize={7.5}
        letterSpacing={1.2}
        textAnchor={anchor}
      >
        {refLabel}
      </text>
      {name ? (
        <text
          x={lx + dx}
          y={ly + 8}
          fill="#e8efed"
          fontFamily="var(--mono)"
          fontSize={7}
          letterSpacing={1.2}
          textAnchor={anchor}
        >
          {name}
        </text>
      ) : null}
    </g>
  );
}
