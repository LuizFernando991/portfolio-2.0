'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { useI18n } from '@/lib/i18n-context';
import styles from './page.module.css';

export interface BlogSearchParams {
  category?: string | string[];
  page?: string | string[];
  q?: string | string[];
  technology?: string | string[];
}

interface Taxonomy {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  categories: { category: Taxonomy }[];
  technologies: { technology: Taxonomy }[];
}

interface Props {
  categories: Taxonomy[];
  technologies: Taxonomy[];
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  totalPosts: number;
  filteredPosts: number;
  totalPages: number;
  currentPage: number;
  searchParams?: BlogSearchParams;
}

function toList(value?: string | string[]) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.flatMap((item) => item.split(',')).filter(Boolean);
}

function appendValues(params: URLSearchParams, key: string, values: string[]) {
  values.forEach((value) => params.append(key, value));
}

function filterHref(type: 'category' | 'technology', slug?: string, current?: BlogSearchParams) {
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
  return query ? `/blog?${query}` : '/blog';
}

function pageHref(page: number, current?: BlogSearchParams) {
  const params = new URLSearchParams();

  appendValues(params, 'category', toList(current?.category));
  appendValues(params, 'technology', toList(current?.technology));
  const query = firstValue(current?.q);
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));

  const serialized = params.toString();
  return serialized ? `/blog?${serialized}` : '/blog';
}

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function searchHref(query: string, current?: BlogSearchParams) {
  const params = new URLSearchParams();

  appendValues(params, 'category', toList(current?.category));
  appendValues(params, 'technology', toList(current?.technology));
  if (query.trim()) params.set('q', query.trim());

  const serialized = params.toString();
  return serialized ? `/blog?${serialized}` : '/blog';
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export default function BlogPageContent({
  categories,
  technologies,
  posts,
  featuredPosts,
  totalPosts,
  filteredPosts,
  totalPages,
  currentPage,
  searchParams,
}: Props) {
  const router = useRouter();
  const { locale, t } = useI18n();
  const activeCategories = toList(searchParams?.category);
  const activeTechnologies = toList(searchParams?.technology);
  const searchQuery = firstValue(searchParams?.q) ?? '';
  const b = t.blog;

  function formatDate(value: string | null) {
    return new Date(value ?? Date.now()).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get('q') ?? '');
    router.push(searchHref(nextQuery, searchParams), { scroll: false });
  }

  return (
    <div className={styles.page}>
      <CommandPalette />
      <Nav />

      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div>
              <div className={`tag ${styles.tag}`}>{b.tag}</div>
              <h1 className={styles.title}>{b.title}</h1>
              <p className={styles.description}>{b.description}</p>
            </div>

            <div className={styles.stats}>
              <span className={styles.statNumber}>{totalPosts}</span>
              <span className={styles.statLabel}>{b.postsPublished}</span>
            </div>
          </div>
        </section>

        <div className={styles.content}>
          <div className="container">
            {featuredPosts.length > 0 && (
              <section className={styles.featuredSection} aria-label={b.featured}>
                <div className={styles.featuredHeader}>
                  <h2 className={styles.featuredTitle}>{b.featured}</h2>
                  <span className={styles.featuredCount}>
                    {featuredPosts.length} {featuredPosts.length === 1 ? b.post : b.posts}
                  </span>
                </div>

                <div className={styles.featuredGrid}>
                  {featuredPosts.map((post, index) => {
                    const postCategories = post.categories.map(({ category }) => category);
                    const postTechnologies = post.technologies.map(({ technology }) => technology);

                    return (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className={`${styles.featuredCard} ${
                          index === 0 ? styles.featuredCardPrimary : ''
                        }`}
                      >
                        <div className={styles.featuredCover}>
                          {post.coverImage ? (
                            <img src={post.coverImage} alt="" />
                          ) : (
                            <div className={styles.codeThumb} aria-hidden="true">
                              <span className={styles.codeMuted}>★</span> featured
                              <br />
                              {post.title.slice(0, 36)}
                            </div>
                          )}
                        </div>

                        <article className={styles.featuredBody}>
                          <div className={styles.meta}>
                            <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                            <span>
                              {readingTime(post.content)} {b.minute}
                            </span>
                          </div>
                          <h3 className={styles.featuredCardTitle}>{post.title}</h3>
                          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                          <div className={styles.chips}>
                            {[...postCategories, ...postTechnologies].slice(0, 4).map((item) => (
                              <span key={item.id} className={styles.chip}>
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <div className={`container ${styles.layout}`}>
            <aside className={styles.filters} aria-label={b.categories}>
              <div className={styles.filterGroup}>
                <h2 className={styles.filterTitle}>{b.search}</h2>
                <form className={styles.blogSearch} action="/blog" onSubmit={handleSearchSubmit}>
                  {activeCategories.map((category) => (
                    <input key={category} type="hidden" name="category" value={category} />
                  ))}
                  {activeTechnologies.map((technology) => (
                    <input key={technology} type="hidden" name="technology" value={technology} />
                  ))}
                  <input
                    className={styles.blogSearchInput}
                    type="search"
                    name="q"
                    defaultValue={searchQuery}
                    placeholder={b.searchPlaceholder}
                    aria-label={b.search}
                  />
                  <button className={styles.blogSearchButton} type="submit">
                    {b.searchButton}
                  </button>
                  {searchQuery && (
                    <Link
                      href={searchHref('', searchParams)}
                      scroll={false}
                      className={styles.blogSearchClear}
                    >
                      {b.clear}
                    </Link>
                  )}
                </form>
              </div>

              <div className={styles.filterGroup}>
                <h2 className={styles.filterTitle}>{b.categories}</h2>
                <div className={styles.filterList}>
                  <Link
                    href={filterHref('category', undefined, searchParams)}
                    scroll={false}
                    className={`${styles.filterLink} ${
                      activeCategories.length === 0 ? styles.filterActive : ''
                    }`}
                  >
                    {b.all}
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
                <h2 className={styles.filterTitle}>{b.technologies}</h2>
                <div className={styles.filterList}>
                  <Link
                    href={filterHref('technology', undefined, searchParams)}
                    scroll={false}
                    className={`${styles.filterLink} ${
                      activeTechnologies.length === 0 ? styles.filterActive : ''
                    }`}
                  >
                    {b.all}
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
              <section className={styles.postsArea} aria-label={b.posts}>
                <div className={styles.postsHeader}>
                  <span>
                    {filteredPosts} {filteredPosts === 1 ? b.post : b.posts}{' '}
                    {filteredPosts === 1 ? b.found : b.foundPlural}
                  </span>
                  <span>
                    {b.page} {currentPage} {b.of} {totalPages}
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
                            <span>
                              {readingTime(post.content)} {b.minute}
                            </span>
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

                          <span className={styles.readMore}>{b.readPost}</span>
                        </article>
                      </Link>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <nav className={styles.pagination} aria-label={b.page}>
                    <Link
                      href={pageHref(currentPage - 1, searchParams)}
                      scroll={false}
                      className={`${styles.pageButton} ${
                        currentPage === 1 ? styles.pageButtonDisabled : ''
                      }`}
                      aria-disabled={currentPage === 1}
                    >
                      {b.previous}
                    </Link>

                    <div className={styles.pageNumbers}>
                      {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;

                        return (
                          <Link
                            key={page}
                            scroll={false}
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
                      scroll={false}
                      className={`${styles.pageButton} ${
                        currentPage === totalPages ? styles.pageButtonDisabled : ''
                      }`}
                      aria-disabled={currentPage === totalPages}
                    >
                      {b.next}
                    </Link>
                  </nav>
                )}
              </section>
            ) : (
              <div className={styles.empty}>{b.empty}</div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
