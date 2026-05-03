import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import styles from './page.module.css';

const skeletonPosts = Array.from({ length: 5 }, (_, index) => index);

export default function BlogLoading() {
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
              <span className={styles.statNumber}>...</span>
              <span className={styles.statLabel}>posts publicados</span>
            </div>
          </div>
        </section>

        <div className={styles.content}>
          <div className={`container ${styles.layout}`}>
            <aside className={styles.filters} aria-label="Filtros carregando">
              <div className={styles.filterGroup}>
                <h2 className={styles.filterTitle}>Categorias</h2>
                <div className={styles.filterList}>
                  <span className={`${styles.filterLink} ${styles.filterActive}`}>Todas</span>
                  <span className={styles.filterLink}>Carregando</span>
                  <span className={styles.filterLink}>Carregando</span>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h2 className={styles.filterTitle}>Tecnologias</h2>
                <div className={styles.filterList}>
                  <span className={`${styles.filterLink} ${styles.filterActive}`}>Todas</span>
                  <span className={styles.filterLink}>Carregando</span>
                  <span className={styles.filterLink}>Carregando</span>
                </div>
              </div>
            </aside>

            <section className={styles.postsArea} aria-label="Posts carregando">
              <div className={styles.postsHeader}>
                <span>Carregando posts</span>
                <span>Preparando leitura</span>
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
