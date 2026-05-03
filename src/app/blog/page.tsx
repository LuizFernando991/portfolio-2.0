/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog | Luiz Fernando',
  description: 'Artigos sobre desenvolvimento, arquitetura, backend, frontend e produto.',
};

interface BlogPageProps {
  searchParams?: {
    category?: string | string[];
    page?: string | string[];
    technology?: string | string[];
  };
}

const POSTS_PER_PAGE = 5;

function formatDate(date: Date | null) {
  return (date ?? new Date()).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function toList(value?: string | string[]) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.flatMap((item) => item.split(',')).filter(Boolean);
}

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function appendValues(params: URLSearchParams, key: string, values: string[]) {
  values.forEach((value) => params.append(key, value));
}

function filterHref(
  type: 'category' | 'technology',
  slug?: string,
  current?: BlogPageProps['searchParams']
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

  const query = params.toString();
  return query ? `/blog?${query}` : '/blog';
}

function pageHref(page: number, current?: BlogPageProps['searchParams']) {
  const params = new URLSearchParams();

  appendValues(params, 'category', toList(current?.category));
  appendValues(params, 'technology', toList(current?.technology));
  if (page > 1) params.set('page', String(page));

  const query = params.toString();
  return query ? `/blog?${query}` : '/blog';
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const activeCategories = toList(searchParams?.category);
  const activeTechnologies = toList(searchParams?.technology);
  const requestedPage = Number(firstValue(searchParams?.page) ?? '1');

  const where = {
    published: true,
    ...(activeCategories.length > 0
      ? { categories: { some: { category: { slug: { in: activeCategories } } } } }
      : {}),
    ...(activeTechnologies.length > 0
      ? { technologies: { some: { technology: { slug: { in: activeTechnologies } } } } }
      : {}),
  };

  const [categories, technologies, totalPosts, filteredPosts] = await Promise.all([
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

  return (
    <div className={styles.page}>
      <CommandPalette />
      <Nav />

      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div>
              <div className={`tag ${styles.tag}`}>✦ Blog</div>
              <h1 className={styles.title}>Notas de campo sobre software.</h1>
              <p className={styles.description}>
                Textos práticos sobre backend, frontend, arquitetura e decisões de produto que
                aparecem quando a ideia precisa virar sistema de verdade.
              </p>
            </div>

            <div className={styles.stats}>
              <span className={styles.statNumber}>{totalPosts}</span>
              <span className={styles.statLabel}>posts publicados</span>
            </div>
          </div>
        </section>

        <div className={styles.content}>
          <div className={`container ${styles.layout}`}>
            <aside className={styles.filters} aria-label="Filtros do blog">
              <div className={styles.filterGroup}>
                <h2 className={styles.filterTitle}>Categorias</h2>
                <div className={styles.filterList}>
                  <Link
                    href={filterHref('category', undefined, searchParams)}
                    scroll={false}
                    className={`${styles.filterLink} ${
                      activeCategories.length === 0 ? styles.filterActive : ''
                    }`}
                  >
                    Todas
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={filterHref('category', category.slug, searchParams)}
                      scroll={false}
                      className={`${styles.filterLink} ${
                        activeCategories.includes(category.slug) ? styles.filterActive : ''
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h2 className={styles.filterTitle}>Tecnologias</h2>
                <div className={styles.filterList}>
                  <Link
                    href={filterHref('technology', undefined, searchParams)}
                    scroll={false}
                    className={`${styles.filterLink} ${
                      activeTechnologies.length === 0 ? styles.filterActive : ''
                    }`}
                  >
                    Todas
                  </Link>
                  {technologies.map((technology) => (
                    <Link
                      key={technology.id}
                      href={filterHref('technology', technology.slug, searchParams)}
                      scroll={false}
                      className={`${styles.filterLink} ${
                        activeTechnologies.includes(technology.slug) ? styles.filterActive : ''
                      }`}
                    >
                      {technology.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {posts.length > 0 ? (
              <section className={styles.postsArea} aria-label="Posts do blog">
                <div className={styles.postsHeader}>
                  <span>
                    {filteredPosts} post{filteredPosts !== 1 ? 's' : ''} encontrado
                    {filteredPosts !== 1 ? 's' : ''}
                  </span>
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
                </div>

                <div className={styles.grid}>
                  {posts.map((post) => {
                    const postCategories = post.categories.map(({ category }) => category);
                    const postTechnologies = post.technologies.map(({ technology }) => technology);

                    return (
                      <Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}>
                        <div className={styles.cover}>
                          {post.coverImage ? (
                            <img src={post.coverImage} alt="" />
                          ) : (
                            <div className={styles.codeThumb} aria-hidden="true">
                              <span className={styles.codeMuted}>$</span> git commit -m
                              <br />
                              &quot;{post.title.slice(0, 32)}&quot;
                              <br />
                              <span className={styles.codeMuted}>✓</span> published
                            </div>
                          )}
                        </div>

                        <article className={styles.body}>
                          <div className={styles.meta}>
                            <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                            <span>{readingTime(post.content)} min</span>
                          </div>

                          <h2 className={styles.cardTitle}>{post.title}</h2>
                          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

                          <div className={styles.chips}>
                            {[...postCategories, ...postTechnologies].slice(0, 5).map((item) => (
                              <span key={item.id} className={styles.chip}>
                                {item.name}
                              </span>
                            ))}
                          </div>

                          <span className={styles.readMore}>Ler post →</span>
                        </article>
                      </Link>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <nav className={styles.pagination} aria-label="Paginação dos posts">
                    <Link
                      href={pageHref(currentPage - 1, searchParams)}
                      className={`${styles.pageButton} ${
                        currentPage === 1 ? styles.pageButtonDisabled : ''
                      }`}
                      aria-disabled={currentPage === 1}
                    >
                      ← Anterior
                    </Link>

                    <div className={styles.pageNumbers}>
                      {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;

                        return (
                          <Link
                            key={page}
                            href={pageHref(page, searchParams)}
                            className={`${styles.pageNumber} ${
                              page === currentPage ? styles.pageNumberActive : ''
                            }`}
                            aria-current={page === currentPage ? 'page' : undefined}
                          >
                            {page}
                          </Link>
                        );
                      })}
                    </div>

                    <Link
                      href={pageHref(currentPage + 1, searchParams)}
                      className={`${styles.pageButton} ${
                        currentPage === totalPages ? styles.pageButtonDisabled : ''
                      }`}
                      aria-disabled={currentPage === totalPages}
                    >
                      Próxima →
                    </Link>
                  </nav>
                )}
              </section>
            ) : (
              <div className={styles.empty}>
                Nenhum post publicado com esses filtros ainda. Limpe uma opção para ver mais textos.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
