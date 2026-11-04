import Link from 'next/link';
import Signature from '@/components/Signature';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import PoemIndex from '@/components/PoemIndex';
import SectionHead from '@/components/SectionHead';
import { photos } from '@/content/photos';
import { poems, getPoem, poemNumber } from '@/content/poems';
import { site, about } from '@/content/site';

// Уривок для обкладинки — рядок з вірша «ПІСЛЯСМАК»
const EXCERPT = { slug: 'pisliasmak', text: 'Це літо було невиразно красивим.' };

export default function Home() {
  const src = getPoem(EXCERPT.slug)!;
  const total = String(poems.length).padStart(2, '0');

  return (
    <>
      {/* 01 — ОБКЛАДИНКА */}
      <section className="cover" aria-label="БIЛОKhA — обкладинка">
        <div className="cover__top">
          <span>БIЛОKhA / 001</span>
          <span className="cover__top-mid">Поетичний архів</span>
          <span>Україна / 2026</span>
        </div>

        <div className="cover__main">
          <Photo photo={photos.field} priority sizes="(max-width: 960px) 100vw, 64vw" className="photo--slow" />
        </div>

        <div className="cover__side">
          <div className="cover__small">
            <Photo photo={photos.motion} sizes="(max-width: 960px) 40vw, 18vw" />
            <span className="cover__frame">06A</span>
          </div>
          <div className="cover__excerpt">
            <span className="mono">{poemNumber(src.slug)} — {src.title}</span>
            <blockquote>«{EXCERPT.text.replace(/\.$/, '')}».</blockquote>
            <Link href="/poeziia" className="cta">
              Читати поезію <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>

        <h1 className="cover__sig">
          <Signature draw duration={3.2} delay={0.6} color="var(--burgundy)" />
        </h1>

        <div className="cover__bottom">
          <span>01 — Поетичний архів</span>
          <span>{total} віршів · фото · тексти</span>
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
