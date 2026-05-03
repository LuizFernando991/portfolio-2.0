import SectionHeader from '@/components/ui/SectionHeader';
import styles from '../page.module.css';

interface BlogHeroProps {
  tag: string;
  title: string;
  description: string;
  totalPosts: number;
  postsPublishedLabel: string;
}

export default function BlogHero({
  tag,
  title,
  description,
  totalPosts,
  postsPublishedLabel,
}: BlogHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        <SectionHeader
          titleAs="h1"
          tag={tag}
          title={title}
          description={description}
          tagClassName={styles.tag}
          titleClassName={styles.title}
          descriptionClassName={styles.description}
        />

        <div className={styles.stats}>
          <span className={styles.statNumber}>{totalPosts}</span>
          <span className={styles.statLabel}>{postsPublishedLabel}</span>
        </div>
      </div>
    </section>
  );
}
