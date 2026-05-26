import type { BikePart } from "../content/revenue-engine-data";
import type { RevenueEngineTier } from "../content/revenue-engine-data";
import { arcPath, BIKE_BG, BIKE_G, BIKE_INK, BIKE_INK_DIM, BIKE_S, getTierAccent } from "./bike-geometry";

type BikeDrawingProps = {
  parts: Set<BikePart>;
  tier: RevenueEngineTier;
  accent?: string;
  motion?: boolean;
  rider?: boolean;
  ground?: boolean;
};

function Sprocket({
  cx,
  cy,
  r,
  teeth,
  stroke,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  stroke: string;
}) {
  const toothLines = Array.from({ length: teeth }, (_, i) => {
    const a = (i / teeth) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * (r - 0.5)}
        y1={cy + Math.sin(a) * (r - 0.5)}
        x2={cx + Math.cos(a) * (r + 1.5)}
        y2={cy + Math.sin(a) * (r + 1.5)}
        stroke={stroke}
        strokeWidth={0.5}
      />
    );
  });

  return (
    <g>
      <circle cx={cx} cy={cy} r={r - 1} stroke={stroke} strokeWidth={0.7} fill="none" />
      {toothLines}
      <circle cx={cx} cy={cy} r={1} stroke={stroke} strokeWidth={0.5} fill={stroke} />
    </g>
  );
}

function Wheel({
  cx,
  cy,
  r,
  sw,
  motion,
  accent,
}: {
  cx: number;
  cy: number;
  r: number;
  sw: number;
  motion: boolean;
  accent: string;
}) {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * 4.5}
        y1={cy + Math.sin(a) * 4.5}
        x2={cx + Math.cos(a) * (r - 6)}
        y2={cy + Math.sin(a) * (r - 6)}
        stroke={BIKE_INK}
        strokeWidth={0.55}
      />
    );
  });

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} stroke={BIKE_INK} strokeWidth={sw} fill="none" />
      <circle cx={cx} cy={cy} r={r - 6} stroke={BIKE_INK} strokeWidth={sw * 0.75} fill="none" />
      <circle cx={cx} cy={cy} r={4.5} stroke={BIKE_INK} strokeWidth={sw} fill={BIKE_BG} />
      <circle cx={cx} cy={cy} r={1.8} stroke={BIKE_INK} strokeWidth={0.7} fill="none" />
      {motion ? (
        <g className="re-wheel-spin">
          {[r - 14, r - 18, r - 22].map((rr, i) => (
            <circle
              key={rr}
              cx={cx}
              cy={cy}
              r={rr}
              stroke={accent}
              strokeWidth={0.6}
              fill="none"
              strokeDasharray="6 4"
              opacity={0.7 - i * 0.18}
              transform={`rotate(${i * 30} ${cx} ${cy})`}
            />
          ))}
          <path
            d={arcPath(cx, cy, r - 4, -Math.PI * 0.85, -Math.PI * 0.25)}
            stroke={accent}
            strokeWidth={1.0}
            fill="none"
            strokeLinecap="round"
            opacity={0.85}
          />
        </g>
      ) : (
        <g>{spokes}</g>
      )}
    </g>
  );
}

function RotationArc({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const a2 = -Math.PI * 0.15;
  const ex = cx + Math.cos(a2) * r;
  const ey = cy + Math.sin(a2) * r;
  const t = a2 + Math.PI / 2;
  const h = 4;

  return (
    <g>
      <path
        d={arcPath(cx, cy, r, -Math.PI * 0.85, a2)}
        stroke={color}
        strokeWidth={1.0}
        fill="none"
        strokeLinecap="round"
      />
      <line
        x1={ex}
        y1={ey}
        x2={ex - Math.cos(t - 0.5) * h}
        y2={ey - Math.sin(t - 0.5) * h}
        stroke={color}
        strokeWidth={1.0}
      />
      <line
        x1={ex}
        y1={ey}
        x2={ex - Math.cos(t + 0.5) * h}
        y2={ey - Math.sin(t + 0.5) * h}
        stroke={color}
        strokeWidth={1.0}
      />
    </g>
  );
}

export function BikeDrawing({
  parts,
  tier,
  accent: accentProp,
  motion = false,
  rider = false,
  ground = true,
}: BikeDrawingProps) {
  const has = (part: BikePart) => parts.has(part);
  const accent = accentProp ?? getTierAccent(tier);
  const dashStr = tier === "nurture" ? "3 3" : undefined;
  const G = BIKE_G;
  const S = BIKE_S;

  return (
    <>
      {ground !== false &&
        (motion ? (
          <>
            <g>
              {Array.from({ length: 26 }, (_, i) => {
                const idx = i - 2;
                return (
                  <line
                    key={idx}
                    x1={idx * 40}
                    y1={215}
                    x2={idx * 40 + 22}
                    y2={215}
                    stroke={BIKE_INK}
                    strokeWidth={1.0}
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
            <line x1={10} y1={225} x2={390} y2={225} stroke={BIKE_INK_DIM} strokeWidth={0.5} />
          </>
        ) : (
          <line x1={20} y1={215} x2={380} y2={215} stroke={BIKE_INK_DIM} strokeWidth={0.6} />
        ))}

      {has("frame") && (
        <g>
          <line
            x1={G.headTop.x}
            y1={G.headTop.y}
            x2={G.headBottom.x}
            y2={G.headBottom.y}
            stroke={BIKE_INK}
            strokeWidth={1.7}
            strokeLinecap="round"
          />
          <line
            x1={G.headTop.x}
            y1={G.headTop.y + 4}
            x2={G.seatPostTop.x}
            y2={G.seatPostTop.y}
            stroke={BIKE_INK}
            strokeWidth={1.3}
          />
          <line
            x1={G.headBottom.x}
            y1={G.headBottom.y}
            x2={G.bbCenter.x}
            y2={G.bbCenter.y}
            stroke={BIKE_INK}
            strokeWidth={1.3}
          />
          <line
            x1={G.seatPostTop.x}
            y1={G.seatPostTop.y}
            x2={G.bbCenter.x}
            y2={G.bbCenter.y}
            stroke={BIKE_INK}
            strokeWidth={1.3}
          />
          <line
            x1={G.seatPostTop.x}
            y1={G.seatPostTop.y}
            x2={G.tail.x2 - S.tailLength + 6}
            y2={G.seat.y1 - 2}
            stroke={BIKE_INK}
            strokeWidth={1.1}
          />
          <line
            x1={G.bbCenter.x - 6}
            y1={G.bbCenter.y}
            x2={G.tail.x2 - S.tailLength + 8}
            y2={G.seat.y1 + 4}
            stroke={BIKE_INK}
            strokeWidth={0.9}
          />
          <line
            x1={G.swingPivot.x}
            y1={G.swingPivot.y}
            x2={G.rearHub.x}
            y2={G.rearHub.y}
            stroke={BIKE_INK}
            strokeWidth={1.2}
          />
          <line
            x1={G.swingPivot.x}
            y1={G.swingPivot.y + 4}
            x2={G.rearHub.x + 2}
            y2={G.rearHub.y + 4}
            stroke={BIKE_INK}
            strokeWidth={0.8}
          />
          <circle cx={G.bbCenter.x} cy={G.bbCenter.y} r={3.2} stroke={BIKE_INK} strokeWidth={0.9} fill={BIKE_BG} />
          <line
            x1={G.headTop.x - 4}
            y1={G.headTop.y - 2}
            x2={G.headTop.x + 4}
            y2={G.headTop.y - 2}
            stroke={BIKE_INK}
            strokeWidth={1.0}
          />
        </g>
      )}

      {has("engine") && (
        <g>
          {(() => {
            const e = G.engine;
            return (
              <>
                <path
                  d={`M ${e.x1 + 6},${e.y2} L ${e.x1 + 14},${e.y1} L ${e.x2},${e.y1} L ${e.x2 - 4},${e.y2 - 4} Z`}
                  stroke={BIKE_INK}
                  strokeWidth={1.2}
                  fill="none"
                  strokeLinejoin="round"
                />
                {Array.from({ length: 5 }, (_, i) => {
                  const y = e.y1 + 4 + i * 5;
                  return (
                    <line
                      key={i}
                      x1={e.x1 + 14 - i * 0.6}
                      y1={y}
                      x2={e.x2 - 1 - i * 0.3}
                      y2={y}
                      stroke={BIKE_INK}
                      strokeWidth={0.65}
                      strokeDasharray={dashStr}
                    />
                  );
                })}
                {[0.3, 0.55, 0.8].map((t) => (
                  <circle
                    key={t}
                    cx={e.x1 + 14 + (e.x2 - e.x1 - 14) * t}
                    cy={e.y1 + 2}
                    r={1.2}
                    stroke={BIKE_INK}
                    strokeWidth={0.7}
                    fill="none"
                  />
                ))}
                <line
                  x1={e.x1 + 6}
                  y1={e.y2 - 14}
                  x2={e.x2 - 4}
                  y2={e.y2 - 14}
                  stroke={BIKE_INK}
                  strokeWidth={0.6}
                />
                <Sprocket cx={e.x1 + 4} cy={e.y2 - 6} r={4.5} teeth={9} stroke={BIKE_INK} />
              </>
            );
          })()}
        </g>
      )}

      {has("tank") && (
        <g>
          {(() => {
            const t = G.tank;
            return (
              <>
                <path
                  d={`M ${t.x1 - 2},${t.y2 + 2} Q ${t.x1},${t.y1} ${t.x1 + 24},${t.y1 - 2} L ${t.x2 - 12},${t.y1 - 2} Q ${t.x2 + 4},${t.y1 + 4} ${t.x2 + 2},${t.y2 - 2} L ${t.x2 - 18},${t.y2 + 2} L ${t.x1 + 4},${t.y2 + 4} Z`}
                  stroke={BIKE_INK}
                  strokeWidth={1.2}
                  fill="none"
                  strokeLinejoin="round"
                />
                <circle cx={t.x1 + 38} cy={t.y1} r={3} stroke={BIKE_INK} strokeWidth={0.9} fill="none" />
                <circle cx={t.x1 + 38} cy={t.y1} r={1.4} stroke={BIKE_INK} strokeWidth={0.6} fill="none" />
                {has("engine") && (
                  <path
                    d={`M ${t.x1 + 6},${t.y2 + 3} Q ${t.x1 + 2},${G.engine.y1 - 6} ${G.engine.x1 + 18},${G.engine.y1 - 1}`}
                    stroke={BIKE_INK}
                    strokeWidth={0.8}
                    fill="none"
                    strokeDasharray="3 2"
                  />
                )}
                <path
                  d={`M ${t.x1 + 8},${t.y2 - 8} Q ${(t.x1 + t.x2) / 2},${t.y2 - 4} ${t.x2 - 14},${t.y2 - 8}`}
                  stroke={BIKE_INK}
                  strokeWidth={0.5}
                  fill="none"
                  strokeDasharray={dashStr}
                />
              </>
            );
          })()}
        </g>
      )}

      {has("wheels") && (
        <g>
          <line
            x1={G.headBottom.x - 3}
            y1={G.headBottom.y + 1}
            x2={G.frontHub.x - 3}
            y2={G.frontHub.y}
            stroke={BIKE_INK}
            strokeWidth={1.2}
          />
          <line
            x1={G.headBottom.x + 3}
            y1={G.headBottom.y + 1}
            x2={G.frontHub.x + 3}
            y2={G.frontHub.y}
            stroke={BIKE_INK}
            strokeWidth={1.2}
          />
          <line
            x1={G.headTop.x - 2}
            y1={G.headTop.y + 8}
            x2={G.headBottom.x - 2}
            y2={G.headBottom.y - 2}
            stroke={BIKE_INK}
            strokeWidth={0.8}
          />
          <line
            x1={G.headTop.x + 2}
            y1={G.headTop.y + 8}
            x2={G.headBottom.x + 2}
            y2={G.headBottom.y - 2}
            stroke={BIKE_INK}
            strokeWidth={0.8}
          />
          <Wheel
            cx={G.frontHub.x}
            cy={G.frontHub.y}
            r={G.wheelR}
            sw={1.2}
            motion={motion}
            accent={accent}
          />
          <Wheel
            cx={G.rearHub.x}
            cy={G.rearHub.y}
            r={G.wheelR + 2}
            sw={1.2}
            motion={motion}
            accent={accent}
          />
          {(() => {
            const sx1 = G.rearHub.x + 18;
            const sy1 = G.rearHub.y - 8;
            const sx2 = G.seatPostTop.x - 6;
            const sy2 = G.seatPostTop.y + 10;
            return (
              <>
                <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke={BIKE_INK} strokeWidth={1.0} />
                {Array.from({ length: 5 }, (_, i) => {
                  const t1 = (i + 0.2) / 6;
                  const t2 = (i + 0.6) / 6;
                  const x1 = sx1 + (sx2 - sx1) * t1;
                  const y1 = sy1 + (sy2 - sy1) * t1;
                  const x2 = sx1 + (sx2 - sx1) * t2;
                  const y2 = sy1 + (sy2 - sy1) * t2;
                  return (
                    <line
                      key={i}
                      x1={x1 - 2}
                      y1={y1}
                      x2={x2 + 2}
                      y2={y2}
                      stroke={BIKE_INK}
                      strokeWidth={0.6}
                      strokeDasharray={dashStr}
                    />
                  );
                })}
              </>
            );
          })()}
          <path
            d={`M ${G.frontHub.x - 16},${G.frontHub.y - 42} Q ${G.frontHub.x},${G.frontHub.y - 46} ${G.frontHub.x + 16},${G.frontHub.y - 42}`}
            stroke={BIKE_INK}
            strokeWidth={0.8}
            fill="none"
            strokeDasharray={dashStr}
          />
          <path
            d={`M ${G.engine.x1 + 2},${G.engine.y2 - 4} Q ${G.engine.x1 - 14},${G.engine.y2 + 12} ${G.rearHub.x + 4},${G.rearHub.y + 12} L ${G.rearHub.x - 28},${G.rearHub.y + 6}`}
            stroke={BIKE_INK}
            strokeWidth={1.0}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={dashStr}
          />
          {has("engine") && (
            <>
              <Sprocket cx={G.rearHub.x} cy={G.rearHub.y} r={12} teeth={14} stroke={BIKE_INK} />
              <line
                x1={G.engine.x1 + 4}
                y1={G.engine.y2 - 6 - 4.5}
                x2={G.rearHub.x + 4}
                y2={G.rearHub.y - 12}
                stroke={BIKE_INK}
                strokeWidth={0.7}
              />
              <line
                x1={G.engine.x1 + 4}
                y1={G.engine.y2 - 6 + 4.5}
                x2={G.rearHub.x + 4}
                y2={G.rearHub.y + 12}
                stroke={BIKE_INK}
                strokeWidth={0.7}
              />
            </>
          )}
        </g>
      )}

      {has("seat") && (
        <g>
          {(() => {
            const s = G.seat;
            const tailEnd = s.x1 - S.tailLength;
            return (
              <>
                <path
                  d={`M ${s.x2 - 4},${s.y2} L ${s.x2 - 14},${s.y1 - S.seatHump * 0.3} Q ${(s.x1 + s.x2) / 2 + 16},${s.y1 - 2} ${(s.x1 + s.x2) / 2 + 4},${s.y1} Q ${s.x1 + 22},${s.y1 - 2} ${s.x1 + 8},${s.y1 - S.seatHump} L ${tailEnd + 4},${s.y1 - S.seatHump + 2} L ${tailEnd},${s.y2 - 2} Z`}
                  stroke={BIKE_INK}
                  strokeWidth={1.1}
                  fill="none"
                  strokeLinejoin="round"
                />
                <circle cx={tailEnd + 2} cy={s.y2 - 4} r={1.2} stroke={BIKE_INK} strokeWidth={0.7} fill="none" />
              </>
            );
          })()}
        </g>
      )}

      {has("bars") && (
        <g>
          {(() => {
            const ht = G.headTop;
            const ix = ht.x - 6;
            const iy = ht.y - S.barHeight - 4;
            return (
              <>
                <line
                  x1={ht.x}
                  y1={ht.y - 2}
                  x2={ht.x - S.barReach * 0.3}
                  y2={ht.y - S.barHeight}
                  stroke={BIKE_INK}
                  strokeWidth={1.1}
                />
                <line
                  x1={ht.x - S.barReach * 0.3}
                  y1={ht.y - S.barHeight}
                  x2={ht.x - S.barReach * 0.3 - 24}
                  y2={ht.y - S.barHeight - 2}
                  stroke={BIKE_INK}
                  strokeWidth={1.0}
                />
                <line
                  x1={ht.x - S.barReach * 0.3 - 24}
                  y1={ht.y - S.barHeight - 4}
                  x2={ht.x - S.barReach * 0.3 - 24}
                  y2={ht.y - S.barHeight}
                  stroke={BIKE_INK}
                  strokeWidth={1.3}
                />
                <circle
                  cx={G.headlight.x}
                  cy={G.headlight.y}
                  r={7}
                  stroke={BIKE_INK}
                  strokeWidth={1.0}
                  fill="none"
                  strokeDasharray={dashStr}
                />
                <circle
                  cx={G.headlight.x}
                  cy={G.headlight.y}
                  r={3}
                  stroke={BIKE_INK}
                  strokeWidth={0.7}
                  fill="none"
                  strokeDasharray={dashStr}
                />
                <line
                  x1={G.headlight.x - 6}
                  y1={G.headlight.y}
                  x2={ht.x - 2}
                  y2={ht.y + 4}
                  stroke={BIKE_INK}
                  strokeWidth={0.7}
                  strokeDasharray={dashStr}
                />
                <circle
                  cx={ix - 3}
                  cy={iy}
                  r={3}
                  stroke={BIKE_INK}
                  strokeWidth={0.8}
                  fill="none"
                  strokeDasharray={dashStr}
                />
                <circle
                  cx={ix + 3}
                  cy={iy}
                  r={3}
                  stroke={BIKE_INK}
                  strokeWidth={0.8}
                  fill="none"
                  strokeDasharray={dashStr}
                />
                <line
                  x1={ix - 3}
                  y1={iy}
                  x2={ix - 1.4}
                  y2={iy - 1.8}
                  stroke={BIKE_INK}
                  strokeWidth={0.7}
                  strokeDasharray={dashStr}
                />
                <line
                  x1={ix + 3}
                  y1={iy}
                  x2={ix + 4.4}
                  y2={iy - 1.8}
                  stroke={BIKE_INK}
                  strokeWidth={0.7}
                  strokeDasharray={dashStr}
                />
              </>
            );
          })()}
        </g>
      )}

      {motion && rider && (
        <g>
          {(() => {
            const seatTop = G.seat.y1 + S.seatHump * -0.5 - 4;
            const seatCx = (G.seat.x1 + G.seat.x2) / 2 + 4;
            const barEnd = {
              x: G.headTop.x - S.barReach * 0.3 - 24,
              y: G.headTop.y - S.barHeight - 2,
            };
            return (
              <>
                <line
                  x1={seatCx + 6}
                  y1={seatTop - 2}
                  x2={seatCx + 30}
                  y2={seatTop - 26}
                  stroke={BIKE_INK}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                />
                <circle cx={seatCx + 36} cy={seatTop - 32} r={6.5} stroke={BIKE_INK} strokeWidth={1.2} fill={BIKE_BG} />
                <line
                  x1={seatCx + 32}
                  y1={seatTop - 34}
                  x2={seatCx + 41}
                  y2={seatTop - 32}
                  stroke={BIKE_INK}
                  strokeWidth={0.8}
                />
                <line
                  x1={seatCx + 28}
                  y1={seatTop - 22}
                  x2={barEnd.x + 22}
                  y2={barEnd.y + 4}
                  stroke={BIKE_INK}
                  strokeWidth={1.1}
                />
                <line
                  x1={barEnd.x + 22}
                  y1={barEnd.y + 4}
                  x2={barEnd.x + 2}
                  y2={barEnd.y - 1}
                  stroke={BIKE_INK}
                  strokeWidth={1.1}
                />
                <path
                  d={`M ${seatCx + 4},${seatTop - 2} Q ${seatCx + 14},${seatTop - 16} ${seatCx + 28},${seatTop - 26}`}
                  stroke={BIKE_INK_DIM}
                  strokeWidth={0.7}
                  fill="none"
                />
              </>
            );
          })()}
        </g>
      )}

      {motion && (
        <>
          <g>
            {[
              { y: 110, len: 22, x: 8 },
              { y: 130, len: 28, x: 4 },
              { y: 150, len: 18, x: 12 },
            ].map((s) => (
              <line
                key={`${s.x}-${s.y}`}
                x1={s.x}
                y1={s.y}
                x2={s.x + s.len}
                y2={s.y}
                stroke={accent}
                strokeWidth={1.1}
                strokeLinecap="round"
                opacity={0.85}
              />
            ))}
          </g>
          <g className="re-wheel-spin">
            <RotationArc cx={G.frontHub.x} cy={G.frontHub.y} r={G.wheelR - 12} color={accent} />
          </g>
          <g className="re-wheel-spin">
            <RotationArc cx={G.rearHub.x} cy={G.rearHub.y} r={G.wheelR - 10} color={accent} />
          </g>
        </>
      )}
    </>
  );
}
