import { extraTechItems } from '@/lib/data';
import styles from './Skills.module.css';

const skillGroups = [
  {
    label: 'Backend',
    command: 'build api',
    items: ['NestJS', 'Node.js', 'TypeScript', 'GraphQL', 'RabbitMQ', 'Redis', 'Go'],
  },
  {
    label: 'Frontend',
    command: 'ship ui',
    items: ['React', 'Next.js', 'Tailwind', 'Styled Components', 'React Query'],
  },
  {
    label: 'Cloud',
    command: 'deploy',
    items: ['AWS', 'Docker', 'CI/CD', 'EC2', 'S3', 'Lambda', 'SQS'],
  },
  {
    label: 'Data',
    command: 'query',
    items: ['Postgres', 'Prisma', 'MongoDB', 'MySQL', 'Sequelize'],
  },
];

const signalItems = ['Microservices', 'Clean Arch.', 'gRPC', 'Jest'];
const doubled = [...extraTechItems, ...extraTechItems];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={`${styles.shell} reveal`}>
        <div className={`tag ${styles.skillsTag}`}>⚙ Tecnologias</div>

        <div className={styles.console}>
          <div className={styles.consoleTop}>
            <span />
            <span />
            <span />
            <strong>~/luiz/skills</strong>
          </div>

          <div className={styles.commandLine}>
            <span>luiz@portfolio</span>
            <strong>run stack --production</strong>
          </div>

          <div className={styles.board}>
            {skillGroups.map((group, index) => (
              <article key={group.label} className={styles.group}>
                <div className={styles.groupHead}>
                  <span>0{index + 1}</span>
                  <strong>{group.label}</strong>
                </div>
                <p>{group.command}</p>

                <div className={styles.stackList}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.signal}>
            <div>
              <span className={styles.signalLabel}>Modo de trabalho</span>
              <strong>Arquitetura limpa, entregas pragmáticas.</strong>
            </div>
            <div className={styles.signalTags}>
              {signalItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.extrasStrip}>
        <div className={styles.extrasTrack}>
          {doubled.map((item, i) => (
            <span key={i}>
              <span className={styles.tex}>{item}</span>
              <span className={styles.texDot}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
