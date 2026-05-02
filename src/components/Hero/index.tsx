import HeroCard from './HeroCard';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid}>
        <div>
          <div className={`tag ${styles.available}`}>
            <span className={`tag-dot ${styles.dot}`} />
            Available for work
          </div>
          <h1 className={styles.heading}>
            Full-Stack
            <br />
            <em>Developer</em>
          </h1>
          <p className={styles.desc}>
            Olá! Sou Luiz Fernando — desenvolvedor focado em JavaScript/TypeScript, com experiência em Golang, Node.js, Bun,
            React, NestJS, e AWS. Construo produtos escaláveis do back ao front.
          </p>
          <div className={styles.btns}>
            <a href="#projects" className="btn btn-primary">
              Ver Projetos →
            </a>
            <a href="#contact" className="btn btn-secondary">
              Falar Comigo
            </a>
          </div>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}
