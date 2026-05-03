import type { Experience } from '@/lib/i18n';
import styles from './About.module.css';

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.company}>{experience.company}</div>
      </div>
      <div className={styles.role}>{experience.role}</div>
      <div className={styles.desc}>{experience.description}</div>
    </div>
  );
}
