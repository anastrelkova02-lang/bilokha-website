'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Signature from './Signature';
import { site } from '@/content/site';

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);
  const home = path === '/';

  return (
    <header className={`hdr ${home ? 'hdr--home' : ''}`}>
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
      <button className="hdr__burger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
        {open ? 'Закрити' : 'Меню'}
      </button>
      <div id="mobile-menu" className={`mmenu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav>
          {site.nav.map((n, i) => (
            <Link key={n.href} href={n.href} tabIndex={open ? 0 : -1}>
              <small>0{i + 1}</small>
              {n.label}
            </Link>
          ))}
        </nav>
        <Signature className="mmenu__sig" color="var(--burgundy)" />
      </div>
    </header>
  );
}
