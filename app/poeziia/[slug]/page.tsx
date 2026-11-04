import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Photo from '@/components/Photo';
import { poems, getPoem } from '@/content/poems';
import { photo } from '@/content/photos';
import { site } from '@/content/site';

type Params = { slug: string };

export function generateStaticParams() {
  return poems.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPoem(slug);
  if (!p) return {};
  const desc = p.text.split('\n').slice(0, 2).join(' ');
  return {
    title: p.title,
    description: desc,
    alternates: { canonical: `/poeziia/${p.slug}` },
    openGraph: { type: 'article', title: `${p.title} — ${site.name}`, description: desc },
  };
}

function PoemText({ text }: { text: string }) {
  const stanzas = text.split(/\n\s*\n/);
  let n = 0;
  return (
    <div className="poem">
      {stanzas.map((s, si) => (
        <p key={si} className="poem__stanza">
          {s.split('\n').map((line, li) => {
            const i = n++;
            return (
              <span key={li} className="poem__line" style={{ animationDelay: `${0.35 + i * 0.045}s` }}>
                {line || ' '}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

export default async function PoemPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getPoem(slug);
  if (!p) notFound();
  const idx = poems.indexOf(p);
  const no = String(idx + 1).padStart(2, '0');
  const total = String(poems.length).padStart(2, '0');
  const prev = poems[(idx - 1 + poems.length) % poems.length];
  const next = poems[(idx + 1) % poems.length];
  const ph = photo(p.photo);

  const meta = (
    <div className="pp__meta">
      <Link href="/poeziia" className="link-u">← Архів</Link>
      <span>Вірш {no} / {total}</span>
    </div>
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    genre: 'Poetry',
    name: p.title,
    inLanguage: 'uk',
    author: { '@type': 'Person', name: site.name },
    text: p.text,
  };

  return (
    <article className={`pp pp--${p.layout}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {p.layout === 'cover' && (
        <>
          <div className="pp-cover">
            <Photo photo={ph} priority sizes="100vw" />
            <div className="pp-cover__title">
              <span className="pp__no">№ {no}</span>
              <h1>{p.title}</h1>
            </div>
          </div>
          <div className="pp__body pp__body--center">
            {meta}
            <PoemText text={p.text} />
          </div>
        </>
      )}

      {p.layout === 'split' && (
        <div className="pp-split">
          <div className="pp-split__img">
            <Photo photo={ph} priority sizes="(max-width: 900px) 100vw, 50vw" caption />
          </div>
          <div className="pp-split__text">
            {meta}
            <span className="pp__no">№ {no}</span>
            <h1 className="pp__title">{p.title}</h1>
            <PoemText text={p.text} />
          </div>
        </div>
      )}

      {p.layout === 'vertical' && (
        <div className="pp-vert">
          <h1 className="pp-vert__title">{p.title}</h1>
          <div className="pp-vert__text">
            {meta}
            <span className="pp__no">№ {no}</span>
            <PoemText text={p.text} />
          </div>
          {ph && (
            <div className="pp-vert__img">
              <Photo photo={ph} sizes="(max-width: 900px) 70vw, 24vw" caption />
            </div>
          )}
        </div>
      )}

      {p.layout === 'margin' && (
        <div className="pp-margin">
          <span className="pp-margin__bgno" aria-hidden>{no}</span>
          <div className="pp-margin__text">
            {meta}
            <h1 className="pp__title">{p.title}</h1>
            <PoemText text={p.text} />
          </div>
          <aside className="pp-margin__side">
            {ph && <Photo photo={ph} sizes="(max-width: 900px) 60vw, 22vw" ratio="3/4" caption />}
            {p.note && <p className="pp-margin__note">{p.note}</p>}
          </aside>
        </div>
      )}

      {p.layout === 'classic' && (
        <div className="pp__body pp__body--center">
          {meta}
          <span className="pp__no">№ {no}</span>
          <h1 className="pp__title">{p.title}</h1>
          <PoemText text={p.text} />
        </div>
      )}

      <div className="pp__end" aria-hidden>
        <span className="mono">{no} / {total}</span>
        <span className="pp__end-rule" />
        <span className="mono">БIЛОKhA</span>
      </div>

      <nav className="pp-nav" aria-label="Інші вірші">
        <Link href={`/poeziia/${prev.slug}`} className="pp-nav__item">
          <small>← Попередній</small>
          <span>{prev.title}</span>
        </Link>
        <Link href={`/poeziia/${next.slug}`} className="pp-nav__item pp-nav__item--next">
          <small>Наступний →</small>
          <span>{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
