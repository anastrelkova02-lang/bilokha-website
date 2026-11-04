'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { poems } from '@/content/poems';
import { photo } from '@/content/photos';

/** Редакційний зміст: номер (моно) / назва (серіф) / перший рядок; фото-прев'ю слідує за курсором */
export default function PoemIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const floater = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const f = floater.current;
    if (f) f.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 110}px, 0)`;
  };

  return (
    <div className="pindex" onMouseMove={move} onMouseLeave={() => setHover(null)}>
      <ol>
        {poems.map((p, i) => (
          <li key={p.slug} onMouseEnter={() => setHover(i)} className={hover !== null && hover !== i ? 'is-dim' : ''}>
            <Link href={`/poeziia/${p.slug}`}>
              <span className="pindex__no">{String(i + 1).padStart(2, '0')} /</span>
              <span className="pindex__title">{p.title}</span>
              <span className="pindex__first">{p.text.split('\n')[0]}</span>
              <span className="pindex__arrow" aria-hidden>↗</span>
            </Link>
          </li>
        ))}
      </ol>
      <div ref={floater} className={`pindex__float ${hover !== null ? 'is-on' : ''}`} aria-hidden>
        {poems.map((p, i) => {
          const ph = photo(p.photo);
          return ph ? (
            <div key={p.slug} className={`pindex__img ${hover === i ? 'is-on' : ''}`}>
              <Image src={ph.src} alt="" fill sizes="200px" />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
