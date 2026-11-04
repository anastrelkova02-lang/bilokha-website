import type { Metadata, Viewport } from 'next';
import '@fontsource/noto-serif-display/400.css';
import '@fontsource/noto-serif-display/500.css';
import '@fontsource/noto-serif/400.css';
import '@fontsource/onest/400.css';
import '@fontsource/onest/500.css';
import '@fontsource/onest/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — поетичний архів`, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: site.name,
    title: `${site.name} — поетичний архів`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#F7F6F2', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <a href="#main" className="skip">Перейти до змісту</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
