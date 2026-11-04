import type { Metadata } from 'next';
import Signature from '@/components/Signature';
import Reveal from '@/components/Reveal';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Контакт',
  description: 'Зв’язатися з БIЛОKhA.',
  alternates: { canonical: '/kontakt' },
};

export default function ContactPage() {
  return (
    <div className="contact">
      <Reveal className="contact__inner">
        <span className="label">Контакт</span>
        <p className="contact__invite">
          Листи, запрошення на читання
          <br />і розмови про поезію —
        </p>
        <ul className="contact__links">
          <li>
            <small>Пошта</small>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <small>Instagram</small>
            <a href={site.instagram.url} target="_blank" rel="noreferrer">{site.instagram.handle}</a>
          </li>
        </ul>
      </Reveal>
      <Signature className="contact__sig" draw duration={3} delay={0.3} color="var(--burgundy)" />
    </div>
  );
}
