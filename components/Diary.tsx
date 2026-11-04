'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Reveal from './Reveal';

type Item = { src: string; alt: string; caption?: string; size: string; no: string };

export default function Diary({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % items.length));
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : (o - 1 + items.length) % items.length));
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, items.length]);

  return (
    <>
      <div className="dgrid">
        {items.map((it, i) => (
          <Reveal key={it.no} className={`dcell dcell--${it.size}`} delay={(i % 3) * 90}>
            <button className="dcell__btn" onClick={() => setOpen(i)} aria-label={`Відкрити кадр ${it.no}: ${it.alt}`}>
              <span className="photo__frame">
                <Image src={it.src} alt={it.alt} fill sizes="(max-width: 768px) 90vw, 40vw" />
                <span className="photo__grain" aria-hidden />
              </span>
            </button>
            <p className="dcell__cap">
              <span>{it.no}</span> {it.caption}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="strip" aria-hidden>
        <div className="strip__track">
          {[...items, ...items].map((it, i) => (
            <span key={i} className="strip__frame">
              <Image src={it.src} alt="" fill sizes="160px" />
              <small>{it.no}A</small>
            </span>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[open].alt} onClick={() => setOpen(null)}>
          <div className="lightbox__img" onClick={(e) => e.stopPropagation()}>
            <Image src={items[open].src} alt={items[open].alt} fill sizes="90vw" />
          </div>
          <p className="lightbox__cap">{items[open].no} — {items[open].caption}</p>
          <button className="lightbox__close" onClick={() => setOpen(null)}>Закрити</button>
        </div>
      )}
    </>
  );
}
