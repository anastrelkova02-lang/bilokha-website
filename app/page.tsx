import Link from 'next/link';
import Signature from '@/components/Signature';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import PoemIndex from '@/components/PoemIndex';
import { photos } from '@/content/photos';
import { poems, getPoem } from '@/content/poems';
import { site } from '@/content/site';

// Фрагменти — точні рядки з віршів автора
const fragments = [
  { slug: 'ana', line: 'Осінь точно знає всі несказані тобою слова.' },
  { slug: 'toboyu-chy-nie', line: 'тобою колись я був створений,\nтобою і буду вбитий.' },
  { slug: 'pisliasmak', line: 'це літо було невиразно красивим.' },
];

export default function Home() {
  const skhid = getPoem('skhid')!;
  const skhidLines = skhid.text.split('\n').slice(0, 4);

  return (
    <>
      {/* 01 — ОБКЛАДИНКА */}
      <section className="hero" aria-label="БIЛОKhA">
        <div className="hero__meta">
          <span>Поетичний архів</span>
          <span>Вірші № 01 — {String(poems.length).padStart(2, '0')}</span>
        </div>

        <div className="hero__photo">
          <Photo photo={photos.authorField} priority sizes="(max-width: 768px) 90vw, 50vw" />
          <span className="hero__vertical">ПОЕТИЧНИЙ АРХІВ · УКРАЇНА</span>
        </div>

        <h1 className="hero__sig">
          <Signature draw duration={3.4} delay={0.5} color="var(--burgundy)" />
        </h1>

        <p className="hero__phrase">
          <em>«{site.tagline.replace(/\.$/, '')}».</em>
        </p>

        <a href="#fragments" className="hero__scroll" aria-label="Гортати донизу">
          <span>Гортайте</span>
          <i aria-hidden />
        </a>
      </section>

      {/* 02 — ФРАГМЕНТИ */}
      <section id="fragments" className="frags">
        <Reveal className="frags__label">
          <span className="label">Фрагменти</span>
        </Reveal>
        <div className="frags__grid">
          {fragments.map((f, i) => {
            const p = getPoem(f.slug)!;
            return (
              <Reveal key={f.slug} delay={i * 140} className="frag">
                <blockquote>{f.line}</blockquote>
                <Link href={`/poeziia/${p.slug}`} className="frag__src">
                  — {p.title}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 03 — ЗМІСТ */}
      <section className="home-index">
        <Reveal className="home-index__head">
          <h2 className="display">Поезія</h2>
          <p className="home-index__count">
            <span>{String(poems.length).padStart(2, '0')}</span> віршів
            <br />
            <Link href="/poeziia" className="link-u">увесь архів →</Link>
          </p>
        </Reveal>
        <PoemIndex />
      </section>

      {/* 04 — РОЗВОРОТ: СХІД */}
      <section className="spread">
        <div className="spread__img">
          <Photo photo={photos.road} sizes="100vw" />
        </div>
        <Reveal className="spread__card">
          <span className="label">Вірш {String(poems.indexOf(skhid) + 1).padStart(2, '0')}</span>
          <h2 className="spread__title">{skhid.title}</h2>
          <p className="poem-excerpt">
            {skhidLines.map((l, i) => (
              <span key={i}>{l}<br /></span>
            ))}
          </p>
          <Link href={`/poeziia/${skhid.slug}`} className="link-u">Читати повністю →</Link>
        </Reveal>
      </section>

      {/* 05 — ВІЗУАЛЬНИЙ АРХІВ */}
      <section className="teaser">
        <Reveal className="teaser__text">
          <span className="label">Візуальний архів</span>
          <h2 className="display display--sm">
            Фрагменти чийогось <em>життя</em>
          </h2>
          <Link href="/arkhiv" className="link-u">Відкрити архів →</Link>
        </Reveal>
        <div className="collage" aria-hidden>
          <Reveal className="collage__a"><Photo photo={photos.authorPath} sizes="30vw" /></Reveal>
          <Reveal className="collage__b" delay={150}><Photo photo={photos.glass} sizes="22vw" /></Reveal>
          <Reveal className="collage__c" delay={300}><Photo photo={photos.authorMotion} sizes="26vw" /></Reveal>
          <span className="collage__note">стежка, поле, рух</span>
        </div>
      </section>
    </>
  );
}
