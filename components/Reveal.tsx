'use client';
import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from 'react';

type Props = { as?: ElementType; className?: string; children: ReactNode; delay?: number; style?: CSSProperties };

export default function Reveal({ as: Tag = 'div', className = '', children, delay = 0, style }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}>
      {children}
    </Tag>
  );
}
