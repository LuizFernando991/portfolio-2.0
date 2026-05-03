'use client';

import { useI18n } from '@/lib/i18n-context';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useI18n();
  const whatsappHref = `https://wa.me/5537991701381?text=${encodeURIComponent(
    t.contact.whatsappText
  )}`;

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.tagWrap}>
          <div className={`tag ${styles.contactTag}`}>{t.contact.tag}</div>
        </div>

        <div className={`${styles.card} reveal`}>
          <div className={styles.consoleTop}>
            <span />
            <span />
            <span />
            <strong>{t.contact.terminalPath}</strong>
          </div>

          <div className={styles.commandLine}>
            <span>luiz@portfolio</span>
            <strong>{t.contact.command}</strong>
          </div>

          <div className={styles.body}>
            <div className={styles.copy}>
              <span className={styles.path}>{t.contact.path}</span>
              <h2 className={styles.title}>
                {t.contact.titleTop}
                <br />
                {t.contact.titleBottom}
              </h2>
              <p className={styles.desc}>{t.contact.description}</p>

              <a
                href="https://www.linkedin.com/in/lfernandor991/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactButton}
              >
                <span>{t.contact.buttonTitle}</span>
                <strong>{t.contact.buttonText}</strong>
              </a>
            </div>

            <div className={styles.links}>
              <a href="#projects" className={styles.item}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 9h8" />
                  <path d="M8 13h5" />
                </svg>
                {t.contact.projects}
              </a>
              <a
                href="https://www.linkedin.com/in/lfernandor991/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                {t.contact.linkedin}
              </a>
              <a
                href="https://github.com/LuizFernando991"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
                {t.contact.github}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 11.5a8.4 8.4 0 01-12.42 7.38L4 20l1.24-4.36A8.42 8.42 0 1121 11.5z" />
                  <path d="M9.5 8.5c.2 3 2 4.8 5 6" />
                  <path d="M9 8h1.5l.5 1.5-.8.8" />
                  <path d="M14 14l.8-.8 1.7.5V15" />
                </svg>
                {t.contact.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
