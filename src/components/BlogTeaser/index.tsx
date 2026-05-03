'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
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

export default function BlogTeaser({ posts }: Props) {
  const { locale, t } = useI18n();
  const homeBlog = t.homeBlog;
  const blog = t.blog;

  function formatDate(value: string | null) {
    return new Date(value ?? Date.now()).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <section id="blog" className={styles.blog}>
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div>
            <div className={`tag ${styles.blogTag}`}>{homeBlog.tag}</div>
            <h2 className={styles.title}>{homeBlog.title}</h2>
            <p className={styles.description}>{homeBlog.description}</p>
          </div>

          <Link href="/blog" className={`btn btn-purple ${styles.cta}`}>
            {homeBlog.cta}
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className={`${styles.grid} reveal`}>
            {posts.map((post) => {
              const localized = localizedPost(post, locale);

              return (
                <Link key={post.id} href={`/blog/${localized.slug}`} className={styles.card}>
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
                        {readingTime(localized.content)} {blog.minute}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{localized.title}</h3>
                    {localized.excerpt && <p className={styles.excerpt}>{localized.excerpt}</p>}
                    <span className={styles.readMore}>{blog.readPost}</span>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>{homeBlog.empty}</div>
        )}
      </div>
    </section>
  );
}
