import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Photo from '@/components/Photo';
import { photos } from '@/content/photos';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Контакт',
  description: 'Зв’язатися з БIЛОKhA.',
  alternates: { canonical: '/kontakt' },
};

export default function ContactPage() {
  return (
    <div className="page contact">
      <Reveal className="contact__inner">
        <span className="mono">Контакт</span>
        <h1 className="page__title">Листи, запрошення на читання і розмови про поезію.</h1>
        <ul className="closing__links">
          <li><span className="mono">Пошта</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><span className="mono">Instagram</span><a href={site.instagram.url} target="_blank" rel="noreferrer">{site.instagram.handle}</a></li>
        </ul>
      </Reveal>
      <Reveal className="contact__img" delay={150}>
        <Photo photo={photos.fieldTrees} sizes="(max-width: 960px) 100vw, 40vw" caption="Узлісся" />
      </Reveal>
    </div>
  );
}
