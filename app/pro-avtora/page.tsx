import type { Metadata } from 'next';
import Photo from '@/components/Photo';
import Signature from '@/components/Signature';
import Reveal from '@/components/Reveal';
import { photos } from '@/content/photos';
import { about } from '@/content/site';

export const metadata: Metadata = {
  title: 'Про автора',
  description: 'Про автора БIЛОKhA.',
  alternates: { canonical: '/pro-avtora' },
};

export default function AboutPage() {
  return (
    <div className="about">
      <div className="about__text">
        <Reveal>
          <p className="about__label">ПРО АВТОРА:</p>
          <p className="about__lead">{about.lead}</p>
          {about.paragraphs.map((t, i) => (
            <p key={i} className="about__p">{t}</p>
          ))}
          {about.placeholder && (
            <p className="about__hint">
              Текст-заглушка. Біографію редагують у файлі <code>content/site.ts</code>.
            </p>
          )}
        </Reveal>
        <Signature className="about__sig" draw duration={2.6} delay={0.6} color="var(--burgundy)" />
      </div>
      <div className="about__img">
        <Photo photo={photos.authorPortrait} priority sizes="(max-width: 900px) 100vw, 55vw" />
      </div>
    </div>
  );
}
