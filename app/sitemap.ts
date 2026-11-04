import type { MetadataRoute } from 'next';
import { poems } from '@/content/poems';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/poeziia', '/arkhiv', '/pro-avtora', '/kontakt'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    ...poems.map((p) => ({ url: `${site.url}/poeziia/${p.slug}`, changeFrequency: 'yearly' as const, priority: 0.7 })),
  ];
}
