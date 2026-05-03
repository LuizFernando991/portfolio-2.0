import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 900;
import { translations, type Locale } from '@/lib/i18n';
import { createPageMetadata, localizedPath, pathToLocale } from '@/lib/seo';
import HomePageContent from '../HomePageContent';
import { getHomePosts } from '../home-data';

interface LocalizedHomePageProps {
  params: {
    locale: string;
  };
}

function getLocaleParam(value: string): Locale {
  if (value !== 'pt' && value !== 'en') notFound();
  return pathToLocale(value);
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}

export function generateMetadata({ params }: LocalizedHomePageProps): Metadata {
  const locale = getLocaleParam(params.locale);
  const t = translations[locale];

  return createPageMetadata({
    title: 'Luiz Fernando - Full-Stack Developer',
    description: t.hero.description,
    path: localizedPath('/', locale),
    locale,
    alternates: {
      canonical: localizedPath('/', locale),
      languages: {
        'pt-BR': localizedPath('/', 'pt-BR'),
        'en-US': localizedPath('/', 'en-US'),
      },
    },
  });
}

export default async function LocalizedHomePage({ params }: LocalizedHomePageProps) {
  const locale = getLocaleParam(params.locale);
  const posts = await getHomePosts();

  return <HomePageContent locale={locale} posts={posts} />;
}
