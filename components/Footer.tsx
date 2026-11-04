import Link from 'next/link';
import Signature from './Signature';
import { site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr__top">
        <p className="ftr__line">{site.tagline}</p>
        <nav aria-label="Нижнє меню">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
      </div>
      <Link href="/" className="ftr__sig" aria-label="БIЛОKhA — на головну">
        <Signature color="var(--burgundy)" />
      </Link>
      <div className="ftr__bottom">
        <span>© {new Date().getFullYear()} БIЛОKhA</span>
        <span>Поетичний архів · Україна</span>
        <a href={site.instagram.url} target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </footer>
  );
}
