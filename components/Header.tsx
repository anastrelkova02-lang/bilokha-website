'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Signature from './Signature';
import { site } from '@/content/site';

/**
 * Єдина шапка сайту. Рендериться один раз у app/layout.tsx.
 * Десктоп (≥ 961px): логотип + горизонтальне меню.
 * Планшет/мобільний (≤ 960px): логотип + кнопка «Меню» → повноекранне меню.
 * Ці два режими взаємовиключні (див. .hdr__nav / .hdr__burger / .mmenu у globals.css).
 */
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = path === '/';

  // закривати меню при переході між сторінками
  useEffect(() => setOpen(false), [path]);

  // суцільний фон шапки після початку прокрутки
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [path]);

  // блокування прокрутки під відкритим меню + Escape + автозакриття на десктопі
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 961px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      document.documentElement.classList.remove('menu-open');
    };
  }, [open]);

  const cls = ['hdr', home && !scrolled && !open ? 'hdr--top' : 'hdr--solid', open ? 'hdr--open' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <header className={cls}>
      <div className="hdr__bar">
        <Link href="/" className="hdr__logo" aria-label="БIЛОKhA — на головну">
          <Signature color="var(--burgundy)" />
        </Link>

        <nav className="hdr__nav" aria-label="Головне меню">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className={path.startsWith(n.href) ? 'is-active' : ''}>
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="hdr__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="hdr__burger-label">{open ? 'Закрити' : 'Меню'}</span>
          <span className="hdr__burger-icon" aria-hidden />
        </button>
      </div>

      <div id="mobile-menu" className={`mmenu ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Мобільне меню">
          {site.nav.map((n, i) => (
            <Link key={n.href} href={n.href} className={path.startsWith(n.href) ? 'is-active' : ''}>
              <small>0{i + 1}</small>
              {n.label}
            </Link>
          ))}
        </nav>
        <p className="mmenu__foot mono">БIЛОKhA / Поетичний архів</p>
      </div>
    </header>
  );
}
