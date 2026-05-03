import type { BlogPost, BlogSearchParams } from '../blog-utils';
import BlogPagination from './BlogPagination';
import BlogPostCard from './BlogPostCard';
import styles from '../page.module.css';

interface BlogPostsSectionProps {
  posts: BlogPost[];
  locale: string;
  filteredPosts: number;
  totalPages: number;
  currentPage: number;
  searchParams?: BlogSearchParams;
  basePath?: string;
  labels: {
    empty: string;
    found: string;
    foundPlural: string;
    minute: string;
    next: string;
    of: string;
    page: string;
    post: string;
    posts: string;
    previous: string;
    readPost: string;
  };
}

export default function BlogPostsSection({
  posts,
  locale,
  filteredPosts,
  totalPages,
  currentPage,
  searchParams,
  basePath = '/blog',
  labels,
}: BlogPostsSectionProps) {
  if (posts.length === 0) {
    return <div className={styles.empty}>{labels.empty}</div>;
  }

  return (
    <section className={styles.postsArea} aria-label={labels.posts}>
      <div className={styles.postsHeader}>
        <span>
          {filteredPosts} {filteredPosts === 1 ? labels.post : labels.posts}{' '}
          {filteredPosts === 1 ? labels.found : labels.foundPlural}
        </span>
        <span>
          {labels.page} {currentPage} {labels.of} {totalPages}
        </span>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <BlogPostCard
            key={post.id}
            post={post}
            locale={locale}
            minuteLabel={labels.minute}
            readPostLabel={labels.readPost}
            basePath={basePath}
          />
        ))}
      </div>

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
        basePath={basePath}
        labels={labels}
      />
    </section>
  );
}
