import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';

export const revalidate = 900;
import { translations } from '@/lib/i18n';
import {
  absoluteUrl,
  createPageMetadata,
  localizedPath,
  ogLocale,
  pathToLocale,
  siteName,
  truncateDescription,
} from '@/lib/seo';
import { I18nProvider } from '@/lib/i18n-context';
import PostPageContent from '../../../blog/[slug]/PostPageContent';
import {
  getPost,
  localizedPostForLocale,
  postPath,
  postTaxonomyNames,
} from '../../../blog/[slug]/post-data';

interface LocalizedPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

function getLocaleParam(value: string): Locale {
  if (value !== 'pt' && value !== 'en') notFound();
  return pathToLocale(value);
}

export async function generateMetadata({ params }: LocalizedPostPageProps): Promise<Metadata> {
  const locale = getLocaleParam(params.locale);
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: translations[locale].blog.notFoundTitle,
    };
  }

  const localized = localizedPostForLocale(post, locale)!;
  const description = truncateDescription(localized.excerpt ?? localized.content);
  const taxonomies = postTaxonomyNames(post);
  const canonical = localizedPath(postPath(localized.slug), locale);
  const metadata = createPageMetadata({
    title: localized.title,
    description,
    path: canonical,
    image: post.coverImage,
    type: 'article',
    locale,
    publishedTime: (post.publishedAt ?? post.createdAt).toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    tags: taxonomies,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      locale: ogLocale(locale),
    },
    alternates: {
      canonical,
      languages: {
        'pt-BR': localizedPath(postPath(post.slug), 'pt-BR'),
        ...(post.slugEn ? { 'en-US': localizedPath(postPath(post.slugEn), 'en-US') } : {}),
      },
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, slugEn: true },
  });

  return posts.flatMap((post) => [
    { locale: 'pt', slug: post.slug },
    ...(post.slugEn ? [{ locale: 'en', slug: post.slugEn }] : []),
  ]);
}

export default async function LocalizedPostPage({ params }: LocalizedPostPageProps) {
  const locale = getLocaleParam(params.locale);
  const post = await getPost(params.slug);

  if (!post) notFound();

  const localized = localizedPostForLocale(post, locale)!;
  const description = truncateDescription(localized.excerpt ?? localized.content);
  const publishedAt = post.publishedAt ?? post.createdAt;
  const taxonomies = postTaxonomyNames(post);
  const url = absoluteUrl(localizedPath(postPath(localized.slug), locale));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: localized.title,
    description,
    url,
    datePublished: publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: siteName,
      url: absoluteUrl('/'),
    },
    publisher: {
      '@type': 'Person',
      name: siteName,
      url: absoluteUrl('/'),
    },
    inLanguage: locale,
    keywords: taxonomies,
    ...(post.coverImage ? { image: [post.coverImage] } : {}),
  };

  return (
    <I18nProvider initialLocale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostPageContent
        post={{
          ...post,
          createdAt: post.createdAt.toISOString(),
          publishedAt: post.publishedAt?.toISOString() ?? null,
        }}
      />
    </I18nProvider>
  );
}
