import { getDict, type Lang } from "@/i18n";

const SPIT_H = 270;
const TOP_Y = 34;
const TOP_W = 168;
const BOTTOM_W = 72;
const CX = 100;
const MEAT = ["#a4532a", "#8f461f", "#b7663a"];

// Layers fill from the bottom up, one per visited place.
export default function Spit({
  visited,
  target,
  stretch,
  lang,
}: {
  visited: number;
  target: number;
  stretch: number;
  lang: Lang;
}) {
  const d = getDict(lang).home;
  const LAYER_H = SPIT_H / target;
  const layers = Array.from({ length: target }, (_, i) => {
    const y = TOP_Y + i * LAYER_H;
    const w = (t: number) => TOP_W + (BOTTOM_W - TOP_W) * (t / target);
    const w1 = w(i) / 2;
    const w2 = w(i + 1) / 2;
    const filled = i >= target - visited;
    return { y, w1, w2, filled, i };
  });
  const bottom = TOP_Y + target * LAYER_H;

  return (
    <figure className="spit">
      <svg viewBox="0 0 230 380" role="img" aria-label={d.spitLabel(visited, target)}>
        <defs>
          <linearGradient id="heat" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e8c98f" />
            <stop offset="0.5" stopColor="#b8823a" />
            <stop offset="1" stopColor="#d40000" />
          </linearGradient>
          <filter id="glow" x="-1" y="-0.2" width="3" height="1.4">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <rect x={CX - 2.5} y="6" width="5" height="360" rx="2" fill="#8d9599" />
        <rect x={CX - 70} y={TOP_Y - 10} width="140" height="6" rx="3" fill="#9aa2a6" />

        {layers.map(({ y, w1, w2, filled, i }) => (
          <path
            key={i}
            d={`M${CX - w1} ${y} L${CX + w1} ${y} L${CX + w2} ${y + LAYER_H} L${CX - w2} ${y + LAYER_H} Z`}
            fill={filled ? MEAT[i % 3] : i % 2 ? "#fbf6ec" : "#f1e3cd"}
            stroke={filled ? "#6e3415" : "#d9bf9e"}
            strokeWidth="1"
            strokeDasharray={filled ? undefined : "3 3"}
          />
        ))}

        <rect x={CX - 46} y={bottom + 8} width="92" height="5" rx="2.5" fill="#9aa2a6" />
        <path d={`M${CX - 30} 372 L${CX + 30} 372 L${CX + 20} ${bottom + 30} L${CX - 20} ${bottom + 30} Z`} fill="#d8c7ad" />

        <g className="heater">
          <rect x="196" y={TOP_Y} width="16" height={target * LAYER_H} rx="5" fill="url(#heat)" filter="url(#glow)" />
          <rect x="198" y={TOP_Y} width="12" height={target * LAYER_H} rx="4" fill="url(#heat)" />
        </g>
        <rect x="194" y={TOP_Y - 6} width="20" height={target * LAYER_H + 12} rx="6" fill="none" stroke="#6b5443" strokeWidth="2" />
      </svg>
      <figcaption>
        <span className="spit__count">{d.progress(visited, target)}</span>
        <span className="spit__note">{d.stretch(stretch)}</span>
      </figcaption>
    </figure>
  );
}
