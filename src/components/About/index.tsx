import { experiences } from '@/lib/data';
import ExperienceCard from './ExperienceCard';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div className="reveal">
            <div className={`tag ${styles.aboutTag}`}>✦ Sobre mim</div>
            <h2 className={styles.title}>Construo produtos, não só código.</h2>
            <div className={styles.text}>
              <p>
                Sou desenvolvedor Full-Stack com foco em JavaScript/Typescript e ecossistema Node/Bun. Tenho
                experiência sólida construindo APIs robustas, integrações, e frontends
                modernos com React/Next.js.
              </p>
              <p>
                Já trabalhei em plataformas educacionais, sistemas de mensageria e
                microserviços. Meu objetivo é sempre entregar software que
                funciona de verdade — rápido, escalável e bem testado.
              </p>
              <p>
                Atualmente aprendendo novas coisas nas horas vagas.
              </p>
            </div>
            <div style={{ marginTop: 28 }}>
              <a href="#contact" className="btn btn-purple">
                Vamos conversar →
              </a>
            </div>
          </div>

          <div className={`${styles.expCards} reveal`}>
            {experiences.map((exp) => (
              <ExperienceCard key={exp.company} experience={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
