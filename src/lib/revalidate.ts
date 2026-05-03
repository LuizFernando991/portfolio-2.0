import { revalidatePath, revalidateTag } from 'next/cache';

export const CACHE_TAGS = {
  posts: 'posts',
  categories: 'categories',
  technologies: 'technologies',
} as const;

const LOCALES = ['pt', 'en'] as const;

export function revalidatePostCache(slugs?: { pt?: string | null; en?: string | null }) {
  revalidateTag(CACHE_TAGS.posts);

  revalidatePath('/');
  revalidatePath('/blog');
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/blog`);
  }

  if (slugs?.pt) {
    revalidatePath(`/blog/${slugs.pt}`);
    revalidatePath(`/pt/blog/${slugs.pt}`);
  }
  if (slugs?.en) {
    revalidatePath(`/blog/${slugs.en}`);
    revalidatePath(`/en/blog/${slugs.en}`);
  }
}

export function revalidateCategoryCache() {
  revalidateTag(CACHE_TAGS.categories);
  revalidatePath('/blog');
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/blog`);
  }
}

export function revalidateTechnologyCache() {
  revalidateTag(CACHE_TAGS.technologies);
  revalidatePath('/blog');
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/blog`);
  }
}
