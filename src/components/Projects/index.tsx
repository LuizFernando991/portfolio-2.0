'use client';

import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import { useI18n } from '@/lib/i18n-context';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <div className="reveal">
          <SectionHeader
            tag={t.projects.tag}
            title={
              <>
                {t.projects.titleTop}
                <br />
                {t.projects.titleBottom}
              </>
            }
            tagClassName={styles.projectsTag}
            titleClassName={styles.title}
          />
        </div>

        <div className={`${styles.grid} reveal`}>
          {t.projects.items.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className={styles.moreBtn}>
          <Button
            href="https://github.com/LuizFernando991"
            variant="primary"
            className={styles.githubButton}
          >
            {t.projects.more}
          </Button>
        </div>
      </div>
    </section>
  );
}
