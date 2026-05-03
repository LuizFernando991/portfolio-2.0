'use client';

import HeroCard from './HeroCard';
import { useI18n } from '@/lib/i18n-context';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid}>
        <div>
          <div className={`tag ${styles.available}`}>
            <span className={`tag-dot ${styles.dot}`} />
            {t.hero.available}
          </div>
          <h1 className={styles.heading}>
            {t.hero.titleTop}
            <br />
            <em>{t.hero.titleEm}</em>
          </h1>
          <p className={styles.desc}>{t.hero.description}</p>
          <div className={styles.btns}>
            <a href="#projects" className="btn btn-primary">
              {t.hero.projects}
            </a>
            <a href="#contact" className="btn btn-secondary">
              {t.hero.contact}
            </a>
          </div>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}
