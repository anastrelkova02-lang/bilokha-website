import Link from 'next/link';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import PoemIndex from '@/components/PoemIndex';
import SectionHead from '@/components/SectionHead';
import { photos } from '@/content/photos';
import { poems, getPoem, poemNumber } from '@/content/poems';
import { site, about } from '@/content/site';

// Уривок на обкладинці — точний рядок із вірша «ПІСЛЯСМАК» (без змін)
const EXCERPT = { slug: 'pisliasmak', line: 'це літо було невиразно красивим.' };

export default function Home() {
  const src = getPoem(EXCERPT.slug)!;
  if (!src.text.includes(EXCERPT.line)) throw new Error('Уривок має точно збігатися з текстом вірша');
  const total = String(poems.length).padStart(2, '0');

  return (
    <>
      {/* 01 — ОБКЛАДИНКА */}
      <section className="cover" aria-label="Обкладинка">
        <div className="cover__mast">
          <span>№ 001</span>
          <span className="cover__mast-mid">Сучасна українська поезія</span>
          <span>Україна / 2026</span>
        </div>

        <figure className="cover__main">
          <Photo photo={photos.field} priority sizes="(max-width: 960px) 100vw, 66vw" className="photo--slow" />
          <blockquote className="cover__quote">
            <p>«{EXCERPT.line}»</p>
            <footer>
              <span>{poemNumber(src.slug)}</span> {src.title}
            </footer>
          </blockquote>
          <figcaption className="cover__cap">Фото 01 — Поле</figcaption>
        </figure>

        <aside className="cover__side">
          <div className="cover__toc">
            <span className="mono">У цьому архіві</span>
            <ol>
              {poems.map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/poeziia/${p.slug}`}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ol>
            <Link href="/poeziia" className="cta">
              Читати поезію <span aria-hidden>↗</span>
            </Link>
          </div>
          <div className="cover__small">
            <Photo photo={photos.motion} sizes="(max-width: 960px) 40vw, 14vw" />
            <span className="cover__small-cap mono">Фото 02 — Рух</span>
          </div>
        </aside>

        <div className="cover__foot">
          <span>{total} віршів · фотографії · тексти</span>
          <a href="#poetry" className="cover__scroll">Гортати ↓</a>
        </div>
      </section>

      {/* 02 — ВИБРАНА ПОЕЗІЯ */}
      <section id="poetry" className="sec">
        <SectionHead no="02" title="Вибрана поезія" href="/poeziia" linkLabel="Увесь архів" />
        <PoemIndex />
      </section>

      {/* 03 — ВІЗУАЛЬНИЙ АРХІВ */}
      <section className="sec sec--stone">
        <SectionHead no="03" title="Візуальний архів" href="/arkhiv" linkLabel="Відкрити архів" />
        <div className="vgrid">
          <Reveal className="vgrid__a"><Photo photo={photos.path} sizes="(max-width: 960px) 100vw, 40vw" caption="01 — Стежка" /></Reveal>
          <Reveal className="vgrid__b" delay={120}><Photo photo={photos.fieldGrass} sizes="(max-width: 960px) 100vw, 50vw" caption="02 — Трава" /></Reveal>
          <Reveal className="vgrid__c" delay={240}><Photo photo={photos.portraitLight} sizes="(max-width: 960px) 50vw, 22vw" caption="03 — Світло" /></Reveal>
          <Reveal className="vgrid__d" delay={360}><Photo photo={photos.motionLeaves} sizes="(max-width: 960px) 50vw, 22vw" caption="04 — Вітер" /></Reveal>
        </div>
      </section>

      {/* 04 — ПРО АВТОРА */}
      <section className="sec">
        <SectionHead no="04" title="Про автора" href="/pro-avtora" linkLabel="Детальніше" />
        <div className="intro">
          <Reveal className="intro__img">
            <Photo photo={photos.portrait} sizes="(max-width: 960px) 100vw, 42vw" />
          </Reveal>
          <Reveal className="intro__text" delay={150}>
            <p className="intro__lead">{about.lead}</p>
            <p className="intro__p">{about.paragraphs[0]}</p>
            <Link href="/pro-avtora" className="cta">Про автора <span aria-hidden>↗</span></Link>
          </Reveal>
        </div>
      </section>

      {/* 05 — КОНТАКТ */}
      <section className="sec sec--white">
        <SectionHead no="05" title="Контакт" />
        <div className="closing">
          <p className="closing__line">Листи, запрошення на читання і розмови про поезію.</p>
          <ul className="closing__links">
            <li><span className="mono">Пошта</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><span className="mono">Instagram</span><a href={site.instagram.url} target="_blank" rel="noreferrer">{site.instagram.handle}</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
