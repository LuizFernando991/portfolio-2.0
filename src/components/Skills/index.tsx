'use client';

import { useI18n } from '@/lib/i18n-context';
import styles from './Skills.module.css';

export default function Skills() {
  const { t } = useI18n();
  const doubled = [...t.skills.extraTechItems, ...t.skills.extraTechItems];

  return (
    <section id="skills" className={styles.skills}>
      <div className={`${styles.shell} reveal`}>
        <div className={`tag ${styles.skillsTag}`}>{t.skills.tag}</div>

        <div className={styles.console}>
          <div className={styles.consoleTop}>
            <span />
            <span />
            <span />
            <strong>{t.skills.terminalPath}</strong>
          </div>

          <div className={styles.commandLine}>
            <span>luiz@portfolio</span>
            <strong>{t.skills.command}</strong>
          </div>

          <div className={styles.board}>
            {t.skills.groups.map((group, index) => (
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
              <span className={styles.signalLabel}>{t.skills.workMode}</span>
              <strong>{t.skills.workModeText}</strong>
            </div>
            <div className={styles.signalTags}>
              {t.skills.signalItems.map((item) => (
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
