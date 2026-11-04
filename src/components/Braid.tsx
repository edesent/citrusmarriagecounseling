/**
 * The threefold cord of Ecclesiastes 4:12, drawn as a real three-strand braid:
 * husband, wife and the Lord. Each strand is a sine wave a third of a turn
 * from the next; at every crossing the strand on its way "toward" the viewer
 * is drawn on top, with a gap-coloured edge so the over/under reads.
 *
 * One period is drawn into an SVG <pattern> and repeated, so a full-width
 * braid stays small. Pass a unique `id` per instance (two copies of a page
 * sharing a pattern id blank each other out).
 */

const TAU = Math.PI * 2;

type Seg = { d: string; fill: string; color: string; depth: number };

export function braidSegments({
  period,
  height,
  amplitude,
  colors,
  step = 5,
  from = 0,
  to = period,
}: {
  period: number;
  height: number;
  amplitude: number;
  colors: [string, string, string];
  step?: number;
  from?: number;
  to?: number;
}): Seg[] {
  const cy = height / 2;
  const segs: Seg[] = [];
  colors.forEach((color, k) => {
    const phase = (TAU * k) / 3;
    const y = (x: number) => cy + amplitude * Math.sin((TAU * x) / period + phase);
    const curve = (a: number, b: number) => {
      const m = (a + b) / 2;
      return `M${a.toFixed(2)} ${y(a).toFixed(2)}Q${m.toFixed(2)} ${(2 * y(m) - (y(a) + y(b)) / 2).toFixed(2)} ${b.toFixed(2)} ${y(b).toFixed(2)}`;
    };
    for (let x = from; x < to - 0.01; x += step) {
      const x1 = Math.min(x + step, to);
      segs.push({
        d: curve(x, x1),
        // The colour runs a little past each end, over the neighbouring segments' edges, so no seams show.
        fill: curve(x - step * 0.45, x1 + step * 0.45),
        color,
        depth: Math.cos((TAU * (x + x1)) / 2 / period + phase),
      });
    }
  });
  return segs.sort((a, b) => a.depth - b.depth);
}

function Strands({ segs, width, gap }: { segs: Seg[]; width: number; gap: string }) {
  return (
    <g fill="none" strokeLinecap="butt">
      {segs.map((s, i) => (
        <g key={i}>
          <path d={s.d} stroke={gap} strokeWidth={width + 3.2} />
          <path d={s.fill} stroke={s.color} strokeWidth={width} />
        </g>
      ))}
    </g>
  );
}

export default function Braid({
  id,
  gap,
  colors = ["var(--lime)", "var(--lime-light)", "var(--lime-deep)"],
  height = 34,
  period = 132,
  width = 7,
  className = "",
}: {
  id: string;
  /** The colour behind the braid: it edges each crossing. */
  gap: string;
  colors?: [string, string, string];
  height?: number;
  period?: number;
  width?: number;
  className?: string;
}) {
  const segs = braidSegments({ period, height, amplitude: height / 2 - width / 2 - 1.5, colors });
  return (
    <svg className={className} width="100%" height={height} aria-hidden focusable="false">
      <defs>
        <pattern id={id} width={period} height={height} patternUnits="userSpaceOnUse">
          <Strands segs={segs} width={width} gap={gap} />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * The mark beside the wordmark: the cord stood upright and seen close, a little
 * over one turn, with thick strands so it reads at header size.
 */
export function Mark({ gap, className = "", colors }: { gap: string; className?: string; colors?: [string, string, string] }) {
  const period = 30;
  const across = 22;
  const length = 36;
  const segs = braidSegments({
    period,
    height: across,
    amplitude: 6.4,
    colors: colors ?? ["var(--lime-deep)", "var(--night)", "var(--lime)"],
    step: 1.5,
    from: 3,
    to: 3 + length,
  });
  return (
    <svg className={className} viewBox={`0 0 ${across} ${length}`} aria-hidden focusable="false">
      {/* Drawn along x, then turned upright: (x, y) → (across − y, x − 3). */}
      <g transform={`matrix(0 1 -1 0 ${across} -3)`}>
        <Strands segs={segs} width={4.8} gap={gap} />
      </g>
    </svg>
  );
}
