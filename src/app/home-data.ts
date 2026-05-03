import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { CACHE_TAGS } from '@/lib/revalidate';

export const getHomePosts = unstable_cache(
  async () => {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        titleEn: true,
        slugEn: true,
        excerpt: true,
        excerptEn: true,
        content: true,
        contentEn: true,
        coverImage: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      publishedAt: post.publishedAt?.toISOString() ?? null,
    }));
  },
  ['home-posts'],
  { tags: [CACHE_TAGS.posts], revalidate: 900 },
);
