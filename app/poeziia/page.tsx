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
    <div className="archive">
      <Reveal className="archive__head">
        <span className="label">Архів · {String(poems.length).padStart(2, '0')} віршів</span>
        <h1 className="display display--xl">Поезія</h1>
        <p className="archive__intro">
          <em>Читайте по порядку або навмання.</em>
        </p>
      </Reveal>
      <PoemIndex />
    </div>
  );
}
