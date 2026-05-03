'use client';

import { useI18n } from '@/lib/i18n-context';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <div className="reveal">
          <div className={`tag ${styles.projectsTag}`}>{t.projects.tag}</div>
          <h2 className={styles.title}>
            {t.projects.titleTop}
            <br />
            {t.projects.titleBottom}
          </h2>
        </div>

        <div className={`${styles.grid} reveal`}>
          {t.projects.items.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className={styles.moreBtn}>
          <a
            href="https://github.com/LuizFernando991"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${styles.githubButton}`}
          >
            {t.projects.more}
          </a>
        </div>
      </div>
    </section>
  );
}
