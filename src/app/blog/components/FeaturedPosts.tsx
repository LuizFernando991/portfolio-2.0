import type { BlogPost } from '../blog-utils';
import BlogPostCard from './BlogPostCard';
import styles from '../page.module.css';

interface FeaturedPostsProps {
  posts: BlogPost[];
  locale: string;
  basePath?: string;
  labels: {
    featured: string;
    minute: string;
    post: string;
    posts: string;
  };
}

export default function FeaturedPosts({ posts, locale, basePath = '/blog', labels }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.featuredSection} aria-label={labels.featured}>
      <div className={styles.featuredHeader}>
        <h2 className={styles.featuredTitle}>{labels.featured}</h2>
        <span className={styles.featuredCount}>
          {posts.length} {posts.length === 1 ? labels.post : labels.posts}
        </span>
      </div>

      <div className={styles.featuredGrid}>
        {posts.map((post, index) => (
          <BlogPostCard
            key={post.id}
            post={post}
            locale={locale}
            minuteLabel={labels.minute}
            variant="featured"
            chipLimit={4}
            featured={index === 0}
            basePath={basePath}
          />
        ))}
      </div>
    </section>
  );
}
