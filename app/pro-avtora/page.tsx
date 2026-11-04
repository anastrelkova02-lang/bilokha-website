import type { Metadata } from 'next';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import Wordmark from '@/components/Wordmark';
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
      <div className="about__portrait">
        <Photo photo={photos.portrait} priority sizes="(max-width: 960px) 100vw, 50vw" className="photo--slow" />
      </div>

      <div className="about__text">
        <Reveal>
          <span className="mono">Про автора</span>
          <h1 className="about__title"><Wordmark /></h1>
          <p className="about__lead">{about.lead}</p>
          {about.paragraphs.map((t, i) => (
            <p key={i} className="about__p">{t}</p>
          ))}
          {about.placeholder && (
            <p className="about__hint">
              <span className="mono">Примітка</span> Текст-заглушка. Біографію редагують у файлі content/site.ts.
            </p>
          )}
        </Reveal>

        <div className="about__frames">
          <Reveal className="about__frame about__frame--a">
            <Photo photo={photos.motion} sizes="(max-width: 960px) 45vw, 18vw" caption="01 — Рух" />
          </Reveal>
          <Reveal className="about__frame about__frame--b" delay={150}>
            <Photo photo={photos.pathGround} sizes="(max-width: 960px) 55vw, 24vw" caption="02 — Колія" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
