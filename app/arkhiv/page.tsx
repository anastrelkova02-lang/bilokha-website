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
    <div className="diary">
      <Reveal className="diary__head">
        <span className="label">Візуальний архів · {items.length} кадрів</span>
        <h1 className="display display--xl">
          Візуальний <em>архів</em>
        </h1>
      </Reveal>
      <Diary items={items} />
    </div>
  );
}
