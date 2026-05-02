import { projects } from '@/lib/data';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <div className="reveal">
          <div className={`tag ${styles.projectsTag}`}>✦ Projetos</div>
          <h2 className={styles.title}>
            Coisas que
            <br />
            eu construí.
          </h2>
        </div>

        <div className={`${styles.grid} reveal`}>
          {projects.map((project) => (
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
            Ver mais no GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
