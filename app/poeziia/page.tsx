import type { Metadata } from 'next';
import PoemIndex from '@/components/PoemIndex';
import Reveal from '@/components/Reveal';
import { poems } from '@/content/poems';

export const metadata: Metadata = {
  title: 'Поезія',
  description: 'Архів віршів БIЛОKhA.',
  alternates: { canonical: '/poeziia' },
};

export default function PoetryPage() {
  return (
    <div className="page">
      <Reveal className="page__head">
        <span className="mono">Архів / {String(poems.length).padStart(2, '0')} віршів</span>
        <h1 className="page__title">Поезія</h1>
        <p className="page__sub">Читайте по порядку або навмання.</p>
      </Reveal>
      <PoemIndex />
    </div>
  );
}
