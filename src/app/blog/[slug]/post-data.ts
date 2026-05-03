import { prisma } from '@/lib/prisma';

export async function getPost(slug: string) {
  return prisma.post.findFirst({
    where: { published: true, OR: [{ slug }, { slugEn: slug }] },
    include: {
      categories: { include: { category: true } },
      technologies: { include: { technology: true } },
    },
  });
}

export function postPath(slug: string, basePath = '/blog') {
  return `${basePath}/${slug}`;
}

export function localizedPostForLocale(
  post: Awaited<ReturnType<typeof getPost>>,
  locale: 'pt-BR' | 'en-US'
) {
  if (!post) return null;
  const useEnglish = locale === 'en-US';

  return {
    title: useEnglish && post.titleEn ? post.titleEn : post.title,
    slug: useEnglish && post.slugEn ? post.slugEn : post.slug,
    excerpt: useEnglish && post.excerptEn ? post.excerptEn : post.excerpt,
    content: useEnglish && post.contentEn ? post.contentEn : post.content,
    locale,
  };
}

export function localizedPostForSlug(post: Awaited<ReturnType<typeof getPost>>, slug: string) {
  if (!post) return null;

  return localizedPostForLocale(post, post.slugEn === slug ? 'en-US' : 'pt-BR');
}

export function postTaxonomyNames(post: NonNullable<Awaited<ReturnType<typeof getPost>>>) {
  return [
    ...post.categories.map(({ category }) => category.name),
    ...post.technologies.map(({ technology }) => technology.name),
  ];
}
