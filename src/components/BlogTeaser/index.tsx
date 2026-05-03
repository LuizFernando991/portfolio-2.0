'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import { useI18n } from '@/lib/i18n-context';
import { localizedPath } from '@/lib/seo';
import styles from './BlogTeaser.module.css';

interface Post {
  id: string;
  title: string;
  slug: string;
  titleEn: string | null;
  slugEn: string | null;
  excerpt: string | null;
  excerptEn: string | null;
  content: string;
  contentEn: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
}

interface Props {
  posts: Post[];
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function localizedPost(post: Post, locale: string) {
  const useEnglish = locale === 'en-US';

  return {
    title: useEnglish && post.titleEn ? post.titleEn : post.title,
    slug: useEnglish && post.slugEn ? post.slugEn : post.slug,
    excerpt: useEnglish && post.excerptEn ? post.excerptEn : post.excerpt,
    content: useEnglish && post.contentEn ? post.contentEn : post.content,
  };
}

interface BlogCardProps {
  post: Post;
  locale: string;
  minuteLabel: string;
  readPostLabel: string;
  blogBasePath: string;
}

function BlogCard({ post, locale, minuteLabel, readPostLabel, blogBasePath }: BlogCardProps) {
  const localized = localizedPost(post, locale);

  function formatDate(value: string | null) {
    return new Date(value ?? Date.now()).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <Link href={`${blogBasePath}/${localized.slug}`} className={styles.card}>
      <div className={styles.cover}>
        {post.coverImage ? (
          <img src={post.coverImage} alt="" />
        ) : (
          <div className={styles.codeThumb} aria-hidden="true">
            <span className={styles.codeMuted}>$</span> blog.read
            <br />
            {localized.title.slice(0, 34)}
          </div>
        )}
      </div>

      <article className={styles.body}>
        <div className={styles.meta}>
          <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
          <span>
            {readingTime(localized.content)} {minuteLabel}
          </span>
        </div>
        <h3 className={styles.cardTitle}>{localized.title}</h3>
        {localized.excerpt && <p className={styles.excerpt} title={localized.excerpt}>{localized.excerpt}</p>}
        <span className={styles.readMore}>{readPostLabel}</span>
      </article>
    </Link>
  );
}

export default function BlogTeaser({ posts }: Props) {
  const { locale, t } = useI18n();
  const homeBlog = t.homeBlog;
  const blog = t.blog;
  const blogBasePath = localizedPath('/blog', locale);

  return (
    <section id="blog" className={styles.blog}>
      <div className="container">
        <SectionHeader
          row
          className={`${styles.header} reveal`}
          tag={homeBlog.tag}
          title={homeBlog.title}
          description={homeBlog.description}
          tagClassName={styles.blogTag}
          titleClassName={styles.title}
          descriptionClassName={styles.description}
          action={
            <Button href={blogBasePath} variant="purple" className={styles.cta}>
              {homeBlog.cta}
            </Button>
          }
        />

        {posts.length > 0 ? (
          <div className={`${styles.grid} reveal`}>
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                locale={locale}
                minuteLabel={blog.minute}
                readPostLabel={blog.readPost}
                blogBasePath={blogBasePath}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>{homeBlog.empty}</div>
        )}
      </div>
    </section>
  );
}
