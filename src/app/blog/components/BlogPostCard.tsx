/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import type { BlogPost, Taxonomy } from '../blog-utils';
import { formatBlogDate, localizedPost, readingTime } from '../blog-utils';
import styles from '../page.module.css';

interface BlogPostCardProps {
  post: BlogPost;
  locale: string;
  minuteLabel: string;
  variant?: 'default' | 'featured';
  chipLimit?: number;
  featured?: boolean;
  readPostLabel?: string;
  basePath?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function postTaxonomies(post: BlogPost): Taxonomy[] {
  return [
    ...post.categories.map(({ category }) => category),
    ...post.technologies.map(({ technology }) => technology),
  ];
}

function CodeThumb({
  title,
  variant,
}: {
  title: string;
  variant: NonNullable<BlogPostCardProps['variant']>;
}) {
  if (variant === 'featured') {
    return (
      <div className={styles.codeThumb} aria-hidden="true">
        <span className={styles.codeMuted}>★</span> featured
        <br />
        {title.slice(0, 36)}
      </div>
    );
  }

  return (
    <div className={styles.codeThumb} aria-hidden="true">
      <span className={styles.codeMuted}>$</span> git commit -m
      <br />
      &quot;{title.slice(0, 32)}&quot;
      <br />
      <span className={styles.codeMuted}>✓</span> published
    </div>
  );
}

export default function BlogPostCard({
  post,
  locale,
  minuteLabel,
  variant = 'default',
  chipLimit = 5,
  featured = false,
  readPostLabel,
  basePath = '/blog',
}: BlogPostCardProps) {
  const localized = localizedPost(post, locale);
  const taxonomies = postTaxonomies(post);
  const coverClassName = variant === 'featured' ? styles.featuredCover : styles.cover;
  const bodyClassName = variant === 'featured' ? styles.featuredBody : styles.body;
  const titleClassName = variant === 'featured' ? styles.featuredCardTitle : styles.cardTitle;

  return (
    <Link
      href={`${basePath}/${localized.slug}`}
      className={cx(
        variant === 'featured' ? styles.featuredCard : styles.card,
        featured && styles.featuredCardPrimary
      )}
    >
      <div className={coverClassName}>
        {post.coverImage ? (
          <img src={post.coverImage} alt="" />
        ) : (
          <CodeThumb title={localized.title} variant={variant} />
        )}
      </div>

      <article className={bodyClassName}>
        <div className={styles.meta}>
          <span>{formatBlogDate(post.publishedAt ?? post.createdAt, locale)}</span>*
          <span>
            {readingTime(localized.content)} {minuteLabel}
          </span>
        </div>

        {variant === 'featured' ? (
          <h3 className={titleClassName}>{localized.title}</h3>
        ) : (
          <h2 className={titleClassName}>{localized.title}</h2>
        )}

        {localized.excerpt ? (
          <p className={styles.excerpt} title={localized.excerpt}>
            {localized.excerpt}
          </p>
        ) : (
          <p className={`${styles.excerpt} ${styles.excerptEmpty}`} aria-hidden="true" />
        )}

        <div className={styles.chips}>
          {taxonomies.slice(0, chipLimit).map((item) => (
            <span key={item.id} className={styles.chip}>
              {item.name}
            </span>
          ))}
        </div>

        {readPostLabel && <span className={styles.readMore}>{readPostLabel}</span>}
      </article>
    </Link>
  );
}
