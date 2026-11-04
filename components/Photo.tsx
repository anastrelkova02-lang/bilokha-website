import Image from 'next/image';
import type { Photo as P } from '@/content/photos';

type Props = {
  photo?: P;
  className?: string;
  sizes?: string;
  priority?: boolean;
  caption?: boolean | string;
  /** співвідношення сторін, напр. "3/4". Якщо не задано — заповнює батьківський блок */
  ratio?: string;
};

export default function Photo({ photo, className = '', sizes = '(max-width: 768px) 100vw, 50vw', priority, caption, ratio }: Props) {
  if (!photo) return null;
  const cap = typeof caption === 'string' ? caption : caption ? photo.caption : undefined;
  return (
    <figure className={`photo ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <div className="photo__frame">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} quality={78} />
        <span className="photo__grain" aria-hidden />
      </div>
      {cap && <figcaption className="photo__cap">{cap}</figcaption>}
    </figure>
  );
}
