/**
 * ФОТОГРАФІЇ
 *
 * Зараз це тимчасові чорно-білі кадри з Unsplash (безкоштовна ліцензія Unsplash).
 * Щоб замінити на власні фото автора:
 *  1. Покладіть файл у /public/photos/ (наприклад /public/photos/portrait.jpg).
 *  2. Замініть `src` на '/photos/portrait.jpg'.
 * Усі фото на сайті автоматично отримують однакову обробку: ч/б, плівкове зерно.
 */

export type Photo = { src: string; alt: string; caption?: string };

const u = (id: string) => `https://images.unsplash.com/${id}`;

export const photos = {
  window: { src: u('photo-1534330207526-8e81f10ec6fc'), alt: 'Силует людини біля вікна', caption: 'вікно, вечір' },
  windowCross: { src: u('photo-1639377041729-9e3f3729023c'), alt: 'Відчинене вікно, чорно-білий кадр', caption: 'рама' },
  silhouetteRoom: { src: u('photo-1564282676894-f240ac8bee4d'), alt: 'Силует людини в кімнаті', caption: 'кімната' },
  glass: { src: u('photo-1518898053858-dcb49207fb75'), alt: 'Долоня за матовим склом', caption: 'скло' },
  leaves: { src: u('photo-1624680799574-8ff5b3f7c20e'), alt: 'Осіннє листя, чорно-білий кадр', caption: 'жовтень' },
  smoke: { src: u('photo-1505836684283-b127e3a2495e'), alt: 'Дим на чорному тлі', caption: 'дим' },
  grass: { src: u('photo-1784648761279-51f9d918cf98'), alt: 'Висока трава в полі', caption: 'серпень' },
  wheat: { src: u('photo-1605365571955-d51a6b24a497'), alt: 'Пшеничне поле', caption: 'поле' },
  terminal: { src: u('photo-1730916336192-fe7f0b7a433d'), alt: 'Порожній термінал аеропорту вночі', caption: 'ніч в аеропорту' },
  street: { src: u('photo-1583144584182-1717fab24b1e'), alt: 'Порожня вулиця між будинками', caption: 'площа' },
  road: { src: u('photo-1600907833406-a951cea45825'), alt: 'Дорога між полями під хмарним небом', caption: 'траса' },
  rails: { src: u('photo-1609868419652-4618ce630f33'), alt: 'Залізничні колії в тумані', caption: 'туман' },
  trainFog: { src: u('photo-1766521722969-e6c16145dba1'), alt: 'Вагон на коліях у тумані', caption: 'вагон' },
  platform: { src: u('photo-1771530097724-97d41d5f6cbf'), alt: 'Потяги на туманній платформі', caption: 'платформа' },
  forestRoad: { src: u('photo-1631384294105-3d74ca4b815d'), alt: 'Дорога через ліс', caption: 'дорога' },
  fog: { src: u('photo-1638112230548-72b91a962c55'), alt: 'Поле в тумані', caption: 'тиша' },
  bus: { src: u('photo-1761802023263-5afd6956bc2e'), alt: 'Людина дивиться у вікно автобуса в дощ', caption: 'дорогою' },
  shadow: { src: u('photo-1759181518307-6fbbcb4af13d'), alt: 'Силует людини біля вікна у світлі', caption: 'тінь' },
  alley: { src: u('photo-1544057234-f58ade17f5d4'), alt: 'Порожня вулиця', caption: 'провулок' },
  city: { src: u('photo-1500069329338-1f270dce111f'), alt: 'Бетонні будинки', caption: 'бетон' },
  curtain: { src: u('photo-1642246459233-ab1c90f7d087'), alt: 'Фіранка, розмите світло', caption: 'фіранка' },
  cigarette: { src: u('photo-1457449705837-be51f5fa9e96'), alt: 'Людина з цигаркою в темряві', caption: 'перерва' },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
export const photo = (k?: string): Photo | undefined => (k ? (photos as Record<string, Photo>)[k] : undefined);

/** Порядок кадрів у «Візуальному архіві» */
export const diary: { key: PhotoKey; size: 's' | 'm' | 'l' | 'tall' | 'wide' }[] = [
  { key: 'window', size: 'tall' },
  { key: 'fog', size: 'wide' },
  { key: 'glass', size: 's' },
  { key: 'rails', size: 'm' },
  { key: 'bus', size: 'l' },
  { key: 'leaves', size: 's' },
  { key: 'trainFog', size: 'wide' },
  { key: 'cigarette', size: 'tall' },
  { key: 'wheat', size: 'm' },
  { key: 'curtain', size: 's' },
  { key: 'platform', size: 'l' },
  { key: 'alley', size: 'tall' },
  { key: 'shadow', size: 'm' },
  { key: 'forestRoad', size: 'wide' },
  { key: 'city', size: 's' },
  { key: 'silhouetteRoom', size: 'm' },
];
