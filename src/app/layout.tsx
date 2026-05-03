import type { Metadata } from 'next';
import { I18nProvider } from '@/lib/i18n-context';
import { defaultSeoDescription, pathToLocale, siteName, siteUrl } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl.toString() }],
  creator: siteName,
  publisher: siteName,
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  title: {
    default: 'Luiz Fernando - Full-Stack Developer',
    template: `%s | ${siteName}`,
  },
  description: defaultSeoDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName,
    title: 'Luiz Fernando - Full-Stack Developer',
    description: defaultSeoDescription,
  },
  twitter: {
    card: 'summary',
    title: 'Luiz Fernando - Full-Stack Developer',
    description: defaultSeoDescription,
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale?: string };
}) {
  const lang =
    params?.locale === 'en' || params?.locale === 'pt' ? pathToLocale(params.locale) : 'pt-BR';

  return (
    <html lang={lang}>
      <body>
        <I18nProvider initialLocale={lang}>{children}</I18nProvider>
      </body>
    </html>
  );
}
