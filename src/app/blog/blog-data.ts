import { prisma } from '@/lib/prisma';
import { firstValue, toList, type BlogSearchParams } from './blog-utils';

const POSTS_PER_PAGE = 5;

export async function getBlogPageData(searchParams?: BlogSearchParams) {
  const activeCategories = toList(searchParams?.category);
  const activeTechnologies = toList(searchParams?.technology);
  const searchQuery = firstValue(searchParams?.q)?.trim();
  const requestedPage = Number(firstValue(searchParams?.page) ?? '1');

  const where = {
    published: true,
    ...(searchQuery
      ? {
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' as const } },
            { slug: { contains: searchQuery, mode: 'insensitive' as const } },
            { titleEn: { contains: searchQuery, mode: 'insensitive' as const } },
            { slugEn: { contains: searchQuery, mode: 'insensitive' as const } },
            { excerpt: { contains: searchQuery, mode: 'insensitive' as const } },
            { excerptEn: { contains: searchQuery, mode: 'insensitive' as const } },
            { content: { contains: searchQuery, mode: 'insensitive' as const } },
            { contentEn: { contains: searchQuery, mode: 'insensitive' as const } },
            {
              categories: {
                some: {
                  category: { name: { contains: searchQuery, mode: 'insensitive' as const } },
                },
              },
            },
            {
              technologies: {
                some: {
                  technology: { name: { contains: searchQuery, mode: 'insensitive' as const } },
                },
              },
            },
          ],
        }
      : {}),
    ...(activeCategories.length > 0
      ? { categories: { some: { category: { slug: { in: activeCategories } } } } }
      : {}),
    ...(activeTechnologies.length > 0
      ? { technologies: { some: { technology: { slug: { in: activeTechnologies } } } } }
      : {}),
  };

  const [categories, technologies, totalPosts, filteredPosts, featuredPosts] = await Promise.all([
    prisma.category.findMany({
      where: { posts: { some: { post: { published: true } } } },
      orderBy: { name: 'asc' },
    }),
    prisma.technology.findMany({
      where: { posts: { some: { post: { published: true } } } },
      orderBy: { name: 'asc' },
    }),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where }),
    prisma.post.findMany({
      where: { ...where, featured: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: 3,
      include: {
        categories: { include: { category: true } },
        technologies: { include: { technology: true } },
      },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts / POSTS_PER_PAGE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(1, Math.trunc(requestedPage)), totalPages)
    : 1;

  const posts = await prisma.post.findMany({
    where,
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    skip: (currentPage - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
    include: {
      categories: { include: { category: true } },
      technologies: { include: { technology: true } },
    },
  });

  return {
    categories,
    technologies,
    posts: posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      publishedAt: post.publishedAt?.toISOString() ?? null,
    })),
    featuredPosts: featuredPosts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      publishedAt: post.publishedAt?.toISOString() ?? null,
    })),
    totalPosts,
    filteredPosts,
    totalPages,
    currentPage,
  };
}
