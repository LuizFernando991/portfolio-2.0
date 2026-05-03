import type { Metadata } from 'next';
import type { Locale } from './i18n';

export const siteUrl = new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://devluizfernando.com.br');
export const siteName = 'Luiz Fernando';
export const defaultSeoDescription =
  'Full-Stack Developer com experiência em Node.js, React, NestJS e AWS. Artigos sobre desenvolvimento, arquitetura e produtos escaláveis.';

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}

export function createCanonical(path = '/') {
  return new URL(path, siteUrl);
}

export function localeToPath(locale: Locale) {
  return locale === 'en-US' ? 'en' : 'pt';
}

export function pathToLocale(localePath?: string): Locale {
  return localePath === 'en' ? 'en-US' : 'pt-BR';
}

export function localizedPath(path: string, locale: Locale) {
  const cleanPath = path === '/' ? '' : path;
  return `/${localeToPath(locale)}${cleanPath}`;
}

export function ogLocale(locale: Locale) {
  return locale === 'en-US' ? 'en_US' : 'pt_BR';
}

export function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncateDescription(value: string, maxLength = 158) {
  const clean = stripMarkdown(value);

  if (clean.length <= maxLength) return clean;

  const truncated = clean.slice(0, maxLength + 1);
  const lastSpace = truncated.lastIndexOf(' ');

  return `${truncated.slice(0, lastSpace > 80 ? lastSpace : maxLength).trim()}...`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  locale = 'pt-BR',
  alternates,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  locale?: Locale;
  alternates?: Metadata['alternates'];
}): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, alt: title }] : undefined;

  return {
    title,
    description,
    alternates: alternates ?? {
      canonical: createCanonical(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type,
      locale: ogLocale(locale),
      images,
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime,
            authors: [siteName],
            tags,
          }
        : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
