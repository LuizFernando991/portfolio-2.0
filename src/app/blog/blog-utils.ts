export interface BlogSearchParams {
  category?: string | string[];
  page?: string | string[];
  q?: string | string[];
  technology?: string | string[];
}

export interface Taxonomy {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  titleEn: string | null;
  slugEn: string | null;
  content: string;
  contentEn: string | null;
  excerpt: string | null;
  excerptEn: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  categories: { category: Taxonomy }[];
  technologies: { technology: Taxonomy }[];
}

export function toList(value?: string | string[]) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.flatMap((item) => item.split(',')).filter(Boolean);
}

export function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function appendValues(params: URLSearchParams, key: string, values: string[]) {
  values.forEach((value) => params.append(key, value));
}

export function filterHref(
  type: 'category' | 'technology',
  slug?: string,
  current?: BlogSearchParams,
  basePath = '/blog'
) {
  const params = new URLSearchParams();
  const currentCategories = toList(current?.category);
  const currentTechnologies = toList(current?.technology);
  const source = type === 'category' ? currentCategories : currentTechnologies;
  const nextValues = slug
    ? source.includes(slug)
      ? source.filter((value) => value !== slug)
      : [...source, slug]
    : [];

  appendValues(params, 'category', type === 'category' ? nextValues : currentCategories);
  appendValues(params, 'technology', type === 'technology' ? nextValues : currentTechnologies);
  const search = firstValue(current?.q);
  if (search) params.set('q', search);

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function pageHref(page: number, current?: BlogSearchParams, basePath = '/blog') {
  const params = new URLSearchParams();

  appendValues(params, 'category', toList(current?.category));
  appendValues(params, 'technology', toList(current?.technology));
  const query = firstValue(current?.q);
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));

  const serialized = params.toString();
  return serialized ? `${basePath}?${serialized}` : basePath;
}

export function searchHref(query: string, current?: BlogSearchParams, basePath = '/blog') {
  const params = new URLSearchParams();

  appendValues(params, 'category', toList(current?.category));
  appendValues(params, 'technology', toList(current?.technology));
  if (query.trim()) params.set('q', query.trim());

  const serialized = params.toString();
  return serialized ? `${basePath}?${serialized}` : basePath;
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export function localizedPost(post: BlogPost, locale: string) {
  const useEnglish = locale === 'en-US';

  return {
    title: useEnglish && post.titleEn ? post.titleEn : post.title,
    slug: useEnglish && post.slugEn ? post.slugEn : post.slug,
    excerpt: useEnglish && post.excerptEn ? post.excerptEn : post.excerpt,
    content: useEnglish && post.contentEn ? post.contentEn : post.content,
  };
}

export function formatBlogDate(value: string | null, locale: string) {
  return new Date(value ?? Date.now()).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
