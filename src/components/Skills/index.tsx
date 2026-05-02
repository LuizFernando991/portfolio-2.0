import { techRows, extraTechItems } from '@/lib/data';
import TechBlock from './TechBlock';
import styles from './Skills.module.css';

const offsetMap: Record<string, string> = {
  row1: styles.row1,
  row2: styles.row2,
  row3: styles.row3,
};

const doubled = [...extraTechItems, ...extraTechItems];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={`${styles.titleRow} reveal`}>
        <div className={`tag ${styles.skillsTag}`}>⚙ Tecnologias</div>
        <h2 className={styles.title}>
          Minha stack
          <br />
          de batalha.
        </h2>
      </div>

      {techRows.map((row) => (
        <div key={row.offset} className={`${styles.techRow} ${offsetMap[row.offset]}`}>
          {row.items.map((block) => (
            <TechBlock key={block.num} block={block} />
          ))}
        </div>
      ))}

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
