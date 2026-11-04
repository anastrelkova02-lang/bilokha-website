# БIЛОKhA — поетичний архів

Персональний сайт сучасного українського поета: редакційний поетичний архів з власним рукописним підписом-логотипом, окремими сторінками віршів, візуальним щоденником і мінімалістичними сторінками «Про автора» та «Контакт».

**Стек:** Next.js 15 (App Router, статична генерація) · React 19 · TypeScript · чистий CSS · шрифти Cormorant Garamond та Inter (з повною підтримкою української кирилиці, самохостинг через `@fontsource`).

---

## Структура

```
app/                    сторінки (маршрути)
  page.tsx              Головна
  poeziia/              Поезія — архів і сторінки віршів (/poeziia/[slug])
  arkhiv/               Візуальний архів
  pro-avtora/           Про автора
  kontakt/              Контакт
  globals.css           уся візуальна система (кольори, типографіка, макети)
  icon.svg, apple-icon.png, opengraph-image.png   іконки та превʼю для соцмереж
components/             Signature (логотип з анімацією), Header, Footer, Photo, PoemIndex, Diary, Reveal
content/                ← ВЕСЬ ЗМІСТ САЙТУ ТУТ
  poems.ts              вірші
  photos.ts             фотографії та порядок кадрів в архіві
  site.ts               назва, опис, пошта, Instagram, біографія
brand/                  логотип: SVG/PNG-файли + інструмент генерації (brand/tools)
lib/signature.ts        дані підпису для сайту (згенеровані)
```

## Запуск локально

Потрібен Node.js 18.18+.

```bash
git clone https://github.com/<ваш-акаунт>/bilokha-website.git
cd bilokha-website
npm install
npm run dev        # http://localhost:3000
npm run build      # перевірка продакшн-збірки
```

## Як оновлювати зміст

### Додати вірш
Відкрийте `content/poems.ts`, скопіюйте один обʼєкт і вставте в кінець масиву:

```ts
{
  slug: 'nova-nazva',          // адреса: /poeziia/nova-nazva
  title: 'НОВА НАЗВА',
  layout: 'classic',           // classic | split | margin | vertical | cover
  photo: 'fog',                // ключ з content/photos.ts (необовʼязково)
  text: `Перший рядок
другий рядок

нова строфа після порожнього рядка`,
},
```
Текст відображається рівно так, як записаний: кожен рядок — окремий рядок вірша, порожній рядок — нова строфа. Сторінка, номер, навігація «попередній / наступний», карта сайту і SEO створюються автоматично.

### Замінити фотографії
Фото автора лежать у `public/photos/` (field, portrait, path, motion). Решта — тимчасові ч/б кадри з Unsplash. Покладіть власні фото у `public/photos/` і замініть `src` у `content/photos.ts`, напр. `src: '/photos/portrait.jpg'`. Обробка (ч/б, зерно, віньєтка) застосовується автоматично до всіх фото. Портрет на сторінці «Про автора» — ключ `authorPortrait`.

### Біографія, пошта, Instagram
`content/site.ts` — замініть заглушки та встановіть `placeholder: false`, щоб прибрати підказку на сторінці «Про автора». Там же — `url` сайту (для SEO), якщо підключите власний домен.

## Логотип

Підпис БIЛОKhA — не шрифт: це намальовані вручну траєкторії пера (`brand/tools/signature.strokes.json`), з яких генерується контур зі змінною товщиною штриха, як від справжнього пера.

Готові файли в `brand/` (і в `public/brand/` — доступні за посиланням на сайті):

| Файл | Призначення |
|---|---|
| `bilokha-signature.svg` | основний логотип, бордо `#800F18` |
| `bilokha-signature-ivory.svg` | для темного тла |
| `bilokha-signature-black.svg` | монохром |
| `bilokha-monogram.svg` | монограма «Б» |
| `bilokha-favicon.svg` | фавікон |
| `bilokha-avatar.svg`, `bilokha-avatar-1080.png` | аватар для соцмереж |

Щоб змінити форму підпису — відредагуйте координати в `brand/tools/*.strokes.json`, потім:

```bash
npm run brand
node -e "/* див. коментар у lib/signature.ts */"
```
(після `npm run brand` скопіюйте `paths`/`centers` з `brand/bilokha-signature.json` у `lib/signature.ts`).

## Палітра

| | |
|---|---|
| Теплий ivory | `#F5F2EB` |
| Папір | `#EAE6DC` |
| М'який білий | `#FAF9F6` |
| Чорний | `#171717` |
| Бордо (акцент) | `#800F18` |
| Темне вино | `#591016` |

## Деплой (Vercel)

Репозиторій підключено до Vercel: **кожен push у гілку `main` автоматично публікує нову версію сайту.** Pull request-и отримують окремі превʼю-адреси.

Налаштування збірки стандартні для Next.js (Vercel визначає їх сам): build — `next build`, змінні середовища не потрібні.

Щоб оновити сайт: змініть файл (можна прямо в GitHub через веб-редактор) → Commit to `main` → за хвилину зміни на сайті.
