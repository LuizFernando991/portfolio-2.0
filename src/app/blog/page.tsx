import type { Metadata } from 'next';
import { translations } from '@/lib/i18n';

export const revalidate = 900;
import { createPageMetadata, localizedPath } from '@/lib/seo';
import BlogPageContent from './BlogPageContent';
import { getBlogPageData } from './blog-data';
import type { BlogSearchParams } from './blog-utils';

export const metadata: Metadata = createPageMetadata({
  title: translations['pt-BR'].blog.metaTitle.replace(' | Luiz Fernando', ''),
  description: translations['pt-BR'].blog.metaDescription,
  path: '/blog',
  locale: 'pt-BR',
  alternates: {
    canonical: '/blog',
    languages: {
      'pt-BR': localizedPath('/blog', 'pt-BR'),
      'en-US': localizedPath('/blog', 'en-US'),
    },
  },
});

interface BlogPageProps {
  searchParams?: BlogSearchParams;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const data = await getBlogPageData(searchParams);

  return <BlogPageContent {...data} searchParams={searchParams} initialLocale="pt-BR" />;
}
