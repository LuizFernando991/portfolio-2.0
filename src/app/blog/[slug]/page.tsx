/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

interface PostPageProps {
  params: {
    slug: string;
  };
}

function formatDate(date: Date | null) {
  return (date ?? new Date()).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

async function getPost(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
    include: {
      categories: { include: { category: true } },
      technologies: { include: { technology: true } },
    },
  });
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post não encontrado | Luiz Fernando',
    };
  }

  return {
    title: `${post.title} | Luiz Fernando`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  const categories = post.categories.map(({ category }) => category);
  const technologies = post.technologies.map(({ technology }) => technology);

  return (
    <div className={styles.page}>
      <CommandPalette />
      <Nav />

      <main>
        <section className={styles.hero}>
          <div className="container">
            <Link href="/blog" className={styles.backLink}>
              ← Voltar para o blog
            </Link>

            <div className={styles.meta}>
              <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
              <span>{readingTime(post.content)} min de leitura</span>
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
                    <h2 className={styles.sideTitle}>Categorias</h2>
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
                    <h2 className={styles.sideTitle}>Tecnologias</h2>
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
