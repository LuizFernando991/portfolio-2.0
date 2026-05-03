'use client';

import { useI18n } from '@/lib/i18n-context';
import ExperienceCard from './ExperienceCard';
import styles from './About.module.css';

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div className="reveal">
            <div className={`tag ${styles.aboutTag}`}>{t.about.tag}</div>
            <h2 className={styles.title}>{t.about.title}</h2>
            <div className={styles.text}>
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.ctaWrap}>
              <a href="#contact" className="btn btn-purple">
                {t.about.cta}
              </a>
            </div>
          </div>

          <div className={`${styles.expCards} reveal`}>
            {t.experiences.map((exp) => (
              <ExperienceCard key={exp.company} experience={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
