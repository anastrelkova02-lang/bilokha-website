import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="contact">
      <div className="contact__inner">
        <span className="label">404</span>
        <p className="contact__invite">Тут поки що порожньо.</p>
        <Link href="/poeziia" className="link-u">До віршів →</Link>
      </div>
    </div>
  );
}
