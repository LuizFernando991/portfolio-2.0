'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { useI18n } from '@/lib/i18n-context';
import styles from './page.module.css';

interface Taxonomy {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  title: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  categories: { category: Taxonomy }[];
  technologies: { technology: Taxonomy }[];
}

interface Props {
  post: Post;
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export default function PostPageContent({ post }: Props) {
  const { locale, t } = useI18n();
  const b = t.blog;
  const categories = post.categories.map(({ category }) => category);
  const technologies = post.technologies.map(({ technology }) => technology);

  const date = new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.page}>
      <CommandPalette />
      <Nav />

      <main>
        <section className={styles.hero}>
          <div className="container">
            <Link href="/blog" className={styles.backLink}>
              {b.backToBlog}
            </Link>

            <div className={styles.meta}>
              <span>{date}</span> 
              *
              <span>
                {readingTime(post.content)} {b.readingMinute}
              </span>
            </div>

            <h1 className={styles.title}>{post.title}</h1>
            {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

            <div className={styles.chips}>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className={styles.chip}
                >
                  {category.name}
                </Link>
              ))}
              {technologies.map((technology) => (
                <Link
                  key={technology.id}
                  href={`/blog?technology=${technology.slug}`}
                  className={styles.chip}
                >
                  {technology.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {post.coverImage && (
          <div className={styles.coverWrap}>
            <div className={styles.cover}>
              <img src={post.coverImage} alt="" />
            </div>
          </div>
        )}

        <article className={styles.article}>
          <div className={styles.articleInner}>
            <div className={`container ${styles.articleGrid}`}>
              <div className={styles.content}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <aside className={styles.sidebar}>
                {categories.length > 0 && (
                  <div className={styles.sideBox}>
                    <h2 className={styles.sideTitle}>{b.categories}</h2>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/blog?category=${category.slug}`}
                        className={styles.sideLink}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}

                {technologies.length > 0 && (
                  <div className={styles.sideBox}>
                    <h2 className={styles.sideTitle}>{b.technologies}</h2>
                    {technologies.map((technology) => (
                      <Link
                        key={technology.id}
                        href={`/blog?technology=${technology.slug}`}
                        className={styles.sideLink}
                      >
                        {technology.name}
                      </Link>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
