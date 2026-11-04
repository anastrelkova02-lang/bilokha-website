import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page">
      <div className="page__head">
        <span className="mono">404</span>
        <h1 className="page__title">Тут поки що порожньо.</h1>
        <Link href="/poeziia" className="cta">До віршів <span aria-hidden>↗</span></Link>
      </div>
    </div>
  );
}
