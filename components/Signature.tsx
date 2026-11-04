import { useId } from 'react';
import { signature, monogram } from '@/lib/signature';

type Props = {
  className?: string;
  /** анімація «написання» підпису */
  draw?: boolean;
  /** загальна тривалість анімації, с */
  duration?: number;
  delay?: number;
  color?: string;
  variant?: 'full' | 'monogram';
  title?: string;
};

function len(points: string) {
  const pts = points.split(' ').map((p) => p.split(',').map(Number));
  let l = 0;
  for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return l;
}

export default function Signature({
  className,
  draw = false,
  duration = 3.2,
  delay = 0.2,
  color = 'currentColor',
  variant = 'full',
  title = 'БIЛОKhA',
}: Props) {
  const raw = useId();
  const id = 'sig' + raw.replace(/[^a-zA-Z0-9]/g, '');
  const data = variant === 'monogram' ? monogram : signature;
  const [vx, vy, vw, vh] = data.viewBox.split(' ').map(Number);
  const lengths = data.centers.map(len);
  const total = lengths.reduce((a, b) => a + b, 0);
  let acc = 0;
  const timings = lengths.map((l) => {
    const t = { start: delay + (acc / total) * duration, dur: Math.max(0.12, (l / total) * duration) };
    acc += l;
    return t;
  });

  return (
    <svg
      className={className}
      viewBox={data.viewBox}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <title>{title}</title>
      {draw && (
        <mask id={id} maskUnits="userSpaceOnUse" x={vx - vw * 0.2} y={vy - vh * 0.2} width={vw * 1.4} height={vh * 1.4}>
          {data.centers.map((c, i) => (
            <polyline
              key={i}
              points={c}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeWidth={variant === 'monogram' ? 60 : 44}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sig-draw"
              style={{ animationDelay: `${timings[i].start}s`, animationDuration: `${timings[i].dur}s` }}
            />
          ))}
        </mask>
      )}
      <g fill={color} mask={draw ? `url(#${id})` : undefined}>
        {data.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
