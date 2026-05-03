'use client';

import Button from '@/components/ui/Button';
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
            <Button href="#projects">{t.hero.projects}</Button>
            <Button href="#contact" variant="secondary">
              {t.hero.contact}
            </Button>
          </div>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}
