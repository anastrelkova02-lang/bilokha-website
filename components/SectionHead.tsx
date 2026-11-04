import Link from 'next/link';

/** Редакційна шапка розділу: номер (моно) · назва · тонка лінія · необов'язкове посилання */
export default function SectionHead({ no, title, href, linkLabel }: { no: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="shead">
      <span className="shead__no">{no}</span>
      <h2 className="shead__title">{title}</h2>
      {href && (
        <Link href={href} className="shead__link">
          {linkLabel} <span aria-hidden>↗</span>
        </Link>
      )}
    </div>
  );
}
