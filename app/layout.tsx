import type { Metadata, Viewport } from 'next';
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/300-italic.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
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

export const viewport: Viewport = { themeColor: '#F5F2EB', width: 'device-width', initialScale: 1 };

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
