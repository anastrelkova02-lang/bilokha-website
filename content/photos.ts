/**
 * ФОТОГРАФІЇ — лише особисті фото автора (папка /public/photos/).
 *
 * Кадри-деталі (field-grass, path-trees…) — це кадрування тих самих чотирьох знімків,
 * щоб скласти документальну послідовність без стокових фото.
 * Щоб додати нове фото: покладіть файл у /public/photos/ і додайте запис нижче.
 * Обробка (ч/б, плівкове зерно, м'які світла) застосовується автоматично.
 */

export type Photo = { src: string; alt: string; caption?: string };

const p = (name: string) => `/photos/${name}.jpg`;

export const photos = {
  field: { src: p('field'), alt: 'Автор у полі серед високої трави', caption: 'Поле' },
  portrait: { src: p('portrait'), alt: 'Портрет автора в профіль, ліс у контровому світлі', caption: 'Профіль' },
  path: { src: p('path'), alt: 'Автор на лісовій дорозі, вид зі спини', caption: 'Стежка' },
  motion: { src: p('motion'), alt: 'Автор іде в ліс, розмитий рух', caption: 'Рух' },
  fieldGrass: { src: p('field-grass'), alt: 'Трава і дрібні квіти', caption: 'Трава' },
  fieldTrees: { src: p('field-trees'), alt: 'Лінія дерев над полем', caption: 'Узлісся' },
  fieldFigure: { src: p('field-figure'), alt: 'Автор у траві, крупніше', caption: 'Крок' },
  portraitLight: { src: p('portrait-light'), alt: 'Світло крізь дерева', caption: 'Світло' },
  portraitProfile: { src: p('portrait-profile'), alt: 'Профіль автора', caption: 'Усмішка' },
  pathTrees: { src: p('path-trees'), alt: 'Крони дерев над лісовою дорогою', caption: 'Крони' },
  pathGround: { src: p('path-ground'), alt: 'Колія в траві', caption: 'Колія' },
  motionLeaves: { src: p('motion-leaves'), alt: 'Розмите листя в русі', caption: 'Вітер' },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
export const photo = (k?: string): Photo | undefined => (k ? (photos as Record<string, Photo>)[k] : undefined);

/** Візуальний архів: порядок і пропорції кадрів */
export const diary: { key: PhotoKey; size: 's' | 'm' | 'l' | 'tall' | 'wide' }[] = [
  { key: 'field', size: 'l' },
  { key: 'portraitLight', size: 's' },
  { key: 'motion', size: 'tall' },
  { key: 'fieldGrass', size: 'wide' },
  { key: 'portraitProfile', size: 'm' },
  { key: 'pathTrees', size: 'm' },
  { key: 'path', size: 'tall' },
  { key: 'pathGround', size: 'wide' },
  { key: 'fieldFigure', size: 's' },
  { key: 'motionLeaves', size: 'm' },
  { key: 'portrait', size: 'l' },
  { key: 'fieldTrees', size: 'wide' },
];
