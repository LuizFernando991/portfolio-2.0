import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      slug: true,
      slugEn: true,
      updatedAt: true,
      publishedAt: true,
      createdAt: true,
    },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });

  return [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/pt'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/en'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: posts[0]?.publishedAt ?? posts[0]?.createdAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/pt/blog'),
      lastModified: posts[0]?.publishedAt ?? posts[0]?.createdAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/en/blog'),
      lastModified: posts[0]?.publishedAt ?? posts[0]?.createdAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.flatMap((post) => {
      const lastModified = post.updatedAt ?? post.publishedAt ?? post.createdAt;

      return [
        {
          url: absoluteUrl(`/blog/${post.slug}`),
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        },
        {
          url: absoluteUrl(`/pt/blog/${post.slug}`),
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        },
        ...(post.slugEn
          ? [
              {
                url: absoluteUrl(`/blog/${post.slugEn}`),
                lastModified,
                changeFrequency: 'monthly' as const,
                priority: 0.7,
              },
              {
                url: absoluteUrl(`/en/blog/${post.slugEn}`),
                lastModified,
                changeFrequency: 'monthly' as const,
                priority: 0.7,
              },
            ]
          : []),
      ];
    }),
  ];
}
