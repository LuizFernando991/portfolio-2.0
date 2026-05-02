import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className={`tag ${styles.contactTag}`}>✉ Contato</div>
        </div>

        <div className={`${styles.card} reveal`}>
          <h2 className={styles.title}>
            Vamos construir
            <br />
            algo juntos?
          </h2>
          <p className={styles.desc}>
            Aberto a oportunidades full-time, freelance e projetos interessantes. Manda uma
            mensagem!
          </p>

          <div>
            <a href="mailto:lfernando.r991@gmail.com" className={styles.email}>
              lfernando.r991@gmail.com
            </a>
          </div>

          <div className={styles.links}>
            <a href="mailto:lfernando.r991@gmail.com" className={styles.item}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2,4 12,13 22,4" />
              </svg>
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/luiz-fernando-rodrigues-vieira-de-oliveira-b7a059207/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
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
              GitHub
            </a>
            <a href="tel:+5537991701381" className={styles.item}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
              </svg>
              (37) 9 9170-1381
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
