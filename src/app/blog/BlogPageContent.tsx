'use client';

import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { useI18n } from '@/lib/i18n-context';
import type { BlogPost, BlogSearchParams, Taxonomy } from './blog-utils';
import BlogFilters from './components/BlogFilters';
import BlogHero from './components/BlogHero';
import BlogPostsSection from './components/BlogPostsSection';
import FeaturedPosts from './components/FeaturedPosts';
import styles from './page.module.css';

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
  const { locale, t } = useI18n();
  const b = t.blog;

  return (
    <div className={styles.page}>
      <CommandPalette />
      <Nav />

      <main>
        <BlogHero
          tag={b.tag}
          title={b.title}
          description={b.description}
          totalPosts={totalPosts}
          postsPublishedLabel={b.postsPublished}
        />

        <div className={styles.content}>
          <div className="container">
            <FeaturedPosts
              posts={featuredPosts}
              locale={locale}
              labels={{
                featured: b.featured,
                minute: b.minute,
                post: b.post,
                posts: b.posts,
              }}
            />
          </div>

          <div className={`container ${styles.layout}`}>
            <BlogFilters
              categories={categories}
              technologies={technologies}
              searchParams={searchParams}
              labels={{
                all: b.all,
                categories: b.categories,
                clear: b.clear,
                search: b.search,
                searchButton: b.searchButton,
                searchPlaceholder: b.searchPlaceholder,
                technologies: b.technologies,
              }}
            />

            <BlogPostsSection
              posts={posts}
              locale={locale}
              filteredPosts={filteredPosts}
              totalPages={totalPages}
              currentPage={currentPage}
              searchParams={searchParams}
              labels={{
                empty: b.empty,
                found: b.found,
                foundPlural: b.foundPlural,
                minute: b.minute,
                next: b.next,
                of: b.of,
                page: b.page,
                post: b.post,
                posts: b.posts,
                previous: b.previous,
                readPost: b.readPost,
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
