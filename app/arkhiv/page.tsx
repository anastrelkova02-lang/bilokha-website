import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Diary from '@/components/Diary';
import { diary, photos } from '@/content/photos';

export const metadata: Metadata = {
  title: 'Візуальний архів',
  description: 'Фотографічний щоденник БIЛОKhA: плівка, дороги, вікна, тиша.',
  alternates: { canonical: '/arkhiv' },
};

export default function DiaryPage() {
  const items = diary.map((d, i) => ({ ...photos[d.key], size: d.size, no: String(i + 1).padStart(2, '0') }));
  return (
    <div className="page diary">
      <Reveal className="page__head">
        <span className="mono">Візуальний архів / {items.length} кадрів</span>
        <h1 className="page__title">Візуальний архів</h1>
        <p className="page__sub">Документальний щоденник: поле, ліс, світло, рух.</p>
      </Reveal>
      <Diary items={items} />
    </div>
  );
}
