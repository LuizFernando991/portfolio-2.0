'use client';

import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { useI18n } from '@/lib/i18n-context';
import styles from './page.module.css';

const skeletonPosts = Array.from({ length: 5 }, (_, index) => index);

export default function BlogLoading() {
  const { t } = useI18n();
  const b = t.blog;

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
              <span className={styles.statNumber}>...</span>
              <span className={styles.statLabel}>{b.postsPublished}</span>
            </div>
          </div>
        </section>

        <div className={styles.content}>
          <div className={`container ${styles.layout}`}>
            <aside className={styles.filters} aria-label={b.loadingFilters}>
              <div className={styles.filterGroup}>
                <h2 className={styles.filterTitle}>{b.categories}</h2>
                <div className={styles.filterList}>
                  <span className={`${styles.filterLink} ${styles.filterActive}`}>{b.all}</span>
                  <span className={styles.filterLink}>{b.loading}</span>
                  <span className={styles.filterLink}>{b.loading}</span>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h2 className={styles.filterTitle}>{b.technologies}</h2>
                <div className={styles.filterList}>
                  <span className={`${styles.filterLink} ${styles.filterActive}`}>{b.all}</span>
                  <span className={styles.filterLink}>{b.loading}</span>
                  <span className={styles.filterLink}>{b.loading}</span>
                </div>
              </div>
            </aside>

            <section className={styles.postsArea} aria-label={b.loadingPosts}>
              <div className={styles.postsHeader}>
                <span>{b.loadingPostsText}</span>
                <span>{b.loadingReadingText}</span>
              </div>

              <div className={styles.grid}>
                {skeletonPosts.map((post) => (
                  <article key={post} className={`${styles.card} ${styles.skeletonCard}`}>
                    <div className={styles.cover}>
                      <div className={styles.skeletonBlock} />
                    </div>

                    <div className={styles.body}>
                      <div className={styles.meta}>
                        <span className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
                        <span className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
                      </div>

                      <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
                      <div className={`${styles.skeletonLine} ${styles.skeletonLineLong}`} />
                      <div className={`${styles.skeletonLine} ${styles.skeletonLineMedium}`} />

                      <div className={styles.skeletonPills}>
                        <span className={styles.skeletonPill} />
                        <span className={styles.skeletonPill} />
                        <span className={styles.skeletonPill} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
