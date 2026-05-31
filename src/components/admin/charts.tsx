"use client";

import { useState } from "react";
import { formatPKR } from "@/lib/format";

// Theme colours referenced via CSS variables. We apply them through `style`
// (not SVG presentation attributes) so the var() actually resolves.
const GOLD = "var(--gold)";

type Point = { month: string; revenue: number };

/** Animated area + line revenue chart with a hover tooltip. Pure SVG, no deps. */
export function RevenueChart({ data }: { data: Point[] }) {
  const [hover, setHover] = useState<number | null>(null);

  const W = 760, H = 300, padL = 8, padR = 8, padT = 16, padB = 36;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const max = Math.max(...data.map((d) => d.revenue)) * 1.15;

  const xAt = (i: number) => padL + (innerW * i) / (data.length - 1);
  const yAt = (v: number) => padT + innerH * (1 - v / max);

  const pts = data.map((d, i) => ({ ...d, x: xAt(i), y: yAt(d.revenue) }));
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area =
    `${line} L${xAt(data.length - 1).toFixed(1)},${(padT + innerH).toFixed(1)} ` +
    `L${xAt(0).toFixed(1)},${(padT + innerH).toFixed(1)} Z`;
  const segW = innerW / data.length;

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Monthly revenue trend">
        <defs>
          <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: GOLD, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: GOLD, stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <line key={i} x1={padL} y1={padT + innerH * f} x2={W - padR} y2={padT + innerH * f}
            style={{ stroke: "var(--border)" }} strokeWidth={1} strokeDasharray="3 5" />
        ))}

        <path d={area} fill="url(#rev-fill)" />
        <path d={line} fill="none" style={{ stroke: GOLD }} strokeWidth={2.5}
          strokeLinejoin="round" strokeLinecap="round" className="admin-draw" />

        {hover !== null && (
          <line x1={pts[hover].x} y1={padT} x2={pts[hover].x} y2={padT + innerH}
            style={{ stroke: GOLD }} strokeWidth={1} strokeOpacity={0.45} />
        )}

        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={hover === i ? 5 : 3}
            style={{ fill: "var(--card)", stroke: GOLD }} strokeWidth={2} />
        ))}

        {pts.map((p, i) => (
          <text key={i} x={p.x} y={H - 12} textAnchor="middle" fontSize={11}
            style={{ fill: "var(--muted-foreground)" }}>{p.month}</text>
        ))}

        {/* invisible hover hit-areas */}
        {pts.map((p, i) => (
          <rect key={i} x={p.x - segW / 2} y={0} width={segW} height={H} fill="transparent"
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
        ))}
      </svg>

      {hover !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[135%] whitespace-nowrap rounded-lg border bg-popover px-3 py-1.5 text-xs shadow-lg"
          style={{ left: `${(pts[hover].x / W) * 100}%`, top: `${(pts[hover].y / H) * 100}%` }}
        >
          <div className="font-semibold text-popover-foreground">{formatPKR(pts[hover].revenue)}</div>
          <div className="text-muted-foreground">{data[hover].month}</div>
        </div>
      )}
    </div>
  );
}

/** Donut showing the hair-vs-skin revenue split. */
export function CategoryDonut({ hair, skin }: { hair: number; skin: number }) {
  const total = hair + skin || 1;
  const hairPct = hair / total;
  const skinPct = skin / total;
  const r = 60, sw = 22, C = 2 * Math.PI * r;
  const compact = `Rs ${(total / 1_000_000).toFixed(1)}M`;

  return (
    <div className="flex items-center gap-5">
      <div className="relative size-36 shrink-0">
        <svg viewBox="0 0 160 160" className="size-36 -rotate-90">
          <circle cx={80} cy={80} r={r} fill="none" style={{ stroke: "var(--muted)" }} strokeWidth={sw} />
          <circle cx={80} cy={80} r={r} fill="none" style={{ stroke: "var(--chart-3)" }} strokeWidth={sw}
            strokeDasharray={`${skinPct * C} ${C}`} strokeDashoffset={-hairPct * C} />
          <circle cx={80} cy={80} r={r} fill="none" style={{ stroke: GOLD }} strokeWidth={sw}
            strokeDasharray={`${hairPct * C} ${C}`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-lg font-bold leading-none">{compact}</span>
          <span className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Revenue</span>
        </div>
      </div>
      <div className="flex-1 space-y-3">
        <DonutLegend color={GOLD} label="Hair Care" value={hair} pct={hairPct} />
        <DonutLegend color="var(--chart-3)" label="Skin Care" value={skin} pct={skinPct} />
      </div>
    </div>
  );
}

function DonutLegend({ color, label, value, pct }: { color: string; label: string; value: number; pct: number }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full" style={{ background: color }} />
        <span className="text-sm">{label}</span>
        <span className="ml-auto text-sm font-semibold tabular-nums">{Math.round(pct * 100)}%</span>
      </div>
      <div className="pl-[18px] text-xs tabular-nums text-muted-foreground">{formatPKR(value)}</div>
    </div>
  );
}
