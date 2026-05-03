import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { translations, type Locale } from '@/lib/i18n';

export const revalidate = 900;
import { createPageMetadata, localizedPath, pathToLocale } from '@/lib/seo';
import BlogPageContent from '../../blog/BlogPageContent';
import { getBlogPageData } from '../../blog/blog-data';
import type { BlogSearchParams } from '../../blog/blog-utils';

interface LocalizedBlogPageProps {
  params: {
    locale: string;
  };
  searchParams?: BlogSearchParams;
}

function getLocaleParam(value: string): Locale {
  if (value !== 'pt' && value !== 'en') notFound();
  return pathToLocale(value);
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}

export function generateMetadata({ params }: LocalizedBlogPageProps): Metadata {
  const locale = getLocaleParam(params.locale);
  const t = translations[locale].blog;

  return createPageMetadata({
    title: t.metaTitle.replace(' | Luiz Fernando', ''),
    description: t.metaDescription,
    path: localizedPath('/blog', locale),
    locale,
    alternates: {
      canonical: localizedPath('/blog', locale),
      languages: {
        'pt-BR': localizedPath('/blog', 'pt-BR'),
        'en-US': localizedPath('/blog', 'en-US'),
      },
    },
  });
}

export default async function LocalizedBlogPage({ params, searchParams }: LocalizedBlogPageProps) {
  const locale = getLocaleParam(params.locale);
  const data = await getBlogPageData(searchParams);

  return <BlogPageContent {...data} searchParams={searchParams} initialLocale={locale} />;
}
