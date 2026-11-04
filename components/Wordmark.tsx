import { wordmark, monogram } from '@/lib/wordmark';

type Props = {
  className?: string;
  variant?: 'full' | 'monogram';
  /** колір вертикалі-«I»; за замовчуванням — бордо */
  accent?: string;
  /** коротка поява вертикалі при завантаженні */
  animate?: boolean;
};

/**
 * Словесний знак БIЛОKhA: літери з Noto Serif Display (контури),
 * «I» — бордова вертикаль, що виходить за межі рядка. Генерується в brand/tools.
 */
export default function Wordmark({ className, variant = 'full', accent = 'var(--burgundy)', animate = false }: Props) {
  const d = variant === 'monogram' ? monogram : wordmark;
  const b = d.bar;
  return (
    <svg className={className} viewBox={d.viewBox} role="img" aria-label="БIЛОKhA" xmlns="http://www.w3.org/2000/svg">
      <title>БIЛОKhA</title>
      <g fill="currentColor">
        {d.glyphs.map((g, i) => (
          <path key={i} d={g} />
        ))}
      </g>
      {b && (
        <rect
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          fill={accent}
          className={animate ? 'wm-bar' : undefined}
          style={animate ? { transformOrigin: `${b.x}px ${b.y + b.h}px` } : undefined}
        />
      )}
    </svg>
  );
}
