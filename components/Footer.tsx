import Link from 'next/link';
import Wordmark from './Wordmark';
import { site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr__grid">
        <div className="ftr__brand">
          <Link href="/" className="ftr__mark" aria-label="БIЛОKhA — на головну">
            <Wordmark />
          </Link>
          <p className="ftr__desc">Поетичний архів. Сучасна українська поезія, фотографія, пам’ять.</p>
        </div>
        <nav className="ftr__nav" aria-label="Нижнє меню">
          {site.nav.map((n, i) => (
            <Link key={n.href} href={n.href}><span className="mono">0{i + 1}</span>{n.label}</Link>
          ))}
        </nav>
        <div className="ftr__contact">
          <span className="mono">Контакт</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.instagram.url} target="_blank" rel="noreferrer">{site.instagram.handle}</a>
        </div>
      </div>
      <div className="ftr__bottom">
        <span>© {new Date().getFullYear()} БIЛОKhA</span>
        <span>Поетичний архів / Україна</span>
      </div>
    </footer>
  );
}
